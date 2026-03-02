"""
Timeline prediction module for estimating when an employee might leave.
Predicts attrition timeline: 0-3, 3-6, 6-12 months.
"""

import pandas as pd
import numpy as np


class TimelinePredictor:
    """Predict attrition timeline for high-risk employees."""
    
    def __init__(self, model, preprocessor):
        """
        Initialize timeline predictor.
        
        Args:
            model: Trained classification model
            preprocessor: Fitted DataPreprocessor instance
        """
        self.model = model
        self.preprocessor = preprocessor
    
    def predict_timeline(self, employee_data, probability):
        """
        Predict timeline based on attrition probability.
        
        Args:
            employee_data: Employee data (DataFrame row)
            probability: Probability of attrition (0-1)
        
        Returns:
            Estimated timeline (string)
        """
        # Timeline prediction logic based on probability and other factors
        if probability < 0.3:
            return 'Low Risk - More than 12 months'
        elif probability < 0.5:
            return '6-12 months'
        elif probability < 0.7:
            return '3-6 months'
        else:
            return '0-3 months'
    
    def predict_batch_timeline(self, employee_data):
        """
        Predict timeline for multiple employees.
        
        Args:
            employee_data: DataFrame with multiple employees
        
        Returns:
            DataFrame with timeline predictions
        """
        processed_data = self.preprocessor.encode_categorical(employee_data, fit=False)
        processed_data = self.preprocessor.scale_numeric_features(processed_data, fit=False)
        
        probabilities = self.model.predict_proba(processed_data)[:, 1]
        
        timelines = [self.predict_timeline(row, prob) 
                    for row, prob in zip(employee_data.values, probabilities)]
        
        results = pd.DataFrame({
            'Timeline': timelines,
            'Probability': probabilities
        })
        
        return results
    
    def estimate_departure_month(self, risk_score):
        """
        Estimate approximate departure month.
        
        Args:
            risk_score: Attrition risk score (0-100)
        
        Returns:
            Estimated months until departure
        """
        if risk_score < 30:
            return '>12'  # More than 12 months
        elif risk_score < 50:
            return '6-12'
        elif risk_score < 70:
            return '3-6'
        else:
            return '0-3'
