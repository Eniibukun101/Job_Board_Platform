# Job_Board_Platform

CSC 202 – Computer Programming II | Group 2

Semester: Second Semester

Department: Computer Science

A full-stack job board web application where employers can post job listings and applicants can search and apply for jobs. Built with Node.js, Express, MongoDB, and React.


Project Overview

The Job Board Platform allows two types of users — employers and job seekers. Employers can create accounts, post jobs, and manage their listings. Job seekers can browse available positions, filter by category or location, and submit applications. The platform is built as a RESTful API on the backend and a React single-page application on the frontend.



Tech Stack

Backend
Node.js
Express.js
MongoDB (via Mongoose)
JSON Web Tokens (JWT) for authentication
bcryptjs for password hashing
dotenv for environment config
cors for cross-origin requests

Frontend
React
React Router DOM
Axios
TypeScript (partial — used in form components and API service layer)

Tools
Git & GitHub
Postman (API testing)
MongoDB Atlas (cloud database)
Render / Railway (deployment)

Getting Started

Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/)

Installation

1. Clone the repository

bash
git clone https://github.com/your-group/job-board-platform.git
cd job-board-platform


2. Install backend dependencies

bash
cd backend
npm install


3. Install frontend dependencies

bash
cd ../frontend
npm install

4. Set up environment variables

See the [Environment Variables](#environment-variables) section below.

5. Run the backend

bash
cd backend
npm run dev


6. Run the frontend

bash
cd frontend
npm start

