# 📚 E-Magazine Management System

A full-stack web application developed to streamline the process of submitting, reviewing, approving, and publishing student articles for the college e-magazine.

---

## 📖 Overview

The E-Magazine Management System is a role-based platform that allows students to submit articles, department administrators to review them, and the main administrator to publish approved content into the college e-magazine.

The project aims to replace the traditional manual workflow with a secure and efficient digital solution.

---

## ✨ Features

### 👨‍🎓 Student
- Secure Login (JWT Authentication)
- Student Dashboard
- View Article Statistics
- Submit Articles
- View Submitted Articles
- Track Article Status
- Profile Management

### 👨‍🏫 Department Administrator
- Department Dashboard
- Review Submitted Articles
- Approve or Reject Articles
- Request Revisions
- Manage Department Articles

### 👨‍💼 Main Administrator
- Central Dashboard
- Manage Departments
- Manage Users
- Publish Approved Articles
- View Analytics
- Manage E-Magazines

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- shadcn/ui
- React Router DOM
- Axios
- React Icons

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Authentication
- JWT (JSON Web Token)
- bcrypt

---

## 📂 Project Structure

```
E-Magazine-Management-System
│
├── frontend
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── context
│   │   ├── hooks
│   │   ├── pages
│   │   ├── routes
│   │   ├── services
│   │   └── utils
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   └── server.js
│
└── README.md
```

---

## 🔐 Authentication Flow

1. User logs in using their college credentials.
2. Backend validates the user.
3. JWT Token is generated.
4. Token is stored on the client.
5. Protected routes are accessible based on user role.

---

## 👥 User Roles

| Role | Permissions |
|------|-------------|
| Student | Submit and manage own articles |
| Department Admin | Review department articles |
| Main Admin | Manage the entire system |

---

## 🚀 Current Progress

### ✅ Completed

- JWT Authentication
- Role-Based Authorization
- Protected Routes
- Beautiful Login Page
- Student Dashboard
- Responsive Sidebar
- Dashboard Navbar
- Statistics Cards
- Recent Activity Section
- Quick Actions
- Upcoming Deadlines

### 🚧 In Progress

- Article Submission Module
- My Articles Page
- Department Admin Dashboard
- Main Admin Dashboard
- Notifications
- Analytics
- Magazine Publishing

---

## 💻 Installation

### Clone the repository

```bash
git clone https://github.com/prathambshetty1/e-magazine-management-system.git
```

### Frontend

```bash
cd e-magazine
npm install
npm run dev
```

### Backend

```bash
cd e-magazine-backend
npm install
npm run dev
```

---


## 🎯 Future Enhancements

- Rich Text Article Editor
- Image Upload Support
- PDF Magazine Generation
- Email Notifications
- Search & Filter
- Dashboard Analytics
- Dark Mode
- Mobile Responsive Design

---

## 👨‍💻 Developed By

**Pratham B. Shetty**

Computer Science & Engineering (Full Stack Development)

NMAM Institute of Technology

---

## 📄 License

This project is developed for academic purposes as part of a Full Stack Development project.
