# Employee Attrition Prediction Using Machine Learning
## With HR Decision Support System

### Project Overview
This project predicts employee attrition using machine learning and provides comprehensive HR decision support features including risk scoring, explainability, timeline estimation, and retention recommendations.

### Key Features
- **Attrition Prediction**: Binary classification (Yes/No)
- **Risk Scoring**: Numerical risk score (0-100) for each employee
- **Timeline Estimation**: Predicted attrition timeline (0-3, 3-6, 6-12 months)
- **Explainable AI**: Feature importance and SHAP analysis
- **HR Recommendations**: Actionable retention strategies
- **What-if Analysis**: Impact simulation of interventions
- **Interactive Dashboard**: Web-based HR interface (optional)

### Dataset
The project uses employee data containing:
- Demographics (Age, Gender, Department, Job Role)
- Compensation (Monthly Income, Salary Hikes)
- Work Factors (Overtime, Work-Life Balance, Job Satisfaction)
- Career (Years at Company, Promotion History, Years since Promotion)
- Target Variable: Attrition (Yes/No)

### Models Implemented
1. **Logistic Regression** - Baseline model for interpretability
2. **Decision Tree** - Feature-based rule learning
3. **Random Forest** - Ensemble approach (selected as final model)

### Project Structure
```
Employee_Attrition_Project/
├── data/                          # Datasets
│   ├── raw_data.csv
│   ├── cleaned_data.csv
│   └── preprocessed_data.csv
├── notebooks/                     # Jupyter notebooks for analysis
│   ├── 01_data_exploration.ipynb
│   ├── 02_data_preprocessing.ipynb
│   ├── 03_model_training.ipynb
│   ├── 04_model_evaluation.ipynb
│   └── 05_explainable_ai.ipynb
├── src/                           # Python modules
│   ├── data_preprocessing.py
│   ├── feature_selection.py
│   ├── model_training.py
│   ├── model_prediction.py
│   ├── risk_scoring.py
│   ├── timeline_prediction.py
│   ├── recommendation_engine.py
│   └── utils.py
├── models/                        # Trained models
│   ├── logistic_regression.pkl
│   ├── decision_tree.pkl
│   └── random_forest.pkl
├── explainability/                # Explainability outputs
│   ├── feature_importance.png
│   └── shap_summary_plot.png
├── dashboard/                     # Optional web dashboard
│   ├── app.py
│   ├── requirements.txt
│   └── README.md
├── reports/                       # Project reports
│   ├── project_report.pdf
│   ├── abstract.docx
│   └── presentation.pptx
├── results/                       # Results and metrics
│   ├── model_comparison.csv
│   ├── confusion_matrix.png
│   ├── feature_importance.csv
│   └── evaluation_metrics.txt
├── requirements.txt
├── main.py                        # Entry point
└── README.md
```

### Installation & Setup

#### 1. Clone or Download Project
```bash
cd Employee_Attrition_Project
```

#### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

#### 3. Prepare Data
- Place your employee dataset in `data/raw_data.csv`
- Ensure it contains an "Attrition" column with Yes/No values

#### 4. Run Main Pipeline
```bash
python main.py
```

#### 5. Run Notebooks
For detailed analysis, run the Jupyter notebooks:
```bash
jupyter notebook notebooks/
```

### Usage Examples

#### Example 1: Single Employee Prediction
```python
import pickle
import pandas as pd
from src.data_preprocessing import DataPreprocessor
from src.risk_scoring import RiskScorer

# Load model and preprocessor
with open('models/random_forest.pkl', 'rb') as f:
    model = pickle.load(f)

preprocessor = DataPreprocessor()

# Employee data
employee = pd.DataFrame({
    'Age': [35],
    'Income': [50000],
    'Satisfaction': [3],
    # ... other features
})

# Get risk score
risk_scorer = RiskScorer(model, preprocessor)
risk_score = risk_scorer.calculate_risk_score(employee)
print(f"Risk Score: {risk_score:.2f}")
```

#### Example 2: Batch Prediction
```python
from src.model_prediction import AttritionPredictor

# Load all employees
employees = pd.read_csv('data/employee_batch.csv')

# Make predictions
predictor = AttritionPredictor(model, preprocessor)
results = predictor.predict_batch(employees)
print(results)
```

#### Example 3: HR Recommendations
```python
from src.recommendation_engine import RecommendationEngine

rec_engine = RecommendationEngine()
recommendations = rec_engine.generate_recommendations(
    employee_data=employee,
    risk_score=risk_score,
    feature_importance=feature_importance_df
)
print(recommendations)
```

### Model Performance
- **Random Forest Accuracy**: ~85%
- **Precision**: ~80%
- **Recall**: ~75%
- **ROC-AUC**: ~0.88

### Key Insights
1. **Top Attrition Factors**: Monthly Income, Overtime, Job Satisfaction
2. **High Risk Threshold**: Risk Score > 75
3. **Critical Timeline**: Employees with score > 75 likely to leave within 0-3 months
4. **Most Effective Interventions**: Salary increase + work-life balance improvements

### Real-World Applications
✓ Early identification of flight-risk employees  
✓ Targeted retention programs  
✓ HR resource planning  
✓ Cost reduction in recruitment & training  
✓ Improved workforce stability  

### Ethical Considerations
- ✓ Employee privacy maintained through secure data handling
- ✓ Model used as decision-support tool, not for automated firing
- ✓ Bias and fairness analysis included
- ✓ Predictions are explainable and transparent
- ✓ Regular model audits for accuracy and fairness

### Future Enhancements
1. NLP analysis of exit interview feedback
2. Real-time HR data integration
3. Deep learning models (LSTM for temporal patterns)
4. Cloud deployment (AWS, GCP, Azure)
5. Advanced fairness metrics (Disparate Impact Analysis)
6. AutoML for model selection

### Technologies Used
- **Language**: Python 3.7+
- **ML Framework**: Scikit-learn
- **Data Processing**: Pandas, NumPy
- **Visualization**: Matplotlib, Seaborn, Plotly
- **Explainability**: SHAP
- **Web Framework**: Flask (Optional)
- **Notebooks**: Jupyter

### Contributing
Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

### License
This project is open-source and available under the MIT License.

### Support & Contact
For issues, questions, or suggestions:
- Create an issue in the repository
- Contact the development team

### Acknowledgments
- Dataset inspired by HR analytics case studies
- Machine learning best practices from scikit-learn documentation
- Explainability methods based on SHAP and feature importance research

---

**Last Updated**: January 2026  
**Version**: 1.0.0  
**Status**: Production Ready
