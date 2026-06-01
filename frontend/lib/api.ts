export type UserType = "Applicant" | "Employer";

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  userType: UserType;
  company?: string | null;
  phone?: string | null;
  bio?: string | null;
  industry?: string | null;
  website?: string | null;
  location?: string | null;
  role?: string | null;
  qualification?: string | null;
  expectedSalaryRange?: string | null;
  preferredJobType?: string | null;
  photoUrl?: string | null;
  resumeUrl?: string | null;
  linkedin?: string | null;
  portfolio?: string | null;
  skills?: string[];
  experiences?: Array<{
    title: string;
    location: string;
    company: string;
  }>;
  savedJobIds?: number[];
}

export interface AuthResponse {
  message: string;
  token: string;
  user: AuthUser;
}

export interface ApiValidationError {
  field: string;
  message: string;
}

export interface ApiErrorPayload {
  message?: string;
  errors?: ApiValidationError[];
}

export interface ApiJob {
  id: number;
  title: string;
  description: string;
  company: string;
  category?: string | null;
  location: string;
  salaryMin?: number | null;
  salaryMax?: number | null;
  jobType: "Full-time" | "Part-time" | "Contract" | "Internship";
  experience: "Entry" | "Mid" | "Senior";
  skills?: string[];
  isActive: boolean;
  postedBy: number;
  createdAt: string;
  updatedAt: string;
  employer?: Pick<AuthUser, "id" | "name" | "company"> & { email?: string };
  applications?: Array<{ id: number; status: string }>;
}

export interface ApiJobsResponse {
  jobs: ApiJob[];
  pagination?: {
    total: number;
    page: number;
    pages: number;
    limit: number;
  };
}

export interface ApiJobResponse {
  job: ApiJob;
}

export interface ApiApplication {
  id: number;
  jobId: number;
  applicantId: number;
  coverLetter?: string | null;
  resumeUrl?: string | null;
  status: "Pending" | "Reviewed" | "Shortlisted" | "Rejected" | "Hired";
  createdAt: string;
  updatedAt: string;
  job?: Pick<ApiJob, "id" | "title" | "company" | "location" | "jobType">;
  applicant?: Pick<AuthUser, "id" | "name" | "email" | "phone" | "bio">;
}

export interface ApiApplicationsResponse {
  applications: ApiApplication[];
  total?: number;
}

export interface ApiNotification {
  id: number;
  userId: number;
  company: string;
  message: string;
  logoType: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ApiNotificationsResponse {
  notifications: ApiNotification[];
}

export interface ApiInterview {
  id: number;
  userId: number;
  applicationId?: number | null;
  company: string;
  title: string;
  description?: string | null;
  date: string;
  time: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ApiInterviewsResponse {
  interviews: ApiInterview[];
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://job-board-platform-msw6.onrender.com/api";

function buildErrorMessage(payload: ApiErrorPayload | null, fallback: string) {
  if (!payload) return fallback;
  if (payload.errors?.length) {
    return payload.errors.map((error) => error.message).join(" ");
  }
  return payload.message || fallback;
}

async function request<T>(
  path: string,
  init: RequestInit = {},
  token?: string,
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init.headers || {}),
    },
    cache: "no-store",
  });

  const contentType = response.headers.get("content-type") || "";
  const payload = contentType.includes("application/json")
    ? ((await response.json()) as T | ApiErrorPayload)
    : null;

  if (!response.ok) {
    throw new Error(
      buildErrorMessage(payload as ApiErrorPayload | null, "Request failed"),
    );
  }

  return payload as T;
}

