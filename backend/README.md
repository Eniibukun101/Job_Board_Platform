# Job Board Platform — Backend API

**Developer:** Anjolaoluwa Bawaallah-Olufemi  
**Matric Number:** 24120111024  
**Role:** Backend Team — API Routes, Controllers, Middleware & Models

---

## Live API

**Base URL:** https://job-board-platform-msw6.onrender.com

Test it's running:
```
GET https://job-board-platform-msw6.onrender.com/api/health
```

---

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** SQLite (via Sequelize ORM)
- **Authentication:** JWT (JSON Web Tokens) + Google OAuth 2.0 (Passport.js)
- **Security:** Helmet, express-rate-limit, bcryptjs
- **Language Support:** TypeScript type definitions included

---

## Project Structure

```
backend/
├── config/
│   └── database.js          # SQLite + Sequelize connection
├── controllers/
│   ├── authController.js    # Register, login, profile, Google OAuth
│   ├── jobController.js     # CRUD for job listings
│   └── applicationController.js  # Job applications logic
├── middleware/
│   ├── auth.js              # JWT token verification
│   ├── passport.js          # Google OAuth strategy
│   ├── rateLimiter.js       # Rate limiting (100 req/15min)
│   └── validate.js          # Input validation
├── models/
│   ├── User.js              # User model (Applicant / Employer)
│   ├── Job.js               # Job listing model
│   ├── Application.js       # Application model
│   └── index.js             # Model associations
├── routes/
│   ├── auth.js              # Auth routes including Google OAuth
│   ├── jobs.js              # Job routes
│   └── applications.js      # Application routes
├── types.ts                 # TypeScript type definitions
├── server.js                # Entry point
├── .env.example             # Environment variable template
└── API.md                   # Full API documentation
```

---

## Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```
PORT=5000
JWT_SECRET=your_secret_key_here
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
```

---

## API Endpoints

### Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login with email & password | No |
| GET | `/api/auth/me` | Get current user profile | Yes |
| PUT | `/api/auth/me` | Update user profile | Yes |
| PUT | `/api/auth/change-password` | Change password | Yes |
| GET | `/api/auth/google` | Start Google OAuth login | No |
| GET | `/api/auth/google/callback` | Google OAuth callback | No |
| GET | `/api/auth/google/failed` | Google OAuth failure handler | No |

### Jobs
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/jobs` | Get all job listings | No |
| GET | `/api/jobs/:id` | Get single job by ID | No |
| POST | `/api/jobs` | Create new job listing | Yes (Employer) |
| PUT | `/api/jobs/:id` | Update job listing | Yes (Employer) |
| DELETE | `/api/jobs/:id` | Delete job listing | Yes (Employer) |
| GET | `/api/jobs/employer/my-listings` | Get employer's own jobs | Yes (Employer) |

### Applications
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/applications/:jobId` | Apply for a job | Yes (Applicant) |
| GET | `/api/applications/my-applications` | Get my applications | Yes (Applicant) |
| DELETE | `/api/applications/:id` | Withdraw application | Yes (Applicant) |
| GET | `/api/applications/job/:jobId` | Get applicants for a job | Yes (Employer) |
| PUT | `/api/applications/:id/status` | Update application status | Yes (Employer) |

### Health
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Check if API is running |

---

## Authentication

All protected endpoints require a JWT token in the request header:

```
Authorization: Bearer <your_token_here>
```

You get the token after registering or logging in. For Google OAuth, the token is returned as a URL parameter after successful login.

---

## Google OAuth Flow

1. Frontend redirects user to `GET /api/auth/google`
2. User signs in with their Google account
3. Backend creates or finds the user in the database
4. User is redirected to `/auth/success?token=<jwt_token>`
5. Frontend saves the token and uses it for all future requests

---

## User Types

- **Applicant** — can browse jobs and submit applications
- **Employer** — can post jobs and manage applications

---

## Running Locally

```bash
# Install dependencies
npm install

# Create your .env file
cp .env.example .env
# Fill in your values in .env

# Start the server
npm run dev
```

Server runs on `http://localhost:5000`
