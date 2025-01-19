# AuditPal: Next-Generation Audit Analytics Platform

## Overview
AuditPal is a modern web-based analytics platform designed for internal audit departments in the banking sector. The platform provides real-time transaction monitoring, risk assessment, and interactive data visualization, enabling auditors to identify and respond to potential risks efficiently.


## Features
- Real-time transaction monitoring
- Automated risk scoring system
- Interactive data visualization
- Multiple chart types (Bar, Line, Area, Pie)
- Department-wise analytics
- Real-time updates with 5-second polling

## Tech Stack

### Frontend
- **Framework**: Next.js 13+ with TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Charts**: Recharts
- **State Management**: React Hooks

### Backend
- **Framework**: Flask (Python)
- **Database**: PostgreSQL
- **ORM**: SQLAlchemy

## Getting Started

### Prerequisites
- Python 3.8+
- Node.js 16+
- PostgreSQL
- npm or yarn

### Backend Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/auditpal.git
cd auditpal/backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Setup environment variables
cp .env.example .env
# Edit .env with your database credentials

# Initialize database
python scripts/init_db.py

# Run the server
python run.py
```

### Frontend Setup
```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Run the development server
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5001

## Project Structure

```
auditpal/
├── backend/
│   ├── app/
│   │   ├── models/
│   │   │   ├── audit_record.py
│   │   │   └── user.py
│   │   ├── routes/
│   │   │   └── main.py
│   │   └── services/
│   │       └── risk_analyzer.py
│   ├── scripts/
│   └── config.py
└── frontend/
    ├── src/
    │   ├── app/
    │   ├── components/
    │   │   ├── dashboard/
    │   │   └── ui/
    │   └── lib/
    └── package.json
```

## Core Features

### Risk Analysis Engine
The platform implements a sophisticated risk scoring system based on:
- Transaction amount (40% weight)
- Transaction type (30% weight)
- Department risk level (30% weight)

### Real-time Analytics
- Automatic data refresh every 5 seconds
- Interactive charts and visualizations
- Department-wise performance metrics
- Risk level indicators

## API Endpoints

### Analytics Summary
```http
GET /api/analytics/summary
```
Returns dashboard analytics including:
- Total transactions
- Risk percentages
- Department statistics

### Create Transaction
```http
POST /api/transactions

{
    "transaction_date": "2024-01-19T10:00:00Z",
    "department": "treasury",
    "transaction_type": "international",
    "amount": 5000.00
}
```

## Security Features
- SQL injection prevention via SQLAlchemy
- Input validation and sanitization
- CORS protection
- Type checking with TypeScript

## Development

### Code Style
- Python: Follow PEP 8 guidelines
- TypeScript: ESLint configuration provided
- Pre-commit hooks for code formatting
`

