'use client';

import React, { useState, useEffect } from 'react'
import { Home, Info, Heart, LayoutList, Users, MessageSquare, Calendar, Download, LogIn, Store, Truck, Stethoscope, BookOpen, Globe, Search, X, CheckCircle, Clock, Smile, Zap, ChevronLeft, ChevronRight, HappyFeetPrint, ShieldCheck, ClipboardList, Video, HeartHandshake, Syringe, Bug, Dog, Activity, ShoppingCart, UserPlus, Star, MapPin, Tablet, AppWindow, Building2, Briefcase, Droplet, Monitor, Mic, Smile as PetCounselorIcon, Rss, Instagram, Facebook, Linkedin, Lock, User, UserCheck, CheckSquare, Server, Shield, Menu, ChevronDown, Headset, Brain, TrendingUp, BarChart3, Users as PlatformUsers, PawPrint, Sun, Cloud, Moon, Feather } from 'lucide-react'

// Utility function to scroll to a section by ID
const scrollToSection = (id, subId = null) => {
  const targetId = subId ? `${id}#${subId}` : id;
  const el = document.getElementById(targetId);
  if (el) el.scrollIntoView({ behavior: 'smooth' });

  // Special handling for hash-based sections
  if (id === 'marketplace' || id === 'remoteconsult' || id === 'specialist') {
    if (typeof window !== 'undefined') {
        window.history.pushState(null, '', `#${targetId}`);
    }
  } else if (typeof window !== 'undefined') {
      window.history.pushState(null, '', `#${id}`);
  }
};

const FAQSection = () => {
    const faqs = [
      {
        category: "Dogs",
        q: "What causes ear infections in dogs and how are they treated?",
        a: "Ear infections usually result from bacteria, yeast, or allergies. Treatment involves cleaning, medication, and addressing underlying causes."
      },
      {
        category: "Cats",
        q: "How to prevent and treat flea infestations in cats?",
        a: "Regular flea control medications and good hygiene help keep fleas away. Always check with your vet for the best options for your pet."
      },
      {
        category: "Cows",
        q: "What is brucellosis and how does it affect cows?",
        a: "Brucellosis is a bacterial infection that can cause reproductive failure and abortion in cows. Strict biosecurity measures and vaccination programs help prevent its spread."
      },
      {
        category: "Goats",
        q: "What is campylobacteriosis and its impact on goats?",
        a: "Campylobacteriosis is a bacterial infection that may cause abortion and diarrhea in goats. Hygienic farm practices and proper management can reduce the risk."
      },
      {
        category: "Birds",
        q: "How to handle trauma cases in birds?",
        a: "Trauma in birds should be treated as an emergency. Immediate veterinary care is needed to stabilize injuries and plan treatment."
      },
      {
        category: "Chickens",
        q: "What causes fowl pox and how to control it?",
        a: "Fowl pox is a viral skin disease of chickens. Vaccination and effective insect control help reduce and prevent outbreaks."
      },
      {
        category: "General",
        q: "When should I take my pet to the vet for a check-up?",
        a: "Most pets benefit from at least annual check-ups, and some need biannual visits. Go to the vet sooner if you notice worrying symptoms or behavior changes."
      },
      {
        category: "General",
        q: "How do I know if my pet is in pain or discomfort?",
        a: "Common signs of pain include whining, limping, hiding, reduced appetite, restlessness, or aggression. If you notice these, contact a veterinarian promptly."
      },
      {
        category: "General",
        q: "What vaccinations does my pet need and how often?",
        a: "Core vaccines depend on species, age, and local disease risks. Many pets need booster shots every one to three years, following your vet’s schedule."
      },
      {
        category: "General",
        q: "Can I give my pet over-the-counter medication?",
        a: "Human over-the-counter medicines can harm pets. Always speak to your veterinarian before giving any medication."
      },
      {
        category: "General",
        q: "My pet has bad breath. Is that a concern?",
        a: "Persistent bad breath can signal dental disease or infection. A veterinary dental check-up is recommended."
      },
      {
        category: "General",
        q: "How can I help my pet maintain a healthy weight?",
        a: "Balanced nutrition and regular exercise are essential. Your vet can design a tailored diet and activity plan for your pet."
      },
      {
        category: "General",
        q: "How do I prepare my pet for a vet visit?",
        a: "Bring previous records, keep your own behaviour calm, and use a secure carrier or leash. This helps make the visit safer and less stressful."
      },
      {
        category: "General",
        q: "My pet is acting unusually. Should I worry?",
        a: "Sudden changes in behaviour often indicate illness, pain, or stress. It is safest to have your pet examined by a vet."
      },
      {
        category: "General",
        q: "What are common signs of illness in pets?",
        a: "Warning signs include lethargy, vomiting, diarrhea, loss of appetite, coughing, breathing changes, or changes in urination and thirst."
      },
      {
        category: "General",
        q: "Can I give my pet human food as treats?",
        a: "Some human foods are safe in small amounts, but many are toxic. Always confirm with your vet which treats are safe for your pet."
      }
    ];
  
    return (
      <section id="faq" className="py-16 px-4 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4 text-center">
            Frequently Asked Questions
          </h2>
          <p className="text-center text-gray-600 mb-10">
            Quick answers to common pet health questions across species, to help you decide when to seek veterinary care.
          </p>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-blue-100 rounded-xl shadow-sm hover:shadow-md transition p-4"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-500 mb-1">
                  {item.category}
                </p>
                <p className="text-sm font-semibold text-gray-900 mb-2">
                  Q: {item.q}
                </p>
                <p className="text-sm text-gray-800">
                  A: {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  

// --- Helper Function for Pricing & Discount ---
const generateBookingDetails = (isProduct = false, isRemoteVan = false) => {
    // Generate base price (Consultation/Service: 500-1300 INR; Product: 100-600 INR; Remote Van: 1000-2500 INR)
    let basePrice;
    if (isRemoteVan) {
        basePrice = Math.floor(Math.random() * 1500) + 1000;
    } else if (isProduct) {
        basePrice = Math.floor(Math.random() * 500) + 100;
    } else {
        basePrice = Math.floor(Math.random() * 800) + 800; 
    }
    
    // Generate discount rate (0% to 5%)
    const discountRate = Math.floor(Math.random() * 6); 
    const finalPrice = basePrice * (1 - discountRate / 100);
    const discountText = discountRate > 0 ? `${discountRate}% OFF` : "Standard Rate";

    // Generate upcoming dates (next 3-7 days)
    const availableDates = [];
    for (let i = 0; i < (Math.floor(Math.random() * 5) + 3); i++) {
        const date = new Date();
        date.setDate(date.getDate() + i);
        availableDates.push(date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }));
    }

    return {
        basePrice: `₹${basePrice.toFixed(0)}`,
        finalPrice: `₹${finalPrice.toFixed(0)}`,
        discountText: discountText,
        earlyAvailability: availableDates[0] || "Next Week",
        availableDates: availableDates,
        distance: `${(Math.random() * 5 + 0.5).toFixed(1)} mi` // Added distance for relevance
    };
};

// --- Navigation Data (Used by NavigationHeader) ---

// ROW1 now includes all primary navigation items
const ROW1 = [
  { label: "Home", id: "home", Icon: Home, color: "text-blue-600" },
  { label: "About", id: "about", Icon: Info, color: "text-green-600" },
  { label: "Services", id: "services", Icon: Heart, color: "text-red-600" },
  { label: "Pets Gallery", id: "gallery", Icon: LayoutList, color: "text-purple-600" },
  { label: "Our Specialist", id: "specialist", Icon: Users, color: "text-indigo-600" }, 
  { label: "Testimonials", id: "testimonials", Icon: MessageSquare, color: "text-pink-600" },
  { label: "Book Now", id: "booknow", Icon: Calendar, color: "text-orange-600" },
  { label: "Download App", id: "downloadapp", Icon: Download, color: "text-teal-600" },
  { label: "Commitment", id: "security-trust", Icon: Lock, color: "text-cyan-600" }, // NEW LINK
  { label: "Login", id: "login", Icon: LogIn, color: "text-gray-600" }
];

const ROW2 = [
  { label: "Marketplace", id: "marketplace", Icon: Store },
  { label: "Remote Van", id: "remotevan", Icon: Truck }, 
  { label: "Home Care", id: "homecare", Icon: Home }, 
  { label: "Remote Consult", id: "remoteconsult", Icon: Stethoscope }, 
  { label: "Knowledge Platform", id: "knowledge", Icon: BookOpen }
];

const LANGUAGES = [
  "English", "Hindi", "Bengali", "Telugu", "Marathi", "Tamil", "Urdu", "Gujarati", "Kannada", "Malayalam"
];

// Global definition for modal metrics (high demo numbers)
const modalMetrics = {
    chat: [
        { label: "Avg. Resolution Time", value: "3.8 mins", Icon: Clock, color: "teal" },
        { label: "Daily Issues Handled", value: "5,100+", Icon: Zap, color: "indigo" },
    ],
    enquiry: [
        { label: "Customer Satisfaction", value: "98.5%", Icon: Smile, color: "purple" }, 
        { label: "Zero-Visit Resolution", value: "85%", Icon: CheckCircle, color: "green" },
    ],
    whatsapp: [
        { label: "Avg. Response Time", value: "< 45 sec", Icon: Zap, color: "green" },
        { label: "Total Conversations", value: "15,000+", Icon: Users, color: "purple" },
    ],
};

// --- Carousel Data for Home Section (Updated with STABLE Placeholder URLs) ---
const CAROUSEL_ADS = [
    // NEW PROMO: Platform KPI Demo
  {
    type: 'kpi', // Special flag for KPI slide
    title: "PetJoyFeets Impact: Trusted by Millions",
    subtitle: "Delivering excellence in pet care through verified metrics.",
    action: "Join the Community",
    id: "login",
    kpiData: [
        { label: "Pets Cared On Platform", value: "85,400+", Icon: PawPrint },
        { label: "Vets Onboarded", value: "1,250+", Icon: Stethoscope },
        { label: "Clinics Onboarded", value: "350+", Icon: Building2 },
        { label: "Parent Satisfaction", value: "98.4%", Icon: Smile },
        { label: "Daily Consultations", value: "2,800+", Icon: MessageSquare },
        { label: "Instant Booking", value: "99.9%", Icon: CheckCircle },
        { label: "24/7 Response", value: "< 1 min", Icon: Headset },
        { label: "Daily Active Users", value: "12,500+", Icon: PlatformUsers },
        { label: "Remote Tx Done", value: "42,000+", Icon: Activity },
    ]
  },
  {
    title: "Consult a PET Doctor Anytime, Anywhere!",
    subtitle: "Get instant expert advice and peace of mind, while pets receive timely care for any concern.",
    action: "Start Remote Consult",
    imageUrl: "/promo_pet_1.png", // Teal for Medical
    id: "remoteconsult", Icon: Stethoscope
  },
  {
    title: "Set Up Your Virtual Clinic",
    subtitle: "Vets can expand their medical services in minutes and reach more families remotely.",
    action: "Register as Vet",
    imageUrl: "/promo_pet_setup.png", // Indigo for Tech/Setup
    id: "login", Icon: Zap
  },
  {
    title: "Comprehensive Pet Knowledge Hub",
    subtitle: "Parents gain easy access to trusted wellness tips, training guides, and answers.",
    action: "Explore Knowledge",
    imageUrl: "/promo_pet_knowledgehub.png", // Orange for Education
    id: "knowledge", Icon: BookOpen
  },
  {
    title: "Remote Consultation (Video/Audio)",
    subtitle: "Quick resolutions for your pet’s health needs—no travel, less stress, and faster recovery.",
    action: "Book a Session",
    imageUrl: "/promo_pet_remote.png", // Purple for Communication
    id: "remoteconsult", Icon: Video
  },
  {
    title: "Home Care (Same-Day Expert Visits)",
    subtitle: "Pets get comfort-focused treatment in familiar surroundings, making recovery smoother.",
    action: "Schedule Home Care",
    imageUrl: "/promo_pet_home_care.png", // Teal for Medical
    id: "homecare", Icon: Home
  },
  {
    title: "Marketplace for Products & Walkers",
    subtitle: "Discover high-quality food, medicines, and services all in one convenient spot.",
    action: "Shop Now",
    imageUrl: "/promo_pet_mrktplace.png", // Red for Marketplace
    id: "marketplace", Icon: Store
  },
  {
    title: "Download App (24/7 Access)",
    subtitle: "Continuous help, health monitoring, records, and support from anywhere—always within reach.",
    action: "Download App",
    imageUrl: "/promo_pet_download.png", // Dark Blue for App
    id: "downloadapp", Icon: Download
  },
  {
    title: "Book Now (Instant Appointments)",
    subtitle: "Parents schedule pet treatments quickly, ensuring faster solutions and avoiding unnecessary waits.",
    action: "Book Appointment",
    imageUrl: "/promo_pet_instant.png", // Amber for Booking
    id: "booknow", Icon: Calendar
  },
  {
    title: "Testimonials from Happy Pet Parents",
    subtitle: "Build confidence and trust from real stories, helping new users feel secure in their choice of care.",
    action: "See Reviews",
    imageUrl: "/promo_pet_testimonial.png", // Cyan for Trust
    id: "testimonials", Icon: MessageSquare
  },
  {
    title: "Pets Gallery (Healthy Pets and Proud Owners)",
    subtitle: "See the joy and progress of other pets and parents—motivating you to join a caring community.",
    action: "View Gallery",
    imageUrl: "/promo_pet_gallery.png", // Violet for Community
    id: "gallery", Icon: LayoutList
  },
  {
    title: "Multilingual Teaching Videos (22 languages)",
    subtitle: "Learn best pet care practices in your preferred language for easier, more effective parenting.",
    action: "Watch Videos",
    imageUrl: "/promo_pet_tarining.png", // Indigo for Learning
    id: "knowledge", Icon: Globe
  },
  {
    title: "Pet Vaccine Schedules & Reminders",
    subtitle: "Keep pets protected and up-to-date, preventing illness and reducing health risks.",
    action: "Manage Vaccines",
    imageUrl: "/promo_pet_vaccine.png", // Dark Teal for Health
    id: "booknow", Icon: ShieldCheck
  },
  {
    title: "Supported Pet Types: Dogs, Cats, Cows, Birds, Rabbits, Fish, Goats, Chickens.",
    subtitle: "Every pet in your family receives specialized, comprehensive attention—no one is left out!",
    action: "See Services",
    imageUrl: "/promo_pet_types.png", // Orange for Diversity
    id: "services", Icon: Users
  },
  {
    title: "Register Pet for Digital Records & Alerts",
    subtitle: "Your pet gets a unique ID and secure medical file; you receive personalized reminders and instant alerts.",
    action: "Register Pet",
    imageUrl: "/promo_pet_register.png", // Deep Purple for Records
    id: "login", Icon: ClipboardList
  },
];

// --- Marketplace Data Structure (Used by Marketplace and Testimonials) ---

const MARKETPLACE_DATA = [
    { title: "Pet Adoption", icon: HeartHandshake, id: "adoption", theme: "green", listings: [
        { name: "Friendly Labrador Puppy (4 mo)", distance: "5.0 mi", google: 4.9, platform: 4.9, type: 'service' },
        { name: "Senior Calico Cat (8 yr)", distance: "3.2 mi", google: 4.8, platform: 5.0, type: 'service' },
        { name: "Bonded Pair Rabbits", distance: "10.0 mi", google: 4.7, platform: 4.8, type: 'service' },
        { name: "Shelter: Happy Paws Rescue", distance: "1.7 mi", google: 4.9, platform: 5.0, type: 'service' },
    ]},
    { title: "Pet Rehoming / Sale", icon: HeartHandshake, id: "rehoming", theme: "pink", listings: [
        { name: "Verified Registered Breeders (Dog)", distance: "5.0 mi", google: 4.9, platform: 4.9, type: 'service' },
        { name: "Ethical Rehoming Consultation", distance: "Remote", google: 4.8, platform: 5.0, type: 'service' },
        { name: "Safe Sale & Transfer Support", distance: "Remote", google: 4.7, platform: 4.8, type: 'service' },
        { name: "Puppy Temperament Assessment", distance: "1.7 mi", google: 4.9, platform: 5.0, type: 'service' },
    ]},
    { title: "Pet Lost & Found", icon: MapPin, id: "lostfound", theme: "red", listings: [
        { name: "Emergency Alert Posting Service", distance: "Remote", google: 4.9, platform: 4.8, type: 'service' },
        { name: "Microchip Scan Station Network", distance: "0.5 mi", google: 4.8, platform: 4.9, type: 'service' },
        { name: "Pet Return Hotline (24/7)", distance: "Remote", google: 4.9, platform: 4.9, type: 'service' },
        { name: "Community Pet Safety Workshop", distance: "1.2 mi", google: 5.0, platform: 5.0, type: 'service' },
    ]},
    { title: "Pet Food & Nutrition", icon: ShoppingCart, id: "food", theme: "orange", listings: [
        { name: "Premium Kibble (Large Dog)", distance: "0.5 mi", google: 4.9, platform: 4.8, type: 'product' },
        { name: "Prescription Diet (Feline Renal)", distance: "1.2 mi", google: 4.7, platform: 4.9, type: 'product' },
        { name: "Wet Food Subscription (Monthly)", distance: "Remote", google: 4.8, platform: 4.7, type: 'product' },
        { name: "Grain-Free Puppy Food (10kg)", distance: "0.9 mi", google: 4.6, platform: 4.5, type: 'product' },
    ]},
    { title: "Pet Schools & Classes", icon: BookOpen, id: "schools", theme: "indigo", listings: [
        { name: "Puppy Kindergarten (6 weeks)", distance: "1.0 mi", google: 4.9, platform: 4.8, type: 'service' },
        { name: "Advanced Obedience School", distance: "3.0 mi", google: 4.7, platform: 4.9, type: 'service' },
        { name: "Agility Training Classes (Intermediate)", distance: "2.5 mi", google: 4.9, platform: 5.0, type: 'service' },
        { name: "Separation Anxiety Workshop", distance: "Remote", google: 5.0, platform: 5.0, type: 'service' },
    ]},
    { title: "Pet Hotel & Boarding", icon: Building2, id: "hotel", theme: "cyan", listings: [
        { name: "Luxury Dog Boarding (5-day)", distance: "2.1 mi", google: 4.9, platform: 4.8, type: 'service' },
        { name: "Cat Condos (Weekend Stay)", distance: "0.8 mi", google: 4.8, platform: 4.7, type: 'service' },
        { name: "Dog Daycare (Full Day)", distance: "1.2 mi", google: 4.9, platform: 4.9, type: 'service' },
        { name: "Medical Boarding Facility", distance: "5.0 mi", google: 4.6, platform: 4.5, type: 'service' },
    ]},
    { title: "Wanna Be Pet Parent", icon: UserPlus, id: "newparent", theme: "indigo", listings: [
        { name: "First-Time Dog Owner Guide", distance: "Remote", google: 4.9, platform: 4.8, type: 'service' },
        { name: "Choosing the Right Breed Quiz", distance: "Remote", google: 4.8, platform: 4.9, type: 'service' },
        { name: "Puppy Proofing Consultation", distance: "1.8 mi", google: 4.9, platform: 4.9, type: 'service' },
        { name: "Vaccine Schedule Planner", distance: "Remote", google: 5.0, platform: 5.0, type: 'service' },
    ]},
    { title: "Pet Medicine", icon: Syringe, id: "medicine", theme: "red", listings: [
        { name: "Flea & Tick Prevention (3 mo)", distance: "0.5 mi", google: 4.9, platform: 4.8, type: 'product' },
        { name: "Joint Support Supplement", distance: "1.2 mi", google: 4.7, platform: 4.9, type: 'product' },
        { name: "Worming Tablets (Large Dog)", distance: "2.5 mi", google: 4.8, platform: 4.7, type: 'product' },
        { name: "Allergy Relief Chews", distance: "0.9 mi", google: 4.6, platform: 4.5, type: 'product' },
    ]},
    { title: "Pet Clinics", icon: Heart, id: "clinics", theme: "cyan", listings: [
        { name: "City Animal Hospital", distance: "0.5 mi", google: 4.9, platform: 4.7, type: 'service' },
        { name: "Paws & Whiskers Clinic", distance: "1.2 mi", google: 4.8, platform: 4.9, type: 'service' },
        { name: "Emergency Vet 24/7", distance: "3.5 mi", google: 4.5, platform: 4.6, type: 'service' },
        { name: "Mobile Vet Services (Local)", distance: "0.8 mi", google: 4.9, platform: 4.9, type: 'service' },
    ]},
    { title: "Pet Doctor", icon: Stethoscope, id: "doctor", theme: "teal", listings: [
        { name: "Dr. Aarthi (General Practice)", distance: "0.5 mi", google: 4.9, platform: 4.8, type: 'service' },
        { name: "Dr. Ben (Pediatric Specialist)", distance: "1.2 mi", google: 4.8, platform: 4.9, type: 'service' },
        { name: "Dr. Emily (Telemedicine)", distance: "Remote", google: 4.9, platform: 5.0, type: 'service' },
        { name: "Dr. Jake (Mobile Visit)", distance: "0.8 mi", google: 4.9, platform: 4.9, type: 'service' },
    ]},
    { title: "Pet Walker", icon: Dog, id: "walker", theme: "amber", listings: [
        { name: "Happy Paws Walkers (2.1 mi)", distance: "2.1 mi", google: 4.9, platform: 4.8, type: 'service' },
        { name: "Urban Canine Treks (Licensed)", distance: "1.5 mi", google: 4.7, platform: 4.9, type: 'service' },
        { name: "Solo Dog Walks by Jane (0.8 mi)", distance: "0.8 mi", google: 5.0, platform: 5.0, type: 'service' },
        { name: "Senior Dog Support Walks", distance: "5.0 mi", google: 4.7, platform: 4.9, type: 'service' },
    ]},
    { title: "Pet Trainer", icon: Activity, id: "trainer", theme: "purple", listings: [
        { name: "Basic Obedience Course", distance: "1.0 mi", google: 4.9, platform: 4.8, type: 'service' },
        { name: "Advanced Agility Training", distance: "3.0 mi", google: 4.7, platform: 4.9, type: 'service' },
        { name: "Behavioral Correction (Remote)", distance: "Remote", google: 4.9, platform: 5.0, type: 'service' },
        { name: "In-Home Personalized Training", distance: "0.9 mi", google: 5.0, platform: 5.0, type: 'service' },
    ]},
    { title: "Pet Parent Counselor", icon: Users, id: "parentcounselor", theme: "yellow", listings: [
        { name: "Grief & Loss Support Group", distance: "Remote", google: 4.9, platform: 4.8, type: 'service' },
        { name: "Coping with Illness Guidance", distance: "Remote", google: 4.8, platform: 4.7, type: 'service' },
        { name: "Financial Planning for Pets", distance: "Remote", google: 4.9, platform: 5.0, type: 'service' },
        { name: "Wellness Check-in Call", distance: "Remote", google: 4.8, platform: 4.7, type: 'service' },
    ]},
    { title: "Pet Counselor", icon: Users, id: "petcounselor", theme: "pink", listings: [
        { name: "Behavioral Assessment (Aggression)", distance: "Remote", google: 4.9, platform: 4.8, type: 'service' },
        { name: "Anxiety Management Plan", distance: "Remote", google: 4.7, platform: 4.9, type: 'service' },
        { name: "Litter Box Avoidance Strategy", distance: "Remote", google: 4.9, platform: 5.0, type: 'service' },
        { name: "Senior Cognitive Decline Support", distance: "Remote", google: 4.8, platform: 4.7, type: 'service' },
    ]},
    { title: "Pet Parent Personalized Knowledge Hub", icon: BookOpen, id: "parentknowledge", theme: "indigo", listings: [
        { name: "Personalized Daily Tips Subscription", distance: "Remote", google: 4.9, platform: 4.8, type: 'product' },
        { name: "Curated Article Digest", distance: "Remote", google: 4.9, platform: 5.0, type: 'product' },
        { name: "Custom Diet Planner Access", distance: "Remote", google: 4.6, platform: 4.7, type: 'product' },
        { name: "Advanced First Aid Video Course", distance: "Remote", google: 4.8, platform: 4.9, type: 'product' },
    ]},
    { title: "Pet Multilingual Video", icon: Video, id: "multivideo", theme: "blue", listings: [
        { name: "Basic Obedience in Hindi", distance: "Remote", google: 4.9, platform: 4.8, type: 'product' },
        { name: "Cat Grooming in Bengali", distance: "Remote", google: 4.7, platform: 4.9, type: 'product' },
        { name: "Puppy Health in Telugu", distance: "Remote", google: 4.8, platform: 4.7, type: 'product' },
        { name: "Senior Care in Marathi", distance: "Remote", google: 4.9, platform: 5.0, type: 'product' },
    ]},
    { title: "Pet Dating", icon: Heart, id: "dating", theme: "pink", listings: [
        { name: "Poodle Playdate Group", distance: "1.2 mi", google: 4.9, platform: 4.8, type: 'service' },
        { name: "Senior Dog Social Hour", distance: "2.5 mi", google: 4.7, platform: 4.9, type: 'service' },
        { name: "Puppy Park Meetup", distance: "0.5 mi", google: 4.9, platform: 5.0, type: 'service' },
        { name: "Cat Cafe Visit", distance: "1.8 mi", google: 4.9, platform: 5.0, type: 'service' },
    ]},
    { title: "Professional Grooming", icon: Bug, id: "grooming", theme: "gray", listings: [
        { name: "Full Dog Spa Package", distance: "1.1 mi", google: 4.9, platform: 4.8, type: 'service' },
        { name: "Mobile Grooming Van", distance: "0.5 mi", google: 4.8, platform: 4.7, type: 'service' },
        { name: "De-shedding Treatment", distance: "3.2 mi", google: 4.9, platform: 5.0, type: 'service' },
        { name: "Nail Clipping Only (Quick)", distance: "1.5 mi", google: 4.6, platform: 4.7, type: 'service' },
    ]},
    { title: "Nutrition & Wellness", icon: Heart, id: "nutrition", theme: "green", listings: [
        { name: "Custom Diet Plan (Vet-Approved)", distance: "Remote", google: 4.9, platform: 4.8, type: 'service' },
        { name: "Weight Management Program", distance: "Remote", google: 4.7, platform: 4.9, type: 'service' },
        { name: "Senior Nutrition Consultation", distance: "Remote", google: 4.9, platform: 5.0, type: 'service' },
        { name: "Preventive Wellness Check", distance: "1.0 mi", google: 4.8, platform: 4.9, type: 'service' },
    ]},
    { title: "Reliable Pet Sitting", icon: Dog, id: "petsitting", theme: "blue", listings: [
        { name: "In-Home Overnight Sitting", distance: "1.2 mi", google: 4.9, platform: 4.8, type: 'service' },
        { name: "Daily Drop-in Visits (Cats)", distance: "0.5 mi", google: 4.7, platform: 4.9, type: 'service' },
        { name: "Vet-Trained Pet Sitter", distance: "2.5 mi", google: 4.9, platform: 5.0, type: 'service' },
        { name: "Holiday Pet Sitting", distance: "1.9 mi", google: 4.9, platform: 5.0, type: 'service' },
    ]},
    { title: "Pet-welfare Subsidies or Support", icon: HeartHandshake, id: "subsidies", theme: "yellow", listings: [
        { name: "Vaccination Assistance Program", distance: "Remote", google: 4.9, platform: 4.8, type: 'service' },
        { name: "Emergency Fund Application Help", distance: "Remote", google: 4.7, platform: 4.9, type: 'service' },
        { name: "Spay/Neuter Voucher", distance: "Remote", google: 4.8, platform: 4.7, type: 'service' },
        { name: "Senior Pet Discount", distance: "Remote", google: 4.9, platform: 5.0, type: 'service' },
    ]},
    { title: "Pet Accessories", icon: ShoppingCart, id: "acc", theme: "orange", listings: [
        { name: "Luxury Memory Foam Bed", distance: "2.1 mi", google: 4.8, platform: 4.9, type: 'product' },
        { name: "Puppy Chew Toys (3-pack)", distance: "0.8 mi", google: 4.9, platform: 5.0, type: 'product' },
        { name: "Automatic Pet Feeder", distance: "1.2 mi", google: 4.9, platform: 4.9, type: 'product' },
        { name: "GPS Tracking Collar", distance: "5.0 mi", google: 4.6, platform: 4.5, type: 'product' },
    ]},
];

// --- Testimonials Data Structure ---

const TESTIMONIALS_DATA = [
    { 
        title: "Pet Adoption", 
        id: "adoption", 
        theme: "green",
        reviews: [
            { rating: 5.0, quote: "Found my loving cat companion easily! The digital records made the adoption process seamless.", user: "Priya S. (Mumbai)" },
            { rating: 4.9, quote: "My family now has a Beagle puppy! The platform provided great guidance on responsible pet ownership.", user: "Ahmed K. (Delhi)" },
            { rating: 5.0, quote: "एक बेहतरीन अनुभव, मुझे मेरे खरगोश मिल गए। (A great experience, I found my rabbit.)", user: "Rajan M. (Lucknow)", lang: "Hindi" },
        ]
    },
    { 
        title: "Pet Rehoming / Sale", 
        id: "rehoming", 
        theme: "pink",
        reviews: [
            { rating: 5.0, quote: "The verified breeder feature gave me peace of mind when choosing our new puppy. Highly ethical providers.", user: "Manish R. (Pune)" },
            { rating: 4.9, quote: "Found a loving new family for my senior cat quickly and securely after a personalized consultation.", user: "Zara L. (Bangalore)" },
            { rating: 4.8, quote: "Process for legally rehoming my parrot was clear and secure, ensuring a good match.", user: "Vijay T. (Chennai)" },
        ]
    },
    { 
        title: "Pet Lost & Found", 
        id: "lostfound", 
        theme: "red",
        reviews: [
            { rating: 5.0, quote: "The emergency alert system instantly helped locate my runaway Beagle. Pet was found within hours!", user: "Kavita S. (Mumbai)" },
            { rating:9, quote: "Received a notification when my cat's microchip was scanned miles away. Safe return!", user: "Ben M. (Delhi)" },
            { rating: 5.0, quote: "The community alerts on the platform are incredibly effective and give peace of mind.", user: "Arjun P. (Hyderabad)" },
        ]
    },
    { 
        title: "Pet Food & Nutrition", 
        id: "food", 
        theme: "orange",
        reviews: [
            { rating: 5.0, quote: "The vet prescribed diet was cheaper and delivered faster than my usual pharmacy. Huge time saver!", user: "Sunil D. (Pune)" },
            { rating: 4.9, quote: "Great subscription service! My dog loves the premium kibble, and I never run out of stock.", user: "Gary P. (Kolkata)" },
            { rating: 4.8, quote: "Found a comprehensive guide on transitioning to wet food for my fussy cat.", user: "Priya T. (Jaipur)" },
        ]
    },
    { 
        title: "Pet Schools & Classes", 
        id: "schools", 
        theme: "indigo",
        reviews: [
            { rating: 5.0, quote: "Puppy kindergarten was invaluable; my dog is much calmer now and learned all the basics quickly.", user: "Hannah W. (Surat)" },
            { rating: 4.9, quote: "The trainer was excellent, and the separation anxiety workshop changed our lives. Remote learning was effective!", user: "Leon K. (Jaipur)" },
            { rating: 4.8, quote: "Advanced agility classes booked easily through the app. The venue was superb.", user: "Kala D. (Chennai)", lang: "Tamil" },
        ]
    },
    { 
        title: "Pet Hotel & Boarding", 
        id: "hotel", 
        theme: "cyan",
        reviews: [
            { rating: 5.0, quote: "My dog had a luxury stay at the hotel found on the app, complete with daily photo updates and activities.", user: "David C. (Pune)" },
            { rating: 4.9, quote: "Medical boarding for my rabbit was handled professionally and with great care while I was away.", user: "Fiona G. (Noida)" },
            { rating: 4.8, quote: "Daycare booking is seamless and reliable. My dog is exhausted and happy when he comes home!", user: "Vimal R. (Patna)", lang: "Hindi" },
        ]
    },
    { 
        title: "Wanna Be Pet Parent", 
        id: "newparent", 
        theme: "indigo",
        reviews: [
            { rating: 4.8, quote: "The starter guides helped us budget and puppy-proof our home before our Labrador arrived.", user: "Jessica L. (Bengaluru)" },
            { rating: 4.9, quote: "Navigating pet insurance was confusing. This hub clarified everything, giving me peace of mind.", user: "Michael T. (Chennai)" },
            { rating: 5.0, quote: "பெற்றோர் வழிகாட்டி மிகவும் உதவியாக இருந்தது. (The parent guide was very helpful.)", user: "Viji R. (Tamil Nadu)", lang: "Tamil" },
        ]
    },
    { 
        title: "Pet Medicine", 
        id: "medicine", 
        theme: "red",
        reviews: [
            { rating: 4.9, quote: "Auto-renewal for flea and tick prevention ensures I never miss a dose. Fast, reliable delivery.", user: "Sunil D. (Pune)" },
            { rating: 4.7, quote: "I quickly found the specific joint supplement prescribed by our remote vet. Huge time saver!", user: "Gary P. (Kolkata)" },
            { rating: 4.8, quote: "आसानी से एलर्जी की दवा मिली। (Easily found the allergy medicine.)", user: "Karan B. (Jaipur)", lang: "Hindi" },
        ]
    },
    { 
        title: "Pet Clinics", 
        id: "clinics", 
        theme: "cyan",
        reviews: [
            { rating: 4.9, quote: "Found the highest-rated emergency vet clinic nearby in seconds. Platform trust score is accurate.", user: "Nina M. (Hyderabad)" },
            { rating: 4.8, quote: "Easy booking system for our cat's annual check-up at a trusted local clinic.", user: "Chris W. (Delhi)" },
            { rating: 5.0, quote: "వెటర్నరీ క్లినిక్‌లు త్వరగా దొరికాయి. (Veterinary clinics were found quickly.)", user: "Ramesh G. (Hyderabad)", lang: "Telugu" },
        ]
    },
    { 
        title: "Pet Doctor", 
        id: "doctor", 
        theme: "teal",
        reviews: [
            { rating: 5.0, quote: "Dr. Emily's telemedicine consult solved my pet's ear infection without a stressful car ride.", user: "Sarah J. (Bangalore)" },
            { rating: 4.9, quote: "Booked a specialist for my senior dog remotely. The quality of care was excellent and immediate.", user: "Amit V. (Mumbai)" },
            { rating: 4.8, quote: "डॉक्टर सलाह बहुत अच्छी थी। (Doctor advice was very good.)", user: "Shalini P. (Indore)", lang: "Hindi" },
        ]
    },
    { 
        title: "Pet Walker", 
        id: "walker", 
        theme: "amber",
        reviews: [
            { rating: 5.0, quote: "Reliable walker found just 0.8 mi away, perfect for my busy work week. My dog loves Jane!", user: "David C. (Pune)" },
            { rating: 4.9, quote: "Managed to schedule walks and pay all through the app. Very safe and convenient.", user: "Fiona G. (Noida)" },
            { rating: 4.8, quote: "वॉकर विश्वसनीय और समय पर आता है। (The walker is reliable and punctual.)", user: "Vimal R. (Patna)", lang: "Hindi" },
        ]
    },
    { 
        title: "Pet Trainer", 
        id: "trainer", 
        theme: "purple",
        reviews: [
            { rating: 5.0, quote: "The remote behavioral consultation stopped my puppy's biting in just three sessions.", user: "Hannah W. (Surat)" },
            { rating: 4.9, quote: "Found an amazing agility trainer nearby with high platform ratings. Great results!", user: "Leon K. (Jaipur)" },
            { rating: 4.8, quote: "பயிற்சியாளரின் அணுகுமுறை சிறப்பானது. (The trainer's approach is excellent.)", user: "Kala D. (Chennai)", lang: "Tamil" },
        ]
    },
    { 
        title: "Pet Parent Counselor", 
        id: "parentcounselor", 
        theme: "yellow",
        reviews: [
            { rating: 5.0, quote: "Received crucial emotional support after losing my oldest cat. The remote sessions were invaluable.", user: "Nancy A. (Delhi)" },
            { rating: 4.9, quote: "Coping with my pet's chronic illness felt overwhelming until I used this counseling service.", user: "Oliver B. (Hyderabad)" },
        ]
    },
    { 
        title: "Pet Counselor", 
        id: "petcounselor", 
        theme: "pink",
        reviews: [
            { rating: 4.9, quote: "The behavioral plan to reduce my dog's anxiety during storms works miracles. Highly effective!", user: "Paul Q. (Mumbai)" },
            { rating: 5.0, quote: "Received practical tips to resolve multi-pet conflicts at home. Stress is down by 80%.", user: "Rita Z. (Bengaluru)" },
        ]
    },
    { 
        title: "Pet Parent Personalized Knowledge Hub", 
        id: "parentknowledge", 
        theme: "indigo",
        reviews: [
            { rating: 5.0, quote: "The personalized daily tips are exactly what I need for my breed. It’s like having an expert nearby.", user: "Sam H. (Pune)" },
            { rating: 4.8, quote: "Advanced First Aid video course gave me confidence to handle minor emergencies before the vet call.", user: "Uma V. (Kolkata)" },
        ]
    },
    { 
        title: "Pet Multilingual Video", 
        id: "multivideo", 
        theme: "blue",
        reviews: [
            { rating: 5.0, quote: "Puppy Health videos in Telugu made complex topics easy to understand for my parents.", user: "Vishnu T. (Hyderabad)" },
            { rating: 4.9, quote: "Finally, proper cat grooming techniques explained clearly in Bengali. Very helpful!", user: "Zoya F. (Dhaka, via Remote)" },
            { rating: 4.8, quote: "हिंदी में प्रशिक्षण बहुत अच्छा है। (Training in Hindi is very good.)", user: "Gaurav K. (Delhi)", lang: "Hindi" },
        ]
    },
    { 
        title: "Pet Dating", 
        id: "dating", 
        theme: "pink",
        reviews: [
            { rating: 5.0, quote: "My Poodle found a regular playdate partner just down the street! Great way to socialize.", user: "Ben J. (Mumbai)" },
            { rating: 4.9, quote: "Senior Dog Social Hour was a huge success. My old dog is happier than ever.", user: "Cathy W. (Chennai)" },
        ]
    },
    { 
        title: "Professional Grooming", 
        id: "grooming", 
        theme: "gray",
        reviews: [
            { rating: 4.9, quote: "Booked the mobile grooming van for the first time. My dog looked fabulous and loved staying home.", user: "Diana R. (Pune)" },
            { rating: 4.8, quote: "Excellent de-shedding treatment. The platform rating led me to a high-quality service.", user: "Evan S. (Bangalore)" },
        ]
    },
    { 
        title: "Nutrition & Wellness", 
        id: "nutrition", 
        theme: "green",
        reviews: [
            { rating: 5.0, quote: "The vet-approved custom diet plan solved my pet's chronic digestive issues. Game changer!", user: "Frank M. (Delhi)" },
            { rating: 4.9, quote: "Remote senior nutrition consultation was so convenient and insightful. Highly recommend.", user: "Grace H. (Hyderabad)" },
        ]
    },
    { 
        title: "Reliable Pet Sitting", 
        id: "petsitting", 
        theme: "blue",
        reviews: [
            { rating: 5.0, quote: "Found a vet-trained pet sitter for our holiday. Peace of mind is priceless!", user: "Henry B. (Mumbai)" },
            { rating: 4.9, quote: "Daily drop-in visits for our cat were flawless. Trustworthy and reliable.", user: "Ivy K. (Chennai)" },
        ]
    },
    { 
        title: "Pet-welfare Subsidies or Support", 
        id: "subsidies", 
        theme: "yellow",
        reviews: [
            { rating: 5.0, quote: "Used the vaccination assistance program—it made essential healthcare truly affordable. Thank you!", user: "Jack P. (Kolkata)" },
            { rating: 4.8, quote: "Found resources for spay/neuter vouchers quickly. The support provided by the platform is amazing.", user: "Kelly R. (Pune)" },
        ]
    },
    { 
        // Renaming "Pet Accessories" from Marketplace data to match the testimonial structure
        title: "Pet Accessories", 
        id: "acc", 
        theme: "orange",
        reviews: [
            { rating: 4.9, quote: "Ordered a GPS tracker and luxury bed. Quality products delivered fast. My dog is thrilled!", user: "Leo N. (Surat)" },
            { rating: 5.0, quote: "The automatic feeder has been a lifesaver for early mornings. Easy purchase through the marketplace.", user: "Maria Q. (Jaipur)" },
        ]
    },
];

// --- Specialist Data Structure (Used by Our Specialist Section) ---

const SPECIALIST_DATA = [
    { title: "Pet Adoption", icon: HeartHandshake, id: "adoption", listings: [
        { name: "Happy Tails Adoption Center", distance: "5.0 mi", google: 4.9, platform: 4.9, type: 'service' },
        { name: "Feline Friends Foster Network", distance: "3.2 mi", google: 4.8, platform: 5.0, type: 'service' },
        { name: "City Animal Welfare Board", distance: "1.7 mi", google: 4.9, platform: 5.0, type: 'service' },
        { name: "Canine Compassion Shelter (South)", distance: "8.1 mi", google: 4.7, platform: 4.8, type: 'service' },
        { name: "Exotic Pet Rescue League", distance: "15.5 mi", google: 4.6, platform: 4.7, type: 'service' },
        { name: "Adoption Readiness Consultant - Aarthi", distance: "Remote", google: 5.0, platform: 5.0, type: 'service' },
        { name: "Senior Pets R' Us", distance: "4.9 mi", google: 4.9, platform: 4.9, type: 'service' },
        { name: "Birds of Paradise Foundation", distance: "6.0 mi", google: 4.8, platform: 4.9, type: 'service' },
        { name: "Farm Animal Sanctuary Visits", distance: "20.0 mi", google: 4.7, platform: 4.8, type: 'service' },
        { name: "Kitten Foster and Rehoming", distance: "2.1 mi", google: 4.9, platform: 5.0, type: 'service' },
    ]},
    { title: "Pet Clinics", icon: Building2, id: "clinics", listings: [
        { name: "City Animal Hospital (24/7)", distance: "0.5 mi", google: 4.9, platform: 4.7, type: 'service' },
        { name: "Paws & Whiskers Clinic (Routine)", distance: "1.2 mi", google: 4.8, platform: 4.9, type: 'service' },
        { name: "Advanced Veterinary Diagnostics Center", distance: "3.5 mi", google: 4.5, platform: 4.6, type: 'service' },
        { name: "The Pet Wellness Centre", distance: "0.8 mi", google: 4.9, platform: 4.9, type: 'service' },
        { name: "Small Animal Surgical Center", distance: "6.1 mi", google: 4.9, platform: 4.8, type: 'service' },
        { name: "Dr. Rao's Holistic Clinic", distance: "1.5 mi", google: 4.8, platform: 4.7, type: 'service' },
        { name: "Emergency Vet Triage (Remote Check-in)", distance: "Remote", google: 4.9, platform: 5.0, type: 'service' },
        { name: "Vaccination Drive Center", distance: "2.5 mi", google: 4.8, platform: 4.9, type: 'service' },
        { name: "Exotic Pet Veterinary Services", distance: "4.0 mi", google: 4.9, platform: 4.9, type: 'service' },
        { name: "Community Pet Health Clinic", distance: "1.0 mi", google: 4.7, platform: 4.8, type: 'service' },
    ]},
    { title: "Pet Doctor", icon: Stethoscope, id: "doctor", listings: [
        { name: "Dr. Ben Sharma (Pediatric Specialist)", distance: "1.2 mi", google: 4.8, platform: 4.9, type: 'service' },
        { name: "Dr. Emily Chen (Telemedicine Vet)", distance: "Remote", google: 4.9, platform: 5.0, type: 'service' },
        { name: "Dr. Jake (Mobile Visit Vet)", distance: "0.8 mi", google: 4.9, platform: 4.9, type: 'service' },
        { name: "Dr. Viji (Internal Medicine)", distance: "Remote", google: 4.7, platform: 4.8, type: 'service' },
        { name: "Dr. Arjun (Cardiology Specialist)", distance: "5.5 mi", google: 4.9, platform: 4.9, type: 'service' },
        { name: "Dr. Maya (Rehabilitation Specialist)", distance: "3.0 mi", google: 4.8, platform: 4.7, type: 'service' },
        { name: "Dr. Lin (Exotic Animal Specialist)", distance: "10.0 mi", google: 5.0, platform: 5.0, type: 'service' },
        { name: "Dr. Samuel (Senior Care)", distance: "2.5 mi", google: 4.9, platform: 4.9, type: 'service' },
        { name: "Dr. Hannah (Behavioral Vet)", distance: "Remote", google: 5.0, platform: 5.0, type: 'service' },
        { name: "Dr. Priya (General Consults)", distance: "1.5 mi", google: 4.8, platform: 4.9, type: 'service' },
    ]},
    { title: "Pet Walker", icon: Dog, id: "walker", listings: [
        { name: "Happy Paws Walkers Agency", distance: "2.1 mi", google: 4.9, platform: 4.8, type: 'service' },
        { name: "Urban Canine Treks (Licensed)", distance: "1.5 mi", google: 4.7, platform: 4.9, type: 'service' },
        { name: "Solo Dog Walks by Jane", distance: "0.8 mi", google: 5.0, platform: 5.0, type: 'service' },
        { name: "Senior Dog Support Walks", distance: "5.0 mi", google: 4.7, platform: 4.9, type: 'service' },
        { name: "Puppy Potty Break Service", distance: "1.0 mi", google: 4.9, platform: 5.0, type: 'service' },
        { name: "Adventure Hikes Group (Weekends)", distance: "3.5 mi", google: 4.6, platform: 4.7, type: 'service' },
        { name: "Cat Care Drop-in Visits", distance: "0.5 mi", google: 4.8, platform: 4.9, type: 'service' },
        { name: "Certified Pet Sitter/Walker - Rohan", distance: "2.0 mi", google: 5.0, platform: 5.0, type: 'service' },
        { name: "Disabled Pet Mobility Support", distance: "4.0 mi", google: 4.9, platform: 4.8, type: 'service' },
        { name: "Evening Dog Jogging", distance: "1.2 mi", google: 4.7, platform: 4.9, type: 'service' },
    ]},
    { title: "Pet Trainer", icon: Activity, id: "trainer", listings: [
        { name: "Basic Obedience Course (Level 1)", distance: "1.0 mi", google: 4.9, platform: 4.8, type: 'service' },
        { name: "Advanced Agility Training Classes", distance: "3.0 mi", google: 4.7, platform: 4.9, type: 'service' },
        { name: "Puppy Socialization & Manners", distance: "0.9 mi", google: 4.8, platform: 4.7, type: 'service' },
        { name: "In-Home Personalized Training - Mark", distance: "0.9 mi", google: 5.0, platform: 5.0, type: 'service' },
        { name: "Clicker Training Specialist (Remote)", distance: "Remote", google: 4.9, platform: 4.9, type: 'service' },
        { name: "Aggression/Fear Behavioral Modification", distance: "2.5 mi", google: 4.7, platform: 4.8, type: 'service' },
        { name: "Dog Show Preparation Coach", distance: "5.0 mi", google: 4.9, platform: 4.9, type: 'service' },
        { name: "Cat Behavior Shaping (Remote)", distance: "Remote", google: 5.0, platform: 5.0, type: 'service' },
        { name: "Service Animal Task Training", distance: "1.5 mi", google: 4.8, platform: 4.7, type: 'service' },
        { name: "Group Training Sessions (Park)", distance: "0.5 mi", google: 4.9, platform: 4.9, type: 'service' },
    ]},
    { title: "Counseling & Support", icon: Users, id: "counseling", listings: [ // Combines Parent & Pet Counselor
        { name: "Grief & Loss Support Group (Remote)", distance: "Remote", google: 4.9, platform: 4.8, type: 'service' },
        { name: "Pet Behavioral Assessment (Anxiety)", distance: "Remote", google: 4.7, platform: 4.9, type: 'service' },
        { name: "Coping with Pet Illness Guidance", distance: "Remote", google: 4.8, platform: 4.7, type: 'service' },
        { name: "Financial Planning for Pet Care", distance: "Remote", google: 4.9, platform: 5.0, type: 'service' },
        { name: "Multi-Pet Household Conflict Resolution", distance: "Remote", google: 4.9, platform: 5.0, type: 'service' },
        { name: "New Baby & Pet Integration Consult", distance: "Remote", google: 4.8, platform: 4.7, type: 'service' },
        { name: "Litter Box Avoidance Strategist - Kim", distance: "Remote", google: 4.9, platform: 4.8, type: 'service' },
        { name: "Pet Parent Stress Management Workshop", distance: "Remote", google: 5.0, platform: 5.0, type: 'service' },
        { name: "Senior Pet Cognitive Decline Support", distance: "Remote", google: 4.7, platform: 4.9, type: 'service' },
        { name: "Euthanasia Decision Support", distance: "Remote", google: 4.9, platform: 4.9, type: 'service' },
    ]},
    { title: "Professional Grooming", icon: Bug, id: "grooming", listings: [
        { name: "The Urban Paw Salon (Full Service)", distance: "1.1 mi", google: 4.9, platform: 4.8, type: 'service' },
        { name: "Mobile Grooming Van (Book Online)", distance: "0.5 mi", google: 4.8, platform: 4.7, type: 'service' },
        { name: "De-shedding Treatment Specialist", distance: "3.2 mi", google: 4.9, platform: 5.0, type: 'service' },
        { name: "Quick Nail Clipping & Ear Cleaning", distance: "1.5 mi", google: 4.6, platform: 4.7, type: 'service' },
        { name: "Cat Grooming Specialist - Safe & Gentle", distance: "2.0 mi", google: 4.9, platform: 4.9, type: 'service' },
        { name: "Puppy's First Grooming Package", distance: "0.9 mi", google: 4.8, platform: 4.9, type: 'service' },
        { name: "Medicated Dip Treatment", distance: "2.5 mi", google: 4.7, platform: 4.8, type: 'service' },
        { name: "Creative Dog Hair Coloring/Styling", distance: "4.0 mi", google: 4.6, platform: 4.5, type: 'service' },
        { name: "Walk-in Bath Service", distance: "1.2 mi", google: 4.9, platform: 5.0, type: 'service' },
        { name: "Pet Spa & Massage", distance: "3.5 mi", google: 4.8, platform: 4.9, type: 'service' },
    ]},
];


// --- Remote Consult Doctors Data (Kept for pet type demo) ---

const PET_TYPES = [
    { label: "Dogs", value: "dogs", icon: Dog },
    { label: "Cats", value: "cats", icon: PawPrint },
    { label: "Cows", value: "cows", icon: Cloud }, // Using Cloud for livestock to avoid Tailwind warning
    { label: "Birds", value: "birds", icon: Feather }, // Using Feather for birds to avoid Tailwind warning
    { label: "Rabbits", value: "rabbits", icon: Bug }, 
    { label: "Fish", value: "fish", icon: ShieldCheck }, 
    { label: "Goats", value: "goats", icon: Truck }, 
    { label: "Chickens", value: "chickens", icon: Sun }, // Using Sun for poultry to avoid Tailwind warning
];

const REMOTE_DOCTOR_DATA = {
    dogs: [
        { name: "Dr. Anya Sharma (Canine GP)", distance: "Remote", google: 4.9, platform: 5.0, specialty: "General Practice, Vaccines" },
        { name: "Dr. Ben Miller (Behavioral Vet)", distance: "Remote", google: 5.0, platform: 4.9, specialty: "Behavioral Consults, Anxiety" },
        { name: "Dr. Chloe (Orthopedic Review)", distance: "Remote", google: 4.7, platform: 4.8, specialty: "Joint Pain, Rehabilitation" },
        { name: "Dr. David Lin (Puppy Care)", distance: "Remote", google: 4.8, platform: 4.9, specialty: "New Puppy Syndrome, Training" },
        { name: "Dr. Elsa (Senior Dog Specialist)", distance: "Remote", google: 4.9, platform: 5.0, specialty: "Geriatric Care, Mobility" },
        { name: "Dr. Farah (Dermatology)", distance: "Remote", google: 4.8, platform: 4.9, specialty: "Skin Allergies, Hair Loss" },
        { name: "Dr. Greg (Nutrition Consultant)", distance: "Remote", google: 4.7, platform: 4.8, specialty: "Diet Plans, Weight Loss" },
        { name: "Dr. Holly (Parasite Control)", distance: "Remote", google: 4.9, platform: 5.0, specialty: "Flea/Tick, Worming" },
        { name: "Dr. Isaac (Emergency Triage)", distance: "Remote", google: 4.9, platform: 4.8, specialty: "First Aid, Poisoning" },
        { name: "Dr. Jasmine (Wellness Check)", distance: "Remote", google: 5.0, platform: 5.0, specialty: "Routine Exams, Preventive" },
    ],
    cats: [
        { name: "Dr. Liam (Feline Internal Medicine)", distance: "Remote", google: 4.9, platform: 5.0, specialty: "Kidney Disease, Urinary Issues" },
        { name: "Dr. Mia (Cat Behaviorist)", distance: "Remote", google: 4.8, platform: 4.9, specialty: "Litter Box Avoidance, Aggression" },
        { name: "Dr. Noah (Senior Feline Care)", distance: "Remote", google: 4.7, platform: 4.8, specialty: "Thyroid, Diabetes Management" },
        { name: "Dr. Olivia (Cat Dermatology)", distance: "Remote", google: 4.9, platform: 5.0, specialty: "Miliary Dermatitis, Allergies" },
        { name: "Dr. Peter (New Kitten Advice)", distance: "Remote", google: 4.8, platform: 4.9, specialty: "Vaccines, Spay/Neuter Consult" },
    ],
    cows: [
        { name: "Dr. Raj (Bovine Health Specialist)", distance: "Remote", google: 4.9, platform: 4.8, specialty: "Mastitis, Reproductive Health" },
        { name: "Dr. Sam (Livestock Nutrition)", distance: "Remote", google: 4.8, platform: 4.9, specialty: "Feed Consultation, Deficiency" },
        { name: "Dr. Tanya (Farm Management)", distance: "Remote", google: 4.9, platform: 5.0, specialty: "Herd Health, Disease Prevention" },
    ],
    birds: [
        { name: "Dr. Uma (Avian Specialist)", distance: "Remote", google: 5.0, platform: 5.0, specialty: "Feather Plucking, Respiratory Issues" },
        { name: "Dr. Victor (Parrot Expert)", distance: "Remote", google: 4.9, platform: 4.9, specialty: "Diet, Caging Advice" },
    ],
    rabbits: [
        { name: "Dr. Wendy (Exotic GP)", distance: "Remote", google: 4.8, platform: 4.7, specialty: "Dental Problems, Gut Stasis" },
        { name: "Dr. Xander (Rabbit Care)", distance: "Remote", google: 4.9, platform: 5.0, specialty: "Husbandry, Spay/Neuter Prep" },
    ],
    fish: [
        { name: "Dr. Yasmin (Aquatic Vet)", distance: "Remote", google: 4.9, platform: 4.8, specialty: "Water Quality, Disease Diagnosis" },
        { name: "Dr. Zane (Tank Health)", distance: "Remote", google: 4.8, platform: 4.9, specialty: "Aquarium Setup, Parasite Control" },
    ],
    goats: [
        { name: "Dr. Ivan (Small Ruminant Vet)", distance: "Remote", google: 4.9, platform: 5.0, specialty: "Parasite Control, Hoof Care" },
        { name: "Dr. June (Goat Nutrition)", distance: "Remote", google: 4.8, platform: 4.9, specialty: "Forage Advice, Mineral Deficiency" },
    ],
    chickens: [
        { name: "Dr. Kate (Poultry Health)", distance: "Remote", google: 4.9, platform: 4.8, specialty: "Flock Health, Respiratory Illnesses" },
        { name: "Dr. Leo (Backyard Flock Consult)", distance: "Remote", google: 5.0, platform: 5.0, specialty: "Housing, Laying Issues" },
    ],
};

const HOME_CARE_SERVICE_DATA = {
    doctors: [
        { name: "Dr. Maya (House Call Vet)", distance: "1.2 mi", google: 4.9, platform: 5.0, specialty: "Routine Exams, Post-Op Care" },
        { name: "Dr. Sanjay (Pediatric House Call)", distance: "2.5 mi", google: 5.0, platform: 4.9, specialty: "New Kitten/Puppy Check-ups" },
        { name: "Dr. Laura (Senior Mobility)", distance: "0.8 mi", google: 4.7, platform: 4.8, specialty: "Pain Management, Mobility Checks" },
        { name: "Dr. John (Vaccine Home Visit)", distance: "1.5 mi", google: 4.8, platform: 4.9, specialty: "Annual Vaccines, Health Certificates" },
        { name: "Dr. Zoe (Comfort Care)", distance: "3.5 mi", google: 4.9, platform: 5.0, specialty: "Palliative Care, Quality of Life" },
    ],
    counselors: [
        { name: "Anxiety Behavioral Specialist - Kim", distance: "1.0 mi", google: 5.0, platform: 5.0, specialty: "In-home Behavior Modification" },
        { name: "Pet Parent Grief Counselor - Ava", distance: "2.1 mi", google: 4.9, platform: 4.8, specialty: "Emotional Support, Home Environment" },
        { name: "New Baby Integration Expert - Chris", distance: "0.5 mi", google: 4.8, platform: 4.9, specialty: "Pet/Child Introduction Training" },
    ],
    groomers: [
        { name: "Mobile Luxury Spa Van - PamperPaws", distance: "0.5 mi", google: 4.9, platform: 5.0, specialty: "Full Grooming, De-shedding" },
        { name: "Senior/Anxious Pet Groomer - Tina", distance: "1.5 mi", google: 4.8, platform: 4.7, specialty: "Gentle, Low-Stress Grooming" },
        { name: "Cat Grooming Specialist - Safe Hands", distance: "2.0 mi", google: 4.9, platform: 5.0, specialty: "No-Sedation Feline Grooming" },
        { name: "Nail/Ear Home Service - Quick Clip", distance: "0.9 mi", google: 4.7, platform: 4.8, specialty: "Trims, Minor Cleaning" },
    ],
    vaccines: [
        { name: "Low-Stress Vaccine Admin - Dr. L", distance: "1.0 mi", google: 5.0, platform: 5.0, specialty: "All Annual Vaccines (Dogs/Cats)" },
        { name: "Puppy/Kitten Booster Package", distance: "2.5 mi", google: 4.9, platform: 4.8, specialty: "Full Series Administration" },
        { name: "Titer Testing & Immunity Check", distance: "3.0 mi", google: 4.8, platform: 4.9, specialty: "Antibody Measurement" },
    ]
};

// --- Remote Van Data Structure (NEW) ---

const REMOTE_VAN_FACILITIES = {
    doctors: { title: "Pet Doctor Consult", icon: Stethoscope, specialty: "On-site Examination, Diagnosis & Triage" },
    bloodtest: { title: "Blood Test & Lab", icon: Droplet, specialty: "Immediate Sample Collection & Lab Processing" },
    xray: { title: "Mobile X-ray (Radiology)", icon: Tablet, specialty: "On-site Digital X-ray for Bone/Soft Tissue" },
    usg: { title: "Mobile USG (Sonography)", icon: Briefcase, specialty: "Ultrasound Scans for Internal Organ Check" },
    counseling: { title: "Counseling Session", icon: PetCounselorIcon, specialty: "In-Vehicle or Doorstep Behavioral/Grief Support" },
    grooming: { title: "Professional Grooming", icon: Bug, specialty: "Full Wash, Trim, and De-shedding Services" },
};

// Generate 10 example van visits for a specific pet type
const generateVanVisits = (petType, count = 10) => {
    const facilities = Object.keys(REMOTE_VAN_FACILITIES);
    const visits = [];
    for (let i = 0; i < count; i++) {
        const facilityKey = facilities[Math.floor(Math.random() * facilities.length)];
        const facility = REMOTE_VAN_FACILITIES[facilityKey];
        const { finalPrice, discountText, earlyAvailability, distance } = generateBookingDetails(false, true);

        visits.push({
            id: i,
            petType,
            facility: facility.title,
            specialty: facility.specialty,
            distance,
            google: (Math.random() * 0.5 + 4.5).toFixed(1), 
            platform: (Math.random() * 0.5 + 4.5).toFixed(1),
            finalPrice,
            basePrice: generateBookingDetails(false, true).basePrice,
            discountText,
            nextAvailable: earlyAvailability,
            icon: facility.icon
        });
    }
    return visits;
};

// Consolidate data for all pet types
const REMOTE_VAN_DATA = PET_TYPES.reduce((acc, pet) => {
    acc[pet.value] = generateVanVisits(pet.label);
    return acc;
}, {});

// --- Core Section Components ---

const NavigationHeader = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('English'); // Default to English
  const [searchQuery, setSearchQuery] = useState(''); 
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile/secondary menu toggle
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false); // State for language flyout

  // Primary Links: Home, About, Services, Gallery, Specialist, Testimonials, Commitment
  const primaryLinks = ROW1.filter(item => ["Home", "About", "Services", "Pets Gallery", "Our Specialist", "Testimonials", "Commitment"].includes(item.label));

  // Utility Links: Download App, Login/Register
  const utilityLinks = ROW1.filter(item => ["Download App", "Login"].includes(item.label));

  // Secondary Links: Marketplace, Remote Van, Home Care, Remote Consult, Knowledge Platform
  const secondaryLinks = ROW2; 

  const handleNavClick = (item) => {
    scrollToSection(item.id, item.subId);
    // Close menus if open
    setIsMenuOpen(false); 
    setIsLangDropdownOpen(false);
  };

  const filteredLanguages = LANGUAGES.filter(lang =>
    lang.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <nav className="w-full bg-white shadow-lg sticky top-0 z-50">
      
      {/* 1. Top Logo/Primary Bar */}
      <div className="flex items-center justify-between px-4 py-3 lg:px-8">
        
        {/* Logo/Title */}
        <div className="flex items-center space-x-2 flex-shrink-0">
            <PawPrint size={24} className="text-teal-600"/>
            <h1 className="text-xl font-extrabold tracking-tight">
                <span className="bg-gradient-to-r from-teal-600 to-indigo-600 bg-clip-text text-transparent">
                    PetJoyFeets Connected Care
                </span>
            </h1>
        </div>

        {/* Desktop Primary Navigation Links */}
        <div className="hidden lg:flex flex-grow justify-center space-x-2 xl:space-x-4 mx-4">
            
            {/* Main Links */}
            {primaryLinks.map(item => (
                <button
                    key={item.label}
                    onClick={() => handleNavClick(item)}
                    className={`flex items-center space-x-1 p-2 rounded-lg text-sm font-medium transition duration-150 hover:bg-gray-100 ${item.color}`}
                >
                    <item.Icon size={16} />
                    <span>{item.label}</span>
                </button>
            ))}

            {/* Secondary Services Dropdown */}
            <div className="relative">
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex items-center space-x-1 p-2 rounded-lg text-sm font-semibold text-orange-600 bg-orange-50 transition duration-150 hover:bg-orange-100"
                >
                    <Menu size={16} />
                    <span>More Services</span>
                    <ChevronDown size={14} className={`transform transition-transform ${isMenuOpen ? 'rotate-180' : 'rotate-0'}`} />
                </button>
                
                {/* Secondary Menu Flyout (Desktop only) */}
                {isMenuOpen && (
                    <div className="absolute top-full mt-2 w-72 bg-white rounded-xl shadow-2xl p-4 border border-gray-100 animate-in fade-in-0 slide-in-from-top-1 z-50">
                        {secondaryLinks.map(item => (
                            <button
                                key={item.label}
                                onClick={() => handleNavClick(item)}
                                className="flex items-center space-x-2 w-full text-left px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-blue-50 transition"
                            >
                                <item.Icon size={16} className="text-blue-500" />
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>
            {/* End Secondary Services Dropdown */}
        </div>
        
        {/* Desktop Utility Actions and Language */}
        <div className="hidden lg:flex items-center space-x-4 flex-shrink-0">

            {/* Language Dropdown & Search (Flyout) */}
            <div className="relative">
                <button
                    onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                    className="flex items-center space-x-1 p-2 rounded-full hover:bg-gray-100"
                    aria-label="Select Language"
                >
                    <Globe size={18} className="text-gray-600" />
                    <ChevronDown size={14} className={`transform transition-transform ${isLangDropdownOpen ? 'rotate-180' : 'rotate-0'}`} />
                </button>

                {isLangDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl p-4 border border-gray-100 animate-in fade-in-0 slide-in-from-top-1 z-50">
                        <h4 className="text-sm font-bold text-gray-700 mb-2">Select Language</h4>
                        <div className="relative mb-3">
                            <Search size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="search"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-8 pr-2 py-1 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <select
                            value={selectedLanguage}
                            onChange={(e) => { setSelectedLanguage(e.target.value); setIsLangDropdownOpen(false); }}
                            className="w-full p-2 text-sm border border-gray-300 rounded-lg"
                        >
                            <option value="" disabled>Choose...</option>
                            {filteredLanguages.map(lang => (
                                <option key={lang} value={lang}>{lang}</option>
                            ))}
                        </select>
                    </div>
                )}
            </div>
            
            {/* Download App & Login/Register */}
            {utilityLinks.map(item => (
                <button
                    key={item.label}
                    onClick={() => handleNavClick(item)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold transition duration-150 shadow-md ${item.id === 'login' ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-teal-600 text-white hover:bg-teal-700'}`}
                >
                    <item.Icon size={16} />
                    <span>{item.id === 'login' ? 'Login' : 'App'}</span>
                </button>
            ))}
        </div>

        {/* Mobile Menu Button */}
        <button
            className="lg:hidden p-2 rounded-full hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
            {isMenuOpen ? <X size={24} className="text-gray-700" /> : <Menu size={24} className="text-gray-700" />}
        </button>

      </div>
      {/* End 1. Top Logo/Primary Bar */}


      {/* 2. Mobile Full Menu Flyout */}
      <div 
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-screen border-t border-gray-200' : 'max-h-0'}`}
        style={{ maxHeight: isMenuOpen ? '100vh' : '0' }}
      >
        <div className="p-4 bg-gray-50/70 space-y-4">

            {/* A. Utility Links (Mobile Top) */}
            <div className="grid grid-cols-2 gap-2 pb-4 border-b border-gray-200">
                {[...utilityLinks, ...primaryLinks].filter(item => item.label !== 'Book Now').map(item => (
                    <button
                        key={item.label}
                        onClick={() => handleNavClick(item)}
                        className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-lg transition duration-150 bg-white shadow-sm hover:bg-gray-100 ${item.color}`}
                    >
                        <item.Icon size={16} />
                        <span>{item.label}</span>
                    </button>
                ))}
            </div>


            {/* B. Secondary Services (Mobile Mid) */}
            <div className="space-y-3">
                <h4 className="text-sm font-bold text-gray-700 border-b border-orange-200 pb-1">Specialized Services & Tools</h4>
                <div className="grid grid-cols-2 gap-2">
                    {secondaryLinks.map(item => (
                        <button
                            key={item.label}
                            onClick={() => handleNavClick(item)}
                            className="flex items-center space-x-2 px-3 py-2 text-xs font-semibold rounded-lg bg-orange-100 text-orange-800 hover:bg-orange-200 transition duration-150"
                        >
                            <item.Icon size={14} />
                            <span>{item.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* C. Language Selector & Search (Mobile Bottom) */}
            <div className="pt-4 border-t border-gray-200">
                <h4 className="text-sm font-bold text-gray-700 mb-2">Language Preference</h4>
                <div className="flex items-center space-x-2">
                    <Globe size={18} className="text-gray-600 flex-shrink-0" />
                    <div className="relative flex-grow">
                        <Search size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="search"
                            placeholder="Search language..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-8 pr-2 py-1 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white"
                        />
                    </div>
                    <select
                        value={selectedLanguage}
                        onChange={(e) => setSelectedLanguage(e.target.value)}
                        className="p-1 text-xs border border-gray-300 rounded-lg bg-white flex-shrink-0"
                    >
                        <option value="" disabled>Select...</option>
                        {filteredLanguages.map(lang => (
                        <option key={lang} value={lang}>{lang}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
      </div>
    </nav>
  );
};

/**
 * Home Section Component
 */
const HomeSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = CAROUSEL_ADS.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <section id="home" className="relative min-h-screen pt-12 pb-24 px-4 overflow-hidden bg-white">
      {/* Background Soft Gradients for depth and softness - Enhanced with Pink/Blue/White */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute w-96 h-96 bg-blue-200/40 rounded-full blur-3xl -top-20 -left-20 animate-pulse-slow"></div>
        <div className="absolute w-96 h-96 bg-pink-200/40 rounded-full blur-3xl -bottom-20 -right-20 animate-pulse-slow delay-500"></div>
        <div className="absolute w-64 h-64 bg-indigo-100/50 rounded-full blur-3xl top-1/2 left-1/4 transform -translate-y-1/2"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Main Header Panel - Enhanced Professional Look */}
        <div className="text-center p-8 lg:p-12 mb-16 bg-white/95 backdrop-blur-md shadow-2xl rounded-3xl border-4 border-indigo-300/70 transform hover:shadow-indigo-300/50 transition duration-300">
          <PawPrint size={48} className="mx-auto text-indigo-600 mb-4" />
          <h2 className="text-5xl lg:text-7xl font-extrabold tracking-tighter text-gray-900 mb-4">
            PetJoyFeetsitive Care, Connected.
          </h2>
          <p className="text-xl lg:text-2xl font-medium text-gray-600 max-w-3xl mx-auto">
            Your pets' health journey, simplified. Access specialist consultations, home visits, and instant support from anywhere.
          </p>
        </div>

        {/* Interactive Carousel / Slider Container */}
        <div className="relative w-full max-w-4xl mx-auto h-[450px] sm:h-[400px]">
          
          {/* Slides */}
          <div 
            className="absolute inset-0 overflow-hidden rounded-2xl shadow-xl border border-gray-200 transition-transform duration-500 ease-in-out"
            // Use translation for smooth sliding between the now 15 slides
            style={{ 
              width: `${totalSlides * 100}%`,
              transform: `translateX(-${currentSlide * (100 / totalSlides)}%)`,
            }}
          >
            {CAROUSEL_ADS.map((ad, index) => (
              <div
                key={index}
                className={`float-left h-full flex flex-col items-center p-4 sm:p-6 bg-white border-r border-gray-200 text-gray-800 overflow-y-auto`} // Changed to white background
                // Each slide width must be 100% divided by the total number of slides
                style={{ width: `${100 / totalSlides}%` }}
              >
                
                {/* Conditional Rendering for KPI Slide vs Standard Slide */}
                {ad.type === 'kpi' ? (
                    // KPI GRID LAYOUT - Enhanced Professional Look
                    <div className="w-full h-full flex flex-col items-center justify-center">
                        <div className="text-center mb-4">
                            <h3 className="text-2xl sm:text-3xl font-extrabold text-indigo-900">{ad.title}</h3>
                            <p className="text-sm sm:text-base text-gray-600">{ad.subtitle}</p>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 w-full max-w-3xl px-2">
                            {ad.kpiData.map((kpi, kIndex) => (
                                <div key={kIndex} className="flex flex-col items-center p-2 bg-pink-50 rounded-xl shadow-inner border border-pink-100 text-center transition hover:bg-pink-100">
                                    <kpi.Icon size={20} className="text-indigo-600 mb-1" />
                                    <span className="text-lg sm:text-xl font-bold text-gray-800 leading-tight">{kpi.value}</span>
                                    <span className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wide">{kpi.label}</span>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => scrollToSection(ad.id)}
                            className="mt-6 px-6 py-2 bg-indigo-600 text-white text-sm font-bold rounded-full shadow-lg hover:bg-indigo-700 transition transform hover:scale-105"
                        >
                            {ad.action}
                        </button>
                    </div>
                ) : (
                    // STANDARD IMAGE LAYOUT - Enhanced Professional Look
                    <>
                        {/* Professional Image */}
                        <img 
                            src={ad.imageUrl} 
                            alt={ad.title} 
                            className="w-40 h-40 object-cover rounded-full mb-4 shadow-xl border-4 border-blue-200"
                            // Fallback in case image fails to load (optional)
                            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x150/f0f9ff/000000?text=Image+Not+Found"; }}
                        />

                        <div className="text-center max-w-xl flex-grow flex flex-col justify-center">
                            <h3 className="text-xl sm:text-2xl font-bold mb-1 tracking-tight text-gray-900">{ad.title}</h3>
                            <p className="text-sm sm:text-base mb-4 opacity-80 leading-snug">{ad.subtitle}</p>
                            <button
                                onClick={() => scrollToSection(ad.id)}
                                className={`mt-auto px-4 py-2 bg-pink-600 text-white text-sm font-semibold rounded-full shadow-lg transition duration-200 transform hover:bg-pink-700 hover:scale-[1.02]`}
                            >
                                {ad.action} &rarr;
                            </button>
                        </div>
                    </>
                )}

              </div>
            ))}
          </div>

          {/* Arrow Navigation */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 p-3 bg-white/80 text-indigo-800 rounded-full shadow-xl hover:bg-white transition z-20 focus:outline-none disabled:opacity-50"
            aria-label="Previous ad"
            disabled={currentSlide === 0}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 p-3 bg-white/80 text-indigo-800 rounded-full shadow-xl hover:bg-white transition z-20 focus:outline-none disabled:opacity-50"
            aria-label="Next ad"
            disabled={currentSlide === totalSlides - 1}
          >
            <ChevronRight size={24} />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-20 overflow-x-auto px-10">
            {CAROUSEL_ADS.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 min-w-3 rounded-full transition-colors duration-300 ${
                  index === currentSlide ? 'bg-indigo-600 shadow-md' : 'bg-gray-400/70'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

// --- New About Section Component ---
const AboutSection = () => (
  <section id="about" className="py-20 px-4 min-h-screen flex items-center bg-gradient-to-b from-white to-blue-50">
    <div className="max-w-4xl mx-auto text-center p-8 bg-white/80 rounded-xl shadow-2xl border border-blue-200">
      <PawPrint size={32} className="mx-auto text-pink-600 mb-4" />
      <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
        About PetJoyFeets Connected Care
      </h2>
      <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
        <p>
          PetJoyFeets Connected Care is dedicated to making every pet’s health journey easier and happier—for pet parents and veterinary experts alike. This platform brings together specialist consultations, same-day home visits, and instant support so families can access trusted care anytime, anywhere.
        </p>
        <p>
          Doctors expand their reach and deliver advanced remote treatments, while pet owners benefit from secure digital health records, marketplace convenience, multilingual knowledge, and seamless appointment booking.
        </p>
        <p className="font-semibold text-xl text-pink-700">
          PetJoyFeetsitive care, always connected: PetJoyFeets simplifies and elevates every aspect of pet wellness, empowering you to keep your beloved companions healthy and thriving—wherever life takes you.
        </p>
      </div>
    </div>
  </section>
);

// --- Services Section Component (NEW) ---

const SERVICES_FEATURES = [
    // Telehealth & Consultations
    { group: "Consultations & Access", icon: Stethoscope, color: "red", features: [
        "Instant pet doctor consults online",
        "Same-day home visit appointments",
        "Smart remote diagnostics and treatment",
        "Certified pet trainers and counselors",
        "Access for all pet types and families",
    ]},
    // Digital Health & Data
    { group: "Digital Health & Data", icon: Monitor, color: "blue", features: [
        "Digital health records for every pet",
        "AI-driven health and care suggestions",
        "Automated alerts and notifications",
        "Secure data, ISO & NDLM compliant platform",
        "Pet identification, digital ID, QR card options",
    ]},
    // Diagnostics & Prescriptions
    { group: "Diagnostics & Treatment", icon: Syringe, color: "green", features: [
        "E-prescription for all pet treatments",
        "Digitized X-ray for faster diagnostics",
        "Automated USG reporting and insights",
        "Advanced booking with quick response",
    ]},
    // Resources & Support
    { group: "Community & Support", icon: Globe, color: "purple", features: [
        "Personalized pet knowledge hub",
        "Multilingual video care resources",
        "Community reviews, real-time expert ratings",
        "Subsidies and government welfare support",
        "Transparent pet parent onboarding and guidance",
        "Continuous improvement powered by AI ML",
    ]},
    // Marketplace & Local
    { group: "Marketplace & Local", icon: Store, color: "orange", features: [
        "Verified local and virtual pet clinics",
        "Custom nutrition and wellness planning",
        "Marketplace for pet accessories, medicine",
        "Reliable pet walking and pet sitting services",
    ]},
];

const ServiceFeatureCard = ({ feature, Icon, color }) => (
    <li className="flex items-start space-x-3 text-left">
        <CheckCircle size={18} className={`flex-shrink-0 text-${color}-600 mt-1`} />
        <span className="text-gray-700 text-base">{feature}</span>
    </li>
);

const ServicesSection = () => (
    <section id="services" className="py-16 px-4 bg-gradient-to-b from-blue-50 to-white min-h-screen">
        <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-3">
                Comprehensive Connected Services
            </h2>
            <p className="text-center text-lg text-indigo-600 mb-10">
                A unified ecosystem covering every aspect of your pet's wellness journey, powered by technology and compassion.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                {SERVICES_FEATURES.map((group, index) => (
                    <div 
                        key={index} 
                        // Highlighted Card Style
                        className={`p-6 bg-white rounded-xl shadow-2xl border-b-4 border-${group.color}-500 flex flex-col transform transition duration-300 hover:scale-[1.02] hover:shadow-3xl`}
                    >
                        <group.icon size={36} className={`text-${group.color}-600 mb-3`} />
                        <h3 className="text-xl font-bold text-gray-900 mb-4">{group.group}</h3>
                        
                        <ul className="space-y-3 list-none p-0 flex-grow">
                            {group.features.map((feature, fIndex) => (
                                <ServiceFeatureCard key={fIndex} feature={feature} color={group.color} />
                            ))}
                        </ul>
                        
                        <div className="mt-6">
                            <button
                                onClick={() => scrollToSection(group.group === 'Consultations & Access' ? 'remoteconsult' : 'marketplace')}
                                className={`w-full text-sm font-semibold py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition duration-200`}
                            >
                                Learn More &rarr;
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);


// --- Pets Gallery Section Component (NEW) ---

const PET_GALLERY_IMAGES = [
    { title: "Happy Dog & Parent", petType: "Dog", imageUrl: "/pet_gallery_1.png" },
    { title: "Kitten Curiosity", petType: "Cat", imageUrl: "/pet_gallery_2.png" },
    { title: "Farm Animal Checkup", petType: "Cow/Goat", imageUrl: "/pet_gallery_3.png" },
    { title: "Bird Wellness", petType: "Bird", imageUrl: "/pet_gallery_4.png" },
    { title: "Rabbit's Den", petType: "Rabbit", imageUrl: "/pet_gallery_5.png" },
    { title: "Aquatic Health", petType: "Fish", imageUrl: "/pet_gallery_6.png" },
    { title: "Chicken Coop", petType: "Chicken", imageUrl: "/pet_gallery_7.png" },
    { title: "Dog Park Playtime", petType: "Dog", imageUrl: "/pet_gallery_8.png" },
    { title: "Cat and Owner Cuddle", petType: "Cat", imageUrl: "/pet_gallery_9.png" },
    { title: "Exotic Pet Care", petType: "Rabbit/Bird", imageUrl: "/pet_gallery_10.png" },
    { title: "Goat Hoof Care", petType: "Goat", imageUrl: "/pet_gallery_11.png" },
    { title: "Family Pet Portrait", petType: "Multiple", imageUrl: "/pet_gallery_12.png" },
];

const PetsGallerySection = () => (
    <section id="gallery" className="py-16 px-4 bg-gradient-to-b from-white to-pink-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-3">
                Pets Gallery: Healthy, Happy Companions
            </h2>
            <p className="text-center text-lg text-pink-600 mb-10">
                See the joy and progress of pets thriving thanks to compassionate connected care.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 p-4 bg-pink-50 rounded-xl shadow-inner border border-pink-200">
                {PET_GALLERY_IMAGES.map((item, index) => (
                    <div key={index} className="group relative overflow-hidden rounded-xl shadow-lg transform transition duration-300 hover:scale-[1.03] cursor-pointer border-4 border-transparent hover:border-pink-400">
                        <img 
                            src={item.imageUrl} 
                            alt={item.title} 
                            className="w-full h-48 object-cover transition duration-300 group-hover:opacity-80"
                            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/300x300/a855f7/ffffff?text=Image+Error"; }}
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-gray-900/80 to-transparent">
                            <p className="text-sm font-bold text-white">{item.title}</p>
                            <p className="text-xs text-pink-200">{item.petType}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center mt-12">
                <button
                    onClick={() => scrollToSection('testimonials')}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition duration-200 text-base font-semibold transform hover:scale-105"
                >
                    <MessageSquare size={18} className="inline mr-2" /> Read Happy Parent Testimonials
                </button>
            </div>
        </div>
    </section>
);


// --- Book Now Section Component ---
const BookNowSection = () => {
    const bookingOptions = [
        { 
            title: "In-Person Consultation (OPD)", 
            subtitle: "Book a direct, physical consultation at a top-rated clinic near you for thorough exams and treatment.", 
            Icon: Building2, 
            id: "marketplace",
            subId: "clinics", // Directs to Marketplace Clinics tab
            color: "red"
        },
        { 
            title: "Remote Consultation (Virtual)", 
            subtitle: "Instant video or chat consultation with a certified pet doctor for quick advice and prescriptions.", 
            Icon: Stethoscope, 
            id: "remoteconsult",
            subId: null, // Reverted to root section ID
            color: "purple"
        },
        { 
            title: "Remote Van / Mobile Clinic", 
            subtitle: "On-site diagnostic services and minor treatments delivered by a fully equipped mobile vet unit.", 
            Icon: Truck, 
            id: "remotevan", // Reverted to individual section ID
            subId: null,
            color: "blue"
        },
        { 
            title: "Home Care / Expert Visit", 
            subtitle: "Scheduled home visits for routine check-ups, post-operative care, or comfort-focused treatment.", 
            Icon: Home, 
            id: "homecare", // Reverted to individual section ID
            subId: null,
            color: "green"
        },
    ];

    return (
        <section id="booknow" className="py-20 px-4 bg-gradient-to-b from-pink-50 to-blue-50 min-h-screen flex items-center justify-center">
            <div className="max-w-6xl mx-auto text-center">
                <Calendar size={48} className="mx-auto text-pink-600 mb-4" />
                <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
                    Book Your Appointment Now
                </h2>
                <p className="text-xl text-gray-600 mb-12">
                    Choose the best path for your pet's care—from instant virtual advice to personalized visits.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {bookingOptions.map((option) => (
                        <button
                            key={option.id + (option.subId || '')}
                            onClick={() => scrollToSection(option.id, option.subId)}
                            // Highlighted Card Style
                            className={`group p-6 text-left bg-white border-2 border-${option.color}-200 rounded-xl shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 w-full hover:border-${option.color}-400`}
                        >
                            <option.Icon size={36} className={`text-${option.color}-600 mb-3 transition duration-300 group-hover:scale-110`} />
                            <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-${option.color}-700">
                                {option.title}
                            </h3>
                            <p className="text-gray-600 text-xs">
                                {option.subtitle}
                            </p>
                            <span className={`mt-3 inline-flex items-center text-sm font-semibold text-${option.color}-600 group-hover:text-${option.color}-800 transition`}>
                                View Details & Book &rarr;
                            </span>
                        </button>
                    ))}
                </div>

                <div className="mt-12 p-4 bg-indigo-50 border border-indigo-200 rounded-lg max-w-lg mx-auto shadow-inner">
                    <p className="inline text-gray-700 text-sm font-medium">
                        *Need help deciding? Contact our 24/7 support assistant!
                    </p>
                </div>
            </div>
        </section>
    );
};

// --- Download App Section Component ---

const DownloadAppSection = () => (
    <section id="downloadapp" className="py-20 px-4 bg-white min-h-screen flex items-center justify-center">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between p-8 bg-blue-50 rounded-3xl shadow-2xl border-4 border-blue-300/50">
            
            {/* Mobile App Image Placeholder */}
            <div className="w-full md:w-1/3 mb-10 md:mb-0 relative flex justify-center">
                <AppWindow size={60} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-300/50 z-0" />
                <div className="w-64 h-96 bg-white border-8 border-gray-800 rounded-[2rem] shadow-xl overflow-hidden relative z-10">
                    {/* Screen Content Placeholder */}
                    <div className="p-4 pt-8 text-center">
                        <h4 className="text-sm font-bold text-gray-800">PetJoyFeets Connected Care</h4>
                        <img 
                            src="https://placehold.co/200x300/a7f3d0/0f766e?text=App+Screen+Demo" 
                            alt="Mobile App Screenshot" 
                            className="w-full h-auto mt-2 rounded-lg"
                        />
                        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-1 bg-gray-900 rounded-full"></div>
                    </div>
                </div>
            </div>

            {/* Download Content */}
            <div className="w-full md:w-1/2 text-center md:text-left">
                <Download size={48} className="text-indigo-600 mb-4 mx-auto md:mx-0" />
                <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
                    Download Our Mobile App
                </h2>
                <p className="text-xl text-gray-700 mb-8">
                    Get 24/7 access to your pet's health records, instant consultations, and essential support right from your phone.
                </p>

                <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                    <a 
                        href="#download-playstore" 
                        onClick={() => console.log("Demo: Download from Play Store")}
                        className="flex items-center justify-center space-x-3 px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-700 transition transform hover:scale-[1.02]"
                    >
                        <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-6 filter brightness-0 invert" />
                        <span>Google Play</span>
                    </a>
                    <a 
                        href="#download-appstore" 
                        onClick={() => console.log("Demo: Download from App Store")}
                        className="flex items-center justify-center space-x-3 px-6 py-3 bg-pink-600 text-white font-bold rounded-xl shadow-lg hover:bg-pink-700 transition transform hover:scale-[1.02]"
                    >
                        <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-6 filter brightness-0 invert" />
                        <span>App Store</span>
                    </a>
                </div>
                <p className="text-sm text-gray-500 mt-6">
                    *Demo links only. In a live application, these link to the official app stores.
                </p>
            </div>
        </div>
    </section>
);

// --- Login Section Component (NEW) ---

const LoginSection = () => {
    const [role, setRole] = useState(null); // 'parent' or 'clinic'
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null);

    const handleLogin = (e) => {
        e.preventDefault();
        setMessage(null);

        if (!role) {
            setMessage({ type: 'error', text: 'Please select a login role (Pet Parent or Clinic).' });
            return;
        }

        const DEMO_USER = 'demo';
        const DEMO_PASS = 'demo';
        // Corrected redirection paths as per user request
        const redirectPath = role === 'parent' ? '/petparentlogin' : '/petclinicslogin';

        if (userId === DEMO_USER && password === DEMO_PASS) {
            setMessage({
                type: 'success',
                text: `Login successful as ${role === 'parent' ? 'Pet Parent' : 'Pet Clinic'}! Redirecting to ${redirectPath}...`
            });
            
            // Perform actual redirection
            if (typeof window !== 'undefined') {
                setTimeout(() => {
                    // Use window.location.href for redirection
                    window.location.href = redirectPath;
                }, 1000); // 1-second delay for the message to show
            }
        } else {
            setMessage({ type: 'error', text: 'Invalid demo credentials. Use ID: "demo", Password: "demo".' });
        }
    };

    return (
        <section id="login" className="min-h-screen flex items-center justify-center py-20 bg-gradient-to-br from-blue-50/50 via-white to-pink-50/50">
            <div className="max-w-3xl w-full p-6 sm:p-10 bg-white rounded-3xl shadow-2xl border-t-8 border-indigo-600/80 transform transition duration-300 hover:shadow-indigo-300/70">
                <div className="text-center mb-8">
                    <LogIn size={48} className="mx-auto text-indigo-600 mb-4" />
                    <h2 className="text-4xl font-extrabold text-gray-900">
                        Secure Access Portal
                    </h2>
                    <p className="text-lg text-gray-500 mt-2">
                        Choose your role to access PetJoyFeets Connected Care.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center">
                    <button
                        onClick={() => setRole('parent')}
                        className={`flex flex-col items-center p-4 w-full sm:w-1/2 rounded-xl border-2 transition duration-300 shadow-md ${
                            role === 'parent'
                                ? 'bg-pink-600 border-pink-700 text-white shadow-xl scale-[1.02] transform'
                                : 'bg-blue-50 border-blue-200 text-gray-700 hover:bg-blue-100'
                        }`}
                    >
                        <PawPrint size={30} className="mb-2" />
                        <span className="font-semibold text-lg">Pet Parent</span>
                        <span className="text-xs opacity-70 mt-1">Manage pet records and bookings</span>
                    </button>
                    <button
                        onClick={() => setRole('clinic')}
                        className={`flex flex-col items-center p-4 w-full sm:w-1/2 rounded-xl border-2 transition duration-300 shadow-md ${
                            role === 'clinic'
                                ? 'bg-indigo-600 border-indigo-700 text-white shadow-xl scale-[1.02] transform'
                                : 'bg-blue-50 border-blue-200 text-gray-700 hover:bg-blue-100'
                        }`}
                    >
                        <Stethoscope size={30} className="mb-2" />
                        <span className="font-semibold text-lg">Pet Clinic/Doctor</span>
                        <span className="text-xs opacity-70 mt-1">Manage appointments and patient files</span>
                    </button>
                </div>

                {role && (
                    <form onSubmit={handleLogin} className="mt-6 p-6 bg-gray-50 rounded-xl border border-gray-200">
                        <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Login as {role === 'parent' ? 'Pet Parent' : 'Pet Clinic'}</h3>
                        
                        <FormInput
                            label="User ID (Demo: demo)"
                            name="userId"
                            placeholder="Enter your user ID"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                        />
                        <FormInput
                            label="Password (Demo: demo)"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {message && (
                            <div className={`p-3 my-4 rounded-lg text-sm font-medium ${message.type === 'success' ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-red-100 text-red-700 border border-red-300'}`}>
                                {message.text}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full py-3 bg-indigo-600 text-white font-bold rounded-lg shadow-lg hover:bg-indigo-700 transition duration-200 mt-4 transform hover:scale-[1.01]"
                        >
                            Sign In
                        </button>

                        <p className="text-xs text-gray-500 text-center mt-4">
                            *This is a demonstration login. Use credentials: ID: **demo**, Password: **demo**.
                        </p>
                    </form>
                )}
            </div>
        </section>
    );
};

// --- Marketplace Section Component ---

const RegisterCustomerModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 text-center animate-in zoom-in-95 duration-200">
                <UserPlus size={48} className="text-purple-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-3 text-purple-700">Registration Required</h3>
                <p className="text-gray-600 mb-6">
                    Please register or log in to use the cart and complete your transaction.
                </p>
                <button
                    onClick={() => { scrollToSection('login'); onClose(); }}
                    className="w-full px-4 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition shadow-md"
                >
                    Go to Login / Register
                </button>
            </div>
        </div>
    );
};

const MarketplaceSection = () => {
    // Determine initial active tab: check URL hash for marketplace#<id> or default to the first item
    const initialHash = typeof window !== 'undefined' ? window.location.hash.substring(1) : '';
    const initialTabId = MARKETPLACE_DATA.find(data => `marketplace#${data.id}` === initialHash) ? initialHash.substring('marketplace#'.length) : MARKETPLACE_DATA[0].id;
    const [activeTab, setActiveTab] = useState(initialTabId);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const activeData = MARKETPLACE_DATA.find(data => data.id === activeTab);

    // Update state and URL hash when tab changes
    const handleTabChange = (id) => {
        setActiveTab(id);
        if (typeof window !== 'undefined') {
            window.history.pushState(null, '', `#marketplace#${id}`);
        }
    };

    // Listen to hash change events to sync tab if navigating via link (like 'Our Specialist')
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.substring(1);
            if (hash.startsWith('marketplace#')) {
                const newTabId = hash.substring('marketplace#'.length);
                if (MARKETPLACE_DATA.find(data => data.id === newTabId)) {
                    setActiveTab(newTabId);
                }
            }
        };
        if (typeof window !== 'undefined') {
            window.addEventListener('hashchange', handleHashChange);
            // Check initial hash on load
            handleHashChange();
        }
        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('hashchange', handleHashChange);
            }
        };
    }, []);


    // Filtered data for navigation links
    const navLinks = MARKETPLACE_DATA.map(({ title, icon: Icon, id }) => ({ title, Icon, id }));

    const handleAddToCart = () => {
        // Since we don't have actual login state, we trigger the registration prompt
        setIsRegisterModalOpen(true);
    };

    const ListingCard = ({ listing, index }) => {
        const isService = listing.type !== 'product';
        const { basePrice, finalPrice, discountText } = generateBookingDetails(!isService);
        const actionLabel = isService ? 'Book Service' : 'Add to Cart';

        return (
            <div 
                key={index} 
                className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex flex-col justify-between transform hover:scale-[1.01] hover:border-indigo-300"
            >
                <div className="p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">{listing.name}</h4>
                    <div className="flex items-center text-sm text-gray-600 space-x-4 mb-3">
                        <span className="flex items-center space-x-1">
                            <MapPin size={14} className="text-blue-500" />
                            <span>{listing.distance}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                            <Star size={14} className="text-yellow-500 fill-yellow-500" />
                            <span>{listing.google} (Google)</span>
                        </span>
                        <span className="flex items-center space-x-1">
                            <PawPrint size={14} className="text-blue-500" />
                            <span>{listing.platform} (Platform)</span>
                        </span>
                    </div>
                </div>
                <div className="px-4 py-3 bg-blue-50 border-t border-blue-200">
                    <button 
                        onClick={handleAddToCart}
                        className="w-full flex flex-col justify-center bg-indigo-600 text-white text-sm font-medium rounded-lg py-2 hover:bg-indigo-700 transition duration-150 shadow-lg"
                    >
                        <span className="font-bold text-lg leading-tight">{actionLabel}: {finalPrice}</span>
                        <span className="text-xs opacity-80 mt-0.5">{discountText} (Base: {basePrice})</span>
                    </button>
                </div>
            </div>
        );
    };

    return (
        <section id="marketplace" className="py-16 px-4 bg-gradient-to-b from-white to-blue-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-3">
                    Marketplace: Everything Your Pet Needs, All In One Place
                </h2>
                <p className="text-center text-lg text-indigo-600 mb-10">
                    Browse services, products, and support from verified providers in your local area and online.
                </p>

                {/* Tab Navigation: Changed from horizontal overflow to multi-row wrap */}
                <div className="flex flex-wrap justify-center border-b border-indigo-300 mb-8 pb-2 gap-2">
                    {navLinks.map(({ title, Icon, id }) => (
                        <button
                            key={id}
                            id={id} // Added ID here to allow direct deep linking
                            onClick={() => handleTabChange(id)}
                            // Highlighted Tab Style
                            className={`flex items-center space-x-1 px-4 py-2 text-xs sm:text-sm font-semibold rounded-full transition-colors duration-200 mb-1 
                                ${activeTab === id 
                                    ? 'bg-pink-600 text-white shadow-md hover:bg-pink-700' 
                                    : 'text-gray-700 hover:text-indigo-600 hover:bg-blue-100'
                                }`}
                        >
                            <Icon size={16} />
                            <span>{title}</span>
                        </button>
                    ))}
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 bg-blue-50 rounded-xl shadow-inner border border-blue-200">
                    {activeData && activeData.listings.map((listing, index) => (
                        <ListingCard key={index} listing={listing} />
                    ))}
                </div>

                {/* Register Customer Modal */}
                <RegisterCustomerModal 
                    isOpen={isRegisterModalOpen} 
                    onClose={() => setIsRegisterModalOpen(false)} 
                />
            </div>
        </section>
    );
};

// --- Testimonials Section Component (Unchanged) ---

const TestimonialCard = ({ review, theme, index }) => (
    <div key={index} className={`bg-white p-6 rounded-xl shadow-lg border-t-4 border-pink-400 flex flex-col justify-between h-full transform transition duration-300 hover:shadow-2xl`}>
        <div className="mb-4">
            <p className="italic text-gray-700 mb-3 text-base">
                "{review.quote}"
            </p>
            <div className="flex items-center space-x-1 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                        key={i} 
                        size={16} 
                        className={`text-yellow-500 ${i < Math.floor(review.rating) ? 'fill-yellow-500' : 'fill-none'}`} 
                    />
                ))}
                <span className="text-sm font-semibold text-gray-800 ml-1">{review.rating}</span>
            </div>
        </div>
        <div>
            <p className={`font-semibold text-sm text-pink-600`}>— {review.user}</p>
            {review.lang && <span className="text-xs text-gray-500">({review.lang} Review)</span>}
        </div>
    </div>
);

const TestimonialsSection = () => {
    const [activeTab, setActiveTab] = useState(TESTIMONIALS_DATA[0].id);
    const activeData = TESTIMONIALS_DATA.find(data => data.id === activeTab);

    // Filtered data for navigation links (using Testimonials data)
    const navLinks = TESTIMONIALS_DATA.map(({ title, id, theme }) => {
        // Map icon dynamically based on id, but keep logic simple if icons aren't explicitly passed
        const marketplaceItem = MARKETPLACE_DATA.find(item => item.id === id);
        return { title, Icon: marketplaceItem ? marketplaceItem.icon : MessageSquare, id, theme };
    });

    return (
        <section id="testimonials" className="py-16 px-4 bg-gradient-to-b from-blue-50 to-white min-h-screen">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-3">
                    Happy Pet Parents: Testimonials
                </h2>
                <p className="text-center text-lg text-pink-600 mb-10">
                    See how PetJoyFeets Connected Care has simplified and improved pet wellness for families.
                </p>

                {/* Tab Navigation: Multi-row wrap */}
                <div className="flex flex-wrap justify-center border-b border-pink-300 mb-8 pb-2 gap-2">
                    {navLinks.map(({ title, Icon, id, theme }) => (
                        <button
                            key={id}
                            onClick={() => setActiveTab(id)}
                            className={`flex items-center space-x-1 px-4 py-2 text-xs sm:text-sm font-semibold rounded-full transition-colors duration-200 mb-1 
                                ${activeTab === id 
                                    ? `bg-indigo-600 text-white shadow-md hover:bg-indigo-700` 
                                    : 'text-gray-700 hover:text-pink-600 hover:bg-pink-100'
                                }`}
                        >
                            <Icon size={16} />
                            <span>{title}</span>
                        </button>
                    ))}
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 bg-pink-50 rounded-xl shadow-inner border border-pink-200">
                    {activeData && activeData.reviews.map((review, index) => (
                        <TestimonialCard 
                            key={index} 
                            review={review} 
                            theme={activeData.theme} 
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- Specialist Section Component ---

const SpecialistCard = ({ specialist, index }) => {
    const { basePrice, finalPrice, discountText } = generateBookingDetails(false);

    return (
        <div 
            key={index} 
            className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex flex-col justify-between transform hover:scale-[1.01] hover:border-indigo-300"
        >
            <div className="p-4">
                <h4 className="font-semibold text-gray-900 mb-2">{specialist.name}</h4>
                <div className="flex items-center text-sm text-gray-600 space-x-4 mb-3">
                    <span className="flex items-center space-x-1">
                        <MapPin size={14} className="text-blue-500" />
                        <span>{specialist.distance}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                        <Star size={14} className="text-yellow-500 fill-yellow-500" />
                        <span>{specialist.google} (Google)</span>
                    </span>
                    <span className="flex items-center space-x-1">
                        <PawPrint size={14} className="text-blue-500" />
                        <span>{specialist.platform} (Platform)</span>
                    </span>
                </div>
            </div>
            <div className="px-4 py-3 bg-blue-50 border-t border-blue-200">
                <button 
                    onClick={() => console.log(`Booking/Contacting ${specialist.name} for ${finalPrice}`)}
                    className="w-full flex flex-col justify-center bg-indigo-600 text-white text-sm font-medium rounded-lg py-2 hover:bg-indigo-700 transition duration-150 shadow-lg"
                >
                    <span className="font-bold text-lg leading-tight">Book: {finalPrice}</span>
                    <span className="text-xs opacity-80 mt-0.5">{discountText} (Service: {basePrice})</span>
                </button>
            </div>
        </div>
    );
};

const SpecialistSection = () => {
    // Default to 'doctor' if no hash is present or invalid
    const defaultTabId = SPECIALIST_DATA[2].id; // doctor
    const initialHash = typeof window !== 'undefined' ? window.location.hash.substring(1) : '';
    const initialTabId = SPECIALIST_DATA.find(data => data.id === initialHash) ? initialHash : defaultTabId;
    
    const [activeTab, setActiveTab] = useState(initialTabId);
    const activeData = SPECIALIST_DATA.find(data => data.id === activeTab);

    // Filtered data for navigation links
    const navLinks = SPECIALIST_DATA.map(({ title, icon: Icon, id }) => ({ title, Icon, id }));

    // Listen to hash change events to sync tab if navigating
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.substring(1);
            if (hash && SPECIALIST_DATA.find(data => data.id === hash)) {
                setActiveTab(hash);
            } else if (hash.startsWith('specialist#')) {
               const newTabId = hash.substring('specialist#'.length);
               if (SPECIALIST_DATA.find(data => data.id === newTabId)) {
                   setActiveTab(newTabId);
               }
            }
        };
        if (typeof window !== 'undefined') {
            window.addEventListener('hashchange', handleHashChange);
            // Check initial hash on load
            handleHashChange();
        }
        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('hashchange', handleHashChange);
            }
        };
    }, []);

    return (
        <section id="specialist" className="py-16 px-4 bg-gradient-to-b from-white to-blue-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-3">
                    Our Network of Certified Pet Specialists
                </h2>
                <p className="text-center text-lg text-indigo-600 mb-10">
                    Connect directly with the highest-rated professionals for specialized pet care and support.
                </p>

                {/* Tab Navigation: White/Blue Theme */}
                <div className="flex flex-wrap justify-center border-b border-indigo-300 mb-8 pb-2 gap-2 bg-blue-50/50 rounded-xl p-2 shadow-inner border border-blue-200">
                    {navLinks.map(({ title, Icon, id }) => (
                        <button
                            key={id}
                            onClick={() => setActiveTab(id)}
                            className={`flex items-center space-x-1 px-4 py-2 text-xs sm:text-sm font-semibold rounded-full transition-colors duration-200 
                                ${activeTab === id 
                                    ? 'bg-indigo-600 text-white shadow-md hover:bg-indigo-700' 
                                    : 'text-gray-700 hover:text-indigo-600 hover:bg-white'
                                }`}
                        >
                            <Icon size={16} />
                            <span>{title}</span>
                        </button>
                    ))}
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 bg-white rounded-xl shadow-xl border border-indigo-100">
                    {activeData && activeData.listings.map((specialist, index) => (
                        <SpecialistCard key={index} specialist={specialist} />
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- Remote Consult Section Component (Restored) ---

const RemoteConsultSection = () => {
    const [selectedPet, setSelectedPet] = useState(PET_TYPES[0].value);
    const activeDoctors = REMOTE_DOCTOR_DATA[selectedPet] || [];
    const PetIcon = PET_TYPES.find(p => p.value === selectedPet)?.icon || Stethoscope;

    const DoctorCard = ({ doctor }) => {
        const { basePrice, finalPrice, discountText } = generateBookingDetails(false);

        return (
            <div 
                className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex flex-col justify-between transform hover:scale-[1.01] hover:border-pink-300"
            >
                <div className="p-4">
                    <h4 className="font-semibold text-gray-900 mb-1 flex items-center space-x-2">
                        <Stethoscope size={18} className="text-fuchsia-600" />
                        <span>{doctor.name}</span>
                    </h4>
                    <p className="text-xs text-gray-500 mb-3">{doctor.specialty}</p>
                    
                    <div className="flex items-center text-sm text-gray-600 space-x-4">
                        <span className="flex items-center space-x-1">
                            <MapPin size={14} className="text-blue-500" />
                            <span>{doctor.distance}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                            <Star size={14} className="text-yellow-500 fill-yellow-500" />
                            <span>{doctor.google} (Google)</span>
                        </span>
                        <span className="flex items-center space-x-1">
                            <PawPrint size={14} className="text-blue-500" />
                            <span>{doctor.platform} (Platform)</span>
                        </span>
                    </div>
                </div>
                <div className="px-4 py-3 bg-fuchsia-50 border-t border-fuchsia-200">
                    <button 
                        onClick={() => console.log(`Booking Remote Consult with ${doctor.name} for ${finalPrice}`)}
                        className="w-full flex flex-col justify-center bg-pink-600 text-white text-sm font-medium rounded-lg py-2 hover:bg-pink-700 transition duration-150 shadow-lg"
                    >
                        <span className="font-bold text-lg leading-tight">Book: {finalPrice}</span>
                        <span className="text-xs opacity-80 mt-0.5">{discountText} (Consultation: {basePrice})</span>
                    </button>
                </div>
            </div>
        );
    };

    return (
        <section id="remoteconsult" className="py-16 px-4 bg-gradient-to-b from-blue-50 to-white min-h-screen">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-3">
                    Remote Consultation Hub
                </h2>
                <p className="text-center text-lg text-fuchsia-600 mb-10">
                    Connect with a certified vet specialist instantly, without leaving home.
                </p>

                {/* Search / Filter Controls */}
                <div className="p-6 bg-white border border-blue-200 rounded-xl mb-10 shadow-lg">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        
                        {/* Pet Type Selector */}
                        <div className="flex items-center space-x-3 w-full sm:w-1/3">
                            <label htmlFor="pet-type" className="text-lg font-semibold text-gray-700 flex-shrink-0">
                                Pet Type:
                            </label>
                            <select
                                id="pet-type"
                                value={selectedPet}
                                onChange={(e) => setSelectedPet(e.target.value)}
                                className="w-full p-3 border border-blue-300 rounded-lg text-base focus:ring-fuchsia-500 focus:border-fuchsia-500 transition"
                            >
                                {PET_TYPES.map(pet => (
                                    <option key={pet.value} value={pet.value}>{pet.label}</option>
                                ))}
                            </select>
                        </div>

                        {/* Registration/Login CTA */}
                        <div className="flex space-x-3 w-full sm:w-auto mt-4 sm:mt-0">
                            <button
                                onClick={() => scrollToSection('login')}
                                className="px-4 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition duration-200 text-sm font-semibold"
                            >
                                <LogIn size={16} className="inline mr-2" /> Login
                            </button>
                            <button
                                onClick={() => scrollToSection('login')}
                                className="px-4 py-3 bg-pink-600 text-white rounded-lg shadow-md hover:bg-pink-700 transition duration-200 text-sm font-semibold"
                            >
                                <UserPlus size={16} className="inline mr-2" /> Register New Pet
                            </button>
                        </div>
                    </div>
                </div>

                {/* Doctor Listings Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 bg-fuchsia-50 rounded-xl shadow-inner border border-fuchsia-200">
                    {activeDoctors.length > 0 ? (
                        activeDoctors.map((doctor, index) => (
                            <DoctorCard key={index} doctor={doctor} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-10 text-gray-600">
                            <PetIcon size={48} className="mx-auto text-fuchsia-400 mb-3" />
                            <p className="text-xl font-semibold">No remote specialists found for {PET_TYPES.find(p => p.value === selectedPet)?.label || 'this category'}.</p>
                            <p>Try searching another pet type or check back later.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

// --- Home Care Section Component ---

const HomeCareSection = () => {
    const [selectedPet, setSelectedPet] = useState(PET_TYPES[0].value);
    const PetIcon = PET_TYPES.find(p => p.value === selectedPet)?.icon || Home;
    
    // Define the categories for Home Care Services
    const HOME_CARE_TABS = [
        { id: 'doctors', title: 'Pet Doctor', icon: Stethoscope, theme: 'indigo', data: HOME_CARE_SERVICE_DATA.doctors },
        { id: 'counselors', title: 'Pet Counselor', icon: Briefcase, theme: 'purple', data: HOME_CARE_SERVICE_DATA.counselors },
        { id: 'groomers', title: 'Professional Grooming', icon: Bug, theme: 'amber', data: HOME_CARE_SERVICE_DATA.groomers },
        { id: 'vaccines', title: 'Pet Vaccine', icon: Syringe, theme: 'teal', data: HOME_CARE_SERVICE_DATA.vaccines },
    ];
    
    const [activeServiceTab, setActiveServiceTab] = useState(HOME_CARE_TABS[0].id);
    const activeTabDetails = HOME_CARE_TABS.find(tab => tab.id === activeServiceTab);

    // Simple filtering based on Dog/Cat/Other Pet Type
    const getFilteredListings = (listings, petType) => {
        // In a real app, this logic would be robust. For demo, we just ensure Dogs/Cats get more listings.
        if (petType === 'dogs' || petType === 'cats') {
            return listings;
        }
        // For other exotic/livestock, we return a smaller, relevant subset of the list or a generic message.
        return listings.slice(0, 3);
    };

    const activeListings = activeTabDetails ? getFilteredListings(activeTabDetails.data, selectedPet) : [];

    const HomeCareCard = ({ listing, index, theme }) => {
        const { basePrice, finalPrice, discountText, earlyAvailability } = generateBookingDetails(false);

        return (
            <div 
                key={index} 
                className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex flex-col justify-between transform hover:scale-[1.01] hover:border-indigo-300"
            >
                <div className="p-4">
                    <h4 className="font-semibold text-gray-900 mb-1 flex items-center space-x-2">
                        <Home size={18} className={`text-${theme}-600`} />
                        <span>{listing.name}</span>
                    </h4>
                    <p className="text-xs text-gray-500 mb-3">{listing.specialty}</p>
                    
                    <div className="flex flex-wrap items-center text-sm text-gray-600 space-x-3">
                        <span className="flex items-center space-x-1">
                            <MapPin size={14} className="text-blue-500" />
                            <span>{listing.distance}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                            <Clock size={14} className="text-green-500" />
                            <span className="font-semibold text-green-700">{earlyAvailability}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                            <Star size={14} className="text-yellow-500 fill-yellow-500" />
                            <span>{listing.google}</span>
                        </span>
                    </div>
                </div>
                <div className="px-4 py-3 bg-blue-50 border-t border-blue-200">
                    <button 
                        onClick={() => console.log(`Booking Home Care with ${listing.name} for ${finalPrice}`)}
                        className={`w-full flex flex-col justify-center bg-indigo-600 text-white text-sm font-medium rounded-lg py-2 hover:bg-indigo-700 transition duration-150 shadow-lg`}
                    >
                        <span className="font-bold text-lg leading-tight">Book Visit: {finalPrice}</span>
                        <span className="text-xs opacity-80 mt-0.5">{discountText} (Base: {basePrice})</span>
                    </button>
                </div>
            </div>
        );
    };

    return (
        <section id="homecare" className="py-16 px-4 bg-gradient-to-b from-white to-pink-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-3">
                    In-Home & Doorstep Pet Care Services
                </h2>
                <p className="text-center text-lg text-indigo-600 mb-10">
                    Schedule expert treatment, counseling, grooming, and vaccination right at your doorstep.
                </p>

                {/* Filter Controls (Pet Type) */}
                <div className="p-6 bg-white border border-pink-200 rounded-xl mb-8 shadow-lg max-w-xl mx-auto">
                    <div className="flex items-center space-x-3 justify-center">
                        <label htmlFor="pet-type-home" className="text-lg font-semibold text-gray-700 flex-shrink-0">
                            Pet Type:
                        </label>
                        <select
                            id="pet-type-home"
                            value={selectedPet}
                            onChange={(e) => setSelectedPet(e.target.value)}
                            className="w-full p-3 border border-pink-300 rounded-lg text-base focus:ring-indigo-500 focus:border-indigo-500 transition max-w-xs"
                        >
                            {PET_TYPES.map(pet => (
                                <option key={pet.value} value={pet.value}>{pet.label}</option>
                            ))}
                        </select>
                    </div>
                    {/* Registration/Login CTA */}
                    <div className="flex space-x-3 justify-center w-full sm:w-auto mt-4">
                        <button
                            onClick={() => scrollToSection('login')}
                            className="px-4 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition duration-200 text-sm font-semibold"
                        >
                            <LogIn size={16} className="inline mr-2" /> Login
                        </button>
                        <button
                            onClick={() => scrollToSection('login')}
                            className="px-4 py-3 bg-pink-600 text-white rounded-lg shadow-md hover:bg-pink-700 transition duration-200 text-sm font-semibold"
                        >
                            <UserPlus size={16} className="inline mr-2" /> Register New Pet
                        </button>
                    </div>
                </div>
                
                {/* Service Tabs */}
                <div className="flex flex-wrap justify-center border-b border-pink-300 mb-8 pb-2 gap-2">
                    {HOME_CARE_TABS.map(({ title, icon: Icon, id, theme }) => (
                        <button
                            key={id}
                            onClick={() => setActiveServiceTab(id)}
                            className={`flex items-center space-x-1 px-4 py-2 text-xs sm:text-sm font-semibold rounded-full transition-colors duration-200 
                                ${activeServiceTab === id 
                                    ? `bg-indigo-600 text-white shadow-md hover:bg-indigo-700` 
                                    : `text-gray-700 hover:text-pink-600 hover:bg-pink-100`
                                }`}
                        >
                            <Icon size={16} />
                            <span>{title}</span>
                        </button>
                    ))}
                </div>

                {/* Listings Grid */}
                <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 bg-pink-50/50 rounded-xl shadow-inner border border-pink-200`}>
                    {activeListings.length > 0 ? (
                        activeListings.map((listing, index) => (
                            <HomeCareCard key={index} listing={listing} theme={activeTabDetails.theme} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-10 text-gray-600">
                            <PetIcon size={48} className={`mx-auto text-${activeTabDetails.theme}-400 mb-3`} />
                            <p className="text-xl font-semibold">No {activeTabDetails.title} available for {PET_TYPES.find(p => p.value === selectedPet)?.label || 'this category'} in this area.</p>
                            <p>Try switching to Remote Consultation for virtual help.</p>
                        </div>
                    )}
                </div>
                
                {/* Remote Van CTA (Since Home Care is often linked to Mobile Services) */}
                <div className="text-center mt-10">
                    <p className="text-lg text-gray-700 mb-4">
                        Looking for **Mobile Diagnostics** (X-rays, Bloodwork)?
                    </p>
                    <button
                        onClick={() => scrollToSection('remotevan')}
                        className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700 transition duration-200 text-base font-semibold"
                    >
                        <Truck size={18} className="inline mr-2" /> Explore Remote Van Services
                    </button>
                </div>

            </div>
        </section>
    );
};

// --- Remote Van Section Component (NEW) ---

const RemoteVanSection = () => {
    const [selectedPet, setSelectedPet] = useState(PET_TYPES[0].value);
    const activeVisits = REMOTE_VAN_DATA[selectedPet] || [];
    const PetIcon = PET_TYPES.find(p => p.value === selectedPet)?.icon || Truck;

    const VanVisitCard = ({ visit }) => {
        const Icon = visit.icon || Truck;
        const color = 'lime'; // Use lime theme for Remote Van, adjusted to indigo for card styling

        return (
            <div 
                key={visit.id} 
                className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex flex-col justify-between transform hover:scale-[1.01] hover:border-indigo-300"
            >
                <div className="p-4">
                    <h4 className="font-semibold text-gray-900 mb-1 flex items-center space-x-2">
                        <Icon size={18} className={`text-indigo-600`} />
                        <span>{visit.facility}</span>
                    </h4>
                    <p className="text-xs text-gray-500 mb-3">{visit.specialty}</p>
                    
                    <div className="flex flex-wrap items-center text-sm text-gray-600 space-x-3">
                        <span className="flex items-center space-x-1">
                            <MapPin size={14} className="text-blue-500" />
                            <span>{visit.distance}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                            <Clock size={14} className="text-green-500" />
                            <span className="font-semibold text-green-700">Next: {visit.nextAvailable}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                            <Star size={14} className="text-yellow-500 fill-yellow-500" />
                            <span>{visit.google} / {visit.platform}</span>
                        </span>
                    </div>
                </div>
                <div className="px-4 py-3 bg-blue-50 border-t border-blue-200">
                    <button 
                        onClick={() => console.log(`Booking Remote Van service for ${visit.facility} at ${visit.finalPrice}`)}
                        className={`w-full flex flex-col justify-center bg-indigo-600 text-white text-sm font-medium rounded-lg py-2 hover:bg-indigo-700 transition duration-150 shadow-lg`}
                    >
                        <span className="font-bold text-lg leading-tight">Book Slot: {visit.finalPrice}</span>
                        <span className="text-xs opacity-80 mt-0.5">{visit.discountText} (Fee: {visit.basePrice})</span>
                    </button>
                </div>
            </div>
        );
    };

    return (
        <section id="remotevan" className="py-16 px-4 bg-gradient-to-b from-white to-blue-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-3">
                    Remote Van: Mobile Diagnostics & Treatment
                </h2>
                <p className="text-center text-lg text-indigo-600 mb-10">
                    Bringing a fully-equipped veterinary clinic right to your doorstep for convenience and comprehensive care.
                </p>

                {/* Filter Controls (Pet Type) */}
                <div className="p-6 bg-white border border-blue-200 rounded-xl mb-8 shadow-lg max-w-xl mx-auto">
                    <div className="flex items-center space-x-3 justify-center">
                        <label htmlFor="pet-type-van" className="text-lg font-semibold text-gray-700 flex-shrink-0">
                            Pet Type:
                        </label>
                        <select
                            id="pet-type-van"
                            value={selectedPet}
                            onChange={(e) => setSelectedPet(e.target.value)}
                            className="w-full p-3 border border-blue-300 rounded-lg text-base focus:ring-indigo-500 focus:border-indigo-500 transition max-w-xs"
                        >
                            {PET_TYPES.map(pet => (
                                <option key={pet.value} value={pet.value}>{pet.label}</option>
                            ))}
                        </select>
                    </div>
                    {/* Registration/Login CTA */}
                    <div className="flex space-x-3 justify-center w-full sm:w-auto mt-4">
                        <button
                            onClick={() => scrollToSection('login')}
                            className="px-4 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition duration-200 text-sm font-semibold"
                        >
                            <LogIn size={16} className="inline mr-2" /> Login
                        </button>
                        <button
                            onClick={() => scrollToSection('login')}
                            className="px-4 py-3 bg-pink-600 text-white rounded-lg shadow-md hover:bg-pink-700 transition duration-200 text-sm font-semibold"
                        >
                            <UserPlus size={16} className="inline mr-2" /> Register New Pet
                        </button>
                    </div>
                </div>
                
                {/* Listings Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 bg-blue-50 rounded-xl shadow-inner border border-blue-200">
                    {activeVisits.length > 0 ? (
                        activeVisits.map((visit) => (
                            <VanVisitCard key={visit.id} visit={visit} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-10 text-gray-600">
                            <PetIcon size={48} className="mx-auto text-indigo-400 mb-3" />
                            <p className="text-xl font-semibold">No Remote Van routes scheduled for {PET_TYPES.find(p => p.value === selectedPet)?.label || 'this category'} near you.</p>
                            <p>Try booking a virtual Remote Consult or an In-Home Expert Visit.</p>
                        </div>
                    )}
                </div>

                {/* Quick Links CTA */}
                <div className="text-center mt-10 flex justify-center space-x-6">
                    <button
                        onClick={() => scrollToSection('remoteconsult')}
                        className="px-6 py-3 bg-pink-600 text-white rounded-lg shadow-lg hover:bg-pink-700 transition duration-200 text-base font-semibold"
                    >
                        <Stethoscope size={18} className="inline mr-2" /> Book Virtual Consult
                    </button>
                    <button
                        onClick={() => scrollToSection('homecare')}
                        className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700 transition duration-200 text-base font-semibold"
                    >
                        <Home size={18} className="inline mr-2" /> Schedule In-Home Visit
                    </button>
                </div>

            </div>
        </section>
    );
};

// --- Knowledge Platform Section Component (UPDATED) ---
const KnowledgePlatformSection = () => {
    // Handler to safely redirect to external/local HTML page
    
    return (
        <section id="knowledge" className="py-20 px-4 bg-gradient-to-b from-blue-50/50 to-white min-h-screen flex items-center justify-center">
            <div className="max-w-6xl mx-auto text-center p-8 bg-white rounded-3xl shadow-2xl border-4 border-indigo-200/50">
                
                <BookOpen size={48} className="mx-auto text-indigo-600 mb-4" />
                <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
                    The PetJoyFeets Knowledge Platform
                </h2>
                <p className="text-xl text-indigo-600 font-medium mb-12">
                    Unlock yourself with personalized, contextual, and comprehensive knowledge in multiple languages.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    
                    {/* 1. Feature: Personalized Content */}
                    <div className="p-6 bg-blue-50 rounded-xl shadow-lg border-b-4 border-indigo-500 transform transition hover:scale-[1.01] hover:shadow-xl">
                        <img 
                            src="https://placehold.co/400x180/a7f3d0/065f46?text=Custom+Training+Guide" 
                            alt="Customized Training" 
                            className="w-full h-auto rounded-lg mb-4" 
                        />
                        <h3 className="font-bold text-xl text-indigo-700 mb-2">Personalized Pet Hub</h3>
                        <p className="text-sm text-gray-600">Curated tips, articles, and training resources tailored precisely to your pet's breed, age, and health needs.</p>
                    </div>

                    {/* 2. Feature: Multilingual Videos */}
                    <div className="p-6 bg-blue-50 rounded-xl shadow-lg border-b-4 border-pink-500 transform transition hover:scale-[1.01] hover:shadow-xl">
                        <img 
                            src="https://placehold.co/400x180/dcd8f8/4f46e5?text=Multilingual+Video+Lesson" 
                            alt="Multilingual Video Lessons" 
                            className="w-full h-auto rounded-lg mb-4" 
                        />
                        <h3 className="font-bold text-xl text-pink-700 mb-2">Multilingual Video Library</h3>
                        <p className="text-sm text-gray-600">Access video guides for complex care, training, and wellness practices available in 22 regional and international languages.</p>
                    </div>

                    {/* 3. Feature: Contextual Health Data */}
                    <div className="p-6 bg-blue-50 rounded-xl shadow-lg border-b-4 border-orange-500 transform transition hover:scale-[1.01] hover:shadow-xl">
                        <img 
                            src="https://placehold.co/400x180/ffedd5/9a3412?text=Health+Data+Analysis" 
                            alt="Health Data Analysis" 
                            className="w-full h-auto rounded-lg mb-4" 
                        />
                        <h3 className="font-bold text-xl text-orange-700 mb-2">Contextual Health Insights</h3>
                        <p className="text-sm text-gray-600">Information dynamically linked to your pet's digital health record (vaccines, history) for immediate, relevant advice.</p>
                    </div>
                </div>
                
                {/* 4. NEW FEATURE: Mental Health Chatbot */}
                <div className="w-full mt-12 p-6 bg-pink-100 rounded-2xl shadow-inner border border-pink-300 mx-auto">
                    <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
                        <Brain size={48} className="text-pink-600 flex-shrink-0"/>
                        <div className="text-center sm:text-left flex-grow">
                            <h3 className="text-2xl font-bold text-pink-800 mb-1">Pet Parent Mental Health Chatbot</h3>
                            <p className="text-base text-gray-700">Access confidential, immediate emotional support and counseling resources related to pet ownership stress, grief, and chronic care management.</p>
                        </div>
                        <button
                            onClick={() => console.log('Launching Mental Health Chatbot')}
                            className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition duration-200 text-lg font-semibold inline-flex items-center space-x-2 flex-shrink-0"
                        >
                            <Headset size={20} /> Start Support Chat
                        </button>
                    </div>
                </div>
                {/* End New Feature */}


                <a
                    href="/pethealth/index_pethealth.html"
                    onClick={() => scrollToSection('faq')} // Adjusted to scroll to the FAQ section within this page
                    className="mt-8 px-8 py-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition duration-200 text-lg font-semibold inline-flex items-center justify-center space-x-2"
                >
                    <Globe size={20} className="mr-2" /> Go to Full Knowledge Hub
                </a>
            </div>
        </section>
    );
};


// --- Security and Trust Section Component (NEW) ---

const SecurityTrustSection = () => {
    const dataSecurityCertifications = [
        { icon: Lock, title: "ISO 27001", subtitle: "Information Security Certified", color: "teal" },
        { icon: Shield, title: "256-bit Encryption", subtitle: "Military-Grade Security", color: "blue" },
        { icon: UserCheck, title: "HIPAA Compliant", subtitle: "International Standards", color: "green" },
        { icon: CheckSquare, title: "NDLM Certified", subtitle: "Government Approved (Demo)", color: "indigo" },
    ];

    const dataPolicyPatient = [
        "Your data is for your eyes only",
        "No one at our platform can view your data",
        "We do not send messages without your permission",
        "Promotional messages with opt-out option any time",
        "We do not share data with any third party"
    ];

    const dataPolicyDoctor = [
        "We do not have access to read your practice data",
        "We do not share data with any third party",
        "Doctors are in full control of patient communications",
        "Stringent data policies to ensure privacy"
    ];

    return (
        <section id="security-trust" className="py-20 px-4 bg-gradient-to-b from-white to-blue-50/50">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-3">
                    Trusted by Millions: Your Privacy is Our Priority
                </h2>
                <p className="text-center text-xl text-indigo-600 mb-16">
                    Industry-leading security and compliance standards to protect your pet's health records.
                </p>

                {/* 1. Core Principles (Top Row) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    <div className="p-6 bg-white rounded-xl shadow-xl border-t-4 border-indigo-400 transform transition hover:scale-[1.01]">
                        <Lock size={30} className="text-indigo-600 mb-2" />
                        <h3 className="font-bold text-lg text-gray-900">We Don't Sell Your Data</h3>
                        <p className="text-sm text-gray-600 mt-1">Your healthcare data will never be sold or shared with third parties.</p>
                    </div>
                    <div className="p-6 bg-white rounded-xl shadow-xl border-t-4 border-indigo-400 transform transition hover:scale-[1.01]">
                        <Server size={30} className="text-indigo-600 mb-2" />
                        <h3 className="font-bold text-lg text-gray-900">Complete Data Separation</h3>
                        <p className="text-sm text-gray-600 mt-1">We never mix doctors' data with patients' data. Complete separation maintained.</p>
                    </div>
                    <div className="p-6 bg-white rounded-xl shadow-xl border-t-4 border-indigo-400 transform transition hover:scale-[1.01]">
                        <User size={30} className="text-indigo-600 mb-2" />
                        <h3 className="font-bold text-lg text-gray-900">You Own Your Data</h3>
                        <p className="text-sm text-gray-600 mt-1">Your data has only one owner: YOU! Full control and ownership.</p>
                    </div>
                    <div className="p-6 bg-white rounded-xl shadow-xl border-t-4 border-indigo-400 transform transition hover:scale-[1.01]">
                        <ShieldCheck size={30} className="text-indigo-600 mb-2" />
                        <h3 className="font-bold text-lg text-gray-900">Security Certifications</h3>
                        <p className="text-sm text-gray-600 mt-1">Industry-leading security standards for worry-free usage.</p>
                    </div>
                </div>

                {/* 2. Certifications and Policies (Bottom Row) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 bg-blue-100/50 rounded-xl shadow-inner border border-blue-200">
                    
                    {/* Certifications Block */}
                    <div className="lg:col-span-1 p-6 bg-white rounded-xl shadow-xl border border-indigo-300">
                        <h3 className="text-2xl font-bold text-indigo-800 mb-6">Security & Compliance</h3>
                        <div className="space-y-4">
                            {dataSecurityCertifications.map((cert, index) => (
                                <div key={index} className="flex items-center space-x-3">
                                    <cert.icon size={24} className={`text-${cert.color}-600 flex-shrink-0`} />
                                    <div>
                                        <p className="font-semibold text-gray-900">{cert.title}</p>
                                        <p className="text-xs text-gray-600">{cert.subtitle}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Patient Policy Block */}
                    <div className="p-6 bg-white rounded-xl shadow-xl border border-pink-300">
                        <h3 className="text-2xl font-bold text-pink-800 mb-6 flex items-center space-x-2">
                            <User size={24} /> <span>Data Security for Patients</span>
                        </h3>
                        <ul className="space-y-3">
                            {dataPolicyPatient.map((item, index) => (
                                <li key={index} className="flex items-start text-gray-700">
                                    <CheckCircle size={16} className="text-pink-500 mt-1 mr-2 flex-shrink-0" />
                                    <span className="text-sm">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    {/* Doctor Policy Block */}
                    <div className="p-6 bg-white rounded-xl shadow-xl border border-indigo-300">
                        <h3 className="text-2xl font-bold text-indigo-800 mb-6 flex items-center space-x-2">
                            <Stethoscope size={24} /> <span>Data Security for Doctors</span>
                        </h3>
                        <ul className="space-y-3">
                            {dataPolicyDoctor.map((item, index) => (
                                <li key={index} className="flex items-start text-gray-700">
                                    <CheckCircle size={16} className="text-indigo-500 mt-1 mr-2 flex-shrink-0" />
                                    <span className="text-sm">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>
        </section>
    );
};


const PlaceholderSection = ({ id, title, color }) => (
  <section
    id={id}
    className={`min-h-screen flex items-center justify-center ${color} text-white p-8`}
  >
    <div className="text-center max-w-2xl">
      <h2 className="text-5xl font-extrabold mb-4">{title}</h2>
      <p className="text-xl opacity-80">
        This is the content area for the '{title}' section. The navigation links above use smooth scrolling to take you here.
      </p>
    </div>
  </section>
);

// --- Modal and Form Components ---

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 relative animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>
        <h3 className="text-2xl font-bold mb-4 border-b pb-2 text-indigo-700">{title}</h3>
        {children}
      </div>
    </div>
  );
};

// Component to display metrics inside the modal
const ModalMetricsDisplay = ({ metrics }) => (
    <div className="grid grid-cols-2 gap-3 mb-6 p-4 border border-blue-200 rounded-xl bg-blue-50/70">
        {metrics.map((metric, index) => (
            <div key={index} className="flex flex-col">
                <div className="flex items-center space-x-1 text-gray-500">
                    <metric.Icon size={14} className={`text-${metric.color}-600`} />
                    <span className="text-xs font-semibold">{metric.label}</span>
                </div>
                <span className={`text-xl font-bold text-${metric.color}-700 mt-0.5`}>{metric.value}</span>
            </div>
        ))}
    </div>
);


// Form Input Component Helper
const FormInput = ({ label, type = 'text', name, placeholder, isRequired = true, value, onChange }) => (
    <div className="mb-4">
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
            {label} {isRequired && <span className="text-pink-500">*</span>}
        </label>
        {type === 'textarea' ? (
            <textarea
                id={name}
                name={name}
                rows="4"
                required={isRequired}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
            />
        ) : (
            <input
                id={name}
                name={name}
                type={type}
                required={isRequired}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
            />
        )}
    </div>
);

// 1. Chatbot/Issue Raising Content
const ChatbotContent = ({ onClose, metrics }) => {
    const [step, setStep] = useState(1);
    const [issue, setIssue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, this would send data to a backend or chat service.
        console.log("Issue Raised:", issue);
        setStep(2);
    };

    return (
        <div>
            <ModalMetricsDisplay metrics={metrics} />
            {step === 1 ? (
                <form onSubmit={handleSubmit}>
                    <p className="mb-4 text-gray-600">
                        Hello! I'm your PetJoyFeets Assistant. How can I help you today? Please briefly describe your issue.
                    </p>
                    <FormInput
                        label="Problem Statement / Issue"
                        name="issue"
                        type="textarea"
                        placeholder="e.g., I need to book an emergency consultation for my dog, or I have a billing question."
                        value={issue}
                        onChange={(e) => setIssue(e.target.value)}
                    />
                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition shadow-md"
                        >
                            Submit Issue
                        </button>
                    </div>
                </form>
            ) : (
                <div className="text-center py-6">
                    <CheckCircle className="w-16 h-16 text-indigo-500 mx-auto mb-4" />
                    <h4 className="text-xl font-semibold mb-2 text-indigo-700">Issue Submitted!</h4>
                    <p className="text-gray-600">Thank you. A specialist will connect with you shortly via the contact information provided in your profile.</p>
                    <button
                        onClick={onClose}
                        className="mt-6 px-6 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition shadow-md"
                    >
                        Close
                    </button>
                </div>
            )}
        </div>
    );
};

// 2. Generic Contact/Enquiry Form
const EnquiryForm = ({ onClose, metrics }) => {
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate form submission
        console.log("Enquiry Form Submitted", { name, contact, message });
        console.log('Thank you for your enquiry. We will contact you soon!');
        onClose();
    };

    return (
        <form onSubmit={handleSubmit}>
            <ModalMetricsDisplay metrics={metrics} />
            <p className="mb-4 text-gray-600">
                You are connecting with a team of experts through the Enquiry form.
            </p>
            <FormInput label="Full Name" name="name" placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} />
            <FormInput label="Contact (Email/Phone)" name="contact" placeholder="Email or Phone number" value={contact} onChange={(e) => setContact(e.target.value)} />
            <FormInput label="Your Message" name="message" type="textarea" placeholder="Describe your question or need..." value={message} onChange={(e) => setMessage(e.target.value)} />
            <div className="flex justify-end space-x-3 mt-4">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 text-white bg-pink-600 rounded-lg hover:bg-pink-700 transition shadow-md"
                >
                    Send Enquiry
                </button>
            </div>
        </form>
    );
};

// 3. WhatsApp Connect Form
const WhatsAppForm = ({ onClose, metrics }) => {
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [message, setMessage] = useState('');

    const handleWhatsAppConnect = (e) => {
        e.preventDefault();
        // Construct a WhatsApp link (replace phone number with your official number)
        const waNumber = '919876543210'; // Dummy Indian number format
        const waMessage = `Hello, my name is ${name}. My contact is ${contact}. I'm connecting via the PetJoyFeets website. Message: ${message}`;
        const encodedMessage = encodeURIComponent(waMessage);
        
        // Open WhatsApp link
        window.open(`https://wa.me/${waNumber}?text=${encodedMessage}`, '_blank');
        onClose();
    };

    return (
        <form onSubmit={handleWhatsAppConnect}>
            <ModalMetricsDisplay metrics={metrics} />
            <p className="mb-4 text-gray-600">
                Connect directly on WhatsApp for quick support. We'll pre-fill your message for you!
            </p>
            <FormInput label="Full Name" name="name" placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} />
            <FormInput label="Contact (Phone Number)" name="contact" placeholder="Your 10-digit phone number" value={contact} onChange={(e) => setContact(e.target.value)} />
            <FormInput label="Your Message" name="message" type="textarea" placeholder="Start your conversation here..." value={message} onChange={(e) => setMessage(e.target.value)} />
            <div className="flex justify-end mt-4">
                <button
                    type="submit"
                    className="flex items-center space-x-2 px-6 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 transition shadow-md"
                >
                    {/* Placeholder image for WhatsApp icon, inverted to appear white */}
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1200px-WhatsApp.svg.png" alt="WhatsApp Icon" className="w-5 h-5 filter invert" />
                    <span>Connect on WhatsApp</span>
                </button>
            </div>
        </form>
    );
};


// Main Application Component
export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // 'chat', 'enquiry', 'whatsapp'

  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
  };

  const renderModalContent = () => {
    switch (modalType) {
      case 'chat':
        return <ChatbotContent onClose={closeModal} metrics={modalMetrics.chat} />;
      case 'enquiry':
        return <EnquiryForm onClose={closeModal} metrics={modalMetrics.enquiry} />;
      case 'whatsapp':
        return <WhatsAppForm onClose={closeModal} metrics={modalMetrics.whatsapp} />;
      default:
        return null;
    }
  };
  
  const renderModalTitle = () => {
    switch (modalType) {
      case 'chat':
        return 'Chat with PetJoyFeets Assistant';
      case 'enquiry':
        return 'General Enquiry Form';
      case 'whatsapp':
        return 'Connect on WhatsApp';
      default:
        return '';
    }
  };

  // FAB Data - Metrics removed from here, only buttons remain
  const fabData = [
    { type: 'chat', title: 'Chat with Us', color: 'indigo', Icon: MessageSquare },
    { type: 'enquiry', title: 'General Enquiry', color: 'pink', Icon: Info }, 
    { type: 'whatsapp', title: 'Connect with WhatsApp', color: 'green', Icon: (props) => (
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1200px-WhatsApp.svg.png" 
          alt="WhatsApp Icon" 
          className="w-7 h-7 filter invert"
          {...props}
        />
      )
    },
  ];

  // Corrected the sections array closure
  const sections = [
    { id: "home", component: HomeSection },
    { id: "about", component: AboutSection }, 
    { id: "services", component: ServicesSection }, // Using new ServicesSection
    { id: "gallery", component: PetsGallerySection }, // Using new PetsGallerySection
    { id: "specialist", component: SpecialistSection }, 
    { id: "testimonials", component: TestimonialsSection }, 
    { id: "booknow", component: BookNowSection }, 
    { id: "downloadapp", component: DownloadAppSection }, 
    { id: "login", component: LoginSection }, // Replaced Placeholder with LoginSection
    // Secondary sections
    { id: "marketplace", component: MarketplaceSection }, 
    { id: "remotevan", component: RemoteVanSection }, 
    { id: "homecare", component: HomeCareSection }, 
    { id: "remoteconsult", component: RemoteConsultSection }, 
    { id: "knowledge", component: KnowledgePlatformSection }, // Using new KnowledgePlatformSection
    { id: "security-trust", component: SecurityTrustSection }, // Commitment section
  ];

  return (
    <div className="min-h-screen font-inter bg-gradient-to-br from-blue-50/50 via-white to-pink-50/50">
      <NavigationHeader />
      <main>
        {sections.map(section => (
          section.component ? (
            <section.component key={section.id} {...section.props} />
          ) : (
            // Using a generic placeholder for any section not yet defined as a dedicated component
            <PlaceholderSection key={section.id} {...section} /> 
          )
        ))}
        <FAQSection />
        {/* Footer Placeholder for visual completion */}
        <footer className="bg-gray-900 text-white p-6 md:p-12">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start space-y-6 md:space-y-0">
                
                {/* Copyright and Brand Info */}
                <div className="text-center md:text-left">
                    <p className="text-lg font-semibold mb-1">
                        <PawPrint size={18} className="inline mr-2 text-pink-400" />
                        PetJoyFeets Connected Care
                    </p>
                    <p className="text-sm text-gray-400">
                        &copy; {new Date().getFullYear()} Healing PetJoyFeets Vet Services. All rights reserved.
                    </p>
                </div>

                {/* Footer Links - White/Blue Theme */}
                <div className="flex flex-col sm:flex-row justify-center md:justify-end space-y-4 sm:space-y-0 sm:space-x-8 text-sm">
                    
                    {/* Community & Content */}
                    <div className="space-y-2 text-center sm:text-left">
                        <h4 className="font-bold text-pink-400 mb-1">Content & Community</h4>
                        <a href="#blogs" onClick={() => console.log('Navigating to Blogs')} className="flex items-center text-gray-300 hover:text-white transition duration-150 justify-center sm:justify-start">
                            <Rss size={14} className="mr-2" /> Blogs
                        </a>
                        <a href="#communities" onClick={() => console.log('Navigating to Communities')} className="flex items-center text-gray-300 hover:text-white transition duration-150 justify-center sm:justify-start">
                            <Users size={14} className="mr-2" /> Communities
                        </a>
                    </div>

                    {/* Legal Links (Updated to separate lines) */}
                    <div className="space-y-2 text-center sm:text-left flex flex-col">
                        <h4 className="font-bold text-pink-400 mb-1">Legal</h4>
                        <a href="#privacy" onClick={() => console.log('Navigating to Privacy')} className="text-gray-300 hover:text-white transition duration-150 block">
                            Privacy Policy
                        </a>
                        <a href="#terms" onClick={() => console.log('Navigating to Terms')} className="text-gray-300 hover:text-white transition duration-150 block">
                            Terms and Conditions
                        </a>
                    </div>

                    {/* Social Media */}
                    <div className="space-y-2 text-center sm:text-left">
                        <h4 className="font-bold text-pink-400 mb-1">Connect</h4>
                        <div className="flex justify-center md:justify-start space-x-4">
                            <a href="#linkedin" title="LinkedIn" className="text-gray-300 hover:text-white transition duration-150">
                                <Linkedin size={20} />
                            </a>
                            <a href="#instagram" title="Instagram" className="text-gray-300 hover:text-white transition duration-150">
                                <Instagram size={20} />
                            </a>
                            <a href="#facebook" title="Facebook" className="text-gray-300 hover:text-white transition duration-150">
                                <Facebook size={20} />
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </footer>
      </main>

      {/* Floating Action Buttons Container - Buttons only visible on the main page */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-4">
        {fabData.map((item) => (
          <div key={item.type} className="flex flex-row-reverse items-center space-x-2">
            {/* FAB Button */}
            <button
                onClick={() => openModal(item.type)}
                className={`w-14 h-14 bg-${item.color}-600 text-white rounded-full shadow-lg hover:bg-${item.color}-700 transition duration-300 flex items-center justify-center group relative hover:scale-105`}
                title={item.title}
            >
              <item.Icon className="w-7 h-7" />
              {/* Tooltip for small screens */}
              <span className="lg:hidden absolute right-16 px-3 py-1 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                {item.title}
              </span>
            </button>
          </div>
        ))}
      </div>

      {/* Dynamic Modal - Now includes embedded metrics */}
      <Modal isOpen={isModalOpen} onClose={closeModal} title={renderModalTitle()}>
        {renderModalContent()}
      </Modal>

    </div>
  );
}