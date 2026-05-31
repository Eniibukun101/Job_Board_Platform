import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

// Define data interfaces mimicking client systems
interface Job {
  id: string;
  title: string;
  company: string;
  logoUrl?: string;
  logoBg: string;
  location: string;
  type: string; 
  salary: string;
  description: string;
  postedTime: string;
  category: string;
  applicants: number;
  experienceLevel: string;
}

interface Application {
  id: string;
  jobId: string;
  candidateName: string;
  candidateEmail: string;
  resumeName: string;
  appliedAt: string;
  status: string;
}

// Stateful In-Memory mock datastar for the developer's integration branch
let jobsDatabase: Job[] = [
  {
    id: "dev-1",
    title: "Senior Full Stack Engineer",
    company: "Vercel",
    logoBg: "bg-black text-white",
    location: "Remote, US",
    type: "Full-time",
    salary: "$165k - $190k",
    description: "Build the future of the web. Collaborate with designers and product managers to improve developer experience globally with modern React and Next.js APIs.",
    postedTime: "Posted 2 hours ago",
    category: "developer-software",
    applicants: 24,
    experienceLevel: "Senior",
  },
  {
    id: "dev-2",
    title: "Core Infrastructure Engineer",
    company: "Supabase",
    logoBg: "bg-emerald-950 text-emerald-400",
    location: "Remote, Global",
    type: "Contract",
    salary: "Custom Rate / hr",
    description: "Scale open-source PostgreSQL services. Optimize real-time data replication systems, manage connection pooling, and ship robust backend modules written in Go and Rust.",
    postedTime: "Posted 1 day ago",
    category: "developer-software",
    applicants: 15,
    experienceLevel: "Senior",
  },
  {
    id: "dev-3",
    title: "Frontend UI Developer",
    company: "Linear",
    logoBg: "bg-indigo-950 text-indigo-300",
    location: "Remote, Europe",
    type: "Full-time",
    salary: "$120k - $145k",
    description: "Craft highly performant, sub-100ms keyboard-driven web applications. You have an eye for pristine animations, perfect typographic alignments, and deep state-management optimizations.",
    postedTime: "Posted 3 days ago",
    category: "developer-software",
    applicants: 41,
    experienceLevel: "Mid",
  },
  {
    id: "dev-4",
    title: "React Native Mobile Dev",
    company: "Stripe",
    logoBg: "bg-blue-600 text-white",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$150k - $175k",
    description: "Bring Stripe's payment dashboard utilities to iOS and Android devices. Optimize biometric logins, high-frequency chart rendering, and transaction flows locally.",
    postedTime: "Posted 4 days ago",
    category: "developer-software",
    applicants: 19,
    experienceLevel: "Mid",
  },
  {
    id: "dev-5",
    title: "Junior Backend Engineer",
    company: "Railway",
    logoBg: "bg-pink-600 text-white",
    location: "Remote, US",
    type: "Full-time",
    salary: "$85k - $105k",
    description: "Support our core cloud hosting orchestration platform. Learn and scale container isolation patterns, build user-friendly CLI integrations, and monitor metrics databases.",
    postedTime: "Posted 5 days ago",
    category: "developer-software",
    applicants: 89,
    experienceLevel: "Junior",
  },
  {
    id: "dev-6",
    title: "DevOps & Platform Architect",
    company: "HashiCorp",
    logoBg: "bg-purple-900 text-purple-200",
    location: "Austin, TX / Hybrid",
    type: "Full-time",
    salary: "$180k - $210k",
    description: "Design robust build workflows and multi-cloud infrastructure environments. Secure production systems using state-of-the-art policy engines, Terraform, and Vault cluster setups.",
    postedTime: "Posted 1 week ago",
    category: "developer-software",
    applicants: 8,
    experienceLevel: "Senior",
  },
  {
    id: "dev-7",
    title: "iOS Swift Developer",
    company: "Apple",
    logoBg: "bg-slate-800 text-slate-100",
    location: "Cupertino, CA",
    type: "Full-time",
    salary: "$170k - $200k",
    description: "Implement interactive new features in standard system apps. Maintain high compliance protocols, create delightful visual layouts using SwiftUI frameworks, and optimize memory leaks.",
    postedTime: "Posted 1 week ago",
    category: "developer-software",
    applicants: 37,
    experienceLevel: "Senior",
  },
  {
    id: "dev-8",
    title: "Developer Advocate",
    company: "Clerk",
    logoBg: "bg-sky-950 text-sky-450",
    location: "Remote, US & EU",
    type: "Full-time",
    salary: "$130k - $155k",
    description: "Empower developer communities with modern authentication guidelines. Write highly readable code tutorials, maintain open-source examples, and speak at web workshops.",
    postedTime: "Posted 1 week ago",
    category: "developer-software",
    applicants: 54,
    experienceLevel: "Mid",
  },
  {
    id: "dst-1",
    title: "Principal Product Designer",
    company: "Figma",
    logoBg: "bg-rose-500 text-white",
    location: "Remote, US",
    type: "Full-time",
    salary: "$180k - $210k",
    description: "Formulate the future workflows of Figma's collaboration canvas. Shape next-generation styling, auto-layouts, and prototyping interactions globally.",
    postedTime: "Posted 4 hours ago",
    category: "design-creative",
    applicants: 31,
    experienceLevel: "Senior",
  },
  {
    id: "dst-2",
    title: "Senior Brand Designer",
    company: "Airbnb",
    logoBg: "bg-rose-600 text-white",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$140k - $165k",
    description: "Direct offline and online visual branding pipelines. Design highly cinematic web landing campaigns, beautiful iconography patterns, and modern marketing brand books.",
    postedTime: "Posted 1 day ago",
    category: "design-creative",
    applicants: 18,
    experienceLevel: "Senior",
  },
  {
    id: "dst-3",
    title: "Junior UI/UX Designer",
    company: "Framer",
    logoBg: "bg-blue-500 text-white",
    location: "Amsterdam, NL / Hybrid",
    type: "Full-time",
    salary: "€65k - €75k",
    description: "Collaborate closely with content designers and frontend teams. Deliver delightful mockups, build custom responsive layouts inside our tools, and gather platform feedback.",
    postedTime: "Posted 2 days ago",
    category: "design-creative",
    applicants: 154,
    experienceLevel: "Junior",
  }
];

let applicationsDatabase: Application[] = [
  {
    id: "app-default-1",
    jobId: "dev-1",
    candidateName: "Adewale Adeleke",
    candidateEmail: "candidate@demo.com",
    resumeName: "Adewale_FullStack_Resume_2026.pdf",
    appliedAt: "2026-05-24T12:00:00Z",
    status: "Submitted"
  },
  {
    id: "app-default-2",
    jobId: "dev-3",
    candidateName: "Chisom Okafor",
    candidateEmail: "candidate@demo.com",
    resumeName: "Okafor_Chisom_DesignSystem_UI.pdf",
    appliedAt: "2026-05-23T15:30:00Z",
    status: "Reviewing"
  }
];

// Activity logging to visualize REST cycles inside our developer integration portal
interface ApiLog {
  timestamp: string;
  method: string;
  path: string;
  status: number;
  payload?: string;
}
let apiLogs: ApiLog[] = [];

function addApiLog(method: string, path: string, status: number, payload?: any) {
  const log: ApiLog = {
    timestamp: new Date().toLocaleTimeString(),
    method,
    path,
    status,
    payload: payload ? JSON.stringify(payload).substring(0, 160) + (JSON.stringify(payload).length > 165 ? "..." : "") : undefined
  };
  apiLogs.unshift(log);
  if (apiLogs.length > 50) apiLogs.pop();
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Basic Body Parsers
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Middleware to log API requests for the dev console we built
  app.use((req, res, next) => {
    const originalSend = res.send;
    res.send = function (body) {
      addApiLog(req.method, req.originalUrl || req.url, res.statusCode, req.body);
      return originalSend.apply(res, arguments as any);
    };
    next();
  });

  // REST API Routes
  
  // 1. Health and Meta Check
  app.get("/api/health", (req, res) => {
    res.json({
      status: "online",
      service: "JobNest Core Platform Integration Service",
      environment: process.env.NODE_ENV || "development",
      timestamp: new Date().toISOString()
    });
  });

  // 2. Integration Service Diagnostics Data (Logs + DB state dump)
  app.get("/api/diagnostics/stats", (req, res) => {
    res.json({
      totalJobs: jobsDatabase.length,
      totalApplications: applicationsDatabase.length,
      logs: apiLogs,
      jobsDB: jobsDatabase
    });
  });

  // Clear live logs endpoint
  app.post("/api/diagnostics/clear-logs", (req, res) => {
    apiLogs = [];
    res.json({ success: true, message: "Logs cleared" });
  });

  // 3. Get all job positions with search/filters
  app.get("/api/jobs", (req, res) => {
    const { category, search, type, experienceLevel } = req.query;
    let filtered = [...jobsDatabase];

    if (category && category !== "all") {
      filtered = filtered.filter(j => j.category === category);
    }
    if (experienceLevel && experienceLevel !== "all") {
      filtered = filtered.filter(j => j.experienceLevel.toLowerCase() === String(experienceLevel).toLowerCase());
    }
    if (type && type !== "all") {
      filtered = filtered.filter(j => j.type.toLowerCase() === String(type).toLowerCase());
    }
    if (search) {
      const q = String(search).toLowerCase();
      filtered = filtered.filter(j => 
        j.title.toLowerCase().includes(q) || 
        j.company.toLowerCase().includes(q) ||
        j.description.toLowerCase().includes(q) ||
        j.location.toLowerCase().includes(q)
      );
    }

    res.json(filtered);
  });

  // 4. Get individual job position
  app.get("/api/jobs/:id", (req, res) => {
    const job = jobsDatabase.find(j => j.id === req.params.id);
    if (!job) {
      res.status(404).json({ error: "Job position not found" });
    } else {
      res.json(job);
    }
  });

  // 5. Create new job vacancy
  app.post("/api/jobs", (req, res) => {
    const { title, company, salary, location, type, experienceLevel, category, description, logoBg } = req.body;
    
    if (!title || !company || !salary || !location || !type || !experienceLevel || !category || !description) {
      res.status(400).json({ error: "Missing required fields for job publication." });
      return;
    }

    const newJob: Job = {
      id: `backend-job-${Date.now()}`,
      title,
      company,
      logoBg: logoBg || "bg-indigo-600 text-white",
      location,
      type,
      salary,
      description,
      postedTime: "Posted just now",
      category,
      applicants: 0,
      experienceLevel
    };

    jobsDatabase.unshift(newJob);
    res.status(251).json(newJob);
  });

  // 6. Update existing job
  app.put("/api/jobs/:id", (req, res) => {
    const { id } = req.params;
    const index = jobsDatabase.findIndex(j => j.id === id);
    if (index === -1) {
      res.status(404).json({ error: "Job posting not found in registry." });
      return;
    }

    const updatedJob = {
      ...jobsDatabase[index],
      ...req.body,
      id // Prevent altering ID
    };

    jobsDatabase[index] = updatedJob;
    res.json(updatedJob);
  });

  // 7. Delete job posting
  app.delete("/api/jobs/:id", (req, res) => {
    const { id } = req.params;
    const initialLength = jobsDatabase.length;
    jobsDatabase = jobsDatabase.filter(j => j.id !== id);
    
    if (jobsDatabase.length === initialLength) {
      res.status(404).json({ error: "Posting not found" });
    } else {
      res.json({ success: true, message: `Successfully deleted job vacancy code ${id}` });
    }
  });

  // 8. Submit an Application
  app.post("/api/applications", (req, res) => {
    const { jobId, candidateName, candidateEmail, resumeName } = req.body;

    if (!jobId || !candidateName || !candidateEmail) {
      res.status(400).json({ error: "Applicant name, email and target jobId are required." });
      return;
    }

    // Increment applicants counter
    const job = jobsDatabase.find(j => j.id === jobId);
    if (job) {
      job.applicants += 1;
    }

    const newApp: Application = {
      id: `backend-app-${Date.now()}`,
      jobId,
      candidateName,
      candidateEmail,
      resumeName: resumeName || "Uploaded_File.pdf",
      appliedAt: new Date().toISOString(),
      status: "Submitted"
    };

    applicationsDatabase.unshift(newApp);
    res.status(251).json(newApp);
  });

  // 9. Fetch applications list (supports filtering by email or ID)
  app.get("/api/applications", (req, res) => {
    const { candidateEmail } = req.query;
    if (candidateEmail) {
      res.json(applicationsDatabase.filter(app => app.candidateEmail.toLowerCase() === String(candidateEmail).toLowerCase()));
    } else {
      res.json(applicationsDatabase);
    }
  });

  // 10. Update application status
  app.patch("/api/applications/:id", (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const index = applicationsDatabase.findIndex(app => app.id === id);
    if (index === -1) {
      res.status(404).json({ error: "Application registry was not found." });
      return;
    }

    applicationsDatabase[index].status = status || applicationsDatabase[index].status;
    res.json(applicationsDatabase[index]);
  });

  // Vite development middleware vs Static Production routing
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`JobNest dev-server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
