import { Job, Application } from "../types";

const API_BASE = "https://job-board-platform-msw6.onrender.com/api";

export async function fetchWithTimeout(resource: string, options: RequestInit = {}) {
  const { timeout = 8000 } = options as any;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(resource, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}

export const apiService = {
  // --- Heatlh/Diagnostics API ---
  async checkHealth() {
    try {
      const res = await fetchWithTimeout(`${API_BASE}/health`);
      return await res.json();
    } catch (e) {
      console.warn("Diagnostics healthcheck offline:", e);
      return null;
    }
  },

  async getDiagnosticsStats() {
    try {
      const res = await fetchWithTimeout(`${API_BASE}/diagnostics/stats`);
      return await res.json();
    } catch (e) {
      console.warn("Could not retrieve team metrics payload:", e);
      return null;
    }
  },

  async clearDiagnosticsLogs() {
    try {
      const res = await fetchWithTimeout(`${API_BASE}/diagnostics/clear-logs`, {
        method: "POST"
      });
      return await res.json();
    } catch (e) {
      return null;
    }
  },

  // --- Jobs API ---
  async getJobs(filters: { category?: string; search?: string; type?: string; experienceLevel?: string } = {}): Promise<Job[]> {
    try {
      const params = new URLSearchParams();
      if (filters.category) params.append("category", filters.category);
      if (filters.search) params.append("search", filters.search);
      if (filters.type) params.append("type", filters.type);
      if (filters.experienceLevel) params.append("experienceLevel", filters.experienceLevel);

      const res = await fetchWithTimeout(`${API_BASE}/jobs?${params.toString()}`);
      if (!res.ok) throw new Error("Faulty response status from jobs query");
      return await res.json();
    } catch (e) {
      console.error("API Error in getJobs, falling back to cached state:", e);
      throw e;
    }
  },

  async getJobDetail(id: string): Promise<Job> {
    const res = await fetchWithTimeout(`${API_BASE}/jobs/${id}`);
    if (!res.ok) throw new Error(`Faulty response code: ${res.status}`);
    return await res.json();
  },

  async createJob(jobData: Partial<Job>): Promise<Job> {
    const res = await fetchWithTimeout(`${API_BASE}/jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jobData)
    });
    if (!res.ok) throw new Error("Could not create job position on database");
    return await res.json();
  },

  async updateJob(id: string, jobData: Partial<Job>): Promise<Job> {
    const res = await fetchWithTimeout(`${API_BASE}/jobs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jobData)
    });
    if (!res.ok) throw new Error("Could not update job details on database");
    return await res.json();
  },

  async deleteJob(id: string): Promise<{ success: boolean; message: string }> {
    const res = await fetchWithTimeout(`${API_BASE}/jobs/${id}`, {
      method: "DELETE"
    });
    if (!res.ok) throw new Error("Could not delete job vacancy on database");
    return await res.json();
  },

  // --- Applications API ---
  async applyToJob(appData: { jobId: string; candidateName: string; candidateEmail: string; resumeName: string }): Promise<Application> {
    const res = await fetchWithTimeout(`${API_BASE}/applications`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(appData)
    });
    if (!res.ok) throw new Error("Refused candidate application registration");
    return await res.json();
  },

  async getApplications(candidateEmail?: string): Promise<Application[]> {
    try {
      const url = candidateEmail 
        ? `${API_BASE}/applications?candidateEmail=${encodeURIComponent(candidateEmail)}`
        : `${API_BASE}/applications`;
      const res = await fetchWithTimeout(url);
      if (!res.ok) throw new Error("Could not fetch application list");
      return await res.json();
    } catch (e) {
      console.error("API Error fetching applications:", e);
      throw e;
    }
  },

  async updateApplicationStatus(id: string, status: string): Promise<Application> {
    const res = await fetchWithTimeout(`${API_BASE}/applications/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });
    if (!res.ok) throw new Error("Could not update candidate status on backend");
    return await res.json();
  }
};
