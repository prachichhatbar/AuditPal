from app import db
from datetime import datetime

class AuditRecord(db.Model):
    __tablename__ = 'audit_records'  # Note this tablename
    
    id = db.Column(db.Integer, primary_key=True)
    transaction_date = db.Column(db.DateTime, nullable=False)
    department = db.Column(db.String(100), nullable=False)
    transaction_type = db.Column(db.String(50), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    risk_score = db.Column(db.Float, nullable=False)
    flagged = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)