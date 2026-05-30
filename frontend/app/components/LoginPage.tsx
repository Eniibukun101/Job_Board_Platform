'use client'

import { useState } from 'react'
import LoginForm from './LoginForm'
import WelcomeSection from './WelcomeSection'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [savePassword, setSavePassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))

      if (email && password) {
        console.log('Login successful', { email, savePassword })
      } else {
        setError('Please fill in all fields')
      }
    } catch (err) {
      setError('Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = () => {
    console.log('Sign in with Google')
  }

  return (
    <div className="relative min-h-screen flex bg-white">
      {/* Left side - Welcome section (plain) */}
      <WelcomeSection />

      {/* Right side - Login form in card */}
      <div className="flex w-full md:w-[48%] items-center justify-center px-6 py-10 md:px-10 min-h-screen">
        <div className="w-full max-w-lg rounded-[28px] border border-[#F1EAF8] bg-white px-6 py-8 shadow-[0_20px_60px_rgba(45,38,57,0.08)] md:px-10 md:py-10">
          <LoginForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            savePassword={savePassword}
            setSavePassword={setSavePassword}
            error={error}
            isLoading={isLoading}
            onSubmit={handleSubmit}
            onGoogleSignIn={handleGoogleSignIn}
          />
        </div>
      </div>
    </div>
  )
}
