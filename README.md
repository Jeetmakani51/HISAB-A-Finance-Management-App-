🌟 Features
📇 Customer Management

Customer Database - Store unlimited customer records with contact details
Purchase History - Complete transaction history per customer
Search & Filter - Real-time customer search functionality
Delete Customers - Remove customers and associated data
Customer Cards - Visual cards with initials, last sale date, and total spent

💰 Sales Tracking

Multi-Item Purchases - Add multiple products per transaction
Individual Quantities - Track quantity and price per item
Payment Status - Toggle between Paid/Unpaid with visual indicators (✓/⏳)
Payment Methods - Cash, UPI, Card, Bank transfer support
Auto-calculations - Automatic total price computation
Due Date Tracking - Set delivery and return dates

📈 Analytics & Reporting

Dashboard - Quick overview of business performance

<img width="200" height="500" alt="Screenshot 2025-11-23 210333" src="https://github.com/user-attachments/assets/48dc5997-b8cd-4a2b-ab67-7461f28f8888" />


Today's Sales - Real-time daily metrics:

Today's revenue,
Number of orders,
Average order value,
Top customer,
Hourly sales chart,
Product performance,
Payment method distribution


<img width="200" height="500" alt="Screenshot 2025-11-23 210505" src="https://github.com/user-attachments/assets/ee061e44-942c-484c-b35e-62a15b88e941" />

<img width="200" height="500" alt="Screenshot 2025-11-23 210520" src="https://github.com/user-attachments/assets/388f7269-76e2-4e59-9910-f28f4da0cabc" />

<img width="200" height="500" alt="Screenshot 2025-11-23 210535" src="https://github.com/user-attachments/assets/11c6fe92-1ed0-4848-a5a0-efd25c1d37e6" />

<img width="200" height="500" alt="Screenshot 2025-11-23 210548" src="https://github.com/user-attachments/assets/bf39915d-891a-489a-a6b2-ee08698d92d8" />

<img width="200" height="500" alt="Screenshot 2025-11-23 210601" src="https://github.com/user-attachments/assets/1078edf2-6dc8-47b0-aa8e-430c68d89896" />

Monthly Sales - Comprehensive monthly analytics:

Revenue tracking,
New customers count,
Growth rate vs last month,
Daily sales line chart,
Weekly breakdown,
Top 5 customers leaderboard,
Best-selling products,
Sales by day of week,
Pending payments tracker,
Monthly target progress

<img width="200" height="500" alt="Screenshot 2025-11-23 223915" src="https://github.com/user-attachments/assets/023a1f4e-3346-4e94-9c29-0c100205a4db" />

<img width="200" height="500" alt="Screenshot 2025-11-23 223927" src="https://github.com/user-attachments/assets/e0955034-6e03-43ac-a6cf-7367f89ca748" />

<img width="200" height="500" alt="Screenshot 2025-11-23 223944" src="https://github.com/user-attachments/assets/1dfcea89-5346-46dd-a3e5-fb050e41df7b" />

<img width="200" height="500" alt="Screenshot 2025-11-23 223959" src="https://github.com/user-attachments/assets/3afa1f7f-8200-47ed-b149-1fa96f95f82a" />

<img width="200" height="500" alt="Screenshot 2025-11-23 224017" src="https://github.com/user-attachments/assets/c643e921-123c-4513-b605-b29f74871eec" />

<img width="200" height="500" alt="Screenshot 2025-11-23 224029" src="https://github.com/user-attachments/assets/93b5b410-d064-4c77-a161-fb17bf08e54d" />

Reports Page - Overview with:

Total sales,
Customer count,
Growth percentage,
Top product,
Sales over time chart,
Payment method distribution,

<img width="200" height="500" alt="Screenshot 2025-11-23 224408" src="https://github.com/user-attachments/assets/7b1d02a1-74ef-4750-843a-3e182575cde0" />

<img width="200" height="500" alt="Screenshot 2025-11-23 224425" src="https://github.com/user-attachments/assets/4cd8519d-8cdf-4265-a09f-751ecbe6bcc8" />

📱 WhatsApp Integration

Generate professional invoices
Itemized bill with quantities and prices
Payment status and method
Due dates and return dates
Send directly to customer's WhatsApp

🔐 Security ( to be worked on )

Secure Login - Fixed credential authentication
Session Management - Remember me functionality
Auto-logout - 24-hour session timeout
Page Protection - Authentication guard on all pages

🚀 Getting Started
Prerequisites

Modern web browser (Chrome, Firefox, Safari, Edge)
Local web server (Live Server, Python server, or Node.js http-server)

Installation

Clone the repository

bashgit clone https://github.com/Jeetmakani51/HISAB-A-Finance-Management-App.git
cd hisab-app

Open with a local server

Option A: VS Code Live Server

Install "Live Server" extension
Right-click on login.html
Select "Open with Live Server"

Option B: Python
bashpython -m http.server 8000
# Open http://localhost:8000
Option C: Node.js
bashnpx http-server
# Open http://localhost:8080

Login


Default Email: admin@hisab.com
Default Password: admin123


⚠️ Important: Change credentials in login.js (lines 11-12) for production use!

<img width="400" height="800" alt="Screenshot 2025-11-23 205549" src="https://github.com/user-attachments/assets/ec904d77-d5e9-4cbe-9241-0551583621e4" />

💻 Technology Stack
TechnologyPurposeHTML5Structure and markupCSS3/SCSSStyling and responsive designJavaScript (ES6+)Application logicLocalStorageData persistenceFont AwesomeIconsSVGCustom charts and visualizations
🎨 Features in Detail
Multi-Item Purchase System
Add multiple products in a single transaction:
Item 1: Shirt (x2) @ ₹500 = ₹1,000
Item 2: Pants (x1) @ ₹800 = ₹800
Total: ₹1,800
Payment Status Toggle

Paid (✓) - Green indicator, payment received
Unpaid (⏳) - Orange indicator, payment pending

WhatsApp Bill Format
━━━━━━━━━━━━━━━━━━━━
      📄 INVOICE 📄
━━━━━━━━━━━━━━━━━━━━

Bill To: Customer Name
Date: 01 Nov 2025
Time: 02:30 PM

━━━━━━━━━━━━━━━━━━━━
ITEM DETAILS
━━━━━━━━━━━━━━━━━━━━

1. Shirt
   Qty: 2 × ₹500 = ₹1,000

2. Pants
   Qty: 1 × ₹800 = ₹800

━━━━━━━━━━━━━━━━━━━━
TOTAL AMOUNT
━━━━━━━━━━━━━━━━━━━━

      💵 ₹1,800
📱 Responsive Design
HISAB is fully responsive and optimized for:

📱 Mobile (320px - 768px)
💻 Tablet (769px - 1024px)
🖥️ Desktop (1025px+)

🔧 Configuration
Change Login Credentials
Edit login.js:
javascriptconst ADMIN_EMAIL = "your-email@example.com";
const ADMIN_PASSWORD = "yourpassword";
Change Monthly Target
Edit monthlySale.js:
🛡️ Browser Compatibility
BrowserMinimum VersionChrome90+Firefox88+Safari14+Edge90+
📊 Data Storage
All data is stored in browser's LocalStorage:

customers - Customer records
purchases - Transaction history
currentUser - Active session
rememberMe - Login preference


⚠️ Note: Clearing browser data will erase all records!

🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

Fork the project
Create your feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request

📝 License
This project is licensed under the MIT License - see the LICENSE file for details.

👨‍💻 Author
Jeet Makani

GitHub: @Jeetmakani51

🙏 Acknowledgments

Font Awesome for icons
Inspiration from small business needs
Built with ❤️ for entrepreneurs

📞 Support
For support, issues, or feature requests, please open an issue on GitHub.

⭐ Star this repository if you find it helpful!
Made with ❤️ by Jeet Makani
