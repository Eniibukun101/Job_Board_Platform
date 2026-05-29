import React, { useState } from "react";
import { Clock, Calendar, CheckSquare, Bell, ArrowLeft, MoreVertical } from "lucide-react";

interface NotificationItem {
  id: string;
  company: string;
  status: string;
  time: string;
  logoType: "x" | "car" | "spotify";
  tab: "today" | "week" | "month";
}

interface NotificationsPageProps {
  onBack: () => void;
  onNavigateToView: (view: "home" | "dashboard" | "employer" | "profile" | "job-details" | "notifications") => void;
}

export default function NotificationsPage({
  onBack,
  onNavigateToView
}: NotificationsPageProps) {
  const [activeTab, setActiveTab] = useState<"today" | "week" | "month" | "all">("today");

  // Exact data from screenshot representing pre-loaded notifications
  const notifications: NotificationItem[] = [
    {
      id: "notif-1",
      company: "CloudNest Systems",
      status: "Your application has been rejected",
      time: "10:55am 22nd April",
      logoType: "x",
      tab: "today"
    },
    {
      id: "notif-2",
      company: "SterlingPath Ltd.",
      status: "Your application it under review",
      time: "10:55am 22nd April",
      logoType: "car",
      tab: "today"
    },
    {
      id: "notif-3",
      company: "CodeSphere Inc.",
      status: "Your apllication has moved to the next step",
      time: "10:55am 22nd April",
      logoType: "spotify",
      tab: "today"
    },
    {
      id: "notif-4",
      company: "CloudNest Systems",
      status: "Your application it under review",
      time: "10:55am 22nd April",
      logoType: "x",
      tab: "today"
    },
    {
      id: "notif-5",
      company: "OptimaFlow Inc.",
      status: "Your application it under review",
      time: "10:55am 22nd April",
      logoType: "spotify",
      tab: "today"
    },
    // Weekly items
    {
      id: "notif-6",
      company: "CodeSphere Inc.",
      status: "Your application has been received and verified by recruitment panel.",
      time: "09:40am 15th April",
      logoType: "spotify",
      tab: "week"
    },
    {
      id: "notif-7",
      company: "CloudNest Systems",
      status: "Your profile matches the Senior Front End vacancy requirements.",
      time: "02:15pm 14th April",
      logoType: "x",
      tab: "week"
    },
    // Monthly items
    {
      id: "notif-8",
      company: "OptimaFlow Inc.",
      status: "Your digital portfolio was successfully secured and registered.",
      time: "11:30am 8th April",
      logoType: "spotify",
      tab: "month"
    }
  ];

  const getFilteredItems = () => {
    if (activeTab === "all") return notifications;
    return notifications.filter(item => item.tab === activeTab);
  };

  const filteredItems = getFilteredItems();

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 font-sans antialiased text-gray-900">
      
      {/* Centered Large Card matching the screenshot */}
      <div className="max-w-6xl mx-auto bg-white rounded-3xl border border-gray-100 shadow-xs p-6 sm:p-10 text-left">
        
        {/* Navigation Tabs Switcher centered exactly like the screenshot */}
        <div className="flex justify-center mb-8">
          <div className="bg-[#eaeaea]/70 rounded-3xl p-1.5 flex gap-1 items-center w-full max-w-xl shadow-3xs">
            <button
              onClick={() => setActiveTab("today")}
              className={`flex-1 py-3 text-center text-xs font-black rounded-2xl transition-all cursor-pointer border-0 select-none ${
                activeTab === "today"
                  ? "bg-white text-slate-900 shadow-xs font-black"
                  : "text-gray-500 hover:text-slate-950 bg-transparent"
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setActiveTab("week")}
              className={`flex-1 py-3 text-center text-xs font-black rounded-2xl transition-all cursor-pointer border-0 select-none ${
                activeTab === "week"
                  ? "bg-white text-slate-900 shadow-xs font-black"
                  : "text-gray-500 hover:text-slate-950 bg-transparent"
              }`}
            >
              This week
            </button>
            <button
              onClick={() => setActiveTab("month")}
              className={`flex-1 py-3 text-center text-xs font-black rounded-2xl transition-all cursor-pointer border-0 select-none ${
                activeTab === "month"
                  ? "bg-white text-slate-900 shadow-xs font-black"
                  : "text-gray-500 hover:text-slate-950 bg-transparent"
              }`}
            >
              This month
            </button>
          </div>
        </div>

        {/* Notifications Listing & Vertical Timeline Layout */}
        <div className="space-y-4 relative">
          
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-gray-400 font-medium">
              <Bell className="w-8 h-8 mx-auto text-gray-300 mb-2" />
              <p className="text-xs font-mono">No notifications in this interval.</p>
            </div>
          ) : (
            <div className="space-y-4 relative">
              {filteredItems.map((item, index) => {
                const isFirst = index === 0;
                const isLast = index === filteredItems.length - 1;
                const lineStyle = isFirst 
                  ? "top-1/2 bottom-0" 
                  : isLast 
                  ? "top-0 bottom-1/2" 
                  : "top-0 bottom-0";

                return (
                  <div key={item.id} className="flex items-center justify-between gap-4 sm:gap-6 relative">
                    
                    {/* Left Side Wide Slab Card (matching beautiful background from screenshot) */}
                    <div className="flex-1 bg-[#efeff1] rounded-2xl p-5 flex items-center justify-between transition-all hover:bg-slate-200/80 cursor-pointer min-h-[76px]">
                      <div className="flex items-center gap-4">
                        
                        {/* High-fidelity Brand Vector Logo Box matching icons */}
                        <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-3xs border border-gray-100">
                          {item.logoType === "x" && (
                            <div className="w-9 h-9 rounded-lg bg-[#21222D]/5 text-[#21222D] flex items-center justify-center font-black font-sans text-sm select-none">
                              ✕
                            </div>
                          )}
                          {item.logoType === "car" && (
                            <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-500 shrink-0 select-none">
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
                              </svg>
                            </div>
                          )}
                          {item.logoType === "spotify" && (
                            <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0 select-none">
                              <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.58 14.42c-.2.32-.61.42-.93.22-2.5-1.53-5.65-1.88-9.35-1.03-.36.08-.72-.14-.8-.5-.08-.36.14-.72.5-.8 4.05-.93 7.54-.53 10.36 1.2.32.2.42.61.22.91zm1.22-2.73c-.25.4-.77.53-1.16.28-2.86-1.76-7.22-2.26-10.6-1.24-.45.13-.91-.12-1.05-.57-.13-.45.12-.91.57-1.05 3.86-1.17 8.68-.61 11.96 1.41.4.24.52.77.28 1.17zm.1-2.91C14.47 8.32 8.7 8.13 5.37 9.14c-.54.16-1.1-.14-1.26-.68-.16-.54.14-1.1.68-1.26 3.85-1.17 10.22-.95 14.18 1.4.49.29.65.93.36 1.42-.29.48-.93.65-1.43.36z" />
                              </svg>
                            </div>
                          )}
                        </div>

                        {/* Title & Description of Notification matching design */}
                        <div className="text-left">
                          <h4 className="text-xs sm:text-sm font-black text-[#21222D] tracking-tight mb-1">
                            {item.company}
                          </h4>
                          <p className="text-[10.5px] sm:text-xs text-gray-500 font-semibold leading-relaxed">
                            {item.status}
                          </p>
                        </div>

                      </div>
                    </div>

                    {/* Right Timeline Connector exactly replicating screenshot layout */}
                    <div className="w-[145px] sm:w-[170px] shrink-0 flex items-center gap-3.5 relative min-h-[76px] pl-2 select-none">
                      {/* Vertical continuous gray connector timeline line */}
                      {filteredItems.length > 1 && (
                        <div className={`absolute left-[15px] w-[1.5px] bg-[#d5d5db] ${lineStyle}`} />
                      )}
                      
                      {/* Central hollow connection ring */}
                      <div className="w-3.5 h-3.5 rounded-full border-2 border-[#b5b5be] bg-white z-10 shrink-0" />
                      
                      {/* Time stamp */}
                      <span className="text-[10px] text-gray-400 font-sans font-bold whitespace-nowrap">
                        {item.time}
                      </span>
                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>

        {/* Back navigation button row of the notifications block */}
        <div className="mt-10 pt-6 border-t border-gray-100 flex justify-between items-center">
          <button
            onClick={onBack}
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-gray-700 text-xs font-bold rounded-xl transition-all border-0 cursor-pointer flex items-center gap-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Dashboard
          </button>
          
          <button
            onClick={() => onNavigateToView("dashboard")}
            className="text-xs text-indigo-600 hover:text-indigo-800 font-bold bg-transparent border-0 cursor-pointer"
          >
            Access Main Portal
          </button>
        </div>

      </div>

    </div>
  );
}
