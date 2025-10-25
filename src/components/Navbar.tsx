'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Navbar() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  useEffect(() => {
    const userData = localStorage.getItem('agriconnect:user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('agriconnect:user')
    localStorage.removeItem('agriconnect:token')
    setUser(null)
    router.push('/')
  }

  const navLinks = user ? [
    { href: '/', label: 'Home' },
    { href: '/guidance', label: 'Guidance' },
    { href: '/reviews', label: 'Reviews' },
  ] : [
    { href: '/', label: 'Home' },
    { href: '/guidance', label: 'Guidance' },
    { href: '/reviews', label: 'Reviews' },
    { href: '/auth/login', label: 'Login' },
    { href: '/auth/signup', label: 'Signup' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-green-600 to-blue-600 shadow-2xl backdrop-blur-lg border-b border-white/10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group" aria-label="AgriConnect Home">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
              <svg
                className="w-5 h-5 text-green-600"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="font-bold text-xl text-white font-poppins">
              AgriConnect
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white hover:text-green-100 transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brandGreen rounded-lg px-3 py-2 hover:bg-white/10 hover:scale-105"
              >
                {link.label}
              </Link>
            ))}
            
            {/* Profile Icon */}
            {user ? (
              <div className="flex items-center gap-3 ml-4 pl-4 border-l border-white/20">
                <Link
                  href="/profile"
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 rounded-full px-4 py-2 transition-all duration-200"
                  title={`${user.name} (${user.role})`}
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-white font-medium hidden lg:block">{user.name}</span>
                </Link>
              </div>
            ) : null}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-white hover:text-green-100 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
            onClick={toggleMenu}
          >
            <span className="sr-only">Open main menu</span>
            {/* Hamburger icon */}
            <svg
              className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            {/* Close icon */}
            <svg
              className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}
          id="mobile-menu"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-gradient-to-r from-green-600 to-blue-600 border-t border-white/20 shadow-lg">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2 text-base font-medium text-white hover:text-green-100 hover:bg-white/10 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-inset"
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Mobile Profile Link */}
            {user && (
              <>
                <div className="border-t border-white/20 my-2"></div>
                <Link
                  href="/profile"
                  className="flex items-center gap-3 px-3 py-2 text-base font-medium text-white hover:text-green-100 hover:bg-white/10 rounded-lg transition-colors duration-200"
                  onClick={closeMenu}
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-semibold">{user.name}</div>
                    <div className="text-xs text-green-100 capitalize">{user.role}</div>
                  </div>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
