# JobNest

## Overview

JobNest is a full-stack job board web application built to connect job seekers with employers. It provides a clean, modern interface for candidates to browse job listings, submit applications, track interview schedules, and manage their professional profile — all from one platform. Employers get a dedicated workspace to post vacancies, review applicants, and manage hiring activity.

The application supports two distinct user roles — **Employee (Applicant)** and **Employer** — each with their own portal, navigation, and set of features.

> Live Application: https://jobboard-frontend-dun.vercel.app
Live Backend API: https://job-board-platform-msw6.onrender.com

---

## Design Philosophy

JobNest is built around the idea of a **professional but approachable workspace** — the interface should feel like something a real company would deploy, not a student project. Every design decision reflects this:

- **Role-based navigation** — employees and employers see completely different portals tailored to their needs
- **Card-based layouts** — jobs, applications, and notifications are presented as clean cards with consistent spacing
- **Dark/light mode support** — the app respects system preferences and allows manual toggling
- **Subtle motion** — the Framer Motion library is used for smooth transitions on modals and page changes
- **Consistent branding** — the JobNest logo, color palette (`#11121c`, indigo, cyan), and rounded corners (`rounded-[24px]`) are used throughout

---

## Tech Stack

| Technology | Role |
|---|---|
| **Next.js 14** (App Router) | Core React framework; handles routing, server components, and page rendering |
| **TypeScript** | Static typing across all components, props, API responses, and shared interfaces |
| **Tailwind CSS** | Utility-first CSS framework used for all layout, spacing, color, and responsive styling |
| **Framer Motion** | Animation library used for modal transitions and interactive UI elements |
| **Lucide React** | Icon library used throughout the interface for consistent iconography |
| **Context API** | Manages global authentication state (logged-in user, token, user type) across the app |

---

## Application Structure

The frontend uses Next.js App Router. Each folder inside `app/` is a route. Reusable components live in `src/components/` and `app/components/`. Shared TypeScript interfaces are defined in `src/types.ts`.

```
frontend/
├── app/
│   ├── auth/
│   │   ├── forgot-password/page.tsx     # Forgot password page
│   │   ├── google/callback/page.tsx     # Handles Google OAuth redirect
│   │   └── success/page.tsx             # OAuth success — extracts token from URL
│   ├── company-profile/page.tsx         # Company profile page
│   ├── company-signup/page.tsx          # Employer registration page
│   ├── components/                      # App-router page-level components
│   │   ├── CompanySignUpForm.tsx
│   │   ├── DashboardPortal.tsx
│   │   ├── EmployeeOnboardingForm.tsx
│   │   ├── EmployerLoginForm.tsx
│   │   ├── EmployerLoginPage.tsx
│   │   ├── EmployerPortal.tsx
│   │   ├── JobDetailPage.tsx
│   │   ├── LoginForm.tsx
│   │   ├── LoginPage.tsx
│   │   ├── ProfilePage.tsx
│   │   ├── SignUpForm.tsx
│   │   └── WelcomeSection.tsx
│   ├── employee-onboarding/page.tsx     # Onboarding form after signup
│   ├── employer/
│   │   ├── page.tsx                     # Employer landing page
│   │   └── signup/page.tsx              # Employer signup route
│   ├── get-started/page.tsx             # Role selection page (new users)
│   ├── login/
│   │   ├── page.tsx                     # Login role selection page
│   │   └── employee/page.tsx            # Employee login page
│   ├── portal/
│   │   ├── page.tsx                     # Main portal entry
│   │   ├── dashboard/page.tsx           # Candidate dashboard
│   │   ├── employer/page.tsx            # Employer workspace
│   │   ├── job-details/page.tsx         # Job detail view
│   │   ├── notifications/page.tsx       # Notifications page
│   │   └── profile/page.tsx             # User profile page
│   ├── signup/page.tsx                  # Candidate registration page
│   ├── globals.css                      # Global styles
│   └── layout.tsx                       # Root layout
├── src/
│   ├── components/                      # Shared UI components
│   │   ├── BackendSandbox.tsx
│   │   ├── Categories.tsx
│   │   ├── DashboardPortal.tsx
│   │   ├── DoubleBanners.tsx
│   │   ├── EmployerPortal.tsx
│   │   ├── EmployerWorkspace.tsx
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── JobDetailPage.tsx
│   │   ├── JobsHorizontalScroll.tsx
│   │   ├── Newsletter.tsx
│   │   ├── NotificationsPage.tsx
│   │   ├── Partners.tsx
│   │   └── ProfilePage.tsx
│   ├── data/jobData.ts                  # Static job and category seed data
│   ├── types.ts                         # Shared TypeScript interfaces
│   └── App.tsx                          # Root app component (used in SPA mode)
├── lib/
│   ├── api.ts                           # All API call functions + TypeScript types
│   └── auth.ts                          # Auth token storage and retrieval helpers
├── public/                              # Static assets (logos, illustrations)
├── .env.example                         # Environment variable template
├── next.config.js
├── tailwind.config.js
└── tsconfig.json
```

