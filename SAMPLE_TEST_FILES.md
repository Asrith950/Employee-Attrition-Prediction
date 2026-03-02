# Sample Test Data for Upload Feature

This file contains sample data for testing the upload functionality. You can use these files or create your own.

## For ADMIN Testing (Excel files)

Create a simple Excel file with employee data:

### sample_employees.xlsx
```
| Employee_ID | Name           | Department | Satisfaction | Attrition |
|-------------|----------------|------------|--------------|-----------|
| 1           | John Doe       | Sales      | 4            | No        |
| 2           | Jane Smith     | IT         | 5            | No        |
| 3           | Bob Johnson    | HR         | 3            | Yes       |
| 4           | Alice Williams | Marketing  | 4            | No        |
| 5           | Charlie Brown  | Finance    | 2            | Yes       |
```

You can create this in Excel and save as .xlsx or .xls format.

## For USER Testing (Documents)

### 1. Sample PDF Document
Create a simple PDF with the text:
```
Employee Feedback Report
Date: February 2026

Summary:
This document contains employee feedback and suggestions for improving workplace satisfaction.

Recommendations:
1. Improve work-life balance
2. Offer professional development
3. Enhance communication channels
```

### 2. Sample Text File (feedback.txt)
```
Employee Feedback Notes
-----------------------

Date: 2026-02-09
Department: HR

Feedback Summary:
- Employees appreciate flexible work hours
- Request for more training opportunities
- Suggestion to improve cafeteria services
- Interest in team building activities

Action Items:
1. Survey employees on training needs
2. Review cafeteria vendor options
3. Plan quarterly team events
```

### 3. Sample CSV File (employee_survey.csv)
```csv
Employee_ID,Question,Rating,Comments
101,Work Satisfaction,4,"Great team environment"
102,Work Satisfaction,5,"Love my job"
103,Management Support,3,"Could be better"
104,Career Growth,4,"Good opportunities"
105,Work-Life Balance,2,"Too much overtime"
```

### 4. Sample Image
Any company logo, chart, or employee photo in PNG, JPG, or GIF format.

## Quick File Creation Commands

### Windows PowerShell

```powershell
# Create sample text file
@"
Employee Feedback Notes
-----------------------
Date: 2026-02-09

This is a test document for the upload feature.
"@ | Out-File -FilePath "test_document.txt" -Encoding UTF8

# Create sample CSV
@"
Employee_ID,Name,Department
1,John Doe,Sales
2,Jane Smith,IT
3,Bob Johnson,HR
"@ | Out-File -FilePath "test_data.csv" -Encoding UTF8
```

## File Size Guidelines

- **Small test files:** < 1 MB (recommended for quick testing)
- **Medium files:** 1-5 MB (normal use case)
- **Large files:** 5-16 MB (maximum allowed)
- **Too large:** > 16 MB (will be rejected)

## Test Scenarios

### Scenario 1: Valid ADMIN Upload
1. Login as admin
2. Upload .xlsx file
3. Expected: Success ✅

### Scenario 2: Invalid ADMIN Upload
1. Login as admin
2. Try to upload .pdf file
3. Expected: Error - "Only Excel files are allowed" ❌

### Scenario 3: Valid USER Upload
1. Login as user
2. Upload .pdf, .docx, or .txt file
3. Expected: Success ✅

### Scenario 4: Invalid USER Upload
1. Login as user
2. Try to upload .xlsx file
3. Expected: Error - "Invalid file type" ❌

### Scenario 5: No Authentication
1. Don't login
2. Try to upload any file
3. Expected: Error - "Please login first" ❌

### Scenario 6: File Too Large
1. Login as any user
2. Try to upload file > 16MB
3. Expected: Error - "File size exceeds limit" ❌

## Verification Checklist

After uploading, verify:
- [ ] File appears in correct directory (admin_datasets/ or user_documents/)
- [ ] Filename has timestamp prefix (format: YYYYMMDD_HHMMSS_originalname.ext)
- [ ] Original filename is preserved (after timestamp)
- [ ] File is readable and not corrupted
- [ ] No special characters in saved filename
- [ ] Files from different roles are in separate directories

## Sample Files Location

After testing, your files should be in:
```
uploads/
├── admin_datasets/
│   └── 20260209_143022_sample_employees.xlsx
└── user_documents/
    ├── 20260209_143100_feedback.txt
    ├── 20260209_143115_employee_survey.csv
    └── 20260209_143130_report.pdf
```
