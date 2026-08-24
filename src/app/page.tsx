'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { 
  Shield, Activity, Brain, AlertTriangle, CheckCircle2, 
  Search, Filter, TrendingUp, TrendingDown, Minus, Eye, MessageSquare,
  BarChart3, Zap, Globe, Lock, Bot, Users, Target,
  ArrowRight, Play, Pause, RefreshCw, Download, Settings, Bell,
  ChevronRight, ChevronDown, ChevronUp, Star, Clock, MapPin, Building2,
  Package, Truck, Factory, Database, Cpu, Mail, Phone,
  Send, X, Plus, Edit3, Save, Calendar, FileText, Scale,
  Gavel, ClipboardCheck, Fingerprint, ShieldCheck, AlertCircle,
  Info, ExternalLink, Maximize2, HelpCircle, UserCheck,
  Building, CreditCard, DollarSign, Percent, Hash,
  Link2, BadgeCheck, Award, Tag, Printer, XCircle,
  Leaf, Recycle, Thermometer, Droplets,
  LayoutDashboard, DatabaseZap, ShieldAlert, CalendarCheck,
  FileBarChart, MessageCircle, AtSign, Globe2,
  TreePine, ScrollText, ClipboardList,
  LockClosed, UnlockClosed,
  Menu, PanelLeftClose, PanelLeftOpen,
  ChevronLeft, MoreVertical,
  Sparkles, Wand2, ThumbsUp, ThumbsDown,
  Sun, Moon, Monitor, Smartphone,
  Languages, Navigation, Compass,
  Home, Store, Warehouse, School, Hospital,
  Mountain, Waves, CloudRain, Umbrella,
  Dumbbell, Bike, Skateboarding,
  Music, Disc, Radio, Tv, Gamepad2,
  Coffee, UtensilsCrossed, Pizza, Burger,
  Baby, Group, User, UserCircle,
  IdCard, HandMetal, WaveHand,
  RotateCw, RotateCcw,
  Expand, Shrink, Fullscreen,
  Grid3x3, AppWindow, Browser,
  FileJson, FileSpreadsheet, FileImage,
  Share, QrCode, ScanBarcode,
  Camera, Webcam, Aperture,
  ImagePlus, Crop, Filters,
  Adjustments, SlidersHorizontal,
  ToggleLeft, ToggleRight,
  Mic, ScreenRecord,
  Circle as CirclePlay,
  SkipBack, SkipForward,
  Repeat, Shuffle,
  Volume1, Volume2, VolumeX,
  Subtitles, Cast, Airplay,
  Headphones, Speaker,
  ZoomIn, ZoomOut,
  GripVertical, Move, Pin, Unpin,
  Archive, Inbox, Import,
  FileInput, FileOutput,
  AlertOctagon, Bug, Virus, ShieldOff,
  Ban, StopCircle, XOctagon,
  Timer, Hourglass,
  Sunrise, Sunset, CloudSun,
  Snowflake, Flame,
  BatteryFull, BatteryMedium, BatteryLow,
  Signal, SignalHigh, SignalLow, SignalZero,
  Wifi, WifiOff, Bluetooth, Usb, HardDrive,
  Tablet, Watch,
  MicOff, VideoOff, CameraOff,
  MousePointer, Touchpad, Keyboard,
  PenTool, Highlighter, Eraser,
  Palette, Brush, Bucket,
  Scissors, Ruler,
  Type, AlignLeft, AlignCenter, AlignRight,
  Bold, Italic, Underline,
  ListOrdered, ListChecks, Indent, Outdent,
  Quote, Code2, Heading1, Heading2,
  Separator, Slash,
  Equal, Calculator,
  Binary, Hexagon, Pentagon, Octagon,
  Triangle,
  PartyPopper, Gift,
  Medal, Trophy, Crown, Gem,
  Heart, HeartOff,
  Smile, Frown, Meh, Laugh,
  Angry, Sad, Surprised,
  LightMode, DarkMode,
  WorldIcon, MapIcon,
  Footprints, Route,
  Signpost, TrafficCone,
  Office, Landmark,
  Trees, Flower, Flower2,
  Tent, Campfire,
  Bicycle, SkiLift, Parachute,
  Drink, Croissant, IceCream, Candy, Lollipop,
  PersonIcon,
  Passkey,
  Salute,
  ClickIcon,
  Move3d, FlipHorizontal2, FlipVertical2,
  ExitFullscreen, PictureInPicture2,
  SplitSquareHorizontal, SplitSquareVertical,
  Rows, Columns,
  Grid2x2, Grid4x4,
  AppWindowSidebar,
  Chrome, Safari,
  FileVideo, FileAudio, FileArchive,
  Zip, Rar, Tar,
  DownloadCloud, UploadCloud,
  SocialShare,
  ScanFace,
  CameraIcon,
  CameraRotate,
  RecordIcon,
  PauseIcon,
  StopIcon,
  PlayIcon,
  PrevIcon,
  NextIcon,
  Repeat1,
  VolumeLow,
  Captions,
  Chromecast,
  BluetoothStreaming,
  HeadsetIcon,
  SpeakerIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Toaster } from '@/components/ui/toaster'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip,
  ResponsiveContainer, LineChart, Line, BarChart, Bar,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  Legend, ComposedChart
} from 'recharts'

// ============== TYPES ==============
interface Supplier {
  id: string; companyName: string; registrationNumber: string; legalEntityName: string;
  dunsNumber: string; taxId: string; address: string; city: string;
  stateProvince: string; postalCode: string; country: string; region: string;
  tier: string; category: string; subcategory: string; products: string[];
  certifications: string[]; esgScore: number; uflpaStatus: string; eudrStatus: string;
  csdddStatus: string; soxCompliant: boolean; gdprCompliant: boolean; reachCompliant: boolean;
  financialRating: string; revenue: number; employeeCount: number; foundedYear: number;
  deliveryPerformance: number; qualityMetrics: number; costCompetitiveness: number;
  innovationScore: number; riskLevel: 'low' | 'medium' | 'high' | 'critical'; riskScore: number;
  primaryContactName: string; primaryContactEmail: string; primaryContactPhone: string;
  secondaryContactName: string; secondaryContactEmail: string; website: string;
  lastAuditDate: string; nextAuditDate: string; contractExpiry: string;
  paymentTerms: string; currency: string; leadTimeDays: number; moq: number;
  capacityUtilization: number; businessContinuityPlan: boolean; insuranceCoverage: string;
  sustainabilityCertifications: string[]; carbonFootprint: number; waterUsage: number;
  wasteReduction: number; diversityInclusion: number; dataPrivacyCertified: boolean;
  cybersecurityRating: string; lastUpdated: string; notes: string; tags: string[];
  status: 'active' | 'inactive' | 'under-review' | 'suspended';
}

interface RiskAlert {
  id: string; type: 'geopolitical' | 'financial' | 'operational' | 'compliance' | 'environmental' | 'cybersecurity';
  severity: 'info' | 'warning' | 'critical'; title: string; description: string;
  supplier: string; region: string; timestamp: string; status: 'active' | 'investigating' | 'resolved' | 'dismissed';
  impact: string; probability: number; mitigation: string;
  shapValues?: { feature: string; value: number; color: string }[];
}

interface ChatMessage { id: string; role: 'user' | 'assistant'; content: string; timestamp: Date; portal: string; }

interface ComplianceItem {
  framework: string; status: 'compliant' | 'partial' | 'non-compliant' | 'pending-review' | 'exempt';
  score: number; lastAssessed: string; nextReview: string;
  requirements: { name: string; status: boolean; description: string; evidence?: string }[];
  documents: { name: string; type: string; uploaded: string; verified: boolean }[];
  findings: { severity: string; description: string; remediation: string; deadline: string }[];
  owner: string; notes: string;
}

