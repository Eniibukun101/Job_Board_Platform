# Jobnest - Backend API Documentation

**Developer:** Anjolaoluwa Bawaallah-Olufemi  
**Matric Number:** 24120111024  
**Role:** Backend Team - API Routes, Controllers, Middleware & Models

---

## Overview

This is the backend REST API for **Jobnest** — a Job Board Platform that connects job seekers (Applicants) with companies (Employers). Built with Node.js, Express.js and SQLite.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | Web framework |
| SQLite | Database |
| Sequelize ORM | Database management |
| JWT | Authentication |
| bcryptjs | Password hashing |
| helmet | Security headers |
| express-validator | Input validation |
| express-rate-limit | Rate limiting |

---

## Getting Started

### Prerequisites
- Node.js installed
- npm installed

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/Eniibukun101/Job_Board_Platform.git
cd Job_Board_Platform/backend
```

**2. Install dependencies**
```bash
npm install
```

**3. Create your `.env` file** inside the `backend/` folder:
```
PORT=5000
JWT_SECRET=your_secret_key_here
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:3000
```

**4. Start the server**
```bash
npm run dev
```

**5. Server runs at:**
```
http://localhost:5000
```

---

## Project Structure

```
backend/
├── config/
│   └── database.js          # SQLite database connection
├── controllers/
│   ├── authController.js    # Register, login, profile logic
│   ├── jobController.js     # Job CRUD + search/filter logic
│   └── applicationController.js  # Application logic
├── middleware/
│   ├── auth.js              # JWT authentication & role checking
│   ├── validate.js          # Input validation rules
│   └── rateLimiter.js       # Rate limiting
├── models/
│   ├── index.js             # Model associations
│   ├── User.js              # User model
│   ├── Job.js               # Job model
│   └── Application.js       # Application model
├── routes/
│   ├── auth.js              # Auth routes
│   ├── jobs.js              # Job routes
│   └── applications.js      # Application routes
├── server.js                # Main entry point
├── package.json
└── .env                     # Environment variables (not committed)
```

---

## API Endpoints

### Base URL
```
http://localhost:5000
```

### Authentication
All protected routes require this header:
```
Authorization: Bearer <token>
```
The token is returned when you register or login.

---

### Auth Routes `/api/auth`

#### Register a new user
```
POST /api/auth/register
```
**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "userType": "Applicant",
  "company": "Company Name (required if Employer)"
}
```
**Response:**
```json
{
  "message": "Account created successfully.",
  "token": "eyJhbG...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "userType": "Applicant"
  }
}
```

---

#### Login
```
POST /api/auth/login
```
**Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
**Response:**
```json
{
  "message": "Login successful.",
  "token": "eyJhbG...",
  "user": { ... }
}
```

---

#### Get current user profile
```
GET /api/auth/me
```
🔒 Requires token

---

#### Update profile
```
PUT /api/auth/me
```
🔒 Requires token  
**Body:** `name`, `phone`, `bio`, `company` (any or all)

---

#### Change password
```
PUT /api/auth/change-password
```
🔒 Requires token  
**Body:**
```json
{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword123"
}
```

---

### Job Routes `/api/jobs`

#### Get all jobs (with search & filters)
```
GET /api/jobs
```
🌐 Public — no token needed  
**Query params (all optional):**
```
?search=developer
?location=Lagos
?jobType=Full-time
?experience=Mid
?salaryMin=50000
?page=1
?limit=10
```

---

#### Get a single job
```
GET /api/jobs/:id
```
🌐 Public — no token needed

---

#### Post a new job
```
POST /api/jobs
```
🔒 Requires token — Employers only  
**Body:**
```json
{
  "title": "Frontend Developer",
  "description": "We are looking for...",
  "company": "Tech Corp",
  "location": "Lagos, Nigeria",
  "salaryMin": 150000,
  "salaryMax": 300000,
  "jobType": "Full-time",
  "experience": "Mid",
  "skills": ["React", "JavaScript", "CSS"]
}
```

---

#### Update a job
```
PUT /api/jobs/:id
```
🔒 Requires token — Employer who posted the job only

---

#### Delete a job
```
DELETE /api/jobs/:id
```
🔒 Requires token — Employer who posted the job only

---

#### Get my job listings
```
GET /api/jobs/employer/my-listings
```
🔒 Requires token — Employers only

---

### Application Routes `/api/applications`

#### Apply for a job
```
POST /api/applications/:jobId
```
🔒 Requires token — Applicants only  
**Body:**
```json
{
  "coverLetter": "I am interested in this position because...",
  "resumeUrl": "https://example.com/my-resume.pdf"
}
```

---

#### Get my applications
```
GET /api/applications/my-applications
```
🔒 Requires token — Applicants only

---

#### Withdraw an application
```
DELETE /api/applications/:id
```
🔒 Requires token — Applicant who applied only

---

#### Get applications for a job
```
GET /api/applications/job/:jobId
```
🔒 Requires token — Employer who owns the job only

---

#### Update application status
```
PUT /api/applications/:id/status
```
🔒 Requires token — Employer who owns the job only  
**Body:**
```json
{
  "status": "Shortlisted"
}
```
**Status options:** `Pending`, `Reviewed`, `Shortlisted`, `Rejected`, `Hired`

---

## User Types & Permissions

| Action | Applicant | Employer |
|---|---|---|
| Register/Login | ✅ | ✅ |
| View jobs | ✅ | ✅ |
| Apply for jobs | ✅ | ❌ |
| View own applications | ✅ | ❌ |
| Post jobs | ❌ | ✅ |
| Edit/Delete own jobs | ❌ | ✅ |
| View job applicants | ❌ | ✅ |
| Update application status | ❌ | ✅ |

---

## Security Features

- **JWT Authentication** — stateless token-based auth
- **Password Hashing** — bcryptjs with salt rounds of 12
- **Helmet** — sets secure HTTP headers
- **Rate Limiting** — 10 auth attempts / 100 general requests per 15 min
- **Input Validation** — all inputs validated with express-validator
- **Role-based Access** — Employer and Applicant have different permissions

---

## Health Check

```
GET /api/health
```
Returns server status and timestamp. No token needed.

---

## Error Responses

All errors return in this format:
```json
{
  "message": "Description of what went wrong"
}
```

| Status Code | Meaning |
|---|---|
| 200 | Success |
| 201 | Created successfully |
| 400 | Bad request / validation error |
| 401 | Not authenticated |
| 403 | Not authorized |
| 404 | Not found |
| 409 | Conflict (e.g. email already exists) |
| 429 | Too many requests |
| 500 | Server error |