Protected routes (`/portal/*`) require the user to be logged in. Unauthenticated users are automatically redirected to the login page via the auth context.

---

## Pages & User Interface

### 1. Landing Page (`/`)

The first page a visitor sees. It introduces JobNest and directs users to either sign in or get started.

**Layout & Content:**
- A centered hero section with the headline **"JobNest"** and a subheading: *"Connect with top employers and discover opportunities that match your career goals."*
- Two call-to-action buttons: **Sign in** (routes to `/login`) and **Get started** (routes to `/get-started`)
- Supports dark mode — the background switches between `#f8fafc` (light) and `#11121c` (dark)

**Purpose:** Direct new and returning users to their appropriate flow.

---

### 2. Get Started Page (`/get-started`)

A role selection page shown to new users registering for the first time.

**Layout & Content:**
- A split card layout with two large interactive cards:
  - **Get started as Employee** — routes to `/signup` (Candidate registration)
  - **Get started as Company** — routes to `/company-signup` (Employer registration)
- Each card has a role icon, description, and an animated arrow that slides on hover
- Decorative background blur circles in indigo and cyan add depth
- A **"Back to Home"** link at the bottom

**Purpose:** Separate new users into the correct registration flow based on their role.

---

### 3. Login Page (`/login`)

A role selection page for returning users.

**Layout & Content:**
- Same two-card layout as `/get-started` but for sign-in:
  - **Sign in as Employee** — routes to `/login/employee`
  - **Sign in as Company** — routes to `/employer`
- Cards feature animated hover effects with role-specific color accents (indigo for employees, cyan for employers)

**Purpose:** Route returning users to the correct login form.

---

### 4. Employee Login (`/login/employee`)

The actual login form for candidates.

**Layout & Content:**
- A split-screen layout:
  - **Left side (WelcomeSection):** JobNest branding, tagline, and a visual illustration
  - **Right side:** A login form inside a rounded card with:
    - Email address input
    - Password input
    - **"Forgot password?"** link
    - **Login** submit button with loading state
    - Google Sign-In button (triggers OAuth flow)
    - Link to create a new account
- Error messages display inline if login fails

**Authentication Flow:**
1. User submits email and password
2. Frontend calls `POST /api/auth/login`
3. On success, the JWT token and user object are saved to local storage via `saveStoredAuth()`
4. User is redirected to `/portal/employer` (if Employer) or `/portal/dashboard` (if Applicant)

---

### 5. Candidate Sign Up (`/signup`)

Registration form for job seekers.

**Layout & Content:**
- Split-screen layout:
  - **Left side:** JobNest logo, a sign-up illustration, and encouraging copy: *"Find roles, build your profile, and make your next move with confidence."*
  - **Right side:** The `SignUpForm` component inside a card — collects Full Name, Email, Password, and User Type

**Purpose:** Create new Applicant accounts.

---

### 6. Company Sign Up (`/company-signup`)

Registration form for employers.

**Layout & Content:**
- Similar split-screen layout to `/signup` but uses employer-specific illustration and copy
- The `CompanySignUpForm` component collects company-specific fields alongside standard registration details

**Purpose:** Create new Employer accounts.

---

### 7. Employee Onboarding (`/employee-onboarding`)

A post-signup onboarding form where new candidates complete their profile before entering the portal.

**Layout & Content:**
- Multi-step form using `EmployeeOnboardingForm` component
- Collects professional details: role, location, skills, experience, expected salary, and preferred job type

**Purpose:** Populate the user's profile with relevant career information before they start browsing jobs.

---

### 8. Candidate Dashboard (`/portal/dashboard`)

The main workspace for job seekers. This is where candidates spend most of their time in the app.

#### Header / Navigation
A persistent top header (`Header` component) contains:
- JobNest logo
- Navigation icons: Home, Messages, Notifications (with badge), User profile
- The logged-in user's profile photo and name
- A logout option

#### Main Content
The dashboard is organized into the following sections:

**Hero Search Bar**
A full-width search bar (`Hero` component) at the top of the page with:
- **Location** input field (with MapPin icon)
- **Job title / keyword** search field (with Search icon)
- A search button — triggers live filtering of job listings
- Decorative gradient background in dark (`#21222D`) theme

