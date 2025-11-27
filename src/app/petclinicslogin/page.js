'use client'

import React, { useState, useEffect } from 'react'
import { 
  Building2, Stethoscope, Zap, BarChart3, Calendar, Truck, ShieldCheck, 
  ClipboardList, AlertCircle, ShoppingCart, Activity, Syringe, Monitor, 
  MessageSquare, Download, Users, Globe, BookOpen, ChevronLeft, ChevronRight,
  CheckCircle, Clock, Star, MapPin, LayoutList, Heart, PawPrint, LogOut,
  Settings, Bell, FileText, TrendingUp, DollarSign, Users as UsersIcon, Book, X, Search, Microscope, RefreshCw, Layers, SlidersHorizontal, User, Tag, Package
} from 'lucide-react'

// === HARDCODED DEMO DATA ===
const INDIAN_LANGUAGES = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  { code: 'mr', name: 'Marathi', native: 'মারাঠী' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { code: 'ur', name: 'اردو', native: 'اردو' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
  { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ' },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
  { code: 'as', name: 'Assamese', native: 'অসমীয়া' },
  { code: 'brx', name: 'Bodo', native: 'बड़ो' },
  { code: 'doi', name: 'Dogri', native: 'डोगरी' },
  { code: 'gom', name: 'Konkani', native: 'कोंकणी' },
  { code: 'ks', name: 'Kashmiri', native: 'کأشُر' },
  { code: 'mai', name: 'Maithili', native: 'मैथिली' },
  { code: 'mni', name: 'Manipuri', native: 'মৈতৈলোন্' },
  { code: 'ne', name: 'Nepali', native: 'नेपाली' },
  { code: 'sa', name: 'Sanskrit', native: 'সংस्कृतम्' },
  { code: 'sat', name: 'Santali', native: 'ᱥᱟᱱᱛᱟᱲᱤ' }
]

const CLINIC_DATA = {
  name: "PawCare Clinic - Mumbai",
  clinicId: "CLN-45678",
  doctors: 5,
  activePets: 1247,
  todayRevenue: "₹42,500",
  sonoSmartScans: 23,
  remoteVans: 2
}

// === NEW PROFESSIONAL ALERTS DATA ===
const PROFESSIONAL_ALERTS = [
  // PET LEVEL ALERTS
  {
    id: 101, type: 'pet', level: 'Pet', category: 'Health/Vaccine',
    title: 'Vaccine Due: Max (Labrador)', severity: 'high',
    message: 'Rabies booster due in 7 days. Owner notified via SMS/App.',
    impact: 'High missed revenue potential (₹1,500) and critical compliance risk.',
    icon: Syringe, color: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-500'
  },
  {
    id: 102, type: 'pet', level: 'Pet', category: 'Appointment',
    title: 'Check-in Reminder: Luna (Cat)', severity: 'medium',
    message: 'Follow-up appointment in 15 minutes. Confirm arrival with owner.',
    impact: 'Medium scheduling risk, potential queue disruption.',
    icon: Clock, color: 'text-amber-600', bgColor: 'bg-amber-50', borderColor: 'border-amber-500'
  },
  {
    id: 103, type: 'pet', level: 'Pet', category: 'Diagnostics',
    title: 'Report Ready: SonoSmart USG for Gauri (Cow)', severity: 'low',
    message: 'AI generated report on Liver Scan ready for doctor review (Dr. Anya).',
    impact: 'Low, but required to finalize patient treatment plan.',
    icon: Microscope, color: 'text-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-500'
  },
  {
    id: 104, type: 'pet', level: 'Pet', category: 'Critical Health',
    title: 'CRITICAL PREDICTION: Max (Dog)', severity: 'critical',
    message: 'SonoSmart AI predicts moderate Canine Parvovirus risk (68% confidence). Isolate pet immediately.',
    impact: 'Immediate life-safety and cross-contamination risk. Requires isolation protocol activation.',
    icon: AlertCircle, color: 'text-rose-700', bgColor: 'bg-rose-100', borderColor: 'border-rose-700'
  },
  // STAFF / CLINIC LEVEL ALERTS
  {
    id: 201, type: 'staff', level: 'Staff', category: 'Inventory',
    title: 'Low Stock: Rabies Vaccine', severity: 'high',
    message: 'Only 35 units left (Min Stock: 50). Auto-reorder initiated.',
    impact: 'High risk of appointment cancellation and revenue loss this week.',
    icon: ShoppingCart, color: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-500'
  },
  {
    id: 202, type: 'staff', level: 'Staff', category: 'Inventory',
    title: 'Low Consumable: SonoSmart Gel', severity: 'medium',
    message: '12 units remaining. Projected to last 8 days.',
    impact: 'Medium risk of diagnostic service delay by end of week.',
    icon: Layers, color: 'text-amber-600', bgColor: 'bg-amber-50', borderColor: 'border-amber-500'
  },
  {
    id: 203, type: 'staff', level: 'Staff', category: 'Logistics',
    title: 'Home-Visit: Tech Ravi En Route', severity: 'low',
    message: 'Technician departed for Andheri, ETA 30 min. Owner tracking link sent.',
    impact: 'Low, informs staff for client communication and scheduling next stops.',
    icon: Truck, color: 'text-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-500'
  },
  {
    id: 204, type: 'staff', level: 'Staff', category: 'Logistics',
    title: 'Remote Van Arrival Time', severity: 'medium',
    message: 'Van-002 expected back at clinic in 15 minutes for resupply and cleaning.',
    impact: 'Medium coordination impact for the loading/unloading and hygiene teams.',
    icon: MapPin, color: 'text-amber-600', bgColor: 'bg-amber-50', borderColor: 'border-amber-500'
  },
  // PLATFORM / TRENDING ALERTS
  {
    id: 301, type: 'platform', level: 'Clinic', category: 'Compliance',
    title: 'New National Rabies Protocol', severity: 'medium',
    message: 'Central platform update: New guidelines for rabies certificate issuance published today.',
    impact: 'Requires immediate doctor training/familiarization with new compliance rule.',
    icon: ShieldCheck, color: 'text-indigo-600', bgColor: 'bg-indigo-50', borderColor: 'border-indigo-500'
  },
  {
    id: 302, type: 'platform', level: 'Clinic', category: 'Trending',
    title: 'Regional: Feline Calicivirus Spike', severity: 'high',
    message: 'High occurrence rate detected in neighboring districts. Review cleaning protocols.',
    impact: 'High infection risk. Requires operational pivot (quarantine, sanitation upgrades).',
    icon: TrendingUp, color: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-500'
  },
];

// === DETAILED INSIGHTS DATA ===
const INSIGHTS_DATA = {
  // 1. Daily / Monthly / Yearly Metrics (High-Level)
  metrics: [
    { name: "Total Consultations", daily: 47, monthly: 1247, yearly: 15000, trend: "+12%" },
    { name: "Total Treatments", daily: 32, monthly: 890, yearly: 10500, trend: "+8%" },
    { name: "Monthly Revenue (₹)", current: '4.5L', predicted: '5.1L', lastMonth: '4.1L', trend: "+10%" },
    { name: "Walk-ins vs. Online (%)", walkin: 60, online: 40, trend: "-5% Walk-in" },
    { name: "Repeat Pet Parents (%)", repeat: 78, new: 22, trend: "+2% Repeat" },
  ],
  // 2. Diagnostics Breakdown (Current Focus)
  diagnostics: {
    totalScansMonthly: 540,
    sonoSmartUsage: 42, // % of diagnostics using SonoSmart
    earlyDetectionImpact: "Saved 7 high-risk pet lives last quarter.",
    breakdown: [
      { type: 'SonoSmart USG', count: 180, growth: '+25%' },
      { type: 'SonoSmart X-Ray', count: 150, growth: '+15%' },
      { type: 'Lab/Blood Tests', count: 210, growth: '-5%' },
    ],
  },
  // 3. Performance Analysis
  performance: {
    doctor: [
      { name: 'Dr. Anya', utilization: '92%', treatments: 320, efficiency: 95, color: 'blue' },
      { name: 'Dr. Ben', utilization: '88%', treatments: 280, efficiency: 88, color: 'emerald' },
      { name: 'Dr. Maya', utilization: '75%', treatments: 150, efficiency: 70, color: 'pink' },
    ],
    service: [
      { name: 'Vaccination', revenueShare: '35%', growth: '+10%', color: 'indigo' },
      { name: 'Surgery (Minor)', revenueShare: '25%', growth: '+5%', color: 'rose' },
      { name: 'Preventive Care', revenueShare: '20%', growth: '+20%', color: 'amber' },
    ],
  },
  // 4. Health Trend Analysis & Forecasting
  healthTrends: [
    { species: 'Dog', breed: 'Labrador', condition: 'Hip Dysplasia Risk', detection: 'Early (SonoSmart)', status: 'Monitored', trend: 'Stable' },
    { species: 'Cat', breed: 'Siamese', condition: 'Renal Issues', detection: 'Late (Lab)', status: 'Action Required', trend: 'Increasing' },
  ],
  inventory: {
    lowStockItems: 3,
    highConsumption: 'Amoxicillin (500mg)',
    forecastAccuracy: '95.5%',
  }
};

// === NEW SONOSMART DETAILED DATA ===
const SONOSMART_DETAIL_DATA = {
    intakeProcess: [
        { step: 'Clinical Intake (Vitals, Symptoms)', time: '3 min', efficiency: '99%', status: 'Complete' },
        { step: 'Imaging Acquisition (SonoSmart Scan)', time: '5 min', efficiency: '95%', status: 'In Progress' },
        { step: 'AI Prediction & Scoring', time: '1 min', efficiency: '98%', status: 'Pending' },
        { step: 'Doctor Review & Final Report', time: '10 min', efficiency: '90%', status: 'Pending' },
    ],
    kpis: [
        { metric: 'Avg. Scan Time (Clinical KPI)', value: '5:15 min', target: 'under 6:00 min', trend: 'down', color: 'emerald' },
        { metric: 'First-Pass Accuracy (Report Quality)', value: '96.2%', target: '95%', trend: 'up', color: 'blue' },
        { metric: 'AI Confidence Score (Report Quality)', value: '88%', target: '85%', trend: 'up', color: 'indigo' },
        { metric: 'Time to Report (Operational KPI)', value: '18 min', target: 'under 20 min', trend: 'down', color: 'emerald' },
        { metric: 'Kit Downtime (Operational KPI)', value: '1.2%', target: 'under 2%', trend: 'down', color: 'blue' },
        { metric: 'False Positive Rate (Clinical KPI)', value: '3.1%', target: 'under 4%', trend: 'down', color: 'indigo' },
    ],
    predictionFocus: {
        currentPet: 'Luna (Cat)',
        prediction: 'Moderate Respiratory Distress (75% confidence)',
        status: 'Action Required',
        priority: 'High'
    }
}

// === NEW BOOKING DATA (ENHANCED with Fees/Duration/Wait Time) ===
const BOOKING_DATA = {
  queue: {
    token: 'A-456',
    waitingTime: '8 min',
    petsInQueue: 4,
    liveDoctors: 4,
    nextPet: 'Ginger (Pomeranian)',
    nextDoctor: 'Dr. Anya',
  },
  specializations: ['General Practice', 'Orthopedics', 'Cardiology', 'Behavioral Therapy', 'Preventive Care'],
  doctors: [
    { name: 'Dr. Anya', specialization: 'Cardiology', availability: 'Available', fee: '₹800', color: 'blue' },
    { name: 'Dr. Ben', specialization: 'General Practice', availability: 'In Consultation (10 min wait)', fee: '₹750', color: 'emerald' },
    { name: 'Dr. Maya', specialization: 'Orthopedics', availability: 'Busy (Surgery)', fee: '₹1200', color: 'red' },
  ],
  // Detailed service list for dynamic slot booking
  services: {
    Diagnostics: [
        { name: 'SonoSmart Imaging', fee: 1800, duration: 30, wait: '15 min' },
        { name: 'X-Ray', fee: 1200, duration: 20, wait: '5 min' },
        { name: 'USG Scan', fee: 1500, duration: 30, wait: '10 min' },
        { name: 'Lab Test', fee: 800, duration: 10, wait: '5 min' },
    ],
    Treatments: [
        { name: 'Surgical Prep (Minor)', fee: 2500, duration: 45, wait: '30 min' },
        { name: 'Injections/Medication', fee: 500, duration: 15, wait: '5 min' },
        { name: 'Rehabilitation Session', fee: 1500, duration: 60, wait: '20 min' },
    ],
    Wellness: [
        { name: 'Grooming (Premium)', fee: 2000, duration: 60, wait: '45 min' },
        { name: 'Vaccination Drive', fee: 1000, duration: 15, wait: '5 min' },
        { name: 'Counselling Session', fee: 1800, duration: 45, wait: '15 min' },
    ],
    Remote: [
        { name: 'Home Care Visit', fee: 1200, duration: 90, wait: '2 hours' },
        { name: 'Remote Van Appointment', fee: 800, duration: 45, wait: '1 hour' },
    ],
    Doctor: [
        { name: 'General Consultation', fee: 750, duration: 20, wait: '5 min' },
        { name: 'Specialist Consultation', fee: 1200, duration: 30, wait: '10 min' },
    ]
  }
};

// === GLOBAL INVENTORY DATA (redefined for clarity/safety) ===
const INVENTORY_DATA = [
    {
        name: "Amoxicillin (500mg)",
        category: "Medicine",
        available: 450,
        consumedDaily: 15,
        predicted15Days: 225,
        expiry: "2026-03-01",
        refillNeeded: false,
        minStock: 100
    },
    {
        name: "Rabies Vaccine",
        category: "Vaccine",
        available: 35,
        consumedDaily: 4,
        predicted15Days: 60,
        expiry: "2025-12-31",
        refillNeeded: true,
        minStock: 50
    },
    {
        name: "SonoSmart Gel",
        category: "Diagnostic",
        available: 12,
        consumedDaily: 1.5,
        predicted15Days: 22.5,
        expiry: "2026-06-15",
        refillNeeded: true,
        minStock: 25
    },
    {
        name: "Surgical Sutures (Pack)",
        category: "Service Consumable",
        available: 80,
        consumedDaily: 1,
        predicted15Days: 15,
        expiry: "2027-01-01",
        refillNeeded: false,
        minStock: 50
    },
];

// === NEW CATALOG DATA (Used in Management Modal) ===
const CATALOG_DATA = {
    clinicStaff: [
        { id: 1, name: 'Dr. Anya Sharma', specialization: 'Cardiology', fee: 800, email: 'anya@pjc360.com', role: 'Doctor' },
        { id: 2, name: 'Dr. Ben Singh', specialization: 'General Practice', fee: 750, email: 'ben@pjc360.com', role: 'Doctor' },
        { id: 3, name: 'Tech Ravi Kumar', specialization: 'Diagnostics', fee: 0, email: 'ravi@pjc360.com', role: 'Technician' },
    ],
    serviceFees: [
        { name: 'General Consultation', fee: 700, duration: '20 min', category: 'Consulting' },
        { name: 'SonoSmart USG', fee: 1500, duration: '30 min', category: 'Diagnostics' },
        { name: 'Premium Grooming', fee: 2000, duration: '60 min', category: 'Grooming' },
        { name: 'Behavioral Session (45min)', fee: 1800, duration: '45 min', category: 'Counselling' },
    ],
    customPackages: [
        { name: 'Annual Wellness Gold', price: 6500, items: ['Annual Vaccine', '2x Blood Panel', '1x SonoSmart X-Ray'], active: true },
        { name: 'Senior Pet Care', price: 9000, items: ['Cardiology Check', 'Joint Supplements (6mo)', 'Monthly Grooming'], active: true },
    ],
    // FIX: Ensure inventoryStocks is correctly populated from the global INVENTORY_DATA
    inventoryStocks: INVENTORY_DATA || [], 
    kitConfigs: [
        { name: 'SonoSmart Kit 1', location: 'Clinic Floor 1', softwareVersion: '2.4.1', calibration: '2025-11-01', status: 'Optimal' },
        { name: 'SonoSmart Kit 2', location: 'Remote Van 001', softwareVersion: '2.3.5', calibration: '2025-10-15', status: 'Update Pending' },
    ],
    scheduling: {
        defaultSlotMinutes: 20,
        walkinCounterSlots: 3,
        remoteVanCapacity: 2,
        clinicHours: '09:00 - 20:00',
    }
}

// === NEW MARKETPLACE DATA ===
const MARKETPLACE_DATA = {
    tabs: [
        { key: 'CoreServices', label: 'Core Services', icon: Stethoscope },
        { key: 'Diagnostics', label: 'Diagnostics & Kits', icon: Zap },
        { key: 'Wellness', label: 'Wellness & Grooming', icon: Heart },
        { key: 'IoT', label: 'IoT & Monitors', icon: Monitor },
    ],
    products: [
        { 
            id: 1, type: 'CoreServices', name: 'Premium Orthopedic Consultation', 
            desc: '45-minute consultation with specialist, including initial mobility assessment.',
            price: 1800, discount: 0, trending: 'High Demand', availability: 'Limited', icon: Stethoscope
        },
        { 
            id: 2, type: 'CoreServices', name: 'Annual Vaccination Pack (Dog)', 
            desc: 'All core annual vaccines (Rabies, DHLPP). Compliance guaranteed.',
            price: 3500, discount: 500, trending: 'Essential', availability: 'In Stock', icon: Syringe
        },
        { 
            id: 3, type: 'Diagnostics', name: 'Comprehensive Blood Panel Package', 
            desc: 'Full CBC + Organ Function test. Home sampling kit included.',
            price: 4200, discount: 700, trending: 'New Offer', availability: 'In Stock', icon: Microscope
        },
        { 
            id: 4, type: 'Diagnostics', name: 'SonoSmart X-Ray Session', 
            desc: 'AI-assisted chest or joint imaging with instant report generation.',
            price: 2500, discount: 0, trending: 'Recommended', availability: 'High Capacity', icon: Zap
        },
        { 
            id: 5, type: 'Diagnostics', name: 'Home Sampling Kit (Urine/Feces)', 
            desc: 'Sterile kit for remote sample collection. Prepaid courier included.',
            price: 450, discount: 0, trending: 'Consumable', availability: 'In Stock', icon: Package
        },
        { 
            id: 6, type: 'Wellness', name: 'De-Shedding Grooming Session', 
            desc: 'Full bath, hair trim, nail clipping, and specialized de-shedding treatment.',
            price: 2200, discount: 0, trending: 'Seasonal Peak', availability: 'Bookable', icon: PawPrint
        },
        { 
            id: 7, type: 'IoT', name: 'Smart Heart Rate Monitor Collar', 
            desc: '24/7 cardiac monitoring for senior/at-risk pets. App integration.',
            price: 8999, discount: 1000, trending: 'New Product', availability: 'Low Stock', icon: Monitor
        },
    ]
}


const QUICK_STATS = [
  { label: 'Today Consults', value: '47', trend: '+12%', icon: Stethoscope },
  { label: 'SonoSmart Scans', value: '23', trend: '+45%', icon: Zap },
  { label: 'Revenue Today', value: '₹42.5K', trend: '+28%', icon: DollarSign },
  { label: 'Queue Waiting', value: '12 min', trend: '-3 min', icon: Clock }
]

const KNOWLEDGE_BASE_DATA = {
  title: "Knowledge Base for Pet Parents",
  trendingContent: [
    { title: "Seasonal Ticks & Fleas Prevention Guide", category: "Alerts", level: "Generic", icon: AlertCircle, trending: true },
    { title: "Understanding Dog Food Labels (Video)", category: "Nutrition", level: "Pet Level", icon: Monitor, trending: true },
    { title: "Rabies Awareness Day FAQ", category: "FAQ", level: "Generic", icon: MessageSquare, trending: false },
    { title: "Post-Surgery Care for Ortho Pets", category: "Guides", level: "Pet Level", icon: Heart, trending: false },
    { title: "Grooming Tips for Long-Haired Breeds", category: "Guides", level: "Generic", icon: PawPrint, trending: true },
  ],
  stats: [
    { label: 'Video Lessons', value: 12, color: 'blue' },
    { label: 'Blog Posts', value: 45, color: 'emerald' },
    { label: 'FAQ Topics', value: 78, color: 'pink' },
  ]
}

const RECOMMENDATION_ENGINE_DATA = {
  title: "AI-Powered Recommendation Engine",
  features: [
    { name: "Treatment Plans", icon: Syringe, desc: "Suggested plans based on diagnosis.", result: "Antibiotic course + 2 week checkup" },
    { name: "Preventive Care Packages", icon: ShieldCheck, desc: "Vaccine and wellness bundles.", result: "Annual Wellness Gold Package" },
    { name: "Grooming Bundles", icon: PawPrint, desc: "Seasonal and breed-specific grooming.", result: "Long-Hair Premium Grooming Bundle (20% off)" },
    { name: "Diet & Supplement Plans", icon: Activity, desc: "Personalized nutrition regimes.", result: "High-Protein Diet + Calcium Supplement" },
  ],
  stats: [
    { label: "Packages Created", value: 5, trend: "+1 new", color: 'pink' },
    { label: "Predicted Revenue", value: '₹1.2L', trend: '+15%', color: 'blue' }
  ]
};

const PET_REPOSITORY_DATA = {
    // Data for the pet "Max (Dog)" from Today's Schedule
    petName: "Max (Dog)",
    owner: "Mr. Rakesh Singh",
    breed: "Labrador Retriever",
    age: "4 years",
    lastVisit: "2025-10-15",
    summary: "Max presents with acute fever and low energy. Suspected viral infection. Needs immediate treatment and diagnostics.",
    vitals: {
        temperature: '103.5°F',
        heartRate: '120 bpm',
        weight: '30 kg',
        symptoms: ['Lethargy', 'Anorexia', 'Fever']
    },
    records: [
        { type: 'e-Prescription', date: '2025-10-15', title: 'Antibiotic Course (300mg)', doctor: 'Dr. Anya' },
        { type: 'SonoSmart X-Ray', date: '2025-10-15', title: 'Chest Scan (Normal)', doctor: 'Dr. Anya' },
        { type: 'Lab Report', date: '2025-10-10', title: 'Complete Blood Blood (CBC)', doctor: 'Dr. Anya' },
        { type: 'External Document', date: '2025-08-01', title: 'Vaccination Certificate (2025)', doctor: 'External' },
        { type: 'Treatment Summary', date: '2024-12-01', title: 'Stomach Flu Recovery', doctor: 'Dr. Ben' },
        { type: 'Doctor Notes', date: '2024-12-01', title: 'Hydration Therapy Summary', doctor: 'Dr. Ben' },
    ],
    vaccinationDue: 'Rabies Booster (2026-01-01)',
};

const TODAY_SCHEDULE = [
    { id: 1, time: '09:00', type: 'Consult', doctor: 'Dr. Anya', pet: 'Max (Dog)', petData: PET_REPOSITORY_DATA },
    { id: 2, time: '10:30', type: 'SonoSmart', doctor: 'Dr. Ben', pet: 'Luna (Cat)', petData: { ...PET_REPOSITORY_DATA, id: 2, petName: 'Luna (Cat)', breed: 'Siamese', age: '2 years', summary: 'Luna has a persistent cough, needing chest X-ray and USG scan.', vitals: { temperature: '101.5°F', heartRate: '160 bpm', weight: '4 kg', symptoms: ['Coughing', 'Wheezing'] } } },
    { id: 3, time: '14:00', type: 'Surgery', doctor: 'Dr. Maya', pet: 'Gauri (Cow)', petData: { ...PET_REPOSITORY_DATA, id: 3, petName: 'Gauri (Cow)', breed: 'Holstein', age: '6 years', summary: 'Scheduled orthopedic surgery. Pre-op diagnostics complete.', vitals: { temperature: '102.5°F', heartRate: '70 bpm', weight: '550 kg', symptoms: ['Limping', 'Swollen joint'] } } }
];

const REMOTE_VAN_DATA = [
    {
        vanId: "VAN-001",
        status: "In Transit",
        assigned: "Dr. Ben / Tech: Ravi",
        currentRoute: "Andheri, Mumbai",
        stopsToday: 5,
        completedStops: 2,
        nextStop: "Home Care Visit (14:30)",
        performance: "95%"
    },
    {
        vanId: "VAN-002",
        status: "Available",
        assigned: "None",
        currentRoute: "Depot: Ready for deployment",
        stopsToday: 0,
        completedStops: 0,
        nextStop: "N/A",
        performance: "N/A"
    },
];

// --- Component 1: Landing Page (Simplified for Navigation) ---
const LandingPage = ({ onLogin }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-pink-50 font-sans antialiased p-4">
      <div className="relative z-10 max-w-lg w-full text-center p-12 bg-white/95 backdrop-blur-md shadow-2xl rounded-3xl border-4 border-blue-200/70">
        <Building2 className="w-20 h-20 mx-auto mb-8 text-blue-600 shadow-2xl" />
        <h1 className="text-5xl font-black tracking-tighter text-gray-900 mb-4 bg-gradient-to-r from-gray-900 via-blue-900 to-pink-600 bg-clip-text">
          PetJoyClinics<span className="text-pink-600">360</span>
        </h1>
        <p className="text-xl font-semibold text-gray-700 mb-8">
          The Complete Operating System for Veterinary Clinics
        </p>
        <p className="text-lg text-blue-800 font-bold mb-10">
          Demo Login: Access the Live Dashboard
        </p>
        <button
          onClick={onLogin}
          className="w-full px-12 py-5 bg-gradient-to-r from-blue-600 to-pink-600 text-white text-xl font-black rounded-3xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
        >
          Access Dashboard → 
        </button>
        <div className="mt-8 text-sm text-gray-500">
          Need help? Contact support 24/7.
        </div>
      </div>
    </div>
  )
}

// --- Component 2: Recommendation Playground Modal ---
const RecommendationPlaygroundModal = ({ onClose }) => {
    const conditions = [
        { name: "Fever + Low Energy", condition: "Viral Infection Risk", risk: 'High', revenue: '₹4,500', plan: RECOMMENDATION_ENGINE_DATA.features[0].result },
        { name: "Weight Loss + Hip Click", condition: "Early Orthopedic Degeneration", risk: 'Medium', revenue: '₹8,200', plan: RECOMMENDATION_ENGINE_DATA.features[3].result },
        { name: "Routine Annual Checkup", condition: "Prevention Opportunity", risk: 'Low', revenue: '₹6,000', plan: RECOMMENDATION_ENGINE_DATA.features[1].result },
    ];
    const [selectedCondition, setSelectedCondition] = useState(conditions[0]);

    return (
        <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
            <div className="bg-white rounded-4xl shadow-4xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transform scale-100 transition-all duration-300">
                
                {/* Header */}
                <div className="p-8 border-b border-blue-100 flex items-center justify-between sticky top-0 bg-white rounded-t-4xl">
                    <h3 className="text-3xl font-black text-gray-900 flex items-center space-x-3">
                        <Zap className="w-8 h-8 text-rose-600" />
                        <span>AI Recommendation Playground</span>
                    </h3>
                    <button onClick={onClose} className="p-3 rounded-full bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-600 transition-all">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-8 grid lg:grid-cols-3 gap-8">
                    
                    {/* Left: Input */}
                    <div className="lg:col-span-1 space-y-4">
                        <h4 className="font-bold text-xl text-blue-700">Simulate Condition</h4>
                        <select 
                            className="w-full p-4 border-4 border-blue-200 rounded-2xl bg-white text-lg font-semibold shadow-inner focus:ring-2 focus:ring-blue-500 transition-all"
                            value={selectedCondition.name}
                            onChange={(e) => setSelectedCondition(conditions.find(c => c.name === e.target.value))}
                        >
                            {conditions.map((c, idx) => (
                                <option key={idx} value={c.name}>{c.name}</option>
                            ))}
                        </select>
                        <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm">
                            <div className="font-bold text-gray-700 mb-1">Simulated SonoSmart Diagnosis:</div>
                            <p className="text-gray-600">{selectedCondition.condition}</p>
                        </div>
                    </div>

                    {/* Right: Output */}
                    <div className="lg:col-span-2 space-y-6">
                        <h4 className="font-bold text-xl text-rose-700">AI Suggested Plan</h4>
                        
                        {/* Summary Metrics */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className={`p-4 rounded-xl shadow-lg border-2 border-dashed ${selectedCondition.risk === 'High' ? 'bg-red-100 border-red-500' : selectedCondition.risk === 'Medium' ? 'bg-amber-100 border-amber-500' : 'bg-emerald-100 border-emerald-500'}`}>
                                <AlertCircle className={`w-6 h-6 mb-1 ${selectedCondition.risk === 'High' ? 'text-red-700' : selectedCondition.risk === 'Medium' ? 'text-amber-700' : 'text-emerald-700'}`} />
                                <div className="text-sm text-gray-600">Risk Alert</div>
                                <div className="text-xl font-black">{selectedCondition.risk}</div>
                            </div>
                            <div className="p-4 rounded-xl shadow-lg border-2 border-dashed border-pink-500 bg-pink-100">
                                <DollarSign className="w-6 h-6 mb-1 text-pink-700" />
                                <div className="text-sm text-gray-600">Predicted Revenue</div>
                                <div className="text-xl font-black">{selectedCondition.revenue}</div>
                            </div>
                            <div className="p-4 rounded-xl shadow-lg border-2 border-dashed border-blue-500 bg-blue-100">
                                <TrendingUp className="w-6 h-6 mb-1 text-blue-700" />
                                <div className="text-sm text-gray-600">Upsell Rate</div>
                                <div className="text-xl font-black">75%</div>
                            </div>
                        </div>

                        {/* Suggested Package */}
                        <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border-4 border-indigo-200 shadow-xl">
                            <h5 className="font-bold text-lg text-indigo-800 flex items-center space-x-2 mb-2">
                                <Syringe className="w-5 h-5" />
                                <span>Suggested Package/Plan:</span>
                            </h5>
                            <p className="text-2xl font-black text-gray-900 leading-tight">{selectedCondition.plan}</p>
                            <p className="text-sm text-gray-600 mt-2">AI based on history, SonoSmart data, and common clinic practices.</p>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end pt-4 space-x-4">
                            <button className="px-6 py-3 bg-gray-200 text-gray-800 font-bold rounded-2xl hover:bg-gray-300 transition-all">
                                Customise Plan
                            </button>
                            <button className="px-6 py-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all">
                                Attach to Pet & Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Component 3: Pet Consultation Modal (The Pet-Level OS) ---
const PetConsultationModal = ({ petData, onClose }) => {
    const [sonoStatus, setSonoStatus] = useState('Idle'); // Idle, Scanning, Ready
    const [sonoType, setSonoType] = useState('X-Ray'); // Corrected setter name

    const handleSonoScan = () => {
        setSonoStatus('Scanning');
        setTimeout(() => setSonoStatus('Ready'), 3000); // Simulate 3s scan
    };

    return (
        <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
            <div className="bg-white rounded-4xl shadow-4xl max-w-6xl w-full max-h-[95vh] overflow-y-auto transform scale-100 transition-all duration-300">
                
                {/* Header */}
                <div className="p-8 border-b border-blue-100 flex items-center justify-between sticky top-0 bg-white rounded-t-4xl">
                    <h3 className="text-3xl font-black text-gray-900 flex items-center space-x-3">
                        <PawPrint className="w-8 h-8 text-blue-600" />
                        <span>{petData.petName} | Pet Consultation OS</span>
                    </h3>
                    <button onClick={onClose} className="p-3 rounded-full bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-600 transition-all">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-8 grid lg:grid-cols-12 gap-8">
                    {/* Column 1: Pet Summary & Vitals (3/12) */}
                    <div className="lg:col-span-3 space-y-6">
                        <div className="p-6 bg-blue-50 rounded-3xl border border-blue-200 shadow-lg">
                            <h4 className="text-xl font-black text-blue-800 mb-4">Pet Details</h4>
                            <p className="text-sm text-gray-600"><span className="font-bold">Owner:</span> {petData.owner}</p>
                            <p className="text-sm text-gray-600"><span className="font-bold">Breed/Age:</span> {petData.breed} ({petData.age})</p>
                            <div className="mt-4 pt-4 border-t border-blue-100">
                                <h5 className="font-bold text-gray-700 mb-2 flex items-center space-x-2"><Heart className="w-4 h-4 text-red-500"/>Vitals</h5>
                                <p className="text-sm"><span className="font-bold">Temp:</span> {petData.vitals.temperature}</p>
                                <p className="text-sm"><span className="font-bold">HR:</span> {petData.vitals.heartRate}</p>
                                <p className="text-sm"><span className="font-bold">Weight:</span> {petData.vitals.weight}</p>
                                <p className="text-xs mt-3 text-red-500 font-bold">Vaccination Due: {petData.vaccinationDue}</p>
                            </div>
                        </div>

                        {/* Quick Access to Repository */}
                        <div className="p-6 bg-white rounded-3xl border border-gray-200 shadow-lg">
                            <h4 className="text-xl font-black text-gray-800 mb-4">Repo Access</h4>
                            <p className="text-sm text-gray-600 mb-4">View complete medical history.</p>
                            <button className="w-full py-3 bg-indigo-500 text-white font-bold rounded-2xl hover:bg-indigo-600 transition-all flex items-center justify-center space-x-2">
                                <LayoutList className="w-5 h-5" />
                                <span>View {petData.records.length} Records</span>
                            </button>
                        </div>
                    </div>

                    {/* Column 2: Consultation & Diagnostics (9/12) */}
                    <div className="lg:col-span-9 space-y-6">
                        <div className="p-6 bg-gradient-to-r from-pink-50 to-rose-50 rounded-3xl border border-pink-200 shadow-xl">
                            <h4 className="text-xl font-black text-rose-800 mb-4 flex items-center space-x-2"><Syringe className="w-6 h-6"/>e-Prescription & Consultation Kit</h4>
                            <p className="text-sm text-gray-600 mb-4">{petData.summary}</p>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <textarea 
                                        rows="3" 
                                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-blue-500" 
                                        placeholder="Doctor Notes / Prescription Text..."
                                    ></textarea>
                                </div>
                                <div className="space-y-3">
                                    <button className="w-full py-3 bg-rose-600 text-white font-bold rounded-xl hover:bg-rose-700 transition-all flex items-center justify-center space-x-2">
                                        <MessageSquare className="w-5 h-5" />
                                        <span>Start Text Consultation</span>
                                    </button>
                                    <button className="w-full py-3 bg-yellow-600 text-white font-bold rounded-xl hover:bg-yellow-700 transition-all flex items-center justify-center space-x-2">
                                        <Monitor className="w-5 h-5" />
                                        <span>Start Voice/Video Consultation</span>
                                    </button>
                                    <button className="w-full py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-all">
                                        Finalize & Save e-Prescription
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* SonoSmart Diagnostics Kit */}
                        <div className="p-6 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-3xl border border-indigo-200 shadow-xl">
                            <h4 className="text-xl font-black text-indigo-800 mb-4 flex items-center space-x-2"><Zap className="w-6 h-6"/>SonoSmart Diagnostics Kit (USG/X-Ray)</h4>
                            
                            <div className="grid grid-cols-2 gap-4 items-center">
                                {/* Left: Controls */}
                                <div className="space-y-3">
                                    <select 
                                        className="w-full p-3 border-4 border-indigo-200 rounded-xl bg-white font-semibold shadow-inner"
                                        value={sonoType}
                                        onChange={(e) => setSonoType(e.target.value)}
                                    >
                                        <option>X-Ray (AI Generated)</option>
                                        <option>USG Scan (Simulated)</option>
                                    </select>
                                    <button 
                                        onClick={handleSonoScan}
                                        disabled={sonoStatus === 'Scanning'}
                                        className={`w-full py-3 font-bold rounded-xl transition-all flex items-center justify-center space-x-2 ${
                                            sonoStatus === 'Scanning' 
                                                ? 'bg-gray-400 cursor-not-allowed' 
                                                : 'bg-indigo-600 text-white hover:bg-indigo-700'
                                            }`}
                                    >
                                        <Microscope className={`w-5 h-5 ${sonoStatus === 'Scanning' ? 'animate-spin' : ''}`} />
                                        <span>{sonoStatus === 'Scanning' ? 'Scanning in Progress...' : `Launch ${sonoType} Scan`}</span>
                                    </button>
                                    {sonoStatus === 'Ready' && (
                                        <div className="p-3 bg-emerald-100 text-emerald-800 font-bold rounded-xl flex justify-between items-center">
                                            <span>Scan Complete. Report Ready.</span>
                                            <Download className="w-5 h-5 cursor-pointer" />
                                        </div>
                                    )}
                                </div>

                                {/* Right: Simulation */}
                                <div className="p-4 bg-gray-800 rounded-xl text-center h-full min-h-[120px] flex items-center justify-center">
                                    {sonoStatus === 'Idle' && <span className="text-gray-400">Ready to Scan. Select Type above.</span>}
                                    {sonoStatus === 'Scanning' && (
                                        <div className="text-blue-300 flex items-center space-x-2">
                                            <RefreshCw className="w-5 h-5 animate-spin"/>
                                            <span>Analyzing {sonoType} Data...</span>
                                        </div>
                                    )}
                                    {sonoStatus === 'Ready' && (
                                        <div className="text-white">
                                            <p className="font-bold text-lg mb-1">{sonoType} Result:</p>
                                            <p className="text-emerald-400 font-black">AI Summary: Lungs Clear, Cardiac OK.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Component 4: Pet Medical Repository Card (Dashboard view) ---
const PetMedicalRepositoryCard = () => {
    return (
        <div className="bg-white rounded-4xl shadow-2xl border border-indigo-100 p-8 hover:shadow-indigo-300/50 hover:border-indigo-300 transition-all">
            <h3 className="font-black text-xl mb-6 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <LayoutList className="w-7 h-7 text-indigo-600" />
                    <span>Pet Medical Repository</span>
                </div>
                <button className="px-4 py-2 bg-indigo-500 text-white text-sm font-bold rounded-2xl hover:bg-indigo-600 transition-all">
                    Global Search
                </button>
            </h3>
            
            <div className="space-y-4">
                <div className="relative">
                    <input 
                        type="text" 
                        placeholder="Search Pet name, Document type, or Doctor..."
                        className="w-full p-3 pl-10 border border-gray-300 rounded-xl focus:ring-blue-500"
                    />
                    <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                </div>
                
                <p className="text-sm font-bold text-gray-700 pt-2">Recent Records Uploaded:</p>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                    {PET_REPOSITORY_DATA.records.slice(0, 3).map((record, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                            <div className="flex items-center space-x-3">
                                <FileText className="w-5 h-5 text-blue-500 flex-shrink-0" />
                                <div>
                                    <div className="font-semibold text-gray-900 text-sm">{record.title}</div>
                                    <div className="text-xs text-gray-500">{record.type} by {record.doctor}</div>
                                </div>
                            </div>
                            <span className="text-xs text-indigo-500 font-bold">{record.date}</span>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4">
                    <div className="p-3 bg-blue-100 rounded-xl text-center">
                        <div className="text-2xl font-black text-blue-800">12,450</div>
                        <div className="text-xs text-blue-700 font-semibold">Total Documents</div>
                    </div>
                    <div className="p-3 bg-pink-100 rounded-xl text-center">
                        <div className="text-2xl font-black text-pink-800">95%</div>
                        <div className="text-xs text-pink-700 font-semibold">Digitized Records</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Component 5: Inventory Management Card (Dashboard view) ---
const InventoryManagementCard = () => {
    return (
        <div className="bg-white rounded-4xl shadow-2xl border border-emerald-100 p-8 hover:shadow-emerald-300/50 hover:border-emerald-300 transition-all">
            <h3 className="font-black text-xl mb-6 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <Layers className="w-7 h-7 text-emerald-600" />
                    <span>Inventory Management</span>
                </div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                    {INVENTORY_DATA.filter(item => item.refillNeeded || new Date(item.expiry) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)).length} Alerts
                </span>
            </h3>
            
            <div className="space-y-4 max-h-64 overflow-y-auto">
                {INVENTORY_DATA.map((item, idx) => {
                    const status = item.refillNeeded ? 'Refill Needed' : (new Date(item.expiry) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) ? 'Expiring Soon' : 'OK');
                    const statusColor = status === 'Refill Needed' ? 'text-red-600' : status === 'Expiring Soon' ? 'text-amber-600' : 'text-emerald-600';
                    const barColor = status === 'Refill Needed' ? 'bg-red-500' : status === 'Expiring Soon' ? 'bg-amber-500' : 'bg-emerald-500';
                    const availablePercentage = (item.available / (item.available + item.predicted15Days)) * 100;
                    
                    return (
                        <div key={idx} className={`p-4 rounded-2xl border ${status === 'Refill Needed' ? 'border-red-200 bg-red-50' : status === 'Expiring Soon' ? 'border-amber-200 bg-amber-50' : 'border-gray-200 bg-gray-50'}`}>
                            <div className="flex justify-between items-center mb-2">
                                <div className="font-bold text-gray-900 text-sm flex items-center space-x-2">
                                    <div className={`w-2 h-2 rounded-full ${barColor}`}></div>
                                    <span>{item.name}</span>
                                </div>
                                <span className={`text-xs font-semibold ${statusColor}`}>{status}</span>
                            </div>

                            {/* Stock Bar */}
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                                <div className={`${barColor} h-2.5 rounded-full`} style={{ width: `${Math.min(100, availablePercentage)}%` }}></div>
                            </div>

                            <div className="grid grid-cols-3 gap-2 text-xs font-medium text-gray-600">
                                <div className="text-center">
                                    <span className="font-black text-md text-gray-900">{item.available}</span>
                                    <div className="uppercase">Available</div>
                                </div>
                                <div className="text-center">
                                    <span className="font-black text-md text-gray-900">{item.consumedDaily}</span>
                                    <div className="uppercase">Daily Consumed</div>
                                </div>
                                <div className="text-center">
                                    <span className={`font-black text-md ${item.available < item.predicted15Days ? 'text-red-600' : 'text-gray-900'}`}>
                                        {item.predicted15Days}
                                    </span>
                                    <div className="uppercase">Predicted (15D)</div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            
            <button className="w-full py-3 mt-6 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-all flex items-center justify-center space-x-2 shadow-lg">
                <ShoppingCart className="w-5 h-5" />
                <span>Start Auto-Reorder Process</span>
            </button>
        </div>
    );
};

// --- Component 6: Remote Van Management Card (Dashboard view) ---
const RemoteVanManagementCard = () => {
    return (
        <div className="lg:col-span-4 bg-white rounded-4xl shadow-2xl border border-orange-100 p-8 hover:shadow-orange-300/50 hover:border-orange-300 transition-all">
            <h3 className="font-black text-xl mb-6 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <Truck className="w-7 h-7 text-orange-600" />
                    <span>Remote Van & Home Care</span>
                </div>
                <span className="px-3 py-1 bg-orange-100 text-orange-800 text-xs font-bold rounded-full">
                    {REMOTE_VAN_DATA.filter(v => v.status === 'In Transit').length} Active
                </span>
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {REMOTE_VAN_DATA.map((van, idx) => (
                    <div key={idx} className={`p-4 rounded-2xl border-4 ${van.status === 'In Transit' ? 'border-orange-400 bg-orange-50' : 'border-gray-200 bg-gray-50'}`}>
                        <div className="flex justify-between items-center mb-3">
                            <div className="font-black text-lg text-gray-900">{van.vanId}</div>
                            <span className={`px-3 py-1 text-xs font-bold rounded-full ${van.status === 'In Transit' ? 'bg-orange-600 text-white' : 'bg-green-100 text-green-800'}`}>
                                {van.status}
                            </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1"><span className="font-semibold">Assigned:</span> {van.assigned}</p>
                        <p className="text-sm text-gray-600 mb-4"><span className="font-semibold">Current Location:</span> {van.currentRoute}</p>

                        <div className="grid grid-cols-2 gap-2 text-xs text-gray-700 font-medium border-t border-dashed pt-3">
                            <div>Stops: <span className="font-bold">{van.completedStops}/{van.stopsToday}</span></div>
                            <div>Perf: <span className="font-bold text-blue-600">{van.performance}</span></div>
                            <div className="col-span-2 text-sm text-indigo-700 font-bold">Next: {van.nextStop}</div>
                        </div>
                    </div>
                ))}
            </div>

            <button className="w-full py-3 mt-6 bg-orange-600 text-white font-bold rounded-2xl hover:bg-orange-700 transition-all flex items-center justify-center space-x-2 shadow-lg">
                <MapPin className="w-5 h-5" />
                <span>Launch Route Planner & Book Home Visit</span>
            </button>
        </div>
    );
};


// --- NEW COMPONENT: Dynamic Alerts Banner (Professional Display) ---
const AlertsBanner = ({ alerts }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      {alerts.slice(0, 6).map((alert, idx) => {
        const Icon = alert.icon;
        return (
            <div
            key={idx}
            className={`p-6 rounded-3xl shadow-xl transition-all border-4 ${alert.borderColor.replace('border-', 'border-')} ${alert.bgColor.replace('bg-', 'bg-')}/70 hover:shadow-2xl hover:-translate-y-1`}
            >
            <div className="flex items-start space-x-4">
                <Icon className={`w-6 h-6 flex-shrink-0 ${alert.color.replace('text-', 'text-')} animate-pulse`} />
                <div className="flex-grow">
                <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-lg text-gray-900 leading-tight">{alert.title}</h4>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-black uppercase ${alert.severity === 'critical' ? 'bg-rose-600 text-white' : alert.severity === 'high' ? 'bg-red-200 text-red-800' : alert.severity === 'medium' ? 'bg-amber-200 text-amber-800' : 'bg-blue-200 text-blue-800'}`}>
                    {alert.level}
                    </span>
                </div>
                <p className="text-sm text-gray-700 mb-3">{alert.message}</p>
                
                <div className="p-3 bg-white/70 rounded-xl border border-dashed border-gray-300">
                    <p className="text-xs font-semibold text-gray-700 uppercase mb-1 flex items-center space-x-1">
                    <BarChart3 className="w-3 h-3 text-indigo-500" />
                    <span>Predicted Operational Impact</span>
                    </p>
                    <p className="text-sm text-gray-800 font-medium italic">{alert.impact}</p>
                </div>
                </div>
            </div>
            </div>
        );
      })}
    </div>
  );
};

// --- NEW COMPONENT: Data & Insights Dashboard ---
const DataInsightsDashboard = () => {
    // Helper to determine trend color
    const getTrendColor = (trend) => {
        if (trend.includes('+')) return 'text-emerald-600 bg-emerald-100';
        if (trend.includes('-')) return 'text-red-600 bg-red-100';
        return 'text-gray-600 bg-gray-100';
    };

    return (
        <div className="bg-white rounded-4xl shadow-2xl border border-blue-100 p-10 hover:shadow-3xl transition-all">
            <h3 className="font-black text-3xl mb-8 flex items-center space-x-4 border-b pb-4">
                <BarChart3 className="w-9 h-9 text-indigo-600" />
                <span>Data & Insights Dashboard</span>
            </h3>
            
            {/* === 1. High-Level Metrics (Daily/Monthly/Yearly) === */}
            <h4 className="font-bold text-xl text-blue-700 mb-4">Core Operational Metrics (M-T-D)</h4>
            <div className="grid md:grid-cols-5 gap-6 mb-10">
                {INSIGHTS_DATA.metrics.map((metric, idx) => (
                    <div key={idx} className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-md border border-blue-200">
                        <div className="text-sm text-gray-600 font-semibold uppercase mb-1">{metric.name}</div>
                        
                        {metric.monthly ? (
                            <>
                                <div className="text-3xl font-black text-gray-900 leading-none">{metric.monthly.toLocaleString()}</div>
                                <div className="text-xs text-gray-700 mt-1">
                                    <span className="font-bold">Predicted:</span> {metric.predicted || metric.yearly.toLocaleString()}
                                </div>
                                <span className={`text-xs font-bold px-2 py-0.5 rounded-lg mt-2 inline-flex ${getTrendColor(metric.trend)}`}>
                                    {metric.trend}
                                </span>
                            </>
                        ) : (
                            <>
                                <div className="flex justify-between items-end mb-2">
                                    <div className="text-3xl font-black text-blue-800 leading-none">{metric.walkin}%</div>
                                    <div className="text-xs text-gray-500">Walk-in</div>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${metric.online}%` }}></div>
                                </div>
                                <div className="text-xs text-gray-700 mt-1 flex justify-between">
                                    <span className='font-bold text-indigo-700'>{metric.online}% Online</span>
                                    <span className={`font-bold ${getTrendColor(metric.trend)}`}>{metric.trend}</span>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>

            {/* === 2. Diagnostics & Doctor Performance === */}
            <div className="grid lg:grid-cols-2 gap-8 mb-10">
                {/* Diagnostics Breakdown */}
                <div className="p-8 bg-white rounded-3xl shadow-lg border border-indigo-100">
                    <h4 className="font-bold text-xl text-indigo-700 mb-4 flex items-center space-x-2"><Zap className='w-5 h-5'/>Diagnostics Breakdown</h4>
                    <p className="text-sm text-gray-600 mb-4 font-semibold">SonoSmart usage is at <span className="font-black text-lg text-blue-600">{INSIGHTS_DATA.diagnostics.sonoSmartUsage}%</span> of all diagnostics, driving early detection.</p>
                    
                    <div className="space-y-3">
                        {INSIGHTS_DATA.diagnostics.breakdown.map((item, idx) => (
                            <div key={idx} className="bg-gray-50 p-4 rounded-xl flex justify-between items-center border border-gray-200">
                                <div>
                                    <div className="font-semibold text-gray-900">{item.type}</div>
                                    <div className="text-xs text-gray-500">{item.count} monthly</div>
                                </div>
                                <span className={`text-sm font-bold px-3 py-1 rounded-full ${getTrendColor(item.growth)}`}>
                                    {item.growth}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className='mt-4 p-3 bg-emerald-100 text-emerald-800 rounded-xl font-bold text-sm flex items-center space-x-2'>
                        <ShieldCheck className='w-4 h-4'/>
                        <span>Early Detection Impact: {INSIGHTS_DATA.diagnostics.earlyDetectionImpact}</span>
                    </div>
                </div>

                {/* Doctor Performance */}
                <div className="p-8 bg-white rounded-3xl shadow-lg border border-emerald-100">
                    <h4 className="font-bold text-xl text-emerald-700 mb-4 flex items-center space-x-2"><Stethoscope className='w-5 h-5'/>Doctor Performance Scorecard</h4>
                    <div className="space-y-4">
                        {INSIGHTS_DATA.performance.doctor.map((doc, idx) => (
                            <div key={idx} className="p-4 rounded-xl border border-gray-200 bg-gray-50">
                                <div className="flex justify-between items-center mb-1">
                                    <div className="font-bold text-gray-900">{doc.name}</div>
                                    <span className={`text-sm font-black text-${doc.color}-600`}>Effic: {doc.efficiency}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className={`bg-${doc.color}-500 h-2 rounded-full`} style={{ width: `${doc.utilization}` }}></div>
                                </div>
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    <span>Utilization: {doc.utilization}</span>
                                    <span>Treatments: {doc.treatments}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* === 3. Service Categories & Health Trends === */}
            <div className="grid lg:grid-cols-2 gap-8">
                {/* Service Category Performance */}
                <div className="p-8 bg-white rounded-3xl shadow-lg border border-pink-100">
                    <h4 className="font-bold text-xl text-rose-700 mb-4 flex items-center space-x-2"><Activity className='w-5 h-5'/>Service Category Performance</h4>
                    <div className="space-y-3">
                        {INSIGHTS_DATA.performance.service.map((service, idx) => (
                            <div key={idx} className="bg-gray-50 p-4 rounded-xl flex justify-between items-center border border-gray-200">
                                <div>
                                    <div className="font-semibold text-gray-900">{service.name}</div>
                                    <div className="text-xs text-gray-500">Revenue Share: {service.revenueShare}</div>
                                </div>
                                <span className={`text-sm font-bold px-3 py-1 rounded-full ${getTrendColor(service.growth)}`}>
                                    {service.growth}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Species-wise & Breed-wise Health Trend Analysis */}
                <div className="p-8 bg-white rounded-3xl shadow-lg border border-orange-100">
                    <h4 className="font-bold text-xl text-orange-700 mb-4 flex items-center space-x-2"><PawPrint className='w-5 h-5'/>Health Trend Analysis & Risk</h4>
                    <div className="space-y-3">
                        {INSIGHTS_DATA.healthTrends.map((trend, idx) => (
                            <div key={idx} className={`p-4 rounded-xl border-4 ${trend.status === 'Action Required' ? 'border-red-300 bg-red-50' : 'border-blue-300 bg-blue-50'}`}>
                                <div className="flex justify-between items-center mb-1">
                                    <div className="font-bold text-gray-900">{trend.condition}</div>
                                    <span className={`text-xs font-black uppercase px-2 py-0.5 rounded-full ${trend.status === 'Action Required' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}>
                                        {trend.status}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-700 italic">({trend.breed}, {trend.species}) - Detection: {trend.detection}</p>
                                <p className="text-xs mt-2 text-gray-500">{trend.impactReport}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
};

// --- NEW COMPONENT: Comprehensive Booking Modal ---
const BookingSystemModal = ({ onClose }) => {
    // Initialize active tab to 'Doctor' for the professional booking flow
    const [activeTab, setActiveTab] = useState('Doctor');
    
    // State to hold the currently selected service object (for displaying details)
    const [selectedService, setSelectedService] = useState(null);
    
    // State to simulate a successful booking/slot addition
    const [isSlotAdded, setIsSlotAdded] = useState(false);

    // Effect to reset selected service when tab changes
    useEffect(() => {
        setSelectedService(null);
    }, [activeTab]);

    // Helper to get doctor availability class for quick visual status
    const getAvailabilityClass = (status) => {
        if (status.includes('Available')) return 'text-emerald-800 bg-emerald-100 border-emerald-300 hover:shadow-lg';
        if (status.includes('Consultation')) return 'text-amber-800 bg-amber-100 border-amber-300 hover:shadow-lg';
        return 'text-red-800 bg-red-100 border-red-300 opacity-60 cursor-not-allowed';
    };

    // Simulated action for adding a new slot/booking
    const handleAddSlot = (e) => {
        e.preventDefault();
        // In a real app, this would be an API call to save the booking
        if (!selectedService) {
             console.error("Please select a service before booking.");
             return;
        }

        console.log(`Simulating booking for: ${selectedService.name} on tab: ${activeTab}`);
        setIsSlotAdded(true);
        setTimeout(() => setIsSlotAdded(false), 3000); // Reset confirmation after 3 seconds
    }

    // Helper to render content based on the active tab (Doctor, Diagnostics, etc.)
    const renderBookingContent = () => {
        const servicesArray = BOOKING_DATA.services[activeTab] || [];

        // Dynamic icon mapping for main tabs
        const iconMap = {
            'Doctor': Stethoscope,
            'Diagnostics': Zap,
            'Treatments': Syringe,
            'Wellness': Heart,
            'Remote': Truck
        };
        const CurrentIcon = iconMap[activeTab] || Calendar; // Default to Calendar if needed

        // Handle Doctor tab separately as it involves doctor/staff selection
        if (activeTab === 'Doctor') {
            return (
                <form className="space-y-4" onSubmit={handleAddSlot}>
                    <select 
                        className="w-full p-3 border-2 border-blue-200 rounded-xl bg-white font-semibold shadow-inner focus:ring-blue-500"
                        onChange={(e) => {
                            const serviceName = e.target.value;
                            const service = servicesArray.find(s => s.name === serviceName);
                            setSelectedService(service);
                        }}
                    >
                        <option value="">Select Consultation Type</option>
                        {BOOKING_DATA.specializations.map(spec => (
                            <option key={spec}>{spec}</option>
                        ))}
                        {/* Optional: Add generic consultation types */}
                        {servicesArray.map((s, idx) => <option key={idx} value={s.name}>{s.name}</option>)}
                    </select>
                    
                    {selectedService && (
                        <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                            <div className="font-bold text-lg text-blue-800">Fee: ₹{selectedService.fee.toLocaleString()}</div>
                            <div className="text-sm text-gray-600">Expected Duration: {selectedService.duration} min</div>
                            <div className="text-sm text-gray-600">Current Queue Wait: <span className='font-bold text-emerald-600'>{selectedService.wait}</span></div>
                        </div>
                    )}


                    <h5 className="font-bold text-lg text-gray-800 pt-2 border-t mt-4 flex items-center space-x-2"><UsersIcon className="w-5 h-5 text-blue-500"/>Available Doctors (Live Status)</h5>
                    {BOOKING_DATA.doctors.map((doc, idx) => (
                        <div key={idx} className={`p-4 rounded-xl border-2 shadow-sm flex justify-between items-center transition-all ${getAvailabilityClass(doc.availability)}`}>
                            <div className="flex-grow">
                                <div className="font-black text-lg text-gray-900">{doc.name}</div>
                                <div className="text-sm text-gray-700">{doc.specialization}</div>
                            </div>
                            <div className="text-sm font-bold text-right ml-4">
                                <div className='font-semibold text-indigo-700'>{doc.availability.includes('Available') ? 'Ready' : 'Waitlist'}</div>
                                <div className="text-xs text-gray-600 font-normal">{doc.availability}</div>
                            </div>
                            <button 
                                type="submit" 
                                disabled={!doc.availability.includes('Available') || !selectedService}
                                className="ml-4 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all text-sm font-bold shadow-md disabled:bg-gray-400"
                            >
                                Book Slot
                            </button>
                        </div>
                    ))}
                </form>
            );
        }

        // --- Standard Service Booking (Diagnostics, Treatments, Wellness, Remote) ---
        return (
            <form className="space-y-4" onSubmit={handleAddSlot}>
                <div className="p-4 bg-blue-50/70 rounded-xl border border-blue-200 flex items-center space-x-3">
                    <CurrentIcon className='w-6 h-6 text-blue-600'/>
                    <span className="font-bold text-blue-800">Book {activeTab} Service</span>
                </div>
                
                <select 
                    required 
                    className="w-full p-3 border-2 border-pink-200 rounded-xl bg-white font-semibold shadow-inner focus:ring-pink-500"
                    onChange={(e) => {
                        const serviceName = e.target.value;
                        const service = servicesArray.find(s => s.name === serviceName);
                        setSelectedService(service);
                    }}
                >
                    <option value="">Select Specific Service *</option>
                    {servicesArray.map((service, idx) => (
                        <option key={idx} value={service.name}>{service.name}</option>
                    ))}
                </select>

                {/* Dynamic Service Details Display */}
                {selectedService && (
                    <div className="grid grid-cols-3 gap-3 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-300 shadow-inner animate-in fade-in">
                        <div className="text-center">
                            <DollarSign className='w-5 h-5 text-emerald-600 mx-auto mb-1'/>
                            <div className="text-sm text-gray-600">Fee</div>
                            <div className="font-black text-lg text-emerald-800">₹{selectedService.fee.toLocaleString()}</div>
                        </div>
                        <div className="text-center">
                            <Clock className='w-5 h-5 text-blue-600 mx-auto mb-1'/>
                            <div className="text-sm text-gray-600">Est. Time</div>
                            <div className="font-black text-lg text-blue-800">{selectedService.duration} min</div>
                        </div>
                        <div className="text-center">
                            <Calendar className='w-5 h-5 text-pink-600 mx-auto mb-1'/>
                            <div className="text-sm text-gray-600">Wait Prediction</div>
                            <div className="font-black text-lg text-pink-800">{selectedService.wait}</div>
                        </div>
                    </div>
                )}
                
                {/* Additional inputs based on tab */}
                {activeTab === 'Remote' && (
                    <>
                        <select className="w-full p-3 border-2 border-orange-200 rounded-xl bg-white font-semibold shadow-inner focus:ring-orange-500">
                            <option>Home Visit</option>
                            <option>Remote Van Appointment</option>
                        </select>
                        <input type="text" placeholder="Enter Pet Parent Address / Pincode *" required className="w-full p-3 border-2 border-orange-200 rounded-xl shadow-inner focus:ring-orange-500"/>
                    </>
                )}
                
                {/* General inputs */}
                <input type="text" placeholder="Search Pet Name / Owner ID *" required className="w-full p-3 border-2 border-gray-200 rounded-xl shadow-inner focus:ring-blue-500"/>
                <input type="date" required className="w-full p-3 border-2 border-gray-200 rounded-xl shadow-inner focus:ring-blue-500"/>
                <input type="time" required className="w-full p-3 border-2 border-gray-200 rounded-xl shadow-inner focus:ring-blue-500"/>
                
                <button 
                    type="submit"
                    disabled={!selectedService}
                    className="w-full py-3 bg-pink-600 text-white font-bold rounded-2xl hover:bg-pink-700 transition-all shadow-xl flex items-center justify-center space-x-2 disabled:bg-gray-400"
                >
                    <CheckCircle className='w-5 h-5'/>
                    <span>Finalize Appointment / Add Slot</span>
                </button>
            </form>
        );
    };

    return (
        <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
            <div className="bg-white rounded-4xl shadow-4xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transform scale-100 transition-all duration-300">
                
                {/* Header */}
                <div className="p-8 border-b border-blue-100 flex items-center justify-between sticky top-0 bg-white rounded-t-4xl">
                    <h3 className="text-3xl font-black text-gray-900 flex items-center space-x-3">
                        <Calendar className="w-8 h-8 text-pink-600" />
                        <span>Professional Booking System</span>
                    </h3>
                    <button onClick={onClose} className="p-3 rounded-full bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-600 transition-all">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="grid lg:grid-cols-4 gap-8 p-8">
                    
                    {/* Left Column: Real-time Queue Status (1/4) */}
                    <div className="lg:col-span-1 space-y-4">
                        <h4 className="font-bold text-xl text-indigo-700 flex items-center space-x-2 mb-2">
                            <Clock className="w-5 h-5"/>
                            <span>Live Queue Status</span>
                        </h4>

                        <div className="p-5 bg-indigo-50 border-4 border-indigo-300 rounded-2xl text-center shadow-2xl animate-in fade-in">
                            <div className="text-sm font-semibold text-gray-600">Current Token / Pet</div>
                            <div className="text-5xl font-black text-indigo-800 my-1">{BOOKING_DATA.queue.token}</div>
                            <div className="text-lg font-bold text-gray-800 mb-2">{BOOKING_DATA.queue.nextPet}</div>
                            <div className="text-sm font-semibold text-gray-600">Estimated Wait Time</div>
                            <div className="text-2xl font-black text-emerald-600">{BOOKING_DATA.queue.waitingTime}</div>
                        </div>

                        <div className="p-4 bg-gray-100 rounded-2xl text-sm space-y-1 shadow-md">
                            <p><strong>Pets in Queue:</strong> <span className="font-bold text-blue-600">{BOOKING_DATA.queue.petsInQueue}</span></p>
                            <p><strong>Next Doctor:</strong> <span className="font-bold text-blue-600">{BOOKING_DATA.queue.nextDoctor}</span></p>
                            <p><strong>Live Doctors:</strong> <span className="font-bold text-emerald-600">{BOOKING_DATA.queue.liveDoctors}</span></p>
                        </div>
                        
                        <button className="w-full py-3 mt-4 bg-blue-500 text-white font-bold rounded-2xl hover:bg-blue-600 transition-all shadow-md flex items-center justify-center space-x-2">
                            <RefreshCw className='w-4 h-4'/>
                            <span>Refresh Queue Data</span>
                        </button>

                    </div>

                    {/* Right Column: Booking Form & Tabs (3/4) */}
                    <div className="lg:col-span-3 space-y-6">
                        <div className="flex space-x-2 border-b-2 border-gray-100 pb-2 overflow-x-auto">
                            {['Doctor', 'Diagnostics', 'Treatments', 'Wellness', 'Remote'].map(tab => {
                                const Icon = iconMap[tab] || Calendar;
                                return (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`flex items-center space-x-2 px-4 py-2 text-sm font-bold rounded-xl transition-all whitespace-nowrap ${
                                            activeTab === tab
                                                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        <Icon className="w-5 h-5"/>
                                        <span>{tab}</span>
                                    </button>
                                );
                            })}
                        </div>
                        
                        <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-inner">
                            {isSlotAdded && (
                                <div className='p-4 mb-4 bg-emerald-100 border-2 border-emerald-400 text-emerald-800 font-bold rounded-xl flex items-center justify-center space-x-3 animate-in fade-in'>
                                    <CheckCircle className='w-5 h-5'/>
                                    <span>New Slot Added! Pet will receive Token B-457.</span>
                                </div>
                            )}
                            {renderBookingContent()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- NEW COMPONENT: Account Settings & Catalog Management Modal ---
const CatalogManagementModal = ({ onClose }) => {
    const [activeTab, setActiveTab] = useState('Staff & Fees');

    // Helper components for tab content
    const StaffAndFeesTab = () => (
        <div className="space-y-6">
            <h5 className="text-xl font-bold text-indigo-700">Staff & Doctor Fee Management</h5>
            <div className="grid grid-cols-3 gap-4 font-semibold text-sm text-gray-600 border-b pb-2">
                <div>Name (Role)</div>
                <div>Specialization / Email</div>
                <div className="text-right">Fee (per session)</div>
            </div>
            {CATALOG_DATA.clinicStaff.map((staff, idx) => (
                <div key={idx} className="grid grid-cols-3 gap-4 items-center p-3 bg-gray-50 rounded-lg shadow-sm">
                    <div className="font-bold text-gray-900 flex items-center space-x-2">
                        <User className="w-4 h-4 text-pink-500"/>
                        <span>{staff.name}</span>
                        <span className="text-xs font-normal text-gray-500">({staff.role})</span>
                    </div>
                    <div className="text-sm text-gray-700 truncate">{staff.specialization || staff.email}</div>
                    <div className="text-right text-lg font-black text-blue-600">
                        {staff.fee > 0 ? `₹${staff.fee.toLocaleString()}` : 'N/A'}
                    </div>
                </div>
            ))}
            <button className="px-5 py-3 bg-indigo-500 text-white font-bold rounded-xl hover:bg-indigo-600 transition-all mt-4">
                Add New Staff / Adjust Fees
            </button>
        </div>
    );

    const ServiceCatalogTab = () => (
        <div className="space-y-6">
            <h5 className="text-xl font-bold text-indigo-700">Base Service Pricing & Duration</h5>
            {/* FIX: Removed the trailing quote and angle bracket in the className definition */}
            <div className="grid grid-cols-3 gap-4 font-semibold text-sm text-gray-600 border-b pb-2">
                <div>Service Name (Category)</div>
                <div>Duration</div>
                <div className="text-right">Base Price (₹)</div>
            </div>
            {CATALOG_DATA.serviceFees.map((service, idx) => (
                <div key={idx} className="grid grid-cols-3 gap-4 items-center p-3 bg-gray-50 rounded-lg shadow-sm">
                    <div className="font-bold text-gray-900">{service.name}</div>
                    <div className="text-sm text-gray-700">{service.duration}</div>
                    <div className="text-right text-lg font-black text-emerald-600">
                        ₹{service.fee.toLocaleString()}
                    </div>
                </div>
            ))}
            <button className="px-5 py-3 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 transition-all mt-4">
                Update Service Catalog
            </button>
        </div>
    );

    const InventoryConfigTab = () => (
        <div className="space-y-6">
            <h5 className="text-xl font-bold text-indigo-700">Critical Inventory Stock & Min Levels</h5>
            <div className="grid grid-cols-4 gap-4 font-semibold text-sm text-gray-600 border-b pb-2">
                <div>Item Name (Category)</div>
                <div className="text-center">Available</div>
                <div className="text-center">Min Stock</div>
                <div className="text-right">Status</div>
            </div>
            {/* FIX: Using optional chaining (?) and fallback to ensure map is called on an array */}
            {(CATALOG_DATA.inventoryStocks || []).map((item, idx) => (
                <div key={idx} className="grid grid-cols-4 gap-4 items-center p-3 bg-gray-50 rounded-lg shadow-sm">
                    <div className="font-bold text-gray-900 truncate">{item.name}</div>
                    <div className="text-center font-bold">{item.available}</div>
                    <div className="text-center text-red-500 font-bold">{item.minStock}</div>
                    <div className="text-right">
                        {item.available < item.minStock ? (
                            <span className="text-red-600 font-bold flex items-center justify-end"><AlertCircle className='w-4 h-4 mr-1'/> LOW</span>
                        ) : (
                            <span className="text-emerald-600 font-bold">OK</span>
                        )}
                    </div>
                </div>
            ))}
            <button className="px-5 py-3 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-600 transition-all mt-4">
                Adjust Min Stock Levels
            </button>
        </div>
    );

    const PackagesAndTechTab = () => (
        <div className="space-y-6">
            <h5 className="text-xl font-bold text-indigo-700 mb-4">Custom Care Packages</h5>
            <div className="space-y-3">
                {CATALOG_DATA.customPackages.map((pkg, idx) => (
                    <div key={idx} className="p-4 bg-pink-50 border-2 border-pink-300 rounded-xl shadow-md">
                        <div className="flex justify-between items-start">
                            <div className="font-black text-lg text-pink-800">{pkg.name}</div>
                            <div className="text-xl font-black text-rose-600">₹{pkg.price.toLocaleString()}</div>
                        </div>
                        <div className="text-sm text-gray-600 mt-1">Includes: {pkg.items.join(', ')}</div>
                        <button className="text-xs text-indigo-600 font-semibold mt-2 hover:underline">Edit Package Items</button>
                    </div>
                ))}
            </div>
            
            <h5 className="text-xl font-bold text-indigo-700 pt-6 border-t">SonoSmart Kit Configurations</h5>
            <div className="space-y-3">
                {CATALOG_DATA.kitConfigs.map((kit, idx) => (
                    <div key={idx} className="p-4 bg-blue-50 border border-blue-300 rounded-xl shadow-sm">
                        <div className="flex justify-between items-center">
                            <div className="font-bold text-gray-900">{kit.name} ({kit.location})</div>
                            <span className={`text-xs font-black px-3 py-1 rounded-full ${kit.status === 'Optimal' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                                {kit.status}
                            </span>
                        </div>
                        <div className="text-sm text-gray-700 mt-1">Software: {kit.softwareVersion} | Calibrated: {kit.calibration}</div>
                        <button className="text-xs text-blue-600 font-semibold mt-2 hover:underline">Remote Update/Calibrate</button>
                    </div>
                ))}
            </div>
        </div>
    );

    const SchedulingTab = () => (
        <div className="space-y-6">
            <h5 className="text-xl font-bold text-indigo-700">Clinic Scheduling Parameters</h5>
            
            <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="text-sm text-gray-600">Default Consultation Slot (Minutes)</div>
                    <input type="number" defaultValue={CATALOG_DATA.scheduling.defaultSlotMinutes} className="w-full mt-1 p-2 border-2 border-blue-200 rounded-lg font-bold"/>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="text-sm text-gray-600">Walk-in Counter Capacity (Parallel Slots)</div>
                    <input type="number" defaultValue={CATALOG_DATA.scheduling.walkinCounterSlots} className="w-full mt-1 p-2 border-2 border-blue-200 rounded-lg font-bold"/>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="text-sm text-gray-600">Remote Van Availability (Units)</div>
                    <input type="number" defaultValue={CATALOG_DATA.scheduling.remoteVanCapacity} className="w-full mt-1 p-2 border-2 border-blue-200 rounded-lg font-bold"/>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="text-sm text-gray-600">Standard Clinic Hours</div>
                    <input type="text" defaultValue={CATALOG_DATA.scheduling.clinicHours} className="w-full mt-1 p-2 border-2 border-blue-200 rounded-lg font-bold"/>
                </div>
            </div>
            
            <button className="px-5 py-3 bg-pink-500 text-white font-bold rounded-xl hover:bg-pink-600 transition-all mt-4">
                Save Scheduling Rules
            </button>
        </div>
    );


    // --- Main Render ---
    const renderContent = () => {
        switch (activeTab) {
            case 'Staff & Fees': return <StaffAndFeesTab />;
            case 'Service Catalog': return <ServiceCatalogTab />;
            case 'Inventory Stock': return <InventoryConfigTab />;
            case 'Packages & Tech': return <PackagesAndTechTab />;
            case 'Scheduling Rules': return <SchedulingTab />;
            default: return <p>Select a management tab.</p>;
        }
    }

    return (
        <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
            <div className="bg-white rounded-4xl shadow-4xl max-w-5xl w-full max-h-[95vh] overflow-y-auto transform scale-100 transition-all duration-300">
                
                {/* Header */}
                <div className="p-8 border-b border-blue-100 flex items-center justify-between sticky top-0 bg-white rounded-t-4xl">
                    <h3 className="text-3xl font-black text-gray-900 flex items-center space-x-3">
                        <Settings className="w-8 h-8 text-indigo-600" />
                        <span>Account Settings & Catalog Management</span>
                    </h3>
                    <button onClick={onClose} className="p-3 rounded-full bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-600 transition-all">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="grid lg:grid-cols-4 gap-8 p-8">
                    
                    {/* Left Column: Navigation (1/4) */}
                    <div className="lg:col-span-1 space-y-2">
                        {['Staff & Fees', 'Service Catalog', 'Packages & Tech', 'Inventory Stock', 'Scheduling Rules'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`w-full text-left flex items-center space-x-3 p-4 font-bold rounded-2xl transition-all ${
                                    activeTab === tab
                                        ? 'bg-indigo-500 text-white shadow-lg'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {tab === 'Staff & Fees' && <UsersIcon className="w-5 h-5" />}
                                {tab === 'Service Catalog' && <ClipboardList className="w-5 h-5" />}
                                {tab === 'Packages & Tech' && <Zap className="w-5 h-5" />}
                                {tab === 'Inventory Stock' && <ShoppingCart className="w-5 h-5" />}
                                {tab === 'Scheduling Rules' && <Clock className="w-5 h-5" />}
                                <span>{tab}</span>
                            </button>
                        ))}
                        
                        {/* Additional Account Setting Feature */}
                        <div className="pt-4 border-t mt-4">
                            <h6 className="text-xs font-bold text-gray-500 mb-2 uppercase">Additional Settings</h6>
                            <button className="w-full text-left p-3 bg-white border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-50">
                                Clinic Branding & Templates
                            </button>
                            <button className="w-full text-left p-3 mt-2 bg-white border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-50">
                                Billing & Tax Configuration
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Content (3/4) */}
                    <div className="lg:col-span-3">
                        <div className="p-6 bg-white border border-gray-200 rounded-3xl shadow-xl min-h-[400px]">
                            {renderContent()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- NEW COMPONENT: Marketplace Modal ---
const MarketplaceModal = ({ onClose }) => {
    const [activeTab, setActiveTab] = useState('CoreServices');

    // Helper to render the total price minus discount
    const renderPrice = (product) => {
        const finalPrice = product.price - (product.discount || 0);
        return (
            <div className="text-right">
                <div className="font-black text-xl text-indigo-700 leading-none">
                    ₹{finalPrice.toLocaleString()}
                </div>
                {product.discount > 0 && (
                    <div className="text-xs text-red-500 line-through">
                        ₹{product.price.toLocaleString()}
                    </div>
                )}
            </div>
        );
    }

    const filteredProducts = MARKETPLACE_DATA.products.filter(p => p.type === activeTab);

    return (
        <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
            <div className="bg-white rounded-4xl shadow-4xl max-w-5xl w-full max-h-[95vh] overflow-y-auto transform scale-100 transition-all duration-300">
                
                {/* Header */}
                <div className="p-8 border-b border-blue-100 flex items-center justify-between sticky top-0 bg-white rounded-t-4xl">
                    <h3 className="text-3xl font-black text-gray-900 flex items-center space-x-3">
                        <Tag className="w-8 h-8 text-rose-600" />
                        <span>Marketplace Products & Services</span>
                    </h3>
                    <button onClick={onClose} className="p-3 rounded-full bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-600 transition-all">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-8 space-y-6">
                    {/* Tabs Navigation */}
                    <div className="flex space-x-3 border-b-2 border-gray-100 pb-2 overflow-x-auto">
                        {MARKETPLACE_DATA.tabs.map(tab => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`flex items-center space-x-2 px-4 py-2 text-sm font-bold rounded-xl transition-all whitespace-nowrap ${
                                    activeTab === tab.key
                                        ? 'bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-lg'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {React.createElement(tab.icon, { className: "w-5 h-5" })}
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Product List */}
                    <div className="grid lg:grid-cols-2 gap-6">
                        {filteredProducts.map(product => (
                            <div key={product.id} className="p-6 bg-white border-4 border-gray-100 rounded-3xl shadow-lg hover:shadow-xl hover:border-pink-200 transition-all">
                                <div className="flex items-start space-x-4">
                                    {React.createElement(product.icon, { className: "w-8 h-8 text-indigo-600 flex-shrink-0 mt-1" })}
                                    <div className="flex-grow">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h4 className="font-black text-xl text-gray-900 leading-tight">{product.name}</h4>
                                                <p className="text-sm text-gray-600 mt-1">{product.desc}</p>
                                            </div>
                                            {renderPrice(product)}
                                        </div>

                                        <div className="flex items-center justify-between pt-4 border-t border-dashed mt-2">
                                            <div className="flex space-x-2">
                                                <span className={`text-xs font-bold px-3 py-1 rounded-full ${product.trending === 'Recommended' ? 'bg-emerald-100 text-emerald-800' : product.trending.includes('New') ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'}`}>
                                                    {product.trending}
                                                </span>
                                                <span className={`text-xs font-bold px-3 py-1 rounded-full ${product.availability === 'Low Stock' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-600'}`}>
                                                    {product.availability}
                                                </span>
                                            </div>
                                            <button className="px-5 py-2 bg-rose-600 text-white font-bold rounded-2xl shadow-md hover:bg-rose-700 transition-all flex items-center space-x-2">
                                                <PawPrint className='w-4 h-4'/>
                                                <span>Attach to Pet</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

// --- Component 7: Dashboard (User's provided code, renamed) ---
const Dashboard = ({ onLogout }) => { 
  const [selectedLang, setSelectedLang] = useState('en')
  const [isLangOpen, setIsLangOpen] = useState(false)
  const [showPlayground, setShowPlayground] = useState(false)
  const [showPetModal, setShowPetModal] = useState(false)
  const [selectedPet, setSelectedPet] = useState(null)
  const [showBookingModal, setShowBookingModal] = useState(false); 
  const [showCatalogModal, setShowCatalogModal] = useState(false); 
  const [showMarketplaceModal, setShowMarketplaceModal] = useState(false); // NEW STATE for Marketplace Modal

  // Auto-close language dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
        if (isLangOpen && !event.target.closest('.language-selector-container')) {
            setIsLangOpen(false);
        }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isLangOpen]); 

  const handlePetClick = (petData) => {
    setSelectedPet(petData);
    setShowPetModal(true);
  };

  // Filter languages (currently showing all)
  const filteredLanguages = INDIAN_LANGUAGES.filter(lang => true )

  const getMetricColor = (trend) => {
    if (trend === 'up') return 'text-emerald-600 bg-emerald-100';
    if (trend === 'down') return 'text-red-600 bg-red-100';
    return 'text-gray-600 bg-gray-100';
  };

  // NEW COMPONENT: Detailed SonoSmart Kit Overview (Replaces previous static card)
  const SonoSmartDetailsCard = () => {
    const prediction = SONOSMART_DETAIL_DATA.predictionFocus;
    return (
        <div className="lg:col-span-2 lg:row-span-2 bg-gradient-to-br from-indigo-700 via-blue-700 to-pink-600 text-white rounded-4xl p-10 shadow-3xl border-4 border-white/20 hover:shadow-4xl hover:scale-[1.02] transition-all duration-500 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent h-1 top-0"></div>
            <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-6">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center">
                        <Zap className="w-8 h-8" />
                    </div>
                    <div>
                        <h3 className="text-3xl font-black">SonoSmart Clinical Hub</h3>
                        <p className="text-indigo-200">AI Diagnostics & Workflow Management</p>
                    </div>
                </div>

                {/* AI Prediction Focus */}
                <div className={`p-5 rounded-2xl shadow-xl mb-6 border-4 ${prediction.priority === 'High' ? 'border-rose-300 bg-rose-900/50' : 'border-emerald-300 bg-blue-900/50'}`}>
                    <div className='flex justify-between items-center mb-1'>
                        <span className="font-black text-lg uppercase">Critical Prediction Focus</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-black ${prediction.priority === 'High' ? 'bg-red-500 text-white animate-pulse' : 'bg-emerald-500 text-white'}`}>
                            {prediction.priority} Priority
                        </span>
                    </div>
                    <p className="text-xl font-bold text-yellow-300 mb-1">{prediction.currentPet}: {prediction.prediction}</p>
                    <p className="text-sm text-gray-200 italic">Action: Review Dr. Anya's protocol immediately.</p>
                </div>

                {/* Diagnostic Workflow / Intake Process */}
                <h4 className="text-lg font-bold text-indigo-300 mb-3 border-t pt-4">Diagnostic Intake Workflow</h4>
                <div className="space-y-2 mb-6">
                    {SONOSMART_DETAIL_DATA.intakeProcess.map((step, idx) => (
                        <div key={idx} className="flex justify-between items-center text-sm p-2 rounded-lg bg-white/10 backdrop-blur-sm">
                            <span className="flex items-center space-x-2 font-semibold">
                                {step.status === 'Complete' && <CheckCircle className='w-4 h-4 text-emerald-400'/>}
                                {step.status === 'In Progress' && <RefreshCw className='w-4 h-4 text-yellow-400 animate-spin'/>}
                                {step.status === 'Pending' && <Clock className='w-4 h-4 text-gray-400'/>}
                                <span>{step.step}</span>
                            </span>
                            <span className="text-xs text-indigo-200">{step.time}</span>
                        </div>
                    ))}
                </div>

                {/* KPIs */}
                <h4 className="text-lg font-bold text-indigo-300 mb-3 border-t pt-4">Operational & Clinical KPIs (Last 30 Days)</h4>
                <div className="grid grid-cols-3 gap-3">
                    {SONOSMART_DETAIL_DATA.kpis.map((kpi, idx) => (
                        <div key={idx} className={`p-3 rounded-xl shadow-lg border-2 border-white/30 text-center bg-white/10`}>
                            <div className="text-xs font-semibold text-indigo-200 mb-1 leading-tight">{kpi.metric}</div>
                            <div className="text-xl font-black">{kpi.value}</div>
                            <div className={`text-xs font-bold px-1 rounded-lg mt-1 ${getMetricColor(kpi.trend)}`}>
                                Target: {kpi.target}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/50 to-pink-50/50 font-sans antialiased">
      {showPlayground && <RecommendationPlaygroundModal onClose={() => setShowPlayground(false)} />}
      {showPetModal && selectedPet && <PetConsultationModal petData={selectedPet} onClose={() => setShowPetModal(false)} />}
      {showBookingModal && <BookingSystemModal onClose={() => setShowBookingModal(false)} />} 
      {showCatalogModal && <CatalogManagementModal onClose={() => setShowCatalogModal(false)} />} 
      {showMarketplaceModal && <MarketplaceModal onClose={() => setShowMarketplaceModal(false)} />} {/* NEW MODAL RENDER */}
      
      {/* === POST-LOGIN HEADER === */}
      <header className="bg-white/95 backdrop-blur-xl shadow-lg border-b border-blue-100/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Clinic Branding */}
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-black bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
                  PetJoyClinics<span className="text-pink-500">360</span>
                </h1>
                <p className="text-xs text-blue-600 font-semibold uppercase tracking-wider">
                  {CLINIC_DATA.clinicId} • Connected to PetJoyFeets Care
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="hidden md:flex items-center space-x-6">
              {QUICK_STATS.map((stat, idx) => (
                <div key={idx} className="text-center p-3 bg-white/60 rounded-2xl backdrop-blur-sm border border-blue-100 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-center justify-center mb-1">
                    <stat.icon className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="font-bold text-lg text-gray-900">{stat.value}</span>
                  </div>
                  <div className="text-xs text-gray-600 uppercase tracking-wide">{stat.label}</div>
                  <div className={`text-xs font-bold ${stat.trend.includes('+') ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {stat.trend}
                  </div>
                </div>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <button className="p-3 rounded-2xl bg-gradient-to-r from-pink-100 to-blue-100 hover:from-pink-200 hover:to-blue-200 transition-all shadow-sm">
                  <Bell className="w-5 h-5 text-pink-600" />
                  {PROFESSIONAL_ALERTS.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-pulse">
                      {PROFESSIONAL_ALERTS.length}
                    </span>
                  )}
                </button>
              </div>

              {/* Language Selector */}
              <div className="relative language-selector-container">
                <button
                  onClick={() => setIsLangOpen(prev => !prev)}
                  className="flex items-center space-x-2 px-4 py-2 bg-white rounded-2xl border border-blue-200 shadow-sm hover:shadow-md transition-all"
                >
                  <Globe className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-gray-800">
                    {INDIAN_LANGUAGES.find(l => l.code === selectedLang)?.native || 'EN'}
                  </span>
                </button>
                {isLangOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-blue-100 overflow-hidden z-50 animate-in slide-in-from-top-2">
                    <div className="p-4 border-b border-blue-100">
                      <input
                        type="text"
                        placeholder="Search languages..."
                        className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {filteredLanguages.slice(0, 10).map(lang => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setSelectedLang(lang.code)
                            setIsLangOpen(false)
                          }}
                          className="w-full text-left px-6 py-4 hover:bg-blue-50 border-b border-blue-50 last:border-b-0 flex items-center space-x-4 group"
                        >
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-pink-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Globe className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{lang.name}</div>
                            <div className="text-sm text-gray-500">{lang.native}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Logout/Back to Landing */}
              <button 
                onClick={onLogout}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-800 font-bold rounded-2xl shadow-sm hover:shadow-md transition-all whitespace-nowrap"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* === NEW PROFESSIONAL ALERTS BANNER === */}
        <AlertsBanner alerts={PROFESSIONAL_ALERTS} />

        {/* === MAIN DASHBOARD GRID (4-Column Layout) === */}
        <div className="grid lg:grid-cols-4 gap-8 mb-12">
          
          {/* 1. SONOSMART KITS CARD (2x2) - UPDATED */}
          <SonoSmartDetailsCard />

          {/* 2. DAY PLANNER (1x2) */}
          <div className="lg:col-span-2 bg-white rounded-4xl shadow-2xl border border-blue-100 p-8 hover:shadow-blue-300/50 hover:border-blue-300 transition-all">
            <h3 className="font-black text-xl mb-6 flex items-center space-x-3">
              <Calendar className="w-7 h-7 text-blue-600" />
              <span>Today's Schedule</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full">{TODAY_SCHEDULE.length} slots</span>
            </h3>
            <div className="space-y-4">
              {TODAY_SCHEDULE.map((slot, idx) => (
                <button 
                  key={idx} 
                  onClick={() => handlePetClick(slot.petData)}
                  className="w-full text-left flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-pink-50 rounded-2xl hover:shadow-md hover:ring-2 hover:ring-blue-500 transition-all cursor-pointer group"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold rounded-2xl flex items-center justify-center text-sm group-hover:scale-105 transition-transform">
                      {slot.time}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{slot.type}</div>
                      <div className="text-sm text-gray-600">{slot.doctor}</div>
                    </div>
                  </div>
                  <div className="text-sm font-bold text-blue-600 flex items-center space-x-1">
                    <span>{slot.pet}</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 3. PET MEDICAL REPOSITORY CARD (1x1) */}
          <PetMedicalRepositoryCard />

          {/* 4. INVENTORY MANAGEMENT CARD (1x1) */}
          <InventoryManagementCard />
        </div>
        
        {/* === REMOTE VAN MANAGEMENT (Full Width Banner) === */}
        <div className="mb-12">
            <RemoteVanManagementCard />
        </div>


        {/* === KNOWLEDGE BASE SECTION (Full Width) === */}
        <div className="grid lg:grid-cols-4 gap-8 mb-12">
            <div className="lg:col-span-4 bg-white rounded-4xl shadow-2xl border border-indigo-100 p-10 hover:shadow-indigo-300/50 hover:border-indigo-300 transition-all">
                <h3 className="font-black text-2xl mb-8 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <Book className="w-8 h-8 text-indigo-600" />
                    <span>{KNOWLEDGE_BASE_DATA.title}</span>
                </div>
                <button className="px-6 py-2 bg-indigo-500 text-white text-sm font-bold rounded-2xl hover:bg-indigo-600 transition-all">
                    Add Content +
                </button>
                </h3>
                
                <div className="grid md:grid-cols-4 gap-8">
                {/* Stats */}
                <div className="md:col-span-1 space-y-4">
                    <h4 className="text-lg font-bold text-gray-700 mb-4 border-b pb-2">Content Library</h4>
                    {KNOWLEDGE_BASE_DATA.stats.map((stat, idx) => (
                    <div key={idx} className={`p-4 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-between`}>
                        <span className={`text-md font-semibold text-blue-800`}>{stat.label}</span>
                        <span className={`text-3xl font-black text-blue-600`}>{stat.value}</span>
                    </div>
                    ))}
                    <button className="w-full py-3 mt-4 bg-gray-100 text-gray-700 font-bold rounded-2xl hover:bg-gray-200 transition-all">
                        All Guides
                    </button>
                </div>

                {/* Trending Content List */}
                <div className="md:col-span-3">
                    <h4 className="text-lg font-bold text-gray-700 mb-4 border-b pb-2">Trending & Relevant for Pet Parents</h4>
                    <div className="space-y-3">
                    {KNOWLEDGE_BASE_DATA.trendingContent.map((content, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-white hover:shadow-sm transition-all">
                            <div className="flex items-center space-x-3">
                                {React.createElement(content.icon, { className: "w-5 h-5 text-indigo-500 flex-shrink-0" })}
                                <div>
                                    <div className="font-semibold text-gray-900">{content.title}</div>
                                    <div className="text-xs text-gray-500">
                                        {content.category} • <span className="font-bold">{content.level}</span>
                                    </div>
                                </div>
                            </div>
                            {content.trending && (
                                <div className="flex items-center space-x-1 text-xs font-bold text-pink-600 px-3 py-1 bg-pink-100 rounded-full">
                                    <TrendingUp className="w-3 h-3" />
                                    <span>Trending</span>
                                </div>
                            )}
                            {!content.trending && (
                                <div className="text-sm text-blue-500 font-semibold cursor-pointer hover:underline">
                                    Attach
                                </div>
                            )}
                        </div>
                    ))}
                    </div>
                </div>
                </div>
            </div>
        </div>

        {/* === LOWER SECTION - Analytics & Quick Actions (Grid lg:grid-cols-4) === */}
        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* === Data & Insights Dashboard (3/4 width) === */}
          <div className="lg:col-span-3">
            <DataInsightsDashboard />
          </div>

          {/* === Quick Actions Stack (1/4 width) === */}
          <div className="lg:col-span-1 space-y-4">
            
            {/* AI-POWERED RECOMMENDATION ENGINE (Vertical action card) */}
            <div className="bg-white rounded-4xl shadow-2xl border border-rose-100 p-8 space-y-4 hover:shadow-rose-300/50 hover:border-rose-300 transition-all">
              <h4 className="font-black text-xl mb-4 flex items-center space-x-2">
                <Zap className="w-6 h-6 text-rose-600" />
                <span>AI Recommender</span>
              </h4>
              <p className="text-sm text-gray-600">Predicted revenue potential: <span className="font-black text-lg text-blue-600">{RECOMMENDATION_ENGINE_DATA.stats[1].value}</span></p>
              <button 
                onClick={() => setShowPlayground(true)}
                className="w-full py-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:scale-105"
              >
                Launch Playground →
              </button>
            </div>

            {/* Marketplace Button (NEW) */}
            <button 
              onClick={() => setShowMarketplaceModal(true)}
              className="w-full bg-gradient-to-r from-emerald-500 to-green-500 text-white p-8 rounded-4xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all cursor-pointer flex flex-col items-center space-y-4"
            >
              <h4 className="font-black text-xl">Marketplace</h4>
              <p className="text-green-100 text-sm">Sell Products & Specialized Services</p>
              <Tag className="w-16 h-16 opacity-80" />
            </button>
            
            {/* Catalog Management Button */}
            <button 
              onClick={() => setShowCatalogModal(true)}
              className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white p-8 rounded-4xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all cursor-pointer flex flex-col items-center space-y-4"
            >
              <h4 className="font-black text-xl">Service & Account Setup</h4>
              <p className="text-blue-100 text-sm">Manage Fees, Staff, and Scheduling</p>
              <Settings className="w-16 h-16 opacity-80" />
            </button>


            {/* New Booking (UPDATED to launch modal) */}
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white p-8 rounded-4xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all cursor-pointer">
              <h4 className="font-black text-xl mb-4">New Booking</h4>
              <p className="text-pink-100 mb-6">Real-time queue</p>
              <Calendar className="w-16 h-16 mx-auto mb-4 opacity-80" />
              <button 
                onClick={() => setShowBookingModal(true)}
                className="w-full bg-white/20 backdrop-blur-sm py-3 px-6 rounded-3xl font-bold border-2 border-white/30 hover:bg-white/30 transition-all"
              >
                Add Slot / View Queue
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}


// --- Component 8: Root App (Handles Routing) ---
export default function App() {
  // State to manage which view is active: 'landing' or 'dashboard'
  const [currentPage, setCurrentPage] = useState('landing'); 

  if (currentPage === 'landing') {
    return <LandingPage onLogin={() => setCurrentPage('dashboard')} />;
  }

  return <Dashboard onLogout={() => setCurrentPage('landing')} />;
}