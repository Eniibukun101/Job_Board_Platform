markdown# Job Board Platform - API Documentation

**Developer:** Anjolaoluwa Bawaallah-Olufemi (24120111024) + Oladapo Daniel Ogun (24120111072)  
**Base URL:** `http://localhost:5000/api`

---

## Authentication Endpoints

### Register User
**POST** `/auth/register`

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "userType": "Applicant"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGc...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "userType": "Applicant"
  }
}
```

---

### Login User
**POST** `/auth/login`

**Request:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGc...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "userType": "Applicant"
  }
}
```

---

### Get Current User Profile
**GET** `/auth/me`

**Headers:**
Authorization: Bearer <token>

**Response:**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "userType": "Applicant",
  "createdAt": "2026-05-08T10:30:00Z",
  "updatedAt": "2026-05-08T10:30:00Z"
}
```

---

### Update User Profile
**PUT** `/auth/me`

**Headers:**
Authorization: Bearer <token>

**Request:**
```json
{
  "name": "Jane Doe",
  "bio": "I am a software developer"
}
```

**Response:** Updated user object

---

### Change Password
**PUT** `/auth/change-password`

**Headers:**
Authorization: Bearer <token>

**Request:**
```json
{
  "currentPassword": "oldpassword123",
  "newPassword": "newpassword123"
}
```

**Response:**
```json
{
  "message": "Password changed successfully"
}
```

---

## Job Endpoints

### Get All Jobs
**GET** `/jobs`

**Query Parameters:**
- `location` - Filter by location (e.g., `Lagos`)
- `jobType` - Filter by type (e.g., `Full-time`)
- `experience` - Filter by level (e.g., `Mid`)
- `keyword` - Search by title/description

**Example:**
GET /jobs?location=Lagos&jobType=Full-time&experience=Mid

**Response:**
```json
[
  {
    "id": 1,
    "title": "Senior Backend Developer",
    "description": "Build scalable APIs",
    "company": "Tech Corp",
    "location": "Lagos",
    "salaryMin": 150000,
    "salaryMax": 250000,
    "jobType": "Full-time",
    "experience": "Senior",
    "skills": ["Node.js", "Express", "MongoDB"],
    "isActive": true,
    "postedBy": 5,
    "createdAt": "2026-05-08T10:30:00Z"
  }
]
```

---

### Get Single Job
**GET** `/jobs/:id`

**Response:** Single job object

---

### Create Job (Employer Only)
**POST** `/jobs`

**Headers:**
Authorization: Bearer <token>

**Request:**
```json
{
  "title": "React Developer",
  "description": "Build modern web applications",
  "company": "StartUp Inc",
  "location": "Lagos",
  "salaryMin": 100000,
  "salaryMax": 180000,
  "jobType": "Full-time",
  "experience": "Mid",
  "skills": ["React", "JavaScript", "CSS"]
}
```

**Response:** Created job object with ID

---

### Update Job
**PUT** `/jobs/:id`

**Headers:**
Authorization: Bearer <token>

**Request:** Any fields to update

**Response:** Updated job object

---

### Delete Job
**DELETE** `/jobs/:id`

**Headers:**
Authorization: Bearer <token>

**Response:**
```json
{
  "message": "Job deleted successfully"
}
```

---

### Get My Job Listings (Employer Only)
**GET** `/jobs/employer/my-listings`

**Headers:**
Authorization: Bearer <token>

**Response:** Array of jobs posted by current user

---

## Application Endpoints

### Apply to Job
**POST** `/applications/:jobId`

**Headers:**
Authorization: Bearer <token>

**Request:**
```json
{
  "resumeUrl": "https://example.com/resume.pdf",
  "coverLetter": "I am interested in this position..."
}
```

**Response:**
```json
{
  "id": 1,
  "jobId": 5,
  "applicantId": 10,
  "resumeUrl": "https://example.com/resume.pdf",
  "coverLetter": "I am interested...",
  "status": "Pending",
  "createdAt": "2026-05-08T10:30:00Z"
}
```

---

### Get My Applications
**GET** `/applications/my-applications`

**Headers:**
Authorization: Bearer <token>

**Response:** Array of applications submitted by current user

---

### Delete Application
**DELETE** `/applications/:id`

**Headers:**
Authorization: Bearer <token>

**Response:**
```json
{
  "message": "Application deleted successfully"
}
```

---

### Get Applications for a Job (Employer Only)
**GET** `/applications/job/:jobId`

**Headers:**
Authorization: Bearer <token>

**Response:** Array of applications for the job

---

### Update Application Status (Employer Only)
**PUT** `/applications/:id/status`

**Headers:**
Authorization: Bearer <token>

**Request:**
```json
{
  "status": "Shortlisted",
  "feedback": "Great profile! Let's interview."
}
```

**Status Values:**
- `Pending` - Initial application
- `Reviewed` - Employer reviewed
- `Shortlisted` - Moved to interview stage
- `Rejected` - Application rejected
- `Hired` - Applicant hired

**Response:** Updated application object

---

## Error Responses

All endpoints return errors in this format:

```json
{
  "message": "Error description here"
}
```

**Common Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad request
- `401` - Unauthorized (no token or invalid token)
- `403` - Forbidden (not allowed to do this)
- `404` - Not found
- `500` - Server error

---

## Testing with Postman

1. **Register** → Get token
2. **Login** → Confirm token works
3. **Create Job** → Post a job (if employer)
4. **Get Jobs** → Fetch all jobs
5. **Apply to Job** → Apply as applicant
6. **Get Applications** → See your applications

---

## Environment Variables

Create `.env` file:
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/job-board
JWT_SECRET=your_secret_key_here
CORS_ORIGIN=http://localhost:3000

---

**Last Updated:** May 8, 2026