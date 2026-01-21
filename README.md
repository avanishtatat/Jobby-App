# 💼 Jobby App – Job Search Web Application

🔗 **Live Demo:** https://avanishproj56.ccbp.tech/  
📦 **GitHub Repository:** https://github.com/avanishtatat/Jobby-App

Jobby App is a modern **job search web application** built using **React JS**, where users can log in, browse jobs, apply multiple filters, and view detailed job information.  
This project demonstrates real-world frontend concepts such as **authentication, protected routes, API integration, filters, and conditional rendering**.

---

## 📌 Project Overview

The Jobby App allows users to:
- Authenticate securely using login credentials
- Browse available jobs
- Filter jobs by employment type and salary range
- Search jobs using keywords
- View detailed job descriptions
- Access protected routes only after authentication

---

## 🚀 Features

### 🔐 Authentication
- Login using username and password
- JWT-based authentication
- Error messages shown for invalid credentials
- Successful login redirects to Jobs page

---

### 🛡️ Protected Routes
- Jobs and Job Details routes are protected
- Unauthenticated users are redirected to Login
- Logged-in users cannot access Login again

---

### 🧾 Jobs Page
- Fetches jobs using secured APIs
- Search jobs by keywords
- Filter jobs by:
  - Employment Type (Full Time, Part Time, Freelance, Internship)
  - Salary Range
- Loader shown while fetching data
- Failure view and No Jobs view handled properly

---

### 📄 Job Details Page
- Displays detailed job information
- Shows company details
- Displays similar jobs
- External link to company website
- Loader and failure views implemented

---

## 🔑 Demo Login Credentials

Use the following credentials to log in and explore the application:

### Users
- username: rahul
password: rahul@2021
- username: raja
password: raja@2021

--- 


> ⚠️ These credentials are for demo purposes only.

---

## 🧰 Tech Stack

- **Frontend:** React JS
- **Routing:** React Router DOM
- **Authentication:** JWT
- **Styling:** CSS3
- **Icons:** react-icons
- **API Integration:** REST APIs
- **Package Manager:** npm

---

## 🔗 API Endpoints Used

| Feature | Method | Endpoint |
|-------|--------|----------|
| Login | POST | https://apis.ccbp.in/login |
| Jobs | GET | https://apis.ccbp.in/jobs |
| Job Details | GET | https://apis.ccbp.in/jobs/:id |
| Profile | GET | https://apis.ccbp.in/profile |

---

## 📁 Folder Structure

```text
src/
│── components/
│   ├── LoginForm
│   ├── Jobs
│   ├── JobItemDetails
│   ├── FiltersGroup
│   ├── Header
│   ├── Profile
│   ├── ProtectedRoute
│   └── SimilarJobItem
│
│── App.js
│── index.js
```
