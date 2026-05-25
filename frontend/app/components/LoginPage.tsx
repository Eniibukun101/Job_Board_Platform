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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      if (email && password) {
        // Success - in real app, redirect to dashboard
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
    <div className="min-h-screen flex bg-white">
      {/* Left side - Welcome section */}
      <WelcomeSection />

      {/* Right side - Login form */}
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
  )
}
