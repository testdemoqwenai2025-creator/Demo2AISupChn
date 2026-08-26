'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { 
  // Governance Icons
  Shield, Scale, Gavel, FileText, ClipboardCheck, BadgeCheck, Lock, Eye,
  // ESG Icons
  Leaf, Recycle, Thermometer, Droplets, Heart, Users, Globe2, TreePine,
  // Analytics/AI Icons
  Brain, BarChart3, TrendingUp, Cpu, Database, Zap, Activity, LineChart,
  PieChart, Radar, Sparkles, Target,
  // Customer Experience Icons
  MessageCircle, Star, ThumbsUp, Smile, Headphones, Award, Gift,
  // Case Studies Icons
  Building2, Factory, Truck, Package, Warehouse, Store,
  // Commercial Models Icons
  DollarSign, CreditCard, Percent, TrendingDown, Calculator, Coins,
  // Phase 5: Autonomous Agents Icons
  Bot, Workflow, Network, UserCheck, Puzzle, GitBranch, Play, Pause,
  Fingerprint, ShieldAlert, RefreshCcw, Cpu as Chip, BrainCircuit,
  // Phase 6: Ecosystem & Marketplace Icons
  Store as Marketplace, Plug, Code, Share2 as RevenueShare, Blocks, Layers as Stack,
  Gamepad2, Wrench, Rocket, Trophy, Users2, Link2, Hexagon,
  // General Icons
  ExternalLink, Clock, ArrowRight, ChevronRight, ChevronDown,
  RefreshCw, Bell, Filter, Search, BookOpen, Lightbulb,
  RSS, Newspaper, Radio, Tv, Globe, AlertTriangle,
  CheckCircle2, Info, ArrowUpRight, Download,
  Layers, Grid3x3, LayoutDashboard, Settings, Zap as Bolt
} from 'lucide-react'

// Types
interface NewsItem {
  id: string
  title: string
  summary: string
  source: string
  category: string
  timestamp: Date
  url?: string
  impact: 'high' | 'medium' | 'low'
}

interface ResourceSection {
  id: string
  title: string
  icon: React.ReactNode
  content: React.ReactNode
  color: string
}

// Mock RSS Feed Data - Real supply chain and financial news simulation
const generateMockNews = (): NewsItem[] => [
  {
    id: '1',
    title: 'IMF Raises Global Growth Forecast to 3.2% for 2025',
    summary: 'International Monetary Fund revises outlook citing resilient supply chains and AI-driven efficiency gains across manufacturing sectors.',
    source: 'IMF News',
    category: 'Financial Markets',
    timestamp: new Date(Date.now() - 3600000),
    url: 'https://www.imf.org',
    impact: 'high'
  },
  {
    id: '2',
    title: 'SCO Members Agree on New Trade Corridor Standards',
    summary: 'Shanghai Cooperation Organization establishes unified digital trade documentation standards affecting 40% of world population.',
    source: 'SCO Official',
    category: 'Geopolitical',
    timestamp: new Date(Date.now() - 7200000),
    impact: 'high'
  },
  {
    id: '3',
    title: 'Fed Signals Rate Pause Amid Supply Chain Stabilization',
    summary: 'Federal Reserve notes improved logistics metrics as inflationary pressures ease from supply-side improvements.',
    source: 'Yahoo Finance',
    category: 'Financial Markets',
    timestamp: new Date(Date.now() - 10800000),
    url: 'https://finance.yahoo.com',
    impact: 'high'
  },
  {
    id: '4',
    title: 'WSJ: AI Supply Chain Platforms Secure $12B in Q1 Funding',
    summary: 'Wall Street Journal reports record venture investment in supply chain intelligence platforms, with enterprise adoption up 340%.',
    source: 'Wall Street Journal',
    category: 'Technology',
    timestamp: new Date(Date.now() - 14400000),
    url: 'https://www.wsj.com',
    impact: 'high'
  },
  {
    id: '5',
    title: 'World Economic Forum: ESG Compliance Now Top Board Priority',
    summary: 'Davos summit concludes with 89% of CEOs ranking sustainable supply chain transparency as critical business imperative.',
    source: 'WEF',
    category: 'ESG',
    timestamp: new Date(Date.now() - 18000000),
    impact: 'medium'
  },
  {
    id: '6',
    title: 'Bloomberg: Commodity Prices Stabilize on Predictive Logistics',
    summary: 'Advanced demand forecasting reduces volatility in key commodities by 23%, benefiting global manufacturers.',
    source: 'Bloomberg',
    category: 'Commodities',
    timestamp: new Date(Date.now() - 21600000),
    impact: 'medium'
  },
  {
    id: '7',
    title: 'Reuters: Semiconductor Supply Chain Reaches Historic Efficiency',
    summary: 'AI-powered coordination reduces chip delivery times by 45%, addressing chronic shortages in tech manufacturing.',
    source: 'Reuters',
    category: 'Technology',
    timestamp: new Date(Date.now() - 25200000),
    impact: 'high'
  },
  {
    id: '8',
    title: 'EU Announces Digital Product Passport Mandate for 2026',
    summary: 'New regulation requires full supply chain traceability for all products sold in European markets.',
    source: 'EU Commission',
    category: 'Regulatory',
    timestamp: new Date(Date.now() - 28800000),
    impact: 'high'
  },
  {
    id: '9',
    title: 'CNBC: Supply Chain AI Market to Reach $85B by 2028',
    summary: 'Market analysis shows compound annual growth rate of 42% in AI-driven supply chain solutions.',
    source: 'CNBC',
    category: 'Markets',
    timestamp: new Date(Date.now() - 32400000),
    impact: 'medium'
  },
  {
    id: '10',
    title: 'FT: Carbon Tracking Becomes Mandatory for Global Shipping',
    summary: 'International Maritime Organization mandates real-time emissions reporting for all commercial vessels.',
    source: 'Financial Times',
    category: 'ESG',
    timestamp: new Date(Date.now() - 36000000),
    impact: 'medium'
  },
  {
    id: '11',
    title: 'Nikkei: Asian Manufacturing Index Hits 18-Month High',
    summary: 'Regional PMI data shows strongest expansion since mid-2023, driven by electronics and automotive sectors.',
    source: 'Nikkei',
    category: 'Economics',
    timestamp: new Date(Date.now() - 39600000),
    impact: 'medium'
  },
  {
    id: '12',
    title: 'Forbes: Top 50 Supply Chain Innovators of 2025 Revealed',
    summary: 'Annual ranking highlights companies leveraging AI, blockchain, and IoT for operational excellence.',
    source: 'Forbes',
    category: 'Business',
    timestamp: new Date(Date.now() - 43200000),
    impact: 'low'
  }
]

// Financial Data Simulation
const financialData = {
  indices: [
    { name: 'S&P 500', value: '5,894.16', change: '+0.84%', positive: true },
    { name: 'NASDAQ', value: '19,245.32', change: '+1.24%', positive: true },
    { name: 'DOW JONES', value: '43,245.87', change: '+0.52%', positive: true },
    { name: 'FTSE 100', value: '8,234.56', change: '-0.18%', positive: false },
    { name: 'NIKKEI 225', value: '39,876.21', change: '+0.96%', positive: true },
    { name: 'SHANGHAI', value: '3,456.78', change: '+0.34%', positive: true }
  ],
  commodities: [
    { name: 'Crude Oil (WTI)', price: '$78.45', change: '+2.1%' },
    { name: 'Gold', price: '$2,654.30', change: '+0.8%' },
    { name: 'Natural Gas', price: '$3.24', change: '-1.5%' },
    { name: 'Copper', price: '$4.56/lb', change: '+3.2%' },
    { name: 'Shipping (BDI)', price: '1,456', change: '+5.7%' }
  ],
  currencies: [
    { name: 'EUR/USD', rate: '1.0856', change: '+0.2%' },
    { name: 'USD/JPY', rate: '149.34', change: '-0.4%' },
    { name: 'GBP/USD', rate: '1.2678', change: '+0.1%' },
    { name: 'USD/CNY', rate: '7.2456', change: '-0.05%' }
  ]
}

export default function ResourcesPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [lastRefresh, setLastRefresh] = useState(new Date())
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    setNewsItems(generateMockNews())
    
    // Auto-refresh every 5 minutes
    const interval = setInterval(() => {
      refreshNews()
    }, 300000)
    
    return () => clearInterval(interval)
  }, [])

  const refreshNews = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setNewsItems(generateMockNews())
      setLastRefresh(new Date())
      setIsRefreshing(false)
    }, 1000)
  }

  const filteredNews = useMemo(() => {
    if (selectedCategory === 'all') return newsItems
    return newsItems.filter(item => item.category === selectedCategory)
  }, [newsItems, selectedCategory])

  const categories = ['all', ...Array.from(new Set(newsItems.map(item => item.category)))]

  // Governance Section Component
  const GovernanceSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Risk Management Framework */}
        <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 border border-blue-500/30 rounded-xl p-6 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Risk Management</h3>
          </div>
          <p className="text-gray-300 text-sm mb-4">Enterprise-grade risk assessment framework with real-time monitoring and predictive analytics.</p>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-sm text-gray-400">
              <CheckCircle2 className="w-4 h-4 text-green-400" /> Operational Risk Scoring
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-400">
              <CheckCircle2 className="w-4 h-4 text-green-400" /> Financial Exposure Analysis
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-400">
              <CheckCircle2 className="w-4 h-4 text-green-400" /> Compliance Automation
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-400">
              <CheckCircle2 className="w-4 h-4 text-green-400" /> Audit Trail Management
            </li>
          </ul>
        </div>

        {/* Regulatory Compliance */}
        <div className="bg-gradient-to-br from-purple-900/20 to-purple-800/10 border border-purple-500/30 rounded-xl p-6 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <Gavel className="w-8 h-8 text-purple-400" />
            <h3 className="text-lg font-semibold text-white">Regulatory Compliance</h3>
          </div>
          <p className="text-gray-300 text-sm mb-4">Multi-jurisdictional compliance engine supporting 150+ regulatory frameworks.</p>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-sm text-gray-400">
              <CheckCircle2 className="w-4 h-4 text-green-400" /> GDPR / CCPA Ready
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-400">
              <CheckCircle2 className="w-4 h-4 text-green-400" /> SOX Compliance Tools
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-400">
              <CheckCircle2 className="w-4 h-4 text-green-400" /> Trade Export Controls
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-400">
              <CheckCircle2 className="w-4 h-4 text-green-400" /> Sanctions Screening
            </li>
          </ul>
        </div>

        {/* Data Governance */}
        <div className="bg-gradient-to-br from-cyan-900/20 to-cyan-800/10 border border-cyan-500/30 rounded-xl p-6 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <Database className="w-8 h-8 text-cyan-400" />
            <h3 className="text-lg font-semibold text-white">Data Governance</h3>
          </div>
          <p className="text-gray-300 text-sm mb-4">Comprehensive data lifecycle management with quality controls and lineage tracking.</p>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-sm text-gray-400">
              <CheckCircle2 className="w-4 h-4 text-green-400" /> Data Quality Metrics
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-400">
              <CheckCircle2 className="w-4 h-4 text-green-400" /> Lineage & Provenance
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-400">
              <CheckCircle2 className="w-4 h-4 text-green-400" /> Access Control Policies
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-400">
              <CheckCircle2 className="w-4 h-4 text-green-400" /> Retention Schedules
            </li>
          </ul>
        </div>

        {/* Internal Controls */}
        <div className="bg-gradient-to-br from-orange-900/20 to-orange-800/10 border border-orange-500/30 rounded-xl p-6 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <ClipboardCheck className="w-8 h-8 text-orange-400" />
            <h3 className="text-lg font-semibold text-white">Internal Controls</h3>
          </div>
          <p className="text-gray-300 text-sm mb-4">COSO-aligned control framework with automated testing and monitoring.</p>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-sm text-gray-400">
              <CheckCircle2 className="w-4 h-4 text-green-400" /> Control Testing Suite
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-400">
              <CheckCircle2 className="w-4 h-4 text-green-400" /> Segregation of Duties
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-400">
              <CheckCircle2 className="w-4 h-4 text-green-400" /> Exception Reporting
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-400">
              <CheckCircle2 className="w-4 h-4 text-green-400" /> Remediation Workflows
            </li>
          </ul>
        </div>

        {/* Security Framework */}
        <div className="bg-gradient-to-br from-red-900/20 to-red-800/10 border border-red-500/30 rounded-xl p-6 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <Lock className="w-8 h-8 text-red-400" />
            <h3 className="text-lg font-semibold text-white">Security Framework</h3>
          </div>
          <p className="text-gray-300 text-sm mb-4">Zero-trust architecture with advanced threat detection and response.</p>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-sm text-gray-400">
              <CheckCircle2 className="w-4 h-4 text-green-400" /> SOC 2 Type II Certified
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-400">
              <CheckCircle2 className="w-4 h-4 text-green-400" /> ISO 27001 Aligned
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-400">
              <CheckCircle2 className="w-4 h-4 text-green-400" /> Encryption at Rest/Transit
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-400">
              <CheckCircle2 className="w-4 h-4 text-green-400" /> Penetration Testing
            </li>
          </ul>
        </div>

        {/* Audit & Assurance */}
        <div className="bg-gradient-to-br from-emerald-900/20 to-emerald-800/10 border border-emerald-500/30 rounded-xl p-6 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <Scale className="w-8 h-8 text-emerald-400" />
            <h3 className="text-lg font-semibold text-white">Audit & Assurance</h3>
          </div>
          <p className="text-gray-300 text-sm mb-4">Continuous audit capabilities with real-time assurance reporting.</p>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-sm text-gray-400">
              <CheckCircle2 className="w-4 h-4 text-green-400" /> Continuous Monitoring
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-400">
              <CheckCircle2 className="w-4 h-4 text-green-400" /> Automated Evidence Collection
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-400">
              <CheckCircle2 className="w-4 h-4 text-green-400" /> Audit Dashboard
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-400">
              <CheckCircle2 className="w-4 h-4 text-green-400" /> Stakeholder Reports
            </li>
          </ul>
        </div>
      </div>

      {/* Governance Metrics */}
      <div className="bg-black/30 border border-gray-700 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-blue-400" />
          Governance Health Metrics
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Compliance Score', value: '98.5%', color: 'text-green-400' },
            { label: 'Risk Coverage', value: '94.2%', color: 'text-blue-400' },
            { label: 'Control Effectiveness', value: '97.1%', color: 'text-purple-400' },
            { label: 'Audit Readiness', value: '99.8%', color: 'text-cyan-400' }
          ].map((metric, idx) => (
            <div key={idx} className="text-center">
              <div className={`text-3xl font-bold ${metric.color}`}>{metric.value}</div>
              <div className="text-sm text-gray-400 mt-1">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  // ESG Section Component
  const ESGSection = () => (
    <div className="space-y-6">
      {/* Environmental */}
      <div className="bg-gradient-to-r from-green-900/30 via-emerald-900/20 to-teal-900/30 border border-green-500/30 rounded-xl p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-green-500/20 rounded-xl">
            <Leaf className="w-10 h-10 text-green-400" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">Environmental Sustainability</h3>
            <p className="text-gray-400">Carbon tracking, circular economy, and green supply chain management</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-black/30 rounded-lg p-5">
            <Thermometer className="w-8 h-8 text-orange-400 mb-3" />
            <h4 className="font-semibold text-white mb-2">Carbon Footprint</h4>
            <div className="text-3xl font-bold text-green-400 mb-2">-34%</div>
            <p className="text-sm text-gray-400">Year-over-year reduction in Scope 1-3 emissions across monitored supply chains</p>
          </div>
          <div className="bg-black/30 rounded-lg p-5">
            <Recycle className="w-8 h-8 text-cyan-400 mb-3" />
            <h4 className="font-semibold text-white mb-2">Circular Economy</h4>
            <div className="text-3xl font-bold text-cyan-400 mb-2">67%</div>
            <p className="text-sm text-gray-400">Average material recovery rate achieved through reverse logistics optimization</p>
          </div>
          <div className="bg-black/30 rounded-lg p-5">
            <Droplets className="w-8 h-8 text-blue-400 mb-3" />
            <h4 className="font-semibold text-white mb-2">Water Stewardship</h4>
            <div className="text-3xl font-bold text-blue-400 mb-2">2.1B gal</div>
            <p className="text-sm text-gray-400">Water saved through smart sourcing and process optimization this year</p>
          </div>
        </div>

        {/* Environmental Initiatives */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {['Net Zero 2040', 'Science-Based Targets', 'Renewable Energy 100%', 'Sustainable Packaging'].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-3">
              <TreePine className="w-5 h-5 text-green-400 flex-shrink-0" />
              <span className="text-sm text-gray-200">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Social */}
      <div className="bg-gradient-to-r from-blue-900/30 via-indigo-900/20 to-violet-900/30 border border-blue-500/30 rounded-xl p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-blue-500/20 rounded-xl">
            <Users className="w-10 h-10 text-blue-400" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">Social Responsibility</h3>
            <p className="text-gray-400">Labor rights, community impact, and ethical sourcing practices</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {[
            { icon: Heart, label: 'Worker Welfare', value: '99.2%', desc: 'Compliance with labor standards' },
            { icon: Users, label: 'Diversity Index', value: '0.82', desc: 'Supplier diversity score' },
            { icon: Globe2, label: 'Communities', value: '1,240+', desc: 'Community programs supported' },
            { icon: Shield, label: 'Ethical Sourcing', value: '98.7%', desc: 'Verified ethical suppliers' }
          ].map((item, idx) => (
            <div key={idx} className="bg-black/30 rounded-lg p-5 text-center">
              <item.icon className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white">{item.value}</div>
              <div className="font-medium text-gray-200 mt-1">{item.label}</div>
              <div className="text-xs text-gray-400 mt-1">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Governance (ESG Context) */}
      <div className="bg-gradient-to-r from-purple-900/30 via-fuchsia-900/20 to-pink-900/30 border border-purple-500/30 rounded-xl p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-purple-500/20 rounded-xl">
            <Scale className="w-10 h-10 text-purple-400" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">ESG Governance</h3>
            <p className="text-gray-400">Board oversight, disclosure frameworks, and stakeholder engagement</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-3 px-4 text-gray-400 font-medium">Framework</th>
                <th className="py-3 px-4 text-gray-400 font-medium">Status</th>
                <th className="py-3 px-4 text-gray-400 font-medium">Rating</th>
                <th className="py-3 px-4 text-gray-400 font-medium">Next Review</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {[
                { framework: 'TCFD Recommendations', status: 'Fully Implemented', rating: 'A+', review: 'Q2 2025' },
                { framework: 'SASB Standards', status: 'Aligned', rating: 'A', review: 'Q3 2025' },
                { framework: 'UN Global Compact', status: 'Active Participant', rating: 'A+', review: 'Annual' },
                { framework: 'CDP Climate Change', status: 'A-List Achiever', rating: 'A-', review: 'Q4 2025' },
                { framework: 'EU Taxonomy', status: 'Compliant', rating: 'A', review: 'Q1 2026' }
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4 text-white font-medium">{row.framework}</td>
                  <td className="py-3 px-4"><span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">{row.status}</span></td>
                  <td className="py-3 px-4 text-yellow-400 font-mono">{row.rating}</td>
                  <td className="py-3 px-4 text-gray-400">{row.review}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  // Analytics/AI Section Component
  const AnalyticsAISection = () => (
    <div className="space-y-6">
      {/* AI Capabilities Header */}
      <div className="bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-pink-900/40 border border-indigo-500/30 rounded-xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg shadow-indigo-500/25">
              <Brain className="w-12 h-12 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white">Neural Analytics Engine</h3>
              <p className="text-gray-300 text-lg">Advanced ML/AI capabilities powered by multi-model architecture</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {[
              { label: 'Models Active', value: '47', icon: Cpu },
              { label: 'Predictions/Day', value: '2.4M', icon: TrendingUp },
              { label: 'Accuracy Rate', value: '99.2%', icon: Target },
              { label: 'Latency (avg)', value: '<50ms', icon: Zap }
            ].map((stat, idx) => (
              <div key={idx} className="bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <stat.icon className="w-6 h-6 text-indigo-400 mb-2" />
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Models Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Demand Forecasting */}
        <div className="group bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 hover:border-blue-500/50 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-blue-500/20 rounded-xl group-hover:bg-blue-500/30 transition-colors">
              <LineChart className="w-8 h-8 text-blue-400" />
            </div>
            <Sparkles className="w-5 h-5 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <h4 className="text-lg font-semibold text-white mb-2">Demand Forecasting</h4>
          <p className="text-sm text-gray-400 mb-4">Transformer-based time series prediction with external factor integration.</p>
          <div className="flex items-center justify-between text-xs">
            <span className="text-green-400">MAPE: 3.2%</span>
            <span className="text-gray-500">LSTM + Attention</span>
          </div>
        </div>

        {/* Risk Prediction */}
        <div className="group bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 hover:border-red-500/50 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-red-500/20 rounded-xl group-hover:bg-red-500/30 transition-colors">
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>
            <Sparkles className="w-5 h-5 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <h4 className="text-lg font-semibold text-white mb-2">Risk Intelligence</h4>
          <p className="text-sm text-gray-400 mb-4">Graph neural network analyzing supplier relationships and risk propagation.</p>
          <div className="flex items-center justify-between text-xs">
            <span className="text-green-400">Precision: 94.7%</span>
            <span className="text-gray-500">GNN + NLP</span>
          </div>
        </div>

        {/* Supplier Scoring */}
        <div className="group bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 hover:border-green-500/50 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-green-500/20 rounded-xl group-hover:bg-green-500/30 transition-colors">
              <Radar className="w-8 h-8 text-green-400" />
            </div>
            <Sparkles className="w-5 h-5 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <h4 className="text-lg font-semibold text-white mb-2">Supplier Intelligence</h4>
          <p className="text-sm text-gray-400 mb-4">Multi-dimensional scoring using financial, operational, and ESG signals.</p>
          <div className="flex items-center justify-between text-xs">
            <span className="text-green-400">Coverage: 50K+</span>
            <span className="text-gray-500">Ensemble Model</span>
          </div>
        </div>

        {/* Anomaly Detection */}
        <div className="group bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 hover:border-purple-500/50 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-purple-500/20 rounded-xl group-hover:bg-purple-500/30 transition-colors">
              <Activity className="w-8 h-8 text-purple-400" />
            </div>
            <Sparkles className="w-5 h-5 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <h4 className="text-lg font-semibold text-white mb-2">Anomaly Detection</h4>
          <p className="text-sm text-gray-400 mb-4">Real-time outlier detection using autoencoders and statistical methods.</p>
          <div className="flex items-center justify-between text-xs">
            <span className="text-green-400">Detection: {'<'}1s</span>
            <span className="text-gray-500">Autoencoder</span>
          </div>
        </div>

        {/* Natural Language Processing */}
        <div className="group bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 hover:border-cyan-500/50 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-cyan-500/20 rounded-xl group-hover:bg-cyan-500/30 transition-colors">
              <MessageCircle className="w-8 h-8 text-cyan-400" />
            </div>
            <Sparkles className="w-5 h-5 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <h4 className="text-lg font-semibold text-white mb-2">Document Intelligence</h4>
          <p className="text-sm text-gray-400 mb-4">NLP pipeline for contract analysis, news extraction, and sentiment analysis.</p>
          <div className="flex items-center justify-between text-xs">
            <span className="text-green-400">NER F1: 96.8%</span>
            <span className="text-gray-500">BERT + GPT</span>
          </div>
        </div>

        {/* Optimization Engine */}
        <div className="group bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 hover:border-orange-500/50 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-orange-500/20 rounded-xl group-hover:bg-orange-500/30 transition-colors">
              <Zap className="w-8 h-8 text-orange-400" />
            </div>
            <Sparkles className="w-5 h-5 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <h4 className="text-lg font-semibold text-white mb-2">Optimization Engine</h4>
          <p className="text-sm text-gray-400 mb-4">Reinforcement learning for inventory, routing, and network optimization.</p>
          <div className="flex items-center justify-between text-xs">
            <span className="text-green-400">Cost Savings: 18%</span>
            <span className="text-gray-500">RL + MILP</span>
          </div>
        </div>
      </div>

      {/* Neural Network Architecture Visualization */}
      <div className="bg-black/40 border border-gray-800 rounded-xl p-6">
        <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Cpu className="w-5 h-5 text-indigo-400" />
          Neural Architecture Overview
        </h4>
        <div className="relative h-64 bg-gradient-to-b from-slate-900 to-slate-950 rounded-lg overflow-hidden">
          {/* Simplified Neural Net Visualization */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center gap-8">
              {/* Input Layer */}
              <div className="flex flex-col gap-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-4 h-4 rounded-full bg-blue-500 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}></div>
                ))}
              </div>
              
              {/* Connections */}
              <div className="w-20 h-32 relative">
                <svg className="absolute inset-0 w-full h-full opacity-30">
                  {[...Array(15)].map((_, i) => (
                    <line 
                      key={i}
                      x1="0" 
                      y1={`${(i % 5) * 25 + 12.5}`} 
                      x2="80" 
                      y2={`${Math.floor(i / 3) * 40 + 20}`}
                      stroke="url(#gradient)" 
                      strokeWidth="1"
                    />
                  ))}
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              
              {/* Hidden Layer 1 */}
              <div className="flex flex-col gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-5 h-5 rounded-full bg-purple-500 animate-pulse" style={{ animationDelay: `${i * 0.15}s` }}></div>
                ))}
              </div>
              
              {/* Hidden Layer 2 */}
              <div className="flex flex-col gap-5">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-6 h-6 rounded-full bg-pink-500 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}></div>
                ))}
              </div>
              
              {/* Output Layer */}
              <div className="flex flex-col gap-8">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="w-7 h-7 rounded-full bg-green-500 animate-pulse" style={{ animationDelay: `${i * 0.25}s` }}></div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-2 left-4 text-xs text-gray-500">
            Multi-Layer Transformer Architecture • 175B Parameters Across Ensemble
          </div>
        </div>
      </div>
    </div>
  )

  // Customer Experience Section
  const CustomerExperienceSection = () => (
    <div className="space-y-6">
      {/* CX Header */}
      <div className="bg-gradient-to-r from-amber-900/30 via-orange-900/20 to-rose-900/30 border border-amber-500/30 rounded-xl p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-4 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl">
            <Smile className="w-12 h-12 text-white" />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-white">Customer Experience Platform</h3>
            <p className="text-gray-300 text-lg">Delivering exceptional experiences through intelligent personalization</p>
          </div>
        </div>

        {/* CX Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'NPS Score', value: '78', icon: ThumbsUp, change: '+12 YoY' },
            { label: 'CSAT Rating', value: '4.8/5', icon: Star, change: '+0.3 YoY' },
            { label: 'Response Time', value: '<2min', icon: Headphones, change: '-45% faster' },
            { label: 'Retention', value: '96.4%', icon: Heart, change: '+4.2% YoY' }
          ].map((metric, idx) => (
            <div key={idx} className="bg-black/30 rounded-xl p-5">
              <metric.icon className="w-8 h-8 text-amber-400 mb-3" />
              <div className="text-3xl font-bold text-white">{metric.value}</div>
              <div className="text-sm text-gray-400">{metric.label}</div>
              <div className="text-xs text-green-400 mt-1">{metric.change}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CX Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personalization Engine */}
        <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
          <MessageCircle className="w-10 h-10 text-blue-400 mb-4" />
          <h4 className="text-xl font-semibold text-white mb-3">Intelligent Personalization</h4>
          <p className="text-gray-400 mb-4">AI-driven interface adaptation that learns user preferences and optimizes workflows automatically.</p>
          <ul className="space-y-2">
            {['Adaptive UI layouts', 'Smart recommendations', 'Contextual actions', 'Preference learning'].map((item, idx) => (
              <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                <ChevronRight className="w-4 h-4 text-blue-400" /> {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Omnichannel Support */}
        <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
          <Headphones className="w-10 h-10 text-green-400 mb-4" />
          <h4 className="text-xl font-semibold text-white mb-3">Omnichannel Support</h4>
          <p className="text-gray-400 mb-4">Seamless support experience across web, mobile, email, chat, and voice channels.</p>
          <ul className="space-y-2">
            {['24/7 AI chatbot', 'Live agent handoff', 'Video consultations', 'Co-browsing'].map((item, idx) => (
              <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                <ChevronRight className="w-4 h-4 text-green-400" /> {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Self-Service Portal */}
        <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
          <BookOpen className="w-10 h-10 text-purple-400 mb-4" />
          <h4 className="text-xl font-semibold text-white mb-3">Self-Service Excellence</h4>
          <p className="text-gray-400 mb-4">Comprehensive knowledge base and tools empowering users to find answers instantly.</p>
          <ul className="space-y-2">
            {['Interactive tutorials', 'Video library', 'API sandbox', 'Community forums'].map((item, idx) => (
              <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                <ChevronRight className="w-4 h-4 text-purple-400" /> {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Feedback Loop */}
        <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
          <Award className="w-10 h-10 text-amber-400 mb-4" />
          <h4 className="text-xl font-semibold text-white mb-3">Continuous Improvement</h4>
          <p className="text-gray-400 mb-4">Real-time feedback collection and analysis driving product enhancements.</p>
          <ul className="space-y-2">
            {['In-app surveys', 'Usage analytics', 'Feature voting', 'Beta programs'].map((item, idx) => (
              <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                <ChevronRight className="w-4 h-4 text-amber-400" /> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-black/30 border border-gray-800 rounded-xl p-6">
        <h4 className="text-xl font-semibold text-white mb-6">Customer Voices</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              quote: "This platform transformed our supply chain visibility. We've reduced costs by 23% while improving supplier relationships.",
              author: "Sarah Chen",
              role: "VP Supply Chain, Fortune 500 Retailer",
              avatar: "SC"
            },
            {
              quote: "The AI predictions are remarkably accurate. We've avoided three major disruptions thanks to early warnings.",
              author: "Marcus Weber",
              role: "CPO, Global Manufacturing Corp",
              avatar: "MW"
            },
            {
              quote: "Implementation was seamless. The team's support and the platform's intuitiveness exceeded expectations.",
              author: "Priya Patel",
              role: "Director of Operations, Tech Startup",
              avatar: "PP"
            }
          ].map((testimonial, idx) => (
            <div key={idx} className="bg-slate-900/50 rounded-lg p-5">
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 text-sm italic mb-4">"{testimonial.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="text-white font-medium text-sm">{testimonial.author}</div>
                  <div className="text-gray-500 text-xs">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  // Case Studies Section
  const CaseStudiesSection = () => (
    <div className="space-y-6">
      {/* Featured Case Study */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900/20 to-slate-900 border border-blue-500/30 rounded-xl overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="p-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-medium mb-4">
              <Star className="w-3 h-3" /> FEATURED CASE STUDY
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Global Electronics Manufacturer: End-to-End Transformation</h3>
            <p className="text-gray-300 mb-6">How a $12B electronics company achieved complete supply chain digitization, reducing lead times by 40% while increasing resilience.</p>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Lead Time Reduction</span>
                <span className="text-green-400 font-semibold">40%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-500 to-emerald-400 h-2 rounded-full" style={{ width: '40%' }}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Cost Savings</span>
                <span className="text-blue-400 font-semibold">$180M/year</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Supplier Visibility</span>
                <span className="text-purple-400 font-semibold">Tier-N Complete</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div className="bg-gradient-to-r from-purple-500 to-pink-400 h-2 rounded-full" style={{ width: '95%' }}></div>
              </div>
            </div>

            <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
              Read Full Case Study <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 p-8 flex items-center justify-center">
            <div className="text-center">
              <Building2 className="w-24 h-24 text-blue-400 mx-auto mb-4 opacity-80" />
              <div className="text-6xl font-bold text-white mb-2">$12B</div>
              <div className="text-gray-400">Annual Revenue</div>
              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-300">
                <Factory className="w-4 h-4" /> 47 Facilities Worldwide
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Case Study Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            industry: 'Retail',
            icon: Store,
            title: 'Fortune 500 Retailer: Omnichannel Fulfillment',
            results: ['35% faster fulfillment', '22% inventory reduction', '99.2% order accuracy'],
            color: 'from-green-500/20 to-emerald-500/20',
            borderColor: 'border-green-500/30'
          },
          {
            industry: 'Automotive',
            icon: Car, // Using Car if available, else Factory
            title: 'Auto Manufacturer: Just-in-Time Optimization',
            results: ['60% less stockouts', '28% WIP reduction', '15% cost savings'],
            color: 'from-red-500/20 to-orange-500/20',
            borderColor: 'border-red-500/30'
          },
          {
            industry: 'Pharma',
            icon: Hospital,
            title: 'Pharma Company: Cold Chain Compliance',
            results: ['100% compliance rate', '45% waste reduction', 'Real-time tracking'],
            color: 'from-cyan-500/20 to-blue-500/20',
            borderColor: 'border-cyan-500/30'
          },
          {
            industry: 'Logistics',
            icon: Truck,
            title: '3PL Provider: Network Optimization',
            results: ['25% fuel savings', '30% route efficiency', 'Dynamic rerouting'],
            color: 'from-amber-500/20 to-yellow-500/20',
            borderColor: 'border-amber-500/30'
          },
          {
            industry: 'Food & Beverage',
            icon: UtensilsCrossed,
            title: 'Food Producer: Freshness Optimization',
            results: ['50% shelf-life gain', 'Zero recalls', 'Farm-to-fork trace'],
            color: 'from-lime-500/20 to-green-500/20',
            borderColor: 'border-lime-500/30'
          },
          {
            industry: 'Technology',
            icon: Cpu,
            title: 'Tech Giant: Chip Shortage Mitigation',
            results: ['90% supply security', 'Alternative sourcing', 'Demand sensing'],
            color: 'from-violet-500/20 to-purple-500/20',
            borderColor: 'border-violet-500/30'
          }
        ].map((study, idx) => (
          <div key={idx} className={`bg-gradient-to-br ${study.color} ${study.borderColor} border rounded-xl p-6 hover:scale-[1.02] transition-transform duration-300`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white/10 rounded-lg">
                <study.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-300">{study.industry}</span>
            </div>
            <h4 className="text-lg font-semibold text-white mb-4">{study.title}</h4>
            <ul className="space-y-2">
              {study.results.map((result, rIdx) => (
                <li key={rIdx} className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" /> {result}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )

  // Commercial Models Section
  const CommercialModelsSection = () => (
    <div className="space-y-6">
      {/* Pricing Tiers Overview */}
      <div className="bg-gradient-to-r from-emerald-900/30 via-teal-900/20 to-cyan-900/30 border border-emerald-500/30 rounded-xl p-8">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-white mb-2">Flexible Commercial Models</h3>
          <p className="text-gray-300 text-lg">Scalable pricing designed for organizations of all sizes</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Free Tier */}
          <div className="bg-slate-900/60 border border-slate-700 rounded-xl p-6">
            <div className="text-center mb-6">
              <h4 className="text-xl font-semibold text-white mb-2">Starter</h4>
              <div className="text-4xl font-bold text-white mb-1">Free</div>
              <p className="text-gray-400 text-sm">Perfect for evaluation</p>
            </div>
            <ul className="space-y-3 mb-6">
              {['Up to 50 suppliers', 'Basic analytics', 'Community support', '5 AI queries/day', 'Standard reports'].map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-green-400" /> {feature}
                </li>
              ))}
            </ul>
            <button className="w-full py-2.5 border border-slate-600 text-white rounded-lg hover:bg-slate-800 transition-colors">
              Get Started
            </button>
          </div>

          {/* Pro Tier */}
          <div className="bg-gradient-to-b from-blue-900/40 to-blue-900/20 border-2 border-blue-500 rounded-xl p-6 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
              MOST POPULAR
            </div>
            <div className="text-center mb-6">
              <h4 className="text-xl font-semibold text-white mb-2">Professional</h4>
              <div className="text-4xl font-bold text-white mb-1">$99<span className="text-lg text-gray-400">/mo</span></div>
              <p className="text-gray-400 text-sm">For growing teams</p>
            </div>
            <ul className="space-y-3 mb-6">
              {['Up to 500 suppliers', 'Advanced AI models', 'Priority support', '500 AI queries/day', 'Custom dashboards', 'API access'].map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" /> {feature}
                </li>
              ))}
            </ul>
            <button className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
              Start Free Trial
            </button>
          </div>

          {/* Enterprise Tier */}
          <div className="bg-gradient-to-b from-purple-900/40 to-purple-900/20 border-2 border-purple-500 rounded-xl p-6">
            <div className="text-center mb-6">
              <h4 className="text-xl font-semibold text-white mb-2">Enterprise</h4>
              <div className="text-4xl font-bold text-white mb-1">Custom</div>
              <p className="text-gray-400 text-sm">For large organizations</p>
            </div>
            <ul className="space-y-3 mb-6">
              {['Unlimited suppliers', 'Full AI suite', 'Dedicated support', 'Unlimited queries', 'Custom integrations', 'SLA guarantees', 'On-premise option'].map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-purple-400" /> {feature}
                </li>
              ))}
            </ul>
            <button className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors">
              Contact Sales
            </button>
          </div>
        </div>
      </div>

      {/* Value Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { metric: '340%', label: 'Average ROI', icon: TrendingUp, desc: 'Within first year' },
          { metric: '6 months', label: 'Avg Payback', icon: Clock, desc: 'Time to value' },
          { metric: '$2.1M', label: 'Avg Annual Savings', icon: DollarSign, desc: 'Per enterprise client' },
          { metric: '99.7%', label: 'Customer Retention', icon: Users, desc: 'Industry leading' }
        ].map((item, idx) => (
          <div key={idx} className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 text-center">
            <item.icon className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-white mb-1">{item.metric}</div>
            <div className="text-sm font-medium text-gray-300">{item.label}</div>
            <div className="text-xs text-gray-500 mt-1">{item.desc}</div>
          </div>
        ))}
      </div>

      {/* Implementation Options */}
      <div className="bg-black/30 border border-gray-800 rounded-xl p-6">
        <h4 className="text-xl font-semibold text-white mb-6">Deployment & Engagement Models</h4>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-4">
            <Cloud className="w-12 h-12 text-blue-400 mx-auto mb-3" />
            <h5 className="font-semibold text-white mb-2">Cloud SaaS</h5>
            <p className="text-sm text-gray-400">Fully managed cloud deployment with automatic updates and scaling</p>
          </div>
          <div className="text-center p-4">
            <Server className="w-12 h-12 text-green-400 mx-auto mb-3" />
            <h5 className="font-semibold text-white mb-2">Hybrid Cloud</h5>
            <p className="text-sm text-gray-400">Combine cloud flexibility with on-premises data residency requirements</p>
          </div>
          <div className="text-center p-4">
            <Building2 className="w-12 h-12 text-purple-400 mx-auto mb-3" />
            <h5 className="font-semibold text-white mb-2">Private Deployment</h5>
            <p className="text-sm text-gray-400">Full on-premise or private cloud installation for maximum control</p>
          </div>
        </div>
      </div>
    </div>
  )

  // ============================================================================
  // PHASE 5: AUTONOMOUS AGENTS SECTION (2025 H2)
  // ============================================================================
  const AutonomousAgentsSection = () => (
    <div className="space-y-8">
      {/* Phase 5 Header */}
      <div className="bg-gradient-to-r from-violet-900/40 via-purple-900/30 to-fuchsia-900/40 border border-violet-500/30 rounded-xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-fuchsia-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-4 bg-gradient-to-br from-violet-500 to-fuchsia-600 rounded-2xl shadow-lg shadow-violet-500/25">
              <Bot className="w-12 h-12 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-3xl font-bold text-white">Autonomous Agents</h3>
                <span className="px-3 py-1 bg-violet-500/20 text-violet-300 rounded-full text-xs font-semibold border border-violet-500/30">
                  2025 H2
                </span>
              </div>
              <p className="text-gray-300 text-lg">Self-healing supply chains powered by multi-agent orchestration and human-in-the-loop intelligence</p>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {[
              { label: 'Agents Active', value: '247', icon: Bot, color: 'text-violet-400' },
              { label: 'Decisions/Day', value: '1.8M', icon: BrainCircuit, color: 'text-fuchsia-400' },
              { label: 'Auto-Resolution', value: '94%', icon: CheckCircle2, color: 'text-green-400' },
              { label: 'Avg Response', value: '<200ms', icon: Zap, color: 'text-cyan-400' }
            ].map((metric, idx) => (
              <div key={idx} className="bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <metric.icon className={`w-6 h-6 ${metric.color} mb-2`} />
                <div className="text-2xl font-bold text-white">{metric.value}</div>
                <div className="text-xs text-gray-400">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Procurement Negotiation Bots */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 hover:border-blue-500/50 rounded-xl p-8 transition-all duration-300">
        <div className="flex items-start gap-6">
          <div className="p-4 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex-shrink-0">
            <Bot className="w-10 h-10 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <h4 className="text-2xl font-bold text-white">Procurement Negotiation Bots</h4>
              <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-medium">AI-Powered</span>
              <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium">Live</span>
            </div>
            <p className="text-gray-300 mb-6 text-lg">Autonomous negotiation agents that handle end-to-end procurement conversations, from initial RFQ to contract finalization, achieving optimal terms through game theory and market intelligence.</p>

            {/* Negotiation Bot Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {[
                { icon: MessageCircle, title: 'Natural Language Negotiation', desc: 'GPT-4 powered conversation engine with context awareness and emotional intelligence', stat: '98% satisfaction' },
                { icon: BarChart3, title: 'Real-Time Market Analysis', desc: 'Instant price benchmarking across 50K+ suppliers with dynamic pricing models', stat: '15% cost savings' },
                { icon: Shield, title: 'Contract Intelligence', desc: 'Automated clause analysis, risk identification, and compliance verification', stat: '99.7% accuracy' },
                { icon: Workflow, title: 'Multi-Round Negotiation', desc: 'Strategic counter-offer generation with win-lose optimization algorithms', stat: '3.2 avg rounds' },
                { icon: Fingerprint, title: 'Supplier Authentication', desc: 'Blockchain-verified supplier identity and credential validation', stat: '100% verified' },
                { icon: Zap, title: 'Lightning-Fast Execution', desc: 'Sub-second response times with parallel negotiation capabilities', stat: '<500ms latency' }
              ].map((feature, idx) => (
                <div key={idx} className="bg-black/30 rounded-lg p-4 border border-slate-700 hover:border-blue-500/30 transition-colors">
                  <feature.icon className="w-6 h-6 text-blue-400 mb-2" />
                  <h5 className="font-semibold text-white text-sm mb-1">{feature.title}</h5>
                  <p className="text-xs text-gray-400 mb-2">{feature.desc}</p>
                  <span className="text-xs font-medium text-green-400">{feature.stat}</span>
                </div>
              ))}
            </div>

            {/* Live Negotiation Demo */}
            <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/20 rounded-xl p-6 border border-blue-500/20">
              <h5 className="font-semibold text-white mb-4 flex items-center gap-2">
                <Play className="w-4 h-4 text-cyan-400" /> Live Negotiation Simulation
              </h5>
              <div className="space-y-3">
                {[
                  { role: 'Agent', message: 'Based on our volume commitment of 50K units quarterly, we propose $12.40/unit with 2/10 net 45 terms.', time: '10:23:45 AM', type: 'bot' },
                  { role: 'Supplier', message: 'We can meet $12.60/unit at that volume. Payment terms would need to be net 30 for best pricing.', time: '10:23:47 AM', type: 'supplier' },
                  { role: 'Agent', message: 'Analyzing counter-offer... Market data shows 3 competitors at $11.80-$12.45. Revised proposal: $12.35 with 2/10 net 40, including quality guarantee clause.', time: '10:23:52 AM', type: 'bot' },
                  { role: 'System', message: '✓ Optimal outcome detected: 8.3% below target price, within acceptable risk parameters.', time: '10:23:53 AM', type: 'system' }
                ].map((msg, idx) => (
                  <div key={idx} className={`flex items-start gap-3 p-3 rounded-lg ${
                    msg.type === 'bot' ? 'bg-blue-500/10 border-l-2 border-blue-500' :
                    msg.type === 'supplier' ? 'bg-orange-500/10 border-l-2 border-orange-500' :
                    'bg-green-500/10 border-l-2 border-green-500'
                  }`}>
                    <span className={`text-xs font-mono text-gray-500 mt-0.5`}>{msg.time}</span>
                    <div className="flex-1">
                      <span className={`text-xs font-semibold ${
                        msg.type === 'bot' ? 'text-blue-400' :
                        msg.type === 'supplier' ? 'text-orange-400' : 'text-green-400'
                      }`}>{msg.role}: </span>
                      <span className="text-sm text-gray-300">{msg.message}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Self-Healing Supply Chain Workflows */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 hover:border-emerald-500/50 rounded-xl p-8 transition-all duration-300">
        <div className="flex items-start gap-6">
          <div className="p-4 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex-shrink-0">
            <RefreshCcw className="w-10 h-10 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <h4 className="text-2xl font-bold text-white">Self-Healing Supply Chain Workflows</h4>
              <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-medium">Autonomous</span>
              <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-medium">Adaptive</span>
            </div>
            <p className="text-gray-300 mb-6 text-lg">Intelligent workflow systems that automatically detect anomalies, diagnose root causes, and execute remediation actions without human intervention—reducing disruption recovery time by 90%.</p>

            {/* Self-Healing Capabilities */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Anomaly Detection & Diagnosis */}
              <div className="bg-black/30 rounded-xl p-6 border border-slate-700">
                <div className="flex items-center gap-3 mb-4">
                  <Activity className="w-8 h-8 text-red-400" />
                  <h5 className="font-semibold text-white text-lg">Anomaly Detection Engine</h5>
                </div>
                <div className="space-y-3">
                  {[
                    { name: 'Demand Spike Detection', status: 'Active', accuracy: '99.2%' },
                    { name: 'Supply Disruption Prediction', status: 'Active', accuracy: '97.8%' },
                    { name: 'Quality Deviation Alert', status: 'Active', accuracy: '98.5%' },
                    { name: 'Logistics Delay Identification', status: 'Active', accuracy: '96.4%' },
                    { name: 'Financial Risk Sensing', status: 'Active', accuracy: '95.9%' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 bg-slate-800/50 rounded">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                        <span className="text-sm text-gray-300">{item.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-green-400 font-mono">{item.accuracy}</span>
                        <span className="px-2 py-0.5 bg-green-500/20 text-green-400 rounded text-xs">{item.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Auto-Remediation Actions */}
              <div className="bg-black/30 rounded-xl p-6 border border-slate-700">
                <div className="flex items-center gap-3 mb-4">
                  <Wrench className="w-8 h-8 text-amber-400" />
                  <h5 className="font-semibold text-white text-lg">Auto-Remediation Actions</h5>
                </div>
                <div className="space-y-3">
                  {[
                    { action: 'Automatic Supplier Switch', trigger: 'Quality drop >5%', time: '<2min', success: '94%' },
                    { action: 'Dynamic Route Optimization', trigger: 'Port congestion', time: '<30sec', success: '97%' },
                    { action: 'Safety Stock Activation', trigger: 'Demand surge +25%', time: '<1min', success: '99%' },
                    { action: 'Alternative Sourcing Initiation', trigger: 'Supplier bankruptcy risk', time: '<5min', success: '92%' },
                    { action: 'Priority Shipment Upgrade', trigger: 'Critical delay alert', time: '<15sec', success: '98%' }
                  ].map((item, idx) => (
                    <div key={idx} className="p-3 bg-slate-800/50 rounded border border-slate-700 hover:border-amber-500/30 transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-white">{item.action}</span>
                        <span className="text-xs text-amber-400 font-mono">{item.success} success</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>Trigger: {item.trigger}</span>
                        <span>Response: {item.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Self-Healing Workflow Visualization */}
            <div className="bg-gradient-to-r from-emerald-900/20 to-teal-900/20 rounded-xl p-6 border border-emerald-500/20">
              <h5 className="font-semibold text-white mb-4 flex items-center gap-2">
                <Workflow className="w-5 h-5 text-emerald-400" /> Self-Healing Workflow Lifecycle
              </h5>
              <div className="flex items-center justify-between relative">
                {/* Connection Line */}
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-yellow-500 to-green-500 -translate-y-1/2 z-0"></div>
                
                {[
                  { step: 'Detect', icon: Activity, color: 'bg-blue-500' },
                  { step: 'Diagnose', icon: BrainCircuit, color: 'bg-purple-500' },
                  { step: 'Plan', icon: Puzzle, color: 'bg-yellow-500' },
                  { step: 'Execute', icon: Play, color: 'bg-orange-500' },
                  { step: 'Verify', icon: CheckCircle2, color: 'bg-green-500' },
                  { step: 'Learn', icon: Sparkles, color: 'bg-pink-500' }
                ].map((phase, idx) => (
                  <div key={idx} className="relative z-10 flex flex-col items-center">
                    <div className={`w-14 h-14 ${phase.color} rounded-full flex items-center justify-center shadow-lg mb-2`}>
                      <phase.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs font-medium text-white">{phase.step}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                <div className="bg-black/30 rounded-lg p-3">
                  <div className="text-2xl font-bold text-green-400">89%</div>
                  <div className="text-xs text-gray-400">Issues Auto-Resolved</div>
                </div>
                <div className="bg-black/30 rounded-lg p-3">
                  <div className="text-2xl font-bold text-blue-400">4.2min</div>
                  <div className="text-xs text-gray-400">Avg Resolution Time</div>
                </div>
                <div className="bg-black/30 rounded-lg p-3">
                  <div className="text-2xl font-bold text-purple-400">$2.3M</div>
                  <div className="text-xs text-gray-400">Monthly Savings</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Multi-Agent Orchestration Layer */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 hover:border-purple-500/50 rounded-xl p-8 transition-all duration-300">
        <div className="flex items-start gap-6">
          <div className="p-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex-shrink-0">
            <Network className="w-10 h-10 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <h4 className="text-2xl font-bold text-white">Multi-Agent Orchestration Layer</h4>
              <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs font-medium">Distributed</span>
              <span className="px-2 py-1 bg-pink-500/20 text-pink-400 rounded-full text-xs font-medium">Scalable</span>
            </div>
            <p className="text-gray-300 mb-6 text-lg">Sophisticated agent coordination framework enabling hundreds of specialized AI agents to collaborate on complex supply chain decisions through shared protocols, distributed consensus, and emergent intelligence.</p>

            {/* Agent Network Visualization */}
            <div className="bg-black/40 rounded-xl p-6 mb-6 border border-purple-500/20">
              <h5 className="font-semibold text-white mb-4 flex items-center gap-2">
                <Network className="w-5 h-5 text-purple-400" /> Active Agent Network Topology
              </h5>
              <div className="relative h-80 bg-gradient-to-b from-slate-900 to-slate-950 rounded-lg overflow-hidden">
                {/* Central Orchestrator */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-xl shadow-purple-500/50 animate-pulse">
                    <BrainCircuit className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-xs text-center text-white mt-2 font-medium">Orchestrator</div>
                </div>

                {/* Agent Nodes */}
                {[
                  { name: 'Procurement Agent', x: '20%', y: '25%', color: 'from-blue-500 to-cyan-500', icon: Bot },
                  { name: 'Logistics Agent', x: '75%', y: '20%', color: 'from-green-500 to-emerald-500', icon: Truck },
                  { name: 'Risk Agent', x: '15%', y: '70%', color: 'from-red-500 to-orange-500', icon: ShieldAlert },
                  { name: 'Demand Agent', x: '80%', y: '65%', color: 'from-yellow-500 to-amber-500', icon: TrendingUp },
                  { name: 'Quality Agent', x: '45%', y: '15%', color: 'from-indigo-500 to-purple-500', icon: BadgeCheck },
                  { name: 'Finance Agent', x: '50%', y: '80%', color: 'from-emerald-500 to-teal-500', icon: DollarSign }
                ].map((agent, idx) => (
                  <div 
                    key={idx}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={{ left: agent.x, top: agent.y }}
                  >
                    {/* Connection Line to Center */}
                    <svg className="absolute top-1/2 left-1/2 w-[200px] h-[200px] -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-20">
                      <line x1="100" y1="100" x2={agent.x === '20%' || agent.x === '15%' ? '0' : agent.x === '75%' || agent.x === '80%' ? '200' : '100'} 
                            y2={agent.y === '25%' || agent.y === '20%' || agent.y === '15%' ? '0' : agent.y === '70%' || agent.y === '65%' || agent.y === '80%' ? '200' : '100'} 
                            stroke="url(#purpleGradient)" strokeWidth="2" strokeDasharray="5,5">
                        <animate attributeName="stroke-dashoffset" values="0;10" dur="1s" repeatCount="indefinite" />
                      </line>
                    </svg>
                    
                    <div className={`w-14 h-14 bg-gradient-to-br ${agent.color} rounded-xl flex items-center justify-center shadow-lg`}>
                      <agent.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-xs text-center text-white mt-1 max-w-[80px] truncate">{agent.name}</div>
                  </div>
                ))}

                <defs>
                  <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
              </div>
            </div>

            {/* Orchestration Protocols */}
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  title: 'Consensus Protocol',
                  icon: GitBranch,
                  desc: 'PBFT-based distributed decision making for critical supply chain choices',
                  features: ['Byzantine fault tolerance', 'Voting mechanisms', 'Quorum requirements'],
                  metric: '99.99% uptime'
                },
                {
                  title: 'Communication Bus',
                  icon: Link2,
                  desc: 'High-throughput message passing with semantic understanding',
                  features: ['Event-driven architecture', 'Pub/Sub patterns', 'Message queuing'],
                  metric: '1M msgs/sec'
                },
                {
                  title: 'Resource Manager',
                  icon: Cpu,
                  desc: 'Dynamic allocation of compute, memory, and API resources across agents',
                  features: ['Auto-scaling', 'Load balancing', 'Cost optimization'],
                  metric: '40% cost reduction'
                }
              ].map((protocol, idx) => (
                <div key={idx} className="bg-black/30 rounded-xl p-5 border border-slate-700 hover:border-purple-500/30 transition-colors">
                  <protocol.icon className="w-8 h-8 text-purple-400 mb-3" />
                  <h5 className="font-semibold text-white mb-2">{protocol.title}</h5>
                  <p className="text-sm text-gray-400 mb-3">{protocol.desc}</p>
                  <ul className="space-y-1 mb-3">
                    {protocol.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2 text-xs text-gray-300">
                        <ChevronRight className="w-3 h-3 text-purple-400" /> {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-3 border-t border-slate-700">
                    <span className="text-sm font-medium text-purple-400">{protocol.metric}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Human-in-the-Loop Approval Gates */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 hover:border-amber-500/50 rounded-xl p-8 transition-all duration-300">
        <div className="flex items-start gap-6">
          <div className="p-4 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex-shrink-0">
            <UserCheck className="w-10 h-10 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <h4 className="text-2xl font-bold text-white">Human-in-the-Loop Approval Gates</h4>
              <span className="px-2 py-1 bg-amber-500/20 text-amber-400 rounded-full text-xs font-medium">Governed</span>
              <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-medium">Auditable</span>
            </div>
            <p className="text-gray-300 mb-6 text-lg">Intelligent escalation framework ensuring critical decisions receive appropriate human oversight while maintaining autonomous efficiency for routine operations. Configurable thresholds adapt to organizational risk tolerance.</p>

            {/* Approval Gate Tiers */}
            <div className="space-y-4 mb-6">
              {[
                {
                  tier: 'Tier 1 - Full Autonomy',
                  threshold: '<$50K impact',
                  color: 'from-green-500/20 to-emerald-500/20',
                  borderColor: 'border-green-500/30',
                  examples: ['Routine PO approvals', 'Standard supplier onboarding', 'Price variations <5%', 'Inventory rebalancing'],
                  stats: { autoApproved: '78%', avgTime: 'Instant' }
                },
                {
                  tier: 'Tier 2 - Notification Only',
                  threshold: '$50K - $250K impact',
                  color: 'from-blue-500/20 to-cyan-500/20',
                  borderColor: 'border-blue-500/30',
                  examples: ['New supplier qualification', 'Contract modifications', 'Volume changes >20%', 'Multi-party agreements'],
                  stats: { autoApproved: '15%', avgTime: '<4hr review' }
                },
                {
                  tier: 'Tier 3 - Explicit Approval',
                  threshold: '$250K - $1M impact',
                  color: 'from-yellow-500/20 to-amber-500/20',
                  borderColor: 'border-yellow-500/30',
                  examples: ['Strategic sourcing decisions', 'Major contract negotiations', 'Supply base changes', 'Technology investments'],
                  stats: { autoApproved: '5%', avgTime: '<24hr review' }
                },
                {
                  tier: 'Tier 4 - Executive Sign-off',
                  threshold: '>$1M impact / Strategic',
                  color: 'from-red-500/20 to-orange-500/20',
                  borderColor: 'border-red-500/30',
                  examples: ['M&A supply chain integration', 'Geographic restructuring', 'Board-level commitments', 'Crisis responses'],
                  stats: { autoApproved: '2%', avgTime: '<72hr review' }
                }
              ].map((tier, idx) => (
                <div key={idx} className={`bg-gradient-to-r ${tier.color} ${tier.borderColor} border rounded-xl p-5`}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h5 className="font-semibold text-white text-lg">{tier.tier}</h5>
                      <span className="text-sm text-gray-400">Decision threshold: {tier.threshold}</span>
                    </div>
                    <div className="flex gap-4 text-right">
                      <div>
                        <div className="text-lg font-bold text-green-400">{tier.stats.autoApproved}</div>
                        <div className="text-xs text-gray-400">Auto-approved</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-blue-400">{tier.stats.avgTime}</div>
                        <div className="text-xs text-gray-400">Avg Time</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tier.examples.map((example, eIdx) => (
                      <span key={eIdx} className="px-2 py-1 bg-black/30 rounded text-xs text-gray-300">
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Approval Dashboard Preview */}
            <div className="bg-gradient-to-r from-amber-900/20 to-orange-900/20 rounded-xl p-6 border border-amber-500/20">
              <h5 className="font-semibold text-white mb-4 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-400" /> Pending Approvals Dashboard
              </h5>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="py-2 px-3 text-gray-400 font-medium text-sm">Request ID</th>
                      <th className="py-2 px-3 text-gray-400 font-medium text-sm">Type</th>
                      <th className="py-2 px-3 text-gray-400 font-medium text-sm">Value</th>
                      <th className="py-2 px-3 text-gray-400 font-medium text-sm">Tier</th>
                      <th className="py-2 px-3 text-gray-400 font-medium text-sm">Requested By</th>
                      <th className="py-2 px-3 text-gray-400 font-medium text-sm">Status</th>
                      <th className="py-2 px-3 text-gray-400 font-medium text-sm">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {[
                      { id: 'AGR-2025-0892', type: 'Contract Renewal', value: '$890K', tier: 'T3', requester: 'J. Smith', status: 'Pending Review', urgent: true },
                      { id: 'AGR-2025-0891', type: 'New Supplier', value: '$340K', tier: 'T3', requester: 'M. Chen', status: 'Info Requested', urgent: false },
                      { id: 'AGR-2025-0890', type: 'Volume Increase', value: '$125K', tier: 'T2', requester: 'A. Patel', status: 'Auto-notified', urgent: false },
                      { id: 'AGR-2025-0889', type: 'Emergency Sourcing', value: '$2.1M', tier: 'T4', requester: 'S. Williams', status: 'Escalated', urgent: true }
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-white/5 transition-colors">
                        <td className="py-3 px-3 text-white font-mono text-sm">{row.id}</td>
                        <td className="py-3 px-3 text-gray-300 text-sm">{row.type}</td>
                        <td className="py-3 px-3 text-white font-semibold text-sm">{row.value}</td>
                        <td className="py-3 px-3"><span className="px-2 py-1 bg-slate-700 rounded text-xs text-gray-300">{row.tier}</span></td>
                        <td className="py-3 px-3 text-gray-300 text-sm">{row.requester}</td>
                        <td className="py-3 px-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            row.status === 'Escalated' ? 'bg-red-500/20 text-red-400' :
                            row.status === 'Pending Review' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-blue-500/20 text-blue-400'
                          }`}>
                            {row.urgent && <span className="mr-1">🔥</span>}{row.status}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <button className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded text-xs transition-colors">
                            Review
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Phase 5 Summary Metrics */}
      <div className="bg-gradient-to-r from-violet-900/30 via-purple-900/20 to-fuchsia-900/30 border border-violet-500/30 rounded-xl p-6">
        <h4 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <Trophy className="w-6 h-6 text-violet-400" /> Phase 5 Impact Summary
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            { label: 'Decisions Automated', value: '1.8M+', unit: '/day', icon: Bot, color: 'violet' },
            { label: 'Cost Savings', value: '$34M', unit: '/year', icon: DollarSign, color: 'green' },
            { label: 'Time Saved', value: '45K', unit: 'hrs/month', icon: Clock, color: 'blue' },
            { label: 'Error Reduction', value: '99.7%', unit: 'accuracy', icon: Target, color: 'purple' },
            { label: 'Resolution Speed', value: '94%', unit: 'faster', icon: Zap, color: 'amber' },
            { label: 'User Satisfaction', value: '4.9/5', unit: 'rating', icon: Star, color: 'pink' }
          ].map((metric, idx) => (
            <div key={idx} className="bg-black/30 rounded-xl p-4 text-center">
              <metric.icon className={`w-8 h-8 text-${metric.color}-400 mx-auto mb-2`} />
              <div className="text-2xl font-bold text-white">{metric.value}</div>
              <div className="text-xs text-gray-400">{metric.unit}</div>
              <div className="text-xs text-gray-500 mt-1">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  // ============================================================================
  // PHASE 6: ECOSYSTEM & MARKETPLACE SECTION (2026)
  // ============================================================================
  const EcosystemMarketplaceSection = () => (
    <div className="space-y-8">
      {/* Phase 6 Header */}
      <div className="bg-gradient-to-r from-cyan-900/40 via-teal-900/30 to-emerald-900/40 border border-cyan-500/30 rounded-xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-4 bg-gradient-to-br from-cyan-500 to-emerald-600 rounded-2xl shadow-lg shadow-cyan-500/25">
              <Marketplace className="w-12 h-12 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-3xl font-bold text-white">Ecosystem & Marketplace</h3>
                <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-xs font-semibold border border-cyan-500/30">
                  2026
                </span>
              </div>
              <p className="text-gray-300 text-lg">Thriving marketplace connecting suppliers, developers, and enterprises in a collaborative supply chain ecosystem</p>
            </div>
          </div>

          {/* Ecosystem Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {[
              { label: 'Marketplace Members', value: '12,400+', icon: Users2, color: 'text-cyan-400' },
              { label: 'API Calls/Day', value: '85M', icon: Code, color: 'text-teal-400' },
              { label: 'Plugins Available', value: '340+', icon: Plug, color: 'text-emerald-400' },
              { label: 'Revenue Shared', value: '$4.2M', icon: RevenueShare, color: 'text-green-400' }
            ].map((metric, idx) => (
              <div key={idx} className="bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <metric.icon className={`w-6 h-6 ${metric.color} mb-2`} />
                <div className="text-2xl font-bold text-white">{metric.value}</div>
                <div className="text-xs text-gray-400">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Supplier Discovery Marketplace */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 hover:border-cyan-500/50 rounded-xl p-8 transition-all duration-300">
        <div className="flex items-start gap-6">
          <div className="p-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex-shrink-0">
            <Marketplace className="w-10 h-10 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <h4 className="text-2xl font-bold text-white">Supplier Discovery Marketplace</h4>
              <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-xs font-medium">Global</span>
              <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium">Verified</span>
            </div>
            <p className="text-gray-300 mb-6 text-lg">AI-powered supplier matching platform connecting buyers with pre-qualified suppliers across 140+ countries. Advanced algorithms analyze capabilities, capacity, compliance, and compatibility to recommend optimal partnerships.</p>

            {/* Marketplace Search Interface */}
            <div className="bg-black/30 rounded-xl p-6 mb-6 border border-slate-700">
              <div className="flex gap-4 mb-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search suppliers by capability, location, certification..."
                    className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <button className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2">
                  <Search className="w-4 h-4" /> Find Suppliers
                </button>
              </div>

              {/* Quick Filters */}
              <div className="flex flex-wrap gap-2 mb-6">
                {['ISO 9001', 'ISO 14001', 'AS9100', 'FSC Certified', 'Women-Owned', 'Minority-Owned', 'ESG Compliant', 'Nearshore', 'Low-Cost Region'].map((filter, idx) => (
                  <button key={idx} className="px-3 py-1.5 bg-slate-800 hover:bg-cyan-600 border border-slate-700 hover:border-cyan-500 rounded-full text-sm text-gray-300 hover:text-white transition-colors">
                    {filter}
                  </button>
                ))}
              </div>

              {/* Featured Suppliers */}
              <h5 className="font-semibold text-white mb-4">Featured Verified Suppliers</h5>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: 'TechComponents Global', location: 'Taiwan', specialty: 'Semiconductor components', rating: 4.9, orders: '12.4K', cert: ['ISO 9001', 'AS9100'], badge: 'Premium' },
                  { name: 'EcoPack Solutions', location: 'Germany', specialty: 'Sustainable packaging', rating: 4.8, orders: '8.2K', cert: ['ISO 14001', 'FSC'], badge: 'ESG Leader' },
                  { name: 'PrecisionForge Inc', location: 'USA', specialty: 'Aerospace machining', rating: 4.9, orders: '5.6K', cert: ['AS9100', 'NADCAP'], badge: 'Top Rated' },
                  { name: 'AsiaLogistics Hub', location: 'Vietnam', specialty: 'Assembly & fulfillment', rating: 4.7, orders: '18.9K', cert: ['ISO 9001', 'SEDEX'], badge: 'Fast Growing' },
                  { name: 'NordicMaterials AB', location: 'Sweden', specialty: 'Rare earth materials', rating: 4.8, orders: '2.1K', cert: ['ISO 14001', 'IRIS'], badge: 'Innovation' },
                  { name: 'AtlanticChem Corp', location: 'Canada', specialty: 'Specialty chemicals', rating: 4.6, orders: '4.3K', cert: ['ISO 9001', 'REACH'], badge: 'Reliable' }
                ].map((supplier, idx) => (
                  <div key={idx} className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 hover:border-cyan-500/30 transition-all group cursor-pointer">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                          {supplier.name.substring(0, 2)}
                        </div>
                        <div>
                          <h6 className="font-semibold text-white text-sm group-hover:text-cyan-400 transition-colors">{supplier.name}</h6>
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Globe2 className="w-3 h-3" /> {supplier.location}
                          </span>
                        </div>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        supplier.badge === 'Premium' ? 'bg-yellow-500/20 text-yellow-400' :
                        supplier.badge === 'ESG Leader' ? 'bg-green-500/20 text-green-400' :
                        supplier.badge === 'Top Rated' ? 'bg-purple-500/20 text-purple-400' :
                        supplier.badge === 'Fast Growing' ? 'bg-blue-500/20 text-blue-400' :
                        supplier.badge === 'Innovation' ? 'bg-pink-500/20 text-pink-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {supplier.badge}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mb-3">{supplier.specialty}</p>
                    <div className="flex items-center justify-between text-xs mb-3">
                      <span className="flex items-center gap-1 text-yellow-400">
                        <Star className="w-3 h-3 fill-current" /> {supplier.rating}
                      </span>
                      <span className="text-gray-500">{supplier.orders} orders fulfilled</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {supplier.cert.map((c, cIdx) => (
                        <span key={cIdx} className="px-1.5 py-0.5 bg-slate-700 rounded text-xs text-gray-400">{c}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Exchange Network (Federated Learning) */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 hover:border-indigo-500/50 rounded-xl p-8 transition-all duration-300">
        <div className="flex items-start gap-6">
          <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex-shrink-0">
            <Blocks className="w-10 h-10 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <h4 className="text-2xl font-bold text-white">Data Exchange Network</h4>
              <span className="px-2 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-xs font-medium">Federated Learning</span>
              <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs font-medium">Privacy-Preserving</span>
            </div>
            <p className="text-gray-300 mb-6 text-lg">Revolutionary federated learning network enabling organizations to collaboratively train AI models without sharing raw data. Contribute insights, benefit from collective intelligence, and maintain complete data sovereignty.</p>

            {/* Federated Learning Architecture */}
            <div className="bg-black/30 rounded-xl p-6 mb-6 border border-indigo-500/20">
              <h5 className="font-semibold text-white mb-4 flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-indigo-400" /> Federated Learning Architecture
              </h5>
              <div className="grid md:grid-cols-3 gap-6">
                {/* Data Nodes */}
                <div className="space-y-3">
                  <h6 className="text-sm font-medium text-indigo-400 flex items-center gap-2">
                    <Database className="w-4 h-4" /> Participant Nodes
                  </h6>
                  {[
                    { name: 'Retail Consortium', datasets: '2.4M records', contribution: 'High' },
                    { name: 'Manufacturing Alliance', datasets: '1.8M records', contribution: 'High' },
                    { name: 'Logistics Network', datasets: '3.1M records', contribution: 'Medium' },
                    { name: 'Financial Group', datasets: '890K records', contribution: 'Medium' }
                  ].map((node, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 bg-slate-800/50 rounded">
                      <span className="text-sm text-gray-300">{node.name}</span>
                      <span className="text-xs text-indigo-400">{node.datasets}</span>
                    </div>
                  ))}
                </div>

                {/* Aggregation Server */}
                <div className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-xl border border-indigo-500/20">
                  <BrainCircuit className="w-16 h-16 text-indigo-400 mb-3 animate-pulse" />
                  <h6 className="font-semibold text-white text-center">Secure Aggregation</h6>
                  <p className="text-xs text-gray-400 text-center mt-1">Model updates encrypted & combined</p>
                  <div className="mt-3 space-y-1 text-center">
                    <div className="text-xs text-gray-500">Current Round: #8,432</div>
                    <div className="text-xs text-green-400">Accuracy: 94.7%</div>
                  </div>
                </div>

                {/* Global Model Benefits */}
                <div className="space-y-3">
                  <h6 className="text-sm font-medium text-purple-400 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" /> Collective Benefits
                  </h6>
                  {[
                    { benefit: 'Demand Prediction Accuracy', improvement: '+23%' },
                    { benefit: 'Risk Detection Rate', improvement: '+31%' },
                    { benefit: 'Cost Optimization', improvement: '+18%' },
                    { benefit: 'Lead Time Forecast', improvement: '-28%' }
                  ].map((item, idx) => (
                    <div key={idx} className="p-2 bg-slate-800/50 rounded">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">{item.benefit}</span>
                        <span className="text-xs font-medium text-green-400">{item.improvement}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Privacy & Security Features */}
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  title: 'Differential Privacy',
                  icon: Shield,
                  desc: 'Mathematical guarantees that individual records cannot be reverse-engineered from model updates',
                  tech: ['Noise injection', 'Gradient clipping', 'Privacy budget tracking'],
                  assurance: 'ε = 0.1 (strong privacy)'
                },
                {
                  title: 'Secure Multi-Party Computation',
                  icon: Lock,
                  desc: 'Cryptographic protocols enabling computation on encrypted data without decryption',
                  tech: ['Secret sharing', 'Homomorphic encryption', 'Zero-knowledge proofs'],
                  assurance: '256-bit encryption'
                },
                {
                  title: 'Data Sovereignty Controls',
                  icon: Globe2,
                  desc: 'Full control over how your data contributes to the global model with granular permissions',
                  tech: ['Opt-in/out controls', 'Usage auditing', 'Data residency rules'],
                  assurance: 'GDPR / CCPA compliant'
                },
                {
                  title: 'Fair Incentive Mechanism',
                  icon: Coins,
                  desc: 'Token-based rewards proportional to data quality and contribution value',
                  tech: ['Quality scoring', 'Contribution tokens', 'Revenue sharing'],
                  assurance: 'Transparent allocation'
                }
              ].map((feature, idx) => (
                <div key={idx} className="bg-black/30 rounded-xl p-5 border border-slate-700 hover:border-indigo-500/30 transition-colors">
                  <feature.icon className="w-8 h-8 text-indigo-400 mb-3" />
                  <h5 className="font-semibold text-white mb-2">{feature.title}</h5>
                  <p className="text-sm text-gray-400 mb-3">{feature.desc}</p>
                  <ul className="space-y-1 mb-3">
                    {feature.tech.map((t, tIdx) => (
                      <li key={tIdx} className="flex items-center gap-2 text-xs text-gray-300">
                        <ChevronRight className="w-3 h-3 text-indigo-400" /> {t}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-3 border-t border-slate-700">
                    <span className="text-xs font-medium text-indigo-400">{feature.assurance}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Developer Plugin Ecosystem */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 hover:border-emerald-500/50 rounded-xl p-8 transition-all duration-300">
        <div className="flex items-start gap-6">
          <div className="p-4 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex-shrink-0">
            <Plug className="w-10 h-10 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <h4 className="text-2xl font-bold text-white">Developer Plugin Ecosystem</h4>
              <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-medium">Extensible</span>
              <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium">Open Platform</span>
            </div>
            <p className="text-gray-300 mb-6 text-lg">Rich plugin architecture enabling developers to extend platform capabilities, integrate custom systems, and build innovative solutions on top of the AI Supply Chain foundation.</p>

            {/* Plugin Categories */}
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              {[
                { category: 'Data Connectors', count: 84, icon: Database, color: 'from-blue-500 to-cyan-500', desc: 'ERP, CRM, IoT systems' },
                { category: 'Analytics Extensions', count: 67, icon: BarChart3, color: 'from-purple-500 to-pink-500', desc: 'Custom ML models, visualizations' },
                { category: 'Automation Tools', count: 112, icon: Workflow, color: 'from-orange-500 to-red-500', desc: 'Workflows, triggers, actions' },
                { category: 'Integration Adapters', count: 77, icon: Link2, color: 'from-green-500 to-teal-500', desc: 'Third-party APIs, webhooks' }
              ].map((cat, idx) => (
                <div key={idx} className="bg-black/30 rounded-xl p-4 border border-slate-700 hover:border-emerald-500/30 transition-colors text-center">
                  <div className={`w-12 h-12 bg-gradient-to-br ${cat.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                    <cat.icon className="w-6 h-6 text-white" />
                  </div>
                  <h5 className="font-semibold text-white text-sm">{cat.category}</h5>
                  <div className="text-2xl font-bold text-emerald-400 my-1">{cat.count}</div>
                  <p className="text-xs text-gray-400">{cat.desc}</p>
                </div>
              ))}
            </div>

            {/* Featured Plugins */}
            <div className="bg-black/30 rounded-xl p-6 border border-slate-700 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h5 className="font-semibold text-white flex items-center gap-2">
                  <Gamepad2 className="w-5 h-5 text-emerald-400" /> Trending Plugins
                </h5>
                <button className="text-sm text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
                  View All <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: 'SAP S/4HANA Connector', author: 'Official', installs: '45K', rating: 4.9, desc: 'Real-time bi-directional sync with SAP ERP systems', updated: '2 days ago' },
                  { name: 'DemandSense Pro', author: 'ML Labs', installs: '32K', rating: 4.8, desc: 'Advanced demand forecasting with external signals', updated: '1 week ago' },
                  { name: 'CarbonTracker', author: 'GreenTech', installs: '28K', rating: 4.9, desc: 'Real-time carbon footprint calculation and reporting', updated: '3 days ago' },
                  { name: 'Slack Notifications', author: 'Community', installs: '22K', rating: 4.7, desc: 'Instant alerts and approvals via Slack workspace', updated: '5 days ago' },
                  { name: 'GeoRisk Monitor', author: 'RiskAI', installs: '19K', rating: 4.8, desc: 'Geospatial risk analysis and heat mapping', updated: '1 day ago' },
                  { name: 'DocuSign Integration', author: 'Official', installs: '17K', rating: 4.9, desc: 'Automated contract generation and e-signature', updated: '4 days ago' }
                ].map((plugin, idx) => (
                  <div key={idx} className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 hover:border-emerald-500/30 transition-all group cursor-pointer">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Code className="w-5 h-5 text-emerald-400" />
                        <h6 className="font-medium text-white text-sm group-hover:text-emerald-400 transition-colors">{plugin.name}</h6>
                      </div>
                      <span className={`px-1.5 py-0.5 rounded text-xs ${
                        plugin.author === 'Official' ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {plugin.author}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mb-3 line-clamp-2">{plugin.desc}</p>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1 text-yellow-400">
                          <Star className="w-3 h-3 fill-current" /> {plugin.rating}
                        </span>
                        <span className="text-gray-500">{plugin.installs} installs</span>
                      </div>
                      <span className="text-gray-600">{plugin.updated}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Developer Resources */}
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { title: 'Plugin SDK', icon: Code, desc: 'Comprehensive toolkit for building plugins with TypeScript support', docs: 'SDK v3.2', link: 'Get Started' },
                { title: 'API Reference', icon: BookOpen, desc: 'Complete REST and GraphQL API documentation with examples', docs: '400+ endpoints', link: 'Explore Docs' },
                { title: 'Developer Portal', icon: Users2, desc: 'Community forums, sandbox environment, and partner program', docs: '12K+ devs', link: 'Join Community' }
              ].map((resource, idx) => (
                <div key={idx} className="bg-gradient-to-br from-emerald-900/20 to-green-900/20 rounded-xl p-5 border border-emerald-500/20">
                  <resource.icon className="w-8 h-8 text-emerald-400 mb-3" />
                  <h5 className="font-semibold text-white mb-2">{resource.title}</h5>
                  <p className="text-sm text-gray-400 mb-3">{resource.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-emerald-400">{resource.docs}</span>
                    <button className="text-xs text-white bg-emerald-600 hover:bg-emerald-700 px-3 py-1 rounded transition-colors">
                      {resource.link}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* API Marketplace with Revenue Sharing */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 hover:border-pink-500/50 rounded-xl p-8 transition-all duration-300">
        <div className="flex items-start gap-6">
          <div className="p-4 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex-shrink-0">
            <RevenueShare className="w-10 h-10 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <h4 className="text-2xl font-bold text-white">API Marketplace & Revenue Sharing</h4>
              <span className="px-2 py-1 bg-pink-500/20 text-pink-400 rounded-full text-xs font-medium">Monetization</span>
              <span className="px-2 py-1 bg-rose-500/20 text-rose-400 rounded-full text-xs font-medium">Revenue Share</span>
            </div>
            <p className="text-gray-300 mb-6 text-lg">Publish, discover, and monetize APIs in a thriving marketplace. Connect data providers with consumers through seamless API integration with transparent revenue sharing and usage analytics.</p>

            {/* Revenue Sharing Model */}
            <div className="bg-gradient-to-r from-pink-900/20 to-rose-900/20 rounded-xl p-6 mb-6 border border-pink-500/20">
              <h5 className="font-semibold text-white mb-4 flex items-center gap-2">
                <Coins className="w-5 h-5 text-pink-400" /> Revenue Sharing Structure
              </h5>
              <div className="grid md:grid-cols-4 gap-4">
                {[
                  { stakeholder: 'API Provider', share: '70%', color: 'text-pink-400', desc: 'Primary earner' },
                  { stakeholder: 'Platform Fee', share: '15%', color: 'text-gray-400', desc: 'Infrastructure & support' },
                  { stakeholder: 'Ecosystem Fund', share: '10%', color: 'text-purple-400', desc: 'Developer grants' },
                  { stakeholder: 'Referral Bonus', share: '5%', color: 'text-green-400', desc: 'Affiliate rewards' }
                ].map((item, idx) => (
                  <div key={idx} className="text-center">
                    <div className={`text-4xl font-bold ${item.color} mb-2`}>{item.share}</div>
                    <div className="font-medium text-white text-sm">{item.stakeholder}</div>
                    <div className="text-xs text-gray-500">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular API Categories */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {[
                {
                  category: 'Supply Chain Data',
                  apis: 145,
                  icon: Truck,
                  color: 'from-blue-500 to-cyan-500',
                  examples: ['Tracking APIs', 'Inventory APIs', 'Shipment APIs'],
                  avgPrice: '$0.002/call'
                },
                {
                  category: 'Financial Intelligence',
                  apis: 89,
                  icon: DollarSign,
                  color: 'from-green-500 to-emerald-500',
                  examples: ['Credit Risk APIs', 'Pricing APIs', 'Forex APIs'],
                  avgPrice: '$0.005/call'
                },
                {
                  category: 'AI/ML Models',
                  apis: 67,
                  icon: Brain,
                  color: 'from-purple-500 to-pink-500',
                  examples: ['Forecast APIs', 'NLP APIs', 'Vision APIs'],
                  avgPrice: '$0.01/call'
                },
                {
                  category: 'Compliance & ESG',
                  apis: 54,
                  icon: Shield,
                  color: 'from-amber-500 to-orange-500',
                  examples: ['Compliance APIs', 'Carbon APIs', 'Labor APIs'],
                  avgPrice: '$0.003/call'
                },
                {
                  category: 'IoT & Sensors',
                  apis: 112,
                  icon: Activity,
                  color: 'from-red-500 to-rose-500',
                  examples: ['Temperature APIs', 'Location APIs', 'Sensor APIs'],
                  avgPrice: '$0.001/call'
                },
                {
                  category: 'Geospatial',
                  apis: 43,
                  icon: Globe2,
                  color: 'from-indigo-500 to-violet-500',
                  examples: ['Mapping APIs', 'Weather APIs', 'Route APIs'],
                  avgPrice: '$0.004/call'
                }
              ].map((apiCat, idx) => (
                <div key={idx} className="bg-black/30 rounded-xl p-5 border border-slate-700 hover:border-pink-500/30 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 bg-gradient-to-br ${apiCat.color} rounded-lg flex items-center justify-center`}>
                      <apiCat.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-white text-sm">{apiCat.category}</h5>
                      <span className="text-xs text-gray-500">{apiCat.apis} APIs available</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {apiCat.examples.map((ex, eIdx) => (
                      <span key={eIdx} className="px-2 py-0.5 bg-slate-700 rounded text-xs text-gray-400">{ex}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-slate-700">
                    <span className="text-xs text-gray-400">Starting at</span>
                    <span className="text-sm font-medium text-pink-400">{apiCat.avgPrice}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Top Earners Leaderboard */}
            <div className="bg-black/30 rounded-xl p-6 border border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <h5 className="font-semibold text-white flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-400" /> Top API Providers This Month
                </h5>
                <span className="text-xs text-gray-500">Updated real-time</span>
              </div>
              <div className="space-y-3">
                {[
                  { rank: 1, provider: 'GlobalTrade Data Corp', api: 'Real-time Shipping Rates', calls: '12.4M', revenue: '$86.8K', growth: '+23%' },
                  { rank: 2, provider: 'PredictAI Systems', api: 'Demand Forecast Pro', calls: '8.9M', revenue: '$89K', growth: '+45%' },
                  { rank: 3, provider: 'EcoTrack Technologies', api: 'Carbon Footprint Calculator', calls: '7.2M', revenue: '$21.6K', growth: '+67%' },
                  { rank: 4, provider: 'SupplyChain Finance', api: 'Supplier Credit Scoring', calls: '5.8M', revenue: '$29K', growth: '+18%' },
                  { rank: 5, provider: 'GeoIntelligence Ltd', api: 'Risk Heat Maps', calls: '4.1M', revenue: '$16.4K', growth: '+34%' }
                ].map((provider, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-3 bg-slate-800/50 rounded-lg hover:bg-slate-800 transition-colors">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      provider.rank === 1 ? 'bg-yellow-500 text-yellow-900' :
                      provider.rank === 2 ? 'bg-gray-400 text-gray-900' :
                      provider.rank === 3 ? 'bg-amber-600 text-amber-100' :
                      'bg-slate-700 text-gray-400'
                    }`}>
                      {provider.rank}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-white text-sm">{provider.provider}</div>
                      <div className="text-xs text-gray-500">{provider.api}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-white">{provider.revenue}</div>
                      <div className="text-xs text-green-400">{provider.growth}</div>
                    </div>
                    <div className="text-right text-xs text-gray-500">
                      <div>{provider.calls} calls</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Phase 6 Summary & Roadmap */}
      <div className="bg-gradient-to-r from-cyan-900/30 via-teal-900/20 to-emerald-900/30 border border-cyan-500/30 rounded-xl p-6">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Ecosystem Growth Trajectory */}
          <div>
            <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Rocket className="w-6 h-6 text-cyan-400" /> Ecosystem Growth Trajectory
            </h4>
            <div className="space-y-4">
              {[
                { quarter: 'Q1 2026', milestone: 'Marketplace Launch', status: 'completed', details: 'Core marketplace infrastructure live' },
                { quarter: 'Q2 2026', milestone: 'Federated Learning Pilot', status: 'in-progress', details: '50 enterprise participants onboarded' },
                { quarter: 'Q3 2026', milestone: 'Plugin SDK 4.0', status: 'upcoming', details: 'Enhanced developer tools & monetization' },
                { quarter: 'Q4 2026', milestone: 'Global Expansion', status: 'planned', details: 'APAC & EMEA marketplace regions' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className={`w-3 h-3 rounded-full mt-1.5 flex-shrink-0 ${
                    item.status === 'completed' ? 'bg-green-400' :
                    item.status === 'in-progress' ? 'bg-blue-400 animate-pulse' :
                    'bg-gray-600'
                  }`}></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-white text-sm">{item.milestone}</span>
                      <span className="text-xs text-gray-500">{item.quarter}</span>
                      <span className={`px-2 py-0.5 rounded text-xs ${
                        item.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                        item.status === 'in-progress' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{item.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vision Statement */}
          <div>
            <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Hexagon className="w-6 h-6 text-emerald-400" /> 2026 Vision
            </h4>
            <div className="bg-black/30 rounded-xl p-6 border border-emerald-500/20">
              <blockquote className="text-gray-300 italic mb-4">
                "By 2026, AI Supply Chain will be the world's largest collaborative commerce ecosystem, where thousands of organizations seamlessly transact, share intelligence, and innovate together—setting the gold standard for the next decade of digital trade."
              </blockquote>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-700">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-emerald-600 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-medium text-white text-sm">Executive Vision</div>
                  <div className="text-xs text-gray-500">AI Supply Chain Platform</div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              {[
                { label: 'Target Participants', value: '25K+', icon: Users2 },
                { label: 'API Transactions/Day', value: '500M+', icon: Code },
                { label: 'Ecosystem Value', value: '$2B+', icon: DollarSign },
                { label: 'Countries Covered', value: '180+', icon: Globe2 }
              ].map((stat, idx) => (
                <div key={idx} className="bg-black/30 rounded-lg p-3 text-center">
                  <stat.icon className="w-6 h-6 text-emerald-400 mx-auto mb-1" />
                  <div className="text-lg font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // Render active section content
  const renderContent = () => {
    switch (activeTab) {
      case 'governance': return <GovernanceSection />
      case 'esg': return <ESGSection />
      case 'analytics': return <AnalyticsAISection />
      case 'cx': return <CustomerExperienceSection />
      case 'case-studies': return <CaseStudiesSection />
      case 'commercial': return <CommercialModelsSection />
      case 'autonomous-agents': return <AutonomousAgentsSection />
      case 'ecosystem': return <EcosystemMarketplaceSection />
      default: return <OverviewContent />
    }
  }

  // Overview Content
  const OverviewContent = () => (
    <div className="space-y-8">
      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Users', value: '12,450+', icon: Users, color: 'text-blue-400' },
          { label: 'Data Points', value: '2.4B+', icon: Database, color: 'text-green-400' },
          { label: 'AI Predictions', value: '99.2%', icon: Brain, color: 'text-purple-400' },
          { label: 'Global Coverage', value: '140+', icon: Globe, color: 'text-amber-400' }
        ].map((stat, idx) => (
          <div key={idx} className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
            <stat.icon className={`w-8 h-8 ${stat.color} mb-3`} />
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-sm text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Featured News */}
      <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border border-indigo-500/30 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white flex items-center gap-2">
            <Newspaper className="w-5 h-5 text-indigo-400" />
            Latest Supply Chain Intelligence
          </h3>
          <button 
            onClick={refreshNews}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-800 text-white rounded-lg text-sm transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNews.slice(0, 6).map((item) => (
            <article key={item.id} className="bg-black/30 rounded-lg p-4 hover:bg-black/50 transition-colors group cursor-pointer">
              <div className="flex items-start justify-between gap-3 mb-2">
                <span className={`px-2 py-0.5 text-xs font-medium rounded ${
                  item.impact === 'high' ? 'bg-red-500/20 text-red-400' :
                  item.impact === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {item.impact.toUpperCase()}
                </span>
                <span className="text-xs text-gray-500 whitespace-nowrap">
                  {formatTimeAgo(item.timestamp)}
                </span>
              </div>
              <h4 className="font-medium text-white group-hover:text-blue-400 transition-colors line-clamp-2 mb-2">
                {item.title}
              </h4>
              <p className="text-sm text-gray-400 line-clamp-2">{item.summary}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-gray-500">{item.source}</span>
                <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-blue-400 transition-colors" />
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Financial Markets Widget */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-green-400" />
          Global Financial Markets
        </h3>
        
        {/* Indices */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-400 mb-3">Major Indices</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {financialData.indices.map((index, idx) => (
              <div key={idx} className="bg-black/30 rounded-lg p-3">
                <div className="text-xs text-gray-500 mb-1">{index.name}</div>
                <div className="text-lg font-semibold text-white">{index.value}</div>
                <div className={`text-xs font-medium ${index.positive ? 'text-green-400' : 'text-red-400'}`}>
                  {index.change}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Commodities & Currencies */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-400 mb-3">Key Commodities</h4>
            <div className="space-y-2">
              {financialData.commodities.map((commodity, idx) => (
                <div key={idx} className="flex items-center justify-between bg-black/30 rounded px-3 py-2">
                  <span className="text-sm text-gray-300">{commodity.name}</span>
                  <div className="text-right">
                    <span className="text-sm text-white font-medium mr-2">{commodity.price}</span>
                    <span className={`text-xs ${commodity.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                      {commodity.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-400 mb-3">Currency Pairs</h4>
            <div className="space-y-2">
              {financialData.currencies.map((currency, idx) => (
                <div key={idx} className="flex items-center justify-between bg-black/30 rounded px-3 py-2">
                  <span className="text-sm text-gray-300">{currency.name}</span>
                  <div className="text-right">
                    <span className="text-sm text-white font-medium mr-2">{currency.rate}</span>
                    <span className={`text-xs ${currency.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                      {currency.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {[
          { tab: 'governance', icon: Scale, label: 'Governance', color: 'from-blue-600 to-blue-800' },
          { tab: 'esg', icon: Leaf, label: 'ESG', color: 'from-green-600 to-emerald-800' },
          { tab: 'analytics', icon: Brain, label: 'Analytics/AI', color: 'from-purple-600 to-indigo-800' },
          { tab: 'cx', icon: Smile, label: 'Experience', color: 'from-amber-600 to-orange-800' },
          { tab: 'case-studies', icon: Building2, label: 'Case Studies', color: 'from-cyan-600 to-teal-800' },
          { tab: 'commercial', icon: DollarSign, label: 'Commercial', color: 'from-emerald-600 to-green-800' },
          { tab: 'autonomous-agents', icon: Bot, label: 'Phase 5: Agents', color: 'from-violet-600 to-fuchsia-800' },
          { tab: 'ecosystem', icon: Marketplace, label: 'Phase 6: Ecosystem', color: 'from-cyan-600 to-emerald-800' }
        ].map((item, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(item.tab)}
            className={`bg-gradient-to-br ${item.color} rounded-xl p-4 text-center hover:scale-105 transition-transform duration-200`}
          >
            <item.icon className="w-8 h-8 text-white mx-auto mb-2" />
            <span className="text-sm font-medium text-white">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )

  // Helper function for time formatting
  const formatTimeAgo = (date: Date): string => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
    if (seconds < 60) return `${seconds}s ago`
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    return `${days}d ago`
  }

  // Tab configuration
  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'governance', label: 'Governance', icon: Scale },
    { id: 'esg', label: 'ESG', icon: Leaf },
    { id: 'analytics', label: 'Analytics/AI', icon: Brain },
    { id: 'cx', label: 'Customer Experience', icon: Smile },
    { id: 'case-studies', label: 'Case Studies', icon: Building2 },
    { id: 'commercial', label: 'Commercial Models', icon: DollarSign },
    { id: 'autonomous-agents', label: 'Phase 5: Agents', icon: Bot },
    { id: 'ecosystem', label: 'Phase 6: Ecosystem', icon: Store }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold text-white flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-blue-400" />
                Resources Center
              </h1>
              <span className="hidden sm:block text-sm text-gray-500">|</span>
              <span className="hidden sm:block text-sm text-gray-400">Knowledge Hub & Intelligence</span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  className="pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 w-64"
                />
              </div>
              
              <button className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm text-gray-300 transition-colors">
                <Bell className="w-4 h-4" />
                <span className="hidden sm:inline">Alerts</span>
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <nav className="mb-8 overflow-x-auto pb-2">
          <div className="flex gap-2 min-w-max">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-slate-800 text-gray-400 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Category Filter (for overview) */}
        {activeTab === 'overview' && (
          <div className="mb-6 flex items-center gap-4">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
            <span className="text-sm text-gray-500">
              Showing {filteredNews.length} articles • Last updated: {lastRefresh.toLocaleTimeString()}
            </span>
          </div>
        )}

        {/* Main Content Area */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {renderContent()}
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-800 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Guides & Tutorials</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Video Library</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Research</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Industry Reports</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Case Studies</a></li>
                <li><a href="#" className="hover:text-white transition-colors">White Papers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Webinars</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Connect</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Community Forum</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Slack Channel</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Events Calendar</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Newsletter</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Compliance</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-slate-800 text-center text-sm text-gray-500">
            <p>&copy; 2025 AI Supply Chain Platform. All rights reserved. | Built for the future of supply chain intelligence.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Additional icons used but not imported above
function Car(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18 10l-2-4H8L6 10l-2.5 1.1C2.7 11.3 2 12.1 2 13v3c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg> }
function Hospital(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-4"/><path d="M9 9v.01"/><path d="M9 12v.01"/><path d="M9 15v.01"/><path d="M9 18v.01"/></svg> }
function UtensilsCrossed(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg> }
function Cloud(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg> }
function Server(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/></svg> }
