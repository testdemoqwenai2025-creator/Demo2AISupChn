'use client'

import React, { useState, useEffect, useRef } from 'react'
import { 
  ArrowRight, Play, CheckCircle2, Star, Users, Globe,
  Shield, Zap, Brain, TrendingUp, BarChart3, Lock,
  ChevronRight, Menu, X, ArrowUpRight, Sparkles,
  Rocket, Target, Eye, Lightbulb, Cpu, Database,
  MessageSquare, Award, Building2, Truck, Factory,
  TreePine, Recycle, Heart, Scale, Gavel,
  Smartphone, Monitor, Tablet, Cloud,
  Github, Twitter, Linkedin, Mail,
  Home, Timer, ArrowUpLeft, BookOpen
} from 'lucide-react'

// Types
interface Feature {
  icon: React.ReactNode
  title: string
  description: string
  color: string
  gradient: string
}

interface Testimonial {
  name: string
  role: string
  company: string
  content: string
  avatar: string
  rating: number
}

interface Stat {
  value: string
  label: string
  icon: React.ReactNode
}

// Data
const features: Feature[] = [
  {
    icon: <Brain className="w-8 h-8" />,
    title: 'Neural AI Engine',
    description: 'Multi-model AI architecture powered by Gemini, GPT-4o, Claude, and QwenAI for unprecedented supply chain intelligence.',
    color: 'text-purple-400',
    gradient: 'from-purple-600 to-indigo-600'
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: 'Risk Intelligence',
    description: 'Real-time risk monitoring across geopolitical, financial, operational, and environmental dimensions with predictive analytics.',
    color: 'text-red-400',
    gradient: 'from-red-600 to-orange-600'
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: 'Global Visibility',
    description: 'Tier-N supplier visibility spanning 140+ countries with real-time tracking and ESG compliance monitoring.',
    color: 'text-blue-400',
    gradient: 'from-blue-600 to-cyan-600'
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: 'Predictive Analytics',
    description: 'Demand forecasting with 99.2% accuracy using transformer models and external factor integration.',
    color: 'text-yellow-400',
    gradient: 'from-yellow-500 to-orange-500'
  },
  {
    icon: <Database className="w-8 h-8" />,
    title: 'Enterprise Database',
    description: 'Supabase-powered backend with real-time sync, offline support, and enterprise-grade security.',
    color: 'text-green-400',
    gradient: 'from-green-600 to-emerald-600'
  },
  {
    icon: <Lock className="w-8 h-8" />,
    title: 'Zero Trust Security',
    description: 'SOC 2 Type II certified platform with end-to-end encryption and advanced threat detection.',
    color: 'text-cyan-400',
    gradient: 'from-cyan-600 to-teal-600'
  }
]

const testimonials: Testimonial[] = [
  {
    name: 'Sarah Chen',
    role: 'VP of Supply Chain',
    company: 'Fortune 500 Retailer',
    content: 'This platform transformed our supply chain visibility completely. We\'ve reduced costs by 23% while improving supplier relationships. The AI predictions are remarkably accurate.',
    avatar: 'SC',
    rating: 5
  },
  {
    name: 'Marcus Weber',
    role: 'Chief Procurement Officer',
    company: 'Global Manufacturing Corp',
    content: 'The neural analytics engine has given us insights we never thought possible. We\'ve avoided three major disruptions thanks to early warnings from the system.',
    avatar: 'MW',
    rating: 5
  },
  {
    name: 'Priya Patel',
    role: 'Director of Operations',
    company: 'TechScale Startup',
    content: 'Implementation was seamless and the ROI was visible within weeks. The combination of AI intelligence with intuitive design makes this stand out.',
    avatar: 'PP',
    rating: 5
  }
]

const stats: Stat[] = [
  { value: '$12B+', label: 'Supply Chain Value Managed', icon: <BarChart3 className="w-6 h-6" /> },
  { value: '340%', label: 'Average Client ROI', icon: <TrendingUp className="w-6 h-6" /> },
  { value: '99.2%', label: 'AI Prediction Accuracy', icon: <Brain className="w-6 h-6" /> },
  { value: '140+', label: 'Countries Covered', icon: <Globe className="w-6 h-6" /> },
  { value: '50K+', label: 'Active Suppliers Tracked', icon: <Users className="w-6 h-6" /> },
  { value: '<50ms', label: 'Average Response Time', icon: <Zap className="w-6 h-6" /> }
]

// Main Component
export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [redirectCountdown, setRedirectCountdown] = useState(5)
  const [showBanner, setShowBanner] = useState(true)
  const heroRef = useRef<HTMLDivElement>(null)

  // Auto-redirect to Home Page (Main Dashboard) after countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setRedirectCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          // Redirect to Home Page
          window.location.href = '/Demo2AISupChn/'
          return 0
        }
        return prev - 1
      })
    }, 1000)
    
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    
    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length)
    }, 5000)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      {/* 🔗 REDIRECT BANNER - Directs to Home Page (Main Dashboard) */}
      {showBanner && (
        <div className="fixed top-0 left-0 right-0 z-[100] bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg animate-pulse">
                <Home className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-semibold text-white">Welcome to AI Supply Chain Platform</span>
                <span className="hidden sm:inline text-blue-100 ml-2">→ Redirecting to Main Dashboard...</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Countdown Timer */}
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/20 rounded-full">
                <Timer className="w-4 h-4 text-white" />
                <span className="text-sm font-mono font-bold text-white">{redirectCountdown}s</span>
              </div>
              
              {/* Go to Dashboard Button */}
              <a
                href="/Demo2AISupChn/"
                className="flex items-center gap-2 px-5 py-2 bg-white text-purple-600 rounded-lg font-semibold hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg"
              >
                <ArrowUpLeft className="w-4 h-4" />
                <span>Go to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              
              {/* Dismiss Button */}
              <button
                onClick={() => setShowBanner(false)}
                className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                title="Stay on this page"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="h-1 bg-white/30">
            <div 
              className="h-full bg-white transition-all duration-1000 ease-linear"
              style={{ width: `${((5 - redirectCountdown) / 5) * 100}%` }}
            ></div>
          </div>
        </div>
      )}
      
      {/* Add padding top to account for fixed banner */}
      <div className={showBanner ? "pt-16" : ""}></div>

      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px] animate-pulse"></div>
        <div className="absolute top-3/4 -right-32 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px] animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[200px]"></div>
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        ></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-slate-950/95 backdrop-blur-md border-b border-white/10' : ''
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                  <Cpu className="w-6 h-6 text-white" />
                </div>
                <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-400" />
              </div>
              <span className="text-xl font-bold">AI SupChn</span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
              <a href="#intelligence" className="text-gray-300 hover:text-white transition-colors">Intelligence</a>
              <a href="#testimonials" className="text-gray-300 hover:text-white transition-colors">Testimonials</a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <button className="px-5 py-2.5 text-gray-300 hover:text-white font-medium transition-colors">
                Sign In
              </button>
              <a 
                href="/Demo2AISupChn/"
                className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg font-medium transition-all shadow-lg shadow-purple-500/25 inline-flex items-center gap-2"
              >
                Get Started <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-950/98 backdrop-blur-md border-t border-white/10 p-6">
            <div className="flex flex-col gap-4">
              <a href="#features" className="text-gray-300 hover:text-white py-2">Features</a>
              <a href="#intelligence" className="text-gray-300 hover:text-white py-2">Intelligence</a>
              <a href="#testimonials" className="text-gray-300 hover:text-white py-2">Testimonials</a>
              <a href="#pricing" className="text-gray-300 hover:text-white py-2">Pricing</a>
              <hr className="border-white/10" />
              <a 
                href="/Demo2AISupChn/"
                className="w-full px-5 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-medium inline-flex items-center justify-center gap-2"
              >
                Get Started <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-20">
        {/* Left Ribbon */}
        <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-blue-600 via-purple-600 to-pink-600 hidden lg:block"></div>
        
        {/* Right Ribbon */}
        <div className="absolute right-0 top-0 bottom-0 w-2 bg-gradient-to-b from-emerald-600 via-cyan-600 to-blue-600 hidden lg:block"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-full">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-medium text-blue-300">Next-Gen Supply Chain Intelligence</span>
                <ArrowUpRight className="w-4 h-4 text-blue-400" />
              </div>

              {/* Headline */}
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                The Future of{' '}
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Supply Chain
                </span>{' '}
                is Here
              </h1>

              {/* Subheadline */}
              <p className="text-xl text-gray-400 leading-relaxed max-w-xl">
                Enterprise-grade AI platform that transforms how you manage suppliers, 
                predict risks, and optimize operations. Powered by multi-model neural networks 
                for unprecedented visibility and control.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <a 
                  href="/Demo2AISupChn/"
                  className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold text-lg overflow-hidden transition-all hover:shadow-2xl hover:shadow-purple-500/30 hover:scale-105 inline-flex items-center"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Access Dashboard <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </a>
                
                <a 
                  href="/Demo2AISupChn/resources/"
                  className="group px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/20 rounded-xl font-semibold text-lg backdrop-blur-sm transition-all flex items-center gap-3 inline-flex"
                >
                  <Play className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
                  View Resources
                </a>
              </div>

              {/* Social Proof */}
              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-3">
                  {['SC', 'MW', 'PP', 'AK', 'JR'].map((initials, i) => (
                    <div 
                      key={i}
                      className={`w-10 h-10 rounded-full bg-gradient-to-br ${
                        i === 0 ? 'from-blue-500 to-cyan-500' :
                        i === 1 ? 'from-purple-500 to-pink-500' :
                        i === 2 ? 'from-orange-500 to-red-500' :
                        i === 3 ? 'from-green-500 to-emerald-500' :
                        'from-indigo-500 to-violet-500'
                      } flex items-center justify-center text-xs font-bold border-2 border-slate-950`}
                    >
                      {initials}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-400 mt-1">Trusted by 2,000+ companies worldwide</p>
                </div>
              </div>
            </div>

            {/* Right Content - Visual Dashboard Preview */}
            <div className="relative hidden lg:block">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-pink-600/30 rounded-3xl blur-3xl"></div>
              
              {/* Main Dashboard Card */}
              <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-white/10 rounded-3xl p-8 backdrop-blur-sm shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-sm text-gray-500">Live Dashboard</div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                    { label: 'Suppliers', value: '12,450', change: '+2.4%', positive: true },
                    { label: 'Alerts', value: '23', change: '-12%', positive: true },
                    { label: 'Efficiency', value: '94.2%', change: '+3.1%', positive: true }
                  ].map((stat, i) => (
                    <div key={i} className="bg-black/30 rounded-xl p-4">
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                      <div className="text-xs text-gray-500">{stat.label}</div>
                      <div className={`text-xs mt-1 ${stat.positive ? 'text-green-400' : 'text-red-400'}`}>
                        {stat.change}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chart Placeholder */}
                <div className="bg-black/30 rounded-xl p-6 mb-6">
                  <div className="flex items-end justify-between h-40 gap-2">
                    {[65, 45, 78, 52, 88, 72, 95, 68, 82, 75, 90, 85].map((height, i) => (
                      <div 
                        key={i} 
                        className="flex-1 bg-gradient-to-t from-blue-600 to-purple-600 rounded-t-lg opacity-80 hover:opacity-100 transition-opacity"
                        style={{ height: `${height}%` }}
                      ></div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-3 text-xs text-gray-500">
                    <span>Jan</span>
                    <span>Jun</span>
                    <span>Dec</span>
                  </div>
                </div>

                {/* Alert Items */}
                <div className="space-y-3">
                  {[
                    { type: 'warning', title: 'Semiconductor shortage risk', time: '2h ago' },
                    { type: 'info', title: 'New supplier verified', time: '4h ago' },
                    { type: 'success', title: 'Cost optimization found', time: '6h ago' }
                  ].map((alert, i) => (
                    <div key={i} className="flex items-center gap-3 bg-black/20 rounded-lg p-3">
                      <div className={`w-2 h-2 rounded-full ${
                        alert.type === 'warning' ? 'bg-yellow-400' :
                        alert.type === 'info' ? 'bg-blue-400' : 'bg-green-400'
                      }`}></div>
                      <span className="text-sm text-gray-300 flex-1">{alert.title}</span>
                      <span className="text-xs text-gray-500">{alert.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-4 shadow-xl shadow-green-500/30 animate-bounce" style={{ animationDuration: '3s' }}>
                <TrendingUp className="w-8 h-8 text-white" />
                <div className="text-white font-bold mt-1">+23%</div>
                <div className="text-green-100 text-xs">ROI</div>
              </div>

              <div className="absolute -bottom-4 -left-6 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-4 shadow-xl shadow-purple-500/30 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                <Shield className="w-8 h-8 text-white" />
                <div className="text-white font-bold mt-1">99.9%</div>
                <div className="text-purple-100 text-xs">Uptime</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/60 rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-20 border-y border-white/10 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 mb-12 uppercase tracking-wider text-sm font-medium">
            Trusted by Industry Leaders Worldwide
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-60">
            {[
              { name: 'Fortune 500', icon: <Building2 className="w-8 h-8" /> },
              { name: 'Global Mfg', icon: <Factory className="w-8 h-8" /> },
              { name: 'Tech Giants', icon: <Cpu className="w-8 h-8" /> },
              { name: 'Logistics Co', icon: <Truck className="w-8 h-8" /> },
              { name: 'Retail Leaders', icon: <Store className="w-8 h-8" /> },
              { name: 'Pharma Inc', icon: <Hospital className="w-8 h-8" /> }
            ].map((company, i) => (
              <div key={i} className="flex items-center justify-center gap-3 text-gray-400 hover:text-white transition-colors">
                {company.icon}
                <span className="font-semibold">{company.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-6">
              <Zap className="w-4 h-4" /> Powerful Features
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              Everything You Need for{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Supply Chain Excellence
              </span>
            </h2>
            
            <p className="text-xl text-gray-400">
              Comprehensive suite of tools powered by cutting-edge AI to transform your supply chain operations.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group relative bg-gradient-to-br from-slate-900/80 to-slate-800/50 border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
              >
                {/* Hover Glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                {/* Icon */}
                <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <div className={`${feature.color}`}>
                    {feature.icon}
                  </div>
                </div>

                {/* Content */}
                <h3 className="relative text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all">
                  {feature.title}
                </h3>
                
                <p className="relative text-gray-400 leading-relaxed">
                  {feature.description}
                </p>

                {/* Learn More Link */}
                <div className="relative mt-6 flex items-center gap-2 text-sm font-medium text-gray-500 group-hover:text-white transition-colors">
                  Learn more <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Intelligence Section */}
      <section id="intelligence" className="py-24 lg:py-32 bg-gradient-to-b from-slate-900/50 to-slate-950 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600/10 border border-purple-500/20 rounded-full text-purple-400 text-sm font-medium">
                <Brain className="w-4 h-4" /> Neural Network Architecture
              </div>

              <h2 className="text-4xl lg:text-5xl font-bold">
                Powered by{' '}
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
                  Multi-Model AI
                </span>
              </h2>

              <p className="text-xl text-gray-400 leading-relaxed">
                Our proprietary neural network combines the strengths of multiple AI models 
                including Gemini, GPT-4o, Claude, and QwenAI to deliver unparalleled 
                supply chain intelligence.
              </p>

              {/* AI Capabilities List */}
              <div className="space-y-4">
                {[
                  { icon: <Target />, title: '99.2% Prediction Accuracy', desc: 'Industry-leading forecast precision' },
                  { icon: <Eye />, title: 'Real-Time Analysis', desc: 'Sub-50ms response times' },
                  { icon: <Lightbulb />, title: 'Intelligent Insights', desc: 'Actionable recommendations' },
                  { icon: <Database />, title: 'Massive Scale', desc: 'Process millions of data points' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white group-hover:text-purple-400 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - Visual Representation */}
            <div className="relative">
              {/* Central Brain Visualization */}
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                {/* Outer Ring */}
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-purple-500/30 animate-spin" style={{ animationDuration: '30s' }}></div>
                
                {/* Middle Ring */}
                <div className="absolute inset-8 rounded-full border-2 border-dashed border-blue-500/30 animate-spin" style={{ animationDuration: '20s', animationDirection: 'reverse' }}></div>
                
                {/* Inner Ring */}
                <div className="absolute inset-16 rounded-full border-2 border-dashed border-pink-500/30 animate-spin" style={{ animationDuration: '15s' }}></div>

                {/* Center Core */}
                <div className="absolute inset-24 rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 flex items-center justify-center shadow-2xl shadow-purple-500/30">
                  <Brain className="w-20 h-20 text-white" />
                </div>

                {/* Orbiting Nodes */}
                {[
                  { icon: <Globe />, position: 'top-0 left-1/2 -translate-x-1/2', color: 'blue' },
                  { icon: <Truck />, position: 'top-1/4 right-0', color: 'green' },
                  { icon: <Shield />, position: 'bottom-1/4 right-0', color: 'red' },
                  { icon: <BarChart3 />, position: 'bottom-0 left-1/2 -translate-x-1/2', color: 'yellow' },
                  { icon: <Users />, position: 'bottom-1/4 left-0', color: 'purple' },
                  { icon: <Factory />, position: 'top-1/4 left-0', color: 'cyan' }
                ].map((node, i) => (
                  <div 
                    key={i}
                    className={`absolute ${node.position} w-14 h-14 rounded-full bg-${node.color}-500/20 border border-${node.color}-500/50 flex items-center justify-center text-${node.color}-400 backdrop-blur-sm`}
                    style={{ animation: `pulse 3s ease-in-out infinite`, animationDelay: `${i * 0.5}s` }}
                  >
                    {node.icon}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-white mb-2 group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-600/10 border border-yellow-500/20 rounded-full text-yellow-400 text-sm font-medium mb-6">
              <Star className="w-4 h-4" /> Customer Success Stories
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Loved by{' '}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Industry Leaders
              </span>
            </h2>
          </div>

          {/* Testimonial Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className={`relative bg-gradient-to-br from-slate-900/80 to-slate-800/50 border rounded-2xl p-8 transition-all duration-500 ${
                  index === activeTestimonial 
                    ? 'border-purple-500/50 scale-105 shadow-2xl shadow-purple-500/20' 
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                {/* Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-300 leading-relaxed mb-6 italic">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                    <div className="text-sm text-gray-600">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 lg:py-32 bg-gradient-to-b from-slate-900/50 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-600/10 border border-green-500/20 rounded-full text-green-400 text-sm font-medium mb-6">
              <Award className="w-4 h-4" /> Simple Pricing
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Start Free,{' '}
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Scale as You Grow
              </span>
            </h2>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Tier */}
            <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all">
              <h3 className="text-xl font-bold text-white mb-2">Starter</h3>
              <p className="text-gray-500 mb-6">Perfect for evaluation</p>
              
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">$0</span>
                <span className="text-gray-500">/month</span>
              </div>

              <ul className="space-y-3 mb-8">
                {['Up to 50 suppliers', 'Basic analytics', 'Community support', '5 AI queries/day'].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-green-400" /> {feature}
                  </li>
                ))}
              </ul>

              <a 
                href="/Demo2AISupChn/"
                className="w-full py-3 border border-white/20 rounded-xl font-medium hover:bg-white/5 transition-colors inline-flex items-center justify-center gap-2"
              >
                Access Dashboard <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Pro Tier (Featured) */}
            <div className="relative bg-gradient-to-b from-blue-900/40 to-purple-900/40 border-2 border-blue-500 rounded-2xl p-8 scale-105 shadow-2xl shadow-blue-500/20">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-sm font-medium text-white">
                MOST POPULAR
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2">Professional</h3>
              <p className="text-gray-400 mb-6">For growing teams</p>
              
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">$99</span>
                <span className="text-gray-400">/month</span>
              </div>

              <ul className="space-y-3 mb-8">
                {['Up to 500 suppliers', 'Advanced AI models', 'Priority support', '500 AI queries/day', 'API access', 'Custom dashboards'].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-blue-400" /> {feature}
                  </li>
                ))}
              </ul>

              <a 
                href="/Demo2AISupChn/"
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-medium hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-2"
              >
                Start Free Trial <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Enterprise Tier */}
            <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all">
              <h3 className="text-xl font-bold text-white mb-2">Enterprise</h3>
              <p className="text-gray-500 mb-6">For large organizations</p>
              
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">Custom</span>
              </div>

              <ul className="space-y-3 mb-8">
                {['Unlimited suppliers', 'Full AI suite', 'Dedicated support', 'Unlimited queries', 'Custom integrations', 'SLA guarantees'].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-purple-400" /> {feature}
                  </li>
                ))}
              </ul>

              <button className="w-full py-3 border border-purple-500/50 rounded-xl font-medium text-purple-400 hover:bg-purple-500/10 transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-90"></div>
        
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Rocket className="w-16 h-16 text-white mx-auto mb-8" />
          
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Ready to Transform Your Supply Chain?
          </h2>
          
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Join thousands of companies already using AI SupChn to gain unprecedented 
            visibility and control over their supply chains.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/Demo2AISupChn/"
              className="px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
            >
              Access Dashboard <ArrowRight className="w-5 h-5" />
            </a>
            <a 
              href="/Demo2AISupChn/resources/"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-xl font-semibold text-lg hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
            >
              <BookOpen className="w-5 h-5" /> View Resources
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-white/10 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-5 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Cpu className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">AI SupChn</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-sm">
                Enterprise AI-powered supply chain intelligence platform for the modern business.
              </p>
              <div className="flex items-center gap-4">
                <a href="#" className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Links */}
            {[
              {
                title: 'Product',
                links: ['Features', 'Pricing', 'Integrations', 'API Docs', 'Changelog']
              },
              {
                title: 'Resources',
                links: ['Documentation', 'Guides', 'Blog', 'Case Studies', 'Webinars']
              },
              {
                title: 'Company',
                links: ['About Us', 'Careers', 'Press', 'Partners', 'Contact']
              }
            ].map((column, i) => (
              <div key={i}>
                <h4 className="font-semibold text-white mb-4">{column.title}</h4>
                <ul className="space-y-3">
                  {column.links.map((link, j) => (
                    <li key={j}>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2025 AI Supply Chain Platform. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Additional icons used
function Store(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"/><path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"/><path d="M12 3v6"/></svg> }
function Hospital(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-4"/><path d="M9 9v.01"/><path d="M9 12v.01"/><path d="M9 15v.01"/><path d="M9 18v.01"/></svg> }
