"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f8fafc] px-6 text-center text-[#11121c] dark:bg-[#11121c] dark:text-white">
      <h1 className="mb-4 text-5xl font-black tracking-tight">JobNest</h1>
      <p className="mb-10 max-w-xl text-lg text-gray-600 dark:text-gray-400">
        Connect with top employers and discover opportunities that match your
        career goals.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => router.push("/login")}
          className="rounded-full border-2 border-[#11121c] bg-[#11121c] px-8 py-3 font-bold text-white transition-all duration-200 hover:bg-transparent hover:text-[#11121c] active:scale-95 dark:border-white dark:bg-white dark:text-[#11121c] dark:hover:bg-transparent dark:hover:text-white"
        >
          Sign in
        </button>
        <button
          onClick={() => router.push("/get-started")}
          className="rounded-full border-2 border-[#11121c] bg-transparent px-8 py-3 font-bold text-[#11121c] transition-all duration-200 hover:bg-[#11121c] hover:text-white active:scale-95 dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-[#11121c]"
        >
          Get started
        </button>
      </div>
    </div>
  );
}
