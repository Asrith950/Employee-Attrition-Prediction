# Role-Based File Upload Feature Documentation

## Overview
This document describes the implementation of role-based file upload functionality for the Employee Attrition Prediction Dashboard.

## Features Implemented

### 1. **Authentication System**
- **Login/Logout functionality** with session management
- **Two user roles**: ADMIN and USER
- **Demo credentials**:
  - Admin: `username: admin` / `password: admin123`
  - User: `username: user` / `password: user123`

### 2. **Role-Based Access Control**

#### ADMIN Role
- **Allowed file types**: Excel files only (`.xls`, `.xlsx`)
- **Upload directory**: `uploads/admin_datasets/`
- **Use case**: Import employee datasets for analysis
- **Validation**: Both frontend and backend validation

#### USER Role
- **Allowed file types**: Documents and images
  - PDF (`.pdf`)
  - Word documents (`.docx`)
  - Text files (`.txt`)
  - CSV files (`.csv`)
  - Images (`.png`, `.jpg`, `.jpeg`, `.gif`)
- **Upload directory**: `uploads/user_documents/`
- **Use case**: Upload supporting documents and reports
- **Validation**: Both frontend and backend validation

### 3. **Security Features**

#### File Upload Security
✅ **File size limit**: 16MB maximum
✅ **Secure filename handling**: Uses `werkzeug.secure_filename()`
✅ **Timestamp-based naming**: Prevents file overwrites
✅ **Role-based directory isolation**: Admin and user files are separated
✅ **Double validation**: Client-side and server-side file type checking
✅ **Session-based authentication**: Cannot upload without login

#### Implementation Details
```python
# File naming format
{timestamp}_{original_filename}
# Example: 20260209_143022_employee_data.xlsx
```

### 4. **User Interface**

#### Login Modal
- Clean, modern design with glassmorphism effects
- Shows demo credentials for easy testing
- Real-time error messages
- Smooth animations

#### Import Dataset Button
- Visible only when logged in
- Located in the header for easy access
- Shows role-based badge (ADMIN/USER)

#### Upload Modal
- Drag and drop support
- Click to browse files
- Real-time file validation
- Role-specific instructions
- Progress feedback during upload
- Success/error notifications

## Technical Stack

### Backend (Flask)
- **Framework**: Flask (Python)
- **Session Management**: Flask sessions with secret key
- **File Handling**: Werkzeug utilities
- **Validation**: Custom role-based validators

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS variables
- **JavaScript**: Vanilla JS for interactivity
- **AJAX**: Fetch API for async operations

## Directory Structure

```
PDNC PROJECT/
├── dashboard/
│   ├── app.py                    # Flask application with auth & upload
│   ├── index.html                # Updated UI with modals and buttons
│   └── ...
├── uploads/                      # Created automatically
│   ├── admin_datasets/          # Admin Excel files
│   └── user_documents/          # User documents
└── UPLOAD_FEATURE_DOCUMENTATION.md
```

## API Endpoints

### Authentication Endpoints

#### POST `/login`
**Request Body:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response (Success):**
```json
{
  "success": true,
  "role": "ADMIN",
  "username": "admin"
}
```

**Response (Failure):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

#### POST `/logout`
**Response:**
```json
{
  "success": true
}
```

#### GET `/api/current-user`
**Response (Logged In):**
```json
{
  "loggedIn": true,
  "username": "admin",
  "role": "ADMIN"
}
```

**Response (Not Logged In):**
```json
{
  "loggedIn": false
}
```

### File Upload Endpoint

#### POST `/api/upload`
**Headers:**
- Requires active session (cookie-based)

**Request:**
- Content-Type: `multipart/form-data`
- Body: File in `file` field

**Response (Success):**
```json
{
  "success": true,
  "message": "File uploaded successfully",
  "filename": "20260209_143022_employee_data.xlsx",
  "role": "ADMIN",
  "uploadType": "Dataset"
}
```

**Response (Error - No Login):**
```json
{
  "success": false,
  "message": "Please login first"
}
```

**Response (Error - Invalid File Type):**
```json
{
  "success": false,
  "message": "Only Excel files (.xls, .xlsx) are allowed for Admin users"
}
```

## Testing Instructions

### 1. Start the Application
```bash
cd "c:\Users\asrit\OneDrive\Desktop\PDNC PROJECT\dashboard"
python app.py
```

### 2. Open in Browser
Navigate to: `http://127.0.0.1:5000`

### 3. Test ADMIN Upload
1. Click **"Login"** button in header
2. Enter credentials:
   - Username: `admin`
   - Password: `admin123`
3. Click **"Login"**
4. Click **"Import Dataset"** button (now visible)
5. Try uploading:
   - ✅ `.xlsx` file (should succeed)
   - ✅ `.xls` file (should succeed)
   - ❌ `.pdf` file (should fail with error message)
6. Check `uploads/admin_datasets/` for uploaded files

### 4. Test USER Upload
1. Logout if logged in as admin
2. Click **"Login"** button
3. Enter credentials:
   - Username: `user`
   - Password: `user123`
4. Click **"Login"**
5. Click **"Import Dataset"** button
6. Try uploading:
   - ✅ `.pdf` file (should succeed)
   - ✅ `.docx` file (should succeed)
   - ✅ Image files (should succeed)
   - ❌ `.xlsx` file (should fail with error message)
7. Check `uploads/user_documents/` for uploaded files

### 5. Test Security Features
1. Test file size > 16MB (should fail)
2. Test drag and drop functionality
3. Test uploading without login (should be blocked)
4. Verify files are renamed with timestamps
5. Check that admin files are NOT in user directory and vice versa

## Validation Rules

### Client-Side Validation (JavaScript)
```javascript
// ADMIN: Only .xls, .xlsx
if (role === 'ADMIN') {
  allowed = ['xls', 'xlsx'].includes(ext);
}

// USER: Multiple document types
else {
  allowed = ['pdf', 'docx', 'txt', 'csv', 'png', 'jpg', 'jpeg', 'gif'].includes(ext);
}

// Size check
if (file.size > 16 * 1024 * 1024) {
  // Reject
}
```

### Server-Side Validation (Python)
```python
def allowed_file(filename, role):
    if '.' not in filename:
        return False
    ext = filename.rsplit('.', 1)[1].lower()
    if role == 'ADMIN':
        return ext in {'xls', 'xlsx'}
    else:
        return ext in {'pdf', 'docx', 'txt', 'csv', 'png', 'jpg', 'jpeg', 'gif'}
```

## Error Handling

### User-Friendly Messages
✅ "Please login first" - When attempting to upload without authentication
✅ "No file selected" - When submitting empty form
✅ "Only Excel files (.xls, .xlsx) are allowed for Admin users" - ADMIN role validation
✅ "Invalid file type. Allowed: PDF, DOCX, TXT, CSV, Images" - USER role validation
✅ "File size exceeds 16MB limit" - Size validation
✅ "File uploaded successfully" - Success confirmation

### Technical Errors
- Network errors are caught and displayed
- Server errors return appropriate HTTP status codes (400, 401, 500)
- All errors are logged to console for debugging

## Code Highlights

### Backend (app.py)
```python
# Secure file upload with role-based validation
@app.route('/api/upload', methods=['POST'])
def upload_file():
    if 'username' not in session:
        return jsonify({'success': False, 'message': 'Please login first'}), 401
    
    role = session.get('role')
    file = request.files['file']
    
    if not allowed_file(file.filename, role):
        # Return role-specific error message
    
    # Secure filename and add timestamp
    original_filename = secure_filename(file.filename)
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    filename = f"{timestamp}_{original_filename}"
    
    # Save to role-specific directory
    upload_folder = get_upload_folder(role)
    file.save(os.path.join(upload_folder, filename))
```

### Frontend (index.html)
```javascript
// Real-time role-based file validation
function handleFile(file) {
    const ext = file.name.split('.').pop().toLowerCase();
    const role = currentUser.role;
    
    let allowed = false;
    if (role === 'ADMIN') {
        allowed = ['xls', 'xlsx'].includes(ext);
    } else {
        allowed = ['pdf', 'docx', 'txt', 'csv', 'png', 'jpg', 'jpeg', 'gif'].includes(ext);
    }
    
    if (!allowed) {
        showAlert('uploadAlert', 'Invalid file type', 'error');
        return;
    }
}
```

## Future Enhancements

### Potential Improvements
1. **Database integration** for user management
2. **File preview** before upload
3. **Bulk upload** functionality
4. **File management dashboard** to view/delete uploaded files
5. **Email notifications** on successful upload
6. **Advanced file type detection** using MIME types
7. **Virus scanning** integration
8. **Cloud storage** integration (S3, Azure Blob)
9. **Upload progress bar** for large files
10. **File compression** before upload

### Production Considerations
⚠️ **Important**: This implementation uses a mock user database for demonstration.

**For production deployment**:
- Replace mock user database with real database (PostgreSQL, MySQL, etc.)
- Implement password hashing (bcrypt, argon2)
- Add CSRF protection
- Use environment variables for sensitive configuration
- Implement rate limiting
- Add comprehensive logging
- Set up proper error monitoring
- Use HTTPS only
- Implement file scanning for malware
- Add user email verification
- Implement password reset functionality

## Troubleshooting

### Common Issues

**Issue**: "Please login first" even after logging in
- **Solution**: Check that cookies are enabled in browser

**Issue**: Upload fails silently
- **Solution**: Check browser console for errors; verify file size < 16MB

**Issue**: Files not appearing in upload directory
- **Solution**: Check that `uploads/` directories were created; verify file permissions

**Issue**: "Invalid file type" for valid files
- **Solution**: Ensure file extension is lowercase; check allowed extensions list

## Summary

✅ **Role-based authentication** with ADMIN and USER roles
✅ **Secure file upload** with size limits and validation
✅ **Separate storage** for admin datasets and user documents
✅ **Client and server validation** for file types
✅ **Modern, responsive UI** with drag-and-drop support
✅ **Real-time feedback** and error handling
✅ **Production-ready structure** with clear upgrade path

The implementation provides a solid foundation for secure, role-based file management in the Employee Attrition Prediction Dashboard.
