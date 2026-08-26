'use client'

import React from 'react'
import Link from 'next/link'
import { 
  Shield, Activity, Brain, LineChart, AlertTriangle, 
  ArrowRight, Zap, Globe, Lock, TrendingUp,
  BarChart3, Eye, Target
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/navbar'
import { HeroDecorations } from '@/components/page-decorations'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background relative">
      <HeroDecorations />
      <Navbar />
      
      {/* Hero Section - Visual Impact */}
      <section className="relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center max-w-5xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI-Powered Supply Chain Intelligence</span>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Predict Risks Before They
              <span className="gradient-text block"> Disrupt Your Supply Chain</span>
            </h1>
            
            {/* Subheading */}
            <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
              Enterprise-grade AI platform that monitors global supply chains in real-time, 
              predicts disruptions with 94% accuracy, and provides actionable intelligence to protect your operations.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link href="/dashboard">
                <Button size="lg" className="gap-2 px-8 h-14 text-lg bg-gradient-to-r from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-500/90 shadow-lg hover:shadow-xl transition-all">
                  Launch Dashboard
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/command-center">
                <Button variant="outline" size="lg" className="gap-2 px-8 h-14 text-lg border-2 hover:bg-muted">
                  <Activity className="h-5 w-5" />
                  Command Center
                </Button>
              </Link>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { value: '94%', label: 'Prediction Accuracy', icon: Target },
                { value: '190+', label: 'Countries Covered', icon: Globe },
                { value: '<5min', label: 'Risk Alert Time', icon: AlertTriangle },
                { value: '$2.3B', label: 'Risks Mitigated', icon: TrendingUp },
              ].map((stat, i) => (
                <div key={i} className="glass rounded-xl p-4 text-center group hover:scale-105 transition-transform">
                  <stat.icon className="h-6 w-6 mx-auto mb-2 text-primary group-hover:text-cyan-500 transition-colors" />
                  <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">AI-Driven Risk Intelligence</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive visibility across your entire supply chain ecosystem with explainable AI insights
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: 'Predictive Analytics',
                description: 'Machine learning models trained on global supply chain data to predict disruptions weeks in advance.',
                features: ['Demand Forecasting', 'Risk Scoring', 'Anomaly Detection', 'Pattern Recognition'],
                color: 'from-violet-500 to-purple-600'
              },
              {
                icon: Globe,
                title: 'Global Monitoring',
                description: 'Real-time tracking of suppliers, logistics, and geopolitical events across 190+ countries.',
                features: ['Multi-Tier Visibility', 'Geopolitical Tracking', 'Weather Monitoring', 'News Analysis'],
                color: 'from-cyan-500 to-blue-600'
              },
              {
                icon: Shield,
                title: 'Compliance Engine',
                description: 'Automated compliance checking for UFLPA, EUDR, CSDDD, GDPR, SOX, and REACH regulations.',
                features: ['Regulatory Tracking', 'Gap Analysis', 'Audit Ready', 'Documentation'],
                color: 'from-emerald-500 to-green-600'
              },
              {
                icon: LineChart,
                title: 'SHAP Explainability',
                description: 'Understand AI decisions with SHAP values for transparent and trustworthy risk assessments.',
                features: ['Feature Importance', 'Decision Trees', 'Model Insights', 'Audit Trails'],
                color: 'from-amber-500 to-orange-600'
              },
              {
                icon: Activity,
                title: 'Real-Time Alerts',
                description: 'Instant notifications via WebSocket when risks materialize with severity-based escalation.',
                features: ['Push Notifications', 'Email Digests', 'Slack Integration', 'API Webhooks'],
                color: 'from-rose-500 to-red-600'
              },
              {
                icon: Lock,
                title: 'Enterprise Security',
                description: 'Bank-grade security with SOC 2 Type II, ISO 27001, and GDPR compliance certifications.',
                features: ['AES-256 Encryption', 'SSO/SAML', 'Role-Based Access', 'Audit Logs'],
                color: 'from-blue-500 to-indigo-600'
              },
            ].map((feature, i) => (
              <div key={i} className="group glass rounded-2xl p-8 hover:scale-[1.02] transition-all duration-300 border border-transparent hover:border-primary/20">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">{feature.description}</p>
                
                <ul className="space-y-2">
                  {feature.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="glass rounded-3xl p-12 glow-emerald">
            <BarChart3 className="h-16 w-16 mx-auto mb-6 text-primary" />
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Supply Chain?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join 500+ enterprises using AI to predict and prevent supply chain disruptions.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="gap-2 px-8 h-14 text-lg bg-gradient-to-r from-primary to-emerald-500">
                Get Started Free
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="gap-2 px-8 h-14 text-lg">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
