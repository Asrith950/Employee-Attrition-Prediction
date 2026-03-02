# Frontend-Only Employee Attrition Prediction System

## 🚀 Complete ML System Without Backend

A fully functional Machine Learning application that runs entirely in the browser with **NO BACKEND REQUIRED**. All data processing, risk scoring, and predictions happen client-side using JavaScript.

---

## ✨ Key Features

### ✅ **Zero Backend Dependency**
- No Python server needed
- No Flask/Django/FastAPI required
- No database connections
- Works offline after initial page load

### ✅ **Complete ML Pipeline**
- Dataset upload via Excel (SheetJS)
- Data preprocessing and validation
- Feature engineering
- Risk score calculation using weighted algorithm
- Classification and predictions
- Model performance metrics

### ✅ **Rich UI Components**
- **Dashboard**: KPIs and risk distribution
- **Employees**: Searchable, filterable employee list
- **Analysis**: Department-wise charts and risk factors
- **Predictions**: Model metrics and high-risk employees
- **Reports**: CSV and PDF export
- **Settings**: Configurable risk threshold

---

## 🎯 Quick Start

### Step 1: Open the Application
Simply open `frontend_ml_app.html` in your browser:
```
file:///c:/Users/asrit/OneDrive/Desktop/PDNC%20PROJECT/dashboard/frontend_ml_app.html
```

### Step 2: Load Data
Three options:
1. **Click "Load Sample"** - Instant demo with 30 employees
2. **Click "Upload Dataset"** - Upload your Excel file
3. **Click "Download Template"** - Get the required Excel format

### Step 3: Explore
Navigate through all pages:
- 📊 Dashboard - Overview and metrics
- 👥 Employees - Detailed employee data
- 📈 Analysis - Visual analytics
- 🤖 Predictions - ML model results
- 📄 Reports - Export functionality
- ⚙️ Settings - Configure parameters

---

## 📋 Required Excel Columns

Your Excel file MUST contain these columns:

| Column | Type | Description | Example |
|--------|------|-------------|---------|
| `Age` | Number | Employee age | 35 |
| `Department` | Text | Department name | Sales |
| `JobRole` | Text | Job title | Sales Executive |
| `MonthlyIncome` | Number | Monthly salary | 5000 |
| `JobSatisfaction` | Number (1-5) | Satisfaction level | 4 |
| `WorkLifeBalance` | Number (1-5) | Work-life balance | 3 |
| `YearsAtCompany` | Number | Tenure in years | 5.5 |
| `OverTime` | Text | "Yes" or "No" | No |
| `Attrition` | Text | "Yes" or "No" | No |

**Optional columns**: `EmployeeID`, `Name` (for better identification)

---

## 🧠 ML Algorithm

### Risk Score Formula

```
RiskScore = 
  0.25 × (1 - Normalized JobSatisfaction) +
  0.20 × (OverTime == "Yes" ? 1 : 0) +
  0.15 × (1 - Normalized WorkLifeBalance) +
  0.15 × (1 - Normalized MonthlyIncome) +
  0.15 × (1 - Normalized YearsAtCompany) +
  0.10 × (1 - Normalized Age)

Final Score: Scaled to 0-100
```

### Risk Classification

- **High Risk**: Score ≥ 75 (default threshold)
- **Medium Risk**: 50 ≤ Score < 75
- **Low Risk**: Score < 50

### Feature Weights Explained

| Feature | Weight | Rationale |
|---------|--------|-----------|
| Job Satisfaction | 25% | Strongest predictor of attrition |
| OverTime | 20% | Work-life balance indicator |
| Work-Life Balance | 15% | Employee wellbeing |
| Monthly Income | 15% | Financial satisfaction |
| Years at Company | 15% | Loyalty and integration |
| Age | 10% | Career stage factor |

---

## 📊 Data Processing Pipeline

### 1. **Validation**
```javascript
✓ Check all required columns exist
✓ Verify data types
✓ Detect missing values
```

### 2. **Preprocessing**
```javascript
✓ Fill missing numerics with mean
✓ Encode categorical variables
   - OverTime: Yes=1, No=0
   - Attrition: Yes=1, No=0
✓ Normalize features to 0-1 scale
```

### 3. **Risk Calculation**
```javascript
✓ Apply weighted formula
✓ Calculate component scores
✓ Generate risk factors breakdown
```

### 4. **Classification**
```javascript
✓ Compare score to threshold
✓ Assign risk level (High/Medium/Low)
✓ Predict attrition (Yes/No)
```

### 5. **Metrics Calculation**
```javascript
✓ Confusion matrix
✓ Accuracy, Precision, Recall, F1
✓ Department statistics
✓ Risk distribution
```

---

## 🎨 UI Features

### Dashboard Page
- **KPI Cards**: Total employees, attrition rate, high-risk count, avg risk score
- **Risk Distribution Chart**: Bar chart showing score ranges
- **Real-time Updates**: Auto-refresh when data changes

### Employees Page
- **Search**: By name, ID, or role
- **Filter**: By department or risk level
- **Sort**: By risk score (descending)
- **Table View**: All employee details with risk scores

### Analysis Page
- **Department Chart**: Attrition rate and avg risk score by department
- **Risk Factors**: Pie chart showing algorithm weight distribution
- **Visual Insights**: Interactive charts with Chart.js

### Predictions Page
- **Model Metrics**: Accuracy, Precision, Recall, F1 Score
- **High-Risk List**: Top 10 employees sorted by risk
- **Risk Factors**: Individual component scores

### Reports Page
- **CSV Export**: Complete dataset with risk scores
- **PDF Report**: Summary statistics and metrics
- **One-Click Download**: Instant file generation

### Settings Page
- **Risk Threshold Slider**: Adjust classification boundary (0-100)
- **Auto-Refresh Toggle**: Enable/disable automatic recalculation
- **Dataset Reset**: Clear all data
- **Algorithm Display**: View the risk score formula

---

## 🔄 State Management

### Global Store (mlEngine)
```javascript
mlEngine.dataset          // Original data
mlEngine.processedData    // Processed with risk scores
mlEngine.statistics       // Calculated metrics
mlEngine.riskThreshold    // Classification threshold
```

### Observer Pattern
```javascript
mlEngine.subscribe(callback)  // Components subscribe to updates
mlEngine.notify()             // Notify all subscribers on change
```

### Automatic Updates
When dataset changes:
1. Preprocessing runs automatically
2. Risk scores recalculated
3. Statistics updated
4. All subscribers notified
5. UI refreshes across all pages

---

## 📦 Technologies Used

### Core Libraries
- **SheetJS (xlsx.js)** - Excel file parsing
- **Chart.js** - Data visualizations
- **jsPDF** - PDF generation

### Pure JavaScript
- No React/Vue/Angular
- No npm/webpack/build process
- No server-side dependencies
- Vanilla JS for maximum simplicity

---

## 📈 Performance Metrics

### Model Evaluation
The system calculates actual ML metrics by comparing:
- **Predicted Attrition** (based on risk score threshold)
- **Actual Attrition** (from dataset)

#### Confusion Matrix
```
              Predicted No    Predicted Yes
Actual No        TN              FP
Actual Yes       FN              TP
```

#### Metrics
- **Accuracy** = (TP + TN) / Total
- **Precision** = TP / (TP + FP)
- **Recall** = TP / (TP + FN)
- **F1 Score** = 2 × (Precision × Recall) / (Precision + Recall)

---

## 🎯 Use Cases

### 1. HR Analytics
- Identify high-risk employees
- Prioritize retention efforts
- Analyze department trends

### 2. Workforce Planning
- Predict attrition rates
- Resource allocation
- Succession planning

### 3. Performance Tuning
- Adjust risk threshold
- Test different scenarios
- Compare department performance

### 4. Reporting
- Export data for presentations
- Generate PDF summaries
- Share insights with stakeholders

---

## 🚀 Advanced Features

### Dynamic Threshold
Adjust in real-time from Settings:
- Slide from 0-100
- Instantly see reclassification
- Understand sensitivity

### Real-Time Filtering
Employees page:
- Type-ahead search
- Multi-criteria filtering
- Instant table updates

### Export Options
- **CSV**: Machine-readable for Excel
- **PDF**: Human-readable reports
- **Excel Template**: Pre-formatted input

---

## 🛠️ Customization

