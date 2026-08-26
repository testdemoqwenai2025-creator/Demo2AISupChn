-- AI Supply Chain Platform - Supabase Database Schema
-- Free Tier Optimized (500MB storage, 50K monthly active users, 2GB bandwidth)
-- Compatible with PostgreSQL 15+ (Supabase default)

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements";
CREATE EXTENSION IF NOT EXISTS "pgvector"; -- For AI embeddings (if available on plan)

-- ============================================================================
-- TABLE: users
-- Custom user profiles extending Supabase auth
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    display_name TEXT,
    avatar_url TEXT,
    role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin', 'superadmin')),
    plan TEXT NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'enterprise')),
    
    -- Company Information
    company_name TEXT,
    industry TEXT,
    company_size TEXT, -- '1-10', '11-50', '51-200', '201-1000', '1000+'
    job_title TEXT,
    
    -- Preferences
    preferences JSONB DEFAULT '{}',
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    last_login_at TIMESTAMPTZ
);

-- Create index for faster lookups
CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_users_plan ON public.users(plan);
CREATE INDEX idx_users_company ON public.users(company_name);

-- Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read all profiles (for collaboration features)
CREATE POLICY "Users can view all profiles" ON public.users
    FOR SELECT USING (true);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

-- ============================================================================
-- TABLE: suppliers
-- Core supplier master data with full Tier-N visibility
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.suppliers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Basic Information
    name TEXT NOT NULL,
    slug TEXT UNIQUE,
    legal_name TEXT,
    tax_id TEXT,
    
    -- Classification
    tier INTEGER NOT NULL DEFAULT 1 CHECK (tier >= 1 AND tier <= 4),
    category TEXT NOT NULL,
    subcategory TEXT,
    tags TEXT[] DEFAULT '{}',
    
    -- Location Data
    country_code CHAR(2) NOT NULL,
    region TEXT,
    city TEXT,
    postal_code TEXT,
    address_text TEXT,
    coordinates GEOGRAPHY(POINT), -- PostGIS for geo queries
    
    -- Risk & Performance Scores
    risk_score NUMERIC(5,2) DEFAULT 0 CHECK (risk_score >= 0 AND risk_score <= 100),
    performance_metrics JSONB DEFAULT '{
        "on_time_delivery": 0,
        "quality_score": 0,
        "cost_competitiveness": 0,
        "responsiveness": 0
    }'::jsonb,
    
    -- ESG Ratings
    esg_rating JSONB DEFAULT '{
        "environmental": 0,
        "social": 0,
        "governance": 0,
        "overall": null
    }'::jsonb,
    
    -- Certifications & Compliance
    certifications TEXT[] DEFAULT '{}',
    compliance_status TEXT DEFAULT 'pending' 
        CHECK (compliance_status IN ('pending', 'verified', 'flagged', 'suspended')),
    
    -- Contact Information (Encrypted at rest)
    contact_email TEXT,
    contact_phone TEXT,
    website URL,
    primary_contact_name TEXT,
    
    -- Financial Health Indicators
    financial_health JSONB DEFAULT '{}'::jsonb,
    
    -- Relationships
    parent_supplier_id UUID REFERENCES public.suppliers(id) ON DELETE SET NULL,
    
    -- Status & Metadata
    status TEXT NOT NULL DEFAULT 'active' 
        CHECK (status IN ('active', 'inactive', 'under_review', 'suspended', 'merged')),
    data_quality_score NUMERIC(3,2) DEFAULT 0,
    
    -- Audit Fields
    created_by UUID REFERENCES public.users(id),
    updated_by UUID REFERENCES public.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_suppliers_tier ON public.suppliers(tier);
CREATE INDEX idx_suppliers_category ON public.suppliers(category);
CREATE INDEX idx_suppliers_country ON public.suppliers(country_code);
CREATE INDEX idx_suppliers_risk_score ON public.suppliers(risk_score DESC);
CREATE INDEX idx_suppliers_status ON public.suppliers(status);
CREATE INDEX idx_suppliers_name_trgm ON public.suppliers USING gin(name gin_trgm_ops); -- Fuzzy search

-- RLS for suppliers
ALTER TABLE public.suppliers ENABLE ROW LEVEL SECURITY;

-- Policy: All authenticated users can read suppliers
CREATE POLICY "Authenticated users can view suppliers" ON public.suppliers
    FOR SELECT USING (auth.role() = 'authenticated');

-- Policy: Pro/Enterprise users can create suppliers
CREATE POLICY "Pro/Enterprise can create suppliers" ON public.suppliers
    FOR INSERT WITH CHECK (
        auth.role() = 'authenticated' AND 
        EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND plan IN ('pro', 'enterprise'))
    );

-- Policy: Admins and creators can update suppliers
CREATE POLICY "Admins or creators can update suppliers" ON public.suppliers
    FOR UPDATE USING (
        auth.uid() = created_by OR
        EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin', 'superadmin'))
    );

-- ============================================================================
-- TABLE: orders
-- Purchase orders and supply chain transactions
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number TEXT UNIQUE NOT NULL,
    
    -- Relationships
    supplier_id UUID NOT NULL REFERENCES public.suppliers(id) ON DELETE RESTRICT,
    buyer_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    
    -- Order Items (JSONB for flexibility)
    items JSONB DEFAULT '[]'::jsonb,
    
    -- Status Tracking
    status TEXT NOT NULL DEFAULT 'pending'
        CHECK (status IN ('pending', 'confirmed', 'in_production', 'shipped', 'delivered', 'cancelled', 'disputed')),
    priority TEXT NOT NULL DEFAULT 'medium'
        CHECK (priority IN ('low', 'medium', 'high', 'critical')),
    
    -- Quantities
    quantities JSONB DEFAULT '{
        "ordered": 0,
        "shipped": 0,
        "delivered": 0,
        "damaged": 0
    }'::jsonb,
    
    -- Timeline
    expected_delivery DATE,
    actual_delivery DATE,
    confirmed_at TIMESTAMPTZ,
    shipped_at TIMESTAMPTZ,
    delivered_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Financial Information
    total_value NUMERIC(12,2) NOT NULL DEFAULT 0,
    currency CHAR(3) DEFAULT 'USD',
    payment_terms TEXT DEFAULT 'net_30',
    invoice_status TEXT DEFAULT 'pending'
        CHECK (invoice_status IN ('pending', 'issued', 'paid', 'overdue', 'cancelled')),
    
    -- Logistics
    origin_location TEXT,
    destination_location TEXT,
    carrier_name TEXT,
    tracking_number TEXT,
    current_location TEXT,
    
    -- AI-Generated Insights
    ai_insights JSONB DEFAULT '{}'::jsonb,
    
    -- Metadata
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Indexes
CREATE INDEX idx_orders_supplier ON public.orders(supplier_id);
CREATE INDEX idx_orders_buyer ON public.orders(buyer_id);
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_orders_priority ON public.orders(priority);
CREATE INDEX idx_orders_expected_delivery ON public.orders(expected_delivery);
CREATE INDEX idx_orders_order_number ON public.orders(order_number);

-- RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own orders" ON public.orders
    FOR SELECT USING (buyer_id = auth.uid());

CREATE POLICY "Users can create orders" ON public.orders
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- ============================================================================
-- TABLE: risk_alerts
-- Real-time risk monitoring and alerting system
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.risk_alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Alert Classification
    type TEXT NOT NULL 
        CHECK (type IN ('geopolitical', 'financial', 'operational', 'environmental', 'compliance', 'cyber', 'weather', 'labor')),
    severity TEXT NOT NULL DEFAULT 'medium'
        CHECK (severity IN ('critical', 'high', 'medium', 'low', 'info')),
    
    -- Content
    title TEXT NOT NULL,
    description TEXT,
    detailed_analysis TEXT,
    
    -- Impact Assessment
    affected_suppliers UUID[] DEFAULT '{}',
    affected_regions TEXT[] DEFAULT '{}',
    impact_assessment JSONB DEFAULT '{}'::jsonb,
    
    -- Source Information
    source_name TEXT,
    source_url URL,
    source_reliability NUMERIC(3,2) DEFAULT 0,
    source_last_updated TIMESTAMPTZ,
    
    -- AI Analysis
    ai_confidence NUMERIC(3,2) DEFAULT 0,
    ai_key_factors TEXT[] DEFAULT '{}',
    ai_similar_events UUID[] DEFAULT '{}',
    
    -- Status & Lifecycle
    status TEXT NOT NULL DEFAULT 'active'
        CHECK (status IN ('active', 'monitoring', 'mitigated', 'resolved', 'false_positive', 'expired')),
    
    -- Resolution
    resolved_at TIMESTAMPTZ,
    resolution_notes TEXT,
    resolved_by UUID REFERENCES public.users(id),
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ
);

-- Indexes for fast alert querying
CREATE INDEX idx_risk_alerts_type ON public.risk_alerts(type);
CREATE INDEX idx_risk_alerts_severity ON public.risk_alerts(severity);
CREATE INDEX idx_risk_alerts_status ON public.risk_alerts(status);
CREATE INDEX idx_risk_alerts_created ON public.risk_alerts(created_at DESC);
CREATE INDEX idx_risk_alerts_active_severe ON public.risk_alerts(status, severity) 
    WHERE status = 'active';

-- RLS - Alerts are generally readable by all authenticated users
ALTER TABLE public.risk_alerts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view alerts" ON public.risk_alerts
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can manage alerts" ON public.risk_alerts
    FOR ALL USING (
        EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin', 'superadmin'))
    );

-- ============================================================================
-- TABLE: news_articles
-- Aggregated news from IMF, SCO, Yahoo Finance, WSJ, etc.
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.news_articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Content
    title TEXT NOT NULL,
    summary TEXT,
    content TEXT,
    url URL UNIQUE,
    
    -- Source Classification
    source_name TEXT NOT NULL,
    source_url URL,
    source_type TEXT NOT NULL 
        CHECK (source_type IN ('imf', 'sco', 'yahoo_finance', 'wsj', 'wef', 'bloomberg', 'reuters', 'cnbc', 'ft', 'nikkei', 'forbes', 'custom', 'rss')),
    
    -- Categorization
    category TEXT NOT NULL 
        CHECK (category IN ('financial_markets', 'geopolitical', 'technology', 'esg', 'regulatory', 'commodities', 'economics', 'business', 'supply_chain')),
    tags TEXT[] DEFAULT '{}',
    
    -- Sentiment & Impact (AI-generated)
    sentiment TEXT DEFAULT 'neutral' CHECK (sentiment IN ('positive', 'negative', 'neutral', 'mixed')),
    impact TEXT DEFAULT 'medium' CHECK (impact IN ('high', 'medium', 'low')),
    sentiment_score NUMERIC(4,3), -- -1 to +1
    
    -- Entity Recognition
    mentioned_companies TEXT[] DEFAULT '{}',
    mentioned_countries TEXT[] DEFAULT '{}',
    mentioned_people TEXT[] DEFAULT '{}',
    
    -- For semantic search (pgvector)
    embedding_vector vector(1536), -- OpenAI ada-002 dimensions
    
    -- Timestamps
    published_at TIMESTAMPTZ,
    scraped_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Caching & Deduplication
    content_hash TEXT UNIQUE,
    last_accessed_at TIMESTAMPTZ
);

-- Indexes
CREATE INDEX idx_news_category ON public.news_articles(category);
CREATE INDEX idx_news_source ON public.news_articles(source_type);
CREATE INDEX idx_news_impact ON public.news_articles(impact);
CREATE INDEX idx_news_published ON public.news_articles(published_at DESC);
CREATE INDEX idx_news_sentiment ON public.news_articles(sentiment);

-- Vector index for similarity search (if pgvector available)
-- CREATE INDEX idx_news_embedding ON public.news_articles 
--     USING ivfflat (embedding_vector vector_cosine_ops) WITH (lists = 100);

-- RLS - News is publicly readable
ALTER TABLE public.news_articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view news" ON public.news_articles
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage news" ON public.news_articles
    FOR ALL USING (
        EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin', 'superadmin'))
    );

-- ============================================================================
-- TABLE: ai_query_logs
-- Track all AI interactions for analytics and billing
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.ai_query_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    
    -- Query Details
    query_type TEXT NOT NULL 
        CHECK (query_type IN ('risk_analysis', 'demand_forecast', 'supplier_intelligence', 'anomaly_detection', 'optimization', 'natural_language', 'document_analysis', 'translation')),
    query_text TEXT NOT NULL,
    response_summary TEXT,
    
    -- Model Info
    model_used TEXT NOT NULL,
    provider TEXT NOT NULL, -- 'openai', 'anthropic', 'google', 'custom'
    
    -- Usage Metrics
    prompt_tokens INTEGER DEFAULT 0,
    completion_tokens INTEGER DEFAULT 0,
    total_tokens INTEGER DEFAULT 0,
    latency_ms INTEGER DEFAULT 0,
    
    -- Quality Feedback
    satisfaction_rating INTEGER CHECK (satisfaction_rating >= 1 AND satisfaction_rating <= 5),
    feedback_text TEXT,
    feedback_given_at TIMESTAMPTZ,
    
    -- Cost Tracking (for enterprise billing)
    estimated_cost_usd NUMERIC(8,6) DEFAULT 0,
    
    -- Session Info
    session_id TEXT,
    ip_address INET,
    user_agent TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for analytics queries
CREATE INDEX idx_ai_logs_user ON public.ai_query_logs(user_id);
CREATE INDEX idx_ai_logs_type ON public.ai_query_logs(query_type);
CREATE INDEX idx_ai_logs_model ON public.ai_query_logs(model_used);
CREATE INDEX idx_ai_logs_created ON public.ai_query_logs(created_at DESC);
CREATE INDEX idx_ai_logs_daily_usage ON public.ai_query_logs(user_id, created_at);

-- RLS
ALTER TABLE public.ai_query_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own logs" ON public.ai_query_logs
    FOR SELECT USING (auth.uid() = user_id OR 
        EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin', 'superadmin')));

CREATE POLICY "System can insert logs" ON public.ai_query_logs
    FOR INSERT WITH CHECK (true); -- Service role inserts

-- ============================================================================
-- TABLE: subscriptions
-- Manage subscription plans and usage limits
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    
    -- Plan Details
    plan TEXT NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'enterprise')),
    stripe_customer_id TEXT,
    stripe_subscription_id TEXT,
    
    -- Status
    subscription_status TEXT NOT NULL DEFAULT 'active'
        CHECK (subscription_status IN ('active', 'trialing', 'past_due', 'cancelled', 'expired', 'unpaid')),
    
    -- Billing Period
    current_period_start TIMESTAMPTZ,
    current_period_end TIMESTAMPTZ,
    trial_end TIMESTAMPTZ,
    cancel_at_period_end BOOLEAN DEFAULT FALSE,
    
    -- Usage Tracking (reset daily/monthly)
    daily_ai_queries INTEGER DEFAULT 0,
    daily_api_calls INTEGER DEFAULT 0,
    monthly_active_suppliers INTEGER DEFAULT 0,
    storage_used_bytes BIGINT DEFAULT 0,
    
    -- Plan Limits Snapshot
    limits JSONB DEFAULT '{
        "max_suppliers": 50,
        "daily_ai_queries": 5,
        "daily_api_calls": 100,
        "max_storage_gb": 1,
        "features": ["basic_analytics", "community_support"]
    }'::jsonb,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index
CREATE INDEX idx_subscriptions_user ON public.subscriptions(user_id);
CREATE INDEX idx_subscriptions_plan ON public.subscriptions(plan);
CREATE INDEX idx_subscriptions_status ON public.subscriptions(subscription_status);

-- RLS
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own subscription" ON public.subscriptions
    FOR SELECT USING (auth.uid() = user_id);

