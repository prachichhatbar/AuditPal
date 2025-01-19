class RiskAnalyzer:
    def __init__(self):
        self.high_risk_threshold = 0.7

    def calculate_risk_score(self, record):
        """Calculate risk score based on various factors"""
        risk_score = 0.0
        
        # Amount-based risk (up to 0.4)
        if record.amount > 10000:
            risk_score += 0.4
        elif record.amount > 5000:
            risk_score += 0.2
            
        # Transaction type risk (up to 0.3)
        high_risk_types = ['international', 'manual_adjustment', 'override']
        if record.transaction_type.lower() in high_risk_types:
            risk_score += 0.3
            
        # Department risk (up to 0.3)
        high_risk_depts = ['treasury', 'trading', 'external_payments']
        if record.department.lower() in high_risk_depts:
            risk_score += 0.3
            
        return min(risk_score, 1.0)

    def is_high_risk(self, risk_score):
        """Determine if a transaction is high risk"""
        return risk_score > self.high_risk_threshold