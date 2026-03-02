# ⚡ Frontend ML System - Quick Reference Card

## 🚀 Instant Start (30 Seconds)

### Method 1: Double-Click
```
Double-click:frontend_ml_app.html
```

### Method 2: Browser
```
Open browser → Drag and drop → frontend_ml_app.html
```

### Method 3: Direct Path
```
file:///c:/Users/asrit/OneDrive/Desktop/PDNC PROJECT/dashboard/frontend_ml_app.html
```

---

## 🎯 First Steps

1. **Click** "Load Sample" button
2. **Explore** all 6 pages
3. **Try** uploading your Excel file
4. **Adjust** risk threshold in Settings
5. **Export** reports

---

## 📊 Pages Overview

| Page | Icon | Purpose | Key Feature |
|------|------|---------|-------------|
| **Dashboard** | 🏠 | Overview | KPIs + Risk Chart |
| **Employees** | 👥 | Employee List | Search & Filter |
| **Analysis** | 📈 | Visual Analytics | Dept Charts |
| **Predictions** | 🤖 | ML Metrics | Model Performance |
| **Reports** | 📄 | Export | CSV & PDF |
| **Settings** | ⚙️ | Configure | Risk Threshold |

---

## 📁 Excel Format

### Required Columns (Exact Names):
```
Age
Department
JobRole
MonthlyIncome
JobSatisfaction    (1-5 scale)
WorkLifeBalance    (1-5 scale)
YearsAtCompany
OverTime          ("Yes" or "No")
Attrition         ("Yes" or "No")
```

### Optional:
```
EmployeeID
Name
```

---

## 🧮 Risk Score Formula

```
Score = 25% × Job Satisfaction (inverse)
      + 20% × OverTime
      + 15% × Work-Life Balance (inverse)
      + 15% × Income (inverse)
      + 15% × Tenure (inverse)
      + 10% × Age (inverse)
```

**Classification**:
- **High**: ≥ 75
- **Medium**: 50-74
- **Low**: < 50

---

## ⌨️ Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Load Sample | Alt+S (via button) |
| Upload File | Alt+U (via button) |
| Search Employees | Focus search box, type |
| Navigate | Click sidebar items |

---

## 🎨 Key Features

### ✅ NO Backend Required
- Zero server setup
- No Python/Node.js needed
- Works 100% offline
- Data stays on your computer

### ✅ Complete ML Pipeline
- Excel parsing
- Data preprocessing
- Risk scoring
- Classification
- Performance metrics

### ✅ Rich Visualizations
- Bar charts
- Pie charts
- Dynamic tables
- Color-coded badges

### ✅ Export Options
- CSV download
- PDF generation
- Excel template

---

## 🔧 Quick Actions

### Load Sample Data
```javascript
Click "Load Sample" → Instant 30-employee demo
```

### Upload Your Data
```javascript
Click "Upload Dataset" → Select .xlsx file → Auto-process
```

### Adjust Threshold
```javascript
Settings → Drag slider → See instant reclassification
```

### Filter Employees
```javascript
Employees → Department dropdown → Apply filters
```

### Export CSV
```javascript
Reports → Download CSV → Get processed data
```

### Generate PDF
```javascript
Reports → Generate PDF → Get summary report
```

---

## 📈 Sample Dataset Info

**30 Employees** across 3 departments:
- **Sales**: ~40% of workforce
- **Research & Development**: ~40%
- **Human Resources**: ~20%

**Attrition**: ~23% (7 employees)
**High Risk**: ~40% (12 employees)

---

## 🐛 Common Issues & Fixes

### Issue: Can't see charts
**Fix**: Ensure internet connection (for Chart.js CDN)

### Issue: Excel upload fails
**Fix**: 
- Check column names (exact match)
- Verify .xlsx or .xls format
- Try Download Template first

### Issue: Export doesn't work
**Fix**: Allow downloads in browser settings

### Issue: Page loads but blank
**Fix**: 
- Check browser console (F12)
- Ensure ml_engine.js and data_loader.js are present
- Try different browser

---

## 📱 Browser Compatibility

| Browser | Status | Version |
|---------|--------|---------|
| Chrome | ✅ Recommended | 90+ |
| Edge | ✅ Recommended | 90+ |
| Firefox | ✅ Supported | 88+ |
| Safari | ✅ Supported | 14+ |
| Opera | ✅ Supported | 76+ |

---

## 💾 File Structure

```
PDNC PROJECT/
└── dashboard/
    ├── frontend_ml_app.html    ← Main Application
    ├── ml_engine.js            ← ML Logic
    └── data_loader.js          ← Data Processing
```

**That's it!** Only 3 files needed.

---

## 🎯 Use Cases

### ✅ HR Department
- Identify flight risks
- Prioritize retention
- Analyze trends

### ✅ Managers
- Assess team health
- Plan interventions
- Track improvements

### ✅ Executives
- View company metrics
- Compare departments
- Make data-driven decisions

### ✅ Data Scientists
- Prototype algorithms
- Test hypotheses
- Demo concepts

---

## 🔒 Privacy & Security

- ✅ **No data upload** to servers
- ✅ **Everything runs locally** in browser
- ✅ **No tracking** or analytics
- ✅ **No cookies** required
- ✅ **Your data never leaves** your computer

---

## 📚 Learn More

- **Full Documentation**: `FRONTEND_ML_DOCUMENTATION.md`
- **Algorithm Details**: Settings page → Algorithm Info
- **Source Code**: View ml_engine.js for implementation

---

## 🆘 Need Help?

### Check Console
```
F12 → Console tab → Look for errors
```

### Verify Files
```
Ensure all 3 files are in dashboard/ folder
```

### Test Internet
```
CDN libraries need internet on first load
```

---

## ⭐ Pro Tips

1. **Use sample data first** to understand the system
2. **Download template** before creating custom Excel
3. **Adjust threshold** to see how classification changes
4. **Export CSV** to use data in Excel/Python
5. **Try different departments** in filters
6. **Check Analysis page** for visual insights

---

## 🎓 Key Metrics Explained

### Accuracy
```
How often the model is correct overall
Higher = Better
```

### Precision
```
Of predicted high-risk, how many actually left
Higher = Fewer false alarms
```

### Recall
```
Of those who left, how many were predicted
Higher = Caught more leavers
```

### F1 Score
```
Balance between Precision and Recall
Higher = Better overall performance
```

---

## 🚀 Next Steps

1. ✅ Open application
2. ✅ Load sample data
3. ✅ Explore all pages
4. ✅ Upload your Excel
5. ✅ Adjust settings
6. ✅ Export reports
7. ✅ Share insights!

---

## ✨ What Makes This Special?

### Traditional ML App:
```
Python → Flask → Database → Server → Deploy → $$$
```

### This App:
```
HTML file → Double-click → Done → FREE
```

---

## 📞 Quick Command Reference

```javascript
// Global objects available
mlEngine           // ML processing engine
dataLoader         // Excel parser
charts             // Chart.js instances

// Useful functions you can call in console
mlEngine.statistics              // View calculated stats
mlEngine.processedData           // See processed dataset
mlEngine.getHighRiskEmployees()  // Get top risks
loadSampleData()                 // Load demo data
exportCSV()                      // Download CSV
exportPDF()                      // Generate PDF
```

---

## 🎉 Success Checklist

After opening the app, you should be able to:

- [ ] See the dark-themed dashboard
- [ ] Click "Load Sample" and see 30 employees
- [ ] Navigate to all 6 pages
- [ ] See KPIs update with real numbers
- [ ] View charts on Dashboard and Analysis
- [ ] Filter employees by department
- [ ] See high-risk employees on Predictions page
- [ ] Export CSV with risk scores
- [ ] Generate PDF report
- [ ] Adjust risk threshold and see changes
- [ ] Upload custom Excel file (optional)

**If all checked ✅ = Successfully working!**

---

## 💡 Remember

> "This entire ML system requires ZERO backend infrastructure.
> Everything runs in your browser using pure JavaScript."

**No servers. No databases. No installations. Just open and use.**

---

**Quick Start Complete! 🎊**

*Open `frontend_ml_app.html` and start predicting attrition!*
