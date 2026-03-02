# Employee Attrition Prediction - Main Entry Point

"""
Main script to run the complete attrition prediction pipeline.
Includes data loading, preprocessing, model training, and inference.
"""

import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), 'src'))

import pandas as pd
import numpy as np
import pickle
from data_preprocessing import DataPreprocessor
from feature_selection import FeatureSelector
from model_training import ModelTrainer
from model_prediction import AttritionPredictor
from risk_scoring import RiskScorer
from timeline_prediction import TimelinePredictor
from recommendation_engine import RecommendationEngine


def main():
    """Main pipeline execution."""
    print("=" * 70)
    print("EMPLOYEE ATTRITION PREDICTION SYSTEM")
    print("=" * 70)
    
    # Step 1: Data Preprocessing
    print("\n[Step 1] Data Preprocessing...")
    preprocessor = DataPreprocessor()
    try:
        df = preprocessor.preprocess('data/raw_data.csv', fit=True)
        print("✓ Data preprocessed successfully")
    except FileNotFoundError:
        print("✗ Error: raw_data.csv not found in data/ folder")
        print("  Please add your employee dataset to data/raw_data.csv")
        return
    
    # Step 2: Prepare features and target
    print("\n[Step 2] Feature Preparation...")
    if 'Attrition' in df.columns:
        X = df.drop('Attrition', axis=1)
        y = df['Attrition']
        print(f"✓ Features: {X.shape}")
        print(f"✓ Target distribution:\n{y.value_counts()}")
    else:
        print("✗ Error: 'Attrition' column not found in dataset")
        return
    
    # Step 3: Train models
    print("\n[Step 3] Model Training...")
    trainer = ModelTrainer()
    X_train, X_test, y_train, y_test = trainer.split_data(X, y, test_size=0.2)
    
    # Train multiple models
    print("  - Training Logistic Regression...")
    lr_model = trainer.train_logistic_regression(X_train, y_train)
    
    print("  - Training Decision Tree...")
    dt_model = trainer.train_decision_tree(X_train, y_train)
    
    print("  - Training Random Forest...")
    rf_model = trainer.train_random_forest(X_train, y_train)
    
    # Evaluate models
    print("\n[Step 4] Model Evaluation...")
    for model, name in [(lr_model, 'Logistic Regression'),
                        (dt_model, 'Decision Tree'),
                        (rf_model, 'Random Forest')]:
        metrics = trainer.evaluate_model(model, X_test, y_test, name)
        print(f"  {name}:")
        print(f"    - Accuracy: {metrics['Accuracy']:.4f}")
        print(f"    - Precision: {metrics['Precision']:.4f}")
        print(f"    - Recall: {metrics['Recall']:.4f}")
    
    # Step 5: Save best model
    print("\n[Step 5] Saving Models...")
    with open('models/random_forest.pkl', 'wb') as f:
        pickle.dump(rf_model, f)
    print("✓ Random Forest model saved")
    
    # Step 6: Advanced features
    print("\n[Step 6] Risk Scoring & Recommendations...")
    risk_scorer = RiskScorer(rf_model, preprocessor)
    timeline_predictor = TimelinePredictor(rf_model, preprocessor)
    recommendation_engine = RecommendationEngine()
    
    # Example predictions on test set
    sample_predictions = []
    for idx in range(min(5, len(X_test))):
        employee = X_test.iloc[[idx]]
        
        # Risk score
        risk_score = risk_scorer.calculate_risk_score(employee)
        risk_category = risk_scorer.get_risk_category(risk_score)
        
        # Timeline
        timeline = timeline_predictor.predict_batch_timeline(employee)
        
        sample_predictions.append({
            'Employee_ID': idx + 1,
            'Risk_Score': round(risk_score, 2),
            'Risk_Category': risk_category,
            'Timeline': timeline['Timeline'].values[0],
            'Probability': round(timeline['Probability'].values[0] * 100, 2)
        })
    
    print("\nSample Predictions (Test Set):") 
    for pred in sample_predictions:
        print(f"  Employee {pred['Employee_ID']}: Risk={pred['Risk_Score']}, "
              f"Category={pred['Risk_Category']}, Timeline={pred['Timeline']}")
    
    print("\n" + "=" * 70)
    print("✓ Pipeline completed successfully!")
    print("=" * 70)
    print("\nNext Steps:")
    print("  1. Run notebooks/ for detailed analysis")
    print("  2. Check results/ folder for reports and visualizations")
    print("  3. Use models/ for inference on new employee data")


if __name__ == "__main__":
    main()