### Modify Risk Algorithm
Edit `ml_engine.js`:
```javascript
calculateRiskScores(data) {
    // Change weights here
    const rawRisk = 
        0.25 * (1 - normSatisfaction) +  // Adjust weight
        0.20 * row.OverTime_Encoded +
        // ... rest of formula
}
```

### Add New Features
To add a new feature to risk calculation:
1. Update required columns in `validateDataset()`
2. Add preprocessing in `processDataset()`
3. Include in risk formula in `calculateRiskScores()`
4. Update UI to display new factor

### Change Styling
Modify CSS variables in `frontend_ml_app.html`:
```css
:root {
    --neon-green: #00ff88;  /* Change primary color */
    --bg-primary: #0a0a0a;  /* Change background */
    /* ... */
}
```

---

## ⚠️ Limitations

### Browser-Only
- ✅ Works offline
- ✅ No server costs
- ❌ Limited by browser memory
- ❌ No data persistence (unless you save files)

### Dataset Size
- Tested with: 30-10,000 rows
- Performance: Excellent for <1,000 rows
- Large datasets (>50,000): May slow down

### Security
- Data never leaves your computer
- No network requests for processing
- Everything stays client-side

---

## 🔍 Troubleshooting

### "Missing required columns" error
- Download the Excel template
- Ensure exact column names (case-sensitive)
- Check for spelling mistakes

### Charts not displaying
- Ensure Chart.js CDN loaded
- Check browser console for errors
- Try refreshing the page

### Export not working
- Check browser allows downloads
- Try different browser
- Verify jsPDF library loaded

### Slow performance
- Reduce dataset size
- Close other browser tabs
- Use modern browser (Chrome/Edge recommended)

---

## 📚 Code Structure

```
dashboard/
├── frontend_ml_app.html      # Main application (standalone)
├── ml_engine.js               # ML logic and calculations
└── data_loader.js             # Excel parsing and sample data
```

### Dependencies (CDN)
```html
<!-- SheetJS for Excel -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>

<!-- Chart.js for viz -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<!-- jsPDF for reports -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
```

---

## 🎓 Learning Resources

### Understanding the Code

1. **ml_engine.js** - Study the risk calculation algorithm
2. **data_loader.js** - Learn Excel parsing with SheetJS
3. **frontend_ml_app.html** - See complete integration

### Key Concepts
- Observer pattern for state management
- Client-side data processing
- Dynamic UI updates
- No-framework approach

---

## 🏆 Advantages Over Backend Systems

| Feature | Frontend-Only | Traditional Backend |
|---------|---------------|---------------------|
| Setup Time | < 1 minute | Hours/Days |
| Dependencies | None | Python, DB, Server |
| Hosting | Any web host | VPS/Cloud |
| Cost | Free | $5-50+/month |
| Privacy | 100% local | Data transmitted |
| Offline | ✅ Yes | ❌ No |
| Scalability | Per user | Shared resources |

---

## 📞 Support & Extension

### Adding New Pages
1. Add navigation item in sidebar
2. Create page div with class="page"
3. Add case in `navigateToPage()`

### Integrating with Backend (Optional)
If you later want to add a backend:
1. Keep `ml_engine.js` for client-side predictions
2. Add API calls in `data_loader.js`
3. Store datasets in database
4. Use backend for heavy processing only

---

## ✅ Success Criteria

Your application is working if you can:
- ✅ Load sample data instantly
- ✅ Upload custom Excel file
- ✅ See all KPIs update
- ✅ Filter employees by risk
- ✅ View department charts
- ✅ Export CSV and PDF
- ✅ Adjust threshold and see changes
- ✅ All without any server

---

## 🎉 Conclusion

This frontend-only system demonstrates that:
- ✅ **ML logic can run in the browser**
- ✅ **Complex calculations are possible client-side**
- ✅ ** No backend is needed for many use cases**
- ✅ **User privacy is maximized (data stays local)**
- ✅ **Deployment is incredibly simple**

**Perfect for:**
- Demos and prototypes
- Educational purposes
- Privacy-sensitive applications
- Cost-effective solutions
- Offline-first requirements

---

**Built with ❤️ using vanilla JavaScript, HTML, and CSS**

*No frameworks. No build tools. No backend. Just pure web technologies.*
