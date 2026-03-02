"""
Risk scoring module for calculating attrition risk scores (0-100).
"""

import numpy as np
import pandas as pd


class RiskScorer:
    """Calculate attrition risk scores for employees."""
    
    def __init__(self, model, preprocessor):
        """
        Initialize risk scorer.
        
        Args:
            model: Trained classification model
            preprocessor: Fitted DataPreprocessor instance
        """
        self.model = model
        self.preprocessor = preprocessor
    
    def calculate_risk_score(self, employee_data):
        """
        Calculate risk score (0-100) for an employee.
        
        Args:
            employee_data: DataFrame with employee data (single row)
        
        Returns:
            Risk score from 0-100
        """
        processed_data = self.preprocessor.encode_categorical(employee_data, fit=False)
        processed_data = self.preprocessor.scale_numeric_features(processed_data, fit=False)
        
        probability = self.model.predict_proba(processed_data)[0][1]
        risk_score = probability * 100
        
        return risk_score
    
    def get_risk_category(self, risk_score):
        """
        Categorize risk level based on score.
        
        Args:
            risk_score: Score from 0-100
        
        Returns:
            Risk category (Low, Medium, High, Critical)
        """
        if risk_score < 25:
            return 'Low Risk'
        elif risk_score < 50:
            return 'Medium Risk'
        elif risk_score < 75:
            return 'High Risk'
        else:
            return 'Critical Risk'
    
    def score_batch(self, employee_data):
        """
        Calculate risk scores for multiple employees.
        
        Args:
            employee_data: DataFrame with multiple employees
        
        Returns:
            DataFrame with risk scores and categories
        """
        processed_data = self.preprocessor.encode_categorical(employee_data, fit=False)
        processed_data = self.preprocessor.scale_numeric_features(processed_data, fit=False)
        
        probabilities = self.model.predict_proba(processed_data)[:, 1]
        risk_scores = probabilities * 100
        
        results = pd.DataFrame({
            'Risk_Score': risk_scores,
            'Risk_Category': [self.get_risk_category(score) for score in risk_scores]
        })
        
        return results
    
    def identify_high_risk_employees(self, employee_data, threshold=75):
        """
        Identify employees with risk score above threshold.
        
        Args:
            employee_data: DataFrame with employees
            threshold: Risk score threshold (default 75)
        
        Returns:
            DataFrame of high-risk employees
        """
        risk_scores = self.score_batch(employee_data)
        high_risk = employee_data[risk_scores['Risk_Score'] >= threshold].copy()
        high_risk['Risk_Score'] = risk_scores[risk_scores['Risk_Score'] >= threshold]['Risk_Score'].values
        high_risk['Risk_Category'] = risk_scores[risk_scores['Risk_Score'] >= threshold]['Risk_Category'].values
        
        return high_risk.sort_values('Risk_Score', ascending=False)
