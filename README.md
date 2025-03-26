# Coaching Management System Backend

## 📌 Overview
The **Coaching Management System Backend** is a Node.js and Express-based API that efficiently manages **students, attendance, fees, exams, and coaching center details**. Built with **MongoDB (Mongoose)**, this system ensures **data security, academic season-based records, and coaching-specific access control**. It is designed to support multiple coaching centers, each managing its own independent data.

## 🚀 Features
- **User Authentication:** Secure JWT-based authentication for coaching admins.
- **Student Management:** CRUD operations for student records.
- **Attendance Tracking:** Mark and retrieve attendance records.
- **Fee Management:** Manage fee records with payment status.
- **Exam Records:** Store and retrieve student exam results.
- **Academic Season Support:** Ensures data is organized per season.
- **Role-Based Access Control:** Restricts actions to authorized users only.
- **RESTful API:** Well-structured API endpoints for easy integration.

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ORM)
- **Authentication:** JWT (JSON Web Tokens)
- **Deployment:** Vercel (for frontend), Render / Railway (for backend)

## 📂 Project Structure
```
├── models/             # Mongoose Schemas for database
├── routes/             # API route handlers
├── controllers/        # Business logic for API endpoints
├── middleware/         # Authentication and validation middlewares
├── config/             # Database and environment configurations
├── server.js           # Entry point of the application
```

## 📌 Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo.git
   cd coaching-management-backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the `.env` file with the following variables:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
4. Start the server:
   ```bash
   npm start
   ```
   The server will run at **http://localhost:5000**.

## 📌 API Endpoints
### **Authentication**
- `POST /api/auth/login` – Login as coaching admin

### **Student Management**
- `POST /api/students` – Add a new student
- `GET /api/students` – Get all students
- `GET /api/students/:id` – Get a single student
- `PUT /api/students/:id` – Update student details
- `DELETE /api/students/:id` – Delete a student

### **Attendance**
- `POST /api/attendance` – Mark student attendance
- `GET /api/attendance/:studentId` – Get attendance records of a student

### **Fees**
- `POST /api/fees` – Add a fee record
- `GET /api/fees` – Get all fee records for the active season
- `GET /api/fees/:studentId` – Get a student's fee records
- `PUT /api/fees/:feeId` – Update a fee record
- `DELETE /api/fees/:feeId` – Delete a fee record

### **Exams**
- `POST /api/exams` – Add an exam record
- `GET /api/exams` – Get all exam records
- `GET /api/exams/:studentId` – Get a student's exam records
- `PUT /api/exams/:examId` – Update an exam record
- `DELETE /api/exams/:examId` – Delete an exam record

## 📌 Deployment
For deploying to **Render or Railway**, follow these steps:
1. Push your code to GitHub.
2. Create a new **Render** or **Railway** project.
3. Connect your GitHub repository.
4. Set up the environment variables.
5. Deploy the application.
