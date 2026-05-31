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
  void userType;
  return `${API_BASE_URL}/auth/google`;
}
