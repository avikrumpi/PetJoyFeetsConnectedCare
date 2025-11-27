'use client'

import React, { useState } from 'react'
import { 
  Home, Heart, Stethoscope, Calendar, Download, Store, Truck, ShieldCheck, 
  Clock, MessageSquare, Zap, Users, PawPrint, Activity, ShoppingCart, 
  AlertCircle, FileText, CreditCard, Globe, Bot, MapPin, BarChart3, 
  ChevronDown, ChevronRight, ChevronLeft, Search, Filter, Phone, Mail, Scissors, ClipboardList, TrendingUp, DollarSign, Clock as ClockIcon, LogOut, CheckCircle, Info, Smile
} from 'lucide-react'

// --- SIMULATED DATA ---
// NOTE: All constants and helper components are moved to the top level scope
// to ensure they are defined before being used in other components.

const PETS = [
  { id: 1, name: 'Max - \nCCUID: 00123', type: 'Dog', breed: 'Golden Retriever', age: 3, 
    dob: '2022-03-15', lastVisit: 'Nov 20, 2025', weight: '32 kg', microchipId: '981000123456789',
    photo: '/dog_image1.png', 
    healthScore: 92, qrId: 'PET-UUID-00123'
  },
  { id: 2, name: 'Luna - CCUID: 00456', type: 'Cat', breed: 'Persian', age: 2, 
    dob: '2023-01-20', lastVisit: 'Oct 05, 2025', weight: '4.5 kg', microchipId: '981000987654321',
    photo: '/cat_image1.png', 
    healthScore: 87, qrId: 'PET-UUID-00456' 
  },
  { id: 3, name: 'Gauri - CCUID: 00789', type: 'Cow', breed: 'Sahiwal', age: 5, 
    dob: '2020-05-10', lastVisit: 'Sep 15, 2025', weight: '450 kg', microchipId: '981000555555555',
    photo: '/cow_image1.png', 
    healthScore: 95, qrId: 'PET-UUID-00789' 
  }
]

const UPCOMING_APPOINTMENTS = [
  { id: 1, pet: 'Max', type: 'Remote Consult', doctor: 'Dr. Anya', date: 'Nov 28, 2PM', status: 'Confirmed' },
  { id: 2, pet: 'Luna', type: 'Vaccine', doctor: 'Dr. Maya', date: 'Dec 1, 10AM', status: 'Pending' }
]

const NOTIFICATIONS = [
  { id: 1, type: 'vaccine', title: 'Max: Rabies booster due in 3 days', severity: 'high' },
  { id: 2, type: 'medicine', title: 'Luna: Flea prevention refill available', severity: 'medium' }
]

const EXPENSES = [
  { id: 1, date: 'Nov 25', category: 'Consultation', amount: 850, pet: 'Max' },
  { id: 2, date: 'Nov 22', category: 'Medicine', amount: 450, pet: 'Luna' }
]

const VACCINATION_SCHEDULE = [
    { name: 'DHPP (Distemper)', due: '3 Months', status: 'Done', date: '2022-06-15', next: '2025-06-15' },
    { name: 'Rabies', due: '6 Months', status: 'Done', date: '2022-09-15', next: '2025-09-15' },
    { name: 'Kennel Cough', due: 'Annually', status: 'Pending', date: '2024-12-05', next: '2025-12-05' },
    { name: 'Leptospirosis', due: 'Annually', status: 'Recommended', date: null, next: 'Recommended' },
];

const MARKETPLACE_RECOMMENDATIONS = [
    { title: 'Premium Joint Supplement', price: 999, original: 1499, discount: '33%', icon: Activity },
    { title: 'Flea & Tick Prevention', price: 599, original: 650, discount: '8%', icon: ShieldCheck },
    { title: 'Interactive Food Puzzle', price: 799, original: 799, discount: 'New', icon: Bot },
]

const TREATMENT_HISTORY = [
    { id: 1, date: 'Nov 20, 2025', type: 'Vet Consultation (Routine)', subType: 'Blood Test', status: 'Complete', diagnosis: 'Healthy Checkup', fee: 800, recommendation: 'Annual checkup next year.', alert: false },
    { id: 2, date: 'Oct 15, 2025', type: 'Counselling', subType: 'Session 3/6', status: 'In Progress', diagnosis: 'Mild separation anxiety', fee: 1000, recommendation: 'Book session 4/6.', alert: true },
    { id: 3, date: 'Mar 10, 2024', type: 'X-Ray', subType: 'Limping Check', status: 'Complete', diagnosis: 'No fracture, minor strain', fee: 2500, recommendation: 'Rest for 2 weeks.', alert: false },
    { id: 4, date: 'Jan 05, 2024', type: 'USG', subType: 'Stomach Scan', status: 'Complete', diagnosis: 'Foreign object found', fee: 3500, recommendation: 'Immediate surgical referral.', alert: true },
];

const GROOMING_HISTORY = [
    { id: 1, date: 'Nov 10, 2025', service: 'Full Groom + De-Shedding', status: 'Complete', notes: 'Coat is healthy. Shedding reduced.', fee: 2500, recommendation: 'Book again in 8 weeks.', alert: false },
    { id: 2, date: 'Sep 28, 2025', service: 'Bathing & Nail Trim', status: 'Complete', notes: 'Nails slightly long.', fee: 1500, recommendation: 'Nail trim every 4 weeks.', alert: true },
    { id: 3, date: 'Jul 01, 2025', service: 'Puppy First Cut', status: 'Complete', notes: 'Great temperament!', fee: 1200, recommendation: 'Continue socialization.', alert: false },
];

const EXPENSE_DATA_POINTS = [
    { month: 'Dec \'24', total: 1800 }, { month: 'Jan \'25', total: 4500 }, { month: 'Feb \'25', total: 1200 },
    { month: 'Mar \'25', total: 6000 }, { month: 'Apr \'25', total: 1000 }, { month: 'May \'25', total: 3500 },
    { month: 'Jun \'25', total: 2200 }, { month: 'Jul \'25', total: 1500 }, { month: 'Aug \'25', total: 4800 },
    { month: 'Sep \'25', total: 2900 }, { month: 'Oct \'25', total: 1900 }, { month: 'Nov \'25', total: 3250 },
];

const ACCOUNT_SETTINGS_OPTIONS = [
    'Change Profile Picture', 'Update Contact Information', 'Manage Notifications',
    'Change Password', 'Two-Factor Authentication (On)', 'Delete Account',
];

const CONTENT_CONSENTS = [
    { date: '2025-01-10', type: 'Data Sharing', reason: 'For personalized pet food recommendations.', status: 'Active' },
    { date: '2025-11-20', type: 'Medical History Access', reason: 'For remote consultation by Dr. Anya.', status: 'Expired' },
];

const ALERTS_RECOMMENDATIONS = [
    { id: 1, category: 'Medical Refill', title: 'Max needs Flea & Tick medication refill.', suggestion: 'Order now with 15% auto-discount.', cost: 800, discount: 15, icon: AlertCircle, color: 'text-red-600' },
    { id: 2, category: 'Vaccine Due', title: 'Luna: Kennel Cough booster pending.', suggestion: 'Book appointment this week to avoid lapse.', cost: 800, discount: 0, icon: ShieldCheck, color: 'text-yellow-600' },
    { id: 3, category: 'Wellness', title: 'Max is 1.5kg above goal weight.', suggestion: 'Try new dietary plan. First consult free.', cost: 1500, discount: 100, icon: TrendingUp, color: 'text-amber-600' },
    { id: 4, category: 'Social', title: 'New pet dating profile matched for Max!', suggestion: 'Check out local Golden Retriever owners.', cost: 0, discount: 0, icon: Heart, color: 'text-pink-600' },
    { id: 5, category: 'Grooming', title: 'Luna is due for de-shedding bath.', suggestion: 'Book home care for ₹1,800 (Save ₹200).', cost: 2000, discount: 200, icon: Scissors, color: 'text-purple-600' },
    { id: 6, category: 'Legal', title: 'Mandatory annual pet registration is due.', suggestion: 'File required documents online by month-end.', cost: 500, discount: 0, icon: FileText, color: 'text-blue-600' },
    { id: 7, category: 'Savings', title: 'You qualify for a loyalty vet discount.', suggestion: 'Get 5% off next 3 clinic visits.', cost: 0, discount: 5, icon: DollarSign, color: 'text-emerald-600' },
    { id: 8, category: 'Training', title: 'Advanced obedience class starting soon.', suggestion: 'Enroll Max. Limited slots available.', cost: 4500, discount: 500, icon: Bot, color: 'text-indigo-600' },
    // NEW BIDDING ALERT
    { id: 9, category: 'Bidding', title: 'Opportunity: Premium Dog Food Bulk Order (Max)', suggestion: 'Market trend shows price dropping. Current best bid: ₹4,800. Place a bid below this value to secure savings!', cost: 5000, discount: 200, icon: DollarSign, color: 'text-green-600' },
];

