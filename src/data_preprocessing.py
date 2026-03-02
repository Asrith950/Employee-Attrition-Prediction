"""
Data preprocessing module for Employee Attrition Prediction.
Handles data cleaning, validation, and transformation.
"""

import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler, LabelEncoder
from utils import handle_missing_values, get_numeric_columns, get_categorical_columns


class DataPreprocessor:
    """Preprocess employee attrition data."""
    
    def __init__(self):
        self.scaler = StandardScaler()
        self.label_encoders = {}
    
    def load_raw_data(self, filepath):
        """Load raw data from CSV."""
        return pd.read_csv(filepath)
    
    def clean_data(self, df):
        """Remove duplicates and handle missing values."""
        df = df.drop_duplicates()
        df = handle_missing_values(df, strategy='mean')
        return df
    
    def encode_categorical(self, df, fit=True):
        """Encode categorical variables."""
        categorical_cols = get_categorical_columns(df)
        df_encoded = df.copy()
        
        for col in categorical_cols:
            if col == 'Attrition':  # Skip target variable
                if col not in self.label_encoders:
                    self.label_encoders[col] = LabelEncoder()
                    df_encoded[col] = self.label_encoders[col].fit_transform(df[col])
                else:
                    df_encoded[col] = self.label_encoders[col].transform(df[col])
            elif fit:
                if col not in self.label_encoders:
                    self.label_encoders[col] = LabelEncoder()
                    df_encoded[col] = self.label_encoders[col].fit_transform(df[col])
            else:
                if col in self.label_encoders:
                    df_encoded[col] = self.label_encoders[col].transform(df[col])
        
        return df_encoded
    
    def scale_numeric_features(self, df, fit=True):
        """Normalize numeric features."""
        numeric_cols = get_numeric_columns(df)
        # Exclude target variable from scaling
        numeric_cols = [col for col in numeric_cols if col != 'Attrition']
        df_scaled = df.copy()
        
        if fit:
            df_scaled[numeric_cols] = self.scaler.fit_transform(df[numeric_cols])
        else:
            df_scaled[numeric_cols] = self.scaler.transform(df[numeric_cols])
        
        return df_scaled
    
    def preprocess(self, filepath, fit=True):
        """Complete preprocessing pipeline."""
        df = self.load_raw_data(filepath)
        df = self.clean_data(df)
        df = self.encode_categorical(df, fit=fit)
        df = self.scale_numeric_features(df, fit=fit)
        return df
