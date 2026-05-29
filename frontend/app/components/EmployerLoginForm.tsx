"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function EmployerLoginForm() {
  const [companyName, setCompanyName] = useState('')
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 900)
  }

  const handleGoogle = () => {
    // placeholder for Google sign-in
  }

  return (
    <div className="flex min-h-full w-full items-center">
      <div className="w-full max-w-[460px] lg:max-w-[510px]">
        <h1 className="text-2xl font-extrabold text-black sm:text-3xl">Already back</h1>
        <p className="mt-9 max-w-[430px] text-sm leading-5 text-gray-500">
          Welcome back, Employer. Manage job postings, review applications, and discover top talent all in one place.
        </p>

        <form onSubmit={handleSubmit} className="mt-12 space-y-8">
          <label htmlFor="companyName" className="sr-only">
            Company name
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 flex -translate-y-1/2 items-center">
              <Image src="/companynameicon.jpeg" alt="" width={23} height={18} />
            </span>
            <input
              id="companyName"
              value={companyName}
              onChange={(event) => setCompanyName(event.target.value)}
              placeholder="Company name"
              className="h-10 w-full rounded-[8px] border border-[#1f2430] bg-white pl-14 pr-4 text-sm text-gray-900 outline-none transition-colors placeholder:text-[11px] placeholder:text-gray-500 focus:border-accent"
              required
            />
          </div>

          <label htmlFor="companyEmail" className="sr-only">
            Company email
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 flex -translate-y-1/2 items-center">
              <Image src="/emailicon.jpeg" alt="" width={23} height={18} />
            </span>
            <input
              id="companyEmail"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Company email"
              className="h-10 w-full rounded-[8px] border border-[#1f2430] bg-white pl-14 pr-4 text-sm text-gray-900 outline-none transition-colors placeholder:text-[11px] placeholder:text-gray-500 focus:border-accent"
              required
            />
          </div>

          <div className="flex justify-center pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="flex h-11 w-full max-w-[260px] items-center justify-center rounded-[8px] bg-[#20212b] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#2c2d39] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>

        <div className="mx-auto mt-14 flex w-full max-w-[260px] items-center gap-2">
          <div className="h-px flex-1 bg-gray-300" />
          <span className="text-[11px] font-medium text-gray-400">or sign in with</span>
          <div className="h-px flex-1 bg-gray-300" />
        </div>

        <button
          type="button"
          onClick={handleGoogle}
          className="mx-auto mt-9 flex h-11 w-full max-w-[260px] items-center justify-center gap-2 rounded-[8px] bg-white text-[11px] font-medium text-gray-600 shadow-[0_4px_8px_rgba(0,0,0,0.22)] transition-transform hover:-translate-y-0.5"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
            alt=""
            className="h-4 w-4"
          />
          Continue with Google
        </button>

        <p className="mt-8 text-center text-[11px] font-semibold text-gray-300">
          Don&apos;t have an account?{' '}
          <Link href="/company-signup" className="text-accent hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
