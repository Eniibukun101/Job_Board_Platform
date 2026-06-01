'use client'
import { useState } from "react";
import { Job, Application } from "@/src/types";
import { 
  MapPin, 
  Briefcase, 
  Clock, 
  DollarSign, 
  Edit, 
  Save, 
  Plus, 
  ArrowLeft, 
  CheckCircle2, 
  FileText, 
  ExternalLink,
  ChevronRight
} from "lucide-react";

interface JobDetailPageProps {
  job: Job | null;
  onBack: () => void;
  onNavigateToView: (view: "home" | "dashboard" | "employer" | "profile") => void;
  applications: Application[];
  onApplySubmit: (job: Job, resumeName: string) => void;
}

export default function JobDetailPage({
  job,
  onBack,
  onNavigateToView,
  applications,
  onApplySubmit
}: JobDetailPageProps) {
  // Hardcoded or dynamic values matching the LagosJobLink / Software Engineer from the screenshot
  const defaultJobTitle = job?.title || "Software Engineer, Senior";
  const defaultLocation = job?.location || "New york";
  const defaultDepartment = job?.category === "design-creative" ? "Design" : "Engineering";
  const defaultType = job?.type || "Remote";
  const defaultSalary = job?.salary || "$5,500";

  // Editable fields to satisfy "Edit the company job Discribtion"
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(
    "Join our innovative Lagos-based tech company revolutionizing local job matching through our sleek glassmorphism platform. As a Software Engineer, you'll build scalable features for job seekers and employers, ensuring seamless performance across mobile and desktop while contributing to our urban-themed UI/UX."
  );

  const [responsibilities, setResponsibilities] = useState([
    "Develop responsive front-end components using React.js and Tailwind CSS to match our skyscraper glass aesthetic.",
    "Build secure backend APIs with Node.js/Express for job listings, user dashboards, and application tracking.",
    "Integrate real-time notifications and qualification matching algorithms.",
    "Optimize database queries (PostgreSQL/MongoDB) for fast job searches in high-traffic Lagos market.",
    "Collaborate with designers to implement qualification lists, single job pages, and dashboards."
  ]);

  const [newResp, setNewResp] = useState("");

  const [requirements, setRequirements] = useState([
    "Knowledge of Excel, SQL, or Python",
    "Basic understanding of data visualization",
    "Analytical thinking"
  ]);

  const [qualifications, setQualifications] = useState([
    "Studying Statistics, Computer Science, or related field",
    "Experience with data projects",
    "Attention to detail"
  ]);

  const [additional, setAdditional] = useState([
    "Internship certificate",
    "Networking opportunities",
    "Career growth support"
  ]);

  // Website Link interactivity
  const [websiteLink, setWebsiteLink] = useState("lagosjoblink.com");
  const [isEditingLink, setIsEditingLink] = useState(false);

  // Check if already applied to this specific job
  const jobIdToCheck = job?.id || "sof-eng-1";
  const hasApplied = applications.some(app => app.jobId === jobIdToCheck);

  const [isApplying, setIsApplying] = useState(false);
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [resumeNameInput, setResumeNameInput] = useState("Daniel_Adeyemi_CV.pdf");

  const handleApplyClick = () => {
    if (hasApplied) return;
    setIsApplying(true);
  };

  const handleConfirmApply = (e: React.FormEvent) => {
    e.preventDefault();
    const mockJob: Job = job || {
      id: "sof-eng-1",
      title: "Software Engineer, Senior",
      company: "LagosJobLink",
      logoBg: "bg-[#212230] text-white",
      location: "New york",
      type: "Remote",
      salary: "$5,500",
      description: editedDescription,
      postedTime: "Just now",
      category: "developer-software",
      applicants: 15,
      experienceLevel: "Entry Level"
    };
    onApplySubmit(mockJob, resumeNameInput);
    setIsApplying(false);
    setResumeUploaded(true);
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 font-sans antialiased text-gray-900">
      
      {/* Search & Location Bar matching screenshot layout & color */}
      <div className="max-w-6xl mx-auto mb-8">
        <div id="job-detail-search-bar" className="bg-white rounded-3xl shadow-sm border border-gray-100 p-2 sm:p-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="flex items-center gap-3 px-4 py-2 border-b sm:border-b-0 sm:border-r border-gray-100 flex-1 sm:max-w-xs text-left">
            <span className="flex items-center gap-1.5 text-xs text-gray-500 font-bold uppercase tracking-wider font-mono">
              <MapPin className="w-4 h-4 text-[#212230]" />
              Location
            </span>
            <input 
              type="text" 
              defaultValue={defaultLocation}
              disabled
              className="text-xs text-[#212230] font-black outline-none border-0 bg-transparent flex-1 select-none"
            />
          </div>
          <div className="flex items-center gap-2 px-4 flex-1 text-left">
            <input 
              type="text" 
              placeholder="Search" 
              disabled
              className="text-xs text-[#212230] font-bold outline-none border-0 bg-transparent w-full cursor-not-allowed placeholder-gray-400"
            />
          </div>
          <button 
            onClick={onBack}
            className="px-5 py-2.5 bg-[#E2E2E6] hover:bg-gray-300 text-gray-700 text-xs font-bold rounded-2xl transition-all cursor-pointer border-0 shrink-0 select-none flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Go Back
          </button>
        </div>
      </div>

      {/* Main Multi-Column Content Layout */}
      <div className="grid grid-cols-1 lg:col-span-12 lg:grid-cols-12 gap-8 max-w-6xl mx-auto items-start">
        
        {/* LEFT COLUMN: Sidebar Card (Apply & About company) */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Card 1: Apply now */}
          <div id="job-detail-apply-card" className="bg-white rounded-3xl border border-gray-100 shadow-xs p-6 sm:p-8 text-left space-y-5 transition-all duration-300">
            <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight leading-none mb-2">
              Apply now
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed font-semibold">
              Apply for this job and hear back from the hiring ,manager in under 48 hours
            </p>
            
            {hasApplied ? (
              <div className="bg-emerald-50 text-emerald-800 p-3 rounded-2xl border border-emerald-100 flex items-center gap-2 text-xs font-bold select-none">
                <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                <span>Applied successfully! (Reviewing)</span>
              </div>
            ) : (
              <button 
                onClick={handleApplyClick}
                className="w-full py-3 bg-[#212230] hover:bg-emerald-600 text-white text-xs font-bold rounded-2xl transition-all duration-300 border-0 shadow-sm cursor-pointer select-none"
              >
                Apply now
              </button>
            )}

            {isApplying && (
              <form onSubmit={handleConfirmApply} className="bg-slate-50 rounded-2xl p-4 border border-slate-200 mt-4 space-y-3.5">
                <p className="text-[10px] font-mono uppercase font-black text-slate-500">Fast application</p>
                <div>
                  <label className="block text-[10px] text-gray-400 font-bold mb-1 uppercase tracking-wider">Candidate CV File</label>
                  <div className="flex items-center gap-2 bg-white rounded-xl border border-gray-200 px-3 py-2">
                    <FileText className="w-4 h-4 text-gray-400" />
                    <input 
                      type="text"
                      value={resumeNameInput}
                      onChange={(e) => setResumeNameInput(e.target.value)}
                      required
                      placeholder="Resume_File.pdf"
                      className="text-xs bg-transparent border-none outline-none text-gray-700 w-full font-bold"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    type="submit"
                    className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl border-0 cursor-pointer"
                  >
                    Submit CV
                  </button>
                  <button 
                    type="button"
                    onClick={() => setIsApplying(false)}
                    className="px-3 bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-bold rounded-xl border-0 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Sidenote Label exactly from screenshot */}
          <div className="text-left py-1 select-none">
            <span className="text-[10px] text-gray-400 font-bold font-mono uppercase tracking-widest pl-1">
              write a short overview of the company
            </span>
          </div>

          {/* Card 2: About the company */}
          <div id="job-detail-company-card" className="bg-white rounded-3xl border border-gray-100 shadow-xs p-6 sm:p-8 text-left space-y-5 transition-all duration-300">
            <h3 className="text-md sm:text-lg font-black text-gray-900 tracking-tight leading-none">
              About the company
            </h3>
            
            <p className="text-xs text-gray-500 leading-relaxed font-semibold">
              LagosJobLink is a modern job board platform connecting Lagos talent with top employers
            </p>

            {/* Simulated interactive URL Link from screenshot line "Add website link ______" */}
            <div className="pt-2">
              <span className="text-[9px] text-gray-400 font-black uppercase tracking-wider block mb-1">Company Website</span>
              {isEditingLink ? (
                <div className="flex items-center gap-1">
                  <input 
                    type="text" 
                    value={websiteLink}
                    onChange={(e) => setWebsiteLink(e.target.value)}
                    className="text-xs text-[#212230] font-black border-b border-gray-300 outline-none pb-0.5 bg-transparent w-full"
                    autoFocus
                    onBlur={() => setIsEditingLink(false)}
                    onKeyDown={(e) => e.key === "Enter" && setIsEditingLink(false)}
                  />
                  <button 
                    onClick={() => setIsEditingLink(false)}
                    className="text-[10px] bg-[#212230] text-white px-2 py-0.5 rounded cursor-pointer border-0"
                  >
                    Ok
                  </button>
                </div>
              ) : (
                <div 
                  onClick={() => setIsEditingLink(true)}
                  className="group flex flex-col cursor-pointer border-b border-[#212230] pb-1 w-fit transition-all hover:border-indigo-600"
                >
                  <span className="text-xs text-[#212230] font-black tracking-tight group-hover:text-indigo-600 transition-colors flex items-center gap-1.5">
                    {websiteLink}
                    <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-indigo-600" />
                  </span>
                </div>
              )}
              <span className="text-[9px] text-gray-300 block mt-1">Click web link line to edit.</span>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Large Job Description Card */}
        <div className="lg:col-span-8 space-y-2 flex flex-col">
          
          {/* Subtle link on top right */}
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-indigo-600 transition-colors cursor-pointer border-0 bg-transparent flex items-center gap-1.5 select-none self-end pb-1.5"
          >
            <Edit className="w-3 h-3 text-gray-400" />
            Edit the company job Discribtion
          </button>

          {/* Main big Card exactly like screenshot */}
          <div id="job-detail-main-card" className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-10 text-left space-y-8 relative overflow-hidden">
            
            {/* Top Header containing Title and Entry Level patch */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight leading-none">
                    {defaultJobTitle}
                  </h1>
                  <span className="text-[10px] font-black bg-indigo-50 text-indigo-700 font-mono px-2 py-0.5 rounded-md uppercase tracking-wide">
                    {job?.experienceLevel || "Entry Level"}
                  </span>
                </div>
              </div>
            </div>

            {/* Custom 4-Column Metric Row exactly styled from screen */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-5 border-t border-b border-gray-100/80">
              
              {/* Location */}
              <div className="space-y-1">
                <span className="text-[10.5px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1.5 select-none font-mono">
                  <MapPin className="w-3.5 h-3.5 text-gray-300" />
                  Location
                </span>
                <p className="text-xs font-black text-[#212230] font-sans">
                  {defaultLocation}
                </p>
              </div>

              {/* Department */}
              <div className="space-y-1">
                <span className="text-[10.5px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1.5 select-none font-mono">
                  <Briefcase className="w-3.5 h-3.5 text-gray-300" />
                  Department
                </span>
                <p className="text-xs font-black text-[#212230] font-sans">
                  {defaultDepartment}
                </p>
              </div>

              {/* Type */}
              <div className="space-y-1">
                <span className="text-[10.5px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1.5 select-none font-mono">
                  <Clock className="w-3.5 h-3.5 text-gray-300" />
                  Type
                </span>
                <p className="text-xs font-black text-[#212230] font-sans">
                  {defaultType}
                </p>
              </div>

              {/* salary */}
              <div className="space-y-1">
                <span className="text-[10.5px] text-gray-400 font-bold uppercase tracking-wide flex items-center gap-1.5 select-none font-mono">
                  <DollarSign className="w-3.5 h-3.5 text-gray-300" />
                  salary
                </span>
                <p className="text-xs font-black text-[#212230] font-mono">
                  {defaultSalary}
                </p>
              </div>

            </div>

            {/* Instruction placeholder from screen */}
            <p className="text-[10px] text-gray-300 select-none uppercase font-mono tracking-widest leading-relaxed">
              Write a detailed discription about what the job entails and the necessary requirment
            </p>

            {/* ================= SECTION: Job Description ================= */}
            <div className="space-y-3">
              <h2 className="text-md sm:text-lg font-extrabold text-[#212230] uppercase tracking-wider select-none">
                Job Description
              </h2>
              
              {isEditing ? (
                <div className="space-y-2">
                  <textarea 
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    rows={4}
                    className="w-full text-xs text-gray-600 leading-relaxed font-semibold bg-gray-50 p-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-[#212230] text-white rounded-xl text-xs font-bold border-0 cursor-pointer flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    Save Description
                  </button>
                </div>
              ) : (
                <p className="text-xs sm:text-[13px] text-gray-800 leading-relaxed font-medium">
                  {editedDescription}
                </p>
              )}
            </div>

            {/* ================= SECTION: Responsibilities and Duties ================= */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-md sm:text-lg font-extrabold text-[#212230] uppercase tracking-wider select-none">
                  Responsibilities and Duties:
                </h2>
                {isEditing && (
                  <button 
                    onClick={() => {
                      const text = prompt("Enter a responsibility:");
                      if (text) setResponsibilities([...responsibilities, text]);
                    }}
                    className="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-1 rounded cursor-pointer border-0 flex items-center gap-1 font-bold"
                  >
                    <Plus className="w-3 h-3" /> Add Item
                  </button>
                )}
              </div>

              <ul className="list-disc list-outside pl-5 space-y-3 text-xs sm:text-[13px] text-gray-800 font-medium leading-relaxed">
                {responsibilities.map((resp, i) => (
                  <li key={i} className="text-left relative group pl-1">
                    {resp}
                    {isEditing && (
                      <button 
                        onClick={() => setResponsibilities(responsibilities.filter((_, idx) => idx !== i))}
                        className="opacity-0 group-hover:opacity-100 ml-2 text-red-500 hover:text-red-700 cursor-pointer text-[10px] font-mono border-0 bg-transparent transition-opacity"
                      >
                        [Delete]
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* ================= SECTION: Requirements ================= */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-md sm:text-lg font-extrabold text-[#212230] uppercase tracking-wider select-none">
                  Requirements:
                </h2>
                {isEditing && (
                  <button 
                    onClick={() => {
                      const text = prompt("Enter a requirement:");
                      if (text) setRequirements([...requirements, text]);
                    }}
                    className="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-1 rounded cursor-pointer border-0 flex items-center gap-1 font-bold"
                  >
                    <Plus className="w-3 h-3" /> Add Item
                  </button>
                )}
              </div>

              <ul className="list-disc list-outside pl-5 space-y-2.5 text-xs sm:text-[13px] text-gray-800 font-medium leading-relaxed">
                {requirements.map((req, i) => (
                  <li key={i} className="text-left relative group pl-1">
                    {req}
                    {isEditing && (
                      <button 
                        onClick={() => setRequirements(requirements.filter((_, idx) => idx !== i))}
                        className="opacity-0 group-hover:opacity-100 ml-2 text-red-500 hover:text-red-700 cursor-pointer text-[10px] font-mono border-0 bg-transparent"
                      >
                        [Delete]
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* ================= SECTION: Qualifications ================= */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-md sm:text-lg font-extrabold text-[#212230] uppercase tracking-wider select-none">
                  Qualifications:
                </h2>
                {isEditing && (
                  <button 
                    onClick={() => {
                      const text = prompt("Enter a qualification:");
                      if (text) setQualifications([...qualifications, text]);
                    }}
                    className="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-1 rounded cursor-pointer border-0 flex items-center gap-1 font-bold"
                  >
                    <Plus className="w-3 h-3" /> Add Item
                  </button>
                )}
              </div>

              <ul className="list-disc list-outside pl-5 space-y-2.5 text-xs sm:text-[13px] text-gray-800 font-medium leading-relaxed">
                {qualifications.map((q, i) => (
                  <li key={i} className="text-left relative group pl-1">
                    {q}
                    {isEditing && (
                      <button 
                        onClick={() => setQualifications(qualifications.filter((_, idx) => idx !== i))}
                        className="opacity-0 group-hover:opacity-100 ml-2 text-red-500 hover:text-red-700 cursor-pointer text-[10px] font-mono border-0 bg-transparent"
                      >
                        [Delete]
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* ================= SECTION: Additional ================= */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-md sm:text-lg font-extrabold text-[#212230] uppercase tracking-wider select-none">
                  Additional:
                </h2>
                {isEditing && (
                  <button 
                    onClick={() => {
                      const text = prompt("Enter an additional item:");
                      if (text) setAdditional([...additional, text]);
                    }}
                    className="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-1 rounded cursor-pointer border-0 flex items-center gap-1 font-bold"
                  >
                    <Plus className="w-3 h-3" /> Add Item
                  </button>
                )}
              </div>

              <ul className="list-disc list-outside pl-5 space-y-2.5 text-xs sm:text-[13px] text-gray-800 font-medium leading-relaxed">
                {additional.map((item, i) => (
                  <li key={i} className="text-left relative group pl-1">
                    {item}
                    {isEditing && (
                      <button 
                        onClick={() => setAdditional(additional.filter((_, idx) => idx !== i))}
                        className="opacity-0 group-hover:opacity-100 ml-2 text-red-500 hover:text-red-700 cursor-pointer text-[10px] font-mono border-0 bg-transparent"
                      >
                        [Delete]
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* ================= BOTTOM RIGHT PILL BUTTON: Add another job ================= */}
            <div className="flex justify-end pt-6 border-t border-gray-100">
              <button 
                onClick={() => onNavigateToView("employer")}
                className="px-6 py-3 bg-[#212230] hover:bg-[#5850ec] text-white text-xs font-bold rounded-full transition-all duration-300 border-0 shadow-sm cursor-pointer select-none flex items-center gap-1.5"
                id="btn-add-another-job-detail-trigger"
              >
                <Plus className="w-4 h-4 text-white" />
                Add another job
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
