# Employee Attrition Prediction Dashboard

## Overview
This is an optional Flask-based web dashboard for the Employee Attrition Prediction system. It provides an interactive interface for making predictions and viewing insights.

## Features
- **Single Employee Prediction**: Enter employee details and get instant attrition prediction
- **Batch Processing**: Upload CSV file with multiple employees for batch predictions
- **Risk Scoring**: Automatic risk scoring on 0-100 scale
- **Feature Importance**: View which factors most influence attrition predictions
- **HR Recommendations**: Get actionable recommendations based on risk level

## Installation

### Prerequisites
- Python 3.7+
- Flask
- Pandas, NumPy, Scikit-learn

### Setup
```bash
# Install dependencies
pip install -r requirements.txt

# Run the dashboard
python app.py
```

The dashboard will be available at `http://localhost:5000`

## Usage

### Single Prediction
1. Navigate to the dashboard
2. Fill in employee details
3. Click "Predict" to get attrition prediction

### Batch Processing
1. Prepare a CSV file with employee data
2. Go to "Batch Upload" section
3. Upload the CSV file
4. Download results in JSON format

## API Endpoints

### POST /api/predict
Single employee prediction
```json
{
  "age": 35,
  "income": 50000,
  "satisfaction": 3
}
```

### POST /api/batch_predict
Batch predictions (multipart form with file upload)

### GET /api/feature_importance
Get top 10 important features

## Architecture
- `app.py`: Flask application and API endpoints
- `../models/random_forest.pkl`: Trained model
- `../src/`: Python modules for preprocessing and prediction

## Notes
- Ensure trained models are available in `../models/`
- Input data should match training data format
- Risk scores are normalized to 0-100 scale
