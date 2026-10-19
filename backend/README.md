# 🛡️ SecureScan Backend

A secure and scalable **Node.js + Express.js** backend for **SecureScan**, a Web Application Security Scanner. This backend provides secure authentication, website security scanning, scan history management, and report generation using a RESTful API architecture.

---

# 🚀 Features

* 🔐 User Registration & Login
* 🔑 JWT Authentication & Authorization
* 🔒 Password Encryption using bcryptjs
* 🌐 Website Security Scanner API
* 📊 Security Score Calculation
* 📋 Scan History Management
* 📄 Report Generation Support
* 🗄️ MySQL Database Integration
* ⚙️ Sequelize ORM
* 🛡️ Helmet Security Middleware
* 🌍 CORS Configuration
* 📝 Morgan Request Logging
* 📁 File Upload Support
* 🔐 Environment Variable Configuration

---

# 🛠️ Tech Stack

* Node.js
* Express.js
* MySQL
* Sequelize
* JWT (JSON Web Token)
* bcryptjs
* Multer
* Helmet
* CORS
* Morgan

---

# 📂 Project Structure

```text
securescan/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── uploads/
│
├── server.js
├── package.json
├── package-lock.json
└── .env
```

---

# 📌 API Endpoints

| Method | Endpoint           | Description                 |
| ------ | ------------------ | --------------------------- |
| POST   | /api/auth/register | Register a new user         |
| POST   | /api/auth/login    | User Login                  |
| GET    | /api/user/profile  | Get User Profile            |
| POST   | /api/scans         | Start Website Security Scan |
| GET    | /api/scans         | Get Scan History            |
| DELETE | /api/scans/:id     | Delete Scan History         |

---

# ⚙️ Installation

Clone the repository:

```bash
git clone <repository-url>
cd securescan
```

Install dependencies:

```bash
npm install
```

---

# 🔑 Environment Variables

Create a `.env` file and configure:

```env
PORT=5000

DB_HOST=YOUR_DATABASE_HOST
DB_PORT=YOUR_DATABASE_PORT
DB_USER=YOUR_DATABASE_USERNAME
DB_PASSWORD=YOUR_DATABASE_PASSWORD
DB_NAME=YOUR_DATABASE_NAME

JWT_SECRET=YOUR_SECRET_KEY

FRONTEND_URL=http://localhost:5173
```

---

# ▶️ Run the Server

```bash
npm start
```

Backend runs at:

```text
http://localhost:5000
```

---

# 🔒 Security Features

* JWT Authentication
* Password Hashing
* Protected Routes
* Secure HTTP Headers
* Environment Variable Protection
* Input Validation
* RESTful API Design

---

# 🚀 Future Enhancements

* OWASP Top 10 Detection
* SSL Certificate Analysis
* Scheduled Security Scans
* Email Report Delivery
* Role-Based Access Control (RBAC)
* AI-Based Security Recommendations

---

# 👨‍💻 Developer

**Ramya Kannan**

Cybersecurity & Full-Stack Developer

Built and deployed SecureScan as a full-stack cybersecurity project using React, Node.js, Express.js, MySQL, Sequelize, and JWT Authentication.

---

# 📄 License

This project is licensed under the MIT License.
