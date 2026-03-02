# 🚀 Quick Start Guide: Role-Based File Upload

## ⚡ 5-Minute Setup & Demo

### Step 1: Start the Server
```bash
cd "c:\Users\asrit\OneDrive\Desktop\PDNC PROJECT\dashboard"
python app.py
```

### Step 2: Open the Dashboard
Open your browser and navigate to: **http://127.0.0.1:5000**

---

## 🔐 Demo Credentials

### ADMIN Account
- **Username:** `admin`
- **Password:** `admin123`
- **Can upload:** Excel files (`.xls`, `.xlsx`)
- **Use case:** Import employee datasets

### USER Account
- **Username:** `user`
- **Password:** `user123`
- **Can upload:** PDF, DOCX, TXT, CSV, Images
- **Use case:** Upload supporting documents

---

## 📋 Quick Test Workflow

### Test as ADMIN (30 seconds)
1. Click **"Login"** button in the header
2. Enter: `admin` / `admin123`
3. Click **"Import Dataset"** button (appears after login)
4. Drag & drop an `.xlsx` file OR click to browse
5. Click **"Upload File"**
6. ✅ Success! File saved to `uploads/admin_datasets/`

### Test as USER (30 seconds)
1. Click **"Logout"** (if logged in as admin)
2. Click **"Login"** again
3. Enter: `user` / `user123`
4. Click **"Import Dataset"** button
5. Upload a `.pdf`, `.docx`, or image file
6. ✅ Success! File saved to `uploads/user_documents/`

---

## 🎯 Key Features at a Glance

| Feature | ADMIN | USER |
|---------|-------|------|
| **Allowed Files** | `.xls`, `.xlsx` | `.pdf`, `.docx`, `.txt`, `.csv`, images |
| **Storage Location** | `uploads/admin_datasets/` | `uploads/user_documents/` |
| **Max File Size** | 16 MB | 16 MB |
| **Drag & Drop** | ✅ Yes | ✅ Yes |
| **Real-time Validation** | ✅ Yes | ✅ Yes |

---

## 🔒 Security Features

- ✅ **Session-based authentication** (must login to upload)
- ✅ **Role-based access control** (enforced on backend)
- ✅ **File type validation** (client + server side)
- ✅ **Secure filename handling** (prevents path traversal)
- ✅ **Timestamp-based naming** (prevents overwrites)
- ✅ **Size limits** (16MB maximum)
- ✅ **Directory isolation** (admin/user files separated)

---

## 🧪 Run Automated Tests

```bash
cd "c:\Users\asrit\OneDrive\Desktop\PDNC PROJECT"
python test_upload_feature.py
```

This will automatically test:
- ✅ Login/logout functionality
- ✅ ADMIN file validation
- ✅ USER file validation
- ✅ Upload without authentication
- ✅ File storage separation

---

## 📂 File Storage Structure

```
PDNC PROJECT/
└── uploads/
    ├── admin_datasets/          # Excel files only
    │   └── 20260209_143022_employee_data.xlsx
    └── user_documents/          # All user uploads
        └── 20260209_143045_report.pdf
```

Files are automatically renamed with timestamp prefix to prevent conflicts.

---

## 💡 Usage Examples

### Example 1: ADMIN imports new employee data
```
1. Login as admin
2. Click "Import Dataset"
3. Upload "Q1_2026_employees.xlsx"
4. File saved as "20260209_150000_Q1_2026_employees.xlsx"
5. Process the data in the dashboard
```

### Example 2: USER uploads supporting documents
```
1. Login as user
2. Click "Import Dataset"
3. Upload "employee_feedback.pdf"
4. File saved as "20260209_151500_employee_feedback.pdf"
5. Reference in reports
```

---

## ❌ Common Errors & Solutions

### "Please login first"
**Cause:** Not authenticated  
**Solution:** Click "Login" and enter credentials

### "Only Excel files are allowed for Admin users"
**Cause:** ADMIN trying to upload non-Excel file  
**Solution:** Convert file to `.xlsx` format

### "Invalid file type"
**Cause:** USER trying to upload `.xlsx` or other restricted type  
**Solution:** Use allowed formats (PDF, DOCX, etc.)

### "File size exceeds 16MB limit"
**Cause:** File too large  
**Solution:** Compress or split the file

---

## 🎨 UI Elements

### Header Elements
- **Login Button** - Visible when not logged in
- **Import Dataset Button** - Visible only when logged in
- **User Badge** - Shows username and role (ADMIN/USER)
- **Logout Button** - Available in user info section

### Modals
- **Login Modal** - Clean authentication form
- **Upload Modal** - Drag-and-drop file upload interface

### Visual Feedback
- **Success Messages** - Green alerts for successful uploads
- **Error Messages** - Red alerts for validation failures
- **Role Badge** - Color-coded ADMIN/USER indicator
- **File Info** - Shows selected file name

---

## 🚀 Next Steps

1. ✅ **Try both user roles** to see different upload permissions
2. ✅ **Test drag-and-drop** functionality
3. ✅ **Verify file storage** in `uploads/` directories
4. ✅ **Run automated tests** for comprehensive validation
5. ✅ **Check documentation** for API details and production notes

---

## 📖 Full Documentation

For complete details, see: [UPLOAD_FEATURE_DOCUMENTATION.md](UPLOAD_FEATURE_DOCUMENTATION.md)

---

**Happy Uploading! 🎉**
