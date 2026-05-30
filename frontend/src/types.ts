export interface Job {
  id: string;
  title: string;
  company: string;
  logoUrl?: string; // or an icon name from lucide
  logoBg: string; // colors for decorative logo backgrounds
  location: string;
  type: string; // "Full-time", "Part-time", "Contract", "Remote"
  salary: string;
  description: string;
  postedTime: string;
  category: string; // links to category ID
  applicants: number;
  experienceLevel: string; // "Senior", "Mid", "Junior"
}

export interface Category {
  id: string;
  name: string;
  icon: string; // Lucide icon name
  count: number;
}

export interface Interview {
  id: string;
  title: string;
  company: string;
  description: string;
  date: string; // "2024-10-xx" format
  time: string;
  completed: boolean;
}

export interface DashboardNotification {
  id: string;
  company: string;
  status: string;
  time: string;
  logoType: string;
  tab: "today" | "week" | "month";
}

export interface Application {
  id: string;
  jobId: string;
  candidateName: string;
  candidateEmail: string;
  resumeName: string;
  appliedAt: string;
  status: string; // "Submitted" | "Reviewing" | "Interview Scheduled" | "Offered" | "Rejected"
}

