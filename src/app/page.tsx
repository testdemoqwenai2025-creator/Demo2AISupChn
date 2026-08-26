'use client'

import React from 'react'
import Link from 'next/link'
import { 
  Shield, Brain, Globe, TrendingUp, ArrowRight, CheckCircle2,
  Zap, Lock, BarChart3, Users, Target
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/navbar'
import { HeroDecorations } from '@/components/page-decorations'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background relative">
      <HeroDecorations />
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <Link href="/Demo2AISupChn/resources/">
                <Button size="lg" className="gap-2 px-8 h-14 text-lg bg-gradient-to-r from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-500/90 shadow-lg hover:shadow-xl transition-all">
                  Explore Platform
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/Demo2AISupChn/landing/">
                <Button variant="outline" size="lg" className="gap-2 px-8 h-14 text-lg border-2 hover:bg-muted">
                  View Demo
                  <BarChart3 className="h-5 w-5" />
                </Button>
              </Link>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { value: '94%', label: 'Prediction Accuracy', icon: Target },
                { value: '190+', label: 'Countries Covered', icon: Globe },
                { value: '<5min', label: 'Risk Alert Time', icon: Zap },
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

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">AI-Driven Risk Intelligence</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive visibility across your entire supply chain ecosystem
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: 'Predictive Analytics',
                description: 'Machine learning models trained on global supply chain data to predict disruptions weeks in advance.',
                features: ['Demand Forecasting', 'Risk Scoring', 'Anomaly Detection'],
                color: 'from-violet-500 to-purple-600'
              },
              {
                icon: Globe,
                title: 'Global Visibility',
                description: 'Real-time monitoring across 190+ countries with multi-tier supplier mapping.',
                features: ['Supplier Mapping', 'Geo-tracking', 'Tier-N Visibility'],
                color: 'from-blue-500 to-cyan-500'
              },
              {
                icon: Shield,
                title: 'Compliance Assurance',
                description: 'Automated compliance monitoring for UFLPA, EUDR, CSDDD, GDPR, and more.',
                features: ['Regulatory Tracking', 'Audit Ready', 'Risk Alerts'],
                color: 'from-green-500 to-emerald-600'
              },
              {
                icon: Lock,
                title: 'Enterprise Security',
                description: 'Bank-grade security with SOC 2 Type II certification and end-to-end encryption.',
                features: ['Zero Trust', 'Encrypted', 'GDPR Compliant'],
                color: 'from-orange-500 to-red-500'
              },
              {
                icon: Users,
                title: 'Team Collaboration',
                description: 'Workflow automation and real-time collaboration tools for supply chain teams.',
                features: ['Role-based Access', 'Workflows', 'Notifications'],
                color: 'from-pink-500 to-rose-500'
              },
              {
                icon: BarChart3,
                title: 'Actionable Insights',
                description: 'Interactive dashboards with explainable AI recommendations.',
                features: ['Custom Reports', 'API Access', 'Integrations'],
                color: 'from-indigo-500 to-blue-600'
              }
            ].map((feature, i) => (
              <div key={i} className="group glass rounded-xl p-6 hover:border-primary/50 transition-all">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      {f}
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass rounded-2xl p-12 bg-gradient-to-br from-primary/10 to-cyan-500/10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Supply Chain?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of companies already using AI SupChn to gain unprecedented 
              visibility and control over their supply chains.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/Demo2AISupChn/resources/">
                <Button size="lg" className="gap-2 px-8">
                  Get Started Now <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/Demo2AISupChn/resources/">
                <Button variant="outline" size="lg" className="gap-2 px-8">
                  View Documentation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t bg-background/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="font-semibold">AI SupChn</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 AI Supply Chain Platform. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link href="/Demo2AISupChn/resources/" className="text-sm text-muted-foreground hover:text-primary">Resources</Link>
              <Link href="/Demo2AISupChn/landing/" className="text-sm text-muted-foreground hover:text-primary">About</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