// ============== MOCK DATA ==============
const suppliersData: Supplier[] = [
  {
    id: 'SUP-001', companyName: 'TechComponents Global Ltd.', registrationNumber: 'TCG-2024-88421',
    legalEntityName: 'TechComponents Global Limited', dunsNumber: '36-123-4567', taxId: 'GB123456789012',
    address: '100 Innovation Drive', city: 'Cambridge', stateProvince: 'Cambridgeshire',
    postalCode: 'CB1 2AZ', country: 'United Kingdom', region: 'Europe', tier: 'Tier 1',
    category: 'Electronics Manufacturing', subcategory: 'Semiconductor Components',
    products: ['Microcontrollers', 'Memory Chips', 'Sensors', 'Power Management ICs'],
    certifications: ['ISO 9001', 'ISO 14001', 'ISO 27001', 'AS9100D', 'IATF 16949'],
    esgScore: 87, uflpaStatus: 'Compliant', eudrStatus: 'N/A - Non-Forestry', csdddStatus: 'Compliant',
    soxCompliant: true, gdprCompliant: true, reachCompliant: true, financialRating: 'AA',
    revenue: 2450000000, employeeCount: 12500, foundedYear: 1987, deliveryPerformance: 96.8,
    qualityMetrics: 99.2, costCompetitiveness: 82, innovationScore: 91, riskLevel: 'low', riskScore: 12,
    primaryContactName: 'Sarah Mitchell', primaryContactEmail: 's.mitchell@techcomponents.com',
    primaryContactPhone: '+44 1223 5550101', secondaryContactName: 'James Chen',
    secondaryContactEmail: 'j.chen@techcomponents.com', website: 'https://www.techcomponents.com',
    lastAuditDate: '2024-11-15', nextAuditDate: '2025-05-15', contractExpiry: '2026-12-31',
    paymentTerms: 'Net 60', currency: 'GBP', leadTimeDays: 14, moq: 5000, capacityUtilization: 78,
    businessContinuityPlan: true, insuranceCoverage: '$50M Comprehensive Liability',
    sustainabilityCertifications: ['EcoVadis Platinum', 'Science Based Targets'],
    carbonFootprint: 12400, waterUsage: 89000, wasteReduction: 34, diversityInclusion: 78,
    dataPrivacyCertified: true, cybersecurityRating: 'A+', lastUpdated: '2025-01-20',
    notes: 'Strategic partner since 2019. Excellent track record. Expanding capacity in 2025.',
    tags: ['strategic', 'electronics', 'semiconductors', 'ESG-leader'], status: 'active'
  },
  {
    id: 'SUP-002', companyName: 'Pacific Precision Industries', registrationNumber: 'PPI-TW-99234',
    legalEntityName: 'Pacific Precision Industries Co., Ltd.', dunsNumber: '88-456-7890',
    taxId: 'TW987654321098', address: 'No. 88, Sec. 1, Hsin Tai Wu Road', city: 'Hsinchu',
    stateProvince: 'Hsinchu County', postalCode: '300', country: 'Taiwan', region: 'Asia Pacific',
    tier: 'Tier 1', category: 'Precision Manufacturing', subcategory: 'Optical Components',
    products: ['Lens Assemblies', 'Prisms', 'Filters', 'Optical Sensors'],
    certifications: ['ISO 9001', 'ISO 14001', 'ISO 45001'], esgScore: 76,
    uflpaStatus: 'Under Review', eudrStatus: 'N/A - Non-Forestry', csdddStatus: 'Pending Assessment',
    soxCompliant: false, gdprCompliant: false, reachCompliant: false, financialRating: 'A+',
    revenue: 1800000000, employeeCount: 8900, foundedYear: 1995, deliveryPerformance: 94.2,
    qualityMetrics: 97.8, costCompetitiveness: 88, innovationScore: 85, riskLevel: 'medium', riskScore: 35,
    primaryContactName: 'Wei-Lin Huang', primaryContactEmail: 'wl.huang@pacificprecision.tw',
    primaryContactPhone: '+886 3 567 8901', secondaryContactName: 'Mei Lin Tsai',
    secondaryContactEmail: 'ml.tsai@pacificprecision.tw', website: 'https://www.pacificprecision.com.tw',
    lastAuditDate: '2024-08-22', nextAuditDate: '2025-02-22', contractExpiry: '2025-09-30',
    paymentTerms: 'Net 45', currency: 'TWD', leadTimeDays: 21, moq: 10000, capacityUtilization: 85,
    businessContinuityPlan: true, insuranceCoverage: '$30M Product Liability',
    sustainabilityCertifications: ['EcoVadis Gold'], carbonFootprint: 18900, waterUsage: 145000,
    wasteReduction: 28, diversityInclusion: 65, dataPrivacyCertified: false, cybersecurityRating: 'B+',
    lastUpdated: '2025-01-18', notes: 'UFLPA review in progress due to Xinjiang-sourced raw materials claim.',
    tags: ['optics', 'taiwan', 'precision', 'UFLPA-watch'], status: 'under-review'
  },
  {
    id: 'SUP-003', companyName: 'EuroChem Solutions GmbH', registrationNumber: 'HRB-DE-45678',
    legalEntityName: 'EuroChem Solutions GmbH', dunsNumber: '52-789-0123', taxId: 'DE234567890123',
    address: 'Industriestraße 42', city: 'Ludwigshafen', stateProvince: 'Rhineland-Palatinate',
    postalCode: '67063', country: 'Germany', region: 'Europe', tier: 'Tier 2',
    category: 'Chemicals', subcategory: 'Specialty Chemicals',
    products: ['Polymer Additives', 'Coating Agents', 'Adhesives', 'Sealants'],
    certifications: ['ISO 9001', 'ISO 14001', 'REACH Registered', 'ISO 45001'],
    esgScore: 82, uflpaStatus: 'Compliant', eudrStatus: 'Compliant', csdddStatus: 'Compliant',
    soxCompliant: true, gdprCompliant: true, reachCompliant: true, financialRating: 'A',
    revenue: 980000000, employeeCount: 4200, foundedYear: 1962, deliveryPerformance: 92.5,
    qualityMetrics: 98.5, costCompetitiveness: 75, innovationScore: 79, riskLevel: 'low', riskScore: 18,
    primaryContactName: 'Dr. Klaus Weber', primaryContactEmail: 'k.weber@eurochem.de',
    primaryContactPhone: '+49 621 5550345', secondaryContactName: 'Anna Schmidt',
    secondaryContactEmail: 'a.schmidt@eurochem.de', website: 'https://www.eurochem-solutions.de',
    lastAuditDate: '2024-10-05', nextAuditDate: '2025-04-05', contractExpiry: '2027-06-30',
    paymentTerms: 'Net 30', currency: 'EUR', leadTimeDays: 10, moq: 2000, capacityUtilization: 72,
    businessContinuityPlan: true, insuranceCoverage: '$75M Environmental + Liability',
    sustainabilityCertifications: ['EcoVadis Platinum', 'EU Ecolabel', 'Blue Angel'],
    carbonFootprint: 28000, waterUsage: 210000, wasteReduction: 45, diversityInclusion: 82,
    dataPrivacyCertified: true, cybersecurityRating: 'A', lastUpdated: '2025-01-22',
    notes: 'Strong ESG performer. Leading REACH compliance.', tags: ['chemicals', 'germany', 'ESG-leader'], status: 'active'
  },
  {
    id: 'SUP-004', companyName: 'Shanghai Advanced Materials Co.', registrationNumber: 'SHAM-CN-11223',
    legalEntityName: 'Shanghai Advanced Materials Co., Ltd.', dunsNumber: '91-234-5678',
    taxId: 'CN91234567890123', address: '888 Zhangjiang High-Tech Park Road', city: 'Shanghai',
    stateProvince: 'Shanghai Municipality', postalCode: '201203', country: 'China', region: 'Asia Pacific',
    tier: 'Tier 1', category: 'Advanced Materials', subcategory: 'Composite Materials',
    products: ['Carbon Fiber Prepregs', 'Ceramic Matrix Composites', 'Metal Matrix Composites'],
    certifications: ['ISO 9001', 'ISO 14001', 'AS9100D'], esgScore: 68,
    uflpaStatus: 'High Risk', eudrStatus: 'N/A - Non-Forestry', csdddStatus: 'Non-Compliant',
    soxCompliant: false, gdprCompliant: false, reachCompliant: false, financialRating: 'BBB+',
    revenue: 3200000000, employeeCount: 18500, foundedYear: 2003, deliveryPerformance: 89.5,
    qualityMetrics: 95.2, costCompetitiveness: 94, innovationScore: 88, riskLevel: 'high', riskScore: 62,
    primaryContactName: 'Li Wei Zhang', primaryContactEmail: 'lw.zhang@shamaterials.cn',
    primaryContactPhone: '+86 21 5550 7890', secondaryContactName: 'Ying Liu',
    secondaryContactEmail: 'ying.liu@shamaterials.cn', website: 'http://www.shamaterials.cn',
    lastAuditDate: '2024-06-18', nextAuditDate: '2025-01-18', contractExpiry: '2025-12-31',
    paymentTerms: 'Net 90', currency: 'CNY', leadTimeDays: 35, moq: 25000, capacityUtilization: 92,
    businessContinuityPlan: false, insuranceCoverage: '$20M Basic Liability',
    sustainabilityCertifications: [], carbonFootprint: 45000, waterUsage: 380000,
    wasteReduction: 15, diversityInclusion: 45, dataPrivacyCertified: false, cybersecurityRating: 'C',
    lastUpdated: '2025-01-15', notes: 'CRITICAL: UFLPA high-risk. CSDDD non-compliant. Alternative sourcing required.',
    tags: ['materials', 'china', 'HIGH-RISK', 'UFLPA-critical'], status: 'under-review'
  },
  {
    id: 'SUP-005', companyName: 'Americas Logistics Partners LLC', registrationNumber: 'ALP-US-55667',
    legalEntityName: 'Americas Logistics Partners, LLC', dunsNumber: '12-345-6789',
    taxId: 'US987654321098', address: '1500 Logistics Way, Suite 400', city: 'Chicago',
    stateProvince: 'Illinois', postalCode: '60601', country: 'United States', region: 'North America',
    tier: 'Tier 2', category: 'Logistics & Distribution', subcategory: 'Freight Forwarding',
    products: ['Ocean Freight', 'Air Freight', 'Warehousing', 'Last-Mile Delivery'],
    certifications: ['ISO 9001', 'ISO 14001', 'C-TPAT', 'AEO Certified'],
    esgScore: 74, uflpaStatus: 'Compliant', eudrStatus: 'N/A - Non-Forestry',
    csdddStatus: 'Partial Compliance', soxCompliant: true, gdprCompliant: true, reachCompliant: false,
    financialRating: 'A-', revenue: 1500000000, employeeCount: 7800, foundedYear: 2001,
    deliveryPerformance: 93.8, qualityMetrics: 96.5, costCompetitiveness: 80, innovationScore: 72,
    riskLevel: 'low', riskScore: 22, primaryContactName: 'Michael Rodriguez',
    primaryContactEmail: 'm.rodriguez@americaslogistics.com', primaryContactPhone: '+1 312 555 0199',
    secondaryContactName: 'Jennifer Adams', secondaryContactEmail: 'j.adams@americaslogistics.com',
    website: 'https://www.americaslogistics.com', lastAuditDate: '2024-09-10',
    nextAuditDate: '2025-03-10', contractExpiry: '2026-06-30', paymentTerms: 'Net 45', currency: 'USD',
    leadTimeDays: 3, moq: 1, capacityUtilization: 68, businessContinuityPlan: true,
    insuranceCoverage: '$100M Cargo + Liability', sustainabilityCertifications: ['Smartway Partner', 'EcoVadis Silver'],
    carbonFootprint: 52000, waterUsage: 12000, wasteReduction: 22, diversityInclusion: 85,
    dataPrivacyCertified: true, cybersecurityRating: 'A-', lastUpdated: '2025-01-21',
    notes: 'Reliable logistics partner. Fleet electrification underway.', tags: ['logistics', 'usa', 'freight'], status: 'active'
  },
  {
    id: 'SUP-006', companyName: 'Nordic Renewable Energy AB', registrationNumber: 'NRE-SE-77889',
    legalEntityName: 'Nordic Renewable Energy AB', dunsNumber: '65-678-9012', taxId: 'SE556789012345',
    address: 'Storgatan 15', city: 'Stockholm', stateProvince: 'Stockholm County',
    postalCode: '111 43', country: 'Sweden', region: 'Europe', tier: 'Tier 2',
    category: 'Renewable Energy', subcategory: 'Wind Turbine Components',
    products: ['Rotor Blades', 'Gearboxes', 'Generators', 'Control Systems'],
    certifications: ['ISO 9001', 'ISO 14001', 'ISO 45001', 'ISO 50001'],
    esgScore: 94, uflpaStatus: 'Compliant', eudrStatus: 'Compliant', csdddStatus: 'Compliant',
    soxCompliant: true, gdprCompliant: true, reachCompliant: true, financialRating: 'AA-',
    revenue: 420000000, employeeCount: 2300, foundedYear: 2008, deliveryPerformance: 91.2,
    qualityMetrics: 97.5, costCompetitiveness: 70, innovationScore: 95, riskLevel: 'low', riskScore: 8,
    primaryContactName: 'Erik Lindqvist', primaryContactEmail: 'e.lindqvist@nordicrenewable.se',
    primaryContactPhone: '+46 8 555 1234', secondaryContactName: 'Sofia Andersson',
    secondaryContactEmail: 's.andersson@nordicrenewable.se', website: 'https://www.nordicrenewable.se',
    lastAuditDate: '2024-12-01', nextAuditDate: '2025-06-01', contractExpiry: '2028-12-31',
    paymentTerms: 'Net 60', currency: 'SEK', leadTimeDays: 28, moq: 50, capacityUtilization: 88,
    businessContinuityPlan: true, insuranceCoverage: '$40M Product + Environmental',
    sustainabilityCertifications: ['EcoVadis Platinum', 'B Corp Certified', 'Climate Neutral'],
    carbonFootprint: 8500, waterUsage: 25000, wasteReduction: 58, diversityInclusion: 91,
    dataPrivacyCertified: true, cybersecurityRating: 'A+', lastUpdated: '2025-01-24',
    notes: 'Industry-leading ESG performance. Carbon neutral operations.', tags: ['renewable', 'sweden', 'ESG-champion'], status: 'active'
  },
  {
    id: 'SUP-007', companyName: 'IndiaTech Manufacturing Pvt. Ltd.', registrationNumber: 'ITM-IN-33445',
    legalEntityName: 'IndiaTech Manufacturing Pvt. Ltd.', dunsNumber: '74-890-1234',
    taxId: 'IN345678901234', address: 'PEEC Phase II, Plot No. 45', city: 'Pune',
    stateProvince: 'Maharashtra', postalCode: '411057', country: 'India', region: 'Asia Pacific',
    tier: 'Tier 2', category: 'Electronics Assembly', subcategory: 'PCBA Manufacturing',
    products: ['PCB Assembly', 'Box Build', 'Cable Harnesses', 'Testing Services'],
    certifications: ['ISO 9001', 'ISO 14001', 'IPC-A-610 Class 3'], esgScore: 71,
    uflpaStatus: 'Compliant', eudrStatus: 'N/A - Non-Forestry', csdddStatus: 'Pending Assessment',
    soxCompliant: false, gdprCompliant: false, reachCompliant: false, financialRating: 'BBB',
    revenue: 650000000, employeeCount: 5500, foundedYear: 2010, deliveryPerformance: 88.5,
    qualityMetrics: 94.8, costCompetitiveness: 91, innovationScore: 76, riskLevel: 'medium', riskScore: 38,
    primaryContactName: 'Rajesh Kumar', primaryContactEmail: 'r.kumar@indiatech.in',
    primaryContactPhone: '+91 20 555 6789', secondaryContactName: 'Priya Sharma',
    secondaryContactEmail: 'p.sharma@indiatech.in', website: 'https://www.indiatech.co.in',
    lastAuditDate: '2024-07-20', nextAuditDate: '2025-01-20', contractExpiry: '2025-08-31',
    paymentTerms: 'Net 60', currency: 'INR', leadTimeDays: 18, moq: 5000, capacityUtilization: 82,
    businessContinuityPlan: true, insuranceCoverage: '$25M Product Liability',
    sustainabilityCertifications: ['EcoVadis Bronze'], carbonFootprint: 22000, waterUsage: 175000,
    wasteReduction: 20, diversityInclusion: 72, dataPrivacyCertified: false, cybersecurityRating: 'B',
    lastUpdated: '2025-01-17', notes: 'Cost-effective assembly partner. Quality improving steadily.',
    tags: ['assembly', 'india', 'cost-effective'], status: 'active'
  },
  {
    id: 'SUP-008', companyName: 'BrazilAgro Commodities SA', registrationNumber: 'BAG-BR-66778',
    legalEntityName: 'BrazilAgro Commodities SA', dunsNumber: '38-901-2345',
    taxId: 'BR45678901234567', address: 'Avenida Paulista, 1106', city: 'São Paulo',
    stateProvince: 'São Paulo State', postalCode: '01310-100', country: 'Brazil', region: 'Latin America',
    tier: 'Tier 2', category: 'Agriculture & Forestry', subcategory: 'Soy & Palm Oil',
    products: ['Soybeans', 'Palm Oil', 'Coffee Beans', 'Sugar'],
    certifications: ['ISO 9001', 'RSPO', 'RTRS', 'Rainforest Alliance'],
    esgScore: 64, uflpaStatus: 'Compliant', eudrStatus: 'Under Review', csdddStatus: 'Non-Compliant',
    soxCompliant: false, gdprCompliant: false, reachCompliant: false, financialRating: 'BB+',
    revenue: 2800000000, employeeCount: 12500, foundedYear: 1955, deliveryPerformance: 85.2,
    qualityMetrics: 92.5, costCompetitiveness: 86, innovationScore: 58, riskLevel: 'high', riskScore: 55,
    primaryContactName: 'Carlos Silva', primaryContactEmail: 'c.silva@brazilagro.br',
    primaryContactPhone: '+55 11 5555 0123', secondaryContactName: 'Maria Oliveira',
    secondaryContactEmail: 'm.oliveira@brazilagro.br', website: 'https://www.brazilagro.com.br',
    lastAuditDate: '2024-05-12', nextAuditDate: '2024-11-12', contractExpiry: '2025-06-30',
    paymentTerms: 'Net 90', currency: 'BRL', leadTimeDays: 45, moq: 100000, capacityUtilization: 95,
    businessContinuityPlan: false, insuranceCoverage: '$35M Agricultural + Liability',
    sustainabilityCertifications: ['RSPO Certified', 'RTRS Member'], carbonFootprint: 78000,
    waterUsage: 1200000, wasteReduction: 12, diversityInclusion: 68, dataPrivacyCertified: false,
    cybersecurityRating: 'C-', lastUpdated: '2025-01-14', notes: 'EUDR under review due to deforestation concerns.',
    tags: ['agriculture', 'brazil', 'EUDR-watch'], status: 'under-review'
  }
]

const alertsData: RiskAlert[] = [
  {
    id: 'ALT-001', type: 'compliance', severity: 'critical',
    title: 'UFLPA Entity List Match Detected',
    description: 'Shanghai Advanced Materials flagged for potential UFLPA Entity List connection.',
    supplier: 'Shanghai Advanced Materials Co.', region: 'Asia Pacific',
    timestamp: '2025-01-24T14:32:00Z', status: 'active',
    impact: 'Supply disruption, customs detention', probability: 85,
    mitigation: 'Engage third-party audit for traceability verification within 14 days',
    shapValues: [
      { feature: 'Geographic Risk Score', value: 0.35, color: '#ef4444' },
      { feature: 'Entity Connection Strength', value: 0.28, color: '#f97316' },
      { feature: 'Raw Material Origin', value: 0.22, color: '#eab308' },
      { feature: 'Transparency Score', value: 0.12, color: '#22c55e' },
      { feature: 'Historical Compliance', value: 0.03, color: '#3b82f6' }
    ]
  },
  {
    id: 'ALT-002', type: 'environmental', severity: 'warning',
    title: 'EUDR Deforestation Risk Identified',
    description: 'BrazilAgro soy sourcing area shows satellite-detected deforestation activity.',
    supplier: 'BrazilAgro Commodities SA', region: 'Latin America',
    timestamp: '2025-01-24T11:15:00Z', status: 'active',
    impact: 'EU market access restriction, fines up to 4% EU turnover', probability: 72,
    mitigation: 'Request geolocation data. Engage satellite monitoring service.',
    shapValues: [
      { feature: 'Satellite Detection Confidence', value: 0.42, color: '#ef4444' },
      { feature: 'Proximity to Protected Area', value: 0.25, color: '#f97316' },
      { feature: 'Supplier Traceability Score', value: 0.18, color: '#eab308' },
      { feature: 'Certification Coverage', value: 0.10, color: '#22c55e' },
      { feature: 'Historical Incidents', value: 0.05, color: '#3b82f6' }
    ]
  },
  {
    id: 'ALT-003', type: 'financial', severity: 'warning',
    title: 'Credit Rating Downgrade Warning',
    description: 'VietnamTextile credit outlook revised negative by Moody\'s.',
    supplier: 'VietnamTextile Group JSC', region: 'Asia Pacific',
    timestamp: '2025-01-23T16:45:00Z', status: 'investigating',
    impact: 'Payment default risk, supply disruption', probability: 45,
    mitigation: 'Reduce exposure 30%. Require letter of credit.'
  },
  {
    id: 'ALT-004', type: 'cybersecurity', severity: 'critical',
    title: 'Critical Vulnerability in Supplier Portal',
    description: 'SQL injection vulnerability detected in Shanghai Advanced portal.',
    supplier: 'Shanghai Advanced Materials Co.', region: 'Asia Pacific',
    timestamp: '2025-01-24T09:20:00Z', status: 'active',
    impact: 'Data breach risk, GDPR notification required', probability: 78,
    mitigation: 'Immediate portal suspension. Mandate security assessment.'
  }
]

const riskTrendData = [
  { month: 'Aug', overallRisk: 42, geopolitical: 35, financial: 48, operational: 38, compliance: 52, environmental: 28 },
  { month: 'Sep', overallRisk: 45, geopolitical: 40, financial: 45, operational: 42, compliance: 55, environmental: 30 },
  { month: 'Oct', overallRisk: 48, geopolitical: 45, financial: 42, operational: 45, compliance: 58, environmental: 32 },
  { month: 'Nov', overallRisk: 52, geopolitical: 52, financial: 48, operational: 48, compliance: 62, environmental: 35 },
  { month: 'Dec', overallRisk: 55, geopolitical: 58, financial: 50, operational: 50, compliance: 65, environmental: 38 },
  { month: 'Jan', overallRisk: 58, geopolitical: 62, financial: 52, operational: 52, compliance: 68, environmental: 42 }
]

const demandForecastData = [
  { month: 'Feb', actual: 12500, forecast: 12200, lower: 11000, upper: 13400, confidence: 92 },
  { month: 'Mar', actual: 13200, forecast: 13000, lower: 11700, upper: 14300, confidence: 89 },
  { month: 'Apr', actual: null, forecast: 14500, lower: 13050, upper: 15950, confidence: 87 },
  { month: 'May', actual: null, forecast: 15200, lower: 13680, upper: 16720, confidence: 84 },
  { month: 'Jun', actual: null, forecast: 14800, lower: 13320, upper: 16280, confidence: 81 },
  { month: 'Jul', actual: null, forecast: 16000, lower: 14400, upper: 17600, confidence: 78 }
]

const riskByRegionData = [
  { region: 'Asia Pacific', highRisk: 28, mediumRisk: 35, lowRisk: 37 },
  { region: 'Europe', highRisk: 12, mediumRisk: 25, lowRisk: 63 },
  { region: 'North America', highRisk: 8, mediumRisk: 22, lowRisk: 70 },
  { region: 'Latin America', highRisk: 22, mediumRisk: 38, lowRisk: 40 }
]