**Job Categories**
A horizontal scrollable row of category filter chips (`Categories` component):
- Categories include: Software Dev, UX/UI Design, Creative Arts, Marketing, Finance, HR, Product, Education
- Each category chip has an icon, name, and job count
- Clicking a category filters the job listings below

**Job Listings (Horizontal Scroll)**
A scrollable row of job cards (`JobsHorizontalScroll` component), each showing:
- Company name and logo background
- Job title
- Location, job type (Full-time, Part-time, Remote, Contract)
- Salary range
- A save/bookmark toggle button

**Recommended Jobs & Saved Jobs**
Inside the `DashboardPortal` component:
- A **Recommended Jobs** section showing jobs matched to the user's profile
- A **Saved Jobs** section listing bookmarked job cards with quick-apply access

**Interview Tracker**
A built-in interview scheduling section:
- Displays upcoming interviews as date/time cards (e.g. *"Frontend Developer Interview — Tech Corp — June 15, 10:00"*)
- Users can **add**, **edit**, **delete**, and **mark complete** interview entries
- Completed interviews are visually distinguished

**Notifications Summary**
A condensed view of recent application status updates, linking to the full notifications page.

**Profile Completion Bar**
A progress indicator showing how complete the user's profile is, with a prompt to fill in missing sections.

---

### 9. Job Detail Page (`/portal/job-details`)

A full-screen view of a single job listing.

**Layout & Content:**
- Company logo/background, job title, company name, location, salary range, job type
- Full job description
- Required skills listed as tags
- An **Apply** button — opens an application submission modal
- A **Save** toggle button

**Purpose:** Give the candidate all the information they need to decide whether to apply.

---

### 10. Notifications Page (`/portal/notifications`)

A dedicated page listing all application status updates for the logged-in candidate.

**Layout & Content:**
- Tab filters: **Today**, **This Week**, **This Month**, **All**
- Each notification card shows:
  - Company logo (represented as a colored icon — X/car/spotify style)
  - Company name (e.g. *"CloudNest Systems"*)
  - Status message (e.g. *"Your application has been rejected"*, *"Your application is under review"*, *"Your application has moved to the next step"*)
  - Timestamp (e.g. *"10:55am 22nd April"*)
- A back button to return to the dashboard

**Purpose:** Keep candidates informed of every update to their job applications.

---

### 11. Profile Page (`/portal/profile`)

The candidate's editable professional profile.

**Layout & Content:**
- Profile photo upload
- Editable fields: Name, Email, Phone, Location, About Me
- Skills section — add and remove skill tags
- Work experience entries — each with Title, Company, and Location
- LinkedIn and Portfolio URL fields
- CV upload section
- A profile completion percentage indicator

**Purpose:** Allow candidates to maintain an up-to-date professional profile that employers can view when reviewing applications.

---

### 12. Employer Workspace (`/portal/employer`)

A separate portal for employers to manage their entire hiring process.

**Layout & Content:**

The `EmployerPortal` component is divided into sections:

**Job Management**
- A list of all jobs posted by the employer
- Each job card shows title, location, applicant count, and status
- A **"Post New Job"** button opens a creation modal
- Jobs can be **edited** or **deleted**

**Job Creation / Edit Modal**
An animated modal (Framer Motion) for creating or updating a job listing:
- Fields: Title, Description, Location, Salary Min/Max, Job Type, Experience Level, Skills
- Form validates required fields before submission
- Calls `POST /api/jobs` (create) or `PUT /api/jobs/:id` (edit)

**Applicant Review**
- For each posted job, employers can view the list of candidates who applied
- Each applicant entry shows name, email, CV link, and current status
- Employer can update status: **Submitted → Reviewing → Interview Scheduled → Offered → Rejected**

**Notifications Panel**
- Shows incoming notifications relevant to the employer's activity

**Interview Tracker**
- Same interview tracking feature available in the candidate dashboard — employers can log and manage scheduled interviews

---

### 13. Google OAuth Flow

1. User clicks **"Sign in with Google"** on the login page
2. Frontend calls `getGoogleAuthUrl(userType)` from `lib/api.ts` to get the OAuth URL
3. User is redirected to Google's sign-in page
4. After successful Google login, the backend redirects to '/auth/google/callback?token=<jwt>'

5. The `AuthSuccessPage` component extracts the token from the URL, saves it using `saveStoredAuth()`, and redirects to the correct portal

---

## Functional Requirements

