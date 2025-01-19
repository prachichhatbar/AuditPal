from flask import Blueprint, jsonify, request, render_template
from app.models import AuditRecord
from app.services import RiskAnalyzer
from app import db
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime

main = Blueprint('main', __name__)

@main.route('/')
def index():
    return jsonify({"message": "API is running"})

@main.route('/api/analytics/summary')
def get_analytics_summary():
    try:
        records = AuditRecord.query.all()
        total_transactions = len(records)
        high_risk_count = len([r for r in records if r.flagged])
        total_amount = sum(record.amount for record in records)

        department_stats = {}
        for record in records:
            if record.department not in department_stats:
                department_stats[record.department] = {
                    'transaction_count': 0,
                    'total_amount': 0,
                    'risk_scores': []
                }
            department_stats[record.department]['transaction_count'] += 1
            department_stats[record.department]['total_amount'] += record.amount
            department_stats[record.department]['risk_scores'].append(record.risk_score)

        # Convert to list for response
        department_statistics = [
            {
                'department': dept,
                'transaction_count': stats['transaction_count'],
                'total_amount': stats['total_amount'],
                'average_risk_score': sum(stats['risk_scores']) / len(stats['risk_scores']) if stats['risk_scores'] else 0
            }
            for dept, stats in department_stats.items()
        ]

        return jsonify({
            'total_transactions': total_transactions,
            'high_risk_transactions': high_risk_count,
            'risk_percentage': (high_risk_count / total_transactions * 100) if total_transactions > 0 else 0,
            'amount_statistics': {
                'total_amount': total_amount,
                'average_amount': total_amount / total_transactions if total_transactions > 0 else 0,
                'max_amount': max((r.amount for r in records), default=0)
            },
            'department_statistics': department_statistics
        })

    except Exception as e:
        print(f"Error in analytics: {str(e)}")  # Debug print
        return jsonify({'error': str(e)}), 500

@main.route('/api/transactions', methods=['POST'])
def create_transaction():
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({"error": "No data provided"}), 400

        record = AuditRecord(
            transaction_date=datetime.fromisoformat(data['transaction_date'].replace('Z', '+00:00')),
            department=data['department'],
            transaction_type=data['transaction_type'],
            amount=float(data['amount']),
            risk_score=0.0,  # Will be calculated
            flagged=False
        )

        analyzer = RiskAnalyzer()
        record.risk_score = analyzer.calculate_risk_score(record)
        record.flagged = analyzer.is_high_risk(record.risk_score)

        db.session.add(record)
        db.session.commit()
        
        return jsonify(record.to_dict()), 201

    except Exception as e:
        print(f"Error creating transaction: {str(e)}")  # Debug print
        return jsonify({"error": str(e)}), 500