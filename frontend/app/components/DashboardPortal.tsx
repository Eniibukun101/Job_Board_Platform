'use client'
import { useState } from "react";
import { 
  Briefcase, 
  User, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  Calendar, 
  Settings, 
  Mail, 
  Trash2, 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  Sparkles,
  Home,
  Check,
  Search,
  DollarSign
} from "lucide-react";
import { INITIAL_JOBS, CATEGORIES } from "@/src/jobData";

interface RecommendedJob {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  saved: boolean;
}

interface SavedJob {
  id: string;
  title: string;
  company: string;
  location: string;
}

interface Interview {
  id: string;
  title: string;
  company: string;
  description: string;
  date: string; // "2024-10-xx" format
  time: string;
  completed: boolean;
}

interface DashboardNotification {
  id: string;
  company: string;
  status: string;
  time: string;
  logoType: string;
  tab: "today" | "week" | "month";
}

interface DashboardPortalProps {
  notifications?: DashboardNotification[];
  setNotifications?: React.Dispatch<React.SetStateAction<DashboardNotification[]>>;
  interviews?: Interview[];
  setInterviews?: React.Dispatch<React.SetStateAction<Interview[]>>;
  onNavigateToProfile?: () => void;
  profileCompletePercent?: number;
  onSelectJob?: (job: any) => void;
  onNavigateToNotifications?: () => void;
}

