'use client'
import { useState } from "react";
import { Job, Application, DashboardNotification, Interview } from "@/src/types";
import { CATEGORIES } from "@/src/jobData";
import { 
  Briefcase, 
  MapPin, 
  Plus, 
  Trash2, 
  CheckCircle, 
  Clock, 
  User, 
  Mail, 
  ShieldCheck, 
  ChevronRight, 
  TrendingUp, 
  Sparkles, 
  Search, 
  SlidersHorizontal,
  X,
  FileText,
  Building,
  BellRing
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface EmployerPortalProps {
  jobs: Job[];
  onAddNewJob: (newJob: Job) => void;
  onDeleteJob: (jobId: string) => void;
  onUpdateJob?: (job: Job) => void;
  onLogOutEmployer?: () => void;
  applications: Application[];
  setApplications: React.Dispatch<React.SetStateAction<Application[]>>;
  notifications: DashboardNotification[];
  setNotifications: React.Dispatch<React.SetStateAction<DashboardNotification[]>>;
  interviews?: Interview[];
  setInterviews?: React.Dispatch<React.SetStateAction<Interview[]>>;
  onNavigate: (view: "home" | "dashboard" | "employer") => void;
}

export default function EmployerPortal({
  jobs,
  onAddNewJob,
  onDeleteJob,
  onUpdateJob,
  onLogOutEmployer,
  applications,
  setApplications,
  notifications,
  setNotifications,
  interviews,
  setInterviews,
  onNavigate
}: EmployerPortalProps) {
  
  // Local state for the creation modal
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);

  const [newTitle, setNewTitle] = useState("");
  const [newCompany, setNewCompany] = useState("");
  const [newSalary, setNewSalary] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newType, setNewType] = useState("Full-time");
  const [newExp, setNewExp] = useState("Mid");
  const [newCategory, setNewCategory] = useState("developer-software");
  const [newDescription, setNewDescription] = useState("");
  
  // Feedback Messages
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  // Table / Grid Filters
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJobIdFilter, setSelectedJobIdFilter] = useState("all");

  const triggerLocalToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleStartEditJob = (job: Job) => {
    setEditingJob(job);
    setNewTitle(job.title);
    setNewCompany(job.company);
    setNewSalary(job.salary);
    setNewLocation(job.location);
    setNewType(job.type);
    setNewExp(job.experienceLevel);
    setNewCategory(job.category);
    setNewDescription(job.description || "");
    setIsCreateModalOpen(true);
  };

  const handleCreateJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newCompany || !newSalary || !newLocation || !newDescription) {
      triggerLocalToast("Please populate all required fields.");
      return;
    }

    if (editingJob) {
      const updatedJob: Job = {
        ...editingJob,
        title: newTitle,
        company: newCompany,
        location: newLocation,
        type: newType,
        salary: newSalary,
        description: newDescription,
        category: newCategory,
        experienceLevel: newExp
      };
      if (onUpdateJob) {
        onUpdateJob(updatedJob);
      }
      triggerLocalToast(`Successfully updated vacancy "${newTitle}"!`);
    } else {
      const newJob: Job = {
        id: `employer-custom-${Date.now()}`,
        title: newTitle,
        company: newCompany,
        logoBg: getRandomLogoBg(),
        location: newLocation,
        type: newType,
        salary: newSalary,
        description: newDescription,
        postedTime: "Posted just now",
        category: newCategory,
        applicants: 0,
        experienceLevel: newExp
      };

      onAddNewJob(newJob);
      triggerLocalToast(`Successfully posted vacancy "${newTitle}"!`);
    }
    
    // Close & reset
    setIsCreateModalOpen(false);
    setEditingJob(null);
    setNewTitle("");
    setNewCompany("");
    setNewSalary("");
    setNewLocation("");
    setNewDescription("");
  };

  const getRandomLogoBg = () => {
    const list = [
      "bg-emerald-950 text-emerald-400",
      "bg-slate-900 text-slate-100",
      "bg-indigo-950 text-indigo-300",
      "bg-blue-600 text-white",
      "bg-pink-600 text-white",
      "bg-orange-600 text-white",
      "bg-purple-900 text-purple-200"
    ];
    return list[Math.floor(Math.random() * list.length)];
  };

  const handleUpdateStatus = (appId: string, nextStatus: string) => {
    // 1. Find the application & the associated job info
    const targetApp = applications.find(a => a.id === appId);
    if (!targetApp) return;

    const associatedJob = jobs.find(j => j.id === targetApp.jobId);
    const companyName = associatedJob ? associatedJob.company : "Employer";
    const jobTitle = associatedJob ? associatedJob.title : "Role";

    // 2. Update status in DB
    setApplications(prev => prev.map(app => {
      if (app.id === appId) {
        return { ...app, status: nextStatus };
      }
      return app;
    }));

    // 3. Dispatch Notification to Owner
    const isAlex = targetApp.candidateName.toLowerCase().includes("alex");
    
    // Set icon type for notification based on company
    let logoType = "spotify";
    if (companyName.toLowerCase().includes("vercel") || companyName.toLowerCase().includes("google")) {
      logoType = "x";
    } else if (companyName.toLowerCase().includes("supabase") || companyName.toLowerCase().includes("stella")) {
      logoType = "car";
    }

    const newNotif: DashboardNotification = {
      id: `notif-${Date.now()}`,
      company: companyName,
      status: `Your application to ${jobTitle} was updated to [${nextStatus}]`,
      time: "Just now",
      logoType: logoType,
      tab: "today"
    };

    setNotifications(prev => [newNotif, ...prev]);

    // 4. Automatically create calendar schedule entry if moving to "Interview Scheduled"
    if (nextStatus === "Interview Scheduled" && setInterviews) {
      const nextIntId = `int-app-${appId}`;
      setInterviews(prev => {
        if (prev.some(i => i.id === nextIntId)) return prev;
        const newInt: Interview = {
          id: nextIntId,
          title: `Interview: ${jobTitle}`,
          company: companyName,
          description: `Strategic status update progression with enterprise team. Candidate: ${targetApp.candidateName}.`,
          date: "2024-10-22", // Autumn mock tracker matching portal view
          time: "11:00 AM",
          completed: false
        };
        return [newInt, ...prev];
      });
    }

    // Present success UI Feedback
    triggerLocalToast(`Status updated to "${nextStatus}". System notification sent to ${targetApp.candidateName}!`);
  };

  // Filtered Applications for the workspace grid
  const filteredApplications = applications.filter(app => {
    const assocJob = jobs.find(j => j.id === app.jobId);
    
    // Job filter
    const matchesJob = selectedJobIdFilter === "all" || app.jobId === selectedJobIdFilter;
    
    // Status filter
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    
    // Search query matches candidate or job title
    const candName = app.candidateName.toLowerCase();
    const candEmail = app.candidateEmail.toLowerCase();
    const roleTitle = assocJob ? assocJob.title.toLowerCase() : "";
    const term = searchQuery.toLowerCase();
    const matchesSearch = candName.includes(term) || candEmail.includes(term) || roleTitle.includes(term);

    return matchesJob && matchesStatus && matchesSearch;
  });

  return (
    <div className="bg-[#f4f5f7] min-h-screen pb-16">
      
      {/* Toast Feedback Banner */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#21222D] text-white text-xs font-bold font-mono px-5 py-3 rounded-full shadow-2xl flex items-center gap-2 border border-gray-700/30"
          >
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-ping" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Styled Top Dark Hero Banner - Matching jobnest branding */}
      <div className="bg-[#21222D] text-white py-12 px-6 shadow-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 bg-gray-700 text-gray-200 text-[9.5px] font-mono font-black rounded-sm uppercase tracking-widest">
                Employer Space
              </span>
              <span className="text-gray-500 font-mono text-[10px]">• SECURED ACCESS HUB</span>
            </div>
            
            <h1 className="text-3xl font-extrabold font-sans tracking-tight">
              Enterprise Talent Workspace
            </h1>
            
            <p className="text-gray-400 text-xs mt-2 max-w-2xl leading-relaxed">
              {"Define state-of-the-art job descriptions, monitor received applications, and progress candidates. Updating their status immediately pushes dynamic timeline alerts into job seekers' personal portfolios."}
            </p>
          </div>

          {/* Real-time stats widgets */}
          <div className="flex flex-wrap gap-4 self-start lg:self-center">
            <div className="px-5 py-3 rounded-2xl bg-[#272935] flex flex-col justify-center min-w-[110px]">
              <span className="text-[9px] uppercase font-mono font-bold text-gray-400 tracking-wider">Active Listings</span>
              <span className="text-2xl font-black text-gray-200 mt-1">{jobs.length}</span>
            </div>
            <div className="px-5 py-3 rounded-2xl bg-[#272935] flex flex-col justify-center min-w-[110px]">
              <span className="text-[9px] uppercase font-mono font-bold text-gray-400 tracking-wider">Applications</span>
              <span className="text-2xl font-black text-gray-200 mt-1">{applications.length}</span>
            </div>
            <button
              onClick={() => {
                setEditingJob(null);
                setNewTitle("");
                setNewCompany("");
                setNewSalary("");
                setNewLocation("");
                setNewDescription("");
                setIsCreateModalOpen(true);
              }}
              className="py-3 px-5 bg-[#212230] hover:bg-gray-805 text-white text-xs font-black rounded-2xl shadow-lg flex items-center gap-2 cursor-pointer transition-all active:scale-95 border border-gray-700 self-center"
              id="btn-post-job-trigger"
            >
              <Plus className="w-4 h-4 text-white" />
              Publish New Vacancy
            </button>

            {onLogOutEmployer && (
              <button
                onClick={onLogOutEmployer}
                className="py-3 px-5 bg-rose-950/30 hover:bg-rose-900/60 text-rose-200 text-xs font-black rounded-2xl shadow-lg flex items-center gap-1.5 cursor-pointer transition-all active:scale-95 border border-rose-900/40 self-center"
                id="btn-logout-employer"
              >
                Exit Workspace
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 mt-8">
        
        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT SIDEBAR: Active vacancies grid with delete control - Similar to Category board */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
                <h3 className="text-sm font-bold text-[#21222D] flex items-center gap-2">
                  <Building className="w-4 h-4 text-gray-400" />
                  Your Active Vacancies
                </h3>
                <span className="bg-gray-100 text-gray-500 font-mono text-[9px] font-black px-2 py-0.5 rounded-full">
                  {jobs.length} total
                </span>
              </div>

              {/* Vacancies scroll list */}
              <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
                {jobs.map((job) => {
                  const jobAppsCount = applications.filter(a => a.jobId === job.id).length;
                  return (
                    <div 
                      key={job.id} 
                      className={`p-3.5 rounded-2xl transition-all ${
                        selectedJobIdFilter === job.id 
                          ? "bg-[#21222D]/5 shadow-xs" 
                          : "bg-gray-50 hover:bg-white"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <button 
                          onClick={() => setSelectedJobIdFilter(selectedJobIdFilter === job.id ? "all" : job.id)}
                          className="flex-1 text-left cursor-pointer border-0 bg-transparent p-0"
                        >
                          <h4 className="text-xs font-extrabold text-[#21222D] leading-snug line-clamp-1">
                            {job.title}
                          </h4>
                          <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-medium mt-1">
                            <span className="font-extrabold text-[#21222D]">{job.company}</span>
                            <span>•</span>
                            <span>{job.location}</span>
                          </div>
                        </button>

                        <div className="flex items-center gap-1 shrink-0">
                          {/* Edit trigger */}
                          <button
                            onClick={() => handleStartEditJob(job)}
                            className="p-1.5 text-gray-400 hover:text-indigo-650 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer border-0 bg-transparent flex items-center justify-center animate-fade-in"
                            title="Edit active vacancy description"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                          </button>

                          {/* Delete trigger */}
                          <button
                            onClick={() => {
                              if (confirm(`Are you absolutely sure you want to shut down and archive "${job.title}"?`)) {
                                onDeleteJob(job.id);
                                if (selectedJobIdFilter === job.id) setSelectedJobIdFilter("all");
                                triggerLocalToast(`Removed vacancy code ${job.id}`);
                              }
                            }}
                            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer border-0 bg-transparent flex items-center justify-center"
                            title="Archive & close opening"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      
                      {/* Apps counter indicator */}
                      <div className="mt-2.5 pt-2 border-t border-dashed border-gray-200 flex justify-between items-center text-[9px]">
                        <span className="text-gray-400 font-mono tracking-wider uppercase font-bold">
                          {job.experienceLevel} • {job.type}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full font-bold font-mono ${
                          jobAppsCount > 0 ? "bg-gray-250 text-gray-800" : "bg-gray-150 text-gray-450"
                        }`}>
                          {jobAppsCount} {jobAppsCount === 1 ? "applicant" : "applicants"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT MAIN CONTENT PANEL: Dynamic application cards and advanced filtering */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Filter and Search Bar header */}
            <div className="bg-white p-5 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <input 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search candidate names, emails, roles..."
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 hover:bg-gray-100/50 border-0 focus:bg-white focus:ring-2 focus:ring-[#21222D]/10 rounded-2xl text-xs font-semibold focus:outline-none"
                  />
                </div>
              </div>

              {/* Dropdowns */}
              <div className="flex flex-wrap items-center gap-2">
                
                {/* Vacancy selector if all filter */}
                <div>
                  <select
                    value={selectedJobIdFilter}
                    onChange={(e) => setSelectedJobIdFilter(e.target.value)}
                    className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-[11px] font-bold text-gray-650 focus:outline-none focus:ring-2 focus:ring-[#21222D]/10 text-ellipsis max-w-[150px]"
                  >
                    <option value="all">Listings: All</option>
                    {jobs.map(j => (
                      <option key={j.id} value={j.id}>{j.company} - {j.title}</option>
                    ))}
                  </select>
                </div>

                {/* Status selector */}
                <div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-[11px] font-bold text-gray-650 focus:outline-none focus:ring-3 focus:ring-[#21222D]/10"
                  >
                    <option value="all">Status: All</option>
                    <option value="Submitted">Submitted</option>
                    <option value="Reviewing">Reviewing</option>
                    <option value="Interview Scheduled">Interview Scheduled</option>
                    <option value="Offered">Offer Made</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                {/* Clear triggers */}
                {(statusFilter !== "all" || searchQuery !== "" || selectedJobIdFilter !== "all") && (
                  <button
                    onClick={() => {
                      setStatusFilter("all");
                      setSearchQuery("");
                      setSelectedJobIdFilter("all");
                    }}
                    className="p-2 bg-gray-100 hover:bg-gray-250 text-[#21222D] rounded-xl text-[10px] font-black cursor-pointer border-0"
                    title="Clear filters"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>

            {/* List header title */}
            <div className="flex items-center justify-between pl-1">
              <div>
                <h2 className="text-sm font-bold text-[#21222D] tracking-wide uppercase font-mono">
                  Incoming Job Applications ({filteredApplications.length})
                </h2>
                {selectedJobIdFilter !== "all" && (
                  <p className="text-[10px] text-gray-400 mt-0.5">
                    Filtering and showing applicants for: <span className="font-bold text-[#21222D]">{jobs.find(j => j.id === selectedJobIdFilter)?.title}</span>
                  </p>
                )}
              </div>
              <span className="text-[10px] font-medium text-gray-400 font-mono">
                Reactive Status Mode
              </span>
            </div>

            {/* Application Cards List */}
            {filteredApplications.length === 0 ? (
              <div className="bg-white rounded-3xl p-16 text-center shadow-xs">
                <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-gray-800 font-bold mb-1">No applicants detected</h3>
                <p className="text-gray-400 text-xs max-w-sm mx-auto leading-normal">
                  Try adjusting search words or filter statuses to view other entries, or submit a mock candidate application first.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredApplications.map((app) => {
                  const associatedJob = jobs.find(j => j.id === app.jobId);
                  const isAlex = app.candidateName.toLowerCase().includes("alex");
                  
                  return (
                    <motion.div 
                      key={app.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white p-5 rounded-3xl hover:shadow-xs transition-all relative overflow-hidden"
                    >
                      {/* Highlight if candidate Alex Mercer */}
                      {isAlex && (
                        <div className="absolute top-0 left-0 right-0 h-1 bg-[#21222D]" />
                      )}

                      {/* Header row */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 pb-4 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-100 text-[#21222D] border border-gray-200 flex items-center justify-center font-bold font-sans text-xs shadow-xs relative">
                            {app.candidateName.split(" ").map(n => n[0]).join("")}
                            {isAlex && (
                              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-gray-500 text-white rounded-full flex items-center justify-center font-bold text-[9px] border-2 border-white">★</span>
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <h4 className="text-xs font-black text-gray-900">{app.candidateName}</h4>
                              {isAlex && (
                                <span className="bg-gray-200 text-[#21222D] text-[8px] font-extrabold px-1.5 rounded-full font-mono uppercase">
                                  Owner Account
                                </span>
                              )}
                            </div>
                            <p className="text-[10px] text-gray-550 flex items-center gap-1.5 font-medium mt-0.5">
                              <span className="text-gray-400">{app.candidateEmail}</span>
                              <span>•</span>
                              <span className="text-gray-400 font-mono">Applied {app.appliedAt}</span>
                            </p>
                          </div>
                        </div>

                        {/* Associated Job Widget */}
                        <div className="self-start sm:self-auto text-left sm:text-right">
                          <span className="text-[9px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                            {associatedJob ? associatedJob.company : "External"}
                          </span>
                          <h5 className="text-xs font-bold text-[#21222D] mt-1">{associatedJob ? associatedJob.title : "Unknown Role"}</h5>
                        </div>
                      </div>

                      {/* Info & Update actions row */}
                      <div className="pt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        
                        {/* Attached resume files and rates */}
                        <div className="flex flex-wrap items-center gap-4 text-xs">
                          {app.resumeName && (
                            <button
                              onClick={() => alert(`Reviewing candidate resume document: "${app.resumeName}"`)}
                              className="inline-flex items-center gap-1.5 text-[#21222D] hover:text-gray-700 font-extrabold text-[11px] cursor-pointer border-0 bg-transparent"
                            >
                              <FileText className="w-3.5 h-3.5 text-[#21222D]" />
                              {app.resumeName}
                            </button>
                          )}
                          <span className="text-[10px] text-gray-400 font-mono font-medium">
                            Expected package: <span className="font-black text-[#21222D]">{associatedJob?.salary || "$110k - $140k"}</span>
                          </span>
                        </div>

                        {/* Status Update Dropdown Actions */}
                        <div className="flex items-center gap-2">
                          <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block font-mono">Status:</label>
                          <select
                            value={app.status || "Submitted"}
                            onChange={(e) => handleUpdateStatus(app.id, e.target.value)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-black focus:outline-none focus:ring-2 cursor-pointer border ${
                              app.status === "Submitted"
                                ? "bg-amber-550 text-amber-900 border-amber-300 focus:ring-amber-200"
                                : app.status === "Reviewing"
                                ? "bg-indigo-50 text-indigo-800 border-indigo-200 focus:ring-indigo-150"
                                : app.status === "Interview Scheduled"
                                ? "bg-gray-100 text-gray-800 border-gray-200 focus:ring-gray-150"
                                : app.status === "Offered"
                                ? "bg-gray-200 text-gray-900 border-gray-300 focus:ring-gray-250"
                                : "bg-red-50 text-red-800 border-red-150 focus:ring-red-100"
                            }`}
                          >
                            <option value="Submitted">Submitted</option>
                            <option value="Reviewing">Reviewing</option>
                            <option value="Interview Scheduled">Interview Scheduled</option>
                            <option value="Offered">Offer Made</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                        </div>

                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Styled Popup Modal: Post New Job Vacancy */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCreateModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Card contents */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-lg w-full relative z-10 p-6 md:p-8"
            >
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="absolute top-5 right-5 text-gray-400 hover:text-gray-900 p-1 bg-gray-100 rounded-full cursor-pointer transition-colors"
                id="btn-close-post-job-modal"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="mb-4">
                <span className="text-[10px] bg-indigo-50 text-indigo-700 font-bold uppercase tracking-wider px-2 py-0.5 rounded-full font-mono">
                  {editingJob ? "Workspace Revision" : "Publish Suite"}
                </span>
                <h3 className="text-xl font-black text-gray-950 mt-2">
                  {editingJob ? "Modify Active Job Position" : "Publish New Job vacancy"}
                </h3>
                <p className="text-xs text-gray-500 mt-1 leading-snug">
                  {editingJob 
                    ? "Update position details, requirements, budget, and description below." 
                    : "Describe details here to make this opportunity active in our search matrix databases."}
                </p>
              </div>

              <form onSubmit={handleCreateJobSubmit} className="space-y-4">
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-500 font-bold block mb-1">Position Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Senior Frontend Dev"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full bg-slate-50 border border-gray-250 p-2 text-xs rounded-xl focus:ring-2 focus:ring-[#21222D]/10 focus:outline-none focus:bg-white font-semibold text-[#21222D]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 font-bold block mb-1">Company Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vercel"
                      value={newCompany}
                      onChange={(e) => setNewCompany(e.target.value)}
                      className="w-full bg-slate-50 border border-gray-250 p-2 text-xs rounded-xl focus:ring-2 focus:ring-[#21222D]/10 focus:outline-none focus:bg-white font-semibold text-[#21222D]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-500 font-bold block mb-1">Salary Budget *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. $130k - $160k"
                      value={newSalary}
                      onChange={(e) => setNewSalary(e.target.value)}
                      className="w-full bg-slate-50 border border-gray-250 p-2 text-xs rounded-xl focus:ring-2 focus:ring-[#21222D]/10 focus:outline-none focus:bg-white font-mono font-semibold"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 font-bold block mb-1">Location Details *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Remote / New York"
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                      className="w-full bg-slate-50 border border-gray-250 p-2 text-xs rounded-xl focus:ring-2 focus:ring-[#21222D]/10 focus:outline-none focus:bg-white font-semibold text-[#21222D]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-xs text-gray-500 font-bold block mb-1">Locality</label>
                    <select
                      value={newType}
                      onChange={(e) => setNewType(e.target.value)}
                      className="w-full bg-slate-50 border border-gray-250 p-2 text-[11px] rounded-xl focus:ring-2 focus:ring-[#21222D]/10 focus:outline-none font-semibold text-gray-750"
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Remote">Remote</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 font-bold block mb-1">Experience</label>
                    <select
                      value={newExp}
                      onChange={(e) => setNewExp(e.target.value)}
                      className="w-full bg-slate-50 border border-gray-250 p-2 text-[11px] rounded-xl focus:ring-2 focus:ring-[#21222D]/10 focus:outline-none font-semibold text-gray-750"
                    >
                      <option value="Junior">Junior</option>
                      <option value="Mid">Mid Level</option>
                      <option value="Senior">Senior Lead</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 font-bold block mb-1">Category</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full bg-slate-50 border border-gray-250 p-2 text-[11px] rounded-xl focus:ring-2 focus:ring-[#21222D]/10 focus:outline-none font-semibold text-gray-750 text-ellipsis overflow-hidden whitespace-nowrap"
                    >
                      {CATEGORIES.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-gray-500 font-bold block mb-1">Role Description *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Provide description outline, candidate prerequisites, and team attributes..."
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="w-full bg-slate-50 border border-gray-250 p-2 text-xs rounded-xl focus:ring-2 focus:ring-[#21222D]/10 focus:outline-none focus:bg-white text-gray-800 text-left"
                  />
                </div>

                <div className="flex gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsCreateModalOpen(false)}
                    className="flex-1 py-2.5 bg-gray-150 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl cursor-pointer border-0"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-[#21222D] hover:bg-gray-800 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer border-0 transition-colors"
                  >
                    {editingJob ? "Save & Update Position" : "Publish position"}
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
