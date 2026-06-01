import Link from "next/link";

const links = [
  { href: "/", label: "Home landing" },
  { href: "/portal/dashboard", label: "Dashboard portal" },
  { href: "/portal/profile", label: "Profile page" },
  { href: "/portal/notifications", label: "Notifications page" },
  { href: "/portal/job-details", label: "Job details page" },
  { href: "/portal/job-details?jobId=dev-1", label: "Job details (Senior Full Stack Engineer)" },
  { href: "/portal/employer", label: "Employer workspace" },
  { href: "/login", label: "Applicant login" },
  { href: "/signup", label: "Applicant signup" },
  { href: "/employer", label: "Employer login" },
];

export default function PortalIndexPage() {
  return (
    <main className="min-h-screen bg-[#f4f5f7] px-6 py-12 text-gray-900">
      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-sm border border-gray-100">
        <h1 className="text-3xl font-black tracking-tight text-[#21222D]">
          JobNest Pages
        </h1>
        <p className="mt-3 text-sm text-gray-600">
          These routes link the preserved homepage, dashboard, profile,
          notifications, employer workspace, and auth pages together so you can
          open each screen directly while developing locally.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-semibold text-[#21222D] transition hover:border-[#21222D] hover:bg-white"
            >
              {link.label}
              <span className="mt-1 block text-xs font-mono text-gray-500">
                {link.href}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
