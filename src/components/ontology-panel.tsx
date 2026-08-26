'use client'

import React, { useState } from 'react'
import {
  BookOpen, HelpCircle, ChevronRight, ChevronDown, Search,
  Lightbulb, Network, Database, Brain, Scale, Leaf,
  Users, Shield, Zap, Globe, Info, X, ExternalLink,
  TreePine, Link2, Tag, Layers, FileText, MessageCircle,
  BarChart3 as BarChart
} from 'lucide-react'

// Ontology Data Structure - Comprehensive Knowledge Representation
const ontologyData = {
  domains: [
    {
      id: 'supply-chain',
      name: 'Supply Chain Management',
      icon: Network,
      color: 'from-blue-500 to-cyan-500',
      description: 'End-to-end supply chain visibility and optimization',
      concepts: [
        {
          term: 'Supply Chain',
          definition: 'The entire network of entities, activities, resources, and information involved in creating and delivering a product from raw materials to end customer.',
          relationships: ['includes', 'manages', 'optimizes'],
          examples: ['Procurement → Manufacturing → Logistics → Distribution'],
          metrics: ['Lead Time', 'Inventory Turns', 'Fill Rate']
        },
        {
          term: 'Demand Forecasting',
          definition: 'AI-powered prediction of future customer demand using historical data, market trends, and external factors.',
          relationships: ['predicts', 'informs', 'optimizes'],
          examples: ['ML models predict 30-day demand with 94% accuracy'],
          metrics: ['MAPE', 'Bias', 'Tracking Signal']
        },
        {
          term: 'Supplier Risk Score',
          definition: 'Composite metric evaluating supplier reliability across financial, operational, compliance, and ESG dimensions (0-100 scale).',
          relationships: ['measures', 'aggregates', 'alerts'],
          examples: ['Score <40 = High Risk, 60-80 = Moderate, >80 = Low'],
          metrics: ['Financial Health', 'Delivery Performance', 'Quality Index']
        }
      ]
    },
    {
      id: 'ai-ml',
      name: 'Artificial Intelligence & Machine Learning',
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      description: 'Core AI/ML capabilities powering intelligent decisions',
      concepts: [
        {
          term: 'Neural Network',
          definition: 'Computing systems inspired by biological neural networks, consisting of interconnected layers of nodes (neurons) that process information.',
          relationships: ['learns', 'predicts', 'classifies'],
          examples: ['Transformer architecture for demand forecasting'],
          metrics: ['Accuracy', 'Loss Function', 'Epochs']
        },
        {
          term: 'Anomaly Detection',
          definition: 'AI technique identifying unusual patterns that deviate from expected behavior, enabling proactive issue resolution.',
          relationships: ['detects', 'alerts', 'prevents'],
          examples: ['Detects shipment delays 48hrs before occurrence'],
          metrics: ['Precision', 'Recall', 'F1-Score']
        },
        {
          term: 'Multi-Agent Orchestration',
          definition: 'Coordination framework where multiple specialized AI agents collaborate on complex decisions through shared protocols.',
          relationships: ['coordinates', 'delegates', 'consensus'],
          examples: ['Procurement agent negotiates while risk agent monitors'],
          metrics: ['Consensus Rate', 'Decision Latency', 'Agent Uptime']
        }
      ]
    },
    {
      id: 'governance',
      name: 'Governance & Compliance',
      icon: Scale,
      color: 'from-emerald-500 to-teal-500',
      description: 'Regulatory frameworks and control mechanisms',
      concepts: [
        {
          term: 'ESG Compliance',
          definition: 'Environmental, Social, and Governance standards measuring sustainability and ethical business practices.',
          relationships: ['requires', 'monitors', 'reports'],
          examples: ['Carbon footprint tracking across Tier-N suppliers'],
          metrics: ['Emissions Reduction', 'Labor Standards', 'Board Diversity']
        },
        {
          term: 'Audit Trail',
          definition: 'Chronological record of all system activities providing traceability and accountability for compliance verification.',
          relationships: ['records', 'tracks', 'verifies'],
          examples: ['Every PO approval logged with timestamp and user'],
          metrics: ['Completeness', 'Integrity', 'Retention Period']
        },
        {
          term: 'Human-in-the-Loop (HITL)',
          definition: 'AI governance model requiring human oversight for critical decisions above defined thresholds.',
          relationships: ['approves', 'overrides', 'validates'],
          examples: ['Contracts >$250K require executive sign-off'],
          metrics: ['Escalation Rate', 'Override Frequency', 'Approval Time']
        }
      ]
    },
    {
      id: 'analytics',
      name: 'Analytics & Metrics',
      icon: BarChart,
      color: 'from-orange-500 to-red-500',
      description: 'Key performance indicators and measurement frameworks',
      concepts: [
        {
          term: 'KPI Dashboard',
          definition: 'Visual interface displaying critical performance indicators in real-time for data-driven decision making.',
          relationships: ['displays', 'monitors', 'alerts'],
          examples: ['Supply chain health score with drill-down capability'],
          metrics: ['Refresh Rate', 'Data Freshness', 'User Engagement']
        },
        {
          term: 'Predictive Analytics',
          definition: 'Statistical modeling and ML techniques analyzing historical data to forecast future outcomes and trends.',
          relationships: ['forecasts', 'simulates', 'optimizes'],
          examples: ['Demand prediction with confidence intervals'],
          metrics: ['Prediction Accuracy', 'Confidence Level', 'Horizon']
        },
        {
          term: 'Real-Time Visibility',
          definition: 'Instantaneous tracking and monitoring of all supply chain events across the global network.',
          relationships: ['tracks', 'locates', 'updates'],
          examples: ['Live shipment tracking with ETA updates'],
          metrics: ['Latency', 'Coverage', 'Update Frequency']
        }
      ]
    },
    {
      id: 'ecosystem',
      name: 'Ecosystem & Marketplace',
      icon: Globe,
      color: 'from-cyan-500 to-blue-500',
      description: 'Platform ecosystem and marketplace dynamics',
      concepts: [
        {
          term: 'Federated Learning',
          definition: 'Distributed ML approach where models are trained across decentralized data sources without sharing raw data.',
          relationships: ['collaborates', 'learns', 'protects'],
          examples: ['50 enterprises train demand model without sharing data'],
          metrics: ['Model Accuracy', 'Privacy Budget', 'Participants']
        },
        {
          term: 'Revenue Sharing',
          definition: 'Transparent monetization model distributing platform revenue among API providers, developers, and ecosystem fund.',
          relationships: ['distributes', 'incentivizes', 'grows'],
          examples: ['70% to provider, 15% platform, 10% ecosystem, 5% referral'],
          metrics: ['Total Revenue', 'Provider Earnings', 'Growth Rate']
        },
        {
          term: 'Plugin Architecture',
          definition: 'Extensible framework allowing third-party developers to create add-ons extending platform capabilities.',
          relationships: ['extends', 'integrates', 'enhances'],
          examples: ['340+ plugins for ERP, analytics, automation'],
          metrics: ['Plugin Count', 'Downloads', 'Rating']
        }
      ]
    },
    {
      id: 'autonomous-agents',
      name: 'Autonomous Agents',
      icon: Zap,
      color: 'from-violet-500 to-fuchsia-500',
      description: 'Self-healing workflows and intelligent automation',
      concepts: [
        {
          term: 'Negotiation Bot',
          definition: 'AI agent autonomously conducting procurement negotiations using game theory and market intelligence.',
          relationships: ['negotiates', 'optimizes', 'executes'],
          examples: ['Bot achieves 8.3% below target price in 3.2 rounds'],
          metrics: ['Savings Rate', 'Satisfaction', 'Round Count']
        },
        {
          term: 'Self-Healing Workflow',
          definition: 'Automated system detecting anomalies, diagnosing root causes, and executing remediation without human intervention.',
          relationships: ['detects', 'diagnoses', 'remedies'],
          examples: 'Auto-resolves 89% of issues in avg 4.2 minutes',
          metrics: ['Auto-Resolution Rate', 'MTTR', 'Cost Savings']
        },
        {
          term: 'Smart Contract',
          definition: 'Blockchain-based agreements with terms automatically executed when predefined conditions are met.',
          relationships: ['enforces', 'automates', 'secures'],
          examples: ['Payment released upon delivery confirmation'],
          metrics: ['Execution Rate', 'Dispute Resolution', 'Gas Cost']
        }
      ]
    }
  ],
  
  glossary: [
    { term: 'API', fullForm: 'Application Programming Interface', category: 'Technology' },
    { term: 'ERP', fullForm: 'Enterprise Resource Planning', category: 'Systems' },
    { term: 'RFQ', fullForm: 'Request for Quotation', category: 'Procurement' },
    { term: 'PO', fullForm: 'Purchase Order', category: 'Procurement' },
    { term: 'SKU', fullForm: 'Stock Keeping Unit', category: 'Inventory' },
    { term: 'SLA', fullForm: 'Service Level Agreement', category: 'Contracts' },
    { term: 'MTTR', fullForm: 'Mean Time To Repair', category: 'Metrics' },
    { term: 'MAPE', fullForm: 'Mean Absolute Percentage Error', category: 'Analytics' },
    { term: 'IoT', fullForm: 'Internet of Things', category: 'Technology' },
    { term: 'NLP', fullForm: 'Natural Language Processing', category: 'AI/ML' },
    { term: 'GNN', fullForm: 'Graph Neural Network', category: 'AI/ML' },
    { term: 'PBFT', fullForm: 'Practical Byzantine Fault Tolerance', category: 'Blockchain' },
    { term: 'ESG', fullForm: 'Environmental, Social, Governance', category: 'Compliance' },
    { term: 'TCFD', fullForm: 'Climate-related Financial Disclosures', category: 'Compliance' },
    { term: 'GDPR', fullForm: 'General Data Protection Regulation', category: 'Compliance' }
  ]
}

