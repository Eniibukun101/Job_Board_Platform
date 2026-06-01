import Image from "next/image";
import { Home, Mail, User } from "lucide-react";

interface HeaderProps {
  currentView?:
    | "home"
    | "dashboard"
    | "employer"
    | "login"
    | "profile"
    | "job-details"
    | "notifications";
  onNavigate?: (
    view:
      | "home"
      | "dashboard"
      | "employer"
      | "login"
      | "profile"
      | "job-details"
      | "notifications",
    mode?: "login" | "create",
  ) => void;
  isLoggedIn?: boolean;
  onLogOut?: () => void;
  profileName?: string;
  profileRole?: string;
  isPhotoUploaded?: boolean;
  photoUrl?: string;
}

export default function Header({
  onNavigate,
  isLoggedIn = false,
  profileName = "Daniel Adeyemi",
  profileRole = "Freelancer",
  isPhotoUploaded = false,
  photoUrl = "",
}: HeaderProps = {}) {
  return (
    <header className="sticky top-0 z-40 bg-[#f2f2f2] px-6 py-4">
      <div className="mx-auto flex max-w-[1260px] items-center justify-between">
        <button
          type="button"
          onClick={() => onNavigate?.("home")}
          className="flex items-center border-0 bg-transparent p-0"
          aria-label="Go to homepage"
        >
          <Image
            src="/logo.jpeg"
            alt="Jobnest"
            width={108}
            height={36}
            priority
            className="h-8 w-auto object-contain"
          />
        </button>

        {isLoggedIn ? (
          <div className="hidden items-center gap-3 md:flex">
            {isPhotoUploaded && photoUrl ? (
              <img
                src={photoUrl}
                alt={profileName}
                className="h-11 w-11 rounded-full object-cover"
              />
            ) : (
              <div className="h-11 w-11 rounded-full bg-gray-300" />
            )}
            <div className="leading-none">
              <p className="text-xs font-bold text-[#20212b]">{profileName}</p>
              <p className="mt-1 text-[10px] font-medium text-gray-500">
                {profileRole}
              </p>
            </div>
          </div>
        ) : (
          <div className="hidden items-center gap-3 md:flex">
            <button
              type="button"
              onClick={() => window.location.assign("/login")}
              className="rounded-full px-5 py-2 text-sm font-bold text-[#20212b] transition-all hover:bg-[#20212b] hover:text-white hover:shadow-md"
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={() => window.location.assign("/get-started")}
              className="rounded-full bg-[#20212b] px-5 py-2 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#30313d] hover:shadow-md"
            >
              Get started
            </button>
          </div>
        )}

        <nav className="flex items-center gap-5 text-[#20212b]" aria-label="Quick links">
          <button
            type="button"
            onClick={() => onNavigate?.("home")}
            className="border-0 bg-transparent p-0 transition-transform hover:-translate-y-0.5"
            aria-label="Home"
          >
            <Home className="h-6 w-6 fill-[#20212b]" />
          </button>
          <button
            type="button"
            onClick={() => onNavigate?.("profile")}
            className="border-0 bg-transparent p-0 transition-transform hover:-translate-y-0.5"
            aria-label="Profile"
          >
            <User className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={() => onNavigate?.("notifications")}
            className="border-0 bg-transparent p-0 transition-transform hover:-translate-y-0.5"
            aria-label="Messages"
          >
            <Mail className="h-6 w-6 fill-[#20212b]" />
          </button>
        </nav>
      </div>
    </header>
  );
}
