from app import create_app, db
from app.models.user import User

app = create_app()

def create_admin_user():
    with app.app_context():
        # Check if admin already exists
        admin = User.query.filter_by(email='admin@example.com').first()
        if not admin:
            admin = User(
                email='admin@example.com',
                password='admin123',  # In production, use proper password hashing
                name='Admin User'
            )
            db.session.add(admin)
            db.session.commit()
            print("Admin user created successfully")
        else:
            print("Admin user already exists")

if __name__ == "__main__":
    create_admin_user()