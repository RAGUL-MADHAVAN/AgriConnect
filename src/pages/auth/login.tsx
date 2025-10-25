'use client'

import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import RoleToggle from '@/components/RoleToggle'

export default function Login() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
    role: 'farmer' as 'farmer' | 'consumer' | 'admin'
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleRoleChange = (role: 'farmer' | 'consumer' | 'admin') => {
    setFormData(prev => ({ ...prev, role }))
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setErrors({})

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        setErrors({ general: data.message || 'Login failed' })
        setIsLoading(false)
        return
      }

      // Save user data and token to localStorage
      localStorage.setItem('agriconnect:user', JSON.stringify(data.user))
      localStorage.setItem('agriconnect:token', data.token)

      // Route to appropriate dashboard
      if (formData.role === 'admin') {
        router.push('/admin/users')
      } else {
        router.push(`/${formData.role}`)
      }
    } catch (error) {
      console.error('Login error:', error)
      setErrors({ general: 'An error occurred. Please try again.' })
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 sm:space-y-8">
        <div className="text-center">
          <h2 className="mt-4 sm:mt-6 text-3xl sm:text-4xl font-bold text-white font-poppins">
            Sign in to AgriConnect
          </h2>
          <p className="mt-2 sm:mt-3 text-base sm:text-lg text-gray-300">
            Access your dashboard and manage your account
          </p>
        </div>

        <form className="mt-6 sm:mt-8 space-y-5 sm:space-y-6 bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-white/10" onSubmit={handleSubmit}>
            {/* General Error */}
            {errors.general && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg">
                {errors.general}
              </div>
            )}

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-white mb-3">
                I am a:
              </label>
              <RoleToggle
                role={formData.role}
                onChange={handleRoleChange}
                className="w-full justify-center"
                showAdmin={true}
              />
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                pattern="^[0-9]{10}$"
                required
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border-2 rounded-lg bg-slate-700/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                  errors.phone ? 'border-red-500' : 'border-white/20'
                }`}
                placeholder="1234567890"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-400">{errors.phone}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border-2 rounded-lg bg-slate-700/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                  errors.password ? 'border-red-500' : 'border-white/20'
                }`}
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 sm:py-4 px-4 sm:px-6 border border-transparent rounded-xl sm:rounded-2xl shadow-2xl shadow-green-500/50 text-lg sm:text-xl font-semibold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-sm text-gray-300">
                Don&apos;t have an account?{' '}
                <Link
                  href="/auth/signup"
                  className="font-medium text-green-400 hover:text-green-300 transition-colors"
                >
                  Sign up here
                </Link>
              </p>
            </div>
        </form>
      </div>
    </div>
  )
}
