'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function SignUpForm() {
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  const handleGoogleSignUp = () => {
    // Google sign up logic
  }

  return (
    <>
      <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">Create Account</h2>
      <p className="text-gray-600 text-sm mb-8">
        Be part of a professional network designed to make job searching simple, modern, and accessible.
      </p>
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">{error}</div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="sr-only">Email address</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Image src="/emailicon.jpeg" alt="Email Icon" width={16} height={16} />
            </span>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full pl-12 pr-4 py-3 border border-gray-400 rounded-lg focus:outline-none focus:border-primary transition-colors"
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="fullname" className="sr-only">Full Name</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" stroke="#888" strokeWidth="2"/><path d="M4 20c0-2.21 3.58-4 8-4s8 1.79 8 4" stroke="#888" strokeWidth="2"/></svg>
            </span>
            <input
              id="fullname"
              type="text"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              placeholder="Full Name"
              className="w-full pl-12 pr-4 py-3 border border-gray-400 rounded-lg focus:outline-none focus:border-primary transition-colors"
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="password" className="sr-only">Password</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Image src="/passwordicon.jpeg" alt="Password Icon" width={16} height={16} />
            </span>
            <button
              type="button"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              onClick={() => setShowPassword((value) => !value)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary"
            >
              {showPassword ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                  <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c6.5 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                  <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3.5 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                  <line x1="4" x2="20" y1="4" y2="20" />
                </svg>
              )}
            </button>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full pl-12 pr-12 py-3 border border-gray-400 rounded-lg focus:outline-none focus:border-primary transition-colors"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary hover:bg-opacity-90 text-white font-semibold py-3 rounded-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-2"
        >
          {isLoading ? 'Creating account...' : 'Sign up'}
        </button>
      </form>
      <div className="flex items-center gap-4 my-6">
        <div className="flex-1 h-px bg-gray-200"></div>
        <span className="text-gray-500 text-sm">or sign in with</span>
        <div className="flex-1 h-px bg-gray-200"></div>
      </div>
      <button
        type="button"
        onClick={handleGoogleSignUp}
        className="w-full flex items-center justify-center gap-3 border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-semibold py-3 rounded-lg transition-colors shadow"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
          alt="Google Icon"
          className="w-5 h-5"
        />
        Continue with Google
      </button>
      <p className="text-center text-gray-600 text-sm mt-8">
        Already have an account?{' '}
        <Link href="/login" className="text-accent hover:underline font-semibold">Sign in</Link>
      </p>
    </>
  )
}
