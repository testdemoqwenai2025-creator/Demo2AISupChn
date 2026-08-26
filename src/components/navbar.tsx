'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Shield, Brain } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="relative z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-primary to-cyan-500 rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold">AI SupChn</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/Demo2AISupChn/" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>
            <Link href="/Demo2AISupChn/resources/" className="text-sm font-medium hover:text-primary transition-colors">Resources</Link>
            <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">Features</Link>
            <Link href="#about" className="text-sm font-medium hover:text-primary transition-colors">About</Link>
            <Button size="sm" className="gap-2">
              Get Started
              <Brain className="h-4 w-4" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t bg-background/95 backdrop-blur-sm">
            <div className="flex flex-col gap-3">
              <Link href="/Demo2AISupChn/" className="text-sm font-medium py-2">Home</Link>
              <Link href="/Demo2AISupChn/resources/" className="text-sm font-medium py-2">Resources</Link>
              <Link href="#features" className="text-sm font-medium py-2">Features</Link>
              <Button size="sm" className="w-fit">Get Started</Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
