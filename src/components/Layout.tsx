import { ReactNode } from 'react'
import Navbar from './Navbar'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen relative">
      <Navbar />
      <main className="min-h-screen text-white relative z-10">
        <div className="mx-auto max-w-6xl px-4">
          {children}
        </div>
      </main>
    </div>
  )
}