// --- 22 SCHEDULED INDIAN LANGUAGES + English ---
const INDIAN_LANGUAGES = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
    { code: 'as', name: 'Assamese', native: 'অসমীয়া' },
    { code: 'bn', name: 'Bengali', native: 'বাংলা' },
    { code: 'brx', name: 'Bodo', native: 'बड़ो' },
    { code: 'doi', name: 'Dogri', native: 'डोगरी' },
    { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
    { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
    { code: 'ks', name: 'Kashmiri', native: 'کٲشُر' },
    { code: 'gom', name: 'Konkani', native: 'कोंकणी' },
    { code: 'mai', name: 'Maithili', native: 'मैथिली' },
    { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
    { code: 'mni', name: 'Manipuri', native: 'মণিপুরী' },
    { code: 'mr', name: 'Marathi', native: 'मराठी' },
    { code: 'ne', name: 'Nepali', native: 'नेपाली' },
    { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ' },
    { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
    { code: 'sa', name: 'Sanskrit', native: 'संस्कृतम्' },
    { code: 'sat', name: 'Santali', native: 'ᱥᱟᱱᱛᱟᱲᱤ' },
    { code: 'sd', name: 'Sindhi', native: 'सिन्धी' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు' },
    { code: 'ur', name: 'Urdu', native: 'اردو' },
];

// --- FAB CONSTANTS ---
const modalMetrics = {
    chat: { 
        title: 'Instant Chat Support', icon: MessageSquare, color: 'indigo', 
        metric1: { value: '3.8 mins', label: 'Avg. Resolution Time', icon: ClockIcon }, 
        metric2: { value: '5,100', label: 'Daily Issues Handled', icon: Zap } 
    },
    enquiry: { 
        title: 'General Enquiry', icon: Info, color: 'pink',
        metric1: { value: '98.5%', label: 'Customer Satisfaction', icon: Smile }, 
        metric2: { value: '85%', label: 'Zero-Visit Resolution', icon: CheckCircle } 
    },
    whatsapp: { 
        title: 'WhatsApp Connect', icon: Phone, color: 'emerald', // Using Phone for icon as WhatsApp is not in lucide-react
        metric1: { value: '45 sec', label: 'Avg. Response Time', icon: Zap }, 
        metric2: { value: '15,000', label: 'Total Conversations', icon: Users } 
    },
    mentalhealth: { 
        title: 'AI Pet Wellness Coach', 
        icon: Heart, // Using Heart for emotional wellness
        color: 'teal', // Using teal for mental health/wellness
        metric1: { value: '95.1%', label: 'Mood Detection Accuracy', icon: Heart }, 
        metric2: { value: '15+', label: 'Guided Sessions Available', icon: Activity } 
    },
};


// --- HELPER COMPONENTS (Defined outside App for scope) ---

const LanguageSelector = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState(INDIAN_LANGUAGES.find(lang => lang.code === 'en'));

    const filteredLanguages = INDIAN_LANGUAGES.filter(lang => 
        lang.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        lang.native.includes(searchTerm)
    );

    const handleSelect = (lang) => {
        setSelectedLanguage(lang);
        setIsOpen(false);
        // Logic for changing language would go here
    };

    return (
        <div className="relative z-50">
            <button 
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onClick={() => setIsOpen(!isOpen)}
            >
                <Globe className="w-5 h-5 text-gray-600" />
                <span className='text-sm font-medium hidden sm:inline text-gray-600'>
                    {selectedLanguage.code.toUpperCase()} / {selectedLanguage.native}
                </span>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}/>
            </button>
            
            {isOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-xl max-h-80 overflow-y-auto">
                    <div className='p-3 sticky top-0 bg-white border-b border-gray-200'>
                        <div className='flex items-center border border-gray-300 rounded-lg px-2 py-1'>
                            <Search className='w-4 h-4 text-gray-400 mr-2'/>
                            <input 
                                type="text" 
                                placeholder="Search language..." 
                                className='w-full text-sm focus:outline-none'
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {filteredLanguages.map((lang) => (
                        <div 
                            key={lang.code}
                            className={`block px-4 py-2 text-sm cursor-pointer ${
                                selectedLanguage.code === lang.code ? 'bg-indigo-50 font-semibold text-indigo-700' : 'text-gray-700 hover:bg-indigo-50'
                            }`}
                            onClick={() => handleSelect(lang)}
                        >
                            {lang.native} ({lang.name})
                        </div>
                    ))}
                    {filteredLanguages.length === 0 && (
                        <p className="p-4 text-sm text-gray-500 text-center">No languages found.</p>
                    )}
                </div>
            )}
        </div>
    );
};

const DetailRow = ({ label, value }) => (
  <div className="flex justify-between items-center p-2 border-b border-gray-100 last:border-b-0">
    <span className="text-gray-600 text-sm">{label}</span>
    <span className="font-semibold text-gray-900 text-sm">{value}</span>
  </div>
)

const PetDetailSummary = ({ pet }) => (
  // Professional highlighting using strong shadow and backdrop blur
  <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white shadow-2xl shadow-blue-100 h-full">
    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
      <PawPrint className="w-5 h-5 text-indigo-600" /> {pet.name}'s Profile
    </h3>
    <div className="space-y-3">
      <DetailRow label="Species / Breed" value={`${pet.type} / ${pet.breed}`} />
      <DetailRow label="Date of Birth" value={new Date(pet.dob).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })} />
      <DetailRow label="Current Age" value={`${pet.age} years`} />
      <DetailRow label="Weight" value={pet.weight} />
      <DetailRow label="Last Vet Visit" value={pet.lastVisit} />
      <DetailRow label="Microchip ID" value={pet.microchipId} />
      <DetailRow 
        label="Health Score" 
        value={<span className={`font-bold text-lg ${pet.healthScore > 90 ? 'text-green-600' : 'text-amber-600'}`}>{pet.healthScore}%</span>} 
      />
    </div>
    <button className='w-full mt-6 p-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg'>
      View Full Medical Record
    </button>
  </div>
)


const WeightChart = ({ pet }) => {
    // Simulated data for Max (32kg +/- 1.5kg)
    const data = [32.0, 31.5, 32.2, 32.5, 32.0, 31.8, 31.5, 31.9, 32.0, 32.1, 32.0, 32.3];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const maxVal = 34; // Max Y-axis scale

    return (
        <div className="flex flex-col h-40 pt-4 px-2">
            <div className="flex-grow flex items-end justify-around border-l border-b border-gray-300 relative">
                {/* Simulated Target Line */}
                <div className="absolute top-[10%] left-0 right-0 h-px bg-red-400/50 dashed border-t border-red-400/50">
                    <span className='absolute -left-10 top-[-8px] text-xs text-red-500'>33kg</span>
                </div>
                {data.map((weight, index) => {
                    const heightPercent = ((weight / maxVal) * 90) + 10; // Scale height from 10% up to 100%
                    const isAnomaly = weight > 33 || weight < 31;
                    return (
                        <div key={index} className="flex flex-col items-center group relative h-full justify-end w-1/12">
                            <div 
                                style={{ height: `${heightPercent}%` }} 
                                className={`w-3 rounded-t-full transition-all duration-500 
                                    ${isAnomaly ? 'bg-pink-500 hover:bg-pink-600' : 'bg-indigo-500 hover:bg-indigo-600'}`}
                            >
                                <span className='absolute bottom-full mb-1 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap'>{weight.toFixed(1)}kg</span>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="flex justify-around text-xs mt-1">
                {months.map((month, index) => <span key={index} className="w-1/12 text-center text-gray-600">{month}</span>)}
            </div>
        </div>
    );
};

const ExpenseChart = ({ data }) => {
    const months = data.map(d => d.month);
    const totals = data.map(d => d.total);
    const maxTotal = Math.max(...totals) + 1000;
    const currentYearTotal = totals.reduce((a, b) => a + b, 0);
    
    // Prediction (Simplified: 10% increase over current avg monthly spending)
    const avgMonthly = currentYearTotal / totals.length;
    const predictedNextYear = Math.round(avgMonthly * 1.10 * 12);
    const predictedGrooming = Math.round(predictedNextYear * 0.3); // Est. 30% of total
    const predictedTreatment = Math.round(predictedNextYear * 0.7); // Est. 70% of total


    return (
        <div className="space-y-4">
            <h4 className='font-bold text-xl text-gray-900 flex items-center gap-2'>
                <BarChart3 className='w-5 h-5 text-indigo-600' /> Expense Trend (Last 12 Months)
            </h4>
            <div className="flex flex-col h-40 pt-4 px-2">
                <div className="flex-grow flex items-end justify-around border-l border-b border-gray-300 relative">
                    {totals.map((total, index) => {
                        const heightPercent = (total / maxTotal) * 100;
                        return (
                            <div key={index} className="flex flex-col items-center group relative h-full justify-end w-1/12">
                                <div 
                                    style={{ height: `${heightPercent}%` }} 
                                    className={`w-4 rounded-t-lg transition-all duration-500 bg-pink-500 hover:bg-pink-600 shadow-md`} // Use pink accent
                                >
                                    <span className='absolute bottom-full mb-1 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap'>₹{total.toLocaleString()}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="flex justify-around text-xs mt-1">
                    {months.map((month, index) => <span key={index} className="w-1/12 text-center text-gray-600">{month}</span>)}
                </div>
            </div>

            <div className='bg-indigo-50 p-4 rounded-xl border border-indigo-200'>
                <h5 className='font-bold text-indigo-800 text-lg mb-2'>💸 Next 12-Month Prediction</h5>
                <p className='text-sm text-gray-700'>
                    Based on your average spending, your estimated costs for the next year are:
                </p>
                <div className='grid grid-cols-2 gap-4 mt-3 text-center'>
                    <div className='bg-white p-3 rounded-lg border border-red-200'>
                        <span className='text-xs text-red-600 font-semibold'>Treatment & Wellness</span>
                        <p className='font-bold text-xl text-red-700'>₹{predictedTreatment.toLocaleString()}</p>
                    </div>
                    <div className='bg-white p-3 rounded-lg border border-pink-200'>
                        <span className='text-xs text-pink-600 font-semibold'>Grooming & Supplies</span>
                        <p className='font-bold text-xl text-pink-700'>₹{predictedGrooming.toLocaleString()}</p>
                    </div>
                </div>
                <p className='text-xs text-gray-500 mt-2 text-center'>Total Estimated Expense: ₹{predictedNextYear.toLocaleString()}</p>
            </div>
        </div>
    );
};

// --- FAB COMPONENTS ---

const FABMetricsDisplay = ({ metricData }) => (
    <div className="mt-8 pt-4 border-t border-gray-200 grid grid-cols-2 gap-4 text-center">
        <div className="bg-white p-3 rounded-xl shadow-inner">
            <metricData.metric1.icon className={`w-6 h-6 mx-auto mb-1 text-${metricData.color}-600`} />
            <p className="font-bold text-xl text-gray-900">{metricData.metric1.value}</p>
            <p className="text-xs text-gray-500">{metricData.metric1.label}</p>
        </div>
        <div className="bg-white p-3 rounded-xl shadow-inner">
            <metricData.metric2.icon className={`w-6 h-6 mx-auto mb-1 text-${metricData.color}-600`} />
            <p className="font-bold text-xl text-gray-900">{metricData.metric2.value}</p>
            <p className="text-xs text-gray-500">{metricData.metric2.label}</p>
        </div>
    </div>
);

const ChatbotContent = ({ onClose }) => {
    const [issue, setIssue] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const data = modalMetrics.chat;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!issue.trim()) return;
        console.log('Chat Issue Submitted:', issue);
        setIsSubmitted(true);
        setTimeout(() => onClose(), 2500); 
    };

    return (
        <div className={`p-8 rounded-3xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-200 shadow-xl`}>
            <h3 className={`text-2xl font-bold text-indigo-800 mb-6 flex items-center gap-3`}>
                <data.icon className='w-7 h-7' /> {data.title}
            </h3>
            
            {isSubmitted ? (
                <div className="text-center py-12">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto animate-bounce-in" />
                    <p className="mt-4 text-xl font-semibold text-gray-900">Issue Submitted!</p>
                    <p className="text-gray-600">A specialist will connect shortly via in-app chat.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="issue" className="block text-sm font-medium text-gray-700 mb-2">Problem Statement/Issue (Required)</label>
                        <textarea
                            id="issue"
                            rows="4"
                            value={issue}
                            onChange={(e) => setIssue(e.target.value)}
                            placeholder="e.g., Emergency consultation for my dog, Max..."
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full p-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-md`}
                    >
                        Submit Issue
                    </button>
                </form>
            )}
            
            <FABMetricsDisplay metricData={data} />
        </div>
    );
};

const EnquiryForm = ({ onClose }) => {
    const [formData, setFormData] = useState({ name: '', contact: '', message: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const data = modalMetrics.enquiry;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.contact || !formData.message) return;
        console.log('General Enquiry Submitted:', formData);
        setIsSubmitted(true);
        setTimeout(() => onClose(), 2500); 
    };

    return (
        <div className={`p-8 rounded-3xl bg-gradient-to-br from-pink-50 to-white border border-pink-200 shadow-xl`}>
            <h3 className={`text-2xl font-bold text-pink-800 mb-6 flex items-center gap-3`}>
                <data.icon className='w-7 h-7' /> {data.title}
            </h3>
            
            {isSubmitted ? (
                <div className="text-center py-12">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto animate-bounce-in" />
                    <p className="mt-4 text-xl font-semibold text-gray-900">Thank you for your enquiry!</p>
                    <p className="text-gray-600">We will respond to your message shortly.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <input id="name" type="text" value={formData.name} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500" />
                    </div>
                    <div>
                        <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-2">Contact (Email/Phone)</label>
                        <input id="contact" type="text" value={formData.contact} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500" />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                        <textarea id="message" rows="4" value={formData.message} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500" />
                    </div>
                    <button
                        type="submit"
                        className={`w-full p-3 bg-pink-600 text-white font-bold rounded-xl hover:bg-pink-700 transition-colors shadow-md`}
                    >
                        Send Enquiry
                    </button>
                </form>
            )}
            
            <FABMetricsDisplay metricData={data} />
        </div>
    );
};

const WhatsAppForm = ({ onClose }) => {
    const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
    const data = modalMetrics.whatsapp;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleConnect = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.phone || !formData.message) return;

        const basePhone = '+919876543210'; 
        const prefilledMessage = encodeURIComponent(
            `Hello, my name is ${formData.name}. My contact is ${formData.phone}. I'm connecting via PetJoyFeets website. Message: ${formData.message}`
        );
        const whatsappUrl = `https://wa.me/${basePhone}?text=${prefilledMessage}`;
        
        console.log('WhatsApp connection initiated:', whatsappUrl);
        window.open(whatsappUrl, '_blank');
        onClose();
    };

    return (
        <div className={`p-8 rounded-3xl bg-gradient-to-br from-emerald-50 to-white border border-emerald-200 shadow-xl`}>
            <h3 className={`text-2xl font-bold text-emerald-800 mb-6 flex items-center gap-3`}>
                <data.icon className='w-7 h-7' /> {data.title}
            </h3>
            <p className='text-gray-600 mb-4'>Connect instantly with a human agent for urgent matters.</p>
            
            <form onSubmit={handleConnect} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input id="name" type="text" value={formData.name} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500" />
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
                    <input id="phone" type="tel" value={formData.phone} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500" />
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea id="message" rows="4" value={formData.message} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500" />
                </div>
                <button
                    type="submit"
                    className={`w-full p-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors shadow-md flex items-center justify-center gap-2`}
                >
                    <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM17.151 16.512C16.897 16.764 16.551 16.892 16.205 16.892C15.859 16.892 15.513 16.764 15.259 16.512L12.001 13.253L8.743 16.512C8.489 16.764 8.143 16.892 7.797 16.892C7.451 16.892 7.105 16.764 6.851 16.512C6.597 16.26 6.469 15.914 6.469 15.568C6.469 15.222 6.597 14.876 6.851 14.624L10.109 11.365L6.851 8.107C6.597 7.855 6.469 7.509 6.469 7.163C6.469 6.817 6.597 6.471 6.851 6.219C7.105 5.967 7.451 5.839 7.797 5.839C8.143 5.839 8.489 5.967 8.743 6.219L12.001 9.478L15.259 6.219C15.513 5.967 15.859 5.839 16.205 5.839C16.551 5.839 16.897 5.967 17.151 6.219C17.405 6.471 17.533 6.817 17.533 7.163C17.533 7.509 17.405 7.855 17.151 8.107L13.893 11.365L17.151 14.624C17.405 14.876 17.533 15.222 17.533 15.568C17.533 15.914 17.405 16.26 17.151 16.512Z" fill="#FFF"/>
                    </svg>
                    Connect on WhatsApp
                </button>
            </form>
            
            <FABMetricsDisplay metricData={data} />
        </div>
    );
};

const MentalHealthChatbot = ({ onClose }) => {
    const data = modalMetrics.mentalhealth;

    return (
        <div className={`p-8 rounded-3xl bg-gradient-to-br from-teal-50 to-white border border-teal-200 shadow-xl`}>
            <h3 className={`text-2xl font-bold text-teal-800 mb-6 flex items-center gap-3`}>
                <data.icon className='w-7 h-7' /> {data.title}
            </h3>
            
            <div className="space-y-4">
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-inner">
                    <p className='text-sm text-gray-800'>
                        <span className='font-bold text-teal-600'>Wellness Coach AI:</span> Hello! I'm here to help you understand and improve your pet's emotional well-being.
                        We can discuss behavior changes, anxiety, or specific training goals.
                        Start by telling me: "How has Max's energy level been this week?"
                    </p>
                </div>

                {/* Dummy Chat Window */}
                <div className="h-48 bg-gray-100 rounded-xl p-3 flex flex-col justify-end border border-gray-300">
                    <div className="text-sm text-gray-500 text-center">--- Demo Chat History ---</div>
                </div>

                <div className='flex gap-2'>
                    <input 
                        type="text" 
                        placeholder="Type your message here..." 
                        className="w-full p-3 border border-teal-300 rounded-xl focus:ring-teal-500 focus:border-teal-500 transition duration-150"
                        disabled
                    />
                    <button
                        className={`p-3 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 transition-colors shadow-md`}
                        disabled
                    >
                        Send
                    </button>
                </div>
                <p className='text-xs text-gray-500 text-center'>*Full functionality available in premium plan. This is a demo view.</p>
            </div>
            
            <FABMetricsDisplay metricData={data} />
        </div>
    );
};

const SupportModal = ({ isModalOpen, modalType, onClose }) => {
    if (!isModalOpen) return null;

    let ContentComponent;
    
    if (modalType === 'chat') ContentComponent = ChatbotContent;
    else if (modalType === 'enquiry') ContentComponent = EnquiryForm;
    else if (modalType === 'whatsapp') ContentComponent = WhatsAppForm;
    else if (modalType === 'mentalhealth') ContentComponent = MentalHealthChatbot; // New handler
    else return null;

    // Determine color for the modal close button
    const color = modalMetrics[modalType]?.color || 'gray';
    
    return (
        <div className="fixed inset-0 z-[100] bg-gray-900 bg-opacity-70 flex items-center justify-center p-4 transition-opacity">
            <div 
                className="relative w-full max-w-lg mx-auto bg-white rounded-3xl shadow-2xl transition-all max-h-full overflow-y-auto 
                animate-in zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 sm:max-h-[90vh]"
            >
                <button 
                    onClick={onClose} 
                    className={`absolute top-4 right-4 p-2 rounded-full text-white bg-${color}-600 hover:bg-${color}-700 transition-colors z-10 shadow-lg`}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                {/* Renders the selected component */}
                <ContentComponent onClose={onClose} /> 
            </div>
        </div>
    );
};

// --- FAB BUTTONS (Used for general support, not Quick Actions menu) ---

const FloatingActionButtons = ({ setModalState }) => (
    <div className="fixed bottom-8 right-8 z-40 flex flex-col space-y-4 items-end">
        
        {/* Chat With Us (Indigo) */}
        <button
            onClick={() => setModalState({ isModalOpen: true, modalType: 'chat' })}
            className="p-4 bg-indigo-600 text-white rounded-full shadow-xl hover:scale-105 transition-transform duration-200 group relative"
        >
            <MessageSquare className="w-6 h-6" />
            <span className="hidden lg:block absolute right-full top-1/2 transform -translate-y-1/2 mr-4 px-3 py-1 bg-gray-800 text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Chat With Us
            </span>
        </button>

        {/* General Enquiry (Pink) */}
        <button
            onClick={() => setModalState({ isModalOpen: true, modalType: 'enquiry' })}
            className="p-4 bg-pink-600 text-white rounded-full shadow-xl hover:scale-105 transition-transform duration-200 group relative"
        >
            <Info className="w-6 h-6" />
            <span className="hidden lg:block absolute right-full top-1/2 transform -translate-y-1/2 mr-4 px-3 py-1 bg-gray-800 text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                General Enquiry
            </span>
        </button>

        {/* Connect with WhatsApp (Green/Emerald) */}
        <button
            onClick={() => setModalState({ isModalOpen: true, modalType: 'whatsapp' })}
            className="p-4 bg-emerald-600 text-white rounded-full shadow-xl hover:scale-105 transition-transform duration-200 group relative"
        >
            {/* Custom SVG for WhatsApp feel (using Phone icon for functional similarity) */}
            <Phone className="w-6 h-6" /> 
            <span className="hidden lg:block absolute right-full top-1/2 transform -translate-y-1/2 mr-4 px-3 py-1 bg-gray-800 text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Connect with WhatsApp
            </span>
        </button>
    </div>
);


const DashboardPanels = ({ activePet, setActiveTab }) => (
    // Dashboard content using mixed blue, white, and pink cards
    <>
        {/* Left Column - Health & Services (2/3 width) */}
        <div className="lg:col-span-2 space-y-8">
            {/* Notifications - Highlighted with Pink Gradient */}
            <div className="bg-gradient-to-r from-pink-50 to-rose-100 border border-pink-300 rounded-3xl p-6 shadow-2xl">
                <h3 className="text-xl font-bold text-pink-800 mb-4 flex items-center gap-2">
                    <AlertCircle className="w-6 h-6 text-pink-600" /> Urgent Alerts
                    <span className="text-sm font-medium text-pink-600 bg-pink-200 px-3 py-0.5 rounded-full">2 Pending</span>
                </h3>
                <div className="space-y-3">
                    {NOTIFICATIONS.map(notif => (
                        <div key={notif.id} className="flex items-start gap-3 p-4 bg-white rounded-2xl hover:shadow-lg transition-all border border-gray-100">
                            <div className={`w-3 h-3 rounded-full mt-2 flex-shrink-0 ring-2 ring-offset-2 ${
                                notif.severity === 'high' ? 'bg-red-500 ring-red-300' : 'bg-amber-500 ring-amber-300'
                            }`} />
                            <div className='flex-grow'>
                                <p className="font-semibold text-gray-900">{notif.title}</p>
                                <p className="text-xs text-gray-500">2 hours ago • Action required</p>
                            </div>
                            <ChevronRight className='w-5 h-5 text-gray-400' />
                        </div>
                    ))}
                </div>
                <button className='w-full mt-4 p-2 bg-pink-600 text-white rounded-xl text-sm font-semibold hover:bg-pink-700 shadow-md' onClick={() => setActiveTab('alerts')}>
                    Review All Alerts
                </button>
            </div>

            {/* Upcoming Appointments - White/Blue Clean Card */}
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-white/50 shadow-xl shadow-blue-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Calendar className='w-5 h-5 text-indigo-600' /> Upcoming Appointments
                </h3>
                <div className='divide-y divide-gray-100'>
                    {UPCOMING_APPOINTMENTS.map(apt => (
                        <div key={apt.id} className="flex items-center justify-between py-4 hover:bg-blue-50/50 rounded-xl px-2 -mx-2 transition-colors">
                            <div>
                                <p className="font-medium text-gray-900">{apt.pet} • {apt.type}</p>
                                <p className="text-sm text-gray-500">With {apt.doctor}</p>
                            </div>
                            <div className="text-right flex items-center gap-4">
                                <div className='flex flex-col items-end'>
                                    <p className="font-semibold text-indigo-600">{apt.date}</p>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium mt-1 ${
                                        apt.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                                    }`}>
                                        {apt.status}
                                    </span>
                                </div>
                                <ChevronRight className='w-4 h-4 text-gray-400' />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Expenses (Updated with Chart and Prediction) - White/Blue Clean Card */}
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-white/50 shadow-xl shadow-blue-100">
                <ExpenseChart data={EXPENSE_DATA_POINTS} />
                <button className="w-full mt-6 p-3 bg-indigo-600 text-white rounded-2xl font-semibold hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl">
                    View Full Expense Report
                </button>
            </div>
        </div>

        {/* Right Column - Quick Access (1/3 width) */}
        <div className="space-y-8">
            {/* Government Funds - Highlighted with Green Gradient */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-100 rounded-3xl p-6 border border-emerald-300 shadow-2xl shadow-emerald-100">
                <h3 className="text-xl font-bold text-emerald-900 mb-4 flex items-center gap-2">
                    <FileText className='w-5 h-5 text-emerald-600' /> Govt. Funds Portal
                </h3>
                <div className="space-y-3 text-sm">
                    <div className="flex justify-between p-2 bg-emerald-100 rounded-lg">
                        <span className='font-medium text-emerald-800'>Vaccine Subsidy</span>
                        <span className='font-bold text-emerald-900'>₹1,200 avail</span>
                    </div>
                    <div className="flex justify-between p-2">
                        <span className='text-gray-600'>Sterilization Grant</span>
                        <span className='font-semibold text-blue-600'>Applied (Stage 2)</span>
                    </div>
                    <div className="flex justify-between p-2">
                        <span className='text-gray-600'>Emergency Fund</span>
                        <span className='font-semibold text-gray-900'>₹5,000 available</span>
                    </div>
                </div>
                <button className="w-full mt-6 p-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-all shadow-md hover:shadow-lg">
                    Apply Now / Check Status
                </button>
            </div>

            {/* Insurance - Highlighted with Blue Gradient */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-6 border border-blue-300 shadow-2xl shadow-blue-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <ShieldCheck className='w-5 h-5 text-blue-600'/> Health Insurance
                </h3>
                <div className="text-center py-4 bg-white rounded-2xl border border-blue-100 shadow-lg">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full mx-auto mb-3 flex items-center justify-center shadow-lg">
                        <ShieldCheck className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-sm text-blue-800 font-medium mb-1">Active Coverage for {activePet.name}</p>
                    <p className="font-extrabold text-3xl text-blue-700">₹2,00,000</p>
                    <p className='text-xs text-gray-500 mt-1'>Annual Limit</p>
                    <button className='mt-4 text-indigo-600 text-sm font-semibold hover:underline'>File a Claim</button>
                </div>
            </div>

            {/* Marketplace Quick Picks - Highlighted with Pink Accent */}
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-white/50 shadow-xl shadow-pink-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <ShoppingCart className='w-5 h-5 text-pink-600' /> Recommended for {activePet.name}
                </h3>
                <div className="space-y-4">
                    <div className="flex items-center gap-4 p-3 bg-pink-50 rounded-xl border border-pink-100 hover:bg-pink-100 transition-colors">
                        <div className='w-12 h-12 bg-pink-200 rounded-full flex items-center justify-center'><Activity className="w-6 h-6 text-pink-800" /></div>
                        <div className='flex-grow'>
                            <p className="font-semibold text-sm text-gray-900">Joint Supplement</p>
                            <p className="text-xs text-indigo-700 font-bold">₹450 <span className="text-xs line-through text-gray-400 font-normal ml-1">₹650 (30% off)</span></p>
                        </div>
                        <button className='px-3 py-1 bg-pink-600 text-white text-xs font-semibold rounded-full hover:bg-pink-700'>Buy</button>
                    </div>
                    <button className="w-full p-3 bg-gradient-to-r from-blue-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-shadow" onClick={() => setActiveTab('marketplace')}>
                        Shop All Pet Needs
                    </button>
                </div>
            </div>
        </div>
    </>
)


export default function App() {
  const [activePet, setActivePet] = useState(PETS[0])
  const [activeTab, setActiveTab] = useState('dashboard') 
  const [modalState, setModalState] = useState({ isModalOpen: false, modalType: null });


  const QuickActionButton = ({ icon: Icon, label, onClick, variant = 'primary' }) => (
    <button
      onClick={onClick}
      className={`flex flex-col items-center p-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 gap-1.5 w-full h-[100px] ${ // Enforced height h-[100px]
        variant === 'primary' 
          ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white hover:from-blue-700 hover:to-indigo-800' // Blue gradient highlight
          : 'bg-white border-2 border-gray-100 text-gray-700 hover:border-pink-300 hover:bg-pink-50' // White with pink hover
      }`}
    >
      <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${variant === 'secondary' ? 'text-indigo-600' : ''}`} />
      <span className="text-[10px] sm:text-xs font-medium text-center leading-tight">{label}</span>
    </button>
  )

  // All 14 Quick Actions (13 original + 1 new)
  const quickActions = [
    { icon: AlertCircle, label: "Alerts & Rec.", onClick: () => setActiveTab('alerts'), variant: 'primary' }, 
    { icon: Heart, label: "AI Wellness Coach", onClick: () => setModalState({ isModalOpen: true, modalType: 'mentalhealth' }), variant: 'primary' }, // NEW AI CHATBOT
    { icon: TrendingUp, label: "Tracking", onClick: () => setActiveTab('tracking'), variant: 'secondary' },
    { icon: Stethoscope, label: "Remote Consult", onClick: () => setActiveTab('consult'), variant: 'secondary' },
    { icon: Truck, label: "Home Care", onClick: () => setActiveTab('homecare'), variant: 'secondary' },
    { icon: MapPin, label: "Mobile Van", onClick: () => setActiveTab('mobilevan'), variant: 'secondary' },
    { icon: Calendar, label: "Book Appt.", onClick: () => setActiveTab('book'), variant: 'secondary' },
    { icon: ShieldCheck, label: "Vaccination Mgmt", onClick: () => setActiveTab('vaccines'), variant: 'secondary' },
    { icon: Store, label: "Marketplace", onClick: () => setActiveTab('marketplace'), variant: 'secondary' },
    { icon: FileText, label: "Knowledge Hub", onClick: () => setActiveTab('knowledge'), variant: 'secondary' }, 
    { icon: ClipboardList, label: "Treatment Hist.", onClick: () => setActiveTab('treatment'), variant: 'secondary' },
    { icon: Scissors, label: "Grooming Hist.", onClick: () => setActiveTab('grooming'), variant: 'secondary' },
    { icon: Users, label: "Account Settings", onClick: () => setActiveTab('settings'), variant: 'secondary' }, 
    { icon: Download, label: "Consent Mgmt", onClick: () => setActiveTab('consent'), variant: 'secondary' }, 
  ];
  
  // --- DETAILED VIEW COMPONENTS (RENDER FUNCTIONS) ---
  
  const renderAlertsView = () => (
    // Uses pink/red for alerting theme
    <div className="bg-gradient-to-br from-red-50 to-pink-100 rounded-3xl p-6 sm:p-8 border border-pink-300 shadow-2xl space-y-6">
      <h2 className="text-2xl font-bold text-red-800 flex items-center gap-2"><AlertCircle className='w-6 h-6'/> Alerts & Recommendations Hub</h2>
      <p className='text-gray-600'>Timely alerts and personalized suggestions to keep your pet happy and healthy, with cost and discount details.</p>

      <div className="space-y-4">
        {ALERTS_RECOMMENDATIONS.map((alert) => (
            <div key={alert.id} className="flex flex-col p-4 bg-white rounded-xl border-l-4 border-red-400 shadow-md">
                
                {/* Alert Header */}
                <div className='flex items-start justify-between'>
                    <div className='flex items-start'>
                        <alert.icon className={`w-6 h-6 mt-1 flex-shrink-0 mr-4 ${alert.color}`} />
                        <div className='flex-grow'>
                            <p className='font-bold text-gray-900'>{alert.title}</p>
                            <p className='text-sm text-gray-700'>{alert.suggestion}</p>
                        </div>
                    </div>
                    <ChevronRight className='w-5 h-5 text-gray-400 flex-shrink-0 ml-4 mt-1' />
                </div>
                
                {/* Cost/Discount Display */}
                {alert.cost > 0 && (
                    <div className='mt-2 text-xs'>
                        <span className='font-bold text-gray-800'>Est. Cost: ₹{alert.cost.toLocaleString()}</span>
                        {alert.discount > 0 && (
                            <span className='text-green-600 font-bold ml-3'>
                                {alert.discount > 100 ? `(Save ₹${alert.discount})` : `(${alert.discount}% Discount!)`}
                            </span>
                        )}
                    </div>
                )}

                {/* Bidding Block (NEW) */}
                {alert.category === 'Bidding' && (
                    <div className='mt-3 pt-3 border-t border-gray-100 flex justify-between items-center'>
                        <div>
                            <p className='text-xs font-bold text-green-700'>Current Best Bid: ₹4,800</p>
                            <span className='text-xs text-red-500'>*Trend: Price is dropping (15%)</span>
                        </div>
                        <button className='px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-xl hover:bg-green-700 shadow-md'>
                            Place Your Bid Now
                        </button>
                    </div>
                )}
            </div>
        ))}
      </div>
      
      <button className='w-full p-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 shadow-lg'>
          Resolve All Urgent Alerts
      </button>
    </div>
  );

  const renderTrackingView = () => (
    // Uses white/blue theme
    <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-blue-200 shadow-2xl space-y-8">
      <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><TrendingUp className='w-6 h-6 text-indigo-600'/> {activePet.name}'s Health Tracking</h2>
      
      {/* 1. Weight Chart */}
      <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 shadow-inner">
        <h4 className='font-bold text-lg text-blue-800 mb-4'>1. Weight Tracking (Last 12 Months)</h4>
        <WeightChart pet={activePet} />
        <p className='text-xs text-gray-600 text-center mt-4'>*Goal weight is 31.5kg. Stable trend observed.</p>
        <p className='text-xs text-red-500 text-center'></p>
      </div>

      {/* 2. Behavior Chart */}
      <div className="bg-pink-50 p-6 rounded-xl border border-pink-200 shadow-inner">
        <h4 className='font-bold text-lg text-pink-800 mb-4'>2. Activity & Sleep Patterns</h4>
        <div className='flex justify-between items-center bg-white p-4 rounded-xl'>
            <div className='flex flex-col items-center'>
                <Activity className='w-8 h-8 text-green-600' />
                <span className='text-2xl font-bold text-green-600'>9.2 hrs</span>
                <span className='text-sm text-gray-600'>Avg. Daily Activity</span>
            </div>
            <div className='w-px h-16 bg-gray-200 mx-4'></div>
            <div className='flex flex-col items-center'>
                <Clock className='w-8 h-8 text-blue-600' />
                <span className='text-2xl font-bold text-blue-600'>14.5 hrs</span>
                <span className='text-sm text-gray-600'>Avg. Night Sleep</span>
            </div>
            <div className='w-px h-16 bg-gray-200 mx-4'></div>
            <div className='flex flex-col items-center'>
                <AlertCircle className='w-8 h-8 text-amber-600' />
                <span className='text-2xl font-bold text-amber-600'>2</span>
                <span className='text-sm text-gray-600'>Recent Anomalies</span>
            </div>
        </div>
        <p className='text-xs text-gray-600 text-center mt-4'>[Image of a sleep cycle and activity level graph over 24 hours]</p>
      </div>
      
      {/* 3. Eating Habits */}
      <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-200 shadow-inner">
        <h4 className='font-bold text-lg text-emerald-800 mb-4'>3. Eating & Hydration Habits</h4>
        <div className='grid grid-cols-3 gap-4 text-center'>
            <div className='p-3 bg-white rounded-lg'>
                <p className='font-bold text-xl text-emerald-600'>95%</p>
                <p className='text-xs text-gray-600'>Food Consumption</p>
            </div>
            <div className='p-3 bg-white rounded-lg'>
                <p className='font-bold text-xl text-emerald-600'>500 ml</p>
                <p className='text-xs text-gray-600'>Water Intake (Avg.)</p>
            </div>
            <div className='p-3 bg-white rounded-lg'>
                <p className='font-bold text-xl text-amber-600'>2</p>
                <p className='text-xs text-gray-600'>Daily Snacks</p>
            </div>
        </div>
        <button className='w-full mt-4 p-2 bg-emerald-600 text-white rounded-xl text-sm hover:bg-emerald-700'>Log Today's Intake</button>
      </div>
    </div>
  );

  const renderConsultView = () => (
    <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-blue-200 shadow-2xl space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><Stethoscope className='w-6 h-6 text-indigo-600'/> Remote Consultation</h2>
      <p className='text-gray-600'>Connect with certified vets and counselors from anywhere. See ratings, fees, and availability.</p>
      
      <div className="space-y-4">
        {/* Doctor Listing Example 1 */}
        {[
          { 
            name: 'Dr. Riya Sharma (Vet)', 
            rating: 4.9, 
            specialty: 'Canine Orthopedics', 
            available: 'Today 3PM', 
            googleRating: 4.8, 
            fee: 1200, 
            discount: 10
          },
          { 
            name: 'Dr. Alok Varma (Counselor)', 
            rating: 4.7, 
            specialty: 'Separation Anxiety', 
            available: 'Tomorrow 10AM', 
            googleRating: 4.5, 
            fee: 1000, 
            discount: 0
          },
        ].map((doc, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-200 hover:shadow-lg transition-shadow">
            <div>
              <p className="font-bold text-gray-900">{doc.name}</p>
              <p className="text-sm text-gray-600">{doc.specialty}</p>
              <p className="text-xs text-amber-500 font-semibold mb-2">★ {doc.rating} (Platform) | ★ {doc.googleRating} (Google)</p>
              <div className='text-sm'>
                <span className='font-bold text-indigo-800'>Fee: ₹{doc.fee - (doc.fee * doc.discount / 100)}</span>
                {doc.discount > 0 && (
                    <span className='text-xs text-red-500 ml-2 line-through'>₹{doc.fee}</span>
                )}
                {doc.discount > 0 && (
                    <span className='text-xs text-green-600 ml-1 font-semibold'>({doc.discount}% Off)</span>
                )}
              </div>
            </div>
            <div className='text-right'>
                <p className='text-sm text-green-600 font-semibold'>Available: {doc.available}</p>
                <button className='mt-2 px-4 py-1 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700'>Book Now</button>
            </div>
          </div>
        ))}
      </div>
      
      <div className='mt-6 p-4 bg-gray-50 rounded-xl'>
        <p className='text-sm font-semibold'>Secure Payment:</p>
        <p className='text-xs text-gray-500'>Final fee confirmed at booking. Payment processing initiates immediately upon slot confirmation.</p>
      </div>
    </div>
  );

  const renderHomeCareView = () => (
    <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-blue-200 shadow-2xl space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><Truck className='w-6 h-6 text-indigo-600'/> Home Care Services</h2>
      <p className='text-gray-600'>Request a certified specialist to visit your home. Includes service descriptions, real-time availability, and secure payment.</p>
      
      <div className="space-y-4">
        {/* Home Care Provider Listing Example */}
        {[
          { name: 'Dr. Neha Singh (Home Vet)', rating: 4.8, service: 'Routine Check-up & Vaccines', availability: 'Mon-Fri', price: 1500, discount: 5 },
          { name: 'Mr. Vivek (Trainer/Specialist)', rating: 4.6, service: 'At-home Behavioral Training (Session)', availability: 'Weekends', price: 2000, discount: 0 },
        ].map((provider, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-emerald-50 rounded-xl border border-emerald-200 hover:shadow-lg transition-shadow">
            <div>
              <p className="font-bold text-gray-900">{provider.name}</p>
              <p className="text-sm text-gray-600">{provider.service}</p>
              <p className="text-xs text-amber-500 font-semibold mb-2">★ {provider.rating}</p>
              <div className='text-sm'>
                <span className='font-bold text-emerald-800'>Fee: ₹{provider.price - (provider.price * provider.discount / 100)}</span>
                {provider.discount > 0 && (
                    <span className='text-xs text-red-500 ml-2 line-through'>₹{provider.price}</span>
                )}
              </div>
            </div>
            <div className='text-right'>
                <p className='text-sm text-gray-700 font-semibold'>Service Fee</p>
                <button className='mt-2 px-4 py-1 bg-emerald-600 text-white rounded-lg text-sm hover:bg-emerald-700'>Check Availability</button>
            </div>
          </div>
        ))}
      </div>
      
      <div className='mt-6 p-4 bg-gray-50 rounded-xl'>
        <p className='text-sm font-semibold'>Service Description:</p>
        <p className='text-xs text-gray-500'>Vets carry portable diagnostic tools. Pricing includes travel charge (upto 10km). Real-time calendar booking available after selection.</p>
      </div>
    </div>
  );
  
  const renderMobileVanView = () => (
    <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-blue-200 shadow-2xl space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><MapPin className='w-6 h-6 text-indigo-600'/> Mobile Van / Remote Van Services</h2>
      <p className='text-gray-600'>Book the nearest mobile diagnostic and veterinary van for comprehensive services on the go.</p>
      
      <div className='bg-blue-100 p-4 rounded-xl border border-blue-300 space-y-3 shadow-md'>
        <p className="font-bold text-blue-800 flex items-center gap-2"><ClockIcon className='w-4 h-4'/> Next Available Slot near you: </p>
        <p className='text-sm font-semibold text-gray-800'>Location: Community Center Parking Lot (3 km away)</p>
        <p className='text-sm font-semibold text-gray-800'>Time: Tomorrow, Dec 1, 11:30 AM</p>
        <p className='text-xs text-gray-600'>Provider: Dr. Gautam (Mobile Diagnostics Unit)</p>
      </div>

      <h4 className='font-semibold text-lg text-gray-800 pt-2'>Available Services (Flat Fee: ₹1,800, 10% Loyalty Discount):</h4>
      <ul className='grid grid-cols-2 gap-3 text-sm pt-2'>
        <li className='flex items-center gap-2 text-gray-700'><ChevronRight className='w-4 h-4 text-indigo-500'/> Full Diagnostics (Blood, Urine)</li>
        <li className='flex items-center gap-2 text-gray-700'><ChevronRight className='w-4 h-4 text-indigo-500'/> X-Rays & Imaging</li>
        <li className='flex items-center gap-2 text-gray-700'><ChevronRight className='w-4 h-4 text-indigo-500'/> General Consultation</li>
        <li className='flex items-center gap-2 text-gray-700'><ChevronRight className='w-4 h-4 text-indigo-500'/> Minor Treatment/Sutures</li>
      </ul>
      
      <div className='flex justify-between items-center bg-indigo-50 p-3 rounded-xl mt-4 border border-indigo-200'>
        <span className='text-lg font-bold text-indigo-800'>Total Payable: ₹1,620</span>
        <span className='text-xs text-green-600 font-semibold'>(₹180 Saved)</span>
      </div>

      <button className='w-full p-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 shadow-lg'>Book Mobile Van Slot (Pay ₹1,620)</button>
    </div>
  );
  
  const renderBookAppointmentView = () => (
    <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-blue-200 shadow-2xl space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><Calendar className='w-6 h-6 text-indigo-600'/> Book General Appointment</h2>
      <p className='text-gray-600'>Seamlessly book an appointment at a clinic or with a service provider near you.</p>

      <div className="space-y-4">
        {/* Step 1: Service Type */}
        <div className='p-4 bg-blue-50 rounded-xl border border-blue-200'>
          <label className='font-semibold text-gray-700 block mb-2'>1. Select Service Type:</label>
          <select className="w-full p-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option>Veterinary Clinic Visit</option>
            <option>Pet Trainer Session</option>
            <option>Pet Sitter Interview</option>
            <option>Specialist Consultation</option>
          </select>
        </div>
        
        {/* Step 2: Provider Selection */}
        <div className='p-4 bg-blue-50 rounded-xl border border-blue-200'>
          <label className='font-semibold text-gray-700 block mb-2'>2. Choose Provider:</label>
          <p className="text-xs text-gray-500 mb-2">Displaying top-rated providers with their specialties and available times.</p>
          <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
            <p className='font-semibold'>Vet Clinic: Animal Wellness (Rating: ★ 4.7)</p>
            <button className='text-indigo-600 text-sm font-semibold hover:underline'>View Slots</button>
          </div>
        </div>

        {/* Step 3: Payment */}
        <div className='p-4 bg-blue-50 rounded-xl border border-blue-200'>
          <label className='font-semibold text-gray-700 block mb-2'>3. Select Date & Pay:</label>
          <p className="text-sm text-green-600 font-semibold">Slot confirmed: Dec 10, 4:00 PM</p>
          <div className='flex justify-between items-center text-sm font-semibold mb-3'>
            <span>Consultation Fee:</span>
            <span>₹1,000</span>
          </div>
          <button className='w-full mt-3 p-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 shadow-lg'>Proceed to Secure Payment (₹1,000)</button>
        </div>
      </div>
    </div>
  );
  
  const renderVaccinesView = () => (
    <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-blue-200 shadow-2xl space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><ShieldCheck className='w-6 h-6 text-indigo-600'/> {activePet.name}'s Vaccination Management</h2>
      <p className='text-gray-600'>Comprehensive lifetime schedule, completed, and pending vaccinations.</p>

      <div className='space-y-4'>
        {VACCINATION_SCHEDULE.map((vaccine, index) => {
            let bgColor, textColor, statusText, actionText;
            
            if (vaccine.status === 'Done') {
                bgColor = 'bg-green-50';
                textColor = 'text-green-800';
                statusText = `Completed: ${vaccine.date}`;
                actionText = 'Next Due: ' + vaccine.next;
            } else if (vaccine.status === 'Pending') {
                bgColor = 'bg-pink-100'; // Use pink accent for urgency
                textColor = 'text-pink-800';
                statusText = `Due Soon: ${vaccine.next}`;
                actionText = 'Book Now';
            } else { // Recommended
                bgColor = 'bg-gray-50';
                textColor = 'text-gray-800';
                statusText = 'Recommended for current age';
                actionText = 'Learn More & Book';
            }

            return (
                <div key={index} className={`p-4 rounded-xl border shadow-sm ${bgColor} flex justify-between items-center`}>
                    <div>
                        <p className={`font-bold text-lg ${textColor}`}>{vaccine.name}</p>
                        <p className='text-xs text-gray-600'>{statusText}</p>
                    </div>
                    <button 
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors 
                            ${vaccine.status === 'Pending' ? 'bg-pink-600 text-white hover:bg-pink-700' : 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200'}`}
                        disabled={vaccine.status === 'Done'}
                    >
                        {actionText}
                    </button>
                </div>
            )
        })}
      </div>
      
      <div className='mt-6 p-4 bg-gray-50 rounded-xl'>
        <p className='text-sm font-semibold'>Online Booking & Payment:</p>
        <p className='text-xs text-gray-500'>All required vaccines can be booked directly through this portal with online payment options (average cost ₹800/vaccine).</p>
      </div>
    </div>
  );
  
  const renderMarketplaceView = () => (
    <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-pink-200 shadow-2xl space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><Store className='w-6 h-6 text-pink-600'/> Marketplace & Resources</h2>
      <p className='text-gray-600'>Personalized recommendations and a comprehensive search across all pet services and products.</p>

      {/* Personalized Recommendations (Marketplace Suggestions) */}
      <div className="bg-pink-50 p-4 rounded-xl border border-pink-200 shadow-inner">
        <h4 className='font-bold text-xl text-pink-800 mb-3'>🌟 Top Picks for {activePet.name}</h4>
        <div className='space-y-3'>
            {MARKETPLACE_RECOMMENDATIONS.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-3 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                    <item.icon className='w-6 h-6 text-pink-600 flex-shrink-0' />
                    <div className='flex-grow'>
                        <p className="font-semibold text-sm text-gray-900">{item.title}</p>
                        <p className="text-xs text-indigo-700 font-bold">₹{item.price} 
                            {item.discount !== 'New' && <span className="text-xs text-red-500 ml-2 line-through font-normal">₹{item.original}</span>}
                            {item.discount !== 'New' && <span className='text-xs text-green-600 ml-1 font-semibold'>({item.discount} Off)</span>}
                            {item.discount === 'New' && <span className='text-xs text-blue-600 ml-1 font-semibold'>New Arrival</span>}
                        </p>
                    </div>
                    <button className='px-3 py-1 bg-pink-600 text-white text-xs font-semibold rounded-full hover:bg-pink-700'>View</button>
                </div>
            ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className='flex items-center bg-gray-100 p-3 rounded-xl border border-gray-200 mt-6'>
        <Search className='w-5 h-5 text-gray-500 mr-2'/>
        <input type="text" placeholder="Search blogs, videos, or documents..." className='w-full bg-transparent focus:outline-none text-gray-700'/>
      </div>

      <h4 className='font-bold text-gray-800 pt-3'>Service Categories:</h4>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 text-center text-xs font-medium">
        {['Pet Adoption', 'Medicine', 'Clinics', 'Walkers', 'Trainers', 'Grooming', 'Nutrition', 'Pet Dating', 'Subsidies', 'Accessories', 'Video Tutorials', 'Counselors'].map((cat, index) => (
            <div key={index} className='p-3 bg-blue-50 rounded-xl border border-blue-200 hover:bg-blue-100 cursor-pointer transition-colors'>
                {cat}
            </div>
        ))}
      </div>
      
      <h4 className='font-bold text-gray-800 pt-3'>Knowledge Hub:</h4>
      <ul className='space-y-2 text-sm'>
        <li className='text-indigo-600 hover:underline flex justify-between'>Personalized Tip: Managing shedding <ChevronRight/></li>
        <li className='text-indigo-600 hover:underline flex justify-between'>Multilingual Video: How to administer medicine <ChevronRight/></li>
        <li className='text-indigo-600 hover:underline flex justify-between'>Guide: Wanna Be Pet Parent Checklist <ChevronRight/></li>
      </ul>
    </div>
  );

  const renderTreatmentView = () => (
    <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-blue-200 shadow-2xl space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><ClipboardList className='w-6 h-6 text-indigo-600'/> {activePet.name}'s Treatment History</h2>
      <p className='text-gray-600'>Comprehensive history of all consultations, diagnostics (Blood, Xray, USG), and counseling sessions since birth.</p>

      <div className='space-y-4'>
        {TREATMENT_HISTORY.map(record => (
            <div key={record.id} className={`p-4 rounded-xl shadow-md border-l-4 ${record.alert ? 'border-red-500 bg-red-50' : 'border-indigo-500 bg-blue-50'}`}>
                <div className='flex justify-between items-start'>
                    <div>
                        <p className='font-bold text-gray-900'>{record.type} - <span className='font-normal text-sm text-indigo-600'>{record.subType}</span></p>
                        <p className='text-xs text-gray-600 mt-0.5'>Date: {record.date} | Fee: ₹{record.fee.toLocaleString()}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${record.status === 'Complete' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                        {record.status}
                    </span>
                </div>
                <p className='text-sm text-gray-700 mt-2'>Summary: {record.diagnosis}</p>
                <div className='mt-2 border-t border-gray-200 pt-2'>
                    <p className='text-sm font-semibold text-indigo-700'>Recommendation: {record.recommendation}</p>
                    {record.alert && <p className='text-sm font-bold text-red-600 flex items-center gap-1 mt-1'><AlertCircle className='w-4 h-4'/> Urgent Alert!</p>}
                    <div className='flex justify-end gap-2 mt-2'>
                        <button className='text-xs text-blue-600 font-semibold hover:underline'>View Full Report</button>
                        <button className='text-xs text-blue-600 font-semibold hover:underline'>Download Summary</button>
                    </div>
                </div>
            </div>
        ))}
      </div>
      
      <button className='w-full p-3 bg-indigo-500 text-white font-semibold rounded-xl hover:bg-indigo-600 transition-colors shadow-lg'>
        Download All Treatment Records
      </button>
    </div>
  );
  
  const renderGroomingView = () => (
    <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-pink-200 shadow-2xl space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><Scissors className='w-6 h-6 text-pink-600'/> {activePet.name}'s Grooming History</h2>
      <p className='text-gray-600'>Records of all professional grooming services since birth, including notes and next booking recommendations.</p>

      <div className='space-y-4'>
        {GROOMING_HISTORY.map(record => (
            <div key={record.id} className={`p-4 rounded-xl shadow-md border-l-4 ${record.alert ? 'border-yellow-500 bg-yellow-50' : 'border-pink-500 bg-pink-50'}`}>
                <div className='flex justify-between items-start'>
                    <div>
                        <p className='font-bold text-gray-900'>{record.service}</p>
                        <p className='text-xs text-gray-600 mt-0.5'>Date: {record.date} | Fee: ₹{record.fee.toLocaleString()}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800`}>
                        {record.status}
                    </span>
                </div>
                <p className='text-sm text-gray-700 mt-2'>Notes: {record.notes}</p>
                <div className='mt-2 border-t border-gray-200 pt-2'>
                    <p className='text-sm font-semibold text-pink-700'>Recommendation: {record.recommendation}</p>
                    {record.alert && <p className='text-sm font-bold text-yellow-700 flex items-center gap-1 mt-1'><AlertCircle className='w-4 h-4'/> Immediate Booking Recommended!</p>}
                    <div className='flex justify-end gap-2 mt-2'>
                        <button className='text-xs text-blue-600 font-semibold hover:underline'>View Full Report</button>
                    </div>
                </div>
            </div>
        ))}
      </div>
      
      <button className='w-full p-3 bg-pink-600 text-white rounded-xl font-semibold hover:bg-pink-700 shadow-lg'>
        Book Next Grooming Session (15% Off First Booking)
      </button>
    </div>
  );
  
  const renderAccountSettingsView = () => (
    <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-blue-200 shadow-2xl space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><Users className='w-6 h-6 text-indigo-600'/> Account Settings</h2>
      <p className='text-gray-600'>Manage your profile, security, and communication preferences.</p>

      <div className='space-y-3'>
        {ACCOUNT_SETTINGS_OPTIONS.map((setting, index) => (
            <div key={index} className='flex justify-between items-center p-4 bg-blue-50 rounded-xl border border-blue-200 hover:bg-blue-100 transition-colors'>
                <p className='font-semibold text-gray-800'>{setting}</p>
                <ChevronRight className='w-5 h-5 text-indigo-600' />
            </div>
        ))}
      </div>
      
      <button className='w-full p-3 bg-red-100 text-red-700 font-semibold rounded-xl hover:bg-red-200 mt-4'>
          <LogOut className='w-5 h-5 inline-block mr-2' /> Deactivate Account
      </button>
    </div>
  );

  const renderKnowledgePlatformView = () => (
    <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-pink-200 shadow-2xl space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><FileText className='w-6 h-6 text-pink-600'/> Knowledge Hub & Education</h2>
      <p className='text-gray-600'>Curated articles, videos, and guides based on your pet's breed and health status.</p>

      {/* Search */}
      <div className='flex items-center bg-gray-100 p-3 rounded-xl border border-gray-200 mt-6'>
        <Search className='w-5 h-5 text-gray-500 mr-2'/>
        <input type="text" placeholder="Search blogs, videos, or documents..." className='w-full bg-transparent focus:outline-none text-gray-700'/>
      </div>

      <h4 className='font-bold text-gray-800 pt-3 text-lg'>Recommended for {activePet.name}</h4>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {[
            { type: 'Blog', title: 'Top 5 Tips for Golden Retriever Joint Health', topic: 'Joint Care', icon: Activity },
            { type: 'Video', title: 'Home Training: Addressing Separation Anxiety', topic: 'Behavior', icon: Bot },
            { type: 'Document', title: 'Annual Checkup Checklist for Dogs', topic: 'Routine Care', icon: ClipboardList },
          ].map((item, index) => (
              <div key={index} className='p-4 bg-pink-50 rounded-xl border border-pink-200 flex items-center gap-3 hover:bg-pink-100 transition-colors'>
                  <item.icon className='w-6 h-6 text-pink-600 flex-shrink-0'/>
                  <div>
                      <p className='text-xs text-pink-700 font-semibold'>{item.type} | {item.topic}</p>
                      <p className='font-semibold text-gray-900 text-sm'>{item.title}</p>
                  </div>
              </div>
          ))}
      </div>
      <button className='w-full p-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 shadow-lg'>
          Explore Full Knowledge Platform
      </button>
    </div>
  );
  
  const renderContentManagementView = () => (
    <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-blue-200 shadow-2xl space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2"><Download className='w-6 h-6 text-indigo-600'/> Consent & Content Management</h2>
      <p className='text-gray-600'>Manage permissions for sharing your pet's data and accessing specific content.</p>

      <div className='space-y-4'>
        {CONTENT_CONSENTS.map((consent, index) => (
            <div key={index} className={`p-4 rounded-xl border-l-4 ${consent.status === 'Active' ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}>
                <div className='flex justify-between items-center'>
                    <p className='font-bold text-gray-900'>{consent.type}</p>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${consent.status === 'Active' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                        {consent.status}
                    </span>
                </div>
                <p className='text-sm text-gray-700 mt-1'>Reason: {consent.reason}</p>
                <p className='text-xs text-gray-500'>Granted on: {consent.date}</p>
                
                {consent.status === 'Active' && (
                    <button className='mt-2 text-red-600 text-sm font-semibold hover:underline'>Revoke Consent</button>
                )}
                {consent.status === 'Expired' && (
                    <button className='mt-2 text-green-600 text-sm font-semibold hover:underline'>Renew Consent</button>
                )}
            </div>
        ))}
      </div>
      <p className='text-xs text-gray-500 mt-4'>Content Management includes the ability to review and download previous billing invoices, reports, and generated documents.</p>
    </div>
  );
  

  const renderContent = () => {
    // Renders the specific view based on the activeTab state
    if (activeTab === 'alerts') return renderAlertsView(); 
    if (activeTab === 'tracking') return renderTrackingView();
    if (activeTab === 'consult') return renderConsultView();
    if (activeTab === 'homecare') return renderHomeCareView();
    if (activeTab === 'mobilevan') return renderMobileVanView();
    if (activeTab === 'book') return renderBookAppointmentView();
    if (activeTab === 'vaccines') return renderVaccinesView();
    if (activeTab === 'marketplace') return renderMarketplaceView();
    if (activeTab === 'treatment') return renderTreatmentView();
    if (activeTab === 'grooming') return renderGroomingView();
    if (activeTab === 'settings') return renderAccountSettingsView(); 
    if (activeTab === 'knowledge') return renderKnowledgePlatformView(); 
    if (activeTab === 'consent') return renderContentManagementView(); 

    // Default to Dashboard Panels
    return <DashboardPanels activePet={activePet} setActiveTab={setActiveTab} />;
  }

  return (
    // Updated background gradient to white, blue, and pink
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-pink-100 font-sans">
      {/* Header - py reduced to py-2 */}
      <header className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2"> {/* py reduced for smaller header height */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-pink-600 rounded-lg flex items-center justify-center"> 
                <PawPrint className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-extrabold bg-gradient-to-r from-gray-900 to-indigo-700 bg-clip-text text-transparent">
                  PetJoyFeets360 
                </h1>
                <p className="text-xs text-gray-500 hidden sm:block">Welcome back, Priya ( CCUID - 10000) !</p>
              </div>
            </div>
            
            {/* Multilingual Selector & Logout */}
            <div className="flex items-center gap-3">
                
                {/* Search Bar (Mobile hidden, Desktop/Tablet visible) */}
                <div className="hidden md:flex items-center border border-gray-200 rounded-full px-3 py-1 bg-gray-50/70 w-52 transition-all focus-within:w-64 focus-within:ring-2 focus-within:ring-indigo-300">
                    <Search className='w-4 h-4 text-gray-500'/>
                    <input type="text" placeholder="Search PetJoy..." className='bg-transparent w-full ml-2 text-sm focus:outline-none'/>
                </div>

                {/* Language Selector (Complex Component) */}
                <LanguageSelector />

                {/* Logout Button */}
                <button 
                    className="p-2 bg-pink-600 text-white rounded-xl hover:bg-pink-700 transition-colors shadow-md flex items-center gap-1 text-sm font-medium"
                    onClick={() => console.log('User logged out.')} // Placeholder logout action
                >
                    <LogOut className='w-5 h-5'/>
                    <span className='hidden sm:inline'>Logout</span>
                </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Pet Selector & Pet Detail Summary (Top Section) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10"> 
          {/* Pet Selector */}
          <div className="lg:col-span-2">
            {/* Professional Card Styling */}
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-6 border border-white shadow-2xl shadow-blue-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">My Companions</h2> 
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors shadow-lg flex-shrink-0">
                  + Add Pet
                </button>
              </div>
                {/* COMPANIONS: Wrapping Grid, Smaller Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3"> 
                {PETS.map(pet => (
                  <div
                    key={pet.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => setActivePet(pet)}
                    className={`group cursor-pointer p-3 rounded-xl border-2 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] ${ 
                      activePet.id === pet.id
                        ? 'border-indigo-500 bg-blue-50 shadow-lg ring-2 ring-indigo-200' // Blue accent when active
                        : 'border-gray-100 bg-white hover:border-pink-200 hover:bg-pink-50' // Pink accent on hover
                    }`}
                  >
                    <img 
                        src={pet.photo} 
                        alt={pet.name} 
                        className="w-full h-20 object-cover rounded-lg mb-2 group-hover:scale-[1.03] transition-transform duration-500" 
                        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/200x200/cccccc/000000?text=Pet" }}
                    />
                    <div className="text-center">
                      <h3 className="font-bold text-base text-gray-900">{pet.name}</h3>
                      <p className="text-[10px] text-gray-500">{pet.type} • {pet.breed}</p>
                      <div className="flex items-center justify-center gap-1 mt-1">
                        <Heart className="w-3 h-3 text-pink-500 fill-pink-500" /> {/* Use pink heart */}
                        <span className="text-xs font-semibold text-green-600">{pet.healthScore}% Health</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pet Detail Summary (Remains static based on activePet) */}
          <div>
            <PetDetailSummary pet={activePet} />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            Quick Actions
            <Zap className="w-6 h-6 text-indigo-600 fill-indigo-100" />
          </h2>
          {/* QUICK ACTIONS: Wrapping Grid, two rows on desktop/laptop. */}
          <div className="grid grid-cols-4 sm:grid-cols-7 lg:grid-cols-7 gap-3">
            {quickActions.map(action => (
                <QuickActionButton 
                    key={action.label} 
                    icon={action.icon} 
                    label={action.label} 
                    onClick={action.onClick} 
                    variant={action.variant} 
                />
            ))}
          </div>
        </div>

        {/* Dynamic Content Area */}
        {activeTab !== 'dashboard' && (
            <button 
                onClick={() => setActiveTab('dashboard')} 
                className="mb-6 px-4 py-2 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition-colors flex items-center gap-1 shadow-md">
                <ChevronLeft className='w-4 h-4' /> Back to Dashboard Overview
            </button>
        )}
        
        {/* Dynamic Content Rendering */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {activeTab === 'dashboard' ? (
                // Dashboard view uses the full grid layout for its panels
                <DashboardPanels activePet={activePet} setActiveTab={setActiveTab} />
            ) : (
                // Detailed views are set to span all 3 columns (landscape orientation)
                <div className="lg:col-span-3">
                    {renderContent()}
                </div>
            )}
        </div>
      </div>

      {/* Floating Action Buttons (FAB) - Visible only on Dashboard */}
      {activeTab === 'dashboard' && (
        <FloatingActionButtons setModalState={setModalState} />
      )}

      {/* Unified Modal System */}
      <SupportModal
        isModalOpen={modalState.isModalOpen}
        modalType={modalState.modalType}
        onClose={() => setModalState({ isModalOpen: false, modalType: null })}
      />
    </div>
  )
}