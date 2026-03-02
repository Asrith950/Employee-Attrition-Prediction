"""
Model prediction module for making attrition predictions on new data.
"""

import numpy as np
import pandas as pd


class AttritionPredictor:
    """Make attrition predictions using trained models."""
    
    def __init__(self, model, preprocessor):
        """
        Initialize predictor with trained model and preprocessor.
        
        Args:
            model: Trained classification model
            preprocessor: Fitted DataPreprocessor instance
        """
        self.model = model
        self.preprocessor = preprocessor
    
    def predict_single(self, employee_data):
        """
        Predict attrition for a single employee.
        
        Args:
            employee_data: DataFrame with single row of employee data
        
        Returns:
            Dictionary with prediction and probability
        """
        # Preprocess data
        processed_data = self.preprocessor.encode_categorical(employee_data, fit=False)
        processed_data = self.preprocessor.scale_numeric_features(processed_data, fit=False)
        
        # Make prediction
        prediction = self.model.predict(processed_data)[0]
        probability = self.model.predict_proba(processed_data)[0]
        
        return {
            'Prediction': 'Will Leave' if prediction == 1 else 'Will Stay',
            'Probability_Leave': probability[1],
            'Probability_Stay': probability[0]
        }
    
    def predict_batch(self, employee_data):
        """
        Predict attrition for multiple employees.
        
        Args:
            employee_data: DataFrame with multiple rows
        
        Returns:
            DataFrame with predictions and probabilities
        """
        processed_data = self.preprocessor.encode_categorical(employee_data, fit=False)
        processed_data = self.preprocessor.scale_numeric_features(processed_data, fit=False)
        
        predictions = self.model.predict(processed_data)
        probabilities = self.model.predict_proba(processed_data)
        
        results = pd.DataFrame({
            'Prediction': ['Will Leave' if p == 1 else 'Will Stay' for p in predictions],
            'Probability_Leave': probabilities[:, 1],
            'Probability_Stay': probabilities[:, 0]
        })
        
        return results
    
    def get_prediction_confidence(self, employee_data):
        """Get confidence level of prediction."""
        processed_data = self.preprocessor.encode_categorical(employee_data, fit=False)
        processed_data = self.preprocessor.scale_numeric_features(processed_data, fit=False)
        
        probabilities = self.model.predict_proba(processed_data)[0]
        confidence = max(probabilities) * 100
        
        return confidence
