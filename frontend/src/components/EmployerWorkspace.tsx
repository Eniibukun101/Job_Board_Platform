import React, { useState } from "react";
import { Job, Category } from "../types";
import { CATEGORIES, INITIAL_JOBS } from "../data/jobData";
import { 
  Plus, 
  ArrowLeft, 
  Briefcase, 
  FileSpreadsheet, 
  Mail, 
  Sparkles, 
  CheckCircle, 
  PlusCircle, 
  UserCheck, 
  DollarSign,
  Locate,
  Trash2,
  BookmarkCheck
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface EmployerWorkspaceProps {
  onBackToHome: () => void;
  onAddNewJob: (newJob: Job) => void;
  customActiveJobs: Job[];
  onDeleteJob: (jobId: string) => void;
}

export default function EmployerWorkspace({ 
  onBackToHome, 
  onAddNewJob, 
  customActiveJobs,
  onDeleteJob
}: EmployerWorkspaceProps) {
  // Form values
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [category, setCategory] = useState("developer-software");
  const [salary, setSalary] = useState("$120k - $140k");
  const [location, setLocation] = useState("Remote, US");
  const [type, setType] = useState("Full-time");
  const [experience, setExperience] = useState("Senior");
  const [description, setDescription] = useState("");
  
  // Custom Success Banner
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobTitle || !companyName || !description) return;

    const newJob: Job = {
      id: "employer-custom-" + Date.now(),
      title: jobTitle,
      company: companyName,
      logoBg: "bg-indigo-900 text-white",
      location,
      type,
      salary,
      description,
      postedTime: "Posted just now",
      category,
      applicants: 0,
      experienceLevel: experience
    };

    onAddNewJob(newJob);

    // Show visual confirmation banner
    setShowSuccessBanner(true);
    setTimeout(() => {
      setShowSuccessBanner(false);
    }, 2500);

    // Reset fields
    setJobTitle("");
    setCompanyName("");
    setDescription("");
  };

  // Mock candidates database for employer action
  const [mockApplicants, setMockApplicants] = useState([
    { id: "app-1", name: "Sarah Connor", role: "Product Designer", email: "sarah@cyberdyne.org", cv: "Connor_Resume.pdf", matched: "94%" },
    { id: "app-2", name: "David Lightman", role: "SRE Infrastructure", email: "david@wopr.mil", cv: "David_HackerCV.pdf", matched: "88%" },
    { id: "app-3", name: "Elaine Marley", role: "Copywriter Intern", email: "elaine@meleeisland.gov", cv: "Marley_Portfolio.pdf", matched: "91%" }
  ]);

  const removeApplicant = (id: string) => {
    setMockApplicants(mockApplicants.filter(a => a.id !== id));
  };

  return (
    <div className="bg-[#f4f5f7] min-h-screen pb-16">
      {/* Header Panel */}
      <div className="bg-[#21222D] text-white py-12 px-6 shadow-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <button 
              onClick={onBackToHome}
              className="group inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors duration-200 mb-4 cursor-pointer"
              id="btn-back-home-employer"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Job Board Home
            </button>
            <h1 className="text-3xl font-bold font-sans tracking-tight">Employer Hub</h1>
            <p className="text-gray-400 text-sm mt-2 max-w-xl">
              Construct high-paying workspace postings, oversee active candidate lists, and expand your digital team dynamically.
            </p>
          </div>

          <div className="flex gap-4 p-1 bg-gray-800/50 rounded-xl border border-gray-700/60 self-start md:self-center">
            <div className="px-4 py-2 text-center rounded-lg bg-[#272935]">
              <div className="text-lg font-bold text-indigo-400">{customActiveJobs.length}</div>
              <div className="text-[10px] uppercase text-gray-400 font-mono tracking-wider">Active Vacancies</div>
            </div>
            <div className="px-4 py-2 text-center rounded-lg bg-[#272935]">
              <div className="text-lg font-bold text-emerald-400">{mockApplicants.length}</div>
              <div className="text-[10px] uppercase text-gray-400 font-mono tracking-wider">Candidate Applications</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left column: Post a job form */}
        <div className="lg:col-span-5">
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200/80 shadow-xs">
            <h3 className="text-base font-bold text-gray-900 mb-5 flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-indigo-600" />
              Post a New Job Listing
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-500 font-semibold block mb-1">Company Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Stripe"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:bg-white"
                    id="emp-company-name"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 font-semibold block mb-1">Job Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Product Designer"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:bg-white"
                    id="emp-job-title"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-500 font-semibold block mb-1">Category Placement</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    id="emp-category-select"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-500 font-semibold block mb-1">Salary Range / Rate</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. $130k - $150k"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:bg-white"
                    id="emp-salary-input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs text-gray-500 font-semibold block mb-1">Location</label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-2 py-2 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:bg-white"
                    id="emp-location"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 font-semibold block mb-1">Work Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-2 py-2 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    id="emp-type"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-500 font-semibold block mb-1">Min Level</label>
                  <select
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-2 py-2 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    id="emp-exp"
                  >
                    <option value="Junior">Junior</option>
                    <option value="Mid">Mid Level</option>
                    <option value="Senior">Senior</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-500 font-semibold block mb-1">Core Requirements & Description</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Outline key responsibilities, experience thresholds, and code stack expected..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:bg-white resize-none"
                  id="emp-description"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
                id="btn-submit-job"
              >
                <Plus className="w-4 h-4" />
                Publish to Live Board
              </button>
            </form>

            <AnimatePresence>
              {showSuccessBanner && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 p-3 bg-emerald-50 text-emerald-800 text-xs font-medium rounded-xl border border-emerald-200 flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  Successfully posted! Listing is live for dynamic category searching.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right columns: Active Listings & Received Candidates */}
        <div className="lg:col-span-7 space-y-6">
          {/* Active Listings section */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs">
            <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-indigo-600" />
              Manage Active Postings
            </h3>

            {customActiveJobs.length === 0 ? (
              <div className="py-8 text-center border-2 border-dashed border-gray-200 rounded-xl">
                <FileSpreadsheet className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-550 font-semibold text-xs">No jobs posted from your account yet</p>
                <p className="text-gray-400 text-[10px] mt-1">Publish an advertisement using the form on the left side.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {customActiveJobs.map((job) => {
                  const catName = CATEGORIES.find(c => c.id === job.category)?.name || "Software Eng";
                  return (
                    <div key={job.id} className="p-4 bg-gray-50 hover:bg-gray-100/60 rounded-xl border border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-all">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[9px] bg-slate-200 text-slate-700 font-bold px-1.5 py-0.5 rounded font-mono uppercase">
                            {catName}
                          </span>
                          <span className="text-[10px] text-gray-400 font-semibold">{job.company}</span>
                        </div>
                        <h4 className="text-sm font-bold text-gray-900">{job.title}</h4>
                        <p className="text-[11px] text-gray-500 font-mono mt-1 flex items-center gap-1.5">
                          <span>💰 {job.salary}</span>
                          <span>•</span>
                          <span>📍 {job.location}</span>
                        </p>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded-lg font-bold">
                          {job.applicants} Applied
                        </span>
                        <button
                          onClick={() => onDeleteJob(job.id)}
                          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg cursor-pointer transition-colors"
                          title="Delete Listing"
                          id={`delete-job-${job.id}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Received Applications tracker */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs">
            <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-emerald-600" />
              Incoming Talents Review ({mockApplicants.length})
            </h3>

            {mockApplicants.length === 0 ? (
              <p className="text-xs text-gray-400 italic">No candidates awaiting review.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockApplicants.map((applicant) => (
                  <div key={applicant.id} className="p-4 bg-slate-50 border border-slate-150 rounded-xl flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <div>
                          <h4 className="text-xs font-bold text-gray-900">{applicant.name}</h4>
                          <span className="text-[10px] text-gray-400 font-bold uppercase">{applicant.role}</span>
                        </div>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold font-mono px-1.5 py-0.5 rounded">
                          {applicant.matched} Match
                        </span>
                      </div>
                      
                      <p className="text-[10px] text-gray-500 flex items-center gap-1 mb-1">
                        <Mail className="w-3.5 h-3.5" /> {applicant.email}
                      </p>
                      <p className="text-[10px] text-indigo-600 font-mono flex items-center gap-1 font-bold">
                        📄 {applicant.cv}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-200/85 flex justify-end gap-2">
                      <button
                        onClick={() => removeApplicant(applicant.id)}
                        className="px-2.5 py-1 text-[10px] bg-red-100 hover:bg-red-200 text-red-700 font-bold rounded-lg transition-colors cursor-pointer"
                        id={`reject-appl-${applicant.id}`}
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => {
                          alert(`Interview request email triggers set to send to ${applicant.email}!`);
                        }}
                        className="px-2.5 py-1 text-[10px] bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-colors cursor-pointer"
                        id={`schedule-appl-${applicant.id}`}
                      >
                        Accept
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
