"""
Utility functions for Employee Attrition Prediction project.
Contains helper functions for data loading, preprocessing, and visualization.
"""

import pandas as pd
import numpy as np
import pickle
from pathlib import Path


def load_data(filepath):
    """Load CSV data from file."""
    try:
        return pd.read_csv(filepath)
    except FileNotFoundError:
        print(f"Error: File {filepath} not found.")
        return None


def save_model(model, filepath):
    """Save trained model to pickle file."""
    Path(filepath).parent.mkdir(parents=True, exist_ok=True)
    with open(filepath, 'wb') as f:
        pickle.dump(model, f)
    print(f"Model saved to {filepath}")


def load_model(filepath):
    """Load trained model from pickle file."""
    with open(filepath, 'rb') as f:
        return pickle.load(f)


def create_directories(base_path):
    """Create all necessary project directories."""
    directories = ['data', 'models', 'results', 'explainability']
    for directory in directories:
        Path(base_path / directory).mkdir(parents=True, exist_ok=True)


def handle_missing_values(df, strategy='mean'):
    """Handle missing values in dataset."""
    if strategy == 'mean':
        return df.fillna(df.mean(numeric_only=True))
    elif strategy == 'median':
        return df.fillna(df.median(numeric_only=True))
    elif strategy == 'drop':
        return df.dropna()
    return df


def get_numeric_columns(df):
    """Get list of numeric columns from dataframe."""
    return df.select_dtypes(include=[np.number]).columns.tolist()


def get_categorical_columns(df):
    """Get list of categorical columns from dataframe."""
    return df.select_dtypes(include=['object']).columns.tolist()