export default function DashboardPortal({
  notifications: propsNotifications,
  setNotifications: propsSetNotifications,
  interviews: propsInterviews,
  setInterviews: propsSetInterviews,
  onNavigateToProfile,
  profileCompletePercent = 30,
  onSelectJob,
  onNavigateToNotifications
}: DashboardPortalProps = {}) {
  const [notifTimeTab, setNotifTimeTab] = useState<"today" | "week" | "month">("today");
  const [dbSearchQuery, setDbSearchQuery] = useState("");
  const [portalSearchQuery, setPortalSearchQuery] = useState("");
  const [portalLocationQuery, setPortalLocationQuery] = useState("");
  const [portalCategory, setPortalCategory] = useState("all");
  const [portalExperience, setPortalExperience] = useState("all");
  
  // Dynamic state for Recommended jobs (No strokes!)
  const [recommendedJobs, setRecommendedJobs] = useState<RecommendedJob[]>([
    {
      id: "rec-1",
      title: "Product Design Lead",
      company: "Stellar Creative",
      location: "London (Remote)",
      type: "Full-time",
      salary: "$120k - $150k",
      saved: true
    },
    {
      id: "rec-2",
      title: "UX Architect",
      company: "Innovate Systems",
      location: "New York",
      type: "Hybrid",
      salary: "$140k - $170k",
      saved: false
    },
    {
      id: "rec-3",
      title: "Senior UI Designer",
      company: "CloudPay",
      location: "Berlin",
      type: "Remote",
      salary: "$90k - $115k",
      saved: true
    },
    {
      id: "rec-4",
      title: "Design System Engineer",
      company: "Figma Inc",
      location: "San Francisco",
      type: "Full-time",
      salary: "$160k - $190k",
      saved: false
    }
  ]);

  // Dynamic state for Recently Saved (No strokes!)
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([
    {
      id: "save-1",
      title: "Principal Designer",
      company: "Adobe",
      location: "San Jose"
    },
    {
      id: "save-2",
      title: "Senior Creative Lead",
      company: "Figma",
      location: "San Francisco"
    }
  ]);

  // Toast message simulation
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal simulation for "Post New Job"
  const [isPostingModalOpen, setIsPostingModalOpen] = useState(false);
  const [postedTitle, setPostedTitle] = useState("");
  const [postedCompany, setPostedCompany] = useState("");
  const [postedSalary, setPostedSalary] = useState("");

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Recommended carousel indexing
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Dynamic Interviews state
  const [localInterviews, setLocalInterviews] = useState<Interview[]>([
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

  const interviews = propsInterviews !== undefined ? propsInterviews : localInterviews;
  const setInterviews = propsSetInterviews !== undefined ? propsSetInterviews : setLocalInterviews;

  // Calendar States
  const [selectedDay, setSelectedDay] = useState("2024-10-14");
  const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1);

  const [isInterviewsListModalOpen, setIsInterviewsListModalOpen] = useState(false);
  const [isAddInterviewModalOpen, setIsAddInterviewModalOpen] = useState(false);

  // Add Interview Form fields
  const [newIntCompany, setNewIntCompany] = useState("");
  const [newIntRole, setNewIntRole] = useState("");
  const [newIntDate, setNewIntDate] = useState("2024-10-14");
  const [newIntTime, setNewIntTime] = useState("");
  const [newIntDesc, setNewIntDesc] = useState("");

  const handleToggleInterviewCompleted = (id: string) => {
    setInterviews(prevInterviews => prevInterviews.map((int) => {
      if (int.id === id) {
        const nextCompleted = !int.completed;
        
        // Notify when marked completed / ticked
        if (nextCompleted) {
          triggerToast(`Completed interview with ${int.company}!`);
          
          // Send system notification
          const notifId = `n-${Date.now()}`;
          const newNotif: DashboardNotification = {
            id: notifId,
            company: int.company,
            status: `Completed Interview successfully: ${int.title}`,
            time: "Just now",
            logoType: "calendar",
            tab: "today"
          };
          setNotifications(prevNotifs => [newNotif, ...prevNotifs]);
        } else {
          triggerToast(`Interview with ${int.company} marked incomplete.`);
        }
        
        return { ...int, completed: nextCompleted };
      }
      return int;
    }));
  };

  const handleCreateInterview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIntCompany || !newIntRole || !newIntTime) return;

    const newInt: Interview = {
      id: `int-${Date.now()}`,
      title: `${newIntRole} Interview`,
      company: newIntCompany,
      description: newIntDesc || "Scheduled Interview session",
      date: newIntDate,
      time: newIntTime,
      completed: false
    };

    setInterviews(prev => [...prev, newInt]);
    
    // Trigger toast
    triggerToast(`Interview scheduled with ${newIntCompany}!`);

    // System sends dynamic status notification
    const newNotif: DashboardNotification = {
      id: `n-${Date.now()}`,
      company: newIntCompany,
      status: `Scheduled Interview: ${newIntRole} for ${newIntTime}`,
      time: "Today",
      logoType: "calendar",
      tab: "today"
    };
    setNotifications(prev => [newNotif, ...prev]);

    // Reset fields & close modal
    setNewIntCompany("");
    setNewIntRole("");
    setNewIntTime("");
    setNewIntDesc("");
    setIsAddInterviewModalOpen(false);
  };

  const handleDeleteInterview = (id: string, company: string) => {
    setInterviews(prev => prev.filter(i => i.id !== id));
    triggerToast(`Interview with ${company} deleted.`);
  };

  // Dynamic state for Notifications
  const [localNotifications, setLocalNotifications] = useState<DashboardNotification[]>([
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

  const notifications = propsNotifications !== undefined ? propsNotifications : localNotifications;
  const setNotifications = propsSetNotifications !== undefined ? propsSetNotifications : setLocalNotifications;

  const handleDeleteSaved = (id: string, name: string) => {
    setSavedJobs(savedJobs.filter(j => j.id !== id));
    triggerToast(`Removed "${name}" from saved list.`);
  };

  const handleApplyNow = (jobTitle: string, company: string) => {
    const foundJob = INITIAL_JOBS.find(j => j.title.toLowerCase() === jobTitle.toLowerCase()) || 
                     INITIAL_JOBS[0];
    if (onSelectJob) {
      onSelectJob(foundJob);
    } else {
      triggerToast(`Authenticated as Alex. Initiated prompt for "${jobTitle}" at ${company}!`);
    }
  };

  const handlePostJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postedTitle || !postedCompany) return;
    
    triggerToast(`Successfully posted position: "${postedTitle}"!`);
    setIsPostingModalOpen(false);
    
    // Reset Form
    setPostedTitle("");
    setPostedCompany("");
    setPostedSalary("");
  };

  const handleToggleSaveRecommended = (id: string) => {
    setRecommendedJobs(recommendedJobs.map(job => {
      if (job.id === id) {
        const updated = !job.saved;
        if (updated) {
          setSavedJobs([...savedJobs, { id, title: job.title, company: job.company, location: job.location }]);
          triggerToast(`Saved "${job.title}" to portfolio.`);
        } else {
          setSavedJobs(savedJobs.filter(j => j.id !== id));
          triggerToast(`Removed "${job.title}" from saved list.`);
        }
        return { ...job, saved: updated };
      }
      return job;
    }));
  };

  // Get active items to render based on timeline tab selected
  const getActiveNotifications = () => {
    return notifications.filter(n => n.tab === notifTimeTab);
  };

  // Filter active jobs in portal based on typed queries, category, and experience
  const filteredSearchedJobs = INITIAL_JOBS.filter((job) => {
    const matchesKeyword = !portalSearchQuery.trim() || 
      job.title.toLowerCase().includes(portalSearchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(portalSearchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(portalSearchQuery.toLowerCase());
    
    const matchesLocation = !portalLocationQuery.trim() ||
      job.location.toLowerCase().includes(portalLocationQuery.toLowerCase());

    const matchesCategory = portalCategory === "all" || job.category === portalCategory;
    const matchesExperience = portalExperience === "all" || job.experienceLevel === portalExperience;
    
    return matchesKeyword && matchesLocation && matchesCategory && matchesExperience;
  });

  return (
    <div className="bg-[#f3f6fa] min-h-screen text-gray-900 pb-16 font-sans relative selection:bg-[#21222D]/10">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#21222D] text-gray-200 px-4 py-3 rounded-xl shadow-lg text-xs font-semibold flex items-center gap-2 animate-fade-in">
          <Sparkles className="w-4 h-4 text-gray-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Dashboard Layout container - Centered and Spaced (Recruiter Portal sidebar removed) */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 animate-fade-in">
        
        {/* MAIN COLUMN CONTAINER */}
        <div className="space-y-6">
          
          {/* Top Row Header Title + Stat Counters (Aligned Right) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-black text-gray-900 tracking-tight">Welcome back, Alex</h1>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">{"Here's what's happening with your job search today."}</p>
            </div>

            {/* Stat Counters on the Right (Borders and strokes completely removed) */}
            <div className="flex items-center gap-3">
              {/* Interviews - Click to open Popup */}
              <button 
                onClick={() => setIsInterviewsListModalOpen(true)}
                className="bg-slate-200/65 hover:bg-slate-250/80 active:scale-98 transition-all px-5 py-2.5 rounded-xl text-center min-w-[110px] shadow-sm flex flex-col items-center justify-center cursor-pointer border-0"
                title="Click to view interview list & tick off completed ones"
              >
                <div className="text-lg font-black text-slate-800 tracking-tight leading-none flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-gray-500 shrink-0" />
                  {interviews.filter(i => !i.completed).length}
                </div>
                <div className="text-[9px] text-slate-500 uppercase tracking-wider font-extrabold mt-1">
                  Interviews
                </div>
              </button>
            </div>
          </div>

          {/* Split layout: Notifications Database Tab component (Left) + Interviews Calendar (Right) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Left Segment: Timeline Notification hub styled exactly like the provided screenshot (NO STROKES / BORDERS) */}
            <div className="md:col-span-7 bg-white rounded-2xl p-5 shadow-xs">
              
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100 select-none">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-gray-500">Notifications</h3>
                <button 
                  onClick={onNavigateToNotifications}
                  className="text-[10px] font-black uppercase text-indigo-600 hover:text-indigo-800 transition-colors bg-transparent border-0 cursor-pointer flex items-center gap-1"
                >
                  View Large ↗
                </button>
              </div>

              {/* Elegant capsule Tab switcher for temporal notifications (exactly like screenshot) */}
              <div className="bg-[#eaeaea]/70 rounded-2xl p-1.5 flex gap-1 items-center mb-6 select-none max-w-lg mx-auto">
                <button
                  onClick={() => { setNotifTimeTab("today"); triggerToast("Synced today's updates."); }}
                  className={`flex-1 py-2 text-center text-xs font-bold rounded-xl transition-all cursor-pointer ${
                    notifTimeTab === "today"
                      ? "bg-white text-slate-900 shadow-sm font-extrabold"
                      : "text-gray-500 hover:text-slate-950"
                  }`}
                >
                  Today
                </button>
                <button
                  onClick={() => { setNotifTimeTab("week"); triggerToast("Synced weekly activity."); }}
                  className={`flex-1 py-2 text-center text-xs font-bold rounded-xl transition-all cursor-pointer ${
                    notifTimeTab === "week"
                      ? "bg-white text-slate-900 shadow-sm font-extrabold"
                      : "text-gray-500 hover:text-slate-950"
                  }`}
                >
                  This week
                </button>
                <button
                  onClick={() => { setNotifTimeTab("month"); triggerToast("Synced monthly logs."); }}
                  className={`flex-1 py-2 text-center text-xs font-bold rounded-xl transition-all cursor-pointer ${
                    notifTimeTab === "month"
                      ? "bg-white text-slate-900 shadow-sm font-extrabold"
                      : "text-gray-500 hover:text-slate-950"
                  }`}
                >
                  This month
                </button>
              </div>

              {/* Connected Chronological Slab timeline list (exact replication with zero strokes) */}
              <div className="space-y-4 relative">
                {getActiveNotifications().map((item, index) => {
                  const isFirst = index === 0;
                  const isLast = index === getActiveNotifications().length - 1;
                  const lineStyle = isFirst 
                    ? "top-1/2 bottom-0" 
                    : isLast 
                    ? "top-0 bottom-1/2" 
                    : "top-0 bottom-0";

                  return (
                    <div key={item.id} className="flex items-center justify-between gap-4 relative">
                      {/* Left Side Capsule Card with designated subtle grey colors */}
                      <div 
                        onClick={onNavigateToNotifications}
                        className="flex-1 bg-[#efeff1] rounded-2xl p-4.5 flex items-center justify-between transition-all hover:bg-slate-200/90 cursor-pointer min-h-[72px]"
                      >
                        <div className="flex items-center gap-4">
                          {/* High-fidelity Brand Vector Logo Box */}
                          <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-3xs">
                            {item.logoType === "x" && (
                              <div className="w-8 h-8 rounded-lg bg-[#21222D]/10 text-[#21222D] flex items-center justify-center font-black font-sans text-xs">
                                ✕
                              </div>
                            )}
                            {item.logoType === "car" && (
                              <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-500">
                                <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
                                </svg>
                              </div>
                            )}
                            {item.logoType === "spotify" && (
                              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
                                <svg className="w-4.5 h-4.5 text-slate-500" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.58 14.42c-.2.32-.61.42-.93.22-2.5-1.53-5.65-1.88-9.35-1.03-.36.08-.72-.14-.8-.5-.08-.36.14-.72.5-.8 4.05-.93 7.54-.53 10.36 1.2.32.2.42.61.22.91zm1.22-2.73c-.25.4-.77.53-1.16.28-2.86-1.76-7.22-2.26-10.6-1.24-.45.13-.91-.12-1.05-.57-.13-.45.12-.91.57-1.05 3.86-1.17 8.68-.61 11.96 1.41.4.24.52.77.28 1.17zm.1-2.91C14.47 8.32 8.7 8.13 5.37 9.14c-.54.16-1.1-.14-1.26-.68-.16-.54.14-1.1.68-1.26 3.85-1.17 10.22-.95 14.18 1.4.49.29.65.93.36 1.42-.29.48-.93.65-1.43.36z" />
                                </svg>
                              </div>
                            )}
                            {item.logoType === "calendar" && (
                              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
                                <Calendar className="w-4 h-4 shrink-0" />
                              </div>
                            )}
                          </div>

                          {/* Info descriptions block */}
                          <div className="text-left">
                            <h4 className="text-xs font-black text-gray-900 tracking-tight leading-none mb-1.5">
                              {item.company}
                            </h4>
                            <p className="text-[10.5px] text-gray-500 font-medium leading-normal">
                              {item.status}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Right Timeline Node (hollow circle aligned to the line) */}
                      <div className="w-[145px] shrink-0 flex items-center gap-3 relative min-h-[72px] pl-2 select-none">
                        {/* Dynamic connection segment of the vertical timeline */}
                        <div className={`absolute left-[14px] w-[1px] bg-gray-300 ${lineStyle}`} />
                        
                        {/* Central Ring bullet */}
                        <div className="w-3.5 h-3.5 rounded-full border-2 border-gray-400 bg-white z-10 shrink-0" />
                        
                        {/* Signature Date stamp */}
                        <span className="text-[10px] text-gray-400 font-mono font-bold whitespace-nowrap pl-0.5">
                          {item.time}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Segment: Calendar widget representing dates and active panel (NO STROKES!) */}
            <div className="md:col-span-5 bg-white rounded-2xl p-5 shadow-xs text-left flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3 select-none">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Calendar</h3>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest font-mono mt-0.5">October 2024</p>
                  </div>
                  <button 
                    onClick={() => {
                      setNewIntDate(selectedDay);
                      setIsAddInterviewModalOpen(true);
                    }}
                    className="px-2.5 py-1.5 bg-[#21222D] hover:bg-slate-800 text-white rounded-lg text-[9px] font-black tracking-tight transition-all flex items-center gap-1 cursor-pointer border-0"
                  >
                    <Plus className="w-3 h-3" /> Schedule
                  </button>
                </div>

                {/* Days Tracker Grid */}
                <div className="grid grid-cols-7 gap-1 text-center font-mono text-[9px] text-gray-400 tracking-wide font-bold pb-2 mb-3">
                  <div>M</div>
                  <div>T</div>
                  <div>W</div>
                  <div>T</div>
                  <div>F</div>
                  <div>S</div>
                  <div>S</div>

                  {/* Empty cell for Monday offset because October 1st, 2024 starts on a Tuesday */}
                  <div />

                  {calendarDays.map((dayNum) => {
                    const dateStr = `2024-10-${String(dayNum).padStart(2, "0")}`;
                    const isSelected = selectedDay === dateStr;
                    const dayInterviews = interviews.filter(i => i.date === dateStr);
                    const hasInterviews = dayInterviews.length > 0;

                    return (
                      <button
                        key={dayNum}
                        onClick={() => setSelectedDay(dateStr)}
                        className={`aspect-square w-full flex flex-col items-center justify-center hover:bg-slate-100 rounded-full font-black text-[10px] relative transition-all duration-150 cursor-pointer border-0 ${
                          isSelected 
                            ? "bg-[#21222D] text-white hover:bg-[#21222D]" 
                            : "text-slate-800"
                        }`}
                      >
                        <span className={hasInterviews ? "-mt-1 block" : ""}>{dayNum}</span>
                        {hasInterviews && (
                          <div className="absolute bottom-1 flex gap-0.5 justify-center">
                            {dayInterviews.slice(0, 3).map((item) => (
                              <span 
                                key={item.id} 
                                className={`w-1 h-1 rounded-full ${
                                  isSelected 
                                    ? "bg-[#21222D]" 
                                    : item.completed 
                                      ? "bg-slate-350" 
                                      : "bg-gray-400"
                                }`} 
                                title={item.title}
                              />
                            ))}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Day Stream Selector */}
              <div className="border-t border-gray-100 pt-3 mt-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9.5px] font-mono tracking-wider text-gray-400 uppercase font-black">
                    Schedule: Oct {parseInt(selectedDay.split("-")[2], 10)}
                  </span>
                  <span className="text-[9.5px] text-gray-400 font-mono font-bold">
                    {interviews.filter(i => i.date === selectedDay).length} match
                  </span>
                </div>

                {interviews.filter(i => i.date === selectedDay).length === 0 ? (
                  <div className="py-6 text-center bg-gray-50/70 rounded-2xl">
                    <p className="text-[10px] text-gray-405 font-mono font-bold">No interviews this day</p>
                    <button 
                      onClick={() => {
                        setNewIntDate(selectedDay);
                        setIsAddInterviewModalOpen(true);
                      }}
                      className="text-[9px] font-black tracking-tight text-[#21222D] uppercase mt-1 inline-block hover:underline border-0 bg-transparent cursor-pointer"
                    >
                      + Add Event
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2.5 max-h-[160px] overflow-y-auto pr-1">
                    {interviews.filter(i => i.date === selectedDay).map((item) => (
                      <div 
                        key={item.id} 
                        className={`p-2.5 rounded-xl transition-all leading-tight text-[11px] ${
                          item.completed 
                            ? "bg-slate-100/60 opacity-60 ml-1 border-l-2 border-slate-300"
                            : "bg-gray-105 border-l-4 border-gray-400"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`text-[8.5px] font-mono font-black uppercase tracking-wider ${
                            item.completed ? "text-gray-400 line-through" : "text-gray-600"
                          }`}>
                            {item.time} {item.completed ? "(Done)" : "(Scheduled)"}
                          </span>
                          <button
                            onClick={() => handleToggleInterviewCompleted(item.id)}
                            className={`p-0.5 rounded transition-all cursor-pointer bg-transparent border-0 ${
                              item.completed ? "text-gray-400 hover:text-slate-800" : "text-gray-600 hover:text-gray-800"
                            }`}
                            title={item.completed ? "Mark pending" : "Tick as completed"}
                          >
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </button>
                        </div>
                        <h4 className={`text-xs font-black text-gray-900 mt-1 ${item.completed ? "line-through text-gray-450" : ""}`}>
                          {item.title}
                        </h4>
                        <p className="text-[9.5px] text-gray-500 mt-0.5">{item.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Career Controls & Job Discovery Suite (Exquisitely integrated into the main dashboard page) */}
          <div className="bg-white rounded-2xl p-6 shadow-xs text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 select-none">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#21222D]" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">Career Controls & Discovery</h3>
              </div>
              {(portalSearchQuery || portalLocationQuery || portalCategory !== "all" || portalExperience !== "all") && (
                <button
                  onClick={() => {
                    setPortalSearchQuery("");
                    setPortalLocationQuery("");
                    setPortalCategory("all");
                    setPortalExperience("all");
                    triggerToast("Reset all search parameters.");
                  }}
                  className="text-[10px] bg-gray-100 hover:bg-gray-200 text-gray-700 font-extrabold px-3 py-1 rounded-lg transition-all border-0 cursor-pointer"
                >
                  Clear Filters
                </button>
              )}
            </div>

            {/* Inputs Grid aligning with pristine layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {/* Keyword Search */}
              <div className="space-y-1">
                <label className="text-[10px] text-gray-400 uppercase tracking-wider font-extrabold select-none">Search Keywords</label>
                <div className="relative bg-[#f0f1f4] rounded-xl flex items-center px-3 py-2">
                  <Search className="w-4 h-4 text-gray-400 shrink-0 pointer-events-none mr-2" />
                  <input 
                    type="text" 
                    value={portalSearchQuery}
                    onChange={(e) => setPortalSearchQuery(e.target.value)}
                    placeholder="Title, skills, company..."
                    className="w-full text-xs font-semibold focus:outline-none placeholder-gray-400 bg-transparent text-gray-800"
                    id="dashboard-job-keyword"
                  />
                </div>
              </div>

              {/* Location Search */}
              <div className="space-y-1">
                <label className="text-[10px] text-gray-400 uppercase tracking-wider font-extrabold select-none">Location Field</label>
                <div className="relative bg-[#f0f1f4] rounded-xl flex items-center px-3 py-2">
                  <MapPin className="w-4 h-4 text-gray-450 shrink-0 pointer-events-none mr-2" />
                  <input 
                    type="text" 
                    value={portalLocationQuery}
                    onChange={(e) => setPortalLocationQuery(e.target.value)}
                    placeholder="e.g. Remote, US"
                    className="w-full text-xs font-semibold focus:outline-none placeholder-gray-400 bg-transparent text-gray-800"
                    id="dashboard-job-location"
                  />
                </div>
              </div>

              {/* Category Dropdown */}
              <div className="space-y-1">
                <label className="text-[10px] text-gray-400 uppercase tracking-wider font-extrabold select-none">Category Field</label>
                <div className="relative bg-[#f0f1f4] rounded-xl flex items-center px-3 py-1.5">
                  <select
                    value={portalCategory}
                    onChange={(e) => setPortalCategory(e.target.value)}
                    className="w-full text-xs font-semibold focus:outline-none bg-transparent text-gray-800 border-0 cursor-pointer h-7"
                    id="dashboard-job-category"
                  >
                    <option value="all">All Categories ({CATEGORIES.length})</option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Experience Dropdown */}
              <div className="space-y-1">
                <label className="text-[10px] text-gray-400 uppercase tracking-wider font-extrabold select-none">Experience level</label>
                <div className="relative bg-[#f0f1f4] rounded-xl flex items-center px-3 py-1.5">
                  <select
                    value={portalExperience}
                    onChange={(e) => setPortalExperience(e.target.value)}
                    className="w-full text-xs font-semibold focus:outline-none bg-transparent text-gray-800 border-0 cursor-pointer h-7"
                    id="dashboard-job-experience"
                  >
                    <option value="all">All Levels</option>
                    <option value="Junior">Junior Apprentice</option>
                    <option value="Mid">Mid Level Expert</option>
                    <option value="Senior">Senior / Principal Architect</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Always display of Results/Matching Jobs list */}
            <div className="space-y-3 animate-fade-in">
              <div className="flex items-center justify-between pb-1 border-b border-gray-100">
                <h4 className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">
                  Live Matched Vacancies ({filteredSearchedJobs.length} active in pool)
                </h4>
              </div>

              {filteredSearchedJobs.length === 0 ? (
                <div className="text-center py-10 bg-[#f5f6f8] rounded-2xl">
                  <p className="text-xs text-gray-400 font-mono font-bold">No vacancies fit your selected filters. Try adjusting your constraints.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[380px] overflow-y-auto pr-1">
                  {filteredSearchedJobs.map((job) => (
                    <div 
                      key={job.id} 
                      className="bg-white p-5 rounded-3xl border border-gray-150 hover:border-gray-250 hover:shadow-md transition-all flex flex-col justify-between text-left"
                    >
                      <div>
                        {/* Header info */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm bg-indigo-50 text-[#21222D]">
                              {job.company.substring(0, 1)}
                            </div>
                            <div>
                              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{job.company}</p>
                              <span className="text-[9px] text-[#21222D]/60 font-semibold">{job.location}</span>
                            </div>
                          </div>
                          
                          <span className="text-[9px] bg-slate-100 text-slate-800 font-bold px-2 py-0.5 rounded-full font-mono">
                            {job.type}
                          </span>
                        </div>

                        <h3 className="text-xs font-extrabold text-[#21222D] tracking-tight hover:text-indigo-600 cursor-pointer mb-2">
                          {job.title}
                        </h3>

                        <p className="text-[10px] text-gray-500 mt-2 line-clamp-2 leading-relaxed">
                          {job.description}
                        </p>
                      </div>

                      <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
                        <div>
                          <span className="text-[8px] text-gray-400 font-bold block uppercase tracking-wider">Salary</span>
                          <p className="text-xs font-extrabold text-gray-950 font-mono">
                            {job.salary}
                          </p>
                        </div>

                        <button 
                          onClick={() => handleApplyNow(job.title, job.company)}
                          className="px-3.5 py-2 bg-[#21222D] hover:bg-slate-800 text-white text-[10px] font-bold rounded-xl transition-colors cursor-pointer border-0"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Recommended positions row (NO STROKES!) */}
          <div className="bg-white rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4 select-none">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Recommended for You</h3>
                <p className="text-[10px] text-gray-405 mt-0.5">Based on your Senior Designer profile matching ratios</p>
              </div>

              {/* Custom arrow sliders */}
              <div className="flex items-center gap-1.5">
                <button 
                  onClick={() => {
                    if (carouselIndex > 0) setCarouselIndex(carouselIndex - 1);
                    triggerToast("Slided Recommended list left.");
                  }}
                  className={`w-7 h-7 rounded-lg hover:bg-gray-50 flex items-center justify-center text-gray-500 cursor-pointer ${
                    carouselIndex === 0 ? "opacity-40 cursor-not-allowed" : ""
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => {
                    if (carouselIndex < recommendedJobs.length - 3) setCarouselIndex(carouselIndex + 1);
                    triggerToast("Slided Recommended list right.");
                  }}
                  className={`w-7 h-7 rounded-lg hover:bg-gray-50 flex items-center justify-center text-gray-500 cursor-pointer ${
                    carouselIndex >= recommendedJobs.length - 3 ? "opacity-40 cursor-not-allowed" : ""
                  }`}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Layout Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recommendedJobs.slice(carouselIndex, carouselIndex + 3).map((job) => (
                <div 
                  key={job.id} 
                  className="bg-white p-5 rounded-3xl hover:shadow-lg transition-all duration-300 flex flex-col justify-between text-left"
                >
                  <div>
                    {/* Header info */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm bg-indigo-50 text-[#21222D]">
                          {job.company.substring(0, 1)}
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{job.company}</p>
                          <span className="text-[10px] text-[#21222D] font-bold font-mono">⚡ {job.id === "rec-1" ? "12" : job.id === "rec-2" ? "8" : "15"} applied</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        {/* Save Bookmark button */}
                        <button 
                          onClick={() => handleToggleSaveRecommended(job.id)}
                          className={`p-1 rounded-lg transition-colors cursor-pointer ${
                            job.saved ? "text-amber-500 bg-amber-50" : "text-gray-400 hover:text-gray-900"
                          }`}
                        >
                          <svg className="w-3.5 h-3.5" fill={job.saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                          </svg>
                        </button>
                        <span className="text-[9px] bg-slate-100 text-slate-800 font-bold px-1.5 py-0.5 rounded-full font-mono">
                          {job.type}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-sm font-extrabold text-[#21222D] tracking-tight hover:text-indigo-600 cursor-pointer mb-2">
                      {job.title}
                    </h3>

                    <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-2">
                      Join {job.company} as a {job.title} in {job.location}! Refine layout systems and shape high-end interface designs.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] text-gray-400 font-bold block uppercase tracking-wider">Salary Package</span>
                      <p className="text-sm font-extrabold text-gray-900 font-mono flex items-center">
                        <DollarSign className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                        {job.salary}
                      </p>
                    </div>

                    {job.id === "rec-2" ? (
                      <button 
                        onClick={() => triggerToast(`Parsing specification details for UX Architect role...`)}
                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-bold rounded-xl transition-all cursor-pointer text-center"
                      >
                        Details
                      </button>
                    ) : (
                      <button 
                        onClick={() => handleApplyNow(job.title, job.company)}
                        className="px-4 py-2 bg-[#21222D] hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer"
                      >
                        Apply Now
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sub column elements: Recently Saved (Left bottom) + Profile Strength (Right bottom) (NO STROKES!) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Left Column: Recently Saved list */}
            <div className="md:col-span-7 bg-white rounded-2xl p-5 shadow-xs text-left">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4 pb-1">Recently Saved</h3>
              
              {savedJobs.length === 0 ? (
                <p className="text-xs text-gray-400 py-3 text-center font-mono">No bookmarks left. Browse recommended jobs above to add more!</p>
              ) : (
                <div className="space-y-3">
                  {savedJobs.map((job) => (
                    <div 
                      key={job.id} 
                      className="flex items-center justify-between p-3.5 rounded-2xl bg-gray-50/50 hover:bg-gray-100/60 transition-all"
                    >
                      <div>
                        <h4 className="text-xs font-bold text-gray-950 leading-tight">{job.title}</h4>
                        <p className="text-[10px] text-gray-400 mt-0.5">{job.company} • {job.location}</p>
                      </div>
                      
                      <button 
                        onClick={() => handleDeleteSaved(job.id, job.title)}
                        className="p-2 text-gray-400 hover:text-red-500 rounded-xl transition-all cursor-pointer"
                        title="Unsave position"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: High contrast Profile Strength widget with radial percentage loop (NO STROKES!) */}
            <div className="md:col-span-5 bg-[#21222D] text-white rounded-2xl p-5 shadow-md flex flex-col justify-between text-left">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-xs font-bold text-indigo-200 uppercase tracking-wider font-mono">Profile Strength</h4>
                  <p className="text-lg font-black tracking-tight text-white mt-1">{profileCompletePercent}% Complete</p>
                </div>

                {/* Radial Gauge matching screenshot */}
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-gray-800"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-indigo-200"
                      strokeDasharray={`${profileCompletePercent}, 100`}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <span className="absolute text-[9px] font-black font-mono text-indigo-200">{profileCompletePercent}%</span>
                </div>
              </div>

              <p className="text-[11px] text-gray-300 leading-relaxed mt-4">
                Add your portfolio link to increase interview invitation chances by <span className="text-indigo-200 font-extrabold animate-pulse">45%</span>.
              </p>

              {/* Mint filled button matching screenshot */}
              <button 
                onClick={() => {
                  if (onNavigateToProfile) {
                    onNavigateToProfile();
                  } else {
                    triggerToast("Launching resume parsing workspace... Completed!");
                  }
                }}
                className="w-full py-2.5 bg-white hover:bg-slate-100 text-[#21222D] text-xs font-extrabold rounded-xl tracking-tight transition-all mt-5 shadow-xs cursor-pointer text-center"
              >
                Complete Profile
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Post New Job Custom Modal Panel */}
      {isPostingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            onClick={() => setIsPostingModalOpen(false)}
            className="absolute inset-0 bg-[#21222D]/65 backdrop-blur-xs" 
          />
          <div className="bg-white rounded-2xl overflow-hidden shadow-2xl relative z-10 p-6 max-w-sm w-full text-left">
            <h3 className="text-base font-bold text-gray-950 mb-1 flex items-center gap-1.5">
              <Briefcase className="w-5 h-5 text-gray-500" />
              Post Vacancy
            </h3>
            <p className="text-xs text-gray-400 mb-4">{"Post directly to Alex's active sandbox dashboard pool."}</p>

            <form onSubmit={handlePostJob} className="space-y-3.5">
              <div>
                <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold block mb-1">Vacancy Title</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Lead Product Designer"
                  value={postedTitle}
                  onChange={(e) => setPostedTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 rounded-xl text-xs focus:ring-2 focus:ring-indigo-200 focus:outline-none focus:bg-white"
                />
              </div>

              <div>
                <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold block mb-1">Company / Organization</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Stripe"
                  value={postedCompany}
                  onChange={(e) => setPostedCompany(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 rounded-xl text-xs focus:ring-2 focus:ring-indigo-200 focus:outline-none focus:bg-white"
                />
              </div>

              <div>
                <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold block mb-1">Salary Range</label>
                <input 
                  type="text" 
                  placeholder="e.g. $130k - $160K"
                  value={postedSalary}
                  onChange={(e) => setPostedSalary(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 rounded-xl text-xs focus:ring-2 focus:ring-indigo-200 focus:outline-none focus:bg-white"
                />
              </div>

              <div className="flex gap-2 pt-3">
                <button 
                  type="button"
                  onClick={() => setIsPostingModalOpen(false)}
                  className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl transition-all cursor-pointer text-center"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-2 bg-[#21222D] text-white hover:bg-slate-800 text-xs font-bold rounded-xl transition-all cursor-pointer text-center"
                >
                  Confirm Posting
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Schedule Interview Modal Form popup */}
      {isAddInterviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            onClick={() => setIsAddInterviewModalOpen(false)}
            className="absolute inset-0 bg-[#21222D]/65 backdrop-blur-xs" 
          />
          <div className="bg-white rounded-2xl overflow-hidden shadow-2xl relative z-10 p-6 max-w-sm w-full text-left">
            <h3 className="text-base font-bold text-gray-950 mb-1 flex items-center gap-1.5">
              <Calendar className="w-5 h-5 text-gray-500 shrink-0" />
              Schedule Interview
            </h3>
            <p className="text-xs text-gray-400 mb-4">Add a manual interview event directly to your calendar sheet.</p>

            <form onSubmit={handleCreateInterview} className="space-y-3.5">
              <div>
                <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold block mb-1">Company / Organization *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Stripe"
                  value={newIntCompany}
                  onChange={(e) => setNewIntCompany(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 rounded-xl text-xs focus:ring-2 focus:ring-[#21222D]/20 focus:outline-none focus:bg-white"
                />
              </div>

              <div>
                <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold block mb-1">Interview Title / Role *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Technical UI Screen"
                  value={newIntRole}
                  onChange={(e) => setNewIntRole(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 rounded-xl text-xs focus:ring-2 focus:ring-[#21222D]/20 focus:outline-none focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold block mb-1">Select Date</label>
                  <select
                    value={newIntDate}
                    onChange={(e) => setNewIntDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 rounded-xl text-xs focus:ring-2 focus:ring-[#21222D]/20 focus:outline-none focus:bg-white"
                  >
                    {calendarDays.map(day => {
                      const dateVal = `2024-10-${String(day).padStart(2, "0")}`;
                      return (
                        <option key={day} value={dateVal}>Oct {day}</option>
                      );
                    })}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold block mb-1">Time *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. 10:30 AM"
                    value={newIntTime}
                    onChange={(e) => setNewIntTime(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 rounded-xl text-xs focus:ring-2 focus:ring-[#21222D]/20 focus:outline-none focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold block mb-1">Description / Notes</label>
                <textarea 
                  placeholder="Briefly describe notes or agenda..."
                  value={newIntDesc}
                  onChange={(e) => setNewIntDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 rounded-xl text-xs focus:ring-2 focus:ring-[#21222D]/20 focus:outline-none focus:bg-white h-16 resize-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button 
                  type="button"
                  onClick={() => setIsAddInterviewModalOpen(false)}
                  className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl transition-all cursor-pointer text-center border-0"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-2 bg-[#21222D] text-white hover:bg-gray-800 text-xs font-bold rounded-xl transition-all cursor-pointer text-center border-0"
                >
                  Confirm Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Interviews Checklist Popup Modal list */}
      {isInterviewsListModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            onClick={() => setIsInterviewsListModalOpen(false)}
            className="absolute inset-0 bg-[#21222D]/65 backdrop-blur-xs" 
          />
          <div className="bg-white rounded-2xl overflow-hidden shadow-2xl relative z-10 p-6 max-w-md w-full text-left">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-bold text-gray-950 flex items-center gap-1.5">
                <Calendar className="w-5 h-5 text-gray-500 shrink-0" />
                Interviews Portfolio
              </h3>
              <button 
                onClick={() => {
                  setIsInterviewsListModalOpen(false);
                  setIsAddInterviewModalOpen(true);
                }}
                className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-[#21222D] text-[10px] font-black tracking-tight rounded-lg transition-all border-0 cursor-pointer"
              >
                + Schedule New
              </button>
            </div>
            <p className="text-xs text-gray-400 mb-4 font-medium">Keep track of upcoming dates and toggle completion status as interviews conclude.</p>

            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
              {interviews.length === 0 ? (
                <div className="text-center py-8 bg-[#f5f6f8] rounded-xl font-mono">
                  <p className="text-xs text-gray-405">No interview slots listed yet.</p>
                  <button 
                    onClick={() => {
                      setIsInterviewsListModalOpen(false);
                      setIsAddInterviewModalOpen(true);
                    }}
                    className="mt-2 text-xs font-bold text-[#21222D] hover:underline cursor-pointer border-0 bg-transparent"
                  >
                    Schedule one now
                  </button>
                </div>
              ) : (
                interviews.map((item) => (
                  <div 
                    key={item.id} 
                    className={`p-3.5 rounded-2xl transition-all flex items-start justify-between gap-3 ${
                      item.completed 
                        ? "bg-slate-50 opacity-60 ml-2" 
                        : "bg-gray-50"
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <button
                        onClick={() => handleToggleInterviewCompleted(item.id)}
                        className={`w-5 h-5 rounded-lg border flex items-center justify-center cursor-pointer transition-all mt-0.5 shrink-0 ${
                          item.completed 
                            ? "bg-[#21222D] border-[#21222D] text-white" 
                            : "bg-white border-gray-300 text-transparent hover:border-[#21222D]"
                        }`}
                        title={item.completed ? "Mark pending" : "Tick as completed"}
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3.5]" />
                      </button>

                      <div>
                        <h4 className={`text-xs font-black text-gray-950 ${item.completed ? "line-through text-gray-400" : ""}`}>
                          {item.title} • <span className="text-[#21222D]">{item.company}</span>
                        </h4>
                        <p className="text-[10px] text-gray-400 mt-0.5 font-medium">
                          Date: <span className="font-extrabold text-gray-700">Oct {parseInt(item.date.split("-")[2], 10)}, 2024</span> • Time: <span className="font-extrabold text-[#21222D]">{item.time}</span>
                        </p>
                        {item.description && (
                          <p className={`text-[10px] text-gray-500 mt-1 pl-1.5 border-l-2 border-slate-200 ${item.completed ? "line-through text-gray-400" : ""}`}>
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <button 
                      onClick={() => handleDeleteInterview(item.id, item.company)}
                      className="p-1 px-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all cursor-pointer border-0"
                      title="Remove appointment"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="flex gap-2 pt-4 mt-3 border-t border-gray-100">
              <div className="flex-1 text-[11px] text-gray-400 font-mono font-bold self-center">
                📊 {interviews.filter(i => i.completed).length} of {interviews.length} completed
              </div>
              <button 
                onClick={() => setIsInterviewsListModalOpen(false)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-slate-800 text-xs font-black rounded-xl transition-all cursor-pointer text-center border-0"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