| ID | Feature | Description |
|---|---|---|
| F01 | Job Browsing | Candidates can browse all active job listings, filter by category, search by keyword and location |
| F02 | Job Applications | Candidates can apply to jobs with a cover letter and resume URL |
| F03 | Application Tracking | Candidates can view all their submitted applications and current statuses |
| F04 | Interview Tracker | Users can add, edit, delete, and mark complete upcoming interview entries |
| F05 | Notifications | Candidates receive status update notifications for each application |
| F06 | Employer Job Posting | Employers can create, edit, and delete job listings |
| F07 | Applicant Management | Employers can view applicants per job and update their application status |
| F08 | User Authentication | Email/password login, Google OAuth, JWT-based session persistence |
| F09 | Profile Management | Candidates can update their profile, upload a photo, add skills and experience |
| F10 | Save Jobs | Candidates can bookmark jobs for later review |

---

## Non-Functional Requirements

| ID | Requirement | Description |
|---|---|---|
| NF01 | Responsive Design | The application is designed for desktop but remains functional on tablet-sized screens |
| NF02 | Performance | API data loads with a loading state shown; UI updates immediately after actions without full page reloads |
| NF03 | Security | JWT tokens are stored in local storage and sent as Bearer tokens on all protected requests |
| NF04 | Type Safety | All component props, API responses, and shared data structures are fully typed with TypeScript |
| NF05 | Accessibility | Interactive elements use semantic HTML and have visible focus states |

---

## Integration with Backend

The frontend communicates with the backend through REST API calls managed in `lib/api.ts`. All authentication tokens are stored and retrieved via `lib/auth.ts`.

| Integration Point | Description |
|---|---|
| **Authentication** | Login and signup forms call `POST /api/auth/login` and `POST /api/auth/register`. The returned JWT is stored and sent in every subsequent request header |
| **Google OAuth** | Frontend redirects to the backend's Google OAuth route. After login, the token is extracted from the redirect URL and saved |
| **Job Listings** | `GET /api/jobs` with optional query params for filtering. Individual jobs fetched via `GET /api/jobs/:id` |
| **Job Applications** | `POST /api/applications/:jobId` submits an application. `GET /api/applications/my-applications` retrieves the candidate's history |
| **Application Status** | Employers call `PUT /api/applications/:id/status` to move candidates through the hiring pipeline |
| **Notifications** | `GET /api/notifications` fetches all notifications. `PUT /api/notifications/:id/read` marks one as read |
| **Interview Tracker** | Full CRUD via `/api/interviews` — create, read, update, delete, and mark complete |
| **Profile Updates** | `PUT /api/auth/me` updates the user's profile. Photo and CV upload URLs are stored as part of the user object |

---

## Testing

To ensure the reliability and usability of the JobNest frontend, the following testing approaches are used across the development lifecycle.

| Test Type | Purpose |
|---|---|
| **Functional Testing** | Verify that core features — login, job search, apply, post job, update status — behave as expected |
| **User Interface Testing** | Ensure layouts, buttons, forms, and components render correctly across different screen sizes |
| **Browser Compatibility Testing** | Confirm the application works correctly in Chrome, Firefox, and Safari |
| **Authentication Testing** | Verify login, signup, Google OAuth, logout, and protected route redirection all work correctly |
| **Error Handling Testing** | Ensure invalid inputs and failed API requests display clear, helpful error messages rather than crashing |
| **Role-Based Access Testing** | Confirm that employer-only and applicant-only routes are properly protected and inaccessible to the wrong user type |

> Testing is ongoing throughout development and will be completed before the final production release.

---

## Known Limitations

- The application is primarily optimized for **desktop and laptop browsers**. Mobile responsiveness is partially implemented but not fully polished in this release.
- The **employee onboarding** flow after signup is present but not yet fully connected to the backend profile update endpoint in all cases.
- **Real-time notifications** are currently fetched on page load rather than pushed live — a WebSocket-based update system is planned for a future release.

---

| Matric No | Name | Role |
|---|---|---|
| 24120111002 | ABULU Karina | DevOps|
| 24120111017 | AMU Omozuanfo | Documentation |
| 24120111024 | BAWAALLAH-OLUFEMI Anjolaoluwa | Backend |
| 24120111037 | ERIOBUNA Reginald | Documentation |
| 24120111047 | KAYODE Adeshina | Frontend |
| 24120111055 | NDEBUMADU Chiamaka | Frontend |
| 24120111072 | OGUN Oladapo | Backend |
| 24120111081 | OLALANDU Eniibukun | Team Lead |
| 24120111107 | UMAR Rajab | Frontend |



