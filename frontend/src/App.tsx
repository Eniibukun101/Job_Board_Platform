"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Job, Application, DashboardNotification, Interview } from "./types";
import { INITIAL_JOBS } from "./data/jobData";
import {
  type ApiApplication,
  type ApiInterview,
  type ApiJob,
  type ApiNotification,
  type AuthUser,
  applyToJob,
  createInterviewEntry,
  createJobListing,
  deleteInterviewEntry,
  deleteJobListing,
  getCurrentUser,
  getEmployerListings,
  getJobApplications,
  getMyApplications,
  getMyInterviews,
  getMyNotifications,
  getPublicJobs,
  getSavedJobs,
  saveJobForUser,
  unsaveJobForUser,
  updateCurrentUserProfile,
  updateInterviewEntry,
  updateJobApplicationStatus,
  updateJobListing,
} from "@/lib/api";
import { clearStoredAuth, getStoredAuth, updateStoredUser } from "@/lib/auth";
import Header from "./components/Header";
import Hero from "./components/Hero";
import DoubleBanners from "./components/DoubleBanners";
import Categories from "./components/Categories";
import Partners from "./components/Partners";
import JobsHorizontalScroll from "./components/JobsHorizontalScroll";
import Newsletter from "./components/Newsletter";
import { X, Upload, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import DashboardPortal from "./components/DashboardPortal";
import EmployerPortal from "./components/EmployerPortal";
import ProfilePage from "./components/ProfilePage";
import JobDetailPage from "./components/JobDetailPage";
import NotificationsPage from "./components/NotificationsPage";

type AppView =
  | "home"
  | "dashboard"
  | "employer"
  | "login"
  | "profile"
  | "job-details"
  | "notifications";

interface AppProps {
  initialView?: AppView;
  initialSelectedJobId?: string;
}

const ROUTES_BY_VIEW: Record<Exclude<AppView, "login">, string> = {
  home: "/",
  dashboard: "/portal/dashboard",
  employer: "/portal/employer",
  profile: "/portal/profile",
  "job-details": "/portal/job-details",
  notifications: "/portal/notifications",
};

const DEFAULT_PROFILE = {
  name: "",
  email: "",
  phone: "",
  location: "",
  aboutMe: "",
  skills: [] as string[],
  linkedin: "",
  portfolio: "",
  experiences: [] as Array<{
    title: string;
    location: string;
    company: string;
  }>,
};

function getLogoBg(company: string) {
  const normalized = company.toLowerCase();
  if (normalized.includes("google")) return "bg-red-500 text-white";
  if (normalized.includes("supabase")) return "bg-emerald-950 text-emerald-400";
  if (normalized.includes("vercel")) return "bg-black text-white";
  if (normalized.includes("figma")) return "bg-rose-500 text-white";
  if (normalized.includes("stripe")) return "bg-blue-600 text-white";
  return "bg-[#21222D] text-white";
}

function formatSalary(min?: number | null, max?: number | null) {
  if (min && max) return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
  if (min) return `From $${min.toLocaleString()}`;
  if (max) return `Up to $${max.toLocaleString()}`;
  return "Not specified";
}

function parseSalaryRange(salary: string) {
  const values = salary
    .match(/\d[\d,]*/g)
    ?.map((value) => Number(value.replace(/,/g, "")));

  if (!values?.length) {
    return { salaryMin: null, salaryMax: null };
  }

  return {
    salaryMin: values[0] ?? null,
    salaryMax: values[1] ?? values[0] ?? null,
  };
}

function formatPostedTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Posted recently";

  const diffHours = Math.max(
    1,
    Math.round((Date.now() - date.getTime()) / (1000 * 60 * 60)),
  );

  if (diffHours < 24)
    return `Posted ${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  const diffDays = Math.round(diffHours / 24);
  return `Posted ${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
}

function mapBackendStatusToUi(status: ApiApplication["status"]) {
  switch (status) {
    case "Pending":
      return "Submitted";
    case "Reviewed":
      return "Reviewing";
    case "Shortlisted":
      return "Interview Scheduled";
    case "Hired":
      return "Offered";
    case "Rejected":
    default:
      return "Rejected";
  }
}

function mapUiStatusToBackend(status: string): ApiApplication["status"] {
  switch (status) {
    case "Submitted":
      return "Pending";
    case "Reviewing":
      return "Reviewed";
    case "Interview Scheduled":
      return "Shortlisted";
    case "Offered":
      return "Hired";
    case "Rejected":
    default:
      return "Rejected";
  }
}

function mapBackendJobToUi(job: ApiJob): Job {
  return {
    id: String(job.id),
    title: job.title,
    company: job.company,
    logoBg: getLogoBg(job.company),
    location: job.location,
    type: job.jobType,
    salary: formatSalary(job.salaryMin, job.salaryMax),
    description: job.description,
    postedTime: formatPostedTime(job.createdAt),
    category: job.category || "developer-software",
    applicants: job.applications?.length || 0,
    experienceLevel:
      job.experience === "Entry"
        ? "Junior"
        : job.experience === "Mid"
          ? "Mid"
          : "Senior",
  };
}

function mapBackendApplicationToUi(app: ApiApplication): Application {
  return {
    id: String(app.id),
    jobId: String(app.jobId),
    candidateName: app.applicant?.name || "Applicant",
    candidateEmail: app.applicant?.email || "",
    resumeName: app.resumeUrl || "Resume submitted",
    appliedAt: app.createdAt.split("T")[0],
    status: mapBackendStatusToUi(app.status),
  };
}

function mapAuthUserToProfile(user: AuthUser) {
  return {
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
    location: user.location || "",
    aboutMe: user.bio || "",
    skills: user.skills || [],
    linkedin: user.linkedin || "",
    portfolio: user.portfolio || "",
    experiences: user.experiences || [],
  };
}

function resolveNotificationTab(createdAt: string) {
  const createdTime = new Date(createdAt).getTime();
  const diff = Date.now() - createdTime;
  const day = 24 * 60 * 60 * 1000;
  if (diff <= day) return "today" as const;
  if (diff <= 7 * day) return "week" as const;
  return "month" as const;
}

function mapBackendNotificationToUi(
  notification: ApiNotification,
): DashboardNotification {
  return {
    id: `notif-${notification.id}`,
    company: notification.company,
    status: notification.message,
    time: new Date(notification.createdAt).toLocaleString(),
    logoType: notification.logoType,
    tab: resolveNotificationTab(notification.createdAt),
  };
}

function mapBackendInterviewToUi(interview: ApiInterview): Interview {
  return {
    id: String(interview.id),
    title: interview.title,
    company: interview.company,
    description: interview.description || "",
    date: interview.date,
    time: interview.time,
    completed: interview.completed,
  };
}

function mapJobToDashboardCard(job: Job, savedJobIds: string[]) {
  return {
    id: job.id,
    title: job.title,
    company: job.company,
    location: job.location,
    type: job.type,
    salary: job.salary,
    saved: savedJobIds.includes(job.id),
  };
}

export default function App({
  initialView = "home",
  initialSelectedJobId,
}: AppProps) {
  const router = useRouter();
  const [currentView, setCurrentView] = useState<AppView>(initialView);
  const [, setLoginMode] = useState<"login" | "create">("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authReady, setAuthReady] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");

  // Unified navigation controller that handles custom login state parameters
  const handleNavigate = (view: AppView, mode?: "login" | "create") => {
    if (view === "login") {
      setLoginMode(mode || "login");
      setCurrentView(view);
      router.push(mode === "create" ? "/signup" : "/login");
      return;
    }

    if (!isLoggedIn) {
      if (view === "employer") {
        router.push("/employer");
        return;
      }

      if (["dashboard", "profile", "notifications"].includes(view)) {
        router.push("/login");
        return;
      }
    }

    setCurrentView(view);
    router.push(ROUTES_BY_VIEW[view]);
  };
  const [pendingApplyJob, setPendingApplyJob] = useState<Job | null>(null);
  const [pendingApplyView, setPendingApplyView] = useState<
    "home" | "job-details" | null
  >(null);
  const [selectedJobForDetails, setSelectedJobForDetails] =
    useState<Job | null>(
      initialSelectedJobId
        ? INITIAL_JOBS.find((job) => job.id === initialSelectedJobId) ||
            INITIAL_JOBS[0]
        : initialView === "job-details"
          ? INITIAL_JOBS[0]
          : null,
    );

  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [isPhotoUploaded, setIsPhotoUploaded] = useState(false);
  const [isCvUploaded, setIsCvUploaded] = useState(false);
  const [isAboutMeCompleted, setIsAboutMeCompleted] = useState(false);

  // Notification Toast triggers
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
  };

  // Real job/application state linked to backend
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);
  const [applications, setApplications] = useState<Application[]>([]);
  const [notifications, setNotifications] = useState<DashboardNotification[]>(
    [],
  );
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);
  const [customActiveJobs, setCustomActiveJobs] = useState<Job[]>([]);

  const syncUserIntoState = (user: AuthUser) => {
    setAuthUser(user);
    setIsLoggedIn(true);
    setProfile(mapAuthUserToProfile(user));
    setProfilePhotoUrl(user.photoUrl || "");
    setResumeUrl(user.resumeUrl || "");
    setIsPhotoUploaded(Boolean(user.photoUrl));
    setIsCvUploaded(Boolean(user.resumeUrl));
    setIsAboutMeCompleted(Boolean((user.bio || "").trim().length > 15));
  };

  const loadPublicJobData = async () => {
    try {
      const response = await getPublicJobs({ limit: 50 });
      const mappedJobs = response.jobs.map(mapBackendJobToUi);
      if (mappedJobs.length > 0) {
        setJobs(mappedJobs);
      }
    } catch (error) {
      console.warn("Unable to load public jobs from backend:", error);
    }
  };

  const loadApplicantData = async (token: string) => {
    try {
      const [
        applicationResponse,
        notificationResponse,
        interviewResponse,
        savedJobsResponse,
      ] = await Promise.all([
        getMyApplications(token),
        getMyNotifications(token),
        getMyInterviews(token),
        getSavedJobs(token),
      ]);

      setApplications(
        applicationResponse.applications.map(mapBackendApplicationToUi),
      );
      setNotifications(
        notificationResponse.notifications.map(mapBackendNotificationToUi),
      );
      setInterviews(interviewResponse.interviews.map(mapBackendInterviewToUi));
      setSavedJobs(savedJobsResponse.jobs.map(mapBackendJobToUi));
    } catch (error) {
      console.warn("Unable to load applicant data:", error);
      setApplications([]);
      setNotifications([]);
      setInterviews([]);
      setSavedJobs([]);
    }
  };

  const loadEmployerData = async (token: string) => {
    try {
      const response = await getEmployerListings(token);
      const mappedJobs = response.jobs.map(mapBackendJobToUi);
      setCustomActiveJobs(mappedJobs);

      const [applicationGroups, notificationResponse] = await Promise.all([
        Promise.all(
          response.jobs.map((job) =>
            getJobApplications(job.id, token).catch(() => ({
              applications: [],
            })),
          ),
        ),
        getMyNotifications(token),
      ]);

      setApplications(
        applicationGroups
          .flatMap((group) => group.applications)
          .map(mapBackendApplicationToUi),
      );
      setNotifications(
        notificationResponse.notifications.map(mapBackendNotificationToUi),
      );
    } catch (error) {
      console.warn("Unable to load employer workspace data:", error);
      setCustomActiveJobs([]);
      setApplications([]);
      setNotifications([]);
    }
  };

  useEffect(() => {
    let isMounted = true;

    async function hydrateApp() {
      await loadPublicJobData();

      const storedAuth = getStoredAuth();
      if (!storedAuth?.token) {
        if (isMounted) {
          setIsLoggedIn(false);
          setAuthReady(true);
        }
        return;
      }

      try {
        const response = await getCurrentUser(storedAuth.token);
        if (!isMounted) return;

        updateStoredUser(response.user);
        setAuthToken(storedAuth.token);
        syncUserIntoState(response.user);

        if (response.user.userType === "Employer") {
          await loadEmployerData(storedAuth.token);
        } else {
          await loadApplicantData(storedAuth.token);
        }
      } catch (error) {
        console.warn("Unable to restore authenticated session:", error);
        clearStoredAuth();
        if (isMounted) {
          setAuthToken(null);
          setAuthUser(null);
          setIsLoggedIn(false);
          setProfile(DEFAULT_PROFILE);
        }
      } finally {
        if (isMounted) {
          setAuthReady(true);
        }
      }
    }

    hydrateApp();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!authReady) return;

    if (!isLoggedIn && currentView === "employer") {
      router.replace("/employer");
      return;
    }

    if (
      !isLoggedIn &&
      ["dashboard", "profile", "notifications"].includes(currentView)
    ) {
      router.replace("/login");
    }
  }, [authReady, currentView, isLoggedIn, router]);

  useEffect(() => {
    if (!initialSelectedJobId) return;

    const selectedJob = [...jobs, ...customActiveJobs].find(
      (job) => job.id === initialSelectedJobId,
    );

    if (selectedJob) {
      setSelectedJobForDetails(selectedJob);
    }
  }, [customActiveJobs, initialSelectedJobId, jobs]);

  useEffect(() => {
    if (!authUser) return;
    setHomeCandidateName((current) => current || authUser.name || "");
    setHomeCandidateEmail((current) => current || authUser.email || "");
  }, [authUser]);

  const persistProfileUpdate = async (
    updates: Partial<{
      name: string;
      email: string;
      phone: string;
      bio: string;
      location: string;
      role: string;
      qualification: string;
      expectedSalaryRange: string;
      preferredJobType: string;
      photoUrl: string;
      resumeUrl: string;
      linkedin: string;
      portfolio: string;
      skills: string[];
      experiences: Array<{ title: string; location: string; company: string }>;
    }>,
  ) => {
    if (!authToken) return;

    const response = await updateCurrentUserProfile(updates, authToken);
    updateStoredUser(response.user);
    syncUserIntoState(response.user);
  };

  // Add a new job posted by the employer to both global and custom tracks
  const handleAddNewJob = async (newJob: Job) => {
    if (!authToken) return;

    try {
      const { salaryMin, salaryMax } = parseSalaryRange(newJob.salary);
      const response = await createJobListing(
        {
          title: newJob.title,
          description: newJob.description,
          company: newJob.company,
          category: newJob.category,
          location: newJob.location,
          salaryMin,
          salaryMax,
          jobType: newJob.type,
          experience:
            newJob.experienceLevel === "Junior"
              ? "Entry"
              : newJob.experienceLevel === "Mid"
                ? "Mid"
                : "Senior",
          skills: [],
        },
        authToken,
      );

      const createdJob = mapBackendJobToUi(response.job);
      setCustomActiveJobs((prev) => [createdJob, ...prev]);
      setJobs((prev) => [createdJob, ...prev]);
    } catch (error) {
      console.error("Could not post job to backend:", error);
    }
  };

  // Delete a job posted by the employer
  const handleDeleteJob = async (jobId: string) => {
    if (!authToken) return;

    try {
      await deleteJobListing(jobId, authToken);
      setJobs((prev) => prev.filter((job) => job.id !== jobId));
      setCustomActiveJobs((prev) => prev.filter((job) => job.id !== jobId));
    } catch (error) {
      console.error("Could not delete job on backend:", error);
    }
  };

  // Update an existing job published by the employer
  const handleUpdateJob = async (updatedJob: Job) => {
    if (!authToken) return;

    try {
      const { salaryMin, salaryMax } = parseSalaryRange(updatedJob.salary);
      const response = await updateJobListing(
        updatedJob.id,
        {
          title: updatedJob.title,
          description: updatedJob.description,
          company: updatedJob.company,
          category: updatedJob.category,
          location: updatedJob.location,
          salaryMin,
          salaryMax,
          jobType: updatedJob.type,
          experience:
            updatedJob.experienceLevel === "Junior"
              ? "Entry"
              : updatedJob.experienceLevel === "Mid"
                ? "Mid"
                : "Senior",
          skills: [],
        },
        authToken,
      );

      const mappedJob = mapBackendJobToUi(response.job);
      setJobs((prev) =>
        prev.map((job) => (job.id === updatedJob.id ? mappedJob : job)),
      );
      setCustomActiveJobs((prev) =>
        prev.map((job) => (job.id === updatedJob.id ? mappedJob : job)),
      );
      if (selectedJobForDetails && selectedJobForDetails.id === updatedJob.id) {
        setSelectedJobForDetails(mappedJob);
      }
    } catch (error) {
      console.error("Could not update job on backend:", error);
    }
  };

  const handleUpdateApplicationStatus = async (
    applicationId: string,
    nextStatus: string,
  ) => {
    if (!authToken) return;

    try {
      const response = await updateJobApplicationStatus(
        applicationId,
        mapUiStatusToBackend(nextStatus),
        authToken,
      );
      setApplications((prev) =>
        prev.map((application) =>
          application.id === applicationId
            ? mapBackendApplicationToUi(response.application)
            : application,
        ),
      );

      if (authUser?.userType === "Applicant") {
        await loadApplicantData(authToken);
      }
      if (authUser?.userType === "Employer") {
        await loadEmployerData(authToken);
      }
    } catch (error) {
      console.error("Could not update application status:", error);
    }
  };

  const handleToggleSavedJob = async (job: Job, shouldSave: boolean) => {
    if (!authToken) {
      router.push("/login");
      return;
    }

    const numericJobId = Number(job.id);
    if (Number.isNaN(numericJobId)) return;

    try {
      if (shouldSave) {
        await saveJobForUser(numericJobId, authToken);
      } else {
        await unsaveJobForUser(numericJobId, authToken);
      }
      await loadApplicantData(authToken);
    } catch (error) {
      console.error("Could not update saved jobs:", error);
    }
  };

  const handleCreateInterview = async (interview: Interview) => {
    if (!authToken) return;

    try {
      await createInterviewEntry(
        {
          company: interview.company,
          title: interview.title,
          description: interview.description,
          date: interview.date,
          time: interview.time,
        },
        authToken,
      );
      await loadApplicantData(authToken);
    } catch (error) {
      console.error("Could not create interview:", error);
    }
  };

  const handleUpdateInterview = async (
    interviewId: string,
    updates: Partial<Interview>,
  ) => {
    if (!authToken) return;

    try {
      await updateInterviewEntry(interviewId, updates, authToken);
      await loadApplicantData(authToken);
    } catch (error) {
      console.error("Could not update interview:", error);
    }
  };

  const handleDeleteInterview = async (interviewId: string) => {
    if (!authToken) return;

    try {
      await deleteInterviewEntry(interviewId, authToken);
      await loadApplicantData(authToken);
    } catch (error) {
      console.error("Could not delete interview:", error);
    }
  };

  // Selected Category (default is Developer/Software, which contains 10 jobs in mock, satisfying >8 horizontal scroll on load!)
  const [selectedCategoryId, setSelectedCategoryId] =
    useState("developer-software");

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
  const [homeCandidateName, setHomeCandidateName] = useState("");
  const [homeCandidateEmail, setHomeCandidateEmail] = useState("");
  const [homeResumeName, setHomeResumeName] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [homeSuccessApply, setHomeSuccessApply] = useState(false);

  const handleHomeApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!homeApplyingJob || !authToken) return;

    const numericJobId = Number(homeApplyingJob.id);
    if (Number.isNaN(numericJobId)) {
      triggerToast(
        "This job is still using mock data and cannot be applied to through the backend yet.",
      );
      return;
    }

    try {
      const response = await applyToJob(
        numericJobId,
        {
          resumeUrl: homeResumeName || resumeUrl || "Resume submitted",
        },
        authToken,
      );

      setJobs((prev) =>
        prev.map((job) =>
          job.id === homeApplyingJob.id
            ? { ...job, applicants: job.applicants + 1 }
            : job,
        ),
      );
      setApplications((prev) => [
        mapBackendApplicationToUi(response.application),
        ...prev,
      ]);
      setHomeSuccessApply(true);
      setTimeout(() => {
        setHomeSuccessApply(false);
        setHomeApplyingJob(null);
        setHomeResumeName("");
      }, 2500);
    } catch (error) {
      console.warn("Unable to submit application:", error);
    }
  };

  const handleJobDetailApplySubmit = async (
    jobToApply: Job,
    cvFileName: string,
  ) => {
    if (!authToken) {
      router.push("/login");
      return;
    }

    const numericJobId = Number(jobToApply.id);
    if (Number.isNaN(numericJobId)) {
      triggerToast(
        "This job is still using mock data and cannot be applied to through the backend yet.",
      );
      return;
    }

    try {
      const response = await applyToJob(
        numericJobId,
        { resumeUrl: cvFileName || resumeUrl || "Resume submitted" },
        authToken,
      );

      setJobs((prev) =>
        prev.map((job) =>
          job.id === jobToApply.id
            ? { ...job, applicants: job.applicants + 1 }
            : job,
        ),
      );
      setApplications((prev) => [
        mapBackendApplicationToUi(response.application),
        ...prev,
      ]);
      triggerToast(
        `Successfully applied to ${jobToApply.title} at ${jobToApply.company}!`,
      );
    } catch (error) {
      console.warn("Unable to submit job application:", error);
      triggerToast("Unable to submit your application right now.");
    }
  };

  // Apply inputs and filters
  const filteredSuggestedJobs = jobs.filter((job) => {
    // Category check
    const matchesCategory = job.category === selectedCategoryId;

    // Search keyword check (supports both real-time typing and submitted terms)
    const currentKeyword = searchTerm || activeSearchTerm;
    const matchesKeyword =
      !currentKeyword ||
      job.title.toLowerCase().includes(currentKeyword.toLowerCase()) ||
      job.company.toLowerCase().includes(currentKeyword.toLowerCase()) ||
      job.description.toLowerCase().includes(currentKeyword.toLowerCase());

    // Location search check
    const currentLoc = locationSearch || activeLocationSearch;
    const matchesLocation =
      !currentLoc ||
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
          clearStoredAuth();
          setAuthToken(null);
          setAuthUser(null);
          setIsLoggedIn(false);
          setProfile(DEFAULT_PROFILE);
          setProfilePhotoUrl("");
          setResumeUrl("");
          handleNavigate("home");
        }}
        profileName={profile.name || authUser?.name || "Guest"}
        profileRole={authUser?.role || authUser?.userType || "Guest"}
        isPhotoUploaded={isPhotoUploaded}
        photoUrl={profilePhotoUrl}
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
                  handleNavigate("login");
                } else {
                  setSelectedJobForDetails(job);
                  router.push(
                    `/portal/job-details?jobId=${encodeURIComponent(job.id)}`,
                  );
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
              userName={profile.name || authUser?.name || "there"}
              jobs={jobs}
              onNavigateToProfile={() => handleNavigate("profile")}
              profileCompletePercent={
                45 +
                (isPhotoUploaded ? 5 : 0) +
                (isAboutMeCompleted ? 30 : 0) +
                (isCvUploaded ? 20 : 0)
              }
              onSelectJob={(job) => {
                setSelectedJobForDetails(job);
                router.push(
                  `/portal/job-details?jobId=${encodeURIComponent(job.id)}`,
                );
              }}
              onNavigateToNotifications={() => handleNavigate("notifications")}
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
              onBackToHome={() => handleNavigate("dashboard")}
              profile={profile}
              setProfile={setProfile}
              isPhotoUploaded={isPhotoUploaded}
              setIsPhotoUploaded={setIsPhotoUploaded}
              isCvUploaded={isCvUploaded}
              setIsCvUploaded={setIsCvUploaded}
              isAboutMeCompleted={isAboutMeCompleted}
              setIsAboutMeCompleted={setIsAboutMeCompleted}
              photoUrl={profilePhotoUrl}
              onPersistProfileUpdate={persistProfileUpdate}
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
              jobs={customActiveJobs}
              onAddNewJob={handleAddNewJob}
              onDeleteJob={handleDeleteJob}
              onUpdateJob={handleUpdateJob}
              applications={applications}
              setApplications={setApplications}
              notifications={notifications}
              setNotifications={setNotifications}
              interviews={interviews}
              setInterviews={setInterviews}
              onUpdateApplicationStatus={handleUpdateApplicationStatus}
              onNavigate={handleNavigate}
              onLogOutEmployer={() => {
                clearStoredAuth();
                setAuthToken(null);
                setAuthUser(null);
                setIsLoggedIn(false);
                setProfile(DEFAULT_PROFILE);
                setProfilePhotoUrl("");
                setResumeUrl("");
                handleNavigate("home");
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
                  handleNavigate("dashboard");
                } else {
                  handleNavigate("home");
                }
              }}
              onNavigateToView={handleNavigate}
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
                  handleNavigate("dashboard");
                } else {
                  handleNavigate("home");
                }
              }}
              onNavigateToView={handleNavigate}
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
                  <h3 className="text-xl font-black text-[#212230] tracking-tight">
                    Application Transmitted!
                  </h3>
                  <p className="text-xs text-gray-400 mt-2 leading-relaxed px-2">
                    Your resume has been successfully sent to{" "}
                    <strong className="text-gray-900">
                      {homeApplyingJob.company}
                    </strong>
                    . You can monitor your application timeline inside the{" "}
                    <strong>Dashboard Portal</strong>.
                  </p>
                </div>
              ) : (
                <div className="py-2 text-center sm:text-left">
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-black text-[#212230] tracking-tight">
                      Join the team at {homeApplyingJob.company}
                    </h3>
                    <p className="text-xs text-gray-400 font-semibold">
                      Applying for position:{" "}
                      <span className="text-[#212230] font-bold">
                        {homeApplyingJob.title}
                      </span>{" "}
                      ({homeApplyingJob.location})
                    </p>
                  </div>

                  <form
                    onSubmit={handleHomeApplySubmit}
                    className="space-y-4 text-left"
                  >
                    <div>
                      <label className="text-[10px] text-gray-400 uppercase tracking-widest font-extrabold block mb-1">
                        Full Name
                      </label>
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
                      <label className="text-[10px] text-gray-400 uppercase tracking-widest font-extrabold block mb-1">
                        Email address
                      </label>
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
                      <label className="text-[10px] text-gray-400 uppercase tracking-widest font-extrabold block mb-1">
                        Resume / CV (Drag & Drop or click)
                      </label>

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
                          isDragging
                            ? "border-[#212230] bg-gray-50 scale-[1.01]"
                            : "border-gray-200 hover:border-gray-300 bg-white"
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
                        <label
                          htmlFor="apply-modal-file-picker"
                          className="cursor-pointer block"
                        >
                          {homeResumeName ? (
                            <div className="flex flex-col items-center justify-center py-2 animate-fade-in">
                              <CheckCircle className="w-8 h-8 text-emerald-500 mb-2" />
                              <p className="text-xs font-bold text-gray-800 break-all">
                                {homeResumeName}
                              </p>
                              <p className="text-[9px] text-gray-400 mt-1 uppercase tracking-widest font-mono">
                                Click to change resume file
                              </p>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center py-2">
                              <Upload className="w-8 h-8 text-gray-400 mb-2 animate-pulse" />
                              <p className="text-xs font-bold text-gray-750">
                                Drag and drop CV here, or browse files
                              </p>
                              <p className="text-[9px] text-gray-400 mt-1 uppercase tracking-widest font-mono">
                                DOCX, PDF (MAX. 5MB)
                              </p>
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
            <span className="text-xs font-bold leading-normal tracking-tight">
              {toastMessage}
            </span>
            <button
              onClick={() => setToastMessage(null)}
              className="ml-3 text-[10px] font-bold text-gray-400 hover:text-white uppercase transition-colors border-0 bg-transparent p-0 cursor-pointer"
            >
              dismiss
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
