/**
 * ML Engine - Frontend-only Machine Learning Simulation
 * Handles all data processing, risk scoring, and predictions
 */

class MLEngine {
    constructor() {
        this.dataset = null;
        this.processedData = null;
        this.riskThreshold = 75;
        this.statistics = null;
        this.listeners = [];
    }

    /**
     * Subscribe to dataset changes
     */
    subscribe(callback) {
        this.listeners.push(callback);
    }

    /**
     * Notify all subscribers of data changes
     */
    notify() {
        this.listeners.forEach(callback => callback(this));
    }

    /**
     * Load dataset from array
     */
    loadDataset(data) {
        this.dataset = data;
        this.processDataset();
        this.notify();
    }

    /**
     * Validate required columns
     */
    validateDataset(data) {
        const required = [
            'Age', 'Department', 'JobRole', 'MonthlyIncome',
            'JobSatisfaction', 'WorkLifeBalance', 'YearsAtCompany',
            'OverTime', 'Attrition'
        ];

        if (!data || data.length === 0) {
            throw new Error('Dataset is empty');
        }

        const columns = Object.keys(data[0]);
        const missing = required.filter(col => !columns.includes(col));

        if (missing.length > 0) {
            throw new Error(`Missing required columns: ${missing.join(', ')}`);
        }

        return true;
    }

    /**
     * Preprocess dataset
     */
    processDataset() {
        if (!this.dataset) return;

        // Clone dataset
        let processed = JSON.parse(JSON.stringify(this.dataset));

        // Fill missing values
        processed = this.fillMissingValues(processed);

        // Encode categorical variables
        processed = this.encodeCategorical(processed);

        // Calculate risk scores
        processed = this.calculateRiskScores(processed);

        // Classify risk levels
        processed = this.classifyRisk(processed);

        this.processedData = processed;
        this.calculateStatistics();
    }

    /**
     * Fill missing numeric values with mean
     */
    fillMissingValues(data) {
        const numericFields = ['Age', 'MonthlyIncome', 'JobSatisfaction', 
                               'WorkLifeBalance', 'YearsAtCompany'];

        numericFields.forEach(field => {
            const values = data
                .map(row => parseFloat(row[field]))
                .filter(val => !isNaN(val) && val !== null);
            
            const mean = values.reduce((a, b) => a + b, 0) / values.length;

            data.forEach(row => {
                if (isNaN(parseFloat(row[field])) || row[field] === null || row[field] === '') {
                    row[field] = mean;
                }
                row[field] = parseFloat(row[field]);
            });
        });

        return data;
    }

    /**
     * Encode categorical variables
     */
    encodeCategorical(data) {
        data.forEach(row => {
            // OverTime: Yes = 1, No = 0
            row.OverTime_Encoded = (row.OverTime === 'Yes' || row.OverTime === 1) ? 1 : 0;
            
            // Attrition: Yes = 1, No = 0
            row.Attrition_Encoded = (row.Attrition === 'Yes' || row.Attrition === 1) ? 1 : 0;
        });

        return data;
    }

    /**
     * Normalize value to 0-1 range
     */
    normalize(value, min, max) {
        if (max === min) return 0.5;
        return (value - min) / (max - min);
    }

