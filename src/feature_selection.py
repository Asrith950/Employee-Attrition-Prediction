"""
Feature selection module for identifying important predictors.
Uses correlation analysis and statistical methods.
"""

import pandas as pd
import numpy as np
from sklearn.feature_selection import SelectKBest, f_classif, mutual_info_classif
from sklearn.ensemble import RandomForestClassifier


class FeatureSelector:
    """Select relevant features for model training."""
    
    def __init__(self, method='correlation'):
        self.method = method
        self.selected_features = None
        self.feature_scores = None
    
    def correlation_based(self, X, y):
        """Select features based on correlation with target."""
        correlation = pd.DataFrame({
            'Feature': X.columns,
            'Correlation': [X[col].corr(y) for col in X.columns]
        })
        correlation['Abs_Correlation'] = abs(correlation['Correlation'])
        correlation = correlation.sort_values('Abs_Correlation', ascending=False)
        self.feature_scores = correlation
        return correlation
    
    def statistical_test(self, X, y, k=10):
        """Select features using f-statistic."""
        selector = SelectKBest(score_func=f_classif, k=k)
        selector.fit(X, y)
        
        feature_scores = pd.DataFrame({
            'Feature': X.columns,
            'Score': selector.scores_
        }).sort_values('Score', ascending=False)
        
        self.feature_scores = feature_scores
        self.selected_features = X.columns[selector.get_support()].tolist()
        return feature_scores
    
    def mutual_information(self, X, y, k=10):
        """Select features using mutual information."""
        selector = SelectKBest(score_func=mutual_info_classif, k=k)
        selector.fit(X, y)
        
        feature_scores = pd.DataFrame({
            'Feature': X.columns,
            'Score': selector.scores_
        }).sort_values('Score', ascending=False)
        
        self.feature_scores = feature_scores
        self.selected_features = X.columns[selector.get_support()].tolist()
        return feature_scores
    
    def random_forest_importance(self, X, y):
        """Select features based on Random Forest importance."""
        rf = RandomForestClassifier(n_estimators=100, random_state=42)
        rf.fit(X, y)
        
        feature_importance = pd.DataFrame({
            'Feature': X.columns,
            'Importance': rf.feature_importances_
        }).sort_values('Importance', ascending=False)
        
        self.feature_scores = feature_importance
        self.selected_features = feature_importance['Feature'].tolist()
        return feature_importance