-- ============================================================================
-- TABLE: dashboard_configs
-- User-customizable dashboards
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.dashboard_configs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    layout JSONB NOT NULL DEFAULT '[]'::jsonb,
    filters JSONB DEFAULT '{}'::jsonb,
    refresh_interval_seconds INTEGER DEFAULT 300,
    is_default BOOLEAN DEFAULT FALSE,
    shared_with UUID[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE public.dashboard_configs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own or shared dashboards" ON public.dashboard_configs
    FOR SELECT USING (
        auth.uid() = user_id OR 
        auth.uid() = ANY(shared_with)
    );

CREATE POLICY "Users can manage own dashboards" ON public.dashboard_configs
    FOR ALL USING (auth.uid() = user_id);

-- ============================================================================
-- TABLE: user_activities
-- Comprehensive audit log
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.user_activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    action_type TEXT NOT NULL 
        CHECK (action_type IN ('view', 'create', 'update', 'delete', 'export', 'ai_query', 'login', 'logout', 'share', 'download', 'print')),
    resource_type TEXT NOT NULL,
    resource_id UUID,
    metadata JSONB DEFAULT '{}'::jsonb,
    session_id TEXT,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for audit queries
CREATE INDEX idx_activities_user ON public.user_activities(user_id);
CREATE INDEX idx_activities_action ON public.user_activities(action_type);
CREATE INDEX idx_activities_resource ON public.user_activities(resource_type);
CREATE INDEX idx_activities_created ON public.user_activities(created_at DESC);

-- RLS
ALTER TABLE public.user_activities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own activities" ON public.user_activities
    FOR SELECT USING (auth.uid() = user_id OR 
        EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin', 'superadmin')));

-- ============================================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to tables that need auto-updating
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_suppliers_updated_at BEFORE UPDATE ON public.suppliers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_risk_alerts_updated_at BEFORE UPDATE ON public.risk_alerts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON public.subscriptions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_dashboard_configs_updated_at BEFORE UPDATE ON public.dashboard_configs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to reset daily usage counters
CREATE OR REPLACE FUNCTION reset_daily_usage_counters()
RETURNS VOID AS $$
BEGIN
    UPDATE public.subscriptions 
    SET daily_ai_queries = 0, 
        daily_api_calls = 0
    WHERE current_period_start <= NOW();
END;
$$ LANGUAGE plpgsql;

-- Schedule this function to run daily (via pg_cron if available, or external scheduler)

-- ============================================================================
-- VIEWS
-- ============================================================================

-- Active high-severity alerts view
CREATE OR REPLACE VIEW v_active_critical_alerts AS
SELECT * FROM public.risk_alerts
WHERE status = 'active' AND severity IN ('critical', 'high')
ORDER BY severity DESC, created_at DESC;

-- Supplier risk summary view
CREATE OR REPLACE VIEW v_supplier_risk_summary AS
SELECT 
    s.id,
    s.name,
    s.tier,
    s.category,
    s.country_code,
    s.risk_score,
    s.esg_rating->>'overall' as esg_overall,
    s.performance_metrics->>'on_time_delivery' as otd_percentage,
    COUNT(DISTINCT CASE WHEN a.status = 'active' THEN a END) as active_alert_count,
    COUNT(DISTINCT CASE WHEN a.severity = 'critical' AND a.status = 'active' THEN a END) as critical_alert_count
FROM public.suppliers s
LEFT JOIN public.risk_alerts a ON s.id = ANY(a.affected_suppliers)
GROUP BY s.id, s.name, s.tier, s.category, s.country_code, s.risk_score, s.esg_rating, s.performance_metrics;

-- Daily AI usage view
CREATE OR REPLACE VIEW v_daily_ai_usage AS
SELECT 
    u.id as user_id,
    u.email,
    u.plan,
    COALESCE(SUM(CASE WHEN l.created_at >= CURRENT_DATE THEN 1 ELSE 0 END), 0) as today_queries,
    COALESCE(SUM(l.total_tokens), 0) as total_tokens_today,
    s.limits->>'daily_ai_queries' as daily_limit
FROM public.users u
LEFT JOIN public.ai_query_logs l ON u.id = l.user_id
LEFT JOIN public.subscriptions s ON u.id = s.user_id
GROUP BY u.id, u.email, u.plan, s.limits;

-- ============================================================================
-- INITIAL DATA / SEED DATA (Optional - for development)
-- ============================================================================

-- Insert default admin user (password should be set via auth)
-- INSERT INTO public.users (id, email, display_name, role, plan)
-- VALUES (gen_random_uuid(), 'admin@aisupchn.com', 'System Administrator', 'superadmin', 'enterprise');

-- Comments for documentation
COMMENT ON TABLE public.users IS 'Extended user profiles with company info and preferences';
COMMENT ON TABLE public.suppliers IS 'Master supplier data with Tier-N visibility and ESG ratings';
COMMENT ON TABLE public.orders IS 'Purchase orders and supply chain transactions';
COMMENT ON TABLE public.risk_alerts IS 'Real-time risk monitoring with AI-powered analysis';
COMMENT ON TABLE public.news_articles IS 'Aggregated financial and supply chain news from major sources';
COMMENT ON TABLE public.ai_query_logs IS 'AI interaction logging for analytics and billing';
COMMENT ON TABLE public.subscriptions IS 'Subscription management and usage tracking';
COMMENT ON TABLE public.dashboard_configs IS 'User-configurable dashboard layouts';
COMMENT ON TABLE public.user_activities IS 'Comprehensive audit trail of user actions';
