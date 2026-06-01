import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JobNest - Find Your Next Opportunity",
  description:
    "Connect with employers and discover opportunities that match your career goals.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="max-w-full overflow-x-hidden bg-gray-50 dark:bg-[#11121c]">
        {children}
      </body>
    </html>
  );
}