interface OntologyPanelProps {
  isOpen: boolean
  onClose: () => void
}

export default function OntologyPanel({ isOpen, onClose }: OntologyPanelProps) {
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null)
  const [expandedConcept, setExpandedConcept] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState<'domains' | 'glossary'>('domains')

  if (!isOpen) return null

  const filteredDomains = searchTerm 
    ? ontologyData.domains.map(domain => ({
        ...domain,
        concepts: domain.concepts.filter(concept =>
          concept.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
          concept.definition.toLowerCase().includes(searchTerm.toLowerCase())
        )
      })).filter(domain => domain.concepts.length > 0)
    : ontologyData.domains

  const filteredGlossary = searchTerm
    ? ontologyData.glossary.filter(item =>
        item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.fullForm.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : ontologyData.glossary

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700 bg-slate-900/50">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Knowledge Ontology</h2>
              <p className="text-sm text-gray-400">Structured understanding of platform concepts & terminology</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-6 pb-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search concepts, definitions, acronyms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6 pt-4 flex gap-2">
          <button
            onClick={() => setActiveTab('domains')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              activeTab === 'domains'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-800 text-gray-400 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4 inline mr-2" />
            Concept Domains ({filteredDomains.reduce((acc, d) => acc + d.concepts.length, 0)})
          </button>
          <button
            onClick={() => setActiveTab('glossary')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              activeTab === 'glossary'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-800 text-gray-400 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4 inline mr-2" />
            Acronym Glossary ({filteredGlossary.length})
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 280px)' }}>
          {activeTab === 'domains' ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDomains.map((domain) => (
                <div
                  key={domain.id}
                  className={`bg-slate-800/50 border rounded-xl overflow-hidden transition-all ${
                    selectedDomain === domain.id ? 'border-indigo-500 shadow-lg shadow-indigo-500/20' : 'border-slate-700 hover:border-slate-600'
                  }`}
                >
                  {/* Domain Header */}
                  <button
                    onClick={() => setSelectedDomain(selectedDomain === domain.id ? null : domain.id)}
                    className="w-full p-4 text-left"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 bg-gradient-to-br ${domain.color} rounded-lg`}>
                        <domain.icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-semibold text-white">{domain.name}</h3>
                      {selectedDomain === domain.id ? (
                        <ChevronDown className="w-4 h-4 text-gray-400 ml-auto" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-400 ml-auto" />
                      )}
                    </div>
                    <p className="text-xs text-gray-400">{domain.description}</p>
                  </button>

                  {/* Expanded Concepts */}
                  {selectedDomain === domain.id && (
                    <div className="px-4 pb-4 space-y-3">
                      {domain.concepts.map((concept) => (
                        <div key={concept.term} className="bg-slate-900/50 rounded-lg p-3 border border-slate-700">
                          <button
                            onClick={() => setExpandedConcept(expandedConcept === concept.term ? null : concept.term)}
                            className="w-full flex items-start justify-between gap-2"
                          >
                            <span className="font-medium text-white text-sm">{concept.term}</span>
                            {expandedConcept === concept.term ? (
                              <ChevronUp className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                            )}
                          </button>

                          {expandedConcept === concept.term && (
                            <div className="mt-3 space-y-2">
                              <p className="text-xs text-gray-300 leading-relaxed">{concept.definition}</p>
                              
                              <div className="flex flex-wrap gap-1">
                                {concept.relationships.map((rel) => (
                                  <span key={rel} className="px-2 py-0.5 bg-indigo-500/20 text-indigo-300 rounded text-xs">
                                    {rel}
                                  </span>
                                ))}
                              </div>

                              <div className="bg-black/20 rounded p-2">
                                <div className="text-xs text-green-400 font-mono">Example:</div>
                                <div className="text-xs text-gray-400 mt-1">{concept.examples[0]}</div>
                              </div>

                              <div className="flex flex-wrap gap-1">
                                {concept.metrics.map((metric) => (
                                  <span key={metric} className="px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded text-xs">
                                    {metric}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            /* Glossary View */
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredGlossary.map((item) => (
                <div key={item.term} className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 hover:border-indigo-500/50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <span className="font-bold text-lg text-white">{item.term}</span>
                    <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-300 rounded text-xs">
                      {item.category}
                    </span>
                  </div>
                  <div className="text-sm text-indigo-400 font-medium">{item.fullForm}</div>
                </div>
              ))}
            </div>
          )}

          {searchTerm && filteredDomains.length === 0 && activeTab === 'domains' && (
            <div className="text-center py-12">
              <Search className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No concepts found for "{searchTerm}"</p>
              <p className="text-sm text-gray-500 mt-2">Try different keywords or browse glossary</p>
            </div>
          )}
        </div>

        {/* Footer Stats */}
        <div className="p-6 border-t border-slate-700 bg-slate-900/30">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4 text-gray-400">
              <span><Database className="w-4 h-4 inline mr-1" />{ontologyData.domains.length} Domains</span>
              <span><Network className="w-4 h-4 inline mr-1" />{ontologyData.domains.reduce((acc, d) => acc + d.concepts.length, 0)} Concepts</span>
              <span><Tag className="w-4 h-4 inline mr-1" />{ontologyData.glossary.length} Acronyms</span>
            </div>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm transition-colors">
              <ExternalLink className="w-4 h-4" />
              Export Ontology
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Hook for using ontology in dashboard components
export function useOntology() {
  return {
    ontologyData,
    getConcept: (term: string) => {
      for (const domain of ontologyData.domains) {
        const concept = domain.concepts.find(c => c.term === term)
        if (concept) return { ...concept, domain: domain.name }
      }
      return null
    },
    getAcronym: (term: string) => {
      return ontologyData.glossary.find(g => g.term === term || g.fullForm === term)
    }
  }
}
