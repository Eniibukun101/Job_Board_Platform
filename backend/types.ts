/**
 * Job Board Platform - Backend API Types
 * Developer: Anjolaoluwa Bawaallah-Olufemi
 * Matric Number: 24120111024
 * Role: Backend Team - API Routes, Controllers, Middleware & Models
 *
 * This file defines TypeScript interfaces and types for the Jobnest API.
 * TypeScript adds static type checking to JavaScript, catching errors at
 * compile time rather than runtime.
 */

// ─── User Types ───────────────────────────────────────────────────────────────

export type UserType = 'Applicant' | 'Employer';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  userType: UserType;
  company?: string;
  phone?: string;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPublic {
  id: number;
  name: string;
  email: string;
  userType: UserType;
  company?: string;
  phone?: string;
  bio?: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  userType: UserType;
  company?: string;
  phone?: string;
  bio?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: UserPublic;
}

// ─── Job Types ────────────────────────────────────────────────────────────────

export type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
export type ExperienceLevel = 'Entry' | 'Mid' | 'Senior';

export interface Job {
  id: number;
  title: string;
  description: string;
  company: string;
  location: string;
  salaryMin?: number;
  salaryMax?: number;
  jobType: JobType;
  experience: ExperienceLevel;
  skills: string[];
  isActive: boolean;
  postedBy: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateJobInput {
  title: string;
  description: string;
  company: string;
  location: string;
  salaryMin?: number;
  salaryMax?: number;
  jobType?: JobType;
  experience?: ExperienceLevel;
  skills?: string[];
}

export interface UpdateJobInput {
  title?: string;
  description?: string;
  company?: string;
  location?: string;
  salaryMin?: number;
  salaryMax?: number;
  jobType?: JobType;
  experience?: ExperienceLevel;
  skills?: string[];
  isActive?: boolean;
}

export interface JobFilters {
  search?: string;
  location?: string;
  jobType?: JobType;
  experience?: ExperienceLevel;
  salaryMin?: number;
  page?: number;
  limit?: number;
}

export interface PaginatedJobs {
  jobs: Job[];
  pagination: {
    total: number;
    page: number;
    pages: number;
    limit: number;
  };
}

// ─── Application Types ────────────────────────────────────────────────────────

export type ApplicationStatus =
  | 'Pending'
  | 'Reviewed'
  | 'Shortlisted'
  | 'Rejected'
  | 'Hired';

export interface Application {
  id: number;
  jobId: number;
  applicantId: number;
  coverLetter?: string;
  resumeUrl?: string;
  status: ApplicationStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateApplicationInput {
  coverLetter?: string;
  resumeUrl?: string;
}

export interface UpdateApplicationStatusInput {
  status: ApplicationStatus;
}

// ─── API Response Types ───────────────────────────────────────────────────────

export interface ApiResponse<T = null> {
  message: string;
  data?: T;
}

export interface ErrorResponse {
  message: string;
  errors?: {
    field: string;
    message: string;
  }[];
}

// ─── JWT Types ────────────────────────────────────────────────────────────────

export interface JwtPayload {
  id: number;
  iat?: number;
  exp?: number;
}

// ─── Type Guards ─────────────────────────────────────────────────────────────
// Type guards are functions that check if a value is a specific type at runtime

export const isEmployer = (user: UserPublic): boolean => {
  return user.userType === 'Employer';
};

export const isApplicant = (user: UserPublic): boolean => {
  return user.userType === 'Applicant';
};

export const isValidStatus = (status: string): status is ApplicationStatus => {
  return ['Pending', 'Reviewed', 'Shortlisted', 'Rejected', 'Hired'].includes(status);
};

export const isValidJobType = (jobType: string): jobType is JobType => {
  return ['Full-time', 'Part-time', 'Contract', 'Internship'].includes(jobType);
};

export const isValidExperience = (experience: string): experience is ExperienceLevel => {
  return ['Entry', 'Mid', 'Senior'].includes(experience);
};
