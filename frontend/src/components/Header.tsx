import { useState, useRef, useEffect } from "react";
import { Briefcase, User, FileText, CheckCircle2, ArrowRight, Home, Mail, Bell } from "lucide-react";

interface HeaderProps {
  currentView?: "home" | "dashboard" | "employer" | "login" | "profile" | "job-details" | "notifications";
  onNavigate?: (view: "home" | "dashboard" | "employer" | "login" | "profile" | "job-details" | "notifications") => void;
  isLoggedIn?: boolean;
  onLogOut?: () => void;
  profileName?: string;
  profileRole?: string;
  isPhotoUploaded?: boolean;
}

export default function Header({ 
  currentView, 
  onNavigate, 
  isLoggedIn = true, 
  onLogOut,
  profileName = "Daniel Adeyemi",
  profileRole = "Freelancer",
  isPhotoUploaded = false
}: HeaderProps = {}) {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setProfileDropdownOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(target)) {
        setNotificationDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white py-4 px-6 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between relative">
        
        {/* Left Side: Brand Logo */}
        <div 
          onClick={() => {
            if (onNavigate) {
              onNavigate("home");
            } else {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }} 
          className="flex items-center gap-2 cursor-pointer group select-none"
          id="logo-home-trigger"
        >
          {/* Custom logo representing the emblem in screenshot */}
          <div className="w-8 h-8 bg-[#21222D] text-white rounded-lg flex items-center justify-center font-bold text-sm shadow-xs group-hover:scale-105 transition-transform">
            <Briefcase className="w-4 h-4 text-white" />
          </div>
          <span className="font-extrabold text-lg text-[#21222D] tracking-tight">
            Jobnest
          </span>
        </div>

        {/* Center Section: Centered, Clickable Profile (Completely outline-free/borderless and highly reactive) */}
        <div className="absolute left-1/2 -translate-x-1/2 z-50" ref={dropdownRef}>
              <button 
                onClick={() => {
                  setProfileDropdownOpen(!profileDropdownOpen);
                  setNotificationDropdownOpen(false);
                }}
                className={`flex items-center gap-2.5 bg-transparent hover:bg-gray-100 rounded-full py-1.5 pl-1.5 pr-4 cursor-pointer transition-all active:scale-95 select-none ${
                  profileDropdownOpen ? "bg-gray-100" : ""
                }`}
                id="profile-central-trigger"
              >
                {isPhotoUploaded ? (
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop" 
                    alt={profileName} 
                    className="w-7 h-7 rounded-full object-cover ring-2 ring-gray-100/40"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-gray-300 flex items-center justify-center text-gray-500 font-bold text-xs ring-2 ring-gray-100/40">
                    {profileName.substring(0, 1)}
                  </div>
                )}
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-xs font-bold text-gray-800 tracking-tight leading-none flex items-center gap-1">
                    {profileName}
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                  </span>
                  <span className="text-[9px] text-gray-500 font-medium tracking-tight mt-0.5">{profileRole}</span>
                </div>
              </button>

              {/* Elegant macOS-style Dropdown Card */}
              {profileDropdownOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-72 bg-white rounded-2xl shadow-xl p-4 transition-all duration-200">
                  <div className="flex items-center gap-3 pb-3">
                    {isPhotoUploaded ? (
                      <img 
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop" 
                        alt={profileName} 
                        className="w-12 h-12 rounded-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-500 font-bold text-lg">
                        {profileName.substring(0, 1)}
                      </div>
                    )}
                    <div className="text-left">
                      <span className="text-sm font-bold text-gray-900 leading-none flex items-center gap-1">
                        {profileName}
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 fill-indigo-50" />
                      </span>
                      <span className="text-[10px] text-indigo-600 font-bold uppercase tracking-wider block mt-0.5">{profileRole}</span>
                      <span className="text-[10px] text-gray-400 font-medium font-mono">Mountain View, CA</span>
                    </div>
                  </div>

                  <div className="py-3 space-y-2 text-left">
                    <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Professional Stats</div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-gray-50 p-2 rounded-xl text-center">
                        <div className="text-xs font-bold text-gray-900">4 Active</div>
                        <div className="text-[9px] text-gray-550">Applications</div>
                      </div>
                      <div className="bg-gray-50 p-2 rounded-xl text-center">
                        <div className="text-xs font-bold text-gray-900">98% Match</div>
                        <div className="text-[9px] text-gray-550">Compatibility</div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 space-y-1">
                    <button 
                      onClick={() => {
                        if (onNavigate) {
                          onNavigate("profile");
                        }
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center justify-between text-left p-2 hover:bg-gray-50 rounded-xl transition-all group border-0 bg-transparent cursor-pointer"
                    >
                      <span className="flex items-center gap-2 text-xs font-bold text-gray-700">
                        <User className="w-4 h-4 text-gray-400 group-hover:text-indigo-600" />
                        Go to Profile Page
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              )}
        </div>

        {/* Right Side: Navigation Icons (Direct routing to dashboards) */}
        <div className="flex items-center justify-end gap-1.5 select-none font-sans">
          
          {/* Dynamic Employer Desk Access */}
          <button 
            onClick={() => {
              if (onNavigate) {
                onNavigate("employer");
              }
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              currentView === "employer"
                ? "bg-[#21222D] text-white font-bold"
                : "text-gray-500 hover:text-[#21222D] hover:bg-gray-100"
            }`}
            title="Enterprise Employer Desk"
            id="header-nav-reactive-employer"
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span className="text-[10px] uppercase font-mono font-black tracking-wider hidden sm:inline">Employer Desk</span>
          </button>

          <button 
            onClick={() => {
              if (onNavigate) {
                onNavigate("dashboard");
              } else {
                alert("Demo Mode: Home shortcut clicked.");
              }
            }}
            className={`p-2.5 rounded-xl transition-all cursor-pointer ${
              currentView === "dashboard"
                ? "bg-[#21222D]/10 text-[#21222D]"
                : "text-gray-500 hover:text-[#21222D] hover:bg-gray-100"
            }`}
            title="Alex's Dashboard Portal"
            id="header-nav-reactive-home"
          >
            <Home className={`w-5 h-5 ${currentView === "dashboard" ? "text-[#21222D]" : "text-gray-500"}`} />
          </button>
          
          <button 
            onClick={() => {
              if (onNavigate) {
                onNavigate("profile");
              } else {
                alert("Demo Mode: Personal Profile shortcut clicked.");
              }
            }}
            className={`p-2.5 rounded-xl transition-all cursor-pointer ${
              currentView === "profile"
                ? "bg-slate-100 text-[#21222D]"
                : "text-gray-500 hover:text-[#21222D] hover:bg-gray-100"
            }`}
            title="Profile Page"
            id="header-nav-reactive-profile"
          >
            <User className={`w-5 h-5 ${currentView === "profile" ? "text-[#21222D]" : "text-gray-500"}`} />
          </button>

          {/* Mail Dropdown/Routing Module (leads directly to full notification page) */}
          <div className="relative">
            <button 
              onClick={() => {
                if (onNavigate) {
                  onNavigate("notifications");
                }
              }}
              className={`p-2.5 rounded-xl transition-all cursor-pointer relative ${
                currentView === "notifications"
                  ? "bg-[#21222D]/10 text-[#21222D]"
                  : "text-gray-500 hover:text-[#21222D] hover:bg-gray-100"
              }`}
              title="Mailbox & Notifications"
              id="header-notification-mail"
            >
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-rose-500 rounded-full animate-ping" />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-rose-500 rounded-full" />
              <Mail className={`w-5 h-5 ${currentView === "notifications" ? "text-[#21222D]" : "text-gray-500"}`} />
            </button>
          </div>
        </div>

      </div>
    </header>
  );
}