export function registerUser(data: {
  name: string;
  email: string;
  password: string;
  userType: UserType;
  company?: string;
}) {
  return request<AuthResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function loginUser(data: { email: string; password: string }) {
  return request<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateCurrentUserProfile(
  data: Partial<
    Pick<
      AuthUser,
      | "name"
      | "email"
      | "company"
      | "phone"
      | "bio"
      | "industry"
      | "website"
      | "location"
      | "role"
      | "qualification"
      | "expectedSalaryRange"
      | "preferredJobType"
      | "photoUrl"
      | "resumeUrl"
      | "linkedin"
      | "portfolio"
      | "skills"
      | "experiences"
    >
  >,
  token: string,
) {
  return request<{ message: string; user: AuthUser }>(
    "/auth/me",
    {
      method: "PUT",
      body: JSON.stringify(data),
    },
    token,
  );
}

export function getCurrentUser(token: string) {
  return request<{ user: AuthUser }>("/auth/me", { method: "GET" }, token);
}

export function getGoogleAuthUrl(userType: UserType) {
  return `${API_BASE_URL}/auth/google/start?mode=${encodeURIComponent(userType)}`;
}

export function getPublicJobs(filters?: {
  search?: string;
  location?: string;
  jobType?: string;
  experience?: string;
  salaryMin?: number;
  page?: number;
  limit?: number;
}) {
  const params = new URLSearchParams();

  if (filters?.search) params.set("search", filters.search);
  if (filters?.location) params.set("location", filters.location);
  if (filters?.jobType) params.set("jobType", filters.jobType);
  if (filters?.experience) params.set("experience", filters.experience);
  if (filters?.salaryMin !== undefined)
    params.set("salaryMin", String(filters.salaryMin));
  if (filters?.page !== undefined) params.set("page", String(filters.page));
  if (filters?.limit !== undefined) params.set("limit", String(filters.limit));

  const suffix = params.toString() ? `?${params.toString()}` : "";
  return request<ApiJobsResponse>(`/jobs${suffix}`, { method: "GET" });
}

export function getJobDetail(id: number | string) {
  return request<ApiJobResponse>(`/jobs/${id}`, { method: "GET" });
}

export function getEmployerListings(token: string) {
  return request<ApiJobsResponse>(
    "/jobs/employer/my-listings",
    { method: "GET" },
    token,
  );
}

export function createJobListing(
  data: {
    title: string;
    description: string;
    company: string;
    category?: string;
    location: string;
    salaryMin?: number | null;
    salaryMax?: number | null;
    jobType?: string;
    experience?: string;
    skills?: string[];
  },
  token: string,
) {
  return request<{ message: string; job: ApiJob }>(
    "/jobs",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
    token,
  );
}

export function updateJobListing(
  id: number | string,
  data: Partial<{
    title: string;
    description: string;
    company: string;
    category: string;
    location: string;
    salaryMin: number | null;
    salaryMax: number | null;
    jobType: string;
    experience: string;
    skills: string[];
    isActive: boolean;
  }>,
  token: string,
) {
  return request<{ message: string; job: ApiJob }>(
    `/jobs/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
    },
    token,
  );
}

export function deleteJobListing(id: number | string, token: string) {
  return request<{ message: string }>(
    `/jobs/${id}`,
    { method: "DELETE" },
    token,
  );
}

export function applyToJob(
  jobId: number | string,
  data: { coverLetter?: string; resumeUrl?: string },
  token: string,
) {
  return request<{ message: string; application: ApiApplication }>(
    `/applications/${jobId}`,
    {
      method: "POST",
      body: JSON.stringify(data),
    },
    token,
  );
}

export function getMyApplications(token: string) {
  return request<ApiApplicationsResponse>(
    "/applications/my-applications",
    { method: "GET" },
    token,
  );
}

export function getJobApplications(jobId: number | string, token: string) {
  return request<ApiApplicationsResponse>(
    `/applications/job/${jobId}`,
    { method: "GET" },
    token,
  );
}

export function updateJobApplicationStatus(
  id: number | string,
  status: "Pending" | "Reviewed" | "Shortlisted" | "Rejected" | "Hired",
  token: string,
) {
  return request<{ message: string; application: ApiApplication }>(
    `/applications/${id}/status`,
    {
      method: "PUT",
      body: JSON.stringify({ status }),
    },
    token,
  );
}

export function getMyNotifications(token: string) {
  return request<ApiNotificationsResponse>(
    "/notifications",
    { method: "GET" },
    token,
  );
}

export function getMyInterviews(token: string) {
  return request<ApiInterviewsResponse>(
    "/interviews",
    { method: "GET" },
    token,
  );
}

export function createInterviewEntry(
  data: {
    company: string;
    title: string;
    description?: string;
    date: string;
    time: string;
  },
  token: string,
) {
  return request<{ message: string; interview: ApiInterview }>(
    "/interviews",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
    token,
  );
}

export function updateInterviewEntry(
  id: number | string,
  data: Partial<{
    company: string;
    title: string;
    description: string;
    date: string;
    time: string;
    completed: boolean;
  }>,
  token: string,
) {
  return request<{ message: string; interview: ApiInterview }>(
    `/interviews/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
    },
    token,
  );
}

export function deleteInterviewEntry(id: number | string, token: string) {
  return request<{ message: string }>(
    `/interviews/${id}`,
    { method: "DELETE" },
    token,
  );
}

export function getSavedJobs(token: string) {
  return request<ApiJobsResponse>("/jobs/saved", { method: "GET" }, token);
}

export function saveJobForUser(id: number | string, token: string) {
  return request<{ message: string; savedJobIds: number[] }>(
    `/jobs/${id}/save`,
    { method: "POST" },
    token,
  );
}

export function unsaveJobForUser(id: number | string, token: string) {
  return request<{ message: string; savedJobIds: number[] }>(
    `/jobs/${id}/save`,
    { method: "DELETE" },
    token,
  );
}

export const apiService = {
  getDiagnosticsStats: async (): Promise<{ logs: any[]; jobsDB: any[] } | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/diagnostics/stats`);
      if (response.ok) return response.json();
    } catch (e) {}
    return { logs: [], jobsDB: [] };
  },
  clearDiagnosticsLogs: async (): Promise<void> => {
    try {
      await fetch(`${API_BASE_URL}/diagnostics/logs`, { method: "DELETE" });
    } catch (e) {}
  },
  getJobs: async () => {
    return [];
  },
  applyToJob: async (data: any) => {
    return {};
  }
};