    /**
     * Calculate risk scores using the specified algorithm
     */
    calculateRiskScores(data) {
        // Get min/max for normalization
        const ages = data.map(r => r.Age);
        const incomes = data.map(r => r.MonthlyIncome);
        const years = data.map(r => r.YearsAtCompany);

        const minAge = Math.min(...ages);
        const maxAge = Math.max(...ages);
        const minIncome = Math.min(...incomes);
        const maxIncome = Math.max(...incomes);
        const minYears = Math.min(...years);
        const maxYears = Math.max(...years);

        data.forEach(row => {
            // Normalize satisfaction and work-life balance (1-5 scale to 0-1)
            const normSatisfaction = (row.JobSatisfaction - 1) / 4;
            const normWorkLife = (row.WorkLifeBalance - 1) / 4;
            
            // Normalize other features
            const normIncome = this.normalize(row.MonthlyIncome, minIncome, maxIncome);
            const normYears = this.normalize(row.YearsAtCompany, minYears, maxYears);
            const normAge = this.normalize(row.Age, minAge, maxAge);

            // Calculate raw risk score (0-1)
            const rawRisk = 
                0.25 * (1 - normSatisfaction) +
                0.20 * row.OverTime_Encoded +
                0.15 * (1 - normWorkLife) +
                0.15 * (1 - normIncome) +
                0.15 * (1 - normYears) +
                0.10 * (1 - normAge);

            // Scale to 0-100
            row.RiskScore = Math.round(rawRisk * 100);
            
            // Store component scores for explainability
            row.RiskFactors = {
                satisfaction: Math.round((1 - normSatisfaction) * 100),
                overtime: row.OverTime_Encoded * 100,
                worklife: Math.round((1 - normWorkLife) * 100),
                income: Math.round((1 - normIncome) * 100),
                tenure: Math.round((1 - normYears) * 100),
                age: Math.round((1 - normAge) * 100)
            };
        });

        return data;
    }

    /**
     * Classify employees by risk level
     */
    classifyRisk(data) {
        data.forEach(row => {
            if (row.RiskScore >= this.riskThreshold) {
                row.RiskStatus = 'High Risk';
                row.RiskLevel = 'high';
            } else if (row.RiskScore >= 50) {
                row.RiskStatus = 'Medium Risk';
                row.RiskLevel = 'medium';
            } else {
                row.RiskStatus = 'Low Risk';
                row.RiskLevel = 'low';
            }

            // Predicted attrition
            row.PredictedAttrition = row.RiskScore >= this.riskThreshold ? 'Yes' : 'No';
        });

        return data;
    }

    /**
     * Calculate global statistics
     */
    calculateStatistics() {
        if (!this.processedData) return;

        const data = this.processedData;
        const n = data.length;

        this.statistics = {
            totalEmployees: n,
            attritionCount: data.filter(r => r.Attrition_Encoded === 1).length,
            attritionRate: (data.filter(r => r.Attrition_Encoded === 1).length / n * 100).toFixed(1),
            averageAge: (data.reduce((sum, r) => sum + r.Age, 0) / n).toFixed(1),
            averageIncome: Math.round(data.reduce((sum, r) => sum + r.MonthlyIncome, 0) / n),
            highRisk: data.filter(r => r.RiskLevel === 'high').length,
            mediumRisk: data.filter(r => r.RiskLevel === 'medium').length,
            lowRisk: data.filter(r => r.RiskLevel === 'low').length,
            averageRiskScore: (data.reduce((sum, r) => sum + r.RiskScore, 0) / n).toFixed(1)
        };

        // Calculate model metrics (comparing prediction vs actual)
        this.statistics.metrics = this.calculateModelMetrics();
        
        // Department statistics
        this.statistics.byDepartment = this.groupByDepartment();
        
        // Risk distribution
        this.statistics.riskDistribution = this.getRiskDistribution();
    }

    /**
     * Calculate model performance metrics
     */
    calculateModelMetrics() {
        if (!this.processedData) return null;

        let tp = 0, fp = 0, tn = 0, fn = 0;

        this.processedData.forEach(row => {
            const actual = row.Attrition_Encoded === 1;
            const predicted = row.RiskScore >= this.riskThreshold;

            if (predicted && actual) tp++;
            else if (predicted && !actual) fp++;
            else if (!predicted && !actual) tn++;
            else fn++;
        });

        const accuracy = ((tp + tn) / (tp + tn + fp + fn) * 100).toFixed(1);
        const precision = tp + fp > 0 ? (tp / (tp + fp) * 100).toFixed(1) : 0;
        const recall = tp + fn > 0 ? (tp / (tp + fn) * 100).toFixed(1) : 0;
        const f1 = precision > 0 && recall > 0 
            ? (2 * precision * recall / (parseFloat(precision) + parseFloat(recall))).toFixed(1) 
            : 0;

        return {
            accuracy,
            precision,
            recall,
            f1Score: f1,
            truePositives: tp,
            falsePositives: fp,
            trueNegatives: tn,
            falseNegatives: fn,
            confusionMatrix: [[tn, fp], [fn, tp]]
        };
    }

