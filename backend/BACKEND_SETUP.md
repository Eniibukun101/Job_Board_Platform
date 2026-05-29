markdown# Backend Setup Guide

**Job Board Platform - Backend Installation & Configuration**

Developer: Oladapo Daniel Ogun (24120111072)

---

## Prerequisites

- Node.js v16+ installed
- npm (comes with Node.js)
- Git installed
- A code editor (VS Code recommended)

---

## Installation Steps

### 1. Clone Repository

```bash
git clone https://github.com/Eniibukun101/Job_Board_Platform.git
cd Job_Board_Platform/backend
```

### 2. Install Dependencies

```bash
npm install
```

This installs all packages from `package.json`:
- Express (web framework)
- Sequelize (database ORM)
- SQLite (database)
- JWT (authentication)
- Helmet (security)
- CORS (cross-origin requests)

### 3. Setup Environment Variables

Create `.env` file:

```bash
cp .env.example .env
```

Edit `.env` with your settings:
PORT=5000
NODE_ENV=development
SQLITE_PATH=./database.sqlite
JWT_SECRET=your_super_secret_key_change_in_production
CORS_ORIGIN=http://localhost:3000

### 4. Start Development Server

```bash
npm run dev
```

You should see:
✅ SQLite Database connected successfully
✅ Database models synced
🚀 Server running on http://localhost:5000

### 5. Test Health Endpoint

Open new terminal:

```bash
curl http://localhost:5000/api/health
```

Response:
```json
{
  "status": "OK",
  "message": "Job Board API is running",
  "timestamp": "2026-05-17T10:30:00Z"
}
```

---

## Project Structure
backend/
├── config/
│   └── database.js          # SQLite connection config
├── models/
│   ├── User.js              # User model (Applicant & Employer)
│   ├── Job.js               # Job listing model
│   ├── Application.js       # Job application model
│   └── index.js             # Model associations
├── controllers/
│   ├── authController.js    # Auth logic (register, login)
│   ├── jobController.js     # Job CRUD operations
│   └── applicationController.js  # Application logic
├── routes/
│   ├── auth.js              # Auth endpoints
│   ├── jobs.js              # Job endpoints
│   └── applications.js      # Application endpoints
├── middleware/
│   ├── auth.js              # JWT authentication
│   ├── validate.js          # Input validation
│   └── rateLimiter.js       # Rate limiting
├── .env.example             # Environment variables template
├── .gitignore               # Git ignore rules
├── API.md                   # API documentation
├── BACKEND_SETUP.md         # This file
├── package.json             # Dependencies
├── package-lock.json        # Locked versions
├── database.sqlite          # SQLite database file
└── server.js                # Main server file

---

## Database Schema

### Users Table
- `id` (Integer, Primary Key)
- `name` (String, Required)
- `email` (String, Unique, Required)
- `password` (String, Hashed, Required)
- `userType` (Enum: Applicant | Employer)
- `company` (String, Optional)
- `phone` (String, Optional)
- `bio` (String, Optional)
- `createdAt` (Timestamp)
- `updatedAt` (Timestamp)

### Jobs Table
- `id` (Integer, Primary Key)
- `title` (String, Required)
- `description` (Text, Required)
- `company` (String, Required)
- `location` (String, Required)
- `salaryMin` (Integer, Optional)
- `salaryMax` (Integer, Optional)
- `jobType` (Enum: Full-time | Part-time | Contract | Internship)
- `experience` (Enum: Entry | Mid | Senior)
- `skills` (Text/JSON array)
- `isActive` (Boolean, Default: true)
- `postedBy` (Integer, Foreign Key → User)
- `createdAt` (Timestamp)
- `updatedAt` (Timestamp)

### Applications Table
- `id` (Integer, Primary Key)
- `jobId` (Integer, Foreign Key → Job)
- `applicantId` (Integer, Foreign Key → User)
- `resumeUrl` (String, Optional)
- `coverLetter` (Text, Optional)
- `status` (Enum: Pending | Reviewed | Shortlisted | Rejected | Hired)
- `rating` (Integer 0-5, Optional)
- `feedback` (Text, Optional)
- `createdAt` (Timestamp)
- `updatedAt` (Timestamp)

---

## API Endpoints

See `API.md` for complete documentation.

**Quick Summary:**
- 5 Auth endpoints (register, login, profile, change password)
- 6 Job endpoints (CRUD, search, filter, employer listings)
- 5 Application endpoints (apply, view, update status, delete)

---

## Development Workflow

### Create Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### Make Changes

Edit files in the backend folder.

### Commit with Matric Number

```bash
git add .
git commit -m "YOUR_MATRIC_NUMBER: Brief description of changes"
```

### Push to Remote

```bash
git push origin feature/your-feature-name
```

### Create Pull Request

1. Go to GitHub
2. Click "Compare & pull request"
3. Fill in title and description
4. Submit for review

---

## Testing

### Manual Testing with Curl

```bash
# Health check
curl http://localhost:5000/api/health

# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"pass123","userType":"Applicant"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"pass123"}'

# Get all jobs
curl http://localhost:5000/api/jobs
```

### Using Postman

1. Import the API collection
2. Set base URL to `http://localhost:5000/api`
3. Test each endpoint
4. Use token from login in Authorization header

---

## Troubleshooting

### Port Already in Use

```bash
# Find process on port 5000
netstat -ano | findstr :5000

# Kill process (Windows)
taskkill /PID <PID> /F
```

### Database Issues

Delete `database.sqlite` and restart server - it will recreate.

### Module Not Found

```bash
rm -rf node_modules
npm install
```

### Git Issues

```bash
git status
git log --oneline
git branch -a
```

---

## Security Notes

- ✅ Passwords hashed with bcryptjs
- ✅ JWT tokens for authentication
- ✅ Rate limiting to prevent brute force
- ✅ CORS configured for frontend
- ✅ Helmet for security headers
- ✅ Input validation on all endpoints

**IMPORTANT:** 
- Change `JWT_SECRET` in production
- Never commit `.env` file
- Use HTTPS in production
- Set `NODE_ENV=production` for deployment

---

## Team Contributions

**Backend Team:**
- Oladapo Daniel Ogun (24120111072) - Database models, associations, API documentation
- Anjolaoluwa Bawaallah-Olufemi (24120111024) - API routes, controllers, middleware, security

---

## Useful Commands

```bash
npm run dev              # Start development server
npm install             # Install dependencies
git status              # Check git status
git log --oneline       # View commits
git branch -a           # View all branches
npm list                # List installed packages
```

---

## Next Steps

1. Frontend team integrates with this API
2. Deploy to production server
3. Add more features (notifications, messaging, etc.)
4. Implement caching with Redis
5. Add comprehensive testing

---

**Last Updated:** May 17, 2026
**Status:** Production Ready ✅