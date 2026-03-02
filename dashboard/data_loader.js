/**
 * Data Loader - CSV and Excel parsing with validation
 * Supports both CSV (PapaParse) and Excel (SheetJS) formats
 */

class DataLoader {
    constructor(mlEngine) {
        this.mlEngine = mlEngine;
        this.supportedExtensions = ['csv', 'xls', 'xlsx'];
    }

    /**
     * Get file extension from filename
     */
    getFileExtension(filename) {
        const parts = filename.toLowerCase().split('.');
        return parts.length > 1 ? parts[parts.length - 1] : '';
    }

    /**
     * Validate file type
     */
    validateFileType(file) {
        const ext = this.getFileExtension(file.name);
        
        if (!this.supportedExtensions.includes(ext)) {
            throw new Error(`Unsupported file type: .${ext}. Supported formats: CSV, XLS, XLSX`);
        }
        
        return ext;
    }

    /**
     * Load file from file input (main entry point)
     */
    async loadFile(file) {
        return new Promise(async (resolve, reject) => {
            try {
                // Validate file type
                const ext = this.validateFileType(file);
                
                // Parse based on file type
                let jsonData;
                
                if (ext === 'csv') {
                    jsonData = await this.parseCSV(file);
                } else if (ext === 'xls' || ext === 'xlsx') {
                    jsonData = await this.parseExcel(file);
                } else {
                    throw new Error('Invalid file format');
                }
                
                // Validate dataset
                if (!jsonData || jsonData.length === 0) {
                    throw new Error('File is empty or contains no valid data');
                }
                
                // Normalize data
                const normalizedData = this.normalizeData(jsonData);
                
                // Validate required columns
                this.mlEngine.validateDataset(normalizedData);
                
                // Load into ML engine
                this.mlEngine.loadDataset(normalizedData);
                
                resolve({
                    success: true,
                    rows: normalizedData.length,
                    columns: Object.keys(normalizedData[0]).length,
                    fileType: ext.toUpperCase()
                });
                
            } catch (error) {
                console.error('File loading error:', error);
                reject(error);
            }
        });
    }

    /**
     * Parse CSV file using PapaParse
     */
    async parseCSV(file) {
        return new Promise((resolve, reject) => {
            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                dynamicTyping: true,
                trimHeaders: true,
                
                complete: (results) => {
                    try {
                        if (results.errors.length > 0) {
                            console.warn('CSV parsing warnings:', results.errors);
                        }
                        
                        if (!results.data || results.data.length === 0) {
                            reject(new Error('CSV file is empty'));
                            return;
                        }
                        
                        // Clean up data
                        const cleanData = results.data.filter(row => {
                            // Filter out completely empty rows
                            return Object.values(row).some(val => val !== null && val !== '');
                        });
                        
                        resolve(cleanData);
                        
                    } catch (error) {
                        reject(new Error(`CSV parsing error: ${error.message}`));
                    }
                },
                
                error: (error) => {
                    reject(new Error(`CSV file read error: ${error.message}`));
                }
            });
        });
    }

    /**
     * Parse Excel file using SheetJS
     */
    async parseExcel(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (e) => {
                try {
                    const data = new Uint8Array(e.target.result);
                    const workbook = XLSX.read(data, { type: 'array' });
                    
                    // Get first sheet
                    const sheetName = workbook.SheetNames[0];
                    if (!sheetName) {
                        reject(new Error('Excel file contains no sheets'));
                        return;
                    }
                    
                    const worksheet = workbook.Sheets[sheetName];
                    
                    // Convert to JSON
                    const jsonData = XLSX.utils.sheet_to_json(worksheet, {
                        raw: false,
                        defval: null
                    });
                    
                    if (jsonData.length === 0) {
                        reject(new Error('Excel sheet is empty'));
                        return;
                    }
                    
                    resolve(jsonData);
                    
                } catch (error) {
                    reject(new Error(`Excel parsing error: ${error.message}`));
                }
            };

            reader.onerror = () => {
                reject(new Error('Failed to read Excel file'));
            };

            reader.readAsArrayBuffer(file);
        });
    }

    /**
     * Normalize data structure
     */
    normalizeData(data) {
        return data.map(row => {
            const normalized = {};
            
            // Normalize column names and values
            Object.keys(row).forEach(key => {
                // Trim and normalize column name
                const cleanKey = key.trim();
                let value = row[key];
                
                // Trim string values
                if (typeof value === 'string') {
                    value = value.trim();
                    
                    // Handle empty strings
                    if (value === '') {
                        value = null;
                    }
                }
                
                // Convert numeric strings to numbers where appropriate
                if (typeof value === 'string' && !isNaN(value) && value !== '') {
                    const numValue = parseFloat(value);
                    if (!isNaN(numValue)) {
                        value = numValue;
                    }
                }
                
                normalized[cleanKey] = value;
            });
            
            return normalized;
        });
    }

    /**
     * Load Excel file (legacy method for backward compatibility)
     */
    async loadExcelFile(file) {
        return this.loadFile(file);
    }

    /**
     * Load sample dataset (for demo purposes)
     */
    loadSampleDataset() {
        const sampleData = [
            {
                EmployeeID: 1,
                Name: "John Smith",
                Age: 45,
                Department: "Sales",
                JobRole: "Sales Executive",
                MonthlyIncome: 5000,
                JobSatisfaction: 4,
                WorkLifeBalance: 3,
                YearsAtCompany: 10,
                OverTime: "No",
                Attrition: "No"
            },
            {
                EmployeeID: 2,
                Name: "Sarah Johnson",
                Age: 28,
                Department: "Research & Development",
                JobRole: "Research Scientist",
                MonthlyIncome: 8000,
                JobSatisfaction: 5,
                WorkLifeBalance: 4,
                YearsAtCompany: 3,
                OverTime: "No",
                Attrition: "No"
            },
            {
                EmployeeID: 3,
                Name: "Mike Davis",
                Age: 33,
                Department: "Sales",
                JobRole: "Sales Representative",
                MonthlyIncome: 3000,
                JobSatisfaction: 2,
                WorkLifeBalance: 2,
                YearsAtCompany: 1,
                OverTime: "Yes",
                Attrition: "Yes"
            },
            {
                EmployeeID: 4,
                Name: "Emily Wilson",
                Age: 41,
                Department: "Human Resources",
                JobRole: "HR Manager",
                MonthlyIncome: 6500,
                JobSatisfaction: 4,
                WorkLifeBalance: 4,
                YearsAtCompany: 8,
                OverTime: "No",
                Attrition: "No"
            },
            {
                EmployeeID: 5,
                Name: "David Brown",
                Age: 29,
                Department: "Research & Development",
                JobRole: "Laboratory Technician",
                MonthlyIncome: 2500,
                JobSatisfaction: 1,
                WorkLifeBalance: 1,
                YearsAtCompany: 0.5,
                OverTime: "Yes",
                Attrition: "Yes"
            },
            {
                EmployeeID: 6,
                Name: "Lisa Anderson",
                Age: 38,
                Department: "Sales",
                JobRole: "Sales Manager",
                MonthlyIncome: 9500,
                JobSatisfaction: 5,
                WorkLifeBalance: 3,
                YearsAtCompany: 12,
                OverTime: "Yes",
                Attrition: "No"
            },
            {
                EmployeeID: 7,
                Name: "James Taylor",
                Age: 25,
                Department: "Research & Development",
                JobRole: "Research Scientist",
                MonthlyIncome: 3500,
                JobSatisfaction: 3,
                WorkLifeBalance: 2,
                YearsAtCompany: 1,
                OverTime: "Yes",
                Attrition: "Yes"
            },
            {
                EmployeeID: 8,
                Name: "Jennifer Martinez",
                Age: 52,
                Department: "Human Resources",
                JobRole: "Human Resources",
                MonthlyIncome: 7000,
                JobSatisfaction: 4,
                WorkLifeBalance: 4,
                YearsAtCompany: 15,
                OverTime: "No",
                Attrition: "No"
            },
            {
                EmployeeID: 9,
                Name: "Robert Lee",
                Age: 31,
                Department: "Sales",
                JobRole: "Sales Executive",
                MonthlyIncome: 4500,
                JobSatisfaction: 2,
                WorkLifeBalance: 2,
                YearsAtCompany: 2,
                OverTime: "Yes",
                Attrition: "No"
            },
            {
                EmployeeID: 10,
                Name: "Mary White",
                Age: 36,
                Department: "Research & Development",
                JobRole: "Manufacturing Director",
                MonthlyIncome: 12000,
                JobSatisfaction: 5,
                WorkLifeBalance: 5,
                YearsAtCompany: 10,
                OverTime: "No",
                Attrition: "No"
            },
            {
                EmployeeID: 11,
                Name: "William Garcia",
                Age: 27,
                Department: "Sales",
                JobRole: "Sales Representative",
                MonthlyIncome: 2800,
                JobSatisfaction: 1,
                WorkLifeBalance: 1,
                YearsAtCompany: 0.3,
                OverTime: "Yes",
                Attrition: "Yes"
            },
            {
                EmployeeID: 12,
                Name: "Patricia Rodriguez",
                Age: 44,
                Department: "Human Resources",
                JobRole: "HR Business Partner",
                MonthlyIncome: 5500,
                JobSatisfaction: 4,
                WorkLifeBalance: 3,
                YearsAtCompany: 7,
                OverTime: "No",
                Attrition: "No"
            },
            {
                EmployeeID: 13,
                Name: "Thomas Martinez",
                Age: 30,
                Department: "Research & Development",
                JobRole: "Research Scientist",
                MonthlyIncome: 7500,
               JobSatisfaction: 4,
                WorkLifeBalance: 3,
                YearsAtCompany: 4,
                OverTime: "No",
                Attrition: "No"
            },
            {
                EmployeeID: 14,
                Name: "Linda Hernandez",
                Age: 26,
                Department: "Sales",
                JobRole: "Sales Representative",
                MonthlyIncome: 3200,
                JobSatisfaction: 2,
                WorkLifeBalance: 2,
                YearsAtCompany: 1,
                OverTime: "Yes",
                Attrition: "Yes"
            },
            {
                EmployeeID: 15,
                Name: "Charles Lopez",
                Age: 48,
                Department: "Research & Development",
                JobRole: "Manager",
                MonthlyIncome: 11000,
                JobSatisfaction: 5,
                WorkLifeBalance: 4,
                YearsAtCompany: 14,
                OverTime: "No",
                Attrition: "No"
            },
            {
                EmployeeID: 16,
                Name: "Barbara Gonzalez",
                Age: 35,
                Department: "Human Resources",
                JobRole: "Human Resources",
                MonthlyIncome: 4800,
                JobSatisfaction: 3,
                WorkLifeBalance: 3,
                YearsAtCompany: 5,
                OverTime: "No",
                Attrition: "No"
            },
            {
                EmployeeID: 17,
                Name: "Joseph Wilson",
                Age: 29,
                Department: "Sales",
                JobRole: "Sales Executive",
                MonthlyIncome: 4000,
                JobSatisfaction: 2,
                WorkLifeBalance: 2,
                YearsAtCompany: 2,
                OverTime: "Yes",
                Attrition: "Yes"
            },
            {
                EmployeeID: 18,
                Name: "Susan Anderson",
                Age: 42,
                Department: "Research & Development",
                JobRole: "Research Director",
                MonthlyIncome: 13500,
                JobSatisfaction: 5,
                WorkLifeBalance: 4,
                YearsAtCompany: 11,
                OverTime: "Yes",
                Attrition: "No"
            },
            {
                EmployeeID: 19,
                Name: "Christopher Thomas",
                Age: 32,
                Department: "Sales",
                JobRole: "Sales Manager",
                MonthlyIncome: 8500,
                JobSatisfaction: 4,
                WorkLifeBalance: 3,
                YearsAtCompany: 6,
                OverTime: "No",
                Attrition: "No"
            },
            {
                EmployeeID: 20,
                Name: "Jessica Taylor",
                Age: 28,
                Department: "Human Resources",
                JobRole: "Human Resources",
                MonthlyIncome: 3800,
                JobSatisfaction: 3,
                WorkLifeBalance: 3,
                YearsAtCompany: 2,
                OverTime: "No",
                Attrition: "No"
            },
            {
                EmployeeID: 21,
                Name: "Daniel Moore",
                Age: 24,
                Department: "Research & Development",
                JobRole: "Laboratory Technician",
                MonthlyIncome: 2200,
                JobSatisfaction: 1,
                WorkLifeBalance: 1,
                YearsAtCompany: 0.2,
                OverTime: "Yes",
                Attrition: "Yes"
            },
            {
                EmployeeID: 22,
                Name: "Karen Jackson",
                Age: 50,
                Department: "Sales",
                JobRole: "Sales Manager",
                MonthlyIncome: 10500,
                JobSatisfaction: 5,
                WorkLifeBalance: 4,
                YearsAtCompany: 18,
                OverTime: "No",
                Attrition: "No"
            },
            {
                EmployeeID: 23,
                Name: "Matthew Martin",
                Age: 34,
                Department: "Research & Development",
                JobRole: "Research Scientist",
                MonthlyIncome: 6800,
                JobSatisfaction: 4,
                WorkLifeBalance: 3,
                YearsAtCompany: 5,
                OverTime: "No",
                Attrition: "No"
            },
            {
                EmployeeID: 24,
                Name: "Nancy Lee",
                Age: 27,
                Department: "Human Resources",
                JobRole: "HR Business Partner",
                MonthlyIncome: 4200,
                JobSatisfaction: 3,
                WorkLifeBalance: 3,
                YearsAtCompany: 3,
                OverTime: "No",
                Attrition: "No"
            },
            {
                EmployeeID: 25,
                Name: "Anthony Perez",
                Age: 26,
                Department: "Sales",
                JobRole: "Sales Representative",
                MonthlyIncome: 2900,
                JobSatisfaction: 2,
                WorkLifeBalance: 1,
                YearsAtCompany: 0.5,
                OverTime: "Yes",
                Attrition: "Yes"
            },
            {
                EmployeeID: 26,
                Name: "Donna Thompson",
                Age: 46,
                Department: "Research & Development",
                JobRole: "Manager",
                MonthlyIncome: 10800,
                JobSatisfaction: 4,
                WorkLifeBalance: 4,
                YearsAtCompany: 13,
                OverTime: "No",
                Attrition: "No"
            },
            {
EmployeeID: 27,
                Name: "Mark White",
                Age: 31,
                Department: "Sales",
                JobRole: "Sales Executive",
                MonthlyIncome: 4700,
                JobSatisfaction: 3,
                WorkLifeBalance: 3,
                YearsAtCompany: 4,
                OverTime: "Yes",
                Attrition: "No"
            },
            {
                EmployeeID: 28,
                Name: "Carol Harris",
                Age: 39,
                Department: "Human Resources",
                JobRole: "HR Manager",
                MonthlyIncome: 7200,
                JobSatisfaction: 4,
                WorkLifeBalance: 4,
                YearsAtCompany: 9,
                OverTime: "No",
                Attrition: "No"
            },
            {
                EmployeeID: 29,
                Name: "Paul Clark",
                Age: 25,
                Department: "Research & Development",
                JobRole: "Laboratory Technician",
                MonthlyIncome: 2600,
                JobSatisfaction: 2,
                WorkLifeBalance: 2,
                YearsAtCompany: 0.8,
                OverTime: "Yes",
                Attrition: "Yes"
            },
            {
                EmployeeID: 30,
                Name: "Sandra Lewis",
                Age: 43,
                Department: "Sales",
                JobRole: "Sales Manager",
                MonthlyIncome: 9200,
                JobSatisfaction: 5,
                WorkLifeBalance: 3,
                YearsAtCompany: 11,
                OverTime: "No",
                Attrition: "No"
            }
        ];

        this.mlEngine.loadDataset(sampleData);
        return {
            success: true,
            rows: sampleData.length,
            columns: Object.keys(sampleData[0]).length
        };
    }

    /**
     * Download template Excel file
     */
    downloadTemplate() {
        const template = [
            {
                EmployeeID: 1,
                Name: "Employee Name",
                Age: 30,
                Department: "Sales",
                JobRole: "Sales Executive",
                MonthlyIncome: 5000,
                JobSatisfaction: 4,
                WorkLifeBalance: 3,
                YearsAtCompany: 5,
                OverTime: "No",
                Attrition: "No"
            }
        ];

        const ws = XLSX.utils.json_to_sheet(template);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Employees");
        XLSX.writeFile(wb, "employee_template.xlsx");
    }
}

// Global instance
const dataLoader = new DataLoader(mlEngine);
