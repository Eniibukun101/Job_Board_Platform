'use client'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  return (
    <div className="min-h-screen bg-[#11121c] text-white flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-5xl font-black tracking-tight mb-4">JobNest</h1>
      <p className="text-gray-400 text-lg max-w-xl mb-10">
        Connect with top employers and discover opportunities that match your career goals.
      </p>
      <div className="flex gap-4">
        <button onClick={() => router.push('/login')} className="px-8 py-3 bg-white text-[#11121c] font-bold rounded-full hover:bg-gray-100 transition">
          Sign in
        </button>
        <button onClick={() => router.push('/signup')} className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-[#11121c] transition">
          Get started
        </button>
      </div>
    </div>
  )
}