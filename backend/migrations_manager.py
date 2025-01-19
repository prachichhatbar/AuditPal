from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

db = SQLAlchemy(app)
migrate = Migrate(app, db)

# Import models
from app.models.user import User
from app.models.audit_record import AuditRecord

# Create tables
def init_db():
    with app.app_context():
        db.create_all()

if __name__ == '__main__':
    init_db()