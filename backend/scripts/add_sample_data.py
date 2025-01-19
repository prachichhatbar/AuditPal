import sys
import os

# Add the parent directory to Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app import create_app, db
from app.models.audit_record import AuditRecord
from datetime import datetime, timedelta

def create_sample_audit_records():
    app = create_app()
    with app.app_context():
        # Sample transactions with banking-specific departments and types
        records = [
            AuditRecord(
                transaction_date=datetime.now(),
                department='treasury',
                transaction_type='international',
                amount=150000.00,
                risk_score=0.8,
                flagged=True
            ),
            AuditRecord(
                transaction_date=datetime.now() - timedelta(days=1),
                department='retail_banking',
                transaction_type='domestic',
                amount=85000.00,
                risk_score=0.3,
                flagged=False
            ),
            AuditRecord(
                transaction_date=datetime.now() - timedelta(days=2),
                department='investment_banking',
                transaction_type='trading',
                amount=250000.00,
                risk_score=0.7,
                flagged=True
            ),
            AuditRecord(
                transaction_date=datetime.now() - timedelta(days=3),
                department='compliance',
                transaction_type='manual_adjustment',
                amount=45000.00,
                risk_score=0.6,
                flagged=False
            ),
            AuditRecord(
                transaction_date=datetime.now() - timedelta(days=4),
                department='risk_management',
                transaction_type='regulatory',
                amount=120000.00,
                risk_score=0.5,
                flagged=False
            ),
            AuditRecord(
                transaction_date=datetime.now() - timedelta(days=5),
                department='treasury',
                transaction_type='fx_trading',
                amount=300000.00,
                risk_score=0.9,
                flagged=True
            )
        ]
        
        for record in records:
            db.session.add(record)
        
        try:
            db.session.commit()
            print("Sample audit records created successfully!")
        except Exception as e:
            print(f"Error creating records: {e}")
            db.session.rollback()

if __name__ == '__main__':
    create_sample_audit_records()