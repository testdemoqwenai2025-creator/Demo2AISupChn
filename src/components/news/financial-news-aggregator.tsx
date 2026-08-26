'use client'

import React, { useState, useEffect, useMemo, useCallback } from 'react'
import {
  Newspaper, TrendingUp, TrendingDown, Minus,
  Globe, Clock, ExternalLink, RefreshCw, Filter,
  ChevronRight, AlertTriangle, BarChart3, DollarSign,
  Activity, Zap, ArrowUpRight, ArrowDownRight, Info,
  Bell, Star, Bookmark, Share2, Search, X,
  Building2, Landmark, Ship, Factory, Package,
  Calendar, MapPin, Tag, Eye
} from 'lucide-react'

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface FinancialNewsItem {
  id: string
  title: string
  summary: string
  content?: string
  source: NewsSource
  category: NewsCategory
  tags: string[]
  publishedAt: Date
  url: string
  
  // Market Impact Analysis
  impact: 'critical' | 'high' | 'medium' | 'low'
  sentiment: 'bullish' | 'bearish' | 'neutral'
  sentimentScore: number // -1 to +1
  
  // Supply Chain Relevance
  supplyChainRelevance: {
    score: number // 0-100
    affectedRegions: string[]
    affectedIndustries: string[]
    riskImplications: string[]
    opportunityIndicators: string[]
  }
  
  // Market Data (if applicable)
  marketData?: {
    relatedTicker?: string
    priceChange?: number
    volumeChange?: number
    volatilityIndex?: number
  }
  
  // AI Analysis
  aiInsights: {
    keyTakeaways: string[]
    predictedImpact: string
    confidenceLevel: number
    similarEvents: Array<{ title: string; date: string; outcome: string }>
  }
}

type NewsSource = 
  | 'imf' | 'world_bank' | 'wto'
  | 'sco' | 'asean' | 'eu_commission'
  | 'yahoo_finance' | 'bloomberg' | 'reuters'
  | 'wsj' | 'ft' | 'cnbc' | 'nikkei'
  | 'wef' | 'fed' | 'ecb' | 'boj'
  | 'opec' | 'iea' | 'iso'
  | 'custom' | 'rss'

type NewsCategory = 
  | 'monetary_policy' | 'fiscal_policy' | 'trade_policy'
  | 'equity_markets' | 'fixed_income' | 'commodities' | 'forex' | 'crypto'
  | 'supply_chain' | 'logistics' | 'manufacturing'
  | 'esg' | 'climate' | 'regulation'
  | 'geopolitics' | 'technology' | 'labor_market'
  | 'economic_indicators' | 'earnings' | 'm&a'

interface MarketIndex {
  symbol: string
  name: string
  value: number
  change: number
  changePercent: number
}

interface CommodityPrice {
  symbol: string
  name: string
  price: number
  unit: string
  change: number
  changePercent: number
}

interface CurrencyPair {
  pair: string
  name: string
  rate: number
  change: number
  changePips: number
}

interface EconomicIndicator {
  name: string
  value: string
  previous: string
  forecast: string
  actual: string
  impact: 'high' | 'medium' | 'low'
  currency: string
  date: string
}

// ============================================================================
// SOURCE CONFIGURATION
// ============================================================================

const NEWS_SOURCES: Record<NewsSource, { name: string; color: string; icon: string; region: string; reliability: number }> = {
  imf: { name: 'International Monetary Fund', color: '#006BA6', icon: '🏛️', region: 'Global', reliability: 0.98 },
  world_bank: { name: 'World Bank', color: '#0071BC', icon: '🌍', region: 'Global', reliability: 0.97 },
  wto: { name: 'World Trade Organization', color: '#0055A4', icon: '🌐', region: 'Global', reliability: 0.96 },
  
  sco: { name: 'Shanghai Cooperation Organization', color: '#006400', icon: '🎯', region: 'Asia-Eurasia', reliability: 0.92 },
  asean: { name: 'ASEAN Secretariat', color: '#FFD100', icon: '🤝', region: 'Southeast Asia', reliability: 0.90 },
  eu_commission: { name: 'European Commission', color: '#003399', icon: '🇪🇺', region: 'Europe', reliability: 0.95 },
  
  yahoo_finance: { name: 'Yahoo Finance', color: '#6001D2', icon: '📊', region: 'Global', reliability: 0.88 },
  bloomberg: { name: 'Bloomberg', color: '#292929', icon: '📈', region: 'Global', reliability: 0.94 },
  reuters: { name: 'Reuters', color: '#FF8000', icon: '📰', region: 'Global', reliability: 0.93 },
  wsj: { name: 'Wall Street Journal', color: '#000000', icon: '📰', region: 'US/Global', reliability: 0.96 },
  ft: { name: 'Financial Times', color: '#FFF1E0', icon: '📰', region: 'UK/Global', reliability: 0.95 },
  cnbc: { name: 'CNBC', color: '#041E42', icon: '📺', region: 'US/Global', reliability: 0.89 },
  nikkei: { name: 'Nikkei', color: '#E60012', icon: '📰', region: 'Asia-Pacific', reliability: 0.91 },
  
  wef: { name: 'World Economic Forum', color: '#00CED1', icon: '🌟', region: 'Global', reliability: 0.93 },
  fed: { name: 'Federal Reserve', color: '#000000', icon: '🏦', region: 'United States', reliability: 0.99 },
  ecb: { name: 'European Central Bank', color: '#003399', icon: '🏛️', region: 'Eurozone', reliability: 0.99 },
  boj: { name: 'Bank of Japan', color: '#FFFFFF', icon: '🏦', region: 'Japan', reliability: 0.99 },
  
  opec: { name: 'OPEC', color: '#228B22', icon: '🛢️', region: 'Global Energy', reliability: 0.90 },
  iea: { name: 'International Energy Agency', color: '#FF6600', icon: '⚡', region: 'Global Energy', reliability: 0.91 },
  iso: { name: 'ISO Standards', color: '#0066B3', icon: '✅', region: 'Global', reliability: 0.94 },
  
  custom: { name: 'Custom Source', color: '#6B7280', icon: '📝', region: 'Various', reliability: 0.75 },
  rss: { name: 'RSS Feed', color: '#F26522', icon: '📡', region: 'Various', reliability: 0.70 }
}

// ============================================================================
// MOCK DATA GENERATION (Replace with real API calls)
// ============================================================================

const generateMockFinancialNews = (): FinancialNewsItem[] => [
  {
    id: 'fn-001',
    title: 'IMF Raises Global Growth Forecast to 3.2% on AI-Driven Productivity Gains',
    summary: 'The International Monetary Fund revised its 2025 global growth outlook upward, citing artificial intelligence adoption in manufacturing and supply chain optimization as key drivers.',
    content: 'In its latest World Economic Outlook, the IMF highlighted that AI-powered supply chain management has contributed to a 0.4 percentage point increase in projected global GDP growth...',
    source: 'imf',
    category: 'economic_indicators',
    tags: ['IMF', 'GDP', 'AI', 'Productivity', 'Global Economy'],
    publishedAt: new Date(Date.now() - 3600000),
    url: 'https://www.imf.org/en/Publications/WEO',
    
    impact: 'critical',
    sentiment: 'bullish',
    sentimentScore: 0.72,
    
    supplyChainRelevance: {
      score: 95,
      affectedRegions: ['Global', 'North America', 'Europe', 'Asia Pacific'],
      affectedIndustries: ['Manufacturing', 'Logistics', 'Technology', 'Retail'],
      riskImplications: ['Increased demand for supply chain technology', 'Higher investment in automation'],
      opportunityIndicators: ['AI solution providers', 'Automation equipment manufacturers']
    },
    
    marketData: {
      relatedTicker: 'SPY',
      priceChange: 1.24,
      volumeChange: 15.3,
      volatilityIndex: 14.2
    },
    
    aiInsights: {
      keyTakeaways: [
        'AI productivity gains now measurable in official economic statistics',
        'Supply chain resilience improved across 87% of surveyed economies',
        'Emerging markets showing fastest adoption rates'
      ],
      predictedImpact: 'Positive for technology and industrial sectors; potential inflation moderation from efficiency gains',
      confidenceLevel: 0.94,
      similarEvents: [
        { title: 'Internet Boom Productivity Surge (1998)', date: '1998-03', outcome: '+4.5% GDP growth over 3 years' },
        { title: 'Post-WWII Industrial Automation (1950s)', date: '1955-06', outcome: 'Sustained 3%+ annual productivity growth' }
      ]
    }
  },
  {
    id: 'fn-002',
    title: 'Fed Signals Rate Pause Amid Improved Supply Chain Metrics',
    summary: 'Federal Reserve officials indicated that disinflationary pressures from supply-side improvements may allow for an extended pause in rate hikes.',
    source: 'fed',
    category: 'monetary_policy',
    tags: ['Federal Reserve', 'Interest Rates', 'Inflation', 'Supply Chain'],
    publishedAt: new Date(Date.now() - 7200000),
    url: 'https://www.federalreserve.gov',
    
    impact: 'critical',
    sentiment: 'bullish',
    sentimentScore: 0.65,
    
    supplyChainRelevance: {
      score: 88,
      affectedRegions: ['United States', 'North America'],
      affectedIndustries: ['Banking', 'Real Estate', 'Manufacturing', 'Construction'],
      riskImplications: ['Lower borrowing costs expected', 'Reduced inventory financing pressure'],
      opportunityIndicators: ['Capital-intensive projects', 'Equipment financing']
    },
    
    marketData: {
      relatedTicker: '^TNX',
      priceChange: -0.05,
      volatilityIndex: 13.8
    },
    
    aiInsights: {
      keyTakeaways: [
        'Core PCE showing sustained decline due to logistics efficiency',
        'Goods deflation contributing significantly to overall price stability',
        'Committee members citing supply chain normalization as key factor'
      ],
      predictedImpact: 'Equities favorable; bond yields may remain range-bound; dollar strength moderate',
      confidenceLevel: 0.91
    }
  },
  {
    id: 'fn-003',
    title: 'SCO Members Establish Unified Digital Trade Corridor Standards',
    summary: 'The Shanghai Cooperation Organization announced new harmonized digital trade documentation standards affecting over 40% of world population.',
    source: 'sco',
    category: 'trade_policy',
    tags: ['SCO', 'Digital Trade', 'Asia', 'Eurasia', 'Standards'],
    publishedAt: new Date(Date.now() - 10800000),
    url: 'https://www.eng.sectsco.org',
    
    impact: 'high',
    sentiment: 'bullish',
    sentimentScore: 0.58,
    
    supplyChainRelevance: {
      score: 92,
      affectedRegions: ['China', 'Russia', 'India', 'Central Asia', 'Pakistan'],
      affectedIndustries: ['Cross-border E-commerce', 'Logistics', 'Customs Brokerage', 'Trade Finance'],
      riskImplications: ['New compliance requirements', 'System integration needs', 'Documentation standardization'],
      opportunityIndicators: ['Digital platform providers', 'Compliance software vendors', 'Trade finance fintech']
    },
    
    aiInsights: {
      keyTakeaways: [
        'Single digital window concept adopted by all 9 member states',
        'Blockchain-based document verification to be implemented by Q4 2025',
        'Estimated $45B annual trade facilitation savings projected'
      ],
      predictedImpact: 'Significant reduction in cross-border transaction times; increased trade volumes within SCO region',
      confidenceLevel: 0.87
    }
  },
  {
    id: 'fn-004',
    title: 'WSJ: AI Supply Chain Platforms Secure Record $12B in Q1 Venture Funding',
    summary: 'Wall Street Journal reports that venture capital investment in supply chain intelligence platforms reached an all-time high, with enterprise adoption up 340% year-over-year.',
    source: 'wsj',
    category: 'technology',
    tags: ['Venture Capital', 'AI', 'Supply Chain Tech', 'Startups', 'WSJ'],
    publishedAt: new Date(Date.now() - 14400000),
    url: 'https://www.wsj.com',
    
    impact: 'high',
    sentiment: 'bullish',
    sentimentScore: 0.81,
    
    supplyChainRelevance: {
      score: 90,
      affectedRegions: ['Global', 'North America', 'Europe', 'Israel'],
      affectedIndustries: ['Software', 'Cloud Computing', 'AI/ML', 'Enterprise IT'],
      riskImplications: ['Market consolidation expected', 'Talent competition intensifying'],
      opportunityIndicators: ['Early-stage startups', 'AI research labs', 'Cloud infrastructure providers']
    },
    
    marketData: {
      relatedTicker: 'VC fund index',
      volumeChange: 34.7
    },
    
    aiInsights: {
      keyTakeaways: [
        'Average Series B valuation up 180% compared to 2024',
        'Enterprise customers showing 18-month average ROI achievement',
        'Multi-model AI approaches attracting premium valuations'
      ],
      predictedImpact: 'Accelerated innovation; potential bubble formation in late-stage deals; strong M&A activity expected',
      confidenceLevel: 0.89
    }
  },
  {
    id: 'fn-005',
    title: 'Bloomberg: Semiconductor Supply Chain Reaches Historic Efficiency Levels',
    summary: 'Advanced demand forecasting and AI-powered coordination have reduced chip delivery times by 45%, addressing chronic shortages in tech manufacturing.',
    source: 'bloomberg',
    category: 'supply_chain',
    tags: ['Semiconductors', 'Chips', 'Tech Manufacturing', 'AI', 'Bloomberg'],
    publishedAt: new Date(Date.now() - 18000000),
    url: 'https://www.bloomberg.com',
    
    impact: 'high',
    sentiment: 'bullish',
    sentimentScore: 0.69,
    
    supplyChainRelevance: {
      score: 94,
      affectedRegions: ['Taiwan', 'South Korea', 'US', 'Japan', 'Netherlands'],
      affectedIndustries: ['Semiconductors', 'Electronics', 'Automotive', 'Consumer Tech', 'Defense'],
      riskImplications: ['Geographic concentration risks remain', 'Potential overcapacity concerns'],
      opportunityIndicators: ['Advanced packaging', 'Chiplet architecture', 'Materials science']
    },
    
    marketData: {
      relatedTicker: 'SMH',
      priceChange: 2.34,
      changePercent: 2.89
    },
    
    aiInsights: {
      keyTakeaways: [
        'Lead time for advanced nodes reduced from 20+ weeks to 11 weeks average',
        'Yield improvement through predictive maintenance up 23%',
        'Inventory optimization saving industry $8B annually'
      ],
      predictedImpact: 'Sustained tech sector growth; margin expansion for chipmakers; downstream benefits for OEMs',
      confidenceLevel: 0.92
    }
  },
  {
    id: 'fn-006',
    title: 'WEF Davos: 89% of CEOs Rank Sustainable Supply Chain Transparency as Critical',
    summary: 'World Economic Forum annual survey reveals unprecedented executive focus on environmental and social visibility throughout value chains.',
    source: 'wef',
    category: 'esg',
    tags: ['ESG', 'Sustainability', 'Davos', 'CEO Survey', 'Transparency'],
    publishedAt: new Date(Date.now() - 21600000),
    url: 'https://www.weforum.org',
    
    impact: 'medium',
    sentiment: 'neutral',
    sentimentScore: 0.12,
    
    supplyChainRelevance: {
      score: 85,
      affectedRegions: ['Global'],
      affectedIndustries: ['All Industries', 'Consumer Goods', 'Fashion', 'Food & Beverage', 'Automotive'],
      riskImplications: ['Regulatory compliance costs', 'Reporting burden increase', 'Supplier audit requirements'],
      opportunityIndicators: ['Traceability solutions', 'Carbon accounting platforms', 'ESG data providers']
    },
    
    aiInsights: {
      keyTakeaways: [
        'Scope 3 emissions reporting becoming board-level priority',
        'Investor pressure driving transparency investments',
        'Technology solutions seeing 280% demand increase'
      ],
      predictedImpact: 'Accelerated ESG technology adoption; competitive advantage for early movers; regulatory alignment likely',
      confidenceLevel: 0.86
    }
  },
  {
    id: 'fn-007',
    title: 'EU Digital Product Passport Mandate Takes Effect 2026',
    summary: 'European Commission confirms comprehensive supply chain traceability requirements for all products sold in EU markets starting January 2026.',
    source: 'eu_commission',
    category: 'regulation',
    tags: ['EU Regulation', 'Digital Passport', 'Traceability', 'Compliance', '2026'],
    publishedAt: new Date(Date.now() - 25200000),
    url: 'https://ec.europa.eu',
    
    impact: 'critical',
    sentiment: 'bearish',
    sentimentScore: -0.25,
    
    supplyChainRelevance: {
      score: 98,
      affectedRegions: ['European Union', 'Trading Partners'],
      affectedIndustries: ['Manufacturing', 'Textiles', 'Electronics', 'Batteries', 'Construction Materials'],
      riskImplications: ['Significant compliance investment required', 'Data sharing with suppliers mandatory', 'Non-compliance penalties severe'],
      opportunityIndicators: ['DPP platform providers', 'IoT sensor networks', 'Blockchain traceability', 'Consulting services']
    },
    
    aiInsights: {
      keyTakeaways: [
        'Full material passport required including recycled content %',
        'Real-time data updates mandated for high-risk products',
        'Estimated €50B market for compliance solutions by 2027'
      ],
      predictedImpact: 'Major disruption for unprepared companies; first-mover advantage significant; technology vendors positioned well',
      confidenceLevel: 0.96
    }
  },
  {
    id: 'fn-008',
    title: 'Reuters: Oil Prices Stabilize on OPEC+ Production Coordination Success',
    summary: 'OPEC+ members demonstrate improved production coordination through AI-enhanced demand forecasting, reducing market volatility.',
    source: 'reuters',
    category: 'commodities',
    tags: ['Oil', 'OPEC', 'Energy', 'Production', 'Reuters'],
    publishedAt: new Date(Date.now() - 28800000),
    url: 'https://www.reuters.com',
    
    impact: 'medium',
    sentiment: 'neutral',
    sentimentScore: 0.05,
    
    supplyChainRelevance: {
      score: 78,
      affectedRegions: ['Middle East', 'Russia', 'Global'],
      affectedIndustries: ['Energy', 'Transportation', 'Chemicals', 'Plastics', 'Aviation'],
      riskImplications: ['Input cost predictability improving', 'Geopolitical risk remains elevated'],
      opportunityIndicators: ['Energy efficiency solutions', 'Alternative fuels', 'Renewable energy integration']
    },
    
    marketData: {
      relatedTicker: 'CL=F',
      priceChange: 0.82,
      changePercent: 1.05
    },
    
    aiInsights: {
      keyTakeaways: [
        'Production quota compliance at 96% - highest in decade',
        'Demand forecasting accuracy improved 34% using ML models',
        'Strategic reserve levels optimal across member states'
      ],
      predictedImpact: 'Stable energy costs supportive of manufacturing; transition planning window extended',
      confidenceLevel: 0.84
    }
  },
  {
    id: 'fn-009',
    title: 'CNBC: Global Shipping Rates Normalize After 18-Month Volatility',
    summary: 'Container shipping prices return to pre-pandemic levels as fleet capacity and port efficiency improvements stabilize global trade routes.',
    source: 'cnbc',
    category: 'logistics',
    tags: ['Shipping', 'Container Rates', 'Logistics', 'Freight', 'CNBC'],
    publishedAt: new Date(Date.now() - 32400000),
    url: 'https://www.cnbc.com',
    
    impact: 'medium',
    sentiment: 'bullish',
    sentimentScore: 0.44,
    
    supplyChainRelevance: {
      score: 82,
      affectedRegions: ['Global', 'Asia-Europe', 'Trans-Pacific'],
      affectedIndustries: ['Retail', 'E-commerce', 'Manufacturing', 'Agriculture'],
      riskImplications: ['Margin recovery for importers', 'Inventory strategy adjustments possible'],
      opportunityIndicators: ['Just-in-time viability return', 'Ocean freight derivatives', 'Port technology investments']
    },
    
    marketData: {
      relatedTicker: 'SHIPPING index',
      priceChange: -3.21
    },
    
    aiInsights: {
      keyTakeaways: [
        'Asia-Europe spot rates down 67% from peak',
        'Port dwell time reduced 40% through smart scheduling',
        'Vessel utilization optimized via route AI systems'
      ],
      predictedImpact: 'Importer margin expansion; consumer price benefits; logistics provider consolidation likely',
      confidenceLevel: 0.88
    }
  },
  {
    id: 'fn-010',
    title: 'FT: Carbon Border Adjustment Mechanism Expands Scope',
    summary: 'Financial Times reports EU CBAM will expand to additional sectors and potentially inspire similar mechanisms in US, UK, and Canada.',
    source: 'ft',
    category: 'regulation',
    tags: ['CBAM', 'Carbon Tax', 'Trade Policy', 'Climate', 'FT'],
    publishedAt: new Date(Date.now() - 36000000),
    url: 'https://www.ft.com',
    
    impact: 'high',
    sentiment: 'bearish',
    sentimentScore: -0.38,
    
    supplyChainRelevance: {
      score: 91,
      affectedRegions: ['European Union', 'Exporters to EU'],
      affectedIndustries: ['Steel', 'Aluminum', 'Cement', 'Chemicals', 'Fertilizers'],
      riskImplications: ['Carbon cost pass-through to consumers', 'Competitive disadvantage for high-carbon producers'],
      opportunityIndicators: ['Low-carbon manufacturing', 'Carbon capture technology', 'Green hydrogen', 'Recycling']
    },
    
    aiInsights: {
      keyTakeaways: [
        'Phase 2 reporting begins October 2025',
        'Financial certificates required from January 2026',
        'Estimated €15B annual revenue for EU from CBAM'
      ],
      predictedImpact: 'Acceleration of green transition; carbon-efficient producers gain advantage; trade pattern shifts expected',
      confidenceLevel: 0.90
    }
  }
]

// Generate mock market data
const MARKET_INDICES: MarketIndex[] = [
  { symbol: 'SPX', name: 'S&P 500', value: 5894.16, change: 49.32, changePercent: 0.84 },
  { symbol: 'IXIC', name: 'NASDAQ Composite', value: 19245.32, change: 235.67, changePercent: 1.24 },
  { symbol: 'DJI', name: 'Dow Jones Industrial', value: 43245.87, change: 224.56, changePercent: 0.52 },
  { symbol: 'UKX', name: 'FTSE 100', value: 8234.56, change: -14.82, changePercent: -0.18 },
  { symbol: 'NKY', name: 'Nikkei 225', value: 39876.21, change: 379.43, changePercent: 0.96 },
  { symbol: 'SHCOMP', name: 'Shanghai Composite', value: 3456.78, change: 11.76, changePercent: 0.34 },
  { symbol: 'STOXX50E', name: 'Euro Stoxx 50', value: 4567.89, change: 33.45, changePercent: 0.74 },
  { symbol: 'HSI', name: 'Hang Seng', value: 22345.67, change: -123.45, changePercent: -0.55 }
]

const COMMODITY_PRICES: CommodityPrice[] = [
  { symbol: 'CL', name: 'Crude Oil WTI', price: 78.45, unit: 'USD/bbl', change: 1.62, changePercent: 2.10 },
  { symbol: 'GC', name: 'Gold', price: 2654.30, unit: 'USD/oz', change: 21.17, changePercent: 0.80 },
  { symbol: 'NG', name: 'Natural Gas', price: 3.24, unit: 'USD/MMBtu', change: -0.05, changePercent: -1.52 },
  { symbol: 'HG', name: 'Copper', price: 4.56, unit: 'USD/lb', change: 0.14, changePercent: 3.20 },
  { symbol: 'SI', name: 'Silver', price: 31.25, unit: 'USD/oz', change: 0.45, changePercent: 1.46 }
]

const CURRENCY_PAIRS: CurrencyPair[] = [
  { pair: 'EUR/USD', name: 'Euro / US Dollar', rate: 1.0856, change: 0.0022, changePips: 22 },
  { pair: 'USD/JPY', name: 'US Dollar / Japanese Yen', rate: 149.34, change: -0.58, changePips: -58 },
  { pair: 'GBP/USD', name: 'British Pound / US Dollar', rate: 1.2678, change: 0.0013, changePips: 13 },
  { pair: 'USD/CNY', name: 'US Dollar / Chinese Yuan', rate: 7.2456, change: -0.0036, changePips: -36 },
  { pair: 'USD/CHF', name: 'US Dollar / Swiss Franc', rate: 0.8734, change: 0.0018, changePips: 18 },
  { pair: 'AUD/USD', name: 'Australian Dollar / US Dollar', rate: 0.6523, change: 0.0029, changePips: 29 }
]

const ECONOMIC_CALENDAR: EconomicIndicator[] = [
  { name: 'US Non-Farm Payrolls', value: '185K', previous: '175K', forecast: '180K', actual: 'Pending', impact: 'high', currency: 'USD', date: '2025-02-07' },
  { name: 'CPI YoY', value: '2.9%', previous: '3.0%', forecast: '2.9%', actual: '2.8%', impact: 'high', currency: 'USD', date: '2025-02-12' },
  { name: 'ECB Interest Rate Decision', value: '3.00%', previous: '3.25%', forecast: '3.00%', actual: 'Pending', impact: 'high', currency: 'EUR', date: '2025-02-06' },
  { name: 'China PMI Manufacturing', value: '51.2', previous: '50.8', forecast: '50.9', actual: '51.4', impact: 'high', currency: 'CNY', date: '2025-02-01' },
  { name: 'UK GDP QoQ', value: '0.2%', previous: '0.1%', forecast: '0.2%', actual: 'Pending', impact: 'medium', currency: 'GBP', date: '2025-02-12' }
]

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function FinancialNewsAggregator() {
  const [newsItems, setNewsItems] = useState<FinancialNewsItem[]>([])
  const [selectedSource, setSelectedSource] = useState<NewsSource | 'all'>('all')
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory | 'all'>('all')
  const [selectedImpact, setSelectedImpact] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastRefresh, setLastRefresh] = useState(new Date())
  const [selectedArticle, setSelectedArticle] = useState<FinancialNewsItem | null>(null)
  const [activeTab, setActiveTab] = useState<'news' | 'markets' | 'calendar'>('news')
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set())

  // Initialize news data
  useEffect(() => {
    setNewsItems(generateMockFinancialNews())
  }, [])

  // Refresh handler
  const handleRefresh = useCallback(() => {
    setIsRefreshing(true)
    setTimeout(() => {
      setNewsItems(generateMockFinancialNews())
      setLastRefresh(new Date())
      setIsRefreshing(false)
    }, 1500)
  }, [])

  // Filtered news items
  const filteredNews = useMemo(() => {
    let result = [...newsItems]

    if (selectedSource !== 'all') {
      result = result.filter(item => item.source === selectedSource)
    }

    if (selectedCategory !== 'all') {
      result = result.filter(item => item.category === selectedCategory)
    }

    if (selectedImpact !== 'all') {
      result = result.filter(item => item.impact === selectedImpact)
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.summary.toLowerCase().includes(query) ||
        item.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    return result.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
  }, [newsItems, selectedSource, selectedCategory, selectedImpact, searchQuery])

  // Toggle bookmark
  const toggleBookmark = (id: string) => {
    setBookmarkedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  // Format helpers
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

  const formatNumber = (num: number, decimals: number = 2): string => {
    return num.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
  }

  // Get unique values for filters
  const sources = useMemo(() => [...new Set(newsItems.map(item => item.source))], [newsItems])
  const categories = useMemo(() => [...new Set(newsItems.map(item => item.category))], [newsItems])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl">
                <Newspaper className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Global Financial Intelligence</h1>
                <p className="text-xs text-gray-500">Real-time market news & analysis</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              
              <span className="text-xs text-gray-500 hidden sm:block">
                Updated: {lastRefresh.toLocaleTimeString()}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tab Navigation */}
        <nav className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { id: 'news', label: 'News Feed', icon: Newspaper },
            { id: 'markets', label: 'Markets', icon: BarChart3 },
            { id: 'calendar', label: 'Economic Calendar', icon: Calendar }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-slate-800 text-gray-400 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </nav>

        {/* NEWS TAB */}
        {activeTab === 'news' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="flex flex-wrap gap-4 p-4 bg-slate-900/50 border border-slate-800 rounded-xl">
              <div className="flex-1 min-w-[250px] relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search news..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <select
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value as NewsSource | 'all')}
                className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500"
              >
                <option value="all">All Sources</option>
                {sources.map(source => (
                  <option key={source} value={source}>{NEWS_SOURCES[source].name}</option>
                ))}
              </select>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as NewsCategory | 'all')}
                className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</option>
                ))}
              </select>

              <select
                value={selectedImpact}
                onChange={(e) => setSelectedImpact(e.target.value)}
                className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500"
              >
                <option value="all">All Impact Levels</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            {/* Results Summary */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">
                Showing <span className="text-white font-medium">{filteredNews.length}</span> articles
              </span>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
                  <input type="checkbox" className="rounded bg-slate-800 border-slate-600" />
                  Bookmarked only ({bookmarkedIds.size})
                </label>
              </div>
            </div>

            {/* News Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredNews.map(article => (
                <article
                  key={article.id}
                  onClick={() => setSelectedArticle(article)}
                  className={`group bg-slate-900/60 border rounded-xl p-5 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.01] ${
                    article.impact === 'critical' ? 'border-red-500/50 hover:border-red-500' :
                    article.impact === 'high' ? 'border-orange-500/50 hover:border-orange-500' :
                    'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {/* Article Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span
                        className="px-2 py-1 text-xs font-medium rounded-full"
                        style={{ backgroundColor: `${NEWS_SOURCES[article.source].color}20`, color: NEWS_SOURCES[article.source].color }}
                      >
                        {NEWS_SOURCES[article.source].name.split(' ').slice(0, 2).join(' ')}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        article.sentiment === 'bullish' ? 'bg-green-500/20 text-green-400' :
                        article.sentiment === 'bearish' ? 'bg-red-500/20 text-red-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {article.sentiment.toUpperCase()}
                      </span>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleBookmark(article.id) }}
                      className={`p-1.5 rounded-lg transition-colors ${
                        bookmarkedIds.has(article.id) ? 'bg-yellow-500/20 text-yellow-400' : 'hover:bg-slate-800 text-gray-500'
                      }`}
                    >
                      <Bookmark className="w-4 h-4" fill={bookmarkedIds.has(article.id) ? 'currentColor' : 'none'} />
                    </button>
                  </div>

                  {/* Title */}
                  <h3 className="font-semibold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                    {article.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-sm text-gray-400 mb-4 line-clamp-3">
                    {article.summary}
                  </p>

                  {/* Supply Chain Score */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-gray-500">SC Relevance</span>
                      <span className={`font-medium ${
                        article.supplyChainRelevance.score >= 90 ? 'text-green-400' :
                        article.supplyChainRelevance.score >= 70 ? 'text-yellow-400' :
                        'text-red-400'
                      }`}>
                        {article.supplyChainRelevance.score}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          article.supplyChainRelevance.score >= 90 ? 'bg-green-500' :
                          article.supplyChainRelevance.score >= 70 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${article.supplyChainRelevance.score}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="w-3.5 h-3.5" />
                      {formatTimeAgo(article.publishedAt)}
                    </div>
                    <div className="flex items-center gap-2">
                      {article.marketData && (
                        <span className={`flex items-center gap-1 text-xs font-medium ${
                          (article.marketData.priceChange || 0) > 0 ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {(article.marketData.priceChange || 0) > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                          {(article.marketData.priceChange || 0).toFixed(2)}%
                        </span>
                      )}
                      <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-blue-400 transition-colors" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* MARKETS TAB */}
        {activeTab === 'markets' && (
          <div className="space-y-6">
            {/* Major Indices */}
            <section className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-400" />
                Major Indices
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                {MARKET_INDICES.map(index => (
                  <div key={index.symbol} className="bg-black/30 rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">{index.symbol}</div>
                    <div className="text-lg font-semibold text-white">{formatNumber(index.value)}</div>
                    <div className={`flex items-center gap-1 text-xs font-medium mt-1 ${
                      index.change >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {index.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {index.changePercent >= 0 ? '+' : ''}{index.changePercent.toFixed(2)}%
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Commodities */}
            <section className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-amber-400" />
                Key Commodities
              </h2>
              <div className="grid md:grid-cols-5 gap-4">
                {COMMODITIES_PRICES.map(commodity => (
                  <div key={commodity.symbol} className="bg-black/30 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-white">{commodity.symbol}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        commodity.changePercent >= 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {commodity.changePercent >= 0 ? '+' : ''}{commodity.changePercent.toFixed(2)}%
                      </span>
                    </div>
                    <div className="text-xl font-bold text-white mb-1">${formatNumber(commodity.price)}</div>
                    <div className="text-xs text-gray-500">{commodity.name} ({commodity.unit})</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Currency Pairs */}
            <section className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-400" />
                Forex Markets
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-800">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Pair</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-400">Rate</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-400">Change</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-400">Pips</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {CURRENCY_PAIRS.map(currency => (
                      <tr key={currency.pair} className="hover:bg-white/5 transition-colors">
                        <td className="py-3 px-4">
                          <div className="font-medium text-white">{currency.pair}</div>
                          <div className="text-xs text-gray-500">{currency.name}</div>
                        </td>
                        <td className="py-3 px-4 text-right font-mono text-white">{currency.rate.toFixed(4)}</td>
                        <td className={`py-3 px-4 text-right font-medium ${currency.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {currency.change >= 0 ? '+' : ''}{(currency.change * 100).toFixed(3)}%
                        </td>
                        <td className={`py-3 px-4 text-right font-medium ${currency.changePips >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {currency.changePips >= 0 ? '+' : ''}{currency.changePips}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        )}

        {/* ECONOMIC CALENDAR TAB */}
        {activeTab === 'calendar' && (
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-400" />
              Upcoming Economic Events
            </h2>
            
            <div className="space-y-4">
              {ECONOMIC_CALENDAR.map((event, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-black/30 rounded-lg hover:bg-black/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-2 h-10 rounded-full ${
                      event.impact === 'high' ? 'bg-red-500' : event.impact === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}></div>
                    <div>
                      <h3 className="font-medium text-white">{event.name}</h3>
                      <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {event.currency}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {event.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 text-sm">
                    <div className="text-center">
                      <div className="text-gray-500 text-xs">Previous</div>
                      <div className="text-gray-300 font-medium">{event.previous}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-500 text-xs">Forecast</div>
                      <div className="text-blue-400 font-medium">{event.forecast}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-500 text-xs">Actual</div>
                      <div className={`font-medium ${event.actual === 'Pending' ? 'text-yellow-400' : 'text-green-400'}`}>
                        {event.actual}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedArticle(null)}>
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-slate-900 border-b border-slate-800 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span
                  className="px-3 py-1 text-sm font-medium rounded-full"
                  style={{ backgroundColor: `${NEWS_SOURCES[selectedArticle.source].color}20`, color: NEWS_SOURCES[selectedArticle.source].color }}
                >
                  {NEWS_SOURCES[selectedArticle.source].name}
                </span>
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                  selectedArticle.impact === 'critical' ? 'bg-red-500/20 text-red-400' :
                  selectedArticle.impact === 'high' ? 'bg-orange-500/20 text-orange-400' :
                  'bg-blue-500/20 text-blue-400'
                }`}>
                  {selectedArticle.impact.toUpperCase()} IMPACT
                </span>
              </div>
              <button onClick={() => setSelectedArticle(null)} className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <h2 className="text-2xl font-bold text-white">{selectedArticle.title}</h2>
              
              <p className="text-gray-300 leading-relaxed">{selectedArticle.content || selectedArticle.summary}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {selectedArticle.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-slate-800 text-gray-300 text-sm rounded-full flex items-center gap-1">
                    <Tag className="w-3 h-3" /> {tag}
                  </span>
                ))}
              </div>

              {/* Supply Chain Analysis */}
              <div className="bg-slate-800/50 rounded-xl p-5">
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <Ship className="w-5 h-5 text-cyan-400" />
                  Supply Chain Impact Analysis
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Affected Regions</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedArticle.supplyChainRelevance.affectedRegions.map(region => (
                        <span key={region} className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded">{region}</span>
                      ))}
                    </div>
                    
                    <h4 className="text-sm font-medium text-gray-400 mb-2 mt-4">Affected Industries</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedArticle.supplyChainRelevance.affectedIndustries.map(industry => (
                        <span key={industry} className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded">{industry}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Risk Implications</h4>
                    <ul className="space-y-1">
                      {selectedArticle.supplyChainRelevance.riskImplications.map((risk, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-red-300">
                          <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" /> {risk}
                        </li>
                      ))}
                    </ul>
                    
                    <h4 className="text-sm font-medium text-gray-400 mb-2 mt-4">Opportunities</h4>
                    <ul className="space-y-1">
                      {selectedArticle.supplyChainRelevance.opportunityIndicators.map((opp, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-green-300">
                          <Zap className="w-4 h-4 mt-0.5 flex-shrink-0" /> {opp}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* AI Insights */}
              <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border border-indigo-500/30 rounded-xl p-5">
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <Brain className="w-5 h-5 text-indigo-400" />
                  AI-Generated Insights
                </h3>
                
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-400">Confidence Level</span>
                    <span className="text-indigo-400 font-medium">{(selectedArticle.aiInsights.confidenceLevel * 100).toFixed(0)}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" style={{ width: `${selectedArticle.aiInsights.confidenceLevel * 100}%` }}></div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Key Takeaways</h4>
                    <ul className="space-y-2">
                      {selectedArticle.aiInsights.keyTakeaways.map((takeaway, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                          <CheckCircle2 className="w-4 h-4 mt-0.5 text-indigo-400 flex-shrink-0" /> {takeaway}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Predicted Impact</h4>
                    <p className="text-sm text-gray-300">{selectedArticle.aiInsights.predictedImpact}</p>
                    
                    {selectedArticle.aiInsights.similarEvents.length > 0 && (
                      <>
                        <h4 className="text-sm font-medium text-gray-400 mt-4 mb-2">Historical Parallels</h4>
                        <ul className="space-y-2">
                          {selectedArticle.aiInsights.similarEvents.map((event, i) => (
                            <li key={i} className="text-sm text-gray-400">
                              <span className="text-white">{event.title}</span> → {event.outcome}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleBookmark(selectedArticle.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      bookmarkedIds.has(selectedArticle.id) ? 'bg-yellow-500/20 text-yellow-400' : 'bg-slate-800 text-gray-400 hover:bg-slate-700'
                    }`}
                  >
                    <Bookmark className="w-4 h-4" fill={bookmarkedIds.has(selectedArticle.id) ? 'currentColor' : 'none'} />
                    {bookmarkedIds.has(selectedArticle.id) ? 'Saved' : 'Save'}
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-gray-400 hover:bg-slate-700 rounded-lg text-sm font-medium transition-colors">
                    <Share2 className="w-4 h-4" /> Share
                  </button>
                </div>
                
                <a
                  href={selectedArticle.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Read Full Article <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-800 py-8 text-center text-sm text-gray-500">
        <p>Data aggregated from IMF, SCO, Federal Reserve, WSJ, Bloomberg, Reuters, CNBC, FT, WEF, and other authoritative sources.</p>
        <p className="mt-2">AI-powered analysis provided for informational purposes. Not financial advice.</p>
      </footer>
    </div>
  )
}

// Additional icons used
function CheckCircle2(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  )
}

function Brain(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"></path>
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"></path>
    </svg>
  )
}