    /**
     * Group statistics by department
     */
    groupByDepartment() {
        if (!this.processedData) return {};

        const departments = {};

        this.processedData.forEach(row => {
            const dept = row.Department;
            if (!departments[dept]) {
                departments[dept] = {
                    total: 0,
                    attrition: 0,
                    highRisk: 0,
                    avgRiskScore: 0,
                    avgIncome: 0
                };
            }

            departments[dept].total++;
            if (row.Attrition_Encoded === 1) departments[dept].attrition++;
            if (row.RiskLevel === 'high') departments[dept].highRisk++;
            departments[dept].avgRiskScore += row.RiskScore;
            departments[dept].avgIncome += row.MonthlyIncome;
        });

        // Calculate averages
        Object.keys(departments).forEach(dept => {
            const d = departments[dept];
            d.avgRiskScore = (d.avgRiskScore / d.total).toFixed(1);
            d.avgIncome = Math.round(d.avgIncome / d.total);
            d.attritionRate = (d.attrition / d.total * 100).toFixed(1);
        });

        return departments;
    }

    /**
     * Get risk score distribution
     */
    getRiskDistribution() {
        if (!this.processedData) return [];

        const bins = [0, 20, 40, 60, 80, 100];
        const distribution = bins.slice(0, -1).map((bin, i) => ({
            range: `${bin}-${bins[i + 1]}`,
            count: 0
        }));

        this.processedData.forEach(row => {
            const score = row.RiskScore;
            const binIndex = Math.min(Math.floor(score / 20), 4);
            distribution[binIndex].count++;
        });

        return distribution;
    }

    /**
     * Update risk threshold and recalculate
     */
    setRiskThreshold(threshold) {
        this.riskThreshold = threshold;
        if (this.processedData) {
            this.processDataset();
            this.notify();
        }
    }

    /**
     * Get employees by filter
     */
    getEmployees(filter = {}) {
        if (!this.processedData) return [];

        let filtered = [...this.processedData];

        // Apply filters
        if (filter.department) {
            filtered = filtered.filter(e => e.Department === filter.department);
        }
        if (filter.riskLevel) {
            filtered = filtered.filter(e => e.RiskLevel === filter.riskLevel);
        }
        if (filter.search) {
            const search = filter.search.toLowerCase();
            filtered = filtered.filter(e => 
                (e.EmployeeID && e.EmployeeID.toString().includes(search)) ||
                (e.Name && e.Name.toLowerCase().includes(search)) ||
                (e.JobRole && e.JobRole.toLowerCase().includes(search))
            );
        }

        // Sort
        if (filter.sortBy) {
            const field = filter.sortBy;
            const order = filter.sortOrder === 'desc' ? -1 : 1;
            filtered.sort((a, b) => {
                if (a[field] < b[field]) return -1 * order;
                if (a[field] > b[field]) return 1 * order;
                return 0;
            });
        }

        return filtered;
    }

    /**
     * Get high-risk employees
     */
    getHighRiskEmployees(limit = 10) {
        if (!this.processedData) return [];

        return [...this.processedData]
            .filter(e => e.RiskLevel === 'high')
            .sort((a, b) => b.RiskScore - a.RiskScore)
            .slice(0, limit);
    }

    /**
     * Export data as CSV
     */
    exportCSV() {
        if (!this.processedData) return '';

        const headers = ['EmployeeID', 'Department', 'JobRole', 'Age', 'MonthlyIncome', 
                        'RiskScore', 'RiskStatus', 'PredictedAttrition', 'Attrition'];
        
        const rows = this.processedData.map(row => 
            headers.map(h => row[h] || '').join(',')
        );

        return [headers.join(','), ...rows].join('\n');
    }

    /**
     * Reset dataset
     */
    reset() {
        this.dataset = null;
        this.processedData = null;
        this.statistics = null;
        this.notify();
    }
}

// Global instance
const mlEngine = new MLEngine();
