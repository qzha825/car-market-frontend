---

# 🚗 Used Car Market Management System

A full-stack web application for managing and displaying used cars in a local car market.
Public users can browse available vehicles, and administrators can log in to manage vehicle data securely.

This project was independently designed, built, and deployed to align with the common technology stack used in New Zealand.

---

## ✨ Features

### 👥 Public Users

* Browse available cars
* View car details:

  * Brand
  * Model
  * Year
  * Mileage
  * Price
  * Car photos

### 🔐 Admin Users

* Secure login
* Manage vehicles:

  * Create new car listings
  * Update existing car information
  * Delete vehicles
* Upload car images:

  * Upload from local device
  * Or provide image URLs

### 🛡️ Security

* JWT-based authentication
* Admin-only protected APIs
* Role-based authorization for management operations

### 📱 User Experience

* Responsive design for desktop and mobile browsers
* Supports iOS dark mode

---

## 🛠 Tech Stack

### Backend

* **ASP.NET Core (C#)**
* RESTful API design
* Entity Framework Core (ORM)
* JWT Authentication & Authorization

### Frontend

* **React**
* Functional components & Hooks
* Axios / Fetch for API requests
* Responsive UI design

### Database

* **PostgreSQL (Hosted on Supabase)**
* EF Core Migrations for schema management

### Deployment

* Backend: **Render**
* Frontend: **Render**
* Database: **Supabase PostgreSQL**
* Environment variables for secure configuration
* SSL-enabled database connections

---

## 🧱 System Architecture

```
React Frontend
     |
     | HTTP REST APIs
     v
ASP.NET Core Backend
     |
     | EF Core ORM
     v
PostgreSQL (Supabase)
```

---

## 🔑 Authentication Flow (Admin)

1. Admin submits login credentials
2. Backend verifies credentials
3. Backend returns JWT token
4. Frontend stores token (in memory / local storage)
5. Token is attached to API requests in Authorization header
6. Backend middleware validates JWT for protected endpoints

---

## 🗄 Database Design (Simplified)

### Vehicles

* Id (PK)
* Brand
* Model
* Year
* Mileage
* Price
* ImageUrl / ImagePath
* CreatedAt

### AdminUsers

* Id (PK)
* Username
* PasswordHash
* Role

---

## 🚀 Deployment

* Backend and frontend are deployed separately on **Render**
* PostgreSQL is hosted on **Supabase**
* Sensitive configuration (DB connection, JWT secret) is stored using environment variables
* CORS configured to allow frontend access

---

## 🧠 What I Learned

* Building a complete full-stack system from scratch
* Designing RESTful APIs with authentication and authorization
* Connecting cloud-hosted PostgreSQL with .NET using EF Core
* Implementing secure file uploads and image handling
* Handling deployment configuration and production issues
* Quickly adapting to a new technology stack (.NET + React)

---

## 🔮 Future Improvements

* Multiple images per vehicle
* Cloud storage integration for images
* Pagination and filtering
* Audit logs for admin actions
* Automated testing (unit & integration tests)
* CI/CD pipeline

---

## 👨‍💻 Author

**Qi Zhang**
Master of Information Technology, University of Auckland
Backend-focused developer with full-stack project experience

👉 **“帮我写简历项目版”** 或
👉 **“继续 mock 项目技术面”**
