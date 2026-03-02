"""
Model training module for Employee Attrition Prediction.
Implements Logistic Regression, Decision Tree, and Random Forest.
"""

from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import (accuracy_score, precision_score, recall_score,
                             confusion_matrix, classification_report, roc_auc_score)
import pandas as pd
import numpy as np


class ModelTrainer:
    """Train and evaluate classification models."""
    
    def __init__(self, random_state=42):
        self.random_state = random_state
        self.models = {}
        self.results = {}
    
    def split_data(self, X, y, test_size=0.2, random_state=42):
        """Split data into train and test sets."""
        return train_test_split(X, y, test_size=test_size, random_state=random_state)
    
    def train_logistic_regression(self, X_train, y_train):
        """Train Logistic Regression model."""
        model = LogisticRegression(random_state=self.random_state, max_iter=1000)
        model.fit(X_train, y_train)
        self.models['LogisticRegression'] = model
        return model
    
    def train_decision_tree(self, X_train, y_train):
        """Train Decision Tree model."""
        model = DecisionTreeClassifier(random_state=self.random_state, max_depth=10)
        model.fit(X_train, y_train)
        self.models['DecisionTree'] = model
        return model
    
    def train_random_forest(self, X_train, y_train):
        """Train Random Forest model."""
        model = RandomForestClassifier(n_estimators=100, random_state=self.random_state,
                                       max_depth=15, min_samples_split=5)
        model.fit(X_train, y_train)
        self.models['RandomForest'] = model
        return model
    
    def evaluate_model(self, model, X_test, y_test, model_name):
        """Evaluate model performance."""
        y_pred = model.predict(X_test)
        y_pred_proba = model.predict_proba(X_test)[:, 1]
        
        metrics = {
            'Model': model_name,
            'Accuracy': accuracy_score(y_test, y_pred),
            'Precision': precision_score(y_test, y_pred),
            'Recall': recall_score(y_test, y_pred),
            'ROC-AUC': roc_auc_score(y_test, y_pred_proba),
            'Confusion_Matrix': confusion_matrix(y_test, y_pred),
            'Classification_Report': classification_report(y_test, y_pred)
        }
        
        self.results[model_name] = metrics
        return metrics
    
    def compare_models(self):
        """Compare all trained models."""
        comparison = pd.DataFrame({
            'Model': [r['Model'] for r in self.results.values()],
            'Accuracy': [r['Accuracy'] for r in self.results.values()],
            'Precision': [r['Precision'] for r in self.results.values()],
            'Recall': [r['Recall'] for r in self.results.values()],
            'ROC-AUC': [r['ROC-AUC'] for r in self.results.values()]
        })
        return comparison
