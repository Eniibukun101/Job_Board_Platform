import React, { useState, useEffect } from "react";
import { Job, Application, DashboardNotification, Interview } from "./types";
import { INITIAL_JOBS } from "./data/jobData";
import Header from "./components/Header";
import Hero from "./components/Hero";
import DoubleBanners from "./components/DoubleBanners";
import Categories from "./components/Categories";
import Partners from "./components/Partners";
import JobsHorizontalScroll from "./components/JobsHorizontalScroll";
import Newsletter from "./components/Newsletter";
import { X, Upload, CheckCircle, FileText, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import DashboardPortal from "./components/DashboardPortal";
import EmployerPortal from "./components/EmployerPortal";
import ProfilePage from "./components/ProfilePage";
import JobDetailPage from "./components/JobDetailPage";
import NotificationsPage from "./components/NotificationsPage";
import { apiService } from "./lib/api";
import BackendSandbox from "./components/BackendSandbox";

export default function App() {
  const [currentView, setCurrentView] = useState<"home" | "dashboard" | "employer" | "login" | "profile" | "job-details" | "notifications">("home");
  const [loginMode, setLoginMode] = useState<"login" | "create">("login");
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Unified navigation controller that handles custom login state parameters
  const handleNavigate = (
    view: "home" | "dashboard" | "employer" | "login" | "profile" | "job-details" | "notifications", 
    mode?: "login" | "create"
  ) => {
    if (view === "login") {
      setLoginMode(mode || "login");
    }
    setCurrentView(view);
  };
  const [isEmployerLoggedIn, setIsEmployerLoggedIn] = useState(true);
  const [employerProfile, setEmployerProfile] = useState<{name: string, email: string} | null>({ name: "JobNest Premium Partner", email: "hiring@partner.com" });
  const [pendingApplyJob, setPendingApplyJob] = useState<Job | null>(null);
  const [pendingApplyView, setPendingApplyView] = useState<"home" | "job-details" | null>(null);
  const [selectedJobForDetails, setSelectedJobForDetails] = useState<Job | null>(null);

  // Profile fields matching Daniel Adeyemi (Freelancer)
  const [profile, setProfile] = useState({
    name: "Daniel Adeyemi",
    email: "daniel.adeyemi.dev@gmail.com",
    phone: "+234 812 345 6789",
    location: "Lagos",
    aboutMe: "Passionate frontend developer with 3+ years of experience building responsive and user-friendly web applications. Skilled in modern JavaScript frameworks and focused on creating clean, efficient, and accessible interfaces.",
    skills: [
      "Node.js & Express",
      "RESTful API Development",
      "Database Management",
      "Authentication & Security",
      "Server Optimization"
    ],
    linkedin: "linkedin.com/in/danieladeyemi",
    portfolio: "behance.net/danieladeyemi",
    experiences: [
      {
        title: "Frontend Developer Skills",
        location: "15 Aminu Kano Crescent, Wuse II, Abuja, Nigeria",
        company: "NexaCore Technologies"
      },
      {
        title: "Backend Developer Skills",
        location: "8 Oluwaleimu Street, Ikeja GRA, Lagos, Nigeria",
        company: "TechNova Labs"
      }
    ]
  });

  const [isPhotoUploaded, setIsPhotoUploaded] = useState(false);
  const [isCvUploaded, setIsCvUploaded] = useState(false);
  const [isAboutMeCompleted, setIsAboutMeCompleted] = useState(false);

  // Notification Toast triggers
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
  };

  // Real local state list of jobs to allow candidates to apply!
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);

  // Dynamic unified applications state shared with employer
  const [applications, setApplications] = useState<Application[]>([
    {
      id: "app-1",
      jobId: "dev-2",
      candidateName: "Alex Mercer",
      candidateEmail: "alex.mercer@gmail.com",
      resumeName: "Alex_Mercer_CV.pdf",
      appliedAt: "2026-05-18",
      status: "Reviewing"
    },
    {
      id: "app-2",
      jobId: "dst-2",
      candidateName: "Alex Mercer",
      candidateEmail: "alex.mercer@gmail.com",
      resumeName: "Alex_Design_Portfolio.pdf",
      appliedAt: "2026-05-15",
      status: "Interview Scheduled"
    },
    {
      id: "app-3",
      jobId: "dev-1",
      candidateName: "Elena Rostova",
      candidateEmail: "elena.r@design.so",
      resumeName: "Elena_Designer_CV.pdf",
      appliedAt: "2026-05-19",
      status: "Submitted"
    },
    {
      id: "app-4",
      jobId: "employer-custom-pre-2",
      candidateName: "Marcus Vance",
      candidateEmail: "marcus.vance@tech.co",
      resumeName: "Marcus_Vance_Resume.pdf",
      appliedAt: "2026-05-20",
      status: "Reviewing"
    }
  ]);

  // Dynamic unified notifications state shared with dashboard
  const [notifications, setNotifications] = useState<DashboardNotification[]>([
    {
      id: "n-1",
      company: "CloudNest Systems",
      status: "Your application has been rejected",
      time: "10:55am 22nd April",
      logoType: "x",
      tab: "today"
    },
    {
      id: "n-2",
      company: "SterlingPath Ltd.",
      status: "Your application is under review",
      time: "10:55am 22nd April",
      logoType: "car",
      tab: "today"
    },
    {
      id: "n-3",
      company: "CodeSphere Inc.",
      status: "Your application has moved to the next step",
      time: "10:55am 22nd April",
      logoType: "spotify",
      tab: "today"
    },
    {
      id: "n-4",
      company: "CloudNest Systems",
      status: "Your application is under review",
      time: "10:55am 22nd April",
      logoType: "x",
      tab: "today"
    },
    {
      id: "n-5",
      company: "OptimaFlow Inc.",
      status: "Your application is under review",
      time: "10:55am 22nd April",
      logoType: "spotify",
      tab: "today"
    },
    {
      id: "n-w-1",
      company: "SterlingPath Ltd.",
      status: "Your application has moved to final round",
      time: "11:20am 18th April",
      logoType: "car",
      tab: "week"
    },
    {
      id: "n-w-2",
      company: "CodeSphere Inc.",
      status: "Application received. Verification pending.",
      time: "09:40am 15th April",
      logoType: "spotify",
      tab: "week"
    },
    {
      id: "n-m-1",
      company: "OptimaFlow Inc.",
      status: "Your resume hash has been securely persisted in registry.",
      time: "04:15pm 10th April",
      logoType: "spotify",
      tab: "month"
    }
  ]);

  // Dynamic unified interviews state shared with dashboard / calendar
  const [interviews, setInterviews] = useState<Interview[]>([
    {
      id: "int-1",
      title: "Technical Screen Interview",
      company: "Global Nexus",
      description: "Technical Round 2 layout design system challenge",
      date: "2024-10-15",
      time: "10:30 AM",
      completed: false
    },
    {
      id: "int-2",
      title: "HR Dialogue Discussion",
      company: "MetaCore",
      description: "HR credentials, matching expectation and profile walkthrough",
      date: "2024-10-16",
      time: "2:00 PM",
      completed: false
    },
    {
      id: "int-3",
      title: "Portfolio Onsite Session",
      company: "Figma Inc",
      description: "Case-study presentation of system layouts built recently",
      date: "2024-10-18",
      time: "1:00 PM",
      completed: true
    }
  ]);

  // Prepopulate employer active list so it looks highly complete on first load
  const [customActiveJobs, setCustomActiveJobs] = useState<Job[]>([
    {
      id: "employer-custom-pre-1",
      title: "Senior Product Designer",
      company: "Google",
      logoBg: "bg-red-500 text-white",
      location: "Mountain View, CA",
      type: "Full-time",
      salary: "$180k - $210k",
      description: "Own the visual and navigational components of next-generation workspace layouts with modern design guidelines.",
      postedTime: "Posted 3 days ago",
      category: "design-creative",
      applicants: 12,
      experienceLevel: "Senior"
    },
    {
      id: "employer-custom-pre-2",
      title: "Core Infrastructure Engineer",
      company: "Supabase",
      logoBg: "bg-emerald-950 text-emerald-400",
      location: "Remote, Global",
      type: "Contract",
      salary: "Custom Rate / hr",
      description: "Scale open-source PostgreSQL databases services and optimize real-time synchronizations.",
      postedTime: "Posted 1 day ago",
      category: "developer-software",
      applicants: 4,
      experienceLevel: "Senior"
    }
  ]);

  // Sync with live Express Backend on startup
  useEffect(() => {
    async function loadBackendData() {
      try {
        const backendJobs = await apiService.getJobs();
        if (backendJobs && backendJobs.length > 0) {
          setJobs(backendJobs);
          const employerJobs = backendJobs.filter(j => j.id.startsWith("backend-") || j.id.startsWith("employer-"));
          if (employerJobs.length > 0) {
            setCustomActiveJobs(employerJobs);
          }
        }
      } catch (e) {
        console.warn("Express API offline, falling back to local runtime:", e);
      }

      try {
        const backendApps = await apiService.getApplications();
        if (backendApps && backendApps.length > 0) {
          setApplications(backendApps);
        }
      } catch (e) {
        console.warn("Express API offline, using local application state:", e);
      }
    }
    loadBackendData();
  }, []);

  // Add a new job posted by the employer to both global and custom tracks
  const handleAddNewJob = async (newJob: Job) => {
    try {
      const created = await apiService.createJob(newJob);
      setJobs([created, ...jobs]);
      setCustomActiveJobs([created, ...customActiveJobs]);
    } catch (e) {
      console.error("Could not post job to Express API, saving locally fallback:", e);
      setJobs([newJob, ...jobs]);
      setCustomActiveJobs([newJob, ...customActiveJobs]);
    }
  };

  // Delete a job posted by the employer
  const handleDeleteJob = async (jobId: string) => {
    try {
      await apiService.deleteJob(jobId);
    } catch (e) {
      console.error("Could not delete job on backend:", e);
    }
    setJobs(jobs.filter(j => j.id !== jobId));
    setCustomActiveJobs(customActiveJobs.filter(j => j.id !== jobId));
  };

  // Update an existing job published by the employer
  const handleUpdateJob = async (updatedJob: Job) => {
    try {
      await apiService.updateJob(updatedJob.id, updatedJob);
    } catch (e) {
      console.error("Could not update job on backend:", e);
    }
    setJobs(prev => prev.map(j => j.id === updatedJob.id ? updatedJob : j));
    setCustomActiveJobs(prev => prev.map(j => j.id === updatedJob.id ? updatedJob : j));
    if (selectedJobForDetails && selectedJobForDetails.id === updatedJob.id) {
      setSelectedJobForDetails(updatedJob);
    }
  };

  // Selected Category (default is Developer/Software, which contains 10 jobs in mock, satisfying >8 horizontal scroll on load!)
  const [selectedCategoryId, setSelectedCategoryId] = useState("developer-software");

  // Hero Search keywords
  const [searchTerm, setSearchTerm] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  const [activeSearchTerm, setActiveSearchTerm] = useState("");
  const [activeLocationSearch, setActiveLocationSearch] = useState("");

  // Search trigger callback
  const handleSearchClick = () => {
    setActiveSearchTerm(searchTerm);
    setActiveLocationSearch(locationSearch);
  };

  // Switch categories dynamically (clicking on pills)
  const handleSelectCategory = (catId: string) => {
    setSelectedCategoryId(catId);
    // Reset search parameters to let the user view all items of that category
    setSearchTerm("");
    setLocationSearch("");
    setActiveSearchTerm("");
    setActiveLocationSearch("");
  };

  // Home Screen Apply modal state
  const [homeApplyingJob, setHomeApplyingJob] = useState<Job | null>(null);
  const [homeCandidateName, setHomeCandidateName] = useState("Sarah Hammond");
  const [homeCandidateEmail, setHomeCandidateEmail] = useState("sarah.hammond@design.co");
  const [homeResumeName, setHomeResumeName] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [homeSuccessApply, setHomeSuccessApply] = useState(false);

  const handleHomeApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!homeApplyingJob) return;

    // Increment applicants counter temporarily
    setJobs(jobs.map(j => {
      if (j.id === homeApplyingJob.id) {
        return { ...j, applicants: j.applicants + 1 };
      }
      return j;
    }));

    const appPayload = {
      jobId: homeApplyingJob.id,
      candidateName: homeCandidateName || "Sarah Hammond",
      candidateEmail: homeCandidateEmail || "sarah.hammond@design.co",
      resumeName: homeResumeName || "Sarah_Hammond_CV.pdf"
    };

    // Post to Express backend
    apiService.applyToJob(appPayload)
      .then(newApp => {
        setApplications(prev => [newApp, ...prev]);
      })
      .catch(err => {
        console.warn("Direct DB write failed, fallback optimistic save:", err);
        const newApp: Application = {
          id: "app-" + Date.now(),
          jobId: homeApplyingJob.id,
          candidateName: homeCandidateName || "Sarah Hammond",
          candidateEmail: homeCandidateEmail || "sarah.hammond@design.co",
          resumeName: homeResumeName || "Sarah_Hammond_CV.pdf",
          appliedAt: new Date().toISOString().split('T')[0],
          status: "Submitted"
        };
        setApplications(prev => [newApp, ...prev]);
      });

    // Push dynamic notification alert
    const newNotification: DashboardNotification = {
      id: "n-" + Date.now(),
      company: homeApplyingJob.company,
      status: `Your application setup for "${homeApplyingJob.title}" has been successfully received`,
      time: "Just now",
      logoType: "car",
      tab: "today"
    };
    setNotifications([newNotification, ...notifications]);

    setHomeSuccessApply(true);
    setTimeout(() => {
      setHomeSuccessApply(false);
      setHomeApplyingJob(null);
      setHomeResumeName("");
    }, 2500);
  };

  const handleJobDetailApplySubmit = (jobToApply: Job, cvFileName: string) => {
    setJobs(jobs.map(j => {
      if (j.id === jobToApply.id) {
        return { ...j, applicants: j.applicants + 1 };
      }
      return j;
    }));

    const appPayload = {
      jobId: jobToApply.id,
      candidateName: profile.name || "Daniel Adeyemi",
      candidateEmail: profile.email || "daniel.adeyemi.dev@gmail.com",
      resumeName: cvFileName || "Daniel_Adeyemi_CV.pdf"
    };

    // Post to Express backend
    apiService.applyToJob(appPayload)
      .then(newApp => {
        setApplications(prev => [newApp, ...prev]);
      })
      .catch(err => {
        console.warn("Direct DB write failed, fallback optimistic save:", err);
        const newApp: Application = {
          id: "app-" + Date.now(),
          jobId: jobToApply.id,
          candidateName: profile.name || "Daniel Adeyemi",
          candidateEmail: profile.email || "daniel.adeyemi.dev@gmail.com",
          resumeName: cvFileName || "Daniel_Adeyemi_CV.pdf",
          appliedAt: new Date().toISOString().split('T')[0],
          status: "Submitted"
        };
        setApplications(prev => [newApp, ...prev]);
      });

    const newNotification: DashboardNotification = {
      id: "n-" + Date.now(),
      company: jobToApply.company,
      status: `Application submitted for "${jobToApply.title}" (Reviewing)`,
      time: "Just now",
      logoType: "car",
      tab: "today"
    };
    setNotifications([newNotification, ...notifications]);

    triggerToast(`Successfully applied to ${jobToApply.title} at ${jobToApply.company}!`);
  };

  // Apply inputs and filters
  const filteredSuggestedJobs = jobs.filter((job) => {
    // Category check
    const matchesCategory = job.category === selectedCategoryId;
    
    // Search keyword check (supports both real-time typing and submitted terms)
    const currentKeyword = searchTerm || activeSearchTerm;
    const matchesKeyword = !currentKeyword || 
      job.title.toLowerCase().includes(currentKeyword.toLowerCase()) || 
      job.company.toLowerCase().includes(currentKeyword.toLowerCase()) ||
      job.description.toLowerCase().includes(currentKeyword.toLowerCase());

    // Location search check
    const currentLoc = locationSearch || activeLocationSearch;
    const matchesLocation = !currentLoc || 
      job.location.toLowerCase().includes(currentLoc.toLowerCase());

    return matchesCategory && matchesKeyword && matchesLocation;
  });

  return (
    <div className="bg-[#f4f5f7] min-h-screen font-sans antialiased text-gray-900 selection:bg-indigo-100">
      
      {/* Navigation Header */}
      <Header 
        currentView={currentView} 
        onNavigate={handleNavigate} 
        isLoggedIn={isLoggedIn}
        onLogOut={() => {
          setIsLoggedIn(false);
          setCurrentView("home");
        }}
        profileName={profile.name}
        profileRole={profile.name === "Daniel Adeyemi" ? "Freelancer" : "Product Designer"}
        isPhotoUploaded={isPhotoUploaded}
      />

      <AnimatePresence mode="wait">
        {currentView === "home" && (
          <motion.div
            key="home-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Dark Sleek Hero Section */}
            <Hero 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              locationSearch={locationSearch}
              setLocationSearch={setLocationSearch}
              onSearchClick={handleSearchClick}
            />

            {/* Split cards navigating to Categories and Newsletter */}
            <DoubleBanners onNavigate={handleNavigate} />

            {/* Choose Your Category Grid */}
            <Categories 
              selectedCategoryId={selectedCategoryId}
              onSelectCategory={handleSelectCategory}
            />

            {/* In Partnership With slanted board */}
            <Partners />

            {/* Jobs list: horizontal carousel scrolling if item count > 8, grid if <= 8 */}
            <JobsHorizontalScroll 
              jobs={filteredSuggestedJobs}
              selectedCategoryId={selectedCategoryId}
              onApplyClick={(job) => {
                if (!isLoggedIn) {
                  setPendingApplyJob(job);
                  setPendingApplyView("job-details");
                  setCurrentView("login");
                } else {
                  setSelectedJobForDetails(job);
                  setCurrentView("job-details");
                }
              }}
            />

            {/* Custom styled newsletter callout */}
            <Newsletter />
          </motion.div>
        )}

        {currentView === "dashboard" && (
          <motion.div
            key="dashboard-screen"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
          >
            <DashboardPortal 
              notifications={notifications}
              setNotifications={setNotifications}
              interviews={interviews}
              setInterviews={setInterviews}
              onNavigateToProfile={() => setCurrentView("profile")}
              profileCompletePercent={
                45 
                + (isPhotoUploaded ? 5 : 0)
                + (isAboutMeCompleted ? 30 : 0)
                + (isCvUploaded ? 20 : 0)
              }
              onSelectJob={(job) => {
                setSelectedJobForDetails(job);
                setCurrentView("job-details");
              }}
              onNavigateToNotifications={() => setCurrentView("notifications")}
            />
          </motion.div>
        )}

        {currentView === "profile" && (
          <motion.div
            key="profile-screen"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
          >
            <ProfilePage
              onBackToHome={() => setCurrentView("dashboard")}
              profile={profile}
              setProfile={setProfile}
              isPhotoUploaded={isPhotoUploaded}
              setIsPhotoUploaded={setIsPhotoUploaded}
              isCvUploaded={isCvUploaded}
              setIsCvUploaded={setIsCvUploaded}
              isAboutMeCompleted={isAboutMeCompleted}
              setIsAboutMeCompleted={setIsAboutMeCompleted}
              toast={triggerToast}
            />
          </motion.div>
        )}

        {currentView === "employer" && (
          <motion.div
            key="employer-screen"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="w-full"
          >
            <EmployerPortal
              jobs={jobs}
              onAddNewJob={handleAddNewJob}
              onDeleteJob={handleDeleteJob}
              onUpdateJob={handleUpdateJob}
              applications={applications}
              setApplications={setApplications}
              notifications={notifications}
              setNotifications={setNotifications}
              interviews={interviews}
              setInterviews={setInterviews}
              onNavigate={setCurrentView}
              onLogOutEmployer={() => {
                setCurrentView("home");
              }}
            />
          </motion.div>
        )}

        {currentView === "job-details" && (
          <motion.div
            key="job-details-screen"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
          >
            <JobDetailPage 
              job={selectedJobForDetails}
              onBack={() => {
                if (isLoggedIn) {
                  setCurrentView("dashboard");
                } else {
                  setCurrentView("home");
                }
              }}
              onNavigateToView={setCurrentView}
              applications={applications}
              onApplySubmit={handleJobDetailApplySubmit}
            />
          </motion.div>
        )}

        {currentView === "notifications" && (
          <motion.div
            key="notifications-screen"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
          >
            <NotificationsPage 
              onBack={() => {
                if (isLoggedIn) {
                  setCurrentView("dashboard");
                } else {
                  setCurrentView("home");
                }
              }}
              onNavigateToView={setCurrentView}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Home applying modal popup */}
      <AnimatePresence>
        {homeApplyingJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setHomeApplyingJob(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-md w-full relative z-10 p-6 md:p-8"
            >
              <button
                onClick={() => setHomeApplyingJob(null)}
                className="absolute top-5 right-5 text-gray-400 hover:text-gray-950 p-1 bg-gray-100 rounded-full cursor-pointer transition-colors border-0"
                id="btn-close-home-modal"
              >
                <X className="w-4 h-4" />
              </button>

              {homeSuccessApply ? (
                <div className="py-6 flex flex-col items-center justify-center animate-fade-in text-center">
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-5 animate-bounce">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-black text-[#212230] tracking-tight">Application Transmitted!</h3>
                  <p className="text-xs text-gray-400 mt-2 leading-relaxed px-2">
                    Your resume has been successfully sent to <strong className="text-gray-900">{homeApplyingJob.company}</strong>. You can monitor your application timeline inside the <strong>Dashboard Portal</strong>.
                  </p>
                </div>
              ) : (
                <div className="py-2 text-center sm:text-left">
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-black text-[#212230] tracking-tight">
                      Join the team at {homeApplyingJob.company}
                    </h3>
                    <p className="text-xs text-gray-400 font-semibold">
                      Applying for position: <span className="text-[#212230] font-bold">{homeApplyingJob.title}</span> ({homeApplyingJob.location})
                    </p>
                  </div>

                  <form onSubmit={handleHomeApplySubmit} className="space-y-4 text-left">
                    <div>
                      <label className="text-[10px] text-gray-400 uppercase tracking-widest font-extrabold block mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={homeCandidateName}
                        onChange={(e) => setHomeCandidateName(e.target.value)}
                        placeholder="e.g. Sarah Hammond"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-[#212230] focus:bg-white rounded-xl text-xs font-semibold focus:outline-none placeholder-gray-400 text-gray-800 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-gray-400 uppercase tracking-widest font-extrabold block mb-1">Email address</label>
                      <input
                        type="email"
                        required
                        value={homeCandidateEmail}
                        onChange={(e) => setHomeCandidateEmail(e.target.value)}
                        placeholder="e.g. sarah.hammond@design.co"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-[#212230] focus:bg-white rounded-xl text-xs font-semibold focus:outline-none placeholder-gray-400 text-gray-800 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-gray-400 uppercase tracking-widest font-extrabold block mb-1">Resume / CV (Drag & Drop or click)</label>
                      
                      <div
                        onDragOver={(e) => {
                          e.preventDefault();
                          setIsDragging(true);
                        }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={(e) => {
                          e.preventDefault();
                          setIsDragging(false);
                          if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                            setHomeResumeName(e.dataTransfer.files[0].name);
                          }
                        }}
                        className={`relative rounded-2xl border-2 border-dashed p-6 text-center transition-all cursor-pointer ${
                          isDragging ? "border-[#212230] bg-gray-50 scale-[1.01]" : "border-gray-200 hover:border-gray-300 bg-white"
                        }`}
                      >
                        <input
                          type="file"
                          id="apply-modal-file-picker"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              setHomeResumeName(e.target.files[0].name);
                            }
                          }}
                        />
                        <label htmlFor="apply-modal-file-picker" className="cursor-pointer block">
                          {homeResumeName ? (
                            <div className="flex flex-col items-center justify-center py-2 animate-fade-in">
                              <CheckCircle className="w-8 h-8 text-emerald-500 mb-2" />
                              <p className="text-xs font-bold text-gray-800 break-all">{homeResumeName}</p>
                              <p className="text-[9px] text-gray-400 mt-1 uppercase tracking-widest font-mono">Click to change resume file</p>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center py-2">
                              <Upload className="w-8 h-8 text-gray-400 mb-2 animate-pulse" />
                              <p className="text-xs font-bold text-gray-750">Drag and drop CV here, or browse files</p>
                              <p className="text-[9px] text-gray-400 mt-1 uppercase tracking-widest font-mono">DOCX, PDF (MAX. 5MB)</p>
                            </div>
                          )}
                        </label>
                      </div>
                    </div>

                    <div className="pt-2 flex gap-3">
                      <button
                        type="button"
                        onClick={() => setHomeApplyingJob(null)}
                        className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl transition-all cursor-pointer border-0"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-3 px-4 bg-[#212230] hover:bg-indigo-600 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-1 border-0"
                      >
                        Submit Application
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>


      {/* Floating feedback alert */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            key="toast-popup"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 bg-[#212230] text-white p-4.5 px-6 rounded-2xl shadow-2xl border border-gray-800 flex items-center gap-3"
          >
            <div className="w-5 h-5 bg-emerald-500 rounded-lg flex items-center justify-center text-white shrink-0">
               <CheckCircle className="w-3.5 h-3.5 stroke-[3.5]" />
            </div>
            <span className="text-xs font-bold leading-normal tracking-tight">{toastMessage}</span>
            <button 
              onClick={() => setToastMessage(null)}
              className="ml-3 text-[10px] font-bold text-gray-400 hover:text-white uppercase transition-colors border-0 bg-transparent p-0 cursor-pointer"
            >
              dismiss
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backend Team API Integration Console */}
      <BackendSandbox />

    </div>
  );
}
