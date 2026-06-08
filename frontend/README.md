# Task Management System (MERN Stack + JWT + RBAC)

## Description
A full-stack task management system with authentication, role-based access control, and CRUD operations.

---

## Features
- User Registration & Login (JWT Authentication)
- Role-Based Access Control (Admin & User)
- Create, Read, Update, Delete Tasks
- Protected Routes
- Password Hashing (bcrypt)
- Input Validation

---

## Tech Stack
- Frontend: React.js, React Router, Axios
- Backend: Node.js, Express.js
- Database: MongoDB Atlas
- Authentication: JWT, bcrypt

---

## Project Structure

### Backend
backend/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
├── server.js

### Frontend
frontend/
├── src/
│   ├── pages/
│   ├── components/
│   ├── services/
├── App.jsx

---

## API Endpoints

### Auth
POST /api/v1/auth/register  
POST /api/v1/auth/login  

### Tasks
GET /api/v1/tasks  
POST /api/v1/tasks  
PUT /api/v1/tasks/:id  
DELETE /api/v1/tasks/:id  

---

## Setup Instructions

### Backend
cd backend  
npm install  
npm run dev  

### Frontend
cd frontend  
npm install  
npm run dev  

---

## Environment Variables
PORT=5000  
MONGO_URI=your_mongodb_url  
JWT_SECRET=your_secret_key  

---

## Notes
- Frontend connects to backend via REST APIs
- JWT token stored in localStorage
- Role-based access enforced in backend

---

## Status
- Authentication done
- RBAC done
- CRUD done
- Frontend integrated
- Postman tested

---

## Author
Naabha Kulkarni