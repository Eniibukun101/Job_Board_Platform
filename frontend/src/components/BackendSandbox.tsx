import React, { useState, useEffect } from "react";
import {
  Terminal,
  Database,
  Code2,
  Activity,
  Minimize2,
  Maximize2,
  CheckCircle,
  Trash2,
  Sparkles,
  Layers,
  FileCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { apiService } from "../lib/api";

export default function BackendSandbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "logs" | "database" | "codes" | "branches"
  >("logs");

  // Real-time fetched diagnostic states from Express server
  const [logs, setLogs] = useState<any[]>([]);
  const [liveJobs, setLiveJobs] = useState<any[]>([]);
  const [isLive, setIsLive] = useState(false);
  const [diagnosticsUrl, setDiagnosticsUrl] = useState<string>(
    "/api/diagnostics/stats",
  );

  // Fetch stats and logs from live server
  const fetchLogsAndStats = async () => {
    try {
      const stats = await apiService.getDiagnosticsStats();
      if (stats) {
        setIsLive(true);
        setLogs(stats.logs || []);
        setLiveJobs(stats.jobsDB || []);
      } else {
        setIsLive(false);
      }
    } catch (e) {
      setIsLive(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchLogsAndStats();

    // Poll logs every 2 seconds for active developer response feel
    const interval = setInterval(fetchLogsAndStats, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleClearLogs = async () => {
    await apiService.clearDiagnosticsLogs();
    setLogs([]);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 font-sans tracking-tight antialiased">
      {/* Floating Pill Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`shadow-2xl rounded-full px-5 py-3 flex items-center gap-2 cursor-pointer transition-colors border ${
          isLive
            ? "bg-[#1e2030] text-emerald-400 border-emerald-500/30"
            : "bg-slate-900 text-amber-400 border-amber-500/30"
        }`}
        id="backend-sandbox-launcher"
      >
        <span className="relative flex h-3 w-3 shrink-0">
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
              isLive ? "bg-emerald-400" : "bg-amber-400"
            }`}
          />
          <span
            className={`relative inline-flex rounded-full h-3 w-3 ${
              isLive ? "bg-emerald-500" : "bg-amber-500"
            }`}
          />
        </span>
        <span className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-1.5">
          Backend Integration Desk
        </span>
        {isOpen ? (
          <Minimize2 className="w-3.5 h-3.5 text-gray-400" />
        ) : (
          <Maximize2 className="w-3.5 h-3.5 text-gray-400" />
        )}
      </motion.button>

      {/* Floating Dialog Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute right-0 bottom-14 w-[92vw] sm:w-[540px] md:w-[620px] bg-[#141521] border border-slate-800/80 rounded-[2rem] shadow-2xl flex flex-col overflow-hidden h-[510px]"
          >
            {/* Header Block */}
            <div className="bg-[#1b1c2e] p-5 border-b border-slate-800/65 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] bg-indigo-500/20 text-indigo-300 font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider font-mono">
                    Express + Vite Runtime
                  </span>
                  <span className="text-[10px] bg-slate-800 text-emerald-400 font-mono px-2 py-0.5 rounded-full">
                    Port 3000
                  </span>
                </div>
                <h3 className="text-sm font-black text-white mt-1.5 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-emerald-400" />
                  Developer API Sandbox Console
                </h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 px-2.5 bg-slate-800/50 hover:bg-slate-800 text-gray-400 hover:text-white text-xs font-bold rounded-lg border-0 cursor-pointer"
              >
                Hide
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex bg-[#12131f] border-b border-slate-800/40 p-2 gap-1 overflow-x-auto">
              <button
                onClick={() => setActiveTab("logs")}
                className={`py-2 px-3.5 rounded-xl text-[11px] font-extrabold uppercase tracking-wider cursor-pointer border-0 transition-all flex items-center gap-1.5 shrink-0 ${
                  activeTab === "logs"
                    ? "bg-[#1b1c2e] text-emerald-400 font-black shadow-xs"
                    : "bg-transparent text-gray-400 hover:text-white"
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                Live HTTP Logs ({logs.length})
              </button>
              <button
                onClick={() => setActiveTab("database")}
                className={`py-2 px-3.5 rounded-xl text-[11px] font-extrabold uppercase tracking-wider cursor-pointer border-0 transition-all flex items-center gap-1.5 shrink-0 ${
                  activeTab === "database"
                    ? "bg-[#1b1c2e] text-indigo-400 font-black shadow-xs"
                    : "bg-transparent text-gray-400 hover:text-white"
                }`}
              >
                <Database className="w-3.5 h-3.5" />
                In-Memory DB ({liveJobs.length} Jobs)
              </button>
              <button
                onClick={() => setActiveTab("codes")}
                className={`py-2 px-3.5 rounded-xl text-[11px] font-extrabold uppercase tracking-wider cursor-pointer border-0 transition-all flex items-center gap-1.5 shrink-0 ${
                  activeTab === "codes"
                    ? "bg-[#1b1c2e] text-sky-400 font-black shadow-xs"
                    : "bg-transparent text-gray-400 hover:text-white"
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                Frontend integration
              </button>
              <button
                onClick={() => setActiveTab("branches")}
                className={`py-2 px-3.5 rounded-xl text-[11px] font-extrabold uppercase tracking-wider cursor-pointer border-0 transition-all flex items-center gap-1.5 shrink-0 ${
                  activeTab === "branches"
                    ? "bg-[#1b1c2e] text-amber-400 font-black shadow-xs"
                    : "bg-transparent text-gray-400 hover:text-white"
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                Git branches (UI/UX)
              </button>
            </div>

            {/* Main Content Area */}
            <div className="flex-grow p-5 overflow-y-auto text-left bg-[#0e0f17]">
              {/* TAB 1: HTTP logs */}
              {activeTab === "logs" && (
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] text-gray-500 font-mono">
                      LISTENS TO INCOMING FRONTEND REQUESTS LOCALLY AND
                      DYNAMICALLY
                    </span>
                    {logs.length > 0 && (
                      <button
                        onClick={handleClearLogs}
                        className="text-[10px] font-bold text-rose-400 hover:text-rose-500 flex items-center gap-1 bg-transparent border-0 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                        Clear Registry logs
                      </button>
                    )}
                  </div>

                  {logs.length === 0 ? (
                    <div className="py-12 text-center text-slate-500 font-mono space-y-1.5 border border-dashed border-slate-800 rounded-2xl">
                      <Terminal className="w-8 h-8 text-slate-700 mx-auto" />
                      <p className="text-xs font-semibold">
                        No transactions recorded yet in this lifecycle.
                      </p>
                      <p className="text-[10px] text-slate-600">
                        Interact with search features, post positions, or apply
                        to populate entries.
                      </p>
                    </div>
                  ) : (
                    <div className="divide-y divide-slate-800/70 border border-slate-800/80 rounded-2xl overflow-hidden bg-[#11121d] font-mono text-[11px]">
                      {logs.map((log, i) => {
                        const isGet = log.method === "GET";
                        const isPost =
                          log.method === "POST" ||
                          log.method === "PUT" ||
                          log.method === "PATCH";
                        return (
                          <div
                            key={i}
                            className="p-3.5 hover:bg-slate-800/30 transition-all flex items-start gap-3"
                          >
                            <span className="text-gray-600 shrink-0 text-[10px] mt-0.5">
                              {log.timestamp}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-md font-extrabold text-[10px] shrink-0 uppercase tracking-wide ${
                                isGet
                                  ? "bg-emerald-950/40 text-emerald-400 border border-emerald-900/30"
                                  : "bg-sky-950/40 text-sky-450 border border-sky-900/30"
                              }`}
                            >
                              {log.method}
                            </span>
                            <div className="flex-grow min-w-0">
                              <p className="font-extrabold text-slate-200 truncate">
                                {log.path}
                              </p>
                              {log.payload && (
                                <p className="text-[10px] text-indigo-300 font-semibold truncate mt-1">
                                  Payload: {log.payload}
                                </p>
                              )}
                            </div>
                            <span
                              className={`px-1.5 py-0.5 rounded text-[10px] font-mono shrink-0 font-extrabold ${
                                log.status < 300
                                  ? "bg-emerald-500/10 text-emerald-400"
                                  : "bg-rose-500/10 text-rose-400"
                              }`}
                            >
                              {log.status}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: In-Memory Database */}
              {activeTab === "database" && (
                <div className="space-y-4">
                  <div className="p-4 bg-indigo-950/20 border border-indigo-900/40 rounded-2xl">
                    <h4 className="text-xs font-black text-indigo-300 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      Dynamic Synchronized Mock Datastore
                    </h4>
                    <p className="text-[11px] text-indigo-200 mt-1 leading-relaxed">
                      This represents the active workspace memory database.
                      Changes submitted by applicants (resumes, candidate
                      details) & employer edits (job titles, salaries) save
                      instantly to this tree.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-black block">
                      Live In-Memory Jobs Table Payload (.json dump)
                    </span>
                    <div className="bg-[#11121d] rounded-2xl border border-slate-800 p-4 font-mono text-xs overflow-x-auto max-h-[220px] text-gray-300 text-left">
                      <pre className="text-[10px] leading-tight">
                        {JSON.stringify(liveJobs, null, 2)}
                      </pre>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: Frontend integration guide */}
              {activeTab === "codes" && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h4 className="text-xs font-black text-white flex items-center gap-1.5">
                      <FileCheck className="w-4 h-4 text-sky-400" />
                      Ready to Connect Frontend Layer
                    </h4>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Give your team this snippet so they can inspect how we
                      wired up the React components with the stateful server
                      endpoints easily:
                    </p>
                  </div>

                  {/* Code block style */}
                  <div className="bg-[#11121d] rounded-2xl border border-slate-800 p-4 font-mono text-[10px] leading-relaxed select-all max-h-[240px] text-emerald-400 overflow-y-auto">
                    <pre>{`// Front-end state sync pattern (from src/App.tsx)
import { apiService } from "./lib/api";

function MyCareersBoard() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    // 1. Live Fetch from Node Server
    apiService.getJobs()
      .then(dbJobs => setJobs(dbJobs))
      .catch(err => console.error("Database offline"));
  }, []);

  const handleApply = async (jobId, cv) => {
    // 2. Transmit Application payload to Express
    const result = await apiService.applyToJob({
      jobId,
      candidateName: "Sarah Hammond",
      candidateEmail: "sarah@gmail.com",
      resumeName: cv
    });
    alert("Application successfully logged on DB!");
  };
}`}</pre>
                  </div>
                </div>
              )}

              {/* TAB 4: Git branches recreation */}
              {activeTab === "branches" && (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-black text-white">
                      Your Team&rsquo;s Branches
                    </h4>
                    <p className="text-xs text-gray-400 leading-normal mt-0.5">
                      Below is what they currently have. Our implementation here
                      is designed to immediately connect `feature/backend-api`
                      and `feature/user-model` branches.
                    </p>
                  </div>

                  <div className="divide-y divide-slate-800/50 bg-[#11121d] rounded-2xl border border-slate-800 overflow-hidden font-mono text-[11px]">
                    <div className="p-3.5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span className="font-extrabold text-slate-200">
                          main
                        </span>
                        <span className="text-[9px] bg-slate-800 py-0.5 px-2 rounded-full text-slate-400 font-extrabold font-mono text-center">
                          Default
                        </span>
                      </div>
                      <span className="text-gray-500 text-[10px]">
                        Activated with Express Integration
                      </span>
                    </div>

                    <div className="p-3.5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                        <span className="font-extrabold text-indigo-300">
                          feature/backend-api
                        </span>
                      </div>
                      <span className="text-indigo-400 text-[10px] font-bold">
                        READY TO DEPLOY / FULLY ALIGNED
                      </span>
                    </div>

                    <div className="p-3.5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                        <span className="font-extrabold text-sky-300">
                          feature/user-model
                        </span>
                      </div>
                      <span className="text-sky-400 text-[10px]">
                        MAPPED TO CandidateAuth / EmployerAuth
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sticky Diagnostics Footer */}
            <div className="bg-[#161725] p-3.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-gray-400 px-5 shrink-0">
              <span className="flex items-center gap-1.5 font-bold font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                REST Proxy: active
              </span>
              <span className="font-mono text-[10px]">
                Endpoint base: <strong className="text-gray-200">/api/</strong>
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
