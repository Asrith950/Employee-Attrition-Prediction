"""
HR Recommendation Engine module for providing retention recommendations.
"""

import pandas as pd


class RecommendationEngine:
    """Generate HR recommendations for high-risk employees."""
    
    def __init__(self):
        self.recommendations_db = {
            'low_salary': [
                'Consider salary increase (Target: Industry average +10%)',
                'Review compensation package competitiveness',
                'Implement performance-based bonus system'
            ],
            'high_overtime': [
                'Redistribute workload to reduce overtime hours',
                'Hire additional team members',
                'Implement flexible working hours'
            ],
            'low_satisfaction': [
                'Conduct 1-on-1 feedback sessions',
                'Review job role alignment',
                'Provide career development opportunities'
            ],
            'no_promotion': [
                'Create clear promotion roadmap',
                'Provide skill development training',
                'Offer leadership development programs'
            ],
            'low_work_life_balance': [
                'Implement work-from-home policy',
                'Ensure reasonable working hours',
                'Provide wellness programs'
            ],
            'department_issues': [
                'Review team dynamics',
                'Consider team restructuring',
                'Improve team communication'
            ]
        }
    
    def generate_recommendations(self, employee_data, risk_score, feature_importance):
        """
        Generate personalized recommendations for an employee.
        
        Args:
            employee_data: Employee data (DataFrame row)
            risk_score: Attrition risk score
            feature_importance: DataFrame with feature importance scores
        
        Returns:
            List of recommendations
        """
        recommendations = []
        
        # Get top risk factors
        top_factors = feature_importance.nlargest(3, 'Importance')['Feature'].tolist()
        
        # Generate recommendations based on risk factors
        for factor in top_factors:
            if 'Salary' in factor or 'Income' in factor:
                recommendations.extend(self.recommendations_db.get('low_salary', []))
            elif 'Overtime' in factor:
                recommendations.extend(self.recommendations_db.get('high_overtime', []))
            elif 'Satisfaction' in factor:
                recommendations.extend(self.recommendations_db.get('low_satisfaction', []))
            elif 'Promotion' in factor or 'Promotion' not in str(employee_data):
                recommendations.extend(self.recommendations_db.get('no_promotion', []))
            elif 'Balance' in factor or 'Work' in factor:
                recommendations.extend(self.recommendations_db.get('low_work_life_balance', []))
        
        # General recommendations for high-risk employees
        if risk_score > 75:
            recommendations.append('Schedule urgent meeting with HR manager')
            recommendations.append('Fast-track promotion or role change')
            recommendations.append('Offer retention bonus/incentive')
        elif risk_score > 50:
            recommendations.append('Schedule career development discussion')
            recommendations.append('Review compensation package')
        
        return list(set(recommendations))[:5]  # Return top 5 unique recommendations
    
    def generate_batch_recommendations(self, employee_data, risk_scores, feature_importance):
        """
        Generate recommendations for multiple employees.
        
        Args:
            employee_data: DataFrame with multiple employees
            risk_scores: Risk scores for employees
            feature_importance: Feature importance data
        
        Returns:
            DataFrame with recommendations
        """
        recommendations_list = []
        
        for idx, (_, row) in enumerate(employee_data.iterrows()):
            recs = self.generate_recommendations(row, risk_scores[idx], feature_importance)
            recommendations_list.append('; '.join(recs))
        
        return pd.DataFrame({
            'Recommendations': recommendations_list
        })
    
    def get_action_plan(self, risk_category):
        """
        Get action plan based on risk category.
        
        Args:
            risk_category: Risk category (Low, Medium, High, Critical)
        
        Returns:
            Action plan (string)
        """
        plans = {
            'Low Risk': 'Regular monitoring and feedback',
            'Medium Risk': 'Monthly check-ins and career development',
            'High Risk': 'Bi-weekly meetings and targeted interventions',
            'Critical Risk': 'Immediate manager and HR intervention required'
        }
        return plans.get(risk_category, 'No specific action plan')