const complianceData: ComplianceItem[] = [
  {
    framework: 'UFLPA (Forced Labor Prevention)', status: 'partial', score: 72,
    lastAssessed: '2025-01-20', nextReview: '2025-04-20', owner: 'Compliance Team',
    notes: '2 suppliers under review. Enhanced due diligence ongoing.',
    requirements: [
      { name: 'Supply Chain Mapping', status: true, description: 'Complete Tier 1-3 visibility achieved', evidence: 'Supplier map v3.2' },
      { name: 'Forced Labor Screening', status: true, description: 'All suppliers screened against entity list', evidence: 'Screening report Jan 2025' },
      { name: 'Traceability Documentation', status: false, description: 'Raw material origin documentation pending for 3 suppliers' },
      { name: 'CBP Submission Readiness', status: true, description: 'Templates and processes established' },
      { name: 'Auditor Qualification', status: true, description: 'Third-party auditors certified and engaged' }
    ],
    documents: [
      { name: 'UFLPA Policy Document', type: 'PDF', uploaded: '2024-12-01', verified: true },
      { name: 'Supplier Due Diligence Report', type: 'XLSX', uploaded: '2025-01-15', verified: true },
      { name: 'Entity List Screening Results', type: 'PDF', uploaded: '2025-01-20', verified: false }
    ],
    findings: [
      { severity: 'HIGH', description: 'Shanghai Advanced Materials - High risk classification', remediation: 'Alternative sourcing by Q2 2025', deadline: '2025-03-31' },
      { severity: 'MEDIUM', description: 'Pacific Precision - Under review status', remediation: 'Complete enhanced diligence by Feb 28', deadline: '2025-02-28' }
    ]
  },
  {
    framework: 'EUDR (Deforestation-Free Products)', status: 'partial', score: 65,
    lastAssessed: '2025-01-18', nextReview: '2025-04-18', owner: 'Sustainability Team',
    notes: 'Forestry/agriculture suppliers require geolocation data submission.',
    requirements: [
      { name: 'Product Classification', status: true, description: 'All relevant products identified', evidence: 'Product scope document' },
      { name: 'Geolocation Data Collection', status: false, description: 'Waiting on BrazilAgro plot coordinates' },
      { name: 'Satellite Monitoring Setup', status: true, description: 'Contracted with monitoring provider' },
      { name: 'Due Diligence Statement', status: false, description: 'Draft pending final supplier data' },
      { name: 'Penalty Risk Assessment', status: true, description: 'Financial impact analysis completed' }
    ],
    documents: [
      { name: 'EUDR Compliance Framework', type: 'PDF', uploaded: '2024-11-15', verified: true },
      { name: 'Satellite Monitoring Contract', type: 'PDF', uploaded: '2024-12-20', verified: true }
    ],
    findings: [
      { severity: 'HIGH', description: 'BrazilAgro - Deforestation risk in sourcing area', remediation: 'Obtain geolocation data immediately', deadline: '2025-02-15' }
    ]
  },
  {
    framework: 'CSDDD (Corporate Sustainability Diligence)', status: 'non-compliant', score: 45,
    lastAssessed: '2025-01-10', nextReview: '2025-07-10', owner: 'Legal/ESG Team',
    notes: 'Phased implementation. Full compliance required by 2027 for large companies.',
    requirements: [
      { name: 'Environmental Due Diligence', status: false, description: 'Climate transition plan not formalized' },
      { name: 'Human Rights Assessment', status: true, description: 'Initial assessment completed' },
      { name: 'Stakeholder Engagement', status: false, description: 'Formal process not established' },
      { name: 'Grievance Mechanism', status: false, description: 'External reporting channel needed' },
      { name: 'Climate Transition Plan', status: false, description: 'SBTi-aligned plan in development' }
    ],
    documents: [],
    findings: [
      { severity: 'CRITICAL', description: 'Asian suppliers largely non-compliant with CSDDD requirements', remediation: 'Engage suppliers on compliance roadmap', deadline: '2025-06-30' }
    ]
  },
  {
    framework: 'SOX (Sarbanes-Oxley)', status: 'compliant', score: 95,
    lastAssessed: '2024-12-15', nextReview: '2025-06-15', owner: 'Finance/Audit',
    notes: 'US-listed entities fully compliant. Non-US suppliers exempt.',
    requirements: [
      { name: 'Internal Controls', status: true, description: 'ICFR framework maintained', evidence: 'SOX 404 assessment' },
      { name: 'Financial Reporting', status: true, description: 'Accurate and timely reporting' },
      { name: 'Auditor Independence', status: true, description: 'External auditor relationships documented' },
      { name: 'Document Retention', status: true, description: '7-year retention policy enforced' },
      { name: 'Whistleblower Program', status: true, description: 'Anonymous reporting channel active' }
    ],
    documents: [
      { name: 'SOX Compliance Attestation', type: 'PDF', uploaded: '2024-12-15', verified: true }
    ],
    findings: []
  },
  {
    framework: 'GDPR (Data Protection)', status: 'compliant', score: 88,
    lastAssessed: '2025-01-05', nextReview: '2025-07-05', owner: 'Data Privacy Office',
    notes: 'EU operations fully compliant. Non-EU suppliers require DPAs.',
    requirements: [
      { name: 'Lawful Basis Documentation', status: true, description: 'All data processing activities documented' },
      { name: 'Data Processing Agreements', status: false, description: 'DPAs pending with 4 Asian suppliers' },
      { name: 'Data Subject Rights Process', status: true, description: 'SAR response process established' },
      { name: 'Breach Notification Procedure', status: true, description: '72-hour notification process tested' },
      { name: 'DPO Appointment', status: true, description: 'DPO appointed and registered' }
    ],
    documents: [
      { name: 'GDPR Data Inventory', type: 'XLSX', uploaded: '2025-01-05', verified: true },
      { name: 'DPA Template Library', type: 'PDF', uploaded: '2024-11-20', verified: true }
    ],
    findings: [
      { severity: 'MEDIUM', description: 'Missing DPAs with Asian suppliers', remediation: 'Execute DPAs by Q1 2025', deadline: '2025-03-31' }
    ]
  },
  {
    framework: 'REACH (Chemical Regulation)', status: 'compliant', score: 91,
    lastAssessed: '2024-12-10', nextReview: '2025-06-10', owner: 'EHS/Regulatory',
    notes: 'Chemical suppliers well-managed. Authorization tracking active.',
    requirements: [
      { name: 'Substance Registration', status: true, description: 'All relevant substances >1t/yr registered' },
      { name: 'SVHC Monitoring', status: true, description: 'Candidate list updates tracked automatically' },
      { name: 'Authorization Management', status: true, description: '2 substances under authorization managed' },
      { name: 'SDS Distribution', status: true, description: 'Safety data sheets current and distributed' },
      { name: 'Restriction Compliance', status: true, description: 'No restricted substances in supply chain' }
    ],
    documents: [
      { name: 'REACH Registration Portfolio', type: 'PDF', uploaded: '2024-12-10', verified: true }
    ],
    findings: []
  }
]

const riskRadarData = [
  { category: 'Geopolitical', score: 62, fullScore: 100 },
  { category: 'Financial', score: 52, fullScore: 100 },
  { category: 'Operational', score: 48, fullScore: 100 },
  { category: 'Compliance', score: 68, fullScore: 100 },
  { category: 'Environmental', score: 42, fullScore: 100 },
  { category: 'Cybersecurity', score: 55, fullScore: 100 },
  { category: 'Reputational', score: 38, fullScore: 100 },
  { category: 'Strategic', score: 45, fullScore: 100 }
]

// ============== UTILITY COMPONENTS ==============

function RequiredMarker({ required }: { required: boolean }) {
  return required ? (
    <span className="text-red-500 ml-0.5" title="Required field">*</span>
  ) : (
    <span className="text-gray-400 ml-0.5 text-xs" title="Optional field">(opt)</span>
  )
}

function ExpandableText({ 
  title, 
  content, 
  maxLines = 3, 
  defaultOpen = false 
}: { 
  title?: string; 
  content: string; 
  maxLines?: number; 
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  
  return (
    <div className="border border-gray-700/50 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 bg-gray-800/30 hover:bg-gray-800/50 transition-colors"
      >
        <span className="text-sm font-medium text-gray-200">{title || 'Details'}</span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="p-3 text-sm text-gray-300 bg-gray-900/20 whitespace-pre-wrap">
          {content}
        </div>
      )}
    </div>
  )
}

function SectionChatWidget({ portalName }: { portalName: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hello! I'm your AI assistant for the ${portalName}. How can I help you today?`,
      timestamp: new Date(),
      portal: portalName
    }
  ])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return
    
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
      portal: portalName
    }
    
    setMessages(prev => [...prev, userMsg])
    setInput('')
    
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I understand you're asking about "${input}". In the ${portalName}, I can help you analyze data, generate reports, or provide insights. Would you like me to elaborate on any specific aspect?`,
        timestamp: new Date(),
        portal: portalName
      }
      setMessages(prev => [...prev, aiResponse])
    }, 800)
  }

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="gap-2 border-cyan-500/30 hover:bg-cyan-500/10"
      >
        <MessageCircle className="w-4 h-4" />
        AI Assistant
        {isOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
      </Button>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[480px] bg-gray-900 border-gray-700">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-cyan-400" />
              {portalName} - AI Assistant
            </DialogTitle>
            <Description>Ask questions about this section</Description>
          </DialogHeader>
          
          <div className="h-[300px] overflow-y-auto space-y-3 p-3 bg-gray-950 rounded-lg mb-3">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg ${
                  msg.role === 'user' ? 'bg-cyan-600 text-white' : 'bg-gray-800 text-gray-200'
                }`}>
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about this section..."
              className="bg-gray-800 border-gray-600"
            />
            <Button onClick={handleSend} size="icon" className="bg-cyan-600 hover:bg-cyan-700">
              <Send className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex items-center gap-3 pt-2 border-t border-gray-700">
            <Button variant="ghost" size="sm" className="text-gray-400 gap-1">
              <Mail className="w-3 h-3" /> Email Support
            </Button>
            <span className="text-xs text-gray-500">|</span>
            <span className="text-xs text-gray-500">Response time: &lt;2 min</span>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

function RiskBadge({ level }: { level: string }) {
  const config = {
    low: { color: 'bg-green-500/20 text-green-400 border-green-500/30', icon: CheckCircle2 },
    medium: { color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', icon: AlertTriangle },
    high: { color: 'bg-orange-500/20 text-orange-400 border-orange-500/30', icon: AlertTriangle },
    critical: { color: 'bg-red-500/20 text-red-400 border-red-500/30', icon: XCircle }
  }
  const { color, icon: Icon } = config[level as keyof typeof config] || config.medium
  
  return (
    <Badge variant="outline" className={`${color} gap-1`}>
      <Icon className="w-3 h-3" />
      {level.toUpperCase()}
    </Badge>
  )
}

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, string> = {
    active: 'bg-green-500/20 text-green-400 border-green-500/30',
    inactive: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    'under-review': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    suspended: 'bg-red-500/20 text-red-400 border-red-500/30',
    compliant: 'bg-green-500/20 text-green-400 border-green-500/30',
    partial: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    'non-compliant': 'bg-red-500/20 text-red-400 border-red-500/30',
    'pending-review': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    exempt: 'bg-gray-500/20 text-gray-400 border-gray-500/30'
  }
  
  return (
    <Badge variant="outline" className={`${config[status] || config['pending-review']}`}>
      {status.replace('-', ' ').toUpperCase()}
    </Badge>
  )
}

// ============== MAIN APPLICATION ==============

export default function CommandCenter() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [regionFilter, setRegionFilter] = useState('all')
  const [tierFilter, setTierFilter] = useState('all')
  const [riskFilter, setRiskFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [showShapModal, setShowShapModal] = useState<RiskAlert | null>(null)
  const [isStreaming, setIsStreaming] = useState(true)
  const [streamedAlerts, setStreamedAlerts] = useState<RiskAlert[]>([])

  // Simulate alert streaming
  useEffect(() => {
    if (!isStreaming) return
    let index = 0
    const interval = setInterval(() => {
      if (index < alertsData.length) {
        setStreamedAlerts(prev => [...prev, alertsData[index]])
        index++
      } else {
        clearInterval(interval)
      }
    }, 1500)
    return () => clearInterval(interval)
  }, [isStreaming])

  const filteredSuppliers = suppliersData.filter(s => {
    const matchSearch = searchTerm === '' || 
      s.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.country.toLowerCase().includes(searchTerm.toLowerCase())
    const matchRegion = regionFilter === 'all' || s.region === regionFilter
    const matchTier = tierFilter === 'all' || s.tier === tierFilter
    const matchRisk = riskFilter === 'all' || s.riskLevel === riskFilter
    const matchCategory = categoryFilter === 'all' || s.category === categoryFilter
    return matchSearch && matchRegion && matchTier && matchRisk && matchCategory
  })

  const totalSuppliers = suppliersData.length
  const highRiskCount = suppliersData.filter(s => s.riskLevel === 'high' || s.riskLevel === 'critical').length
  const avgEsgScore = Math.round(suppliersData.reduce((acc, s) => acc + s.esgScore, 0) / suppliersData.length)
  const compliantCount = suppliersData.filter(s => s.uflpaStatus === 'Compliant').length

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
        {/* Header */}
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-gray-950/80 border-b border-gray-800/50">
          <div className="max-w-[1800px] mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <ShieldAlert className="w-8 h-8 text-cyan-400" />
                <div className="absolute inset-0 bg-cyan-400/20 blur-xl rounded-full" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Supply Chain Command Center
                </h1>
                <p className="text-xs text-gray-400">AI-Powered Risk Intelligence Platform</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-cyan-400" />
                  <span>{totalSuppliers} Suppliers</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className={`w-4 h-4 ${highRiskCount > 0 ? 'text-red-400' : 'text-green-400'}`} />
                  <span>{highRiskCount} High Risk</span>
                </div>
                <div className="flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-green-400" />
                  <span>ESG: {avgEsgScore}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center">
                    {alertsData.filter(a => a.status === 'active').length}
                  </span>
                </Button>
                <Button variant="ghost" size="icon">
                  <Settings className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-[1800px] mx-auto p-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            {/* Navigation Tabs */}
            <TabsList className="grid w-full grid-cols-5 bg-gray-900/80 border border-gray-800/50 p-1 rounded-xl">
              <TabsTrigger value="dashboard" className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white gap-2">
                <LayoutDashboard className="w-4 h-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </TabsTrigger>
              <TabsTrigger value="directory" className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white gap-2">
                <DatabaseZap className="w-4 h-4" />
                <span className="hidden sm:inline">Supply Directory</span>
              </TabsTrigger>
              <TabsTrigger value="intelligence" className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white gap-2">
                <Brain className="w-4 h-4" />
                <span className="hidden sm:inline">Risk Intelligence</span>
              </TabsTrigger>
              <TabsTrigger value="forecasting" className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white gap-2">
                <LineChart className="w-4 h-4" />
                <span className="hidden sm:inline">Demand Forecast</span>
              </TabsTrigger>
              <TabsTrigger value="compliance" className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white gap-2">
                <Scale className="w-4 h-4" />
                <span className="hidden sm:inline">Compliance</span>
              </TabsTrigger>
            </TabsList>

            {/* ==================== DASHBOARD TAB ==================== */}
            <TabsContent value="dashboard" className="space-y-6">
              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700/50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400">Total Suppliers</p>
                        <p className="text-3xl font-bold mt-1">{totalSuppliers}</p>
                        <p className="text-xs text-green-400 mt-1 flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" /> +3 this quarter
                        </p>
                      </div>
                      <div className="p-3 bg-cyan-500/10 rounded-lg">
                        <Users className="w-6 h-6 text-cyan-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700/50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400">High Risk Suppliers</p>
                        <p className="text-3xl font-bold mt-1 text-red-400">{highRiskCount}</p>
                        <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                          <TrendingDown className="w-3 h-3" /> Requires attention
                        </p>
                      </div>
                      <div className="p-3 bg-red-500/10 rounded-lg">
                        <AlertTriangle className="w-6 h-6 text-red-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700/50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400">Avg ESG Score</p>
                        <p className="text-3xl font-bold mt-1 text-green-400">{avgEsgScore}</p>
                        <p className="text-xs text-green-400 mt-1 flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" /> +5 vs last year
                        </p>
                      </div>
                      <div className="p-3 bg-green-500/10 rounded-lg">
                        <Leaf className="w-6 h-6 text-green-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700/50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400">UFLPA Compliant</p>
                        <p className="text-3xl font-bold mt-1">{compliantCount}/{totalSuppliers}</p>
                        <p className="text-xs text-yellow-400 mt-1 flex items-center gap-1">
                          <Minus className="w-3 h-3" /> {totalSuppliers - compliantCount} under review
                        </p>
                      </div>
                      <div className="p-3 bg-yellow-500/10 rounded-lg">
                        <Gavel className="w-6 h-6 text-yellow-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Risk Trend Chart */}
                <Card className="bg-gray-900/80 border-gray-700/50">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div>
                      <CardTitle className="text-lg">Risk Trend Analysis</CardTitle>
                      <CardDescription>6-month risk trajectory by category</CardDescription>
                    </div>
                    <SectionChatWidget portalName="Dashboard Analytics" />
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={280}>
                      <AreaChart data={riskTrendData}>
                        <defs>
                          <linearGradient id="colorOverall" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
                        <YAxis stroke="#9ca3af" fontSize={12} />
                        <RechartsTooltip 
                          contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                        />
                        <Area type="monotone" dataKey="overallRisk" stroke="#06b6d4" fill="url(#colorOverall)" strokeWidth={2} name="Overall Risk" />
                        <Line type="monotone" dataKey="compliance" stroke="#ef4444" strokeWidth={2} dot={false} name="Compliance Risk" />
                        <Line type="monotone" dataKey="geopolitical" stroke="#f97316" strokeWidth={2} dot={false} name="Geopolitical" />
                        <Legend />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Risk by Region */}
                <Card className="bg-gray-900/80 border-gray-700/50">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div>
                      <CardTitle className="text-lg">Risk Distribution by Region</CardTitle>
                      <CardDescription>Supplier risk concentration analysis</CardDescription>
                    </div>
                    <SectionChatWidget portalName="Regional Risk Analysis" />
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={280}>
                      <BarChart data={riskByRegionData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="region" stroke="#9ca3af" fontSize={12} />
                        <YAxis stroke="#9ca3af" fontSize={12} />
                        <RechartsTooltip 
                          contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                        />
                        <Bar dataKey="highRisk" stackId="a" fill="#ef4444" name="High Risk" />
                        <Bar dataKey="mediumRisk" stackId="a" fill="#f97316" name="Medium Risk" />
                        <Bar dataKey="lowRisk" stackId="a" fill="#22c55e" name="Low Risk" />
                        <Legend />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Live Alerts Feed */}
              <Card className="bg-gray-900/80 border-gray-700/50">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Activity className="w-5 h-5 text-cyan-400 animate-pulse" />
                      Live Risk Alerts
                    </CardTitle>
                    <CardDescription>Real-time threat intelligence stream</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setIsStreaming(!isStreaming)
                        if (!isStreaming) setStreamedAlerts([])
                      }}
                      className="gap-1"
                    >
                      {isStreaming ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                      {isStreaming ? 'Pause' : 'Resume'}
                    </Button>
                    <SectionChatWidget portalName="Alert Intelligence" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                    {streamedAlerts.length === 0 && isStreaming && (
                      <div className="text-center py-8 text-gray-400">
                        <RefreshCw className="w-8 h-8 mx-auto mb-2 animate-spin" />
                        <p>Streaming live alerts...</p>
                      </div>
                    )}
                    {streamedAlerts.map((alert) => (
                      <div
                        key={alert.id}
                        className={`p-4 rounded-lg border ${
                          alert.severity === 'critical' ? 'bg-red-950/30 border-red-500/30' :
                          alert.severity === 'warning' ? 'bg-yellow-950/20 border-yellow-500/30' :
                          'bg-gray-800/50 border-gray-700/50'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="outline" className={
                                alert.severity === 'critical' ? 'border-red-500 text-red-400' :
                                alert.severity === 'warning' ? 'border-yellow-500 text-yellow-400' :
                                'border-blue-500 text-blue-400'
                              }>
                                {alert.severity.toUpperCase()}
                              </Badge>
                              <Badge variant="secondary" className="text-xs">
                                {alert.type}
                              </Badge>
                            </div>
                            <h4 className="font-medium text-white">{alert.title}</h4>
                            <p className="text-sm text-gray-400 mt-1">{alert.description}</p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                              <span className="flex items-center gap-1"><Building2 className="w-3 h-3" />{alert.supplier}</span>
                              <span className="flex items-center gap-1"><Globe className="w-3 h-3" />{alert.region}</span>
                              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{new Date(alert.timestamp).toLocaleString()}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            {alert.shapValues && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setShowShapModal(alert)}
                                className="text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/10"
                              >
                                <Brain className="w-3 h-3 mr-1" /> SHAP
                              </Button>
                            )}
                          </div>
                        </div>
                        
                        <ExpandableText title="Impact & Mitigation" content={`Impact: ${alert.impact}\n\nProbability: ${alert.probability}%\n\nMitigation: ${alert.mitigation}`} />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* ==================== SUPPLY DIRECTORY TAB ==================== */}
            <TabsContent value="directory" className="space-y-6">
              {/* Filters Section */}
              <Card className="bg-gray-900/80 border-gray-700/50">
                <CardHeader className="pb-4">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <DatabaseZap className="w-5 h-5 text-cyan-400" />
                        Supplier Directory
                      </CardTitle>
                      <CardDescription>Complete supplier database with advanced filtering</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <SectionChatWidget portalName="Supply Directory" />
                      <Button className="bg-cyan-600 hover:bg-cyan-700 gap-1">
                        <Plus className="w-4 h-4" /> Add Supplier
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div className="space-y-1">
                      <Label className="text-xs text-gray-400 flex items-center gap-1">
                        Search <RequiredMarker required={true} />
                      </Label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          placeholder="Name, ID, Country..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-9 bg-gray-800 border-gray-600"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <Label className="text-xs text-gray-400 flex items-center gap-1">
                        Region <RequiredMarker required={false} />
                      </Label>
                      <Select value={regionFilter} onValueChange={setRegionFilter}>
                        <SelectTrigger className="bg-gray-800 border-gray-600">
                          <SelectValue placeholder="All Regions" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Regions</SelectItem>
                          <SelectItem value="Europe">Europe</SelectItem>
                          <SelectItem value="Asia Pacific">Asia Pacific</SelectItem>
                          <SelectItem value="North America">North America</SelectItem>
                          <SelectItem value="Latin America">Latin America</SelectItem>
                          <SelectItem value="Middle East">Middle East</SelectItem>
                          <SelectItem value="Africa">Africa</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-1">
                      <Label className="text-xs text-gray-400 flex items-center gap-1">
                        Tier <RequiredMarker required={false} />
                      </Label>
                      <Select value={tierFilter} onValueChange={setTierFilter}>
                        <SelectTrigger className="bg-gray-800 border-gray-600">
                          <SelectValue placeholder="All Tiers" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Tiers</SelectItem>
                          <SelectItem value="Tier 1">Tier 1 - Strategic</SelectItem>
                          <SelectItem value="Tier 2">Tier 2 - Preferred</SelectItem>
                          <SelectItem value="Tier 3">Tier 3 - Approved</SelectItem>
                          <SelectItem value="Tier 4">Tier 4 - Limited</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-1">
                      <Label className="text-xs text-gray-400 flex items-center gap-1">
                        Risk Level <RequiredMarker required={false} />
                      </Label>
                      <Select value={riskFilter} onValueChange={setRiskFilter}>
                        <SelectTrigger className="bg-gray-800 border-gray-600">
                          <SelectValue placeholder="All Levels" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Levels</SelectItem>
                          <SelectItem value="low">Low Risk</SelectItem>
                          <SelectItem value="medium">Medium Risk</SelectItem>
                          <SelectItem value="high">High Risk</SelectItem>
                          <SelectItem value="critical">Critical Risk</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-1">
                      <Label className="text-xs text-gray-400 flex items-center gap-1">
                        Category <RequiredMarker required={false} />
                      </Label>
                      <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                        <SelectTrigger className="bg-gray-800 border-gray-600">
                          <SelectValue placeholder="All Categories" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Categories</SelectItem>
                          <SelectItem value="Electronics Manufacturing">Electronics Manufacturing</SelectItem>
                          <SelectItem value="Precision Manufacturing">Precision Manufacturing</SelectItem>
                          <SelectItem value="Chemicals">Chemicals</SelectItem>
                          <SelectItem value="Advanced Materials">Advanced Materials</SelectItem>
                          <SelectItem value="Logistics & Distribution">Logistics & Distribution</SelectItem>
                          <SelectItem value="Renewable Energy">Renewable Energy</SelectItem>
                          <SelectItem value="Electronics Assembly">Electronics Assembly</SelectItem>
                          <SelectItem value="Agriculture & Forestry">Agriculture & Forestry</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="text-gray-400">
                      Showing <span className="text-white font-medium">{filteredSuppliers.length}</span> of {totalSuppliers} suppliers
                    </span>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="text-gray-400">
                        <Download className="w-4 h-4 mr-1" /> Export
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-400">
                        <Printer className="w-4 h-4 mr-1" /> Print
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Supplier Table */}
              <Card className="bg-gray-900/80 border-gray-700/50">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-700/50 hover:bg-transparent">
                        <TableHead className="text-gray-300">Supplier</TableHead>
                        <TableHead className="text-gray-300">Region</TableHead>
                        <TableHead className="text-gray-300">Tier</TableHead>
                        <TableHead className="text-gray-300">Category</TableHead>
                        <TableHead className="text-gray-300">Risk</TableHead>
                        <TableHead className="text-gray-300">ESG</TableHead>
                        <TableHead className="text-gray-300">UFLPA</TableHead>
                        <TableHead className="text-gray-300">Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredSuppliers.map((supplier) => (
                        <TableRow 
                          key={supplier.id} 
                          className="border-gray-700/30 cursor-pointer hover:bg-gray-800/50"
                          onClick={() => setSelectedSupplier(supplier)}
                        >
                          <TableCell>
                            <div>
                              <p className="font-medium text-white">{supplier.companyName}</p>
                              <p className="text-xs text-gray-500">{supplier.id}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="flex items-center gap-1 text-sm">
                              <Globe2 className="w-3 h-3 text-gray-400" />
                              {supplier.region}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">{supplier.tier}</Badge>
                          </TableCell>
                          <TableCell className="max-w-[200px] truncate text-sm">
                            {supplier.category}
                          </TableCell>
                          <TableCell>
                            <RiskBadge level={supplier.riskLevel} />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Progress value={supplier.esgScore} className="w-16 h-2" />
                              <span className="text-sm text-gray-300">{supplier.esgScore}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={
                              supplier.uflpaStatus === 'Compliant' ? 'border-green-500 text-green-400' :
                              supplier.uflpaStatus === 'High Risk' ? 'border-red-500 text-red-400' :
                              'border-yellow-500 text-yellow-400'
                            }>
                              {supplier.uflpaStatus}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <StatusBadge status={supplier.status} />
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Edit3 className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-cyan-400">
                                <Mail className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* ==================== RISK INTELLIGENCE TAB ==================== */}
            <TabsContent value="intelligence" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Risk Radar Chart */}
                <Card className="bg-gray-900/80 border-gray-700/50 lg:col-span-1">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Radar className="w-5 h-5 text-purple-400" />
                      Risk Radar
                    </CardTitle>
                    <CardDescription>Multi-dimensional risk assessment</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <RadarChart data={riskRadarData}>
                        <PolarGrid stroke="#374151" />
                        <PolarAngleAxis dataKey="category" stroke="#9ca3af" fontSize={11} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#374151" />
                        <Radar name="Risk Score" dataKey="score" stroke="#a855f7" fill="#a855f7" fillOpacity={0.3} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Risk Categories Breakdown */}
                <Card className="bg-gray-900/80 border-gray-700/50 lg:col-span-2">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Risk Category Analysis</CardTitle>
                      <CardDescription>Detailed breakdown by risk type</CardDescription>
                    </div>
                    <SectionChatWidget portalName="Risk Intelligence" />
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { name: 'Geopolitical', value: 62, icon: Globe, color: 'text-orange-400', bg: 'bg-orange-500/10' },
                        { name: 'Financial', value: 52, icon: DollarSign, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
                        { name: 'Operational', value: 48, icon: Cpu, color: 'text-blue-400', bg: 'bg-blue-500/10' },
                        { name: 'Compliance', value: 68, icon: Gavel, color: 'text-red-400', bg: 'bg-red-500/10' },
                        { name: 'Environmental', value: 42, icon: Leaf, color: 'text-green-400', bg: 'bg-green-500/10' },
                        { name: 'Cybersecurity', value: 55, icon: Shield, color: 'text-purple-400', bg: 'bg-purple-500/10' },
                        { name: 'Reputational', value: 38, icon: Star, color: 'text-pink-400', bg: 'bg-pink-500/10' },
                        { name: 'Strategic', value: 45, icon: Target, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
                      ].map((item) => (
                        <div key={item.name} className={`p-4 rounded-lg ${item.bg} border border-gray-700/30`}>
                          <div className="flex items-center justify-between mb-2">
                            <item.icon className={`w-5 h-5 ${item.color}`} />
                            <span className={`text-lg font-bold ${item.color}`}>{item.value}</span>
                          </div>
                          <p className="text-xs text-gray-400">{item.name}</p>
                          <Progress value={item.value} className="mt-2 h-1.5" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* SHAP Explanation Modal Trigger Area */}
              <Card className="bg-gray-900/80 border-gray-700/50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Brain className="w-5 h-5 text-cyan-400" />
                    AI Explainability - SHAP Analysis
                  </CardTitle>
                  <CardDescription>Click on any alert with SHAP data to view feature attribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {alertsData.filter(a => a.shapValues).map(alert => (
                      <button
                        key={alert.id}
                        onClick={() => setShowShapModal(alert)}
                        className="p-4 rounded-lg bg-gray-800/50 border border-gray-700/50 hover:border-cyan-500/50 transition-colors text-left"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline" className={
                            alert.severity === 'critical' ? 'border-red-500 text-red-400' : 'border-yellow-500 text-yellow-400'
                          }>
                            {alert.severity}
                          </Badge>
                          <Brain className="w-4 h-4 text-cyan-400" />
                        </div>
                        <p className="font-medium text-sm">{alert.title}</p>
                        <p className="text-xs text-gray-500 mt-1">{alert.supplier}</p>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* ==================== DEMAND FORECASTING TAB ==================== */}
            <TabsContent value="forecasting" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Forecast Chart */}
                <Card className="bg-gray-900/80 border-gray-700/50 lg:col-span-2">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <LineChart className="w-5 h-5 text-green-400" />
                        Demand Forecast
                      </CardTitle>
                      <CardDescription>AI-powered demand prediction with confidence intervals</CardDescription>
                    </div>
                    <SectionChatWidget portalName="Demand Forecasting" />
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={350}>
                      <ComposedChart data={demandForecastData}>
                        <defs>
                          <linearGradient id="confidenceGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
                        <YAxis stroke="#9ca3af" fontSize={12} />
                        <RechartsTooltip 
                          contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                        />
                        <Area type="monotone" dataKey="upper" stroke="transparent" fill="url(#confidenceGrad)" />
                        <Area type="monotone" dataKey="lower" stroke="transparent" fill="#111827" />
                        <Line type="monotone" dataKey="actual" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} name="Actual" />
                        <Line type="monotone" dataKey="forecast" stroke="#22c55e" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Forecast" />
                        <Legend />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Forecast Metrics */}
                <Card className="bg-gray-900/80 border-gray-700/50">
                  <CardHeader>
                    <CardTitle className="text-lg">Forecast Accuracy</CardTitle>
                    <CardDescription>Model performance metrics</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {[
                      { label: 'MAPE', value: '4.2%', desc: 'Mean Absolute Percentage Error', good: true },
                      { label: 'RMSE', value: '342', desc: 'Root Mean Square Error', good: true },
                      { label: 'Bias', value: '+1.8%', desc: 'Forecast bias (under/over)', good: true },
                      { label: 'Coverage', value: '94%', desc: 'Confidence interval coverage', good: true },
                    ].map(metric => (
                      <div key={metric.label} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-400">{metric.label}</span>
                          <span className={`font-mono font-bold ${metric.good ? 'text-green-400' : 'text-yellow-400'}`}>
                            {metric.value}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">{metric.desc}</p>
                        <Progress value={metric.good ? 94 : 72} className="h-1.5" />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Scenario Planning */}
              <Card className="bg-gray-900/80 border-gray-700/50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    Scenario Planning
                  </CardTitle>
                  <CardDescription>What-if analysis for demand planning</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { scenario: 'Baseline', change: '0%', demand: '15,200', color: 'border-blue-500', icon: Minus },
                      { scenario: 'Optimistic', change: '+15%', demand: '17,480', color: 'border-green-500', icon: TrendingUp },
                      { scenario: 'Pessimistic', change: '-20%', demand: '12,160', color: 'border-red-500', icon: TrendingDown },
                    ].map(s => (
                      <div key={s.scenario} className={`p-4 rounded-lg border-l-4 ${s.color} bg-gray-800/30`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{s.scenario}</span>
                          <s.icon className={`w-4 h-4 ${
                            s.scenario === 'Optimistic' ? 'text-green-400' :
                            s.scenario === 'Pessimistic' ? 'text-red-400' : 'text-blue-400'
                          }`} />
                        </div>
                        <p className="text-2xl font-bold">{s.demand}</p>
                        <p className={`text-sm ${
                          s.change.startsWith('+') ? 'text-green-400' :
                          s.change.startsWith('-') ? 'text-red-400' : 'text-gray-400'
                        }`}>{s.change} vs baseline</p>
                      </div>
                    ))}
                  </div>
                  
                  <ExpandableText 
                    title="Scenario Assumptions & Methodology"
                    content={`BASELINE SCENARIO:
- Assumes current market conditions continue
- No major supply chain disruptions
- Historical growth rate of 3% QoQ maintained

OPTIMISTIC SCENARIO:
- New customer contracts secured (+8% volume)
- Supplier capacity expansion successful (-5% lead time)
- Favorable currency movements (+2% margin)
- Total impact: ~15% demand increase

PESSIMISTIC SCENARIO:
- Key supplier disruption (Shanghai Advanced)
- Economic slowdown in primary markets (-10%)
- Regulatory delays affecting product launches (-5%)
- Logistics cost increases reducing competitiveness (-5%)
- Total impact: ~20% demand decrease

MODEL METHODOLOGY:
- Prophet time series forecasting with seasonality
- Ensemble of ARIMA and Neural Network models
- External regressors: economic indicators, commodity prices
- Confidence intervals at 95% significance level
- Monthly retraining with rolling window`}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* ==================== COMPLIANCE TAB ==================== */}
            <TabsContent value="compliance" className="space-y-6">
              {/* Compliance Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {complianceData.map(comp => (
                  <Card key={comp.framework} className="bg-gray-900/80 border-gray-700/50">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className={
                          comp.status === 'compliant' ? 'border-green-500 text-green-400' :
                          comp.status === 'partial' ? 'border-yellow-500 text-yellow-400' :
                          'border-red-500 text-red-400'
                        }>
                          {comp.status}
                        </Badge>
                      </div>
                      <p className="text-xs font-medium text-gray-300 line-clamp-2 h-8">
                        {comp.framework.split('(')[0].trim()}
                      </p>
                      <p className="text-2xl font-bold mt-2">{comp.score}<span className="text-sm text-gray-500">/100</span></p>
                      <Progress value={comp.score} className="mt-2 h-1.5" />
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Detailed Compliance Frameworks */}
              <div className="space-y-4">
                {complianceData.map((comp) => (
                  <Card key={comp.framework} className="bg-gray-900/80 border-gray-700/50">
                    <CardHeader className="pb-3">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <CardTitle className="text-lg">{comp.framework}</CardTitle>
                            <StatusBadge status={comp.status} />
                          </div>
                          <CardDescription>
                            Last assessed: {comp.lastAssessed} | Next review: {comp.nextReview} | Owner: {comp.owner}
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          <SectionChatWidget portalName={`${comp.framework.split('(')[0].trim()} Compliance`} />
                          <Button variant="outline" size="sm" className="gap-1">
                            <FileText className="w-3 h-3" /> Report
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Requirements Checklist */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
                          <ClipboardCheck className="w-4 h-4" />
                          Requirements Status
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                          {comp.requirements.map((req, idx) => (
                            <div key={idx} className={`p-3 rounded-lg border ${
                              req.status ? 'border-green-500/30 bg-green-950/10' : 'border-red-500/30 bg-red-950/10'
                            }`}>
                              <div className="flex items-start gap-2">
                                {req.status ? (
                                  <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                                ) : (
                                  <XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                                )}
                                <div>
                                  <p className="text-sm font-medium">{req.name} <RequiredMarker required={req.status} /></p>
                                  <p className="text-xs text-gray-400 mt-0.5">{req.description}</p>
                                                                  {req.evidence && (
                                    <p className="text-xs text-cyan-400 mt-1 flex items-center gap-1">
                                      <FileText className="w-3 h-3" /> {req.evidence}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Documents */}
                      {comp.documents.length > 0 && (
                        <ExpandableText 
                          title={`Documents (${comp.documents.length})`}
                          content={comp.documents.map(d => 
                            `[${d.type}] ${d.name}\nUploaded: ${d.uploaded} | Verified: ${d.verified ? '✓ Yes' : '✗ Pending'}`
                          ).join('\n\n')}
                        />
                      )}

                      {/* Findings */}
                      {comp.findings.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-gray-300 flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-yellow-400" />
                            Findings & Remediation
                          </h4>
                          {comp.findings.map((finding, idx) => (
                            <div key={idx} className={`p-3 rounded-lg border ${
                              finding.severity === 'CRITICAL' ? 'border-red-500/30 bg-red-950/10' :
                              finding.severity === 'HIGH' ? 'border-orange-500/30 bg-orange-950/10' :
                              'border-yellow-500/30 bg-yellow-950/10'
                            }`}>
                              <div className="flex items-center justify-between mb-1">
                                <Badge variant="outline" className={
                                  finding.severity === 'CRITICAL' ? 'border-red-500 text-red-400' :
                                  finding.severity === 'HIGH' ? 'border-orange-500 text-orange-400' :
                                  'border-yellow-500 text-yellow-400'
                                }>
                                  {finding.severity}
                                </Badge>
                                <span className="text-xs text-gray-500">Deadline: {finding.deadline}</span>
                              </div>
                              <p className="text-sm text-gray-300">{finding.description}</p>
                              <p className="text-xs text-cyan-400 mt-1">Remediation: {finding.remediation}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Notes */}
                      {comp.notes && (
                        <ExpandableText title="Notes" content={comp.notes} />
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </main>

        {/* ==================== MODALS ==================== */}

        {/* Supplier Detail Modal */}
        <Dialog open={!!selectedSupplier} onOpenChange={() => setSelectedSupplier(null)}>
          <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-700">
            {selectedSupplier && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-3">
                    <Building2 className="w-6 h-6 text-cyan-400" />
                    {selectedSupplier.companyName}
                    <RiskBadge level={selectedSupplier.riskLevel} />
                    <StatusBadge status={selectedSupplier.status} />
                  </DialogTitle>
                  <Description>{selectedSupplier.id} | {selectedSupplier.category}</Description>
                </DialogHeader>
                
                <div className="space-y-6 mt-4">
                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-3 bg-gray-800/50 rounded-lg">
                      <p className="text-xs text-gray-400">ESG Score</p>
                      <p className="text-xl font-bold text-green-400">{selectedSupplier.esgScore}</p>
                    </div>
                    <div className="p-3 bg-gray-800/50 rounded-lg">
                      <p className="text-xs text-gray-400">Delivery Perf.</p>
                      <p className="text-xl font-bold text-blue-400">{selectedSupplier.deliveryPerformance}%</p>
                    </div>
                    <div className="p-3 bg-gray-800/50 rounded-lg">
                      <p className="text-xs text-gray-400">Quality Metrics</p>
                      <p className="text-xl font-bold text-purple-400">{selectedSupplier.qualityMetrics}%</p>
                    </div>
                    <div className="p-3 bg-gray-800/50 rounded-lg">
                      <p className="text-xs text-gray-400">Risk Score</p>
                      <p className="text-xl font-bold text-red-400">{selectedSupplier.riskScore}</p>
                    </div>
                  </div>

                  {/* Company Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <h4 className="font-medium text-cyan-400 flex items-center gap-2">
                        <Building className="w-4 h-4" /> Company Information
                      </h4>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between py-1 border-b border-gray-800">
                          <span className="text-gray-400">Legal Entity Name <RequiredMarker required={true} /></span>
                          <span className="text-white">{selectedSupplier.legalEntityName}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-gray-800">
                          <span className="text-gray-400">Registration Number <RequiredMarker required={true} /></span>
                          <span className="text-white font-mono text-xs">{selectedSupplier.registrationNumber}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-gray-800">
                          <span className="text-gray-400">DUNS Number <RequiredMarker required={false} /></span>
                          <span className="text-white font-mono text-xs">{selectedSupplier.dunsNumber}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-gray-800">
                          <span className="text-gray-400">Tax ID <RequiredMarker required={true} /></span>
                          <span className="text-white font-mono text-xs">{selectedSupplier.taxId}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-gray-800">
                          <span className="text-gray-400">Founded Year <RequiredMarker required={false} /></span>
                          <span className="text-white">{selectedSupplier.foundedYear}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-gray-800">
                          <span className="text-gray-400">Employees <RequiredMarker required={false} /></span>
                          <span className="text-white">{selectedSupplier.employeeCount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-gray-800">
                          <span className="text-gray-400">Revenue <RequiredMarker required={false} /></span>
                          <span className="text-white">${(selectedSupplier.revenue / 1000000000).toFixed(2)}B</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-gray-800">
                          <span className="text-gray-400">Financial Rating <RequiredMarker required={true} /></span>
                          <span className="text-white font-bold">{selectedSupplier.financialRating}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium text-cyan-400 flex items-center gap-2">
                        <MapPin className="w-4 h-4" /> Location & Operations
                      </h4>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between py-1 border-b border-gray-800">
                          <span className="text-gray-400">Address <RequiredMarker required={true} /></span>
                          <span className="text-white text-right max-w-[200px]">{selectedSupplier.address}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-gray-800">
                          <span className="text-gray-400">City <RequiredMarker required={true} /></span>
                          <span className="text-white">{selectedSupplier.city}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-gray-800">
                          <span className="text-gray-400">State/Province <RequiredMarker required={false} /></span>
                          <span className="text-white">{selectedSupplier.stateProvince}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-gray-800">
                          <span className="text-gray-400">Postal Code <RequiredMarker required={true} /></span>
                          <span className="text-white">{selectedSupplier.postalCode}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-gray-800">
                          <span className="text-gray-400">Country <RequiredMarker required={true} /></span>
                          <span className="text-white">{selectedSupplier.country}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-gray-800">
                          <span className="text-gray-400">Region <RequiredMarker required={true} /></span>
                          <span className="text-white">{selectedSupplier.region}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-gray-800">
                          <span className="text-gray-400">Tier <RequiredMarker required={true} /></span>
                          <Badge variant="secondary">{selectedSupplier.tier}</Badge>
                        </div>
                        <div className="flex justify-between py-1 border-b border-gray-800">
                          <span className="text-gray-400">Category <RequiredMarker required={true} /></span>
                          <span className="text-white text-right max-w-[180px]">{selectedSupplier.category}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Products & Certifications */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-cyan-400 flex items-center gap-2 mb-2">
                        <Package className="w-4 h-4" /> Products <RequiredMarker required={true} />
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedSupplier.products.map(product => (
                          <Badge key={product} variant="secondary" className="bg-gray-800">{product}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-cyan-400 flex items-center gap-2 mb-2">
                        <Certificate className="w-4 h-4" /> Certifications <RequiredMarker required={false} />
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedSupplier.certifications.map(cert => (
                          <Badge key={cert} variant="outline" className="border-green-500/30 text-green-400">{cert}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Regulatory Compliance Status */}
                  <div>
                    <h4 className="font-medium text-cyan-400 flex items-center gap-2 mb-3">
                      <Gavel className="w-4 h-4" /> Regulatory Compliance Status
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        { name: 'UFLPA', status: selectedSupplier.uflpaStatus },
                        { name: 'EUDR', status: selectedSupplier.eudrStatus },
                        { name: 'CSDDD', status: selectedSupplier.csdddStatus },
                        { name: 'SOX', status: selectedSupplier.soxCompliant ? 'Compliant' : 'N/A' },
                        { name: 'GDPR', status: selectedSupplier.gdprCompliant ? 'Compliant' : 'Non-Compliant' },
                        { name: 'REACH', status: selectedSupplier.reachCompliant ? 'Compliant' : 'N/A' },
                      ].map(reg => (
                        <div key={reg.name} className="p-2 bg-gray-800/50 rounded text-center">
                          <p className="text-xs text-gray-400">{reg.name}</p>
                          <p className={`text-sm font-medium mt-1 ${
                            reg.status === 'Compliant' ? 'text-green-400' :
                            reg.status.includes('Non') || reg.status === 'High Risk' ? 'text-red-400' :
                            'text-yellow-400'
                          }`}>{reg.status}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Operational Metrics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: 'Delivery Performance', value: `${selectedSupplier.deliveryPerformance}%`, icon: Truck },
                      { label: 'Quality Metrics', value: `${selectedSupplier.qualityMetrics}%`, icon: ShieldCheck },
                      { label: 'Cost Competitiveness', value: `${selectedSupplier.costCompetitiveness}%`, icon: DollarSign },
                      { label: 'Innovation Score', value: `${selectedSupplier.innovationScore}`, icon: Lightbulb },
                      { label: 'Lead Time', value: `${selectedSupplier.leadTimeDays} days`, icon: Clock },
                      { label: 'MOQ', value: selectedSupplier.moq.toLocaleString(), icon: Package },
                      { label: 'Capacity Util.', value: `${selectedSupplier.capacityUtilization}%`, icon: Activity },
                      { label: 'Cyber Rating', value: selectedSupplier.cybersecurityRating, icon: Shield },
                    ].map(metric => (
                      <div key={metric.label} className="p-3 bg-gray-800/30 rounded-lg">
                        <div className="flex items-center gap-2 text-gray-400 mb-1">
                          <metric.icon className="w-3 h-3" />
                          <span className="text-xs">{metric.label}</span>
                        </div>
                        <p className="text-lg font-semibold">{metric.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Sustainability Metrics */}
                  <div>
                    <h4 className="font-medium text-cyan-400 flex items-center gap-2 mb-3">
                      <Leaf className="w-4 h-4" /> Sustainability & ESG
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="p-3 bg-gray-800/30 rounded-lg">
                        <p className="text-xs text-gray-400">Carbon Footprint</p>
                        <p className="text-lg font-semibold">{selectedSupplier.carbonFootprint.toLocaleString()} tCO2e</p>
                      </div>
                      <div className="p-3 bg-gray-800/30 rounded-lg">
                        <p className="text-xs text-gray-400">Water Usage</p>
                        <p className="text-lg font-semibold">{(selectedSupplier.waterUsage / 1000).toFixed(1)}M m³</p>
                      </div>
                      <div className="p-3 bg-gray-800/30 rounded-lg">
                        <p className="text-xs text-gray-400">Waste Reduction</p>
                        <p className="text-lg font-semibold text-green-400">{selectedSupplier.wasteReduction}%</p>
                      </div>
                      <div className="p-3 bg-gray-800/30 rounded-lg">
                        <p className="text-xs text-gray-400">D&I Score</p>
                        <p className="text-lg font-semibold">{selectedSupplier.diversityInclusion}%</p>
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div>
                    <h4 className="font-medium text-cyan-400 flex items-center gap-2 mb-3">
                      <Users className="w-4 h-4" /> Contact Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 p-2 bg-gray-800/30 rounded">
                          <User className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-xs text-gray-400">Primary Contact <RequiredMarker required={true} /></p>
                            <p className="text-white">{selectedSupplier.primaryContactName}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-gray-800/30 rounded">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-xs text-gray-400">Email <RequiredMarker required={true} /></p>
                            <p className="text-cyan-400">{selectedSupplier.primaryContactEmail}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-gray-800/30 rounded">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-xs text-gray-400">Phone <RequiredMarker required={false} /></p>
                            <p className="text-white">{selectedSupplier.primaryContactPhone}</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 p-2 bg-gray-800/30 rounded">
                          <User className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-xs text-gray-400">Secondary Contact <RequiredMarker required={false} /></p>
                            <p className="text-white">{selectedSupplier.secondaryContactName}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-gray-800/30 rounded">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-xs text-gray-400">Email <RequiredMarker required={false} /></p>
                            <p className="text-cyan-400">{selectedSupplier.secondaryContactEmail}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-gray-800/30 rounded">
                          <Globe2 className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-xs text-gray-400">Website <RequiredMarker required={false} /></p>
                            <p className="text-cyan-400">{selectedSupplier.website}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contract & Audit Info */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-3 bg-gray-800/30 rounded-lg">
                      <p className="text-xs text-gray-400">Last Audit <RequiredMarker required={true} /></p>
                      <p className="text-white">{selectedSupplier.lastAuditDate}</p>
                    </div>
                    <div className="p-3 bg-gray-800/30 rounded-lg">
                      <p className="text-xs text-gray-400">Next Audit <RequiredMarker required={true} /></p>
                      <p className="text-white">{selectedSupplier.nextAuditDate}</p>
                    </div>
                    <div className="p-3 bg-gray-800/30 rounded-lg">
                      <p className="text-xs text-gray-400">Contract Expiry <RequiredMarker required={true} /></p>
                      <p className="text-white">{selectedSupplier.contractExpiry}</p>
                    </div>
                    <div className="p-3 bg-gray-800/30 rounded-lg">
                      <p className="text-xs text-gray-400">Payment Terms <RequiredMarker required={false} /></p>
                      <p className="text-white">{selectedSupplier.paymentTerms}</p>
                    </div>
                  </div>

                  {/* Notes & Tags */}
                  <ExpandableText 
                    title="Internal Notes" 
                    content={selectedSupplier.notes || 'No internal notes available.'} 
                    defaultOpen={true}
                  />
                  
                  <div>
                    <h4 className="font-medium text-cyan-400 flex items-center gap-2 mb-2">
                      <Tags className="w-4 h-4" /> Tags
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedSupplier.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="bg-gray-800">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <DialogFooter className="gap-2">
                  <Button variant="outline" className="gap-1">
                    <Mail className="w-4 h-4" /> Email Contact
                  </Button>
                  <Button variant="outline" className="gap-1">
                    <MessageSquare className="w-4 h-4" /> Chat
                  </Button>
                  <Button className="bg-cyan-600 hover:bg-cyan-700 gap-1">
                    <Edit3 className="w-4 h-4" /> Edit Supplier
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* SHAP Explanation Modal */}
        <Dialog open={!!showShapModal} onOpenChange={() => setShowShapModal(null)}>
          <DialogContent className="sm:max-w-[600px] bg-gray-900 border-gray-700">
            {showShapModal && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-cyan-400" />
                    SHAP Feature Attribution
                  </DialogTitle>
                  <Description>
                    Understanding which factors drove this risk prediction
                  </Description>
                </DialogHeader>
                
                <div className="space-y-4">
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <h4 className="font-medium mb-1">{showShapModal.title}</h4>
                    <p className="text-sm text-gray-400">{showShapModal.supplier}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className={
                        showShapModal.severity === 'critical' ? 'border-red-500 text-red-400' : 'border-yellow-500 text-yellow-400'
                      }>
                        {showShapModal.severity.toUpperCase()}
                      </Badge>
                      <span className="text-sm text-gray-400">
                        Probability: {showShapModal.probability}%
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-3">Feature Importance (SHAP Values)</h4>
                    <div className="space-y-3">
                      {showShapModal.shapValues?.map((shap, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-300">{shap.feature}</span>
                            <span className="font-mono" style={{ color: shap.color }}>
                              {(shap.value * 100).toFixed(1)}%
                            </span>
                          </div>
                          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{
                                width: `${Math.abs(shap.value) * 100}%`,
                                backgroundColor: shap.color
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <ExpandableText 
                    title="What is SHAP?"
                    content={`SHAP (SHapley Additive exPlanations) is a game-theoretic approach to explain machine learning predictions.

HOW IT WORKS:
• Each feature's contribution is calculated based on its marginal impact across all possible feature combinations
• Values represent how much each feature pushed the prediction higher or lower from the base expectation
• Positive values (red/orange) increase risk; negative values (green/blue) decrease risk

INTERPRETING THIS ALERT:
${showShapModal.shapValues?.map(s => `• ${s.feature}: ${(s.value * 100).toFixed(1)}% contribution`).join('\n')}

RECOMMENDED ACTIONS:
${showShapModal.mitigation}`}
                  />

                  <div className="p-3 bg-cyan-950/20 border border-cyan-500/20 rounded-lg">
                    <p className="text-xs text-cyan-300 flex items-center gap-1">
                      <Info className="w-3 h-3" />
                      SHAP values help explain individual predictions. For aggregate patterns, use the Risk Intelligence dashboard.
                    </p>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Footer */}
        <footer className="mt-12 border-t border-gray-800/50 py-6">
          <div className="max-w-[1800px] mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-cyan-400" />
              <span>Supply Chain Command Center v2.0</span>
            </div>
            <div className="flex items-center gap-4">
              <span>Data refreshed: {new Date().toLocaleString()}</span>
              <span>|</span>
              <Button variant="ghost" size="sm" className="text-gray-400 gap-1">
                <Mail className="w-3 h-3" /> support@commandcenter.ai
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 gap-1">
                <MessageCircle className="w-3 h-3" /> Help
              </Button>
            </div>
          </div>
        </footer>
      </div>
      <Toaster />
    </TooltipProvider>
  )
}

// Missing import alias
const Lightbulb = Zap
const Description = CardDescription
const Tags = Tag