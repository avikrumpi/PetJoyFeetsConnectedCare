// ========================================================================
// CANCER PATIENT'S HEALTH EDUCATION - COMPLETE APP.JS (UPDATED FOR IMAGES AND ALL SECTIONS)
// ========================================================================

 // Complete application state based on Streamlit app
const appState = {
    currentState: 'start',
    healthCategory: null,
    selectedSubcategory: null,
    selectedDistrict: null,
    askedQuestions: [],
    q1ToQ5History: [],
    q6ToQ12History: [],
    conversationHistory: [],
    awaitingContactConfirmation: false,
    awaitingDistrictSelection: false,
    initialRagDone: false,
    awaitingFollowupDecision: false,
    followupCount: 0,  // ✅ Should already exist
    countdownSeconds: 90,
    countdownTimer: null
};

// District list for Bengal (5 districts)
const DISTRICT_LIST = [
    "বীরভূম",
    "পুরুলিয়া",
    "বাঁকুড়া",
    "বর্ধমান",
    "আসানসোল"
];

// Cancer Patient's Health Resources (matching Python exactly) - Updated with Asansol
const CANCER_HEALTH_RESOURCES = {
    "বীরভূম": {
        "centers": [
            {"name": "বীরভূম জেলা হাসপাতাল স্ত্রীরোগ বিভাগ", "phone": "03462-255200", "address": "সিউড়ি, বীরভূম"},
            {"name": "মাতৃত্ব সেবা কেন্দ্র, রামপুরহাট", "phone": "03461-222001", "address": "রামপুরহাট"},
            {"name": "Tele-MANAS (জাতীয় ২৪/৭ সহায়তা)", "phone": "14416", "address": "২৪/৭ সরকারি সহায়তা"}
        ],
        "doctors": [
            {"name": "ড. মালবিকা মুখার্জী (স্ত্রীরোগ বিশেষজ্ঞ)", "phone": "9830012345"},
            {"name": "ড. শর্মিষ্ঠা ব্যানার্জী (প্রসূতি বিশেষজ্ঞ)", "phone": "9830023456"}
        ]
    },
    "পুরুলিয়া": {
        "centers": [
            {"name": "পুরুলিয়া সদর হাসপাতাল স্ত্রীরোগ বিভাগ", "phone": "03252-222001", "address": "পুরুলিয়া শহর"},
            {"name": "প্রাথমিক স্বাস্থ্য কেন্দ্র, ঝালদা", "phone": "03253-245001", "address": "ঝালদা"}
        ],
        "doctors": [
            {"name": "ড. অনিন্দিতা দাস (স্ত্রীরোগ বিশেষজ্ঞ)", "phone": "9830034567"},
            {"name": "ড. রীতা সেন (প্রসূতি বিশেষজ্ঞ)", "phone": "9830045678"}
        ]
    },
    "বাঁকুড়া": {
        "centers": [
            {"name": "বাঁকুড়া সম্মিলনী মেডিকেল কলেজ স্ত্রীরোগ বিভাগ", "phone": "7029473375", "address": "বাঁকুড়া সদর"},
            {"name": "মাতৃত্ব সেবা কেন্দ্র, খাতরা", "phone": "03242-267001", "address": "খাতরা"}
        ],
        "doctors": [
            {"name": "ড. দেবযানী রায় (স্ত্রীরোগ বিশেষজ্ঞ)", "phone": "9830056789"},
            {"name": "ড. শ্রেয়সী ঘোষ (প্রসূতি বিশেষজ্ঞ)", "phone": "9830067890"}
        ]
    },
    "বর্ধমান": {
        "centers": [
            {"name": "বর্ধমান মেডিক্যাল কলেজ স্ত্রীরোগ বিভাগ", "phone": "0342-2662000", "address": "বর্ধমান শহর"},
            {"name": "মাতৃত্ব সেবা কেন্দ্র, কাটোয়া", "phone": "03453-252001", "address": "কাটোয়া"}
        ],
        "doctors": [
            {"name": "ড. সুমিতা চট্টোপাধ্যায় (স্ত্রীরোগ বিশেষজ্ঞ)", "phone": "9830078901"},
            {"name": "ড. পূর্ণিমা সাহা (প্রসূতি বিশেষজ্ঞ)", "phone": "9830089012"}
        ]
    },
    "আসানসোল": {
        "centers": [
            {"name": "আসানসোল জেলা হাসপাতাল স্ত্রীরোগ বিভাগ", "phone": "0341-2203101", "address": "আসানসোল"},
            {"name": "মাতৃত্ব সেবা কেন্দ্র, বার্নপুর", "phone": "0341-2274001", "address": "বার্নপুর"}
        ],
        "doctors": [
            {"name": "ড. কল্যাণী ব্যানার্জী (স্ত্রীরোগ বিশেষজ্ঞ)", "phone": "9830090123"},
            {"name": "ড. মৌসুমী দাস (প্রসূতি বিশেষজ্ঞ)", "phone": "9830091234"}
        ]
    }
};

const DISTRICTS = Object.keys(CANCER_HEALTH_RESOURCES);

// Health categories matching Python exactly
const HEALTH_CATEGORIES = {
    "start": {
    "botPrompt": "নমস্কার! আমি নারীশক্তি, আপনার অস্থি ও সন্ধি বিষয়ক স্বাস্থ্য সংক্রান্ত প্রশ্নে সাহায্য করতে এসেছি। আপনি কোন ধরনের হাড়/পেশী/অর্থোপেডিক সমস্যার বিষয়ে কথা বলতে চান?",
    "options": [
        "১. পারভো ভাইরাস",
        "২. ডিসটেম্পার ভাইরাস",
        "৩. রেবিস",
        "৪. কৃমি সমস্যা",
        "৫. চর্মরোগ",
        "৬. কান পাকা",
        "৭. মাড়ির রোগ",
        "৮. মূত্রনালীর সংক্রমণ",
        "৯. চোখের সংক্রমণ",
        "১০. শ্বাসযন্ত্রের সংক্রমণ",
        "১১. হিট স্ট্রোক",
        "১২. অ্যালার্জি"
    ],

    "nextStateMap": {
        "১. পারভো ভাইরাস" : "Parvovirus",
        "২. ডিসটেম্পার ভাইরাস" : "Distemper",
        "৩. রেবিস" : "Rabies",
        "৪. কৃমি সমস্যা" : "Worm Infestation",
        "৫. চর্মরোগ" : "Skin Disease",
        "৬. কান পাকা" : "Ear Infection",
        "৭. মাড়ির রোগ" : "Gingivitis/Periodontal Disease",
        "৮. মূত্রনালীর সংক্রমণ" : "Urinary Tract Infection (UTI)",
        "৯. চোখের সংক্রমণ" : "Eye Infection",
        "১০. শ্বাসযন্ত্রের সংক্রমণ" : "Respiratory Infection",
        "১১. হিট স্ট্রোক" : "Heatstroke",
        "১২. অ্যালার্জি" : "Allergy"
     }
},

  "parvovirus": {
    "botPrompt": "পারভো ভাইরাস সংক্রান্ত কোন সমস্যা জানতে চান?",
    "options": [
      "ডায়রিয়া",
      "পুচকা বা রক্তক্ষরণ",
      "অতিরিক্ত ক্লান্তি",
      "বমি হওয়া",
      "ভয়াবহ ডিহাইড্রেশন"
    ]
  },
  "distemper": {
    "botPrompt": "ডিসটেম্পার ভাইরাস সংক্রান্ত কোন সমস্যা জানতে চান?",
    "options": [
      "হাঁচি কাশির সমস্যা",
      "জ্বর",
      "চোখ ও নাক থেকে স্রাব",
      "চলাফেরায় অস্বচ্ছলতা",
      "মূত্রত্যাগে সমস্যা"
    ]
  },
  "rabies": {
    "botPrompt": "রেবিস সংক্রান্ত কোন সমস্যা জানতে চান?",
    "options": [
      "আক্রমণাত্মক আচরণ",
      "চুলকানি ও অসুবিধাজনক জলপান",
      "পাগলের মতো আচরণ",
      "দুর্বলতা বা পা দুর্বল হওয়া",
      "মূর্ছা বা মৃত্যুর ঝুঁকি"
    ]
  },
  "worm_infestation": {
    "botPrompt": "কৃমি সমস্যা সংক্রান্ত কোন সমস্যা জানতে চান?",
    "options": [
      "পেট ফোলা",
      "জীবনশক্তি হ্রাস",
      "বমি ও ডায়রিয়া",
      "জোরালো আঁচড়ানো",
      "ওয়েট লস"
    ]
  },
  "skin_disease": {
    "botPrompt": "চর্মরোগ সংক্রান্ত কোন সমস্যা জানতে চান?",
    "options": [
      "ক্ষত লাল হওয়া",
      "চুল ওঠা",
      "চুলকানি",
      "ত্বকে ফোলা বা ফুলে থাকা",
      "ঘা বা ছত্রাকের চিহ্ন"
    ]
  },
  "ear_infection": {
    "botPrompt": "কান পাকা সংক্রান্ত কোন সমস্যা জানতে চান?",
    "options": [
      "কান থেকে দুর্গন্ধ",
      "কানের ভিতর চুলকানি",
      "কানে লালচে ভাব",
      "কান থেকে পুঁজ বা তরল নির্গমন",
      "শুনতে অসুবিধা"
    ]
  },
  "gingivitis_periodontal": {
    "botPrompt": "মাড়ির রোগ সংক্রান্ত কোন সমস্যা জানতে চান?",
    "options": [
      "মাড়ি লাল বা ফুলে থাকা",
      "মাড়ি থেকে রক্তপাত",
      "দাঁতের চারপাশে ব্যথা",
      "দাঁত ঢিলা হয়ে যাওয়া",
      "দাঁত গন্ধ"
    ]
  },
  "urinary_tract_infection": {
    "botPrompt": "মূত্রনালীর সংক্রমণ সংক্রান্ত কোন সমস্যা জানতে চান?",
    "options": [
      "মূত্রত্যাগে ব্যথা",
      "জীবনশক্তি কমে যাওয়া",
      "জোরালো মূত্রত্যাগ",
      "রক্তাক্ত মূত্র",
      "পেটে ব্যথা"
    ]
  },
  "eye_infection": {
    "botPrompt": "চোখের সংক্রমণ সংক্রান্ত কোন সমস্যা জানতে চান?",
    "options": [
      "চোখ লাল হওয়া",
      "চোখ থেকে জল পড়া",
      "চোখে ফোলা বা সুঁচানি",
      "আঁধারাচ্ছন্নতা বা ঝাপসা দৃষ্টি",
      "চোখে ঘর্ষণ"
    ]
  },
  "respiratory_infection": {
    "botPrompt": "শ্বাসযন্ত্রের সংক্রমণ সংক্রান্ত কোন সমস্যা জানতে চান?",
    "options": [
      "কাশি",
      "শ্বাসকষ্ট",
      "জ্বর",
      "নাক দিয়ে স্রাব",
      "স্লেজ জমা হওয়া"
    ]
  },
  "heatstroke": {
    "botPrompt": "হিট স্ট্রোক সংক্রান্ত কোন সমস্যা জানতে চান?",
    "options": [
      "অতিরিক্ত শ্বাস নেওয়া",
      "মাথা ঘোরা",
      "অজ্ঞান হওয়া",
      "বেশি লালা প্রবাহিত হওয়া",
      "উর্ধ্বতন তাপমাত্রা"
    ]
  },
  "allergy": {
    "botPrompt": "অ্যালার্জি সংক্রান্ত কোন সমস্যা জানতে চান?",
    "options": [
      "ত্বকে ফুসকুড়ি",
      "চুলকানি",
      "কাশি",
      "চোখ লাল হওয়া",
      "শ্বাসকষ্ট"
    ]
  }
};

// Question sequences matching Python exactly
const QUESTION_SEQUENCES = {
  "parvovirus": [
    "আপনার কুকুরছানার বয়স কত?",
    "কবে প্রথম লক্ষণ দেখা দিল?",
    "কুকুরের কি বমি করছে?",
    "ডায়রিয়া হয়েছে কি?",
    "ডায়রিয়ার সঙ্গে রক্ত আছে কি?",
    "কতোদিন ধরে খিদে কমেছে?",
    "কুকুর কী খুব দুর্বল লাগছে?",
    "শ্বাসকষ্ট বা তীব্র শ্বাসপ্রশ্বাস আছে?",
    "কোনো টিকা দিয়েছেন কি?",
    "কুকুরে জ্বর হয়েছে?",
    "পাল্টানো আচরণ বা অসাধারণ আগ্রাসন লক্ষ করেছেন?",
    "পশু চিকিৎসকের দেখাশোনা হয়েছে?",
    "কোনও চিকিৎসা বা ওষুধ নিচ্ছেন?",
    "কুকুরের ওজন কমে গেছে কি?",
    "অ্যাডমিটেড হয়েছে কি?"
  ],
  "distemper": [
    "কবে প্রথম হাঁচি বা কাশি শুরু হয়েছে?",
    "কুকুরের গলা ব্যথা হচ্ছে?",
    "চোখ থেকে বা নাক থেকে স্রাব পড়ছে?",
    "কুকুর ঠিকমতো খাবার খাচ্ছে?",
    "জ্বর আছে কি?",
    "খুব দুর্বল অনুভব করছেন?",
    "চলাফেরায় সমস্যা হচ্ছে?",
    "কোনও টিকা নিয়েছেন?",
    "বাচ্চাদের মধ্যে রোগ ছড়িয়েছে কি?",
    "পশু চিকিৎসকের পরামর্শ নিয়েছেন?",
    "কোনো চিকিৎসা চলছে?",
    "কুকুরে জ্ঞান হারানোর লক্ষণ আছে?",
    "শ্বাসকষ্ট হচ্ছে কি?",
    "অস্বাভাবিক আচরণ রয়েছে?",
    "ঔষধের প্রতি কোনো রিঅ্যাকশন হয়েছে কি?"
  ],
  "rabies": [
    "কুকুরে আক্রমণাত্মক চালচলন দেখা দিয়েছে?",
    "পানি পান করতে কষ্ট হচ্ছে?",
    "চলাফেরা দুর্বল হয়েছে?",
    "শরীরে দুর্বলতা বা পা অবশ হয়েছে?",
    "জ্বর হয়েছে কি?",
    "বিভিন্ন সময় চুলকানি হচ্ছে?",
    "কখন থেকে এমন আচরণ শুরু?",
    "কোনো কামড় বা খোঁচা লগেছে?",
    "পশু চিকিৎসকের কাছে গেছেন?",
    "টিকা দিয়েছেন কি?",
    "অত্যাধিক লালা পড়ছে?",
    "পাগলের মতো আচরণ করছেন?",
    "আবেগ পরিবর্তন হয়েছে?",
    "শ্বাসকষ্ট বা ঘুমের সমস্যা?",
    "মৃত্যু হয়েছে?"
  ],
  "worm_infestation": [
    "কুকুরে কি বমি হচ্ছে?",
    "পেটে ফোলা লক্ষ করছেন?",
    "কুকুরের ওজন কমে যাচ্ছে?",
    "বমি বা ডায়রিয়া হয়েছে?",
    "খাদ্য গ্রহণে সমস্যা হচ্ছে?",
    "পেটে টান অনুভব হচ্ছে?",
    "পেটের একটি অংশে কঠিনতা আছে?",
    "জীবন শক্তি কমে গিয়েছে?",
    "পশু চিকিৎসক দেখিয়েছেন?",
    "কুড়ানো বা খোঁচাচ্ছে?",
    "কোনো ঔষধ ব্যবহার করছেন?",
    "কুকুরের গর্ত বা মল দেখতে কৃত্রিম আছে?",
    "শরীরে ঘা বা ফোলা?",
    "পরিবারের অন্যান্য পোষ্য আক্রান্ত হয়েছে?",
    "টিকা নিয়েছেন কি?"
  ],
  "skin_disease": [
    "কোন এলাকায় ত্বকে সমস্যা হচ্ছে?",
    "চুলকানি কতদিন ধরে চলছে?",
    "ত্বকে লালচে ভাব বা ফোলা?",
    "ত্বক ছিঁড়ে যাচ্ছে?",
    "চুল পড়ে যাচ্ছে?",
    "ঘা বা ফোস্কা আছে?",
    "পশু চিকিৎসকের কাছে গেছেন?",
    "কোনো ঔষধ ব্যবহার করছেন?",
    "ত্বকে ছত্রাকের আভাস আছে?",
    "অতিরিক্ত ত্বক শুষ্ক হচ্ছে?",
    "ক্ষত হচ্ছে বা রক্তপাত হচ্ছে?",
    "আত্ম-চিকিৎসা করেছেন?",
    "পরিবারের অন্য পোষা প্রাণীতেও লক্ষণ আছে?",
    "কোনো এলার্জির ইতিহাস আছে কি?",
    "ত্বকের রং বদলেছে কি?"
  ],
  "ear_infection": [
    "কানের কোন অংশে সমস্যা?",
    "কান লালচে বা ফুলে গেছে?",
    "কানের মধ্যে পুঁজ বা তরল নির্গমণ আছে?",
    "কানে চুলকানি হচ্ছে কি?",
    "কানে দুর্গন্ধ আসছে?",
    "শুনতে কষ্ট হচ্ছে?",
    "কখন থেকে সমস্যা?",
    "পশু চিকিৎসকের কাছে গেছেন?",
    "কোনো ঔষধ ব্যবহার করছেন?",
    "কানে আঘাত লেগেছে?",
    "ত্বকে সংক্রমণ ছড়িয়েছে?",
    "কান পরিষ্কার করছেন কি?",
    "কান ধুলোময়লা বা পানি পড়েছে?",
    "কান ধরার সময় কুকুরে যন্ত্রণার সংকেত?",
    "কানের ব্যথা শারীরিক ক্রিয়াকলাপে বাড়ে?"
  ],
  "gingivitis_periodontal": [
    "মাড়ি লালচে বা ফুলে আছে?",
    "মাড়ি থেকে রক্তপাত হয়?",
    "দাঁত মাজতে অসুবিধা?",
    "দাঁতের মুখে দুর্গন্ধ আছে?",
    "খাবার খাওয়াতে সমস্যা?",
    "দাঁত ঢিলা বা নড়মান করে?",
    "দাঁতের চারপাশে ব্যথা আছে?",
    "পশু চিকিৎসকের কাছে গেছেন?",
    "কোনো ওষুধ নিচ্ছেন?",
    "দাঁত ধোছেন কি?",
    "খাবারের রুচি কমেছে?",
    "জিভে বা মুখে এলার্জি?",
    "রক্তস্বল্পতা লক্ষ করেছেন?",
    "মাড়ির শুকনো ভাব আছে?",
    "দাঁতের অসুখ কবে থেকে?"
  ],
  "urinary_tract_infection": [
    "মূত্রত্যাগে ব্যথা বা অসুবিধা?",
    "মূত্রের রং পরিবর্তন হয়েছে?",
    "মূত্রে রক্ত আছে কি?",
    "মূত্রত্যাগের সংখ্যা বেশি বা কম?",
    "কোন অসুবিধার জন্য চিকিত্সা নিচ্ছেন?",
    "জ্বর বা দুর্বলতা আছে?",
    "পেটে ব্যথা বা অস্বস্তি?",
    "পশু চিকিৎসকের কাছে গেছেন?",
    "ঔষধ নিয়েছেন কি?",
    "কখন প্রথম লক্ষণ দেখা দিল?",
    "বাথরুমে সময় বেশি লাগে?",
    "মূত্রে দুর্গন্ধ আছে?",
    "পায়ে বা শরীরে ফোলা?",
    "খাবার খেতে সমস্যা হচ্ছে?",
    "পরিবারের অন্য পোষাগুলোর মধ্যে একই রোগ?"
  ],
  "eye_infection": [
    "চোখ লালচে বা ফোলা?",
    "চোখ থেকে জল পড়ছে?",
    "চোখে সূক্ষ্ম রগ গজিয়েছে?",
    "চোখে মৃদু বা তীব্র ব্যথা?",
    "চোখে স্রাব বা পুঁজ আছে?",
    "দৃষ্টি ঝাপসা বা অস্পষ্ট?",
    "চোখ ঘষছে বা ছুঁইছে?",
    "কখন থেকে লক্ষণ শুরু?",
    "পশু চিকিৎসকের কাছে গেছেন?",
    "ঔষধ নিচ্ছেন কি?",
    "আলোতে কুকুর চরম অসুবিধায়?",
    "কোনো আঘাত লেগেছে?",
    "চোখের চারপাশে রক্তবর্ণ বা রঙ্গীন ভাব?",
    "ছটফট করছে চোখ?",
    "চোখের রোগীত্বা আছে পছন্দ করেন?"
  ],
  "respiratory_infection": [
    "কাশি কতদিন ধরে?",
    "শ্বাসকষ্ট বা দ্রুত শ্বাস নিচ্ছে?",
    "জ্বরে আক্রান্ত?",
    "নাক দিয়ে স্রাব পড়ছে?",
    "ছাপছাড়া বা ক্লান্ত লাগছে?",
    "খাবার খেতে অসুবিধা?",
    "শ্বাস ফেলার সময় শব্দ হচ্ছে?",
    "পশু চিকিৎসক দেখিয়েছেন কি?",
    "ঔষধ নিচ্ছেন কি?",
    "কখন প্রথম লক্ষণ দেখা দিয়েছে?",
    "নিয়মিত বসবাস কোথায়?",
    "পরিবারের অন্য পোষাগুলোর মধ্যে একই সমস্যা?",
    "গলা ব্যথা বা গলা ফোলা?",
    "কোনো শ্বাসরোধের লক্ষণ?",
    "চিন্তাজনক অতিরিক্ত থকথকে জ্বর?"
  ],
  "heatstroke": [
    "কুকুর কী অতিরিক্ত শ্বাস নিচ্ছে?",
    "চোখে অস্বাভাবিক প্রতিক্রিয়া?",
    "জ্ঞান হারানোর লক্ষণ?",
    "অস্বাভাবিক দুর্বলতা নির্দেশ?",
    "শরীরের উচ্চ তাপমাত্রা অনুভব?",
    "বেশি লালা প্রবাহিত হচ্ছে?",
    "চালচলায় অসুবিধা?",
    "পিছন দিক চাপ পড়ছে?",
    "কখন থেকে লক্ষণ শুরু?",
    "পশু চিকিৎসকের কাছে গেছেন?",
    "ঔষধ বা চিকিৎসা নিচ্ছেন?",
    "স্নান বা ঠান্ডা পানি পরিবেশ হয়েছে?",
    "যথেষ্ট পানি পান করছে কি?",
    "কোনো খাবার বা পানীয় পরিবর্তন হয়েছে?",
    "অতিরিক্ত উত্তেজিত হয়েছে?"
  ],
  "allergy": [
    "কোন কোন স্থানে ফুসকুড়ি বা র‍্যাশ?",
    "চুলকানি বা ছুয়ে অসুবিধা?",
    "কাশি বা শ্বাসকষ্ট আছে কি?",
    "চোখ লালচে বা জল পড়ছে?",
    "স্বাভাবিক থেকেও বেশি ঝুঁকি দেখা গেছে?",
    "খাবারের সাথে সম্পর্ক দেখেছেন?",
    "কোনো নতুন পরিবেশে নিয়ে গেছেন?",
    "ঔষধ নিচ্ছেন বা প্রতিক্রিয়া পেয়েছেন?",
    "পশু চিকিৎসকের পরামর্শ নিয়েছেন?",
    "আলো বা ধুলোতে কেকেড়ে যায়?",
    "ত্বকে গম্ভীরতা আছে কি?",
    "পরিবারের অন্য পোষাগুলোর মধ্যে একই সমস্যা?",
    "অনিয়মিত খাবার খেলে কি সমস্যা বাড়ে?",
    "রাতের সময় বেশি অসুবিধা হয়?",
    "কারণে বা সমাধানে চিকিৎসা হচ্ছে?"
  ]
};

const diseases = [
{
    name: 'Canine Parvovirus',
    category: 'Viral Disease',
    ageGroup: 'Puppies and unvaccinated dogs',
    symptoms: [
        'Severe vomiting',
        'Bloody diarrhea',
        'Extreme dehydration',
        'Lethargy',
        'Loss of appetite'
    ],
    causes: [
        'Parvovirus type 2 (CPV-2)',
        'Contact with infected dogs',
        'Contaminated surfaces and objects',
        'Lack of vaccination'
    ],
    treatment: [
        'Hospitalization with IV fluids',
        'Antiemetic medications',
        'Antibiotics for secondary infections',
        'Nutritional support',
        'Supportive care'
    ],
    prevention: 'Timely vaccinations, proper sanitation, avoiding contact with infected dogs, disinfection of living spaces.',
    imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b',
    citation: '<a href="https://www.nhp.gov.in/" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">National Health Portal. Canine Parvovirus. 2025.</a>'
},

{
    name: 'Canine Distemper',
    category: 'Viral Disease',
    ageGroup: 'Puppies and adult dogs',
    symptoms: [
        'Fever and nasal discharge',
        'Coughing and difficulty breathing',
        'Vomiting and diarrhea',
        'Neurological symptoms',
        'Hardening of paw pads'
    ],
    causes: [
        'Canine distemper virus (CDV)',
        'Airborne exposure',
        'Contact with infected animals',
        'Lack of vaccination'
    ],
    treatment: [
        'Supportive care',
        'IV fluids',
        'Antibiotics for secondary infections',
        'Anti-seizure medications',
        'Nutritional support'
    ],
    prevention: 'Vaccination is the only effective preventive measure. Ensure all booster doses.',
    imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b',
    citation: '<a href="https://www.nhp.gov.in/" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">National Health Portal. Canine Distemper. 2025.</a>'
},

{
    name: 'Rabies',
    category: 'Viral Zoonotic Disease',
    ageGroup: 'All ages',
    symptoms: [
        'Aggression and behavioral changes',
        'Excessive salivation',
        'Difficulty swallowing',
        'Paralysis',
        'Hydrophobia'
    ],
    causes: [
        'Rabies virus',
        'Bite from infected animal',
        'Exposure to stray animals',
        'Contaminated saliva entering wounds'
    ],
    treatment: [
        'No treatment once symptoms appear',
        'Post-exposure prophylaxis immediately after bite',
        'Quarantine of suspected animals',
        'Euthanasia in confirmed cases'
    ],
    prevention: 'Mandatory annual rabies vaccinations, avoiding unvaccinated stray animals, immediate wound cleaning after bites.',
    imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b',
    citation: '<a href="https://www.nhp.gov.in/" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">National Health Portal. Rabies. 2025.</a>'
},

{
    name: 'Canine Ehrlichiosis',
    category: 'Tick-Borne Disease',
    ageGroup: 'All ages',
    symptoms: [
        'High fever',
        'Loss of appetite',
        'Lethargy and weakness',
        'Bleeding disorders',
        'Swollen lymph nodes'
    ],
    causes: [
        'Ehrlichia bacteria',
        'Brown dog tick bite',
        'Exposure to tick-infested areas',
        'Poor tick control'
    ],
    treatment: [
        'Doxycycline antibiotics',
        'Blood transfusions in severe cases',
        'Supportive care',
        'IV fluids',
        'Regular monitoring'
    ],
    prevention: 'Regular tick prevention medications, tick checks after outdoor activities, environmental tick control.',
    imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b',
    citation: '<a href="https://www.nhp.gov.in/" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">National Health Portal. Canine Ehrlichiosis. 2025.</a>'
},

{
    name: 'Canine Babesiosis',
    category: 'Tick-Borne Disease',
    ageGroup: 'All ages',
    symptoms: [
        'Fever and anemia',
        'Pale gums',
        'Weakness and lethargy',
        'Dark urine',
        'Jaundice'
    ],
    causes: [
        'Babesia parasites',
        'Tick bites',
        'Blood transfusions from infected dogs',
        'Transplacental transmission'
    ],
    treatment: [
        'Anti-protozoal medications',
        'Blood transfusions',
        'Supportive care',
        'Hospitalization in severe cases',
        'Tick removal'
    ],
    prevention: 'Tick prevention, regular grooming, avoiding tick-infested areas, prompt tick removal.',
    imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b',
    citation: '<a href="https://www.nhp.gov.in/" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">National Health Portal. Canine Babesiosis. 2025.</a>'
},

{
    name: 'Leptospirosis',
    category: 'Bacterial Zoonotic Disease',
    ageGroup: 'All ages',
    symptoms: [
        'Fever and muscle pain',
        'Vomiting',
        'Jaundice',
        'Kidney and liver failure',
        'Dehydration'
    ],
    causes: [
        'Leptospira bacteria',
        'Contaminated water or soil',
        'Contact with infected urine',
        'Exposure during monsoons'
    ],
    treatment: [
        'Antibiotics (penicillin, doxycycline)',
        'IV fluids',
        'Kidney support therapy',
        'Hospitalization',
        'Dialysis in severe cases'
    ],
    prevention: 'Annual vaccinations, avoiding stagnant water, maintaining hygiene, preventing contact with rodent urine.',
    imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b',
    citation: '<a href="https://www.nhp.gov.in/" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">National Health Portal. Leptospirosis. 2025.</a>'
},

{
    name: 'Kennel Cough',
    category: 'Respiratory Disease',
    ageGroup: 'All ages',
    symptoms: [
        'Dry hacking cough',
        'Retching',
        'Nasal discharge',
        'Mild fever',
        'Loss of appetite'
    ],
    causes: [
        'Bordetella bronchiseptica bacteria',
        'Canine parainfluenza virus',
        'Crowded conditions',
        'Poor ventilation'
    ],
    treatment: [
        'Rest and isolation',
        'Cough suppressants',
        'Antibiotics if bacterial',
        'Humidifiers',
        'Supportive care'
    ],
    prevention: 'Vaccination, avoiding crowded kennels, good ventilation, stress reduction.',
    imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b',
    citation: '<a href="https://www.nhp.gov.in/" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">National Health Portal. Kennel Cough. 2025.</a>'
},

{
    name: 'Heartworm Disease',
    category: 'Parasitic Disease',
    ageGroup: 'Adult dogs',
    symptoms: [
        'Persistent cough',
        'Difficulty breathing',
        'Fatigue after exercise',
        'Weight loss',
        'Heart failure'
    ],
    causes: [
        'Dirofilaria immitis parasite',
        'Mosquito bites',
        'Warm humid climate',
        'Lack of preventive medication'
    ],
    treatment: [
        'Arsenic-based medications',
        'Restricted activity',
        'Antibiotics',
        'Surgical removal in severe cases',
        'Long-term monitoring'
    ],
    prevention: 'Monthly heartworm preventive medications, mosquito control, regular testing.',
    imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b',
    citation: '<a href="https://www.nhp.gov.in/" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">National Health Portal. Heartworm Disease. 2025.</a>'
},

{
    name: 'Canine Coronavirus',
    category: 'Viral Disease',
    ageGroup: 'Puppies',
    symptoms: [
        'Diarrhea',
        'Vomiting',
        'Loss of appetite',
        'Lethargy',
        'Dehydration'
    ],
    causes: [
        'Canine coronavirus (CCoV)',
        'Contact with infected feces',
        'Contaminated food and water',
        'Poor hygiene'
    ],
    treatment: [
        'Supportive care',
        'Fluid therapy',
        'Anti-diarrheal medications',
        'Nutritional support',
        'Isolation from other dogs'
    ],
    prevention: 'Vaccination, proper sanitation, avoiding contaminated areas, good hygiene practices.',
    imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b',
    citation: '<a href="https://www.nhp.gov.in/" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">National Health Portal. Canine Coronavirus. 2025.</a>'
},

{
    name: 'Canine Hepatitis',
    category: 'Viral Disease',
    ageGroup: 'Young dogs and puppies',
    symptoms: [
        'Fever and lethargy',
        'Loss of appetite',
        'Vomiting and diarrhea',
        'Abdominal pain',
        'Blue eye (corneal edema)'
    ],
    causes: [
        'Canine adenovirus type 1',
        'Contact with infected urine, feces, or saliva',
        'Lack of vaccination',
        'Weakened immune system'
    ],
    treatment: [
        'Supportive care',
        'IV fluids',
        'Liver support medications',
        'Blood transfusions in severe cases',
        'Hospitalization'
    ],
    prevention: 'Vaccination as part of core vaccines, avoiding contact with infected dogs.',
    imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b',
    citation: '<a href="https://www.nhp.gov.in/" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">National Health Portal. Canine Hepatitis. 2025.</a>'
},

{
    name: 'Skin Infections and Dermatitis',
    category: 'Dermatological Disease',
    ageGroup: 'All ages',
    symptoms: [
        'Itching and scratching',
        'Red inflamed skin',
        'Hair loss',
        'Foul odor',
        'Lesions and scabs'
    ],
    causes: [
        'Bacterial or fungal infections',
        'Allergies',
        'Parasites (fleas, mites)',
        'Humid climate',
        'Poor grooming'
    ],
    treatment: [
        'Antibiotics or antifungals',
        'Medicated shampoos',
        'Topical treatments',
        'Allergy management',
        'Regular grooming'
    ],
    prevention: 'Regular bathing, flea control, proper nutrition, dry living conditions, early detection.',
    imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b',
    citation: '<a href="https://www.nhp.gov.in/" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">National Health Portal. Skin Infections. 2025.</a>'
},

{
    name: 'Canine Influenza',
    category: 'Viral Respiratory Disease',
    ageGroup: 'All ages',
    symptoms: [
        'Coughing',
        'Sneezing',
        'Nasal discharge',
        'Fever',
        'Lethargy'
    ],
    causes: [
        'Canine influenza virus (H3N8, H3N2)',
        'Airborne transmission',
        'Contact with infected dogs',
        'Crowded environments'
    ],
    treatment: [
        'Supportive care',
        'Rest and isolation',
        'Antibiotics for secondary infections',
        'Cough suppressants',
        'Hydration'
    ],
    prevention: 'Vaccination, avoiding sick dogs, good hygiene, proper ventilation.',
    imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b',
    citation: '<a href="https://www.nhp.gov.in/" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">National Health Portal. Canine Influenza. 2025.</a>'
},

{
    name: 'Obesity',
    category: 'Metabolic Disorder',
    ageGroup: 'Adult dogs and cats',
    symptoms: [
        'Excessive weight gain',
        'Difficulty breathing',
        'Reduced mobility',
        'Joint problems',
        'Lethargy'
    ],
    causes: [
        'Overfeeding',
        'Lack of exercise',
        'Genetic predisposition',
        'Hormonal imbalances',
        'Neutering'
    ],
    treatment: [
        'Controlled diet',
        'Portion monitoring',
        'Regular exercise',
        'Weight management plans',
        'Veterinary supervision'
    ],
    prevention: 'Balanced diet, regular exercise, portion control, avoiding table scraps.',
    imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b',
    citation: '<a href="https://www.nhp.gov.in/" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">National Health Portal. Obesity. 2025.</a>'
},

{
    name: 'Intestinal Parasites (Hookworms, Roundworms, Tapeworms)',
    category: 'Parasitic Disease',
    ageGroup: 'All ages, especially puppies',
    symptoms: [
        'Diarrhea',
        'Vomiting',
        'Weight loss',
        'Pot-bellied appearance',
        'Anemia'
    ],
    causes: [
        'Ingestion of parasite eggs',
        'Contact with contaminated soil',
        'Transplacental transmission',
        'Consuming raw meat',
        'Fleas (for tapeworms)'
    ],
    treatment: [
        'Deworming medications',
        'Repeated treatments',
        'Supportive care',
        'Nutritional support',
        'Environmental sanitation'
    ],
    prevention: 'Deworm every 3-6 months, avoid raw meat, flea control, proper sanitation.',
    imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b',
    citation: '<a href="https://www.nhp.gov.in/" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">National Health Portal. Intestinal Parasites. 2025.</a>'
},

{
    name: 'Feline Panleukopenia',
    category: 'Viral Disease',
    ageGroup: 'Kittens and young cats',
    symptoms: [
        'Severe vomiting',
        'Diarrhea',
        'Dehydration',
        'Fever',
        'Extreme lethargy'
    ],
    causes: [
        'Feline parvovirus',
        'Contact with infected cats',
        'Contaminated surfaces',
        'Lack of vaccination'
    ],
    treatment: [
        'Intensive supportive care',
        'IV fluids',
        'Antibiotics for secondary infections',
        'Anti-nausea medications',
        'Hospitalization'
    ],
    prevention: 'Vaccination, isolation of infected cats, disinfection, avoiding contact with strays.',
    imageUrl: 'https://images.unsplash.com/photo-1574158622682-e40e69881006',
    citation: '<a href="https://www.nhp.gov.in/" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">National Health Portal. Feline Panleukopenia. 2025.</a>'
},

{
    name: 'Feline Calicivirus',
    category: 'Viral Respiratory Disease',
    ageGroup: 'All ages',
    symptoms: [
        'Mouth ulcers',
        'Nasal discharge',
        'Sneezing',
        'Fever',
        'Limping syndrome'
    ],
    causes: [
        'Feline calicivirus',
        'Direct contact with infected cats',
        'Contaminated objects',
        'Airborne transmission'
    ],
    treatment: [
        'Supportive care',
        'Fluid therapy',
        'Pain management',
        'Antibiotics for secondary infections',
        'Nutritional support'
    ],
    prevention: 'Vaccination, good hygiene, isolation of sick cats, regular veterinary care.',
    imageUrl: 'https://images.unsplash.com/photo-1574158622682-e40e69881006',
    citation: '<a href="https://www.nhp.gov.in/" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">National Health Portal. Feline Calicivirus. 2025.</a>'
},

{
    name: 'Feline Herpesvirus',
    category: 'Viral Respiratory Disease',
    ageGroup: 'All ages',
    symptoms: [
        'Sneezing and nasal discharge',
        'Conjunctivitis',
        'Eye ulcers',
        'Fever',
        'Loss of appetite'
    ],
    causes: [
        'Feline herpesvirus type 1',
        'Stress',
        'Close contact with infected cats',
        'Weakened immune system'
    ],
    treatment: [
        'Antiviral medications',
        'Eye medications',
        'Supportive care',
        'L-lysine supplementation',
        'Stress reduction'
    ],
    prevention: 'Vaccination, stress management, good nutrition, isolation during outbreaks.',
    imageUrl: 'https://images.unsplash.com/photo-1574158622682-e40e69881006',
    citation: '<a href="https://www.nhp.gov.in/" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">National Health Portal. Feline Herpesvirus. 2025.</a>'
},

{
    name: 'Feline Leukemia Virus (FeLV)',
    category: 'Viral Immunosuppressive Disease',
    ageGroup: 'All ages',
    symptoms: [
        'Weight loss',
        'Anemia',
        'Recurrent infections',
        'Lymphoma',
        'Lethargy'
    ],
    causes: [
        'Feline leukemia virus',
        'Saliva transmission',
        'Grooming and bite wounds',
        'Shared food bowls',
        'Mother to kitten transmission'
    ],
    treatment: [
        'Supportive care',
        'Treatment of secondary infections',
        'Chemotherapy for lymphoma',
        'Good nutrition',
        'Indoor living'
    ],
    prevention: 'Vaccination, testing before introduction, keeping cats indoors, avoiding contact with infected cats.',
    imageUrl: 'https://images.unsplash.com/photo-1574158622682-e40e69881006',
    citation: '<a href="https://www.nhp.gov.in/" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">National Health Portal. Feline Leukemia Virus. 2025.</a>'
},

{
    name: 'Feline Immunodeficiency Virus (FIV)',
    category: 'Viral Immunosuppressive Disease',
    ageGroup: 'Adult cats',
    symptoms: [
        'Recurrent infections',
        'Chronic gingivitis',
        'Weight loss',
        'Fever',
        'Neurological symptoms'
    ],
    causes: [
        'Feline immunodeficiency virus',
        'Bite wounds',
        'Fighting',
        'Outdoor exposure',
        'Intact male cats at higher risk'
    ],
    treatment: [
        'Supportive care',
        'Management of secondary infections',
        'Antiviral medications',
        'Good nutrition',
        'Stress reduction'
    ],
    prevention: 'Keep cats indoors, neutering, testing before introduction, avoiding fights.',
    imageUrl: 'https://images.unsplash.com/photo-1574158622682-e40e69881006',
    citation: '<a href="https://www.nhp.gov.in/" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">National Health Portal. Feline Immunodeficiency Virus. 2025.</a>'
},

{
    name: 'Feline Infectious Peritonitis (FIP)',
    category: 'Viral Disease',
    ageGroup: 'Young cats and multi-cat households',
    symptoms: [
        'Persistent fever',
        'Weight loss',
        'Abdominal distension',
        'Difficulty breathing',
        'Neurological signs'
    ],
    causes: [
        'Mutation of feline coronavirus',
        'Stress',
        'Multi-cat environments',
        'Genetic predisposition',
        'Weakened immune system'
    ],
    treatment: [
        'Antiviral medications (GS-441524)',
        'Supportive care',
        'Immunomodulators',
        'Fluid drainage',
        'Palliative care'
    ],
    prevention: 'Stress reduction, good hygiene, limiting cat numbers, testing and isolation.',
    imageUrl: 'https://images.unsplash.com/photo-1574158622682-e40e69881006',
    citation: '<a href="https://www.nhp.gov.in/" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">National Health Portal. Feline Infectious Peritonitis. 2025.</a>'
},

{
    name: 'Urinary Tract Infections (UTIs)',
    category: 'Bacterial Infection',
    ageGroup: 'All ages, especially male cats',
    symptoms: [
        'Frequent urination',
        'Straining to urinate',
        'Blood in urine',
        'Urinating outside litter box',
        'Painful urination'
    ],
    causes: [
        'Bacterial infection',
        'Bladder stones',
        'Stress',
        'Dehydration',
        'Anatomical abnormalities'
    ],
    treatment: [
        'Antibiotics',
        'Pain medications',
        'Urinary acidifiers',
        'Increased water intake',
        'Dietary changes'
    ],
    prevention: 'Adequate hydration, proper diet, clean litter boxes, stress management.',
    imageUrl: 'https://images.unsplash.com/photo-1574158622682-e40e69881006',
    citation: '<a href="https://www.nhp.gov.in/" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">National Health Portal. Urinary Tract Infections. 2025.</a>'
},

{
    name: 'Dental Disease',
    category: 'Oral Health Disease',
    ageGroup: 'Adult dogs and cats',
    symptoms: [
        'Bad breath',
        'Yellow/brown teeth',
        'Bleeding gums',
        'Difficulty eating',
        'Tooth loss'
    ],
    causes: [
        'Plaque and tartar buildup',
        'Poor dental hygiene',
        'Bacterial infection',
        'Genetics',
        'Diet'
    ],
    treatment: [
        'Professional dental cleaning',
        'Tooth extraction',
        'Antibiotics',
        'Pain management',
        'Home dental care'
    ],
    prevention: 'Regular tooth brushing, dental chews, veterinary dental checkups, appropriate diet.',
    imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b',
    citation: '<a href="https://www.nhp.gov.in/" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">National Health Portal. Dental Disease. 2025.</a>'
},

{
    name: 'Ringworm (Dermatophytosis)',
    category: 'Fungal Zoonotic Disease',
    ageGroup: 'All ages, especially kittens',
    symptoms: [
        'Circular hair loss',
        'Red ring-shaped lesions',
        'Scaling skin',
        'Itching',
        'Broken hairs'
    ],
    causes: [
        'Fungal infection (Microsporum canis)',
        'Contact with infected animals',
        'Contaminated environment',
        'Weakened immune system'
    ],
    treatment: [
        'Antifungal medications',
        'Medicated shampoos',
        'Topical treatments',
        'Environmental decontamination',
        'Isolation'
    ],
    prevention: 'Good hygiene, avoiding infected animals, environmental cleaning, prompt treatment.',
    imageUrl: 'https://images.unsplash.com/photo-1574158622682-e40e69881006',
    citation: '<a href="https://www.nhp.gov.in/" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">National Health Portal. Ringworm. 2025.</a>'
},

{
    name: 'Flea Infestation',
    category: 'Parasitic Disease',
    ageGroup: 'All ages',
    symptoms: [
        'Excessive scratching',
        'Hair loss',
        'Red irritated skin',
        'Flea dirt (black specks)',
        'Anemia in severe cases'
    ],
    causes: [
        'Flea bites',
        'Contact with infested animals',
        'Contaminated environment',
        'Warm humid climate'
    ],
    treatment: [
        'Topical flea treatments',
        'Oral flea medications',
        'Environmental treatment',
        'Flea shampoos',
        'Treating all pets in household'
    ],
    prevention: 'Monthly flea preventives, regular grooming, environmental control, treating all pets.',
    imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b',
    citation: '<a href="https://www.nhp.gov.in/" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">National Health Portal. Flea Infestation. 2025.</a>'
},

{
    name: 'Mange (Sarcoptic and Demodectic)',
    category: 'Parasitic Skin Disease',
    ageGroup: 'All ages',
    symptoms: [
        'Intense itching',
        'Hair loss',
        'Crusty skin',
        'Secondary infections',
        'Thickened skin'
    ],
    causes: [
        'Sarcoptes or Demodex mites',
        'Weakened immune system',
        'Contact with infected animals',
        'Stress'
    ],
    treatment: [
        'Anti-parasitic medications',
        'Medicated baths',
        'Antibiotics for infections',
        'Immune system support',
        'Isolation'
    ],
    prevention: 'Good hygiene, avoiding infected animals, immune system support, prompt treatment.',
    imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b',
    citation: '<a href="https://www.nhp.gov.in/" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">National Health Portal. Mange. 2025.</a>'
},

{
    name: 'Ear Infections (Otitis)',
    category: 'Bacterial/Fungal Infection',
    ageGroup: 'All ages',
    symptoms: [
        'Head shaking',
        'Ear scratching',
        'Foul odor from ears',
        'Discharge',
        'Redness and swelling'
    ],
    causes: [
        'Bacteria or yeast infection',
        'Ear mites',
        'Allergies',
        'Moisture in ears',
        'Foreign objects'
    ],
    treatment: [
        'Ear cleaning',
        'Topical medications',
        'Oral antibiotics',
        'Anti-inflammatory drugs',
        'Treat underlying causes'
    ],
    prevention: 'Regular ear cleaning, keep ears dry, treat allergies, routine checks.',
    imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b',
    citation: '<a href="https://www.nhp.gov.in/" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">National Health Portal. Ear Infections. 2025.</a>'
},

{
    name: 'Diabetes Mellitus',
    category: 'Metabolic Disorder',
    ageGroup: 'Middle-aged to senior pets',
    symptoms: [
        'Increased thirst',
        'Increased urination',
        'Weight loss despite good appetite',
        'Lethargy',
        'Cataracts (dogs)'
    ],
    causes: [
        'Insulin deficiency or resistance',
        'Obesity',
        'Genetics',
        'Pancreatitis',
        'Hormonal disorders'
    ],
    treatment: [
        'Insulin injections',
        'Dietary management',
        'Regular exercise',
        'Blood glucose monitoring',
        'Weight management'
    ],
    prevention: 'Maintain healthy weight, regular exercise, balanced diet, routine health checks.',
    imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b',
    citation: '<a href="https://www.nhp.gov.in/" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">National Health Portal. Diabetes Mellitus. 2025.</a>'
},

{
    name: 'Kidney Disease (Chronic Renal Failure)',
    category: 'Renal Disease',
    ageGroup: 'Senior pets',
    symptoms: [
        'Increased thirst and urination',
        'Loss of appetite',
        'Weight loss',
        'Vomiting',
        'Bad breath'
    ],
    causes: [
        'Age-related degeneration',
        'Infections',
        'Toxins',
        'Genetics',
        'Chronic dehydration'
    ],
    treatment: [
        'Renal diet',
        'Fluid therapy',
        'Phosphate binders',
        'Blood pressure management',
        'Regular monitoring'
    ],
    prevention: 'Adequate hydration, balanced diet, avoiding toxins, regular health checks.',
    imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b',
    citation: '<a href="https://www.nhp.gov.in/" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">National Health Portal. Kidney Disease. 2025.</a>'
},

{
    name: 'Liver Disease',
    category: 'Hepatic Disease',
    ageGroup: 'All ages',
    symptoms: [
        'Jaundice',
        'Loss of appetite',
        'Vomiting',
        'Weight loss',
        'Ascites (fluid in abdomen)'
    ],
    causes: [
        'Infections',
        'Toxins',
        'Cancer',
        'Genetics',
        'Metabolic disorders'
    ],
    treatment: [
        'Dietary management',
        'Medications',
        'Fluid therapy',
        'Treating underlying cause',
        'Supportive care'
    ],
    prevention: 'Avoid toxins, vaccinations, healthy diet, regular veterinary care.',
    imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b',
    citation: '<a href="https://www.nhp.gov.in/" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">National Health Portal. Liver Disease. 2025.</a>'
},

{
    name: 'Pancreatitis',
    category: 'Inflammatory Disease',
    ageGroup: 'Middle-aged to senior pets',
    symptoms: [
        'Severe abdominal pain',
        'Vomiting',
        'Loss of appetite',
        'Fever',
        'Dehydration'
    ],
    causes: [
        'High-fat diet',
        'Obesity',
        'Trauma',
        'Infections',
        'Certain medications'
    ],
    treatment: [
        'Hospitalization',
        'IV fluids',
        'Pain management',
        'Anti-nausea medications',
        'Low-fat diet'
    ],
    prevention: 'Low-fat diet, maintain healthy weight, avoid table scraps, gradual diet changes.',
    imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b',
    citation: '<a href="https://www.nhp.gov.in/" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">National Health Portal. Pancreatitis. 2025.</a>'
},

{
    name: 'Hip Dysplasia',
    category: 'Orthopedic Disease',
    ageGroup: 'Large breed dogs',
    symptoms: [
        'Difficulty rising',
        'Limping',
        'Reduced activity',
        'Pain',
        'Bunny-hopping gait'
    ],
    causes: [
        'Genetics',
        'Rapid growth',
        'Obesity',
        'Poor nutrition',
        'Excessive exercise in puppies'
    ],
    treatment: [
        'Weight management',
        'Physical therapy',
        'Pain medications',
        'Joint supplements',
        'Surgery in severe cases'
    ],
    prevention: 'Healthy weight, appropriate exercise, proper nutrition, genetic screening.',
    imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b',
    citation: '<a href="https://www.nhp.gov.in/" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">National Health Portal. Hip Dysplasia. 2025.</a>'
},

{
    name: 'Arthritis (Osteoarthritis)',
    category: 'Degenerative Joint Disease',
    ageGroup: 'Senior pets',
    symptoms: [
        'Stiffness',
        'Limping',
        'Difficulty climbing stairs',
        'Reduced activity',
        'Pain on movement'
    ],
    causes: [
        'Age-related wear',
        'Previous injuries',
        'Obesity',
        'Genetics',
        'Joint instability'
    ],
    treatment: [
        'Pain medications',
        'Joint supplements',
        'Weight management',
        'Physical therapy',
        'Anti-inflammatory drugs'
    ],
    prevention: 'Healthy weight, regular exercise, joint supplements, avoiding injuries.',
    imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b',
    citation: '<a href="https://www.nhp.gov.in/" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">National Health Portal. Arthritis. 2025.</a>'
},

{
    name: 'Hyperthyroidism',
    category: 'Endocrine Disease',
    ageGroup: 'Senior cats',
    symptoms: [
        'Weight loss',
        'Increased appetite',
        'Hyperactivity',
        'Vomiting',
        'Increased thirst and urination'
    ],
    causes: [
        'Benign thyroid tumor',
        'Thyroid gland enlargement',
        'Unknown exact cause',
        'Age-related'
    ],
    treatment: [
        'Antithyroid medications',
        'Radioactive iodine therapy',
        'Surgical removal of thyroid',
        'Prescription diet',
        'Regular monitoring'
    ],
    prevention: 'No known prevention; regular senior health checks important.',
    imageUrl: 'https://images.unsplash.com/photo-1574158622682-e40e69881006',
    citation: '<a href="https://www.nhp.gov.in/" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">National Health Portal. Hyperthyroidism. 2025.</a>'
},

{
    name: 'Hypothyroidism',
    category: 'Endocrine Disease',
    ageGroup: 'Middle-aged dogs',
    symptoms: [
        'Weight gain',
        'Lethargy',
        'Hair loss',
        'Cold intolerance',
        'Skin infections'
    ],
    causes: [
        'Immune-mediated destruction',
        'Thyroid gland atrophy',
        'Genetics',
        'Certain medications'
    ],
    treatment: [
        'Thyroid hormone replacement',
        'Lifelong medication',
        'Regular monitoring',
        'Dietary management'
    ],
    prevention: 'No known prevention; early diagnosis improves management.',
    imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b',
    citation: '<a href="https://www.nhp.gov.in/" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">National Health Portal. Hypothyroidism. 2025.</a>'
},

{
    name: 'Addison\'s Disease',
    category: 'Endocrine Disease',
    ageGroup: 'Young to middle-aged dogs',
    symptoms: [
        'Lethargy',
        'Vomiting',
        'Diarrhea',
        'Weight loss',
        'Collapse'
    ],
    causes: [
        'Adrenal gland insufficiency',
        'Immune-mediated destruction',
        'Sudden withdrawal of steroids',
        'Unknown causes'
    ],
    treatment: [
        'Hormone replacement therapy',
        'IV fluids during crisis',
        'Lifelong medication',
        'Regular monitoring',
        'Stress management'
    ],
    prevention: 'No known prevention; careful steroid withdrawal important.',
    imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b',
    citation: '<a href="https://www.nhp.gov.in/" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">National Health Portal. Addison\'s Disease. 2025.</a>'
},

{
    name: 'Cushing\'s Disease',
    category: 'Endocrine Disease',
    ageGroup: 'Middle-aged to senior dogs',
    symptoms: [
        'Increased thirst and urination',
        'Pot-bellied appearance',
        'Hair loss',
        'Thin skin',
        'Muscle weakness'
    ],
    causes: [
        'Pituitary tumor',
        'Adrenal tumor',
        'Excessive steroid use',
        'Age-related'
    ],
    treatment: [
        'Medications to suppress cortisol',
        'Surgery in some cases',
        'Regular monitoring',
        'Management of complications',
        'Dietary adjustments'
    ],
    prevention: 'Avoid excessive steroid use; regular senior health checks.',
    imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b',
    citation: '<a href="https://www.nhp.gov.in/" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">National Health Portal. Cushing\'s Disease. 2025.</a>'
},

{
    name: 'Heart Disease (Dilated Cardiomyopathy)',
    category: 'Cardiovascular Disease',
    ageGroup: 'Large breed dogs, middle-aged cats',
    symptoms: [
        'Coughing',
        'Difficulty breathing',
        'Fatigue',
        'Fainting',
        'Abdominal distension'
    ],
    causes: [
        'Genetics',
        'Nutritional deficiencies',
        'Viral infections',
        'Age-related',
        'Breed predisposition'
    ],
    treatment: [
        'Cardiac medications',
        'Diuretics',
        'ACE inhibitors',
        'Dietary management',
        'Exercise restriction'
    ],
    prevention: 'Taurine-rich diet for cats, regular check-ups, appropriate nutrition.',
    imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b',
    citation: '<a href="https://www.nhp.gov.in/" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">National Health Portal. Heart Disease. 2025.</a>'
},

{
    name: 'Pyometra',
    category: 'Reproductive Disease',
    ageGroup: 'Unspayed middle-aged to senior females',
    symptoms: [
        'Pus discharge from vulva',
        'Lethargy',
        'Loss of appetite',
        'Increased thirst',
        'Fever'
    ],
    causes: [
        'Bacterial infection of uterus',
        'Hormonal changes',
        'Progesterone effects',
        'Not spaying'
    ],
    treatment: [
        'Emergency spay surgery',
        'IV fluids',
        'Antibiotics',
        'Hospitalization',
        'Supportive care'
    ],
    prevention: 'Spaying before first heat cycle; early spaying recommended.',
    imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b',
    citation: '<a href="https://www.nhp.gov.in/" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">National Health Portal. Pyometra. 2025.</a>'
},

{
    name: 'Mammary Tumors',
    category: 'Cancer',
    ageGroup: 'Unspayed middle-aged to senior females',
    symptoms: [
        'Lumps in mammary tissue',
        'Ulceration',
        'Discharge',
        'Pain',
        'Swelling'
    ],
    causes: [
        'Hormonal influence',
        'Not spaying',
        'Genetics',
        'Age',
        'Breed predisposition'
    ],
    treatment: [
        'Surgical removal',
        'Chemotherapy',
        'Spaying',
        'Pain management',
        'Monitoring for metastasis'
    ],
    prevention: 'Spaying before first heat reduces risk significantly; early spaying recommended.',
    imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b',
    citation: '<a href="https://www.nhp.gov.in/" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">National Health Portal. Mammary Tumors. 2025.</a>'
},

{
    name: 'Lymphoma',
    category: 'Cancer',
    ageGroup: 'Middle-aged to senior pets',
    symptoms: [
        'Swollen lymph nodes',
        'Weight loss',
        'Lethargy',
        'Loss of appetite',
        'Difficulty breathing'
    ],
    causes: [
        'Unknown exact cause',
        'Genetics',
        'Environmental factors',
        'Viral infections (in cats)',
        'Immune system abnormalities'
    ],
    treatment: [
        'Chemotherapy',
        'Radiation therapy',
        'Immunotherapy',
        'Supportive care',
        'Palliative care'
    ],
    prevention: 'No known prevention for most cases; FeLV vaccination for cats.',
    imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b',
    citation: '<a href="https://www.nhp.gov.in/" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">National Health Portal. Lymphoma. 2025.</a>'
},

{
    name: 'Mast Cell Tumors',
    category: 'Cancer',
    ageGroup: 'Middle-aged to senior dogs',
    symptoms: [
        'Skin lumps',
        'Swelling',
        'Ulceration',
        'Itching',
        'Variable appearance'
    ],
    causes: [
        'Unknown exact cause',
        'Genetics',
        'Breed predisposition',
        'Chronic inflammation'
    ],
    treatment: [
        'Surgical removal',
        'Radiation therapy',
        'Chemotherapy',
        'Targeted therapy',
        'Regular monitoring'
    ],
    prevention: 'No known prevention; early detection and treatment important.',
    imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b',
    citation: '<a href="https://www.nhp.gov.in/" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">National Health Portal. Mast Cell Tumors. 2025.</a>'
},

{
    name: 'Gastric Dilatation-Volvulus (Bloat)',
    category: 'Emergency Gastrointestinal Disease',
    ageGroup: 'Large and giant breed dogs',
    symptoms: [
        'Distended abdomen',
        'Unsuccessful vomiting attempts',
        'Restlessness',
        'Rapid breathing',
        'Collapse'
    ],
    causes: [
        'Eating too quickly',
        'Single large meal',
        'Exercise after eating',
        'Deep-chested breeds',
        'Stress'
    ],
    treatment: [
        'Emergency surgery',
        'Gastric decompression',
        'IV fluids',
        'Shock treatment',
        'Gastropexy'
    ],
    prevention: 'Multiple small meals, slow feeding, avoiding exercise after meals, prophylactic gastropexy.',
    imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b',
    citation: '<a href="https://www.nhp.gov.in/" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">National Health Portal. Gastric Dilatation-Volvulus. 2025.</a>'
},

{
    name: 'Inflammatory Bowel Disease',
    category: 'Gastrointestinal Disease',
    ageGroup: 'Middle-aged pets',
    symptoms: [
        'Chronic vomiting',
        'Chronic diarrhea',
        'Weight loss',
        'Loss of appetite',
        'Abdominal pain'
    ],
    causes: [
        'Immune system dysfunction',
        'Food allergies',
        'Bacterial imbalance',
        'Genetics',
        'Environmental factors'
    ],
    treatment: [
        'Dietary management',
        'Immunosuppressive drugs',
        'Antibiotics',
        'Probiotics',
        'Anti-inflammatory medications'
    ],
    prevention: 'High-quality diet, avoiding allergens, stress management, gradual diet changes.',
    imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b',
    citation: '<a href="https://www.nhp.gov.in/" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">National Health Portal. Inflammatory Bowel Disease. 2025.</a>'
},

{
    name: 'Leishmaniasis',
    category: 'Parasitic Zoonotic Disease',
    ageGroup: 'All ages',
    symptoms: [
        'Skin lesions',
        'Weight loss',
        'Hair loss',
        'Enlarged lymph nodes',
        'Kidney damage'
    ],
    causes: [
        'Leishmania parasites',
        'Sandfly bites',
        'Endemic in certain regions',
        'Weakened immune system'
    ],
    treatment: [
        'Long-term antiparasitic medications',
        'Supportive care',
        'Immune system support',
        'Regular monitoring',
        'Palliative care'
    ],
    prevention: 'Sandfly repellents, keeping dogs indoors at dusk, insecticide-treated collars, vaccination where available.',
    imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b',
    citation: '<a href="https://www.nhp.gov.in/" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">National Health Portal. Leishmaniasis. 2025.</a>'
},

{
    name: 'Giardiasis',
    category: 'Parasitic Disease',
    ageGroup: 'Puppies and kittens',
    symptoms: [
        'Chronic diarrhea',
        'Weight loss',
        'Vomiting',
        'Poor coat condition',
        'Dehydration'
    ],
    causes: [
        'Giardia parasites',
        'Contaminated water',
        'Fecal-oral transmission',
        'Poor sanitation'
    ],
    treatment: [
        'Antiparasitic medications',
        'Supportive care',
        'Rehydration',
        'Environmental decontamination',
        'Isolation'
    ],
    prevention: 'Clean water supply, good hygiene, prompt feces removal, avoiding contaminated areas.',
    imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b',
    citation: '<a href="https://www.nhp.gov.in/" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">National Health Portal. Giardiasis. 2025.</a>'
},

{
    name: 'Toxoplasmosis',
    category: 'Parasitic Zoonotic Disease',
    ageGroup: 'All ages, especially cats',
    symptoms: [
        'Often asymptomatic',
        'Fever',
        'Lethargy',
        'Neurological signs',
        'Eye inflammation'
    ],
    causes: [
        'Toxoplasma gondii parasite',
        'Eating infected prey',
        'Contaminated meat',
        'Cat feces exposure'
    ],
    treatment: [
        'Antiparasitic medications',
        'Antibiotics',
        'Supportive care',
        'Long treatment course',
        'Immune system support'
    ],
    prevention: 'Cook meat thoroughly, clean litter boxes daily, keep cats indoors, good hygiene.',
    imageUrl: 'https://images.unsplash.com/photo-1574158622682-e40e69881006',
    citation: '<a href="https://www.nhp.gov.in/" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">National Health Portal. Toxoplasmosis. 2025.</a>'
},

{
    name: 'Allergies (Food, Environmental, Contact)',
    category: 'Immune-Mediated Disease',
    ageGroup: 'All ages',
    symptoms: [
        'Itching and scratching',
        'Skin infections',
        'Ear infections',
        'Hair loss',
        'Gastrointestinal signs'
    ],
    causes: [
        'Food proteins',
        'Environmental allergens',
        'Contact allergens',
        'Genetics',
        'Immune system overreaction'
    ],
    treatment: [
        'Elimination diets',
        'Antihistamines',
        'Steroids',
        'Immunotherapy',
        'Allergen avoidance'
    ],
    prevention: 'Identify and avoid allergens, hypoallergenic diet, environmental control, regular bathing.',
    imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b',
    citation: '<a href="https://www.nhp.gov.in/" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">National Health Portal. Allergies. 2025.</a>'
},

{
    name: 'Heatstroke',
    category: 'Environmental Emergency',
    ageGroup: 'All ages',
    symptoms: [
        'Excessive panting',
        'Drooling',
        'Weakness',
        'Collapse',
        'Seizures'
    ],
    causes: [
        'High environmental temperature',
        'Humidity',
        'Overexertion',
        'Leaving pets in hot cars',
        'Brachycephalic breeds at higher risk'
    ],
    treatment: [
        'Immediate cooling',
        'IV fluids',
        'Oxygen therapy',
        'Monitoring for complications',
        'Emergency veterinary care'
    ],
    prevention: 'Avoid hot weather exercise, provide shade and water, never leave in cars, limit activity in heat.',
    imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b',
    citation: '<a href="https://www.nhp.gov.in/" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">National Health Portal. Heatstroke. 2025.</a>'
},

{
    name: 'Brucellosis',
    category: 'Bacterial Zoonotic Disease',
    ageGroup: 'Breeding dogs',
    symptoms: [
        'Abortion',
        'Infertility',
        'Enlarged lymph nodes',
        'Back pain',
        'Lethargy'
    ],
    causes: [
        'Brucella canis bacteria',
        'Breeding with infected dogs',
        'Contact with infected tissues',
        'Contaminated environment'
    ],
    treatment: [
        'Long-term antibiotics',
        'Spaying/neutering',
        'Isolation',
        'Often difficult to cure',
        'Euthanasia in some cases'
    ],
    prevention: 'Testing before breeding, avoiding contact with infected dogs, good hygiene, spaying/neutering.',
    imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b',
    citation: '<a href="https://www.nhp.gov.in/" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">National Health Portal. Brucellosis. 2025.</a>'
}

];

const doctorsData = {
  'Delhi': [
    {
      name: 'Dr. Pradeep Rana',
      credentials: 'MVSc, PhD (Veterinary Medicine)',
      experience: '30+ Years Experience',
      hospital: 'Neeti Bagh Pet Clinic',
      address: 'Neeti Bagh, New Delhi - 110049',
      phone: '+91 98111 42406',
      email: 'contact@nbpetclinic.com',
      hours: 'Mon-Sat 10AM-8PM',
      specializations: 'Small Animals, Surgery, Wellness Care',
      bookingLink: 'https://nbpetclinic.com',
      rating: '4.9/5 (980 reviews)'
    },
    {
      name: 'Dr. S Puri',
      credentials: 'BVSc & AH, MVSc',
      experience: '48+ Years Experience',
      hospital: 'Puri Pet Clinic',
      address: 'Jangpura, Delhi - 110014',
      phone: '+91 11 2437 2517',
      email: 'puripetclinic@gmail.com',
      hours: 'Mon-Sat 10AM-7PM',
      specializations: 'Cats, Dogs, Birds',
      bookingLink: '',
      rating: '4.8/5 (740 reviews)'
    },
    {
      name: 'Dr. Avesh Kumar Singh',
      credentials: 'MVSc',
      experience: '18+ Years Experience',
      hospital: 'Lifeline Veterinary Clinic',
      address: 'Janakpuri, Delhi - 110058',
      phone: '+91 93114 82587',
      email: 'contact@lifelinevetclinic.com',
      hours: 'Mon-Sat 10AM-8PM',
      specializations: 'Vaccination, Critical Care',
      bookingLink: '',
      rating: '4.8/5 (690 reviews)'
    },
    {
      name: 'Dr. Bhanu Dev Sharma',
      credentials: 'BVSc & AH',
      experience: '20+ Years Experience',
      hospital: 'Max Vets',
      address: 'Panchsheel Park, Delhi',
      phone: '+91 93116 18676',
      email: 'drbhanu@maxvets.com',
      hours: 'Mon-Sun 10AM-8PM',
      specializations: '24/7 Emergency, Surgery',
      bookingLink: 'https://maxvets.com',
      rating: '4.9/5 (1250 reviews)'
    }
  ],

  'Mumbai': [
    {
      name: 'Dr. Nilima Paranjpe',
      credentials: 'BVSc & AH',
      experience: '30+ Years Experience',
      hospital: 'Andheri Pet Clinic',
      address: 'Andheri West, Mumbai - 400053',
      phone: '+91 93222 92946',
      email: '',
      hours: 'Mon-Sat 10AM-7PM',
      specializations: 'Canine/Feline',
      bookingLink: '',
      rating: '4.8/5 (730 reviews)'
    },
    {
      name: 'Dr. Nihar Jayakar',
      credentials: 'BVSc & AH, MVSc',
      experience: '24+ Years Experience',
      hospital: 'Jayakar Pet Clinic',
      address: 'Malabar Hill, Mumbai',
      phone: '+91 98206 24857',
      email: '',
      hours: 'Mon-Sat 11AM-7PM',
      specializations: 'Vaccination, Surgery',
      bookingLink: '',
      rating: '4.8/5 (540 reviews)'
    },
    {
      name: 'Dr. Thomas Heathcote',
      credentials: 'MVSc',
      experience: '20+ Years Experience',
      hospital: 'Tata Small Animal Hospital',
      address: 'Mahalaxmi, Mumbai',
      phone: '+91 78200 44244',
      email: '',
      hours: 'Mon-Fri 10AM-7PM',
      specializations: 'Orthopedics, Diagnostics',
      bookingLink: 'https://sahmumbai.com',
      rating: '4.9/5 (820 reviews)'
    }
  ],

  'Bangalore': [
    {
      name: 'Dr. Dheeraj B Kashyap',
      credentials: 'BVSc & AH, MVSc',
      experience: '39+ Years Experience',
      hospital: 'Dr. Dheeraj Pet Clinic',
      address: 'Jayanagar, Bangalore - 560041',
      phone: '+91 98453 07373',
      email: '',
      hours: 'Mon-Sat 9AM-7PM',
      specializations: 'Surgery, Dogs, Cats',
      bookingLink: '',
      rating: '4.8/5 (630 reviews)'
    },
    {
      name: 'Dr. Udayaravi Bhat',
      credentials: 'BVSc & AH, MVSc',
      experience: '23+ Years Experience',
      hospital: 'Udayaravi Pet Hospital',
      address: 'Indiranagar, Bangalore',
      phone: '+91 98450 36444',
      email: '',
      hours: 'Mon-Sat 10AM-8PM',
      specializations: 'Exotic Pets, Small Animals',
      bookingLink: '',
      rating: '4.8/5 (410 reviews)'
    },
    {
      name: 'Dr. Ansar Kamran',
      credentials: 'BVSc & AH',
      experience: '42+ Years Experience',
      hospital: 'Kamran Pet Clinic',
      address: 'Koramangala, Bangalore',
      phone: '+91 97422 41477',
      email: '',
      hours: 'Mon-Fri 10AM-6PM',
      specializations: 'Birds, Reptiles, Wellness',
      bookingLink: '',
      rating: '4.7/5 (390 reviews)'
    }
  ],

  'Chennai': [
    {
      name: 'Dr. Mohammed Ali',
      credentials: 'MVSc',
      experience: '28+ Years Experience',
      hospital: 'Greenways Pet Clinic',
      address: 'Raja Annamalai Puram, Chennai',
      phone: '+91 98840 52111',
      email: '',
      hours: 'Mon-Sat 10AM-7PM',
      specializations: 'Small Animals, Emergency',
      bookingLink: '',
      rating: '4.9/5 (620 reviews)'
    },
    {
      name: 'Dr. Madeena Begum',
      credentials: 'BVSc & AH, MVSc',
      experience: '13+ Years Experience',
      hospital: 'Pet Zone Clinic',
      address: 'Vadapalani, Chennai',
      phone: '+91 98400 67401',
      email: '',
      hours: 'Mon-Sat 11AM-6PM',
      specializations: 'Radiology/Surgery',
      bookingLink: '',
      rating: '4.8/5 (350 reviews)'
    },
    {
      name: 'Dr. A Koteeswaran',
      credentials: 'MVSc',
      experience: '56+ Years Experience',
      hospital: 'Koteeswaran Vet Clinic',
      address: 'Choolaimedu, Chennai',
      phone: '+91 94443 03348',
      email: '',
      hours: 'Mon-Fri 9AM-6PM',
      specializations: 'Orthopedic, General Medicine',
      bookingLink: '',
      rating: '4.7/5 (240 reviews)'
    }
  ],

  'Ahmedabad': [
    {
      name: 'Dr. Ramesh Nanaboina',
      credentials: 'BVSc & AH, MVSc',
      experience: '20+ Years Experience',
      hospital: 'Shalby Pet Clinic',
      address: 'Satellite, Ahmedabad - 380015',
      phone: '+91 79 4020 3000',
      email: '',
      hours: 'Mon-Sat 9AM-6PM',
      specializations: 'Joint Replacement, Trauma',
      bookingLink: 'https://shalby.org',
      rating: '4.8/5 (340 reviews)'
    },
    {
      name: 'Dr. XYZ',
      credentials: 'MVSc',
      experience: '15+ Years Experience',
      hospital: 'Vet4Pets Clinic',
      address: 'Ambawadi, Ahmedabad',
      phone: '+91 98241 43861',
      email: '',
      hours: 'Mon-Fri 10AM-6PM',
      specializations: 'Canine/Feline, Surgery',
      bookingLink: '',
      rating: '4.8/5 (230 reviews)'
    }
  ],

  'Pune': [
    {
      name: 'Dr. Bishakha Nath',
      credentials: 'BVSc & AH, MVSc',
      experience: '17+ Years Experience',
      hospital: 'Pet Care Clinic',
      address: 'Magarpatta Bypass Road, Pune',
      phone: '+91 98907 49059',
      email: '',
      hours: 'Mon-Sat 10AM-8PM',
      specializations: 'Wellness, Surgery',
      bookingLink: '',
      rating: '4.9/5 (321 reviews)'
    },
    {
      name: 'Dr. Vinay Gorhe',
      credentials: 'BVSc & AH',
      experience: '42+ Years Experience',
      hospital: 'Karve Pet Hospital',
      address: 'Karve Road, Pune',
      phone: '+91 93720 00237',
      email: '',
      hours: 'Mon-Sat 10AM-6PM',
      specializations: 'All Pets',
      bookingLink: '',
      rating: '4.8/5 (320 reviews)'
    }
  ],

  'Kolkata': [
    {
      name: 'Dr. Krishanu Ghosh',
      credentials: 'BVSc & AH',
      experience: '12+ Years Experience',
      hospital: 'Ghosh Pet Clinic',
      address: 'Salt Lake, Kolkata - 700106',
      phone: '+91 98304 60328',
      email: '',
      hours: 'Mon-Sat 9AM-6PM',
      specializations: 'Dogs, Cats, Small Animals',
      bookingLink: '',
      rating: '4.8/5 (55 reviews)'
    },
    {
      name: 'Dr. Chandrakanta Chakraborty',
      credentials: 'MVSc',
      experience: '25+ Years Experience',
      hospital: 'Chakraborty Pet Clinic',
      address: 'Behala, Kolkata',
      phone: '+91 98311 82910',
      email: '',
      hours: 'Mon-Fri 10AM-6PM',
      specializations: 'Cats, Birds, Dogs',
      bookingLink: '',
      rating: '4.9/5 (28 reviews)'
    }
  ],

  'Hyderabad': [
    {
      name: 'Dr. Sajeed Mohd',
      credentials: 'BVSc & AH, MVSc',
      experience: '22+ Years Experience',
      hospital: 'Petyaari Pet Clinic',
      address: 'BN Reddy Nagar, Hyderabad',
      phone: '+91 98490 12121',
      email: '',
      hours: 'Mon-Sun 9AM-8PM',
      specializations: 'Emergency, Surgery',
      bookingLink: 'http://petyaari.com',
      rating: '4.9/5 (1207 reviews)'
    },
    {
      name: 'Dr. J. V. Ramana',
      credentials: 'BVSc & AH',
      experience: '18+ Years Experience',
      hospital: 'Ramana Pet Clinic',
      address: 'Road Number 4, Hyderabad',
      phone: '+91 040 2334 3343',
      email: '',
      hours: 'Mon-Sat 10AM-6PM',
      specializations: 'General Practice',
      bookingLink: '',
      rating: '4.8/5 (430 reviews)'
    }
  ],

  'Bhopal': [
    {
      name: 'Dr. Brajesh Gupta',
      credentials: 'BVSc & AH, MVSc, FDSE (Germany)',
      experience: '28+ Years Experience',
      hospital: 'Airport Road Pet Clinic',
      address: 'Airport Rd, Bhopal MP',
      phone: '+91 98262 42929',
      email: '',
      hours: 'Mon-Sun 8AM-10PM',
      specializations: 'Neurosurgery, Diagnostic',
      bookingLink: '',
      rating: '4.7/5 (91 reviews)'
    },
    {
      name: 'Dr. Mukesh Sharma',
      credentials: 'BVSc & AH',
      experience: '30+ Years Experience',
      hospital: 'Dog Clinic',
      address: 'Bhopal',
      phone: '',
      email: '',
      hours: 'Mon-Sat 10AM-6PM',
      specializations: 'General canine',
      bookingLink: '',
      rating: '4.7/5'
    },
    {
      name: 'Dr. S N Shrivastava',
      credentials: 'BVSc & AH',
      experience: '57+ Years Experience',
      hospital: 'Shwan Mitra Pet Clinic',
      address: 'J K Road, Bhopal',
      phone: '',
      email: '',
      hours: 'Mon-Sat 9AM-12:30PM',
      specializations: 'Emergency, dogs/cats',
      bookingLink: '',
      rating: '4.9/5'
    }
  ],

  'Chandigarh': [
    {
      name: 'Dr. Simran Kaur',
      credentials: 'Research Associate–Virology',
      experience: '12+ Years Experience',
      hospital: 'Co Health Lab',
      address: 'District One Market, Sector 68, Chandigarh',
      phone: '+91 98144 01478',
      email: '',
      hours: 'Mon-Sat 10AM-6PM',
      specializations: 'Virology, Diagnostics',
      bookingLink: '',
      rating: '4.9/5'
    },
    {
      name: 'Dr. Jitender Singh Nijjer',
      credentials: 'MVSC - Surgery/Radiology',
      experience: '14+ Years Experience',
      hospital: 'House No. 1329',
      address: 'Sector-34C, Chandigarh',
      phone: '',
      email: '',
      hours: 'Mon-Sat 10AM-7PM',
      specializations: 'Surgery, Radiology',
      bookingLink: '',
      rating: '4.8/5'
    },
    {
      name: 'Dr. J. C. Kochar',
      credentials: 'BVSc & AH',
      experience: '55+ Years Experience',
      hospital: 'Private Clinic',
      address: '#1155, Sector-21B, Chandigarh',
      phone: '',
      email: '',
      hours: 'Mon-Fri 10AM-5PM',
      specializations: 'General Practice',
      bookingLink: '',
      rating: '4.7/5'
    },
    {
      name: 'Dr. H. S. Growar',
      credentials: 'BVSc & AH',
      experience: '37+ Years Experience',
      hospital: 'SAS Nagar Clinic',
      address: 'SCF - 42, SAS Nagar, Chandigarh',
      phone: '',
      email: '',
      hours: 'Mon-Sat 10AM-8PM',
      specializations: 'Dogs, Cats',
      bookingLink: '',
      rating: '4.9/5'
    }
    ],

    'Nagpur' : [
    {
      name: 'Dr. Amol Salankar',
      credentials: 'B.V.Sc, M.V.S.C',
      experience: '21+ Years Experience',
      hospital: 'Dog Clinic',
      address: 'Ring Road, Nagpur',
      phone: '',
      email: '',
      hours: 'Mon-Sat 9AM-10AM',
      specializations: 'Dogs, Cats',
      bookingLink: '',
      rating: '4.8/5'
    },
    {
      name: 'Dr. R M Mahajan',
      credentials: 'BVSc & AH, MVSC',
      experience: '43+ Years Experience',
      hospital: 'Dog and Animal Care Centre',
      address: 'Dharampeth, Nagpur',
      phone: '',
      email: '',
      hours: 'Mon-Sat 10AM-1PM',
      specializations: 'Small Animals',
      bookingLink: '',
      rating: '4.8/5'
    },
    {
      name: 'Dr. Prabhu Raut',
      credentials: 'MSc, DVM, BVMS',
      experience: '29+ Years Experience',
      hospital: 'Friends Pet Clinic',
      address: 'Katol Road, Nagpur',
      phone: '',
      email: '',
      hours: 'Mon-Sat 9AM-2PM',
      specializations: 'Dogs, Birds',
      bookingLink: '',
      rating: '4.7/5'
    }
  ],

   'Surat': [
    {
      name: 'Dr. Vipin V Deshmukh',
      credentials: 'M.V.Sc. (MAFSU, Nagpur)',
      experience: '19+ Years Experience',
      hospital: 'Deshmukh\'s Pet Clinic',
      address: '10/13, Aagam Arcade, Vesu, Surat',
      phone: '+91 97128 16961',
      email: '',
      hours: 'Mon-Sat 10AM-7PM',
      specializations: 'Dogs, Cats, Birds',
      bookingLink: '',
      rating: '4.8/5 (109 reviews)'
    },
    {
      name: 'Dr. Chaudhary',
      credentials: 'BVSc & AH',
      experience: '20+ Years Experience',
      hospital: 'Nandini Veterinary Hospital',
      address: 'Ring Road, Surat',
      phone: '+91 99789 55999',
      email: '',
      hours: 'Mon-Sat 11AM-7PM',
      specializations: 'Exotic Pets, Surgery',
      bookingLink: '',
      rating: '4.8/5 (221 reviews)'
    },
    {
      name: 'Dr. Sonis',
      credentials: 'MVSc',
      experience: '21+ Years Experience',
      hospital: 'Dr Sonis Pet Clinic',
      address: 'Bhatar Road, Surat',
      phone: '+91 97277 07791',
      email: '',
      hours: 'Mon-Sat 10AM-7PM',
      specializations: 'Dogs, Cats',
      bookingLink: '',
      rating: '4.7/5 (97 reviews)'
    }
  ],

  'Jaipur': [
    {
      name: 'Dr. Sunil Kumawat',
      credentials: 'BVSc & AH',
      experience: '14+ Years Experience',
      hospital: 'Kumawat Pet Clinic',
      address: 'Jhotwara, Jaipur',
      phone: '+91 90010 78963',
      email: '',
      hours: 'Mon-Sat 9AM-6PM',
      specializations: 'Canine, Feline',
      bookingLink: '',
      rating: '4.9/5 (256 reviews)'
    },
    {
      name: 'Dr. Shreeram Soni',
      credentials: 'BVSc & AH',
      experience: '2+ Years Experience',
      hospital: 'Soni Pet Hospital',
      address: 'Malviya Nagar, Jaipur',
      phone: '+91 94142 00266',
      email: '',
      hours: 'Mon-Fri 10AM-4PM',
      specializations: 'Dogs, Cats',
      bookingLink: '',
      rating: '4.9/5'
    },
    {
      name: 'Dr. Pet Vet Home Visit',
      credentials: 'BVSc & AH',
      experience: '10+ Years Experience',
      hospital: 'Pet Vet Home Visit Service',
      address: 'Kalwar Rd, Govindpura, Jaipur',
      phone: '+91 72199 99555',
      email: '',
      hours: 'Mon-Sat 9AM-7PM',
      specializations: 'Home Visit, Vaccination',
      bookingLink: '',
      rating: '5/5 (180 reviews)'
    },
    {
      name: 'Dr. Yadav',
      credentials: 'MVSc',
      experience: '18+ Years Experience',
      hospital: 'Yadav\'s Pet Clinic',
      address: 'Kalwar Road, Jaipur',
      phone: '+91 96678 12275',
      email: '',
      hours: 'Mon-Sat 10AM-7PM',
      specializations: 'Dogs, Surgery, Trauma',
      bookingLink: '',
      rating: '4.6/5 (107 reviews)'
    }
  ],

  'Lucknow': [
    {
      name: 'Dr. R K Sharma',
      credentials: 'BVSc, MVSc',
      experience: '26+ Years Experience',
      hospital: 'RK Pet Clinic',
      address: 'Harihar Nagar, Lucknow',
      phone: '+91 98396 22789',
      email: '',
      hours: 'Mon-Sat 10AM-7PM',
      specializations: 'Dogs, Cats, Surgery',
      bookingLink: '',
      rating: '4.8/5'
    },
    {
      name: 'Dr. Abhishek Singh',
      credentials: 'MVSc',
      experience: '16+ Years Experience',
      hospital: 'Singh Pet Clinic',
      address: 'Indiranagar, Lucknow',
      phone: '+91 97214 44556',
      email: '',
      hours: 'Mon-Sat 11AM-6PM',
      specializations: 'Vaccination, General',
      bookingLink: '',
      rating: '4.8/5'
    }
  ],

  'Kanpur': [
    {
      name: 'Dr. Gaurav Kumar Saxena',
      credentials: 'BVSc & AH',
      experience: '18+ Years Experience',
      hospital: 'Kanpur Pet Clinic',
      address: 'Kakadeo, Kanpur',
      phone: '+91 90444 21704',
      email: '',
      hours: 'Mon-Sat 6PM-9PM',
      specializations: 'Dogs, Cats, Birds',
      bookingLink: '',
      rating: '4.9/5'
    },
    {
      name: 'Dr. Mahesh Singh',
      credentials: 'BVMS',
      experience: '54+ Years Experience',
      hospital: 'Kalyanpur Dog Clinic',
      address: 'Kalyanpur, Kanpur',
      phone: '',
      email: '',
      hours: 'Mon-Sat 9AM-1PM',
      specializations: 'Canine, Feline',
      bookingLink: '',
      rating: '4.8/5'
    },
    {
      name: 'Dr. Mahendra Kumar Dixit',
      credentials: 'BVSc & AH',
      experience: '54+ Years Experience',
      hospital: 'Royal Dog Clinic',
      address: 'Swaroop Nagar, Kanpur',
      phone: '',
      email: '',
      hours: 'Mon-Sat 6PM-7:30PM',
      specializations: 'Dogs, Cats',
      bookingLink: '',
      rating: '4.7/5'
    }
  ]
  //... Additional entries for Noida, Jaipur, Surat, Lucknow, etc. can be added similarly, and other metro clinics/hospitals are available.
};

// ========================================================================
// FAQS ARRAY
// ========================================================================
const faqs = [
  {
    icon: '🤒',
    question: 'What is canine parvovirus, and which pets are at risk?',
    answer: 'Canine parvovirus is a highly contagious viral disease causing severe vomiting and diarrhea, most common in puppies and unvaccinated dogs under 1 year.',
    citation: '<a href="https://www.nhp.gov.in/disease/others/canine-parvovirus-infection" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">National Health Portal: Canine Parvovirus</a>'
  },
  {
    icon: '😷',
    question: 'What is canine distemper, and who gets it most?',
    answer: 'Canine distemper infects puppies and young adult dogs, causing respiratory, gastrointestinal, and neurological symptoms and is most prevalent in dogs under 2 years and strays.',
    citation: '<a href="https://www.akc.org/expert-advice/health/canine-distemper/" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">AKC: Canine Distemper</a>'
  },
  {
    icon: '🧟‍♂️',
    question: 'Is rabies common among Indian pets, and which age group is most affected?',
    answer: 'Rabies is a fatal viral disease transmitted through bites, commonly seen in outdoor dogs and cats of all ages, especially those unvaccinated or exposed to street animals.',
    citation: '<a href="https://www.nhp.gov.in/disease/communicable-disease/rabies" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">National Health Portal: Rabies</a>'
  },
  {
    icon: '🐛',
    question: 'What are intestinal worms in pets, and who is most at risk?',
    answer: 'Intestinal worms like roundworms and hookworms cause diarrhea and weakness, especially in puppies, kittens, and outdoor pets under 1 year.',
    citation: '<a href="https://www.nhp.gov.in/disease/others/helminthiasis-intestinal-worms" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">National Health Portal: Helminthiasis</a>'
  },
  {
    icon: '🦠',
    question: 'What is leptospirosis, and in which pets is it common?',
    answer: 'Leptospirosis is a bacterial infection spread through urine, mostly affecting young adult and outdoor dogs during monsoon, but also cats in humid areas.',
    citation: '<a href="https://www.nhp.gov.in/disease/communicable-disease/leptospirosis" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">National Health Portal: Leptospirosis</a>'
  },
  {
    icon: '🦴',
    question: 'How common is hip dysplasia in Indian dogs, and which breeds/ages are affected?',
    answer: 'Hip dysplasia is a genetic joint problem seen mainly in large breed dogs like Labradors and German Shepherds, most often diagnosed in pets over 1 year old.',
    citation: '<a href="https://www.akc.org/expert-advice/health/hip-dysplasia-in-dogs/" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">AKC: Hip Dysplasia</a>'
  },
  {
    icon: '👃',
    question: 'What is kennel cough and in which pets/ages does it occur?',
    answer: 'Kennel cough is a contagious respiratory disease affecting dogs of all ages, especially puppies and those in boarding or shelters.',
    citation: '<a href="https://vcahospitals.com/know-your-pet/kennel-cough-in-dogs" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">VCA Hospitals: Kennel Cough</a>'
  },
  {
    icon: '🧤',
    question: 'What is mange and which age group/pets are most affected?',
    answer: 'Mange is caused by skin mites leading to hair loss and itching, common in stray and young dogs, especially puppies less than 2 years old.',
    citation: '<a href="https://www.nhp.gov.in/disease/others/mange" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">National Health Portal: Mange</a>'
  },
  {
    icon: '🐾',
    question: 'How prevalent is tick fever (ehrlichiosis/babesiosis) among pets in India?',
    answer: 'Tick fever, including ehrlichiosis and babesiosis, mostly affects outdoor dogs aged 1-6 years and breeds in tick-infested regions.',
    citation: '<a href="https://www.nhp.gov.in/disease/communicable-disease/tick-fever" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">National Health Portal: Tick Fever</a>'
  },
  {
    icon: '🦗',
    question: 'Are flea and tick infestations common and in which pets?',
    answer: 'Flea and tick infestations are common in outdoor dogs and cats of all ages in India, especially during warm months and in monsoon season.',
    citation: '<a href="https://vcahospitals.com/know-your-pet/fleas-in-dogs-and-cats" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">VCA Hospitals: Fleas in Dogs & Cats</a>'
  },
  {
    icon: '⚕️',
    question: 'What is pyometra and which age group/pets gets it?',
    answer: 'Pyometra is a uterine infection seen in unspayed female dogs and cats, mainly middle-aged and older pets (typically age 5+ years).',
    citation: '<a href="https://vcahospitals.com/know-your-pet/pyometra-in-dogs" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">VCA Hospitals: Pyometra</a>'
  },
  {
    icon: '🦷',
    question: 'Is dental disease common among Indian pets, and who gets it most?',
    answer: 'Dental disease, including tartar and gum infections, is common in adult and senior pets (dogs and cats) over age 3 years.',
    citation: '<a href="https://vcahospitals.com/know-your-pet/dental-disease-in-dogs" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">VCA Hospitals: Dental Disease in Dogs</a>'
  },
  {
    icon: '💩',
    question: "Is diarrhea a sign of illness and which pets/ages are most likely to have it?",
    answer: 'Diarrhea is a symptom of infection, worms, or food allergy, most common in puppies, kittens, and pets less than 2 years old.',
    citation: '<a href="https://www.nhp.gov.in/disease/others/diarrhea-in-animals" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">National Health Portal: Diarrhea in Animals</a>'
  },
  {
    icon: '😿',
    question: 'What is feline panleukopenia and which cats get it most?',
    answer: 'Feline panleukopenia is a viral disease known as cat distemper, most severe in kittens under 6 months and unvaccinated cats.',
    citation: '<a href="https://www.nhp.gov.in/disease/others/feline-panleukopenia" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">National Health Portal: Feline Panleukopenia</a>'
  },
  {
    icon: '👁️',
    question: "What is eye infection (conjunctivitis) in pets, and who gets it most?",
    answer: 'Eye infections are frequent in dogs and cats of all ages, especially strays, those in dusty areas, or pets with allergies.',
    citation: '<a href="https://vcahospitals.com/know-your-pet/conjunctivitis-in-dogs" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">VCA Hospitals: Conjunctivitis in Dogs</a>'
  },
  {
    icon: '🔬',
    question: "Are skin allergies common in Indian pets and who is affected?",
    answer: 'Skin allergies occur in both dogs and cats (all ages), but more commonly in young adults and breeds like Labradors and Persians.',
    citation: '<a href="https://www.nhp.gov.in/disease/others/allergic-diseases-in-animals" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">National Health Portal: Allergic Diseases in Animals</a>'
  },
  {
    icon: '🚽',
    question: 'What is UTI (urinary tract infection) and which pets/ages tend to get it?',
    answer: 'UTIs are frequent in adult female dogs and older cats, especially those with diabetes or kidney disease.',
    citation: '<a href="https://vcahospitals.com/know-your-pet/urinary-tract-infection-in-dogs" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">VCA Hospitals: UTI in Dogs</a>'
  },
  {
    icon: '🍛',
    question: 'Is obesity a problem for Indian pets, and at which age most?',
    answer: 'Obesity is common in middle-aged and senior pets (dogs and cats 5+ years), especially those on calorie-rich diets and low activity.',
    citation: '<a href="https://vcahospitals.com/know-your-pet/obesity-in-dogs" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">VCA Hospitals: Obesity in Dogs</a>'
  },
  {
    icon: '👂',
    question: 'How common are ear infections in pets and at what ages?',
    answer: 'Ear infections are frequent in dogs with floppy ears and kittens, but can occur at any age, especially in humid climates.',
    citation: '<a href="https://vcahospitals.com/know-your-pet/ear-infections-in-dogs" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">VCA Hospitals: Ear Infections in Dogs</a>'
  },
  {
    icon: '🧫',
    question: 'What is ringworm (dermatophytosis), and who gets it most often?',
    answer: 'Ringworm is a fungal skin infection that mostly affects puppies, kittens, and stray pets under age 2 in India.',
    citation: '<a href="https://www.nhp.gov.in/disease/others/ringworm-in-animals" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">National Health Portal: Ringworm in Animals</a>'
  },
  {
    icon: '🧪',
    question: 'Is diabetes found among Indian pets, and who gets it most?',
    answer: 'Diabetes mellitus is mostly seen in middle-aged and senior cats and dogs, especially obese or unspayed female pets.',
    citation: '<a href="https://vcahospitals.com/know-your-pet/diabetes-mellitus-in-dogs" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">VCA Hospitals: Diabetes Mellitus in Dogs</a>'
  },
  {
    icon: '🦋',
    question: 'Are heartworm infections common in Indian pets and at what ages?',
    answer: 'Heartworm is rare but increasing in Indian dogs, mainly seen in adult outdoor dogs aged 2-7 years in humid climates.',
    citation: '<a href="https://vcahospitals.com/know-your-pet/heartworm-disease-in-dogs" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">VCA Hospitals: Heartworm Disease in Dogs</a>'
  },
  {
    icon: '👄',
    question: 'Is stomatitis common in Indian cats and which cats are prone?',
    answer: 'Stomatitis (mouth inflammation) is mainly seen in adult and senior cats, especially strays and those with FIV/FeLV.',
    citation: '<a href="https://vcahospitals.com/know-your-pet/stomatitis-in-cats" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">VCA Hospitals: Stomatitis in Cats</a>'
  },
  {
    icon: '🧬',
    question: 'Do Indian pets get lymphoma and which age/pets?',
    answer: 'Lymphoma, a type of cancer, is primarily seen in older dogs and cats (age 6+), especially those exposed to carcinogens.',
    citation: '<a href="https://vcahospitals.com/know-your-pet/lymphoma-in-dogs" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">VCA Hospitals: Lymphoma in Dogs</a>'
  },
  {
    icon: '😟',
    question: 'Is anxiety and behavioral disorder a disease in Indian pets?',
    answer: 'Anxiety and behavioral disorders are increasingly seen in urban dogs and cats, especially young and middle-aged indoor pets.',
    citation: '<a href="https://vcahospitals.com/know-your-pet/anxiety-disorders-in-dogs" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">VCA Hospitals: Anxiety Disorders in Dogs</a>'
  },

  // Previous 25+ items...
  {
    icon: '🦗',
    question: 'What is Babesiosis and which pets are most at risk?',
    answer: 'Babesiosis is a tick-borne blood parasite disease seen mostly in adult outdoor dogs, causing fever and anemia.',
    citation: '<a href="https://www.nhp.gov.in/disease/others/babesiosis-in-animals" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">NHP: Babesiosis in Animals</a>'
  },
  {
    icon: '💡',
    question: "Are hairball problems frequent in Indian cats? Which age group?",
    answer: 'Hairballs cause digestive issues mostly in long-haired adult and senior cats, especially indoor breeds.',
    citation: '<a href="https://www.aspca.org/pet-care/cat-care/common-cat-behavior-issues/hairballs" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">ASPCA: Cat Hairballs</a>'
  },
  {
    icon: '🧬',
    question: 'Do Indian pets suffer from hypothyroidism, and who gets it?',
    answer: 'Hypothyroidism affects mostly middle-aged and senior dogs, especially spayed females and certain breeds.',
    citation: '<a href="https://vcahospitals.com/know-your-pet/hypothyroidism-in-dogs" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">VCA: Hypothyroidism in Dogs</a>'
  },
  {
    icon: '🚨',
    question: "What is feline leukemia virus (FeLV) and in which cats?",
    answer: 'FeLV is a viral infection seen mostly in young and juvenile outdoor cats, leading to immune suppression.',
    citation: '<a href="https://vcahospitals.com/know-your-pet/feline-leukemia-virus-infection" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">VCA: FeLV in Cats</a>'
  },
  {
    icon: '🩸',
    question: "What is bleeding disorder in dogs (hemophilia), and which age group is at risk?",
    answer: 'Hemophilia and bleeding disorders occur mostly in young male dogs due to genetic predisposition.',
    citation: '<a href="https://www.msdvetmanual.com/hematologic-disorders/hemostatic-disorders/hemophilia-in-animals" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">MSD Vet Manual: Hemophilia</a>'
  },
  {
    icon: '🔊',
    question: "Is deafness common in pets and who gets it mostly?",
    answer: 'Congenital deafness is seen in certain breeds and older pets, especially white-coated dogs and senior cats.',
    citation: '<a href="https://vcahospitals.com/know-your-pet/deafness-in-dogs-and-cats" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">VCA: Deafness in Dogs & Cats</a>'
  },
  {
    icon: '🐔',
    question: 'Do chickens or backyard birds in India have common diseases?',
    answer: 'Yes, Newcastle disease, fowl pox, and coccidiosis are common in all age groups of backyard and farm birds.',
    citation: '<a href="https://www.nhp.gov.in/disease/others/poultry-diseases" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">NHP: Poultry Diseases</a>'
  },
  {
    icon: '🟠',
    question: 'Is jaundice or liver disease prevalent among pets, and who gets it?',
    answer: 'Liver disease is seen in senior dogs and cats, especially those with chronic infections or on certain medications.',
    citation: '<a href="https://vcahospitals.com/know-your-pet/liver-disease-in-dogs" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">VCA: Liver Disease in Dogs</a>'
  },
  {
    icon: '🤢',
    question: 'What causes vomiting and which pet age group is most affected?',
    answer: 'Vomiting is common in puppies, kittens, and pets under 2 years due to infections or dietary indiscretion.',
    citation: '<a href="https://vcahospitals.com/know-your-pet/vomiting-in-dogs" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">VCA: Vomiting in Dogs</a>'
  },
  {
    icon: '🦿',
    question: 'What is arthritis and is it common in Indian pets?',
    answer: 'Arthritis is frequent in senior dogs and cats (7+ years), causing joint pain and stiffness.',
    citation: '<a href="https://vcahospitals.com/know-your-pet/arthritis-in-dogs" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">VCA: Arthritis in Dogs</a>'
  },
  {
    icon: '🏖️',
    question: 'Do pets suffer heatstroke in India? Who gets it most?',
    answer: 'Heatstroke occurs in all pets, but puppies, senior dogs, and brachycephalic breeds are most vulnerable in summer.',
    citation: '<a href="https://vcahospitals.com/know-your-pet/heatstroke-in-dogs" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">VCA: Heatstroke in Dogs</a>'
  },
  {
    icon: '👃',
    question: 'What is upper respiratory infection in cats and who gets it?',
    answer: 'Kittens and juvenile cats from shelters are most likely to get feline viral respiratory infections in India.',
    citation: '<a href="https://vcahospitals.com/know-your-pet/feline-upper-respiratory-infection" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">VCA: URI in Cats</a>'
  },
  {
    icon: '🦠',
    question: 'Is distemper seen in Indian cats? Which cat ages?',
    answer: 'Distemper (panleukopenia) affects kittens under 1 year and unvaccinated adult cats.',
    citation: '<a href="https://www.nhp.gov.in/disease/others/feline-panleukopenia" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">NHP: Feline Panleukopenia</a>'
  },
  {
    icon: '💉',
    question: 'Is vaccination important for Indian pets? At what age?',
    answer: 'Vaccination is crucial for puppies and kittens aged 6 weeks to 1 year, and annual boosters prevent deadly diseases.',
    citation: '<a href="https://vcahospitals.com/know-your-pet/vaccines-for-dogs" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">VCA: Vaccines for Dogs</a>'
  },
  {
    icon: '🧪',
    question: 'Is pancreatitis common in Indian dogs and cats?',
    answer: 'Pancreatitis is seen mostly in middle-aged and senior dogs and cats (age 5+), especially obese or inactive pets.',
    citation: '<a href="https://vcahospitals.com/know-your-pet/pancreatitis-in-dogs" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">VCA: Pancreatitis in Dogs</a>'
  },
  {
    icon: '🦁',
    question: 'What is feline Immunodeficiency Virus (FIV)? Which age group?',
    answer: 'FIV mainly affects outdoor male adult cats (2+ years) exposed to bites from infected cats.',
    citation: '<a href="https://vcahospitals.com/know-your-pet/feline-immunodeficiency-virus-infection" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">VCA: FIV in Cats</a>'
  },
  {
    icon: '🍂',
    question: 'Is vomiting and diarrhea more common in puppies or kittens?',
    answer: 'Both are common, but puppies and kittens under 1 year are at highest risk for dehydration from such symptoms in India.',
    citation: '<a href="https://vcahospitals.com/know-your-pet/vomiting-in-dogs" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">VCA: Vomiting in Dogs</a>'
  },
  {
    icon: '🧫',
    question: 'What is Salmonellosis and in which pets/ages does it occur?',
    answer: 'Salmonella can cause GI infection, mainly in young or immunosuppressed dogs and cats under age 2.',
    citation: '<a href="https://www.cdc.gov/healthypets/diseases/salmonellosis.html" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">CDC: Salmonellosis and Pets</a>'
  },
  {
    icon: '🦦',
    question: "Is kidney disease (renal failure) common in Indian cats and dogs?",
    answer: 'Chronic renal failure is most prevalent in senior cats and dogs (8+ years) with congenital or acquired risks.',
    citation: '<a href="https://vcahospitals.com/know-your-pet/kidney-disease-chronic-in-dogs" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">VCA: Kidney Disease in Dogs</a>'
  },
  {
    icon: '😀',
    question: 'Is oral tumor common in Indian pets and in which age group?',
    answer: 'Oral tumors, including oral melanoma, occur more in senior dogs and cats above age 7.',
    citation: '<a href="https://vcahospitals.com/know-your-pet/oral-tumors-in-dogs" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">VCA: Oral Tumors in Dogs</a>'
  },
  {
    icon: '💀',
    question: 'Do Indian pets suffer poisoning and who gets it mostly?',
    answer: 'Poisoning from chemicals, pesticides, or foods occurs in all ages, but most frequently in puppies, kittens, and curious young pets.',
    citation: '<a href="https://vcahospitals.com/know-your-pet/poisoning-in-dogs" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">VCA: Poisoning in Dogs</a>'
  },
  {
    icon: '🦟',
    question: 'Can pets get mosquito-borne diseases in India?',
    answer: 'Yes, mosquito-borne diseases like heartworm and West Nile can affect outdoor dogs and cats, especially adult outdoor pets.',
    citation: '<a href="https://vcahospitals.com/know-your-pet/heartworm-disease-in-dogs" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">VCA: Heartworm in Dogs</a>'
  },
  {
    icon: '🍗',
    question: 'Is food allergy increasing among pets in India? Which age group?',
    answer: 'Food allergy is increasingly recognised in young and middle-aged dogs and cats fed processed diets or table scraps.',
    citation: '<a href="https://vcahospitals.com/know-your-pet/food-allergies-in-dogs" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">VCA: Food Allergies in Dogs</a>'
  },
  {
    icon: '🧠',
    question: 'Do Indian pets get epilepsy? Who is most at risk?',
    answer: 'Epilepsy is seen mostly in young and middle-aged dogs (1-6 years), especially certain breeds with genetic risk.',
    citation: '<a href="https://vcahospitals.com/know-your-pet/seizure-disorders-in-dogs" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">VCA: Seizure Disorders in Dogs</a>'
  },
  {
    icon: '🙀',
    question: 'What is feline infectious peritonitis (FIP) and which cats get it?',
    answer: 'FIP is a deadly viral disease mostly affecting young cats (<2 years) in multi-cat households.',
    citation: '<a href="https://vcahospitals.com/know-your-pet/feline-infectious-peritonitis" target="_blank" rel="noopener noreferrer" style="color: var(--color-primary); text-decoration: underline;">VCA: FIP in Cats</a>'
  }
];


// ========================================================================
// NEW DATA STRUCTURES FOR EMPTY SECTIONS
// ========================================================================

const whenToSeeData = [

    // --- 1. Persistent Lameness or Limping ---
    {
        icon: '🐾',
        question: 'Limping or Difficulty Walking Lasts More Than 2 Days',
        answer: 'See a veterinarian if:\n• Limping persists or worsens\n• Your pet struggles to stand, jump, or move\n• There is swelling, heat or pain in the limb\n\nEarly care prevents worsening injury or joint damage.',
        citation: 'American Veterinary Medical Association. Lameness in Pets. 2025.'
    },

    // --- 2. Sudden Loss of Appetite or Drinking ---
    {
        icon: '🥣',
        question: 'Refuses Food or Water for Over 24 Hours',
        answer: 'Get urgent vet care if:\n• Pet stops eating/drinking suddenly\n• Lethargy or vomiting is present\n• Weight loss occurs quickly\n\nThese symptoms may signal underlying illness.',
        citation: 'PetMD. Loss of Appetite in Dogs & Cats. 2025.'
    },

    // --- 3. Vomiting or Diarrhea ---
    {
        icon: '🤮',
        question: 'Repeated Vomiting or Diarrhea Lasting Over 24 Hours',
        answer: 'Veterinary evaluation is needed if:\n• Occurs multiple times in a day\n• Blood is present in stool or vomit\n• Pet becomes weak or unresponsive\n\nCan indicate infection, toxin, or GI blockage.',
        citation: 'VCA Hospitals. Gastrointestinal Upset. 2025.'
    },

    // --- 4. Breathing Difficulty ---
    {
        icon: '🫁',
        question: 'Difficulty Breathing, Gagging, or Persistent Cough',
        answer: 'Seek IMMEDIATE care if:\n• Breathing is rapid, noisy, or labored\n• Gums/tongue become blue or pale\n• Pet collapses or faints\n\nRespiratory emergencies require urgent treatment.',
        citation: 'American Animal Hospital Association. Breathing Issues. 2025.'
    },

    // --- 5. Sudden Weakness or Collapse ---
    {
        icon: '🧑‍⚕️',
        question: 'Pet Suddenly Collapses or Can’t Stand',
        answer: 'Go to emergency clinic if:\n• Pet collapses or loses consciousness\n• There is seizure, fainting, or paralysis\n\nThese are signs of severe illness or trauma.',
        citation: 'Vetstreet. Weakness & Collapsing in Dogs and Cats. 2025.'
    },

    // --- 6. Severe Injury, Bleeding, or Bite Wounds ---
    {
        icon: '🩸',
        question: 'Deep Cuts, Persistent Bleeding, or Animal Bite',
        answer: 'Urgent veterinary attention needed for:\n• Active bleeding not stopping with pressure\n• Visible bone or deep wound\n• Bite from other animal (risk of infection/rabies)\n\nWounds may require surgery or antibiotics.',
        citation: 'ASPCA. Emergency First Aid. 2025.'
    },

    // --- 7. Seizures, Tremors, or Uncoordinated Movement ---
    {
        icon: '⚡',
        question: 'Seizures, Sudden Trembling, or Staggering Walk',
        answer: 'Vet care required if:\n• Seizure lasts longer than 5 minutes\n• Multiple seizures in 24 hours\n• Uncoordinated movements or loss of balance\n\nCan be neurological or toxic causes.',
        citation: 'PetMD. Seizures in Pets. 2025.'
    },

    // --- 8. Swelling of Face, Eyes, or Abdomen ---
    {
        icon: '😯',
        question: 'Sudden Swelling Anywhere on Pet’s Body',
        answer: 'See a vet urgently for:\n• Swelling with pain or difficulty breathing\n• Hives or facial swelling after bite or sting\n• Abdominal bloating with discomfort\n\nCould indicate allergy, infection, or bloat.',
        citation: 'VCA Hospitals. Allergic Reactions. 2025.'
    },

    // --- 9. Difficulty Urinating or Defecating ---
    {
        icon: '🚽',
        question: 'Straining to Pee or Poop, Blood in Urine/Stool',
        answer: 'Veterinary visit is needed if:\n• Pet cannot urinate/defecate or seems in pain\n• Blood in urine, stool, or frequent accidents\n\nCan indicate blockage, UTI, or digestive issue.',
        citation: 'PetMD. Urinary Emergencies. 2025.'
    },

    // --- 10. Refuses to Move, Hides, or Shows Sudden Aggression ---
    {
        icon: '🙈',
        question: 'Pet Suddenly Withdraws, Refuses Contact, or Becomes Aggressive',
        answer: 'See a vet if:\n• Sudden behavior change: hiding, aggression, or fear\n• Painful areas when touched, or unusual vocalizations\n\nBehavioral changes often signal pain or illness.',
        citation: 'ASPCA. Changes in Pet Behavior. 2025.'
    },

    // --- 11. Persistent Cough or Sneezing ---
    {
        icon: '😷',
        question: 'Coughing, Sneezing, or Nasal Discharge Lasts More Than 3 Days',
        answer: 'See a vet if:\n• Discharge is thick, yellow or bloody\n• Breathing becomes noisy or labored\n• Other pets in home get sick\n\nSigns include infection or respiratory illness.',
        citation: 'AVMA. Pet Colds. 2025.'
    },

    // --- 12. Eye Injury or Sudden Vision Change ---
    {
        icon: '👁️',
        question: 'Squinting, Redness, or Sudden Blindness',
        answer: 'Vet care needed for:\n• Sudden cloudiness, redness, or discharge\n• Eye injury, bulging, or pawing at eye\n• Sudden vision problems\n\nInfections and injuries may worsen quickly.',
        citation: 'VCA Hospitals. Eye Emergencies in Pets. 2024.'
    },

    // --- 13. Ear Infection or Head Shaking ---
    {
        icon: '👂',
        question: 'Persistent Head Shaking, Ear Odor, or Discharge',
        answer: 'Visit a vet if:\n• Ear is painful, red, or oozes liquid\n• Pet shakes or tilts head frequently\n• Scratches ears excessively\n\nCan cause hearing loss if untreated.',
        citation: 'PetMD. Ear Infections. 2025.'
    },

    // --- 14. Sudden Hair Loss or Bald Spots ---
    {
        icon: '🦰',
        question: 'Rapid Hair Loss, Bald Patches, or Skin Rash',
        answer: 'Vet check needed if:\n• Red, irritated or oozing skin\n• Excess licking or scratching\n• Hair loss spreads fast\n\nMay be allergy, infection, or parasite.',
        citation: 'VCA Hospitals. Hair Loss in Pets. 2025.'
    },

    // --- 15. Persistent Itchy Skin or Scratching ---
    {
        icon: '🪳',
        question: 'Constant Scratching or Chewing at Skin',
        answer: 'See a vet if:\n• Itching disrupts sleep or normal activities\n• Skin bleeds or develops sores\n• Fleas, mites or ticks are seen\n\nSkin disease and infestation need treatment.',
        citation: 'PetMD. Skin Problems. 2025.'
    },

    // --- 16. Swelling or Lump Anywhere on Body ---
    {
        icon: '🦠',
        question: 'New Lump or Bump Found on Pet',
        answer: 'See a vet for:\n• Lump grows fast or changes\n• Lump is painful or discharges\n• Persistent swelling\n\nRule out tumor, abscess, or cyst.',
        citation: 'AVMA. Masses and Tumors. 2025.'
    },

    // --- 17. Sudden Change in Behavior or Personality ---
    {
        icon: '🤨',
        question: 'Major Change in Pet’s Relaxed or Social Behavior',
        answer: 'Vet visit if:\n• Friendly pet becomes withdrawn or aggressive\n• Sudden confusion, aimless wandering\n\nBehavioral shifts can mean distress or neurological changes.',
        citation: 'PetMD. Behavioral Emergencies. 2025.'
    },

    // --- 18. Weight Gain or Loss Without Diet Change ---
    {
        icon: '⚖️',
        question: 'Unexpected Weight Loss or Gain in Pet',
        answer: 'Check with vet if:\n• Change occurs rapidly\n• Accompanied by lethargy, thirst, or appetite change\n\nMay indicate metabolic, hormonal or digestive problem.',
        citation: 'VCA Hospitals. Weight Fluctuations. 2025.'
    },

    // --- 19. Increased Thirst or Urination ---
    {
        icon: '💧',
        question: 'Drinking or Urinating Much More Than Usual',
        answer: 'See a vet if:\n• Water intake doubles or accidents increase\n• Urinary accidents or house soiling in a trained pet\n\nDiabetes, kidney or endocrine problems possible.',
        citation: 'PetMD. Excessive Thirst. 2025.'
    },

    // --- 20. Abnormal Odor from Mouth or Body ---
    {
        icon: '🦷',
        question: 'Strong Bad Breath or Unusual Body Odor',
        answer: 'Vet exam if:\n• Breath is foul, metallic or sweet\n• Odor persists after bathing or cleaning\n• Mouth redness or tooth loss present\n\nDental or metabolic disease check needed.',
        citation: 'AVMA. Dental Disease. 2025.'
    },

    // --- 21. Seizure in Cat or Dog ---
    {
        icon: '🧠',
        question: 'Twitching, Convulsions, or Loss of Consciousness',
        answer: 'Immediate vet care if:\n• Seizure lasts over 1-2 minutes\n• Multiple seizures (cluster)\n• Pet does not recover quickly\n\nCan indicate poisoning, epilepsy, or brain issue.',
        citation: 'VCA Hospitals. Seizures. 2025.'
    },

    // --- 22. Ingested Toxin, Chemical, or Plant ---
    {
        icon: '☠️',
        question: 'Suspected Poisoning or Toxic Exposure',
        answer: 'Call vet/poison control if:\n• Ingests medications, chemicals, poisonous plants\n• Vomits, trembles, collapses afterward\n\nImmediate action can be life-saving.',
        citation: 'ASPCA. Poison Control. 2025.'
    },

    // --- 23. Difficulty Opening Mouth or Eating ---
    {
        icon: '🦷',
        question: 'Pain When Eating or Unable to Open Mouth',
        answer: 'Vet needed for:\n• Refuses food from jaw pain\n• Drooling, pawing at mouth\n• Swelling around jaw or face\n\nMay be abscess, injury or dental disease.',
        citation: 'AVMA. Oral Pain. 2024.'
    },

    // --- 24. Blood in Stool, Urine, Vomit, or Saliva ---
    {
        icon: '🩸',
        question: 'Any Blood in Bodily Fluids',
        answer: 'Urgent vet care for:\n• Red/bloody stool, urine, vomit, or drool\n• Persistent bleeding\n\nCan mean trauma, infection, or cancer.',
        citation: 'PetMD. Hemorrhage in Pets. 2025.'
    },

    // --- 25. Unusual Vocalizations: Crying, Whining, Howling ---
    {
        icon: '🔊',
        question: 'Sudden Increase in Crying, Whining, or Yowling',
        answer: 'Vet evaluation if:\n• Unexplained or persistent vocal distress\n• Accompanied by pain, aggression or restlessness\n\nChanges may signal pain or neurological disease.',
        citation: 'VCA Hospitals. Communication Changes. 2025.'
    },

    // --- 26. Heatstroke or Overheating ---
    {
        icon: '🌡️',
        question: 'Heavy Panting, Collapse, or Dark Red Gums on Hot Day',
        answer: 'Emergency vet care if:\n• Body is hot, weak or disoriented\n• Pet collapses, vomits, or has seizure\n\nHeatstroke is life-threatening and rapid cooling is needed.',
        citation: 'AVMA. Heat Stress. 2025.'
    },

    // --- 27. Persistent Lethargy or Weakness ---
    {
        icon: '😴',
        question: 'Sleeping More or Unwilling to Play/Move',
        answer: 'Vet care for:\n• Dramatic change in energy or enthusiasm\n• Persistent weakness over days\n\nLethargy may indicate infection or organ issue.',
        citation: 'PetMD. Lethargy. 2025.'
    },

    // --- 28. Allergic Reaction (Swelling, Hives, Vomiting) ---
    {
        icon: '😱',
        question: 'Sudden Swelling, Hives, or Facial Puffiness',
        answer: 'Urgent vet check for:\n• Hives/bumps, swelling, or trouble breathing\n• Acute vomiting or diarrhea\n\nCan progress to dangerous anaphylaxis.',
        citation: 'VCA Hospitals. Allergies. 2024.'
    },

    // --- 29. Persistent Licking/Chewing of One Area ---
    {
        icon: '👅',
        question: 'Constant Focus on One Spot (Wound, Paw, etc.)',
        answer: 'Vet care needed:\n• Area becomes raw, swollen, or infected\n• Bandaging doesn’t help\n\nCan point to injury, allergy or anxiety.',
        citation: 'PetMD. Lick Granuloma. 2025.'
    },

    // --- 30. Unresponsive to Command or Sudden Confusion ---
    {
        icon: '❓',
        question: 'Ignores Familiar Commands or Appears Disoriented',
        answer: 'Vet needed if:\n• Pet seems “lost” or confused in familiar settings\n• Sudden trouble recognizing owner\n\nCould indicate toxin, metabolic, or neurological issue.',
        citation: 'ASPCA. Disorientation. 2025.'
    },

    // --- 31. Sudden Change in Urine or Stool Color/Consistency ---
    {
        icon: '🧻',
        question: 'Black, Orange, Green, or Extremely Hard/Loose Stools',
        answer: 'Vet consult for:\n• Sudden change in color, frequency, or texture\n• Accompanied by vomiting, pain, or lethargy\n\nIndicates infection, liver, or digestive disorder.',
        citation: 'PetMD. Stool Changes. 2024.'
    },

    // --- 32. Persistent Hiding or Avoidance ---
    {
        icon: '🙈',
        question: 'Hides More Than Usual or Avoids Interaction',
        answer: 'Vet care for:\n• Change persists >48 hours\n• Pet avoids light, sound, or touch\n\nOften signals pain, stress, or illness.',
        citation: 'AVMA. Behavioral Changes. 2025.'
    },

    // --- 33. Tremors or Shaking Without Apparent Cause ---
    {
        icon: '💢',
        question: 'Unexplained Trembling or Shivers',
        answer: 'See a vet for:\n• Persistent shaking, shivering, or twitching\n• Accompanied by weakness or collapse\n\nCan be neurological or metabolic.',
        citation: 'VCA Hospitals. Tremors. 2025.'
    },

    // --- 34. Sudden Aggression Towards People or Other Pets ---
    {
        icon: '🦴',
        question: 'Sudden Teeth-Baring, Growling, or Attacks',
        answer: 'Vet if:\n• Behavior changes abruptly\n• Injury, pain, or neurological cause suspected\n\nSudden aggression can mean serious distress.',
        citation: 'ASPCA. Aggression. 2025.'
    },

    // --- 35. Difficulty Swallowing, Gagging, or Drooling ---
    {
        icon: '🫦',
        question: 'Gags or Coughs Repeatedly; Excess Drool',
        answer: 'Vet check if:\n• Persistent trouble swallowing food/water\n• Visible swelling in throat or mouth\n\nCan indicate obstruction, abscess, or toxin.',
        citation: 'PetMD. Swallowing Problems. 2025.'
    },

    // --- 36. Unexplained Lameness in Multiple Limbs ---
    {
        icon: '🐕',
        question: 'Sudden Weakness or Limping in More Than One Leg',
        answer: 'Vet visit if:\n• Occurs without injury\n• Worsens with movement or is accompanied by pain\n\nCan signal neurological or infectious process.',
        citation: 'VCA Hospitals. Multi-Limb Lameness. 2025.'
    },

    // --- 37. Continuous Pawing at Mouth/Ears/Eyes ---
    {
        icon: '🖐️',
        question: 'Repeatedly Scratches or Paws at Head Areas',
        answer: 'Vet exam if:\n• Persistent discomfort or injury\n• Bleeding, discharge, or odor present\n\nMay indicate infection or foreign object.',
        citation: 'AVMA. Discomfort Signs. 2025.'
    },

    // --- 38. Sudden Loss of Balance or Falling Over ---
    {
        icon: '🕺',
        question: 'Falls Over or Can’t Walk Straight',
        answer: 'Vet attention needed for:\n• Repeated loss of balance\n• Sudden head tilt or circling\n\nCan mean inner ear or brain disease.',
        citation: 'PetMD. Vestibular Problems. 2025.'
    },

    // --- 39. Persistent Runny Nose, Cough, or Reverse Sneezing ---
    {
        icon: '🤧',
        question: 'Nasal Discharge, Cough, or Unusual Breathing Sounds',
        answer: 'Vet consultation if:\n• Lasts beyond 3 days\n• Significant congestion, choking or distress\n\nPet may have respiratory infection or allergy.',
        citation: 'AVMA. Nasal Symptoms. 2025.'
    },

    // --- 40. Unexplained Lump in Abdomen or Chest ---
    {
        icon: '🫀',
        question: 'New Hard or Soft Lump Inside Body Cavity',
        answer: 'Vet needed if:\n• Lump is palpable and persists\n• Accompanied by vomiting, lethargy, or poor appetite\n\nPossible tumor, cyst, or organ problem.',
        citation: 'VCA Hospitals. Body Masses. 2025.'
    },

    // --- 41. Frequent Scooting or Anal Licking ---
    {
        icon: '🔙',
        question: 'Drags Rear or Licks Bottom Frequently',
        answer: 'Vet exam for:\n• Scooting, biting, or licking anal area\n• Visible swelling or discharge\n\nMay indicate parasites, gland issues, or infection.',
        citation: 'AVMA. Anal Sac Problems. 2025.'
    },

    // --- 42. Unusual Eye Color or Cloudiness ---
    {
        icon: '👀',
        question: 'Sudden Change in Eye Color, White Spots, or Cloudiness',
        answer: 'See a vet if:\n• Eyes change color, appear cloudy, or lose shine\n• Discharge or vision loss occurs\n\nCan mean glaucoma, cataracts, or injury.',
        citation: 'VCA Hospitals. Eye Color Changes. 2025.'
    },

    // --- 43. Sudden Loss of Hearing or Non-Response to Sound ---
    {
        icon: '🎧',
        question: 'Stops Responding to Noise or Commands',
        answer: 'Vet visit for:\n• Sudden hearing loss with head shaking or discharge\n• Unusual silence or confusion\n\nOtitis, wax, or neurological concern.',
        citation: 'PetMD. Hearing Loss. 2025.'
    },

    // --- 44. Abnormal Gait: Hopping, Dragging, or Skipping ---
    {
        icon: '🏃‍♂️',
        question: 'Walks with Unusual Stride, Drags Legs, or Hops',
        answer: 'See a vet if:\n• Gait change persists or worsens\n• Unable to walk normally\n\nCan mean hip, neurological, or spinal disease.',
        citation: 'VCA Hospitals. Gait Problems. 2025.'
    },

    // --- 45. Swelling or Warmth in Joints/Paws ---
    {
        icon: '🔥',
        question: 'Pet’s Joints, Feet, or Paws Swell Up or Feel Hot',
        answer: 'Visit vet for:\n• Red, hot, or swollen joint/paw\n• Limping, pain, or reluctance to move\n\nPossible infection, arthritis, or injury.',
        citation: 'AVMA. Joint Problems. 2025.'
    },

    // --- 46. Persistent “Zoomies” or Hyperactive Episodes ---
    {
        icon: '🏎️',
        question: 'Breaks of Unusual Frenzy or Running',
        answer: 'Vet check if:\n• Frantic hyperactivity not seen before\n• Accompanied by panting, shaking, or drooling\n\nNeurological or metabolic cause possible.',
        citation: 'PetMD. Excess Energy. 2025.'
    },

    // --- 47. Difficulty Giving Birth or Prolonged Labor ---
    {
        icon: '🐕‍🦺',
        question: 'Trouble Delivering Puppies/Kittens in Any Breed',
        answer: 'Emergency vet care needed for:\n• Active labor with no delivery in 30–60 min\n• Puppy/kitten stuck, or mother is tired, weak, or distressed\n\nCan be life threatening for mother and offspring.',
        citation: 'AVMA. Dystocia. 2025.'
    },

    // --- 48. Persistent Nosebleeds ---
    {
        icon: '🩸',
        question: 'Recurring or Heavy Bleeding from Nose',
        answer: 'See a vet urgently:\n• Nosebleed lasts more than a few minutes\n• Accompanied by sneezing, coughing, or lethargy\n\nMay mean trauma, clotting disorder, tumor.',
        citation: 'VCA Hospitals. Epistaxis. 2025.'
    },

    // --- 49. Sudden Swelling in Abdomen (Bloat) ---
    {
        icon: '🏥',
        question: 'Sudden Hard, Swollen Belly in Dog',
        answer: 'Emergency vet needed for:\n• Rapid abdominal swelling, retching with no vomit, collapse\n\nCould be gastric torsion/bloat, often fatal without urgent treatment.',
        citation: 'AVMA. Gastric Dilatation Volvulus. 2025.'
    },

    // --- 50. Unexplained Lethargy After Vaccination ---
    {
        icon: '💉',
        question: 'Pet Becomes Weak or Collapses Post-Vaccine',
        answer: 'Urgent vet care for:\n• Weakness, vomiting, or collapse after vaccine\n• Severe swelling, hives, or allergic reaction\n\nPossible vaccine reaction/needing rapid intervention.',
        citation: 'ASPCA. Vaccine Reactions. 2025.'
    }

];

const preventionData = [

    {
    icon: '🐕',
    question: 'Daily Walks or Active Play With Your Dog',
    answer: 'Regular weight-bearing exercise (fetch, walks, running) strengthens bones and joints, lowering risk of arthritis, obesity, and hip dysplasia in dogs.',
    citation: 'NHP. Dog Fitness and Joint Health. 2025.'
    },
    {
        icon: '🐈',
        question: 'Encourage Climbing and Play in Cats',
        answer: 'Cats need jumping, climbing, and play for muscle and bone health—this helps prevent diabetes, obesity, and arthritis, especially in indoor cats.',
        citation: 'VCA. Cat Exercise and Bone Health. 2024.'
    },
    {
        icon: '🥦',
        question: 'Feed Balanced, High-Nutrient Diet',
        answer: 'Dogs and cats require balanced nutrition (protein, minerals, vitamins D & E) for bone development and immune protection against diseases like rickets and brittle bones.',
        citation: 'NHP. Pet Nutrition Best Practices. 2025.'
    },
    {
        icon: '☀️',
        question: 'Provide Safe Sun Exposure for Vitamin D',
        answer: 'Short outdoor exposure boosts pets’ natural vitamin D; essential for bone formation and immune defense against skin, bone, and joint infections.',
        citation: 'VCA. Vitamin D and Pet Health. 2024.'
    },
    {
        icon: '🚰',
        question: 'Ensure Constant Fresh Water',
        answer: 'Good hydration protects kidneys, bladder (reducing UTI, stones), and supports joint lubrication in all pets.',
        citation: 'AAHA. Hydration and Kidney Health in Dogs/Cats. 2025.'
    },
    {
        icon: '🍗',
        question: 'Avoid Excess Table Scraps and Human Food',
        answer: 'High-fat and spicy foods may cause pancreatitis, obesity, and digestive diseases in pets.',
        citation: 'VCA. Dietary Fat and Pet Health. 2024.'
    },
    {
        icon: '🦷',
        question: 'Brush Teeth and Use Dental Chews Regularly',
        answer: 'Dental care prevents gum disease, bad breath, and reduces risk of heart, liver, and kidney infection especially in older pets.',
        citation: 'AAHA. Dental Care for Pets. 2024.'
    },
    {
        icon: '🏥',
        question: 'Annual Veterinary Health Checkups',
        answer: 'Regular exams ensure early detection for heartworm, tick fever, diabetes, arthritis, and dental disease.',
        citation: 'NHP. Pet Disease Screening. 2025.'
    },
    {
        icon: '🛡️',
        question: 'Keep Vaccination Up to Date',
        answer: 'Timely vaccination protects against deadly diseases (parvovirus, distemper, rabies, panleukopenia) across all ages, especially for outdoor/young pets.',
        citation: 'NHP. Canine & Feline Vaccine Protocols. 2025.'
    },
    {
        icon: '🧼',
        question: 'Regular Bathing and Grooming',
        answer: 'Baths, brushing and parasite control prevent mange, tick/flea infestations, ringworm, and skin allergies.',
        citation: 'NHP. Skin Disease Prevention. 2024.'
    },
    {
        icon: '🚫',
        question: 'Prevent Contact With Strays or Sick Animals',
        answer: 'Prevent fights and bites; stray contact spreads rabies, parvo, mange, and pink-eye. Leash walks are best for city pets.',
        citation: 'NHP. Communicable Disease Risks in Pets. 2024.'
    },
    {
        icon: '🌡️',
        question: 'Monitor Pet’s Weight and Body Condition',
        answer: 'Rapid changes in weight may signal diabetes, hypothyroidism, lymphoma or organ disease. Seek vet care early.',
        citation: 'VCA. Obesity and Related Disease in Pets. 2024.'
    },
    {
        icon: '🎾',
        question: 'Use Toys and Interactive Feeding Tools',
        answer: 'Puzzle feeders and play keep pets active and mentally stimulated, lowering risks of anxiety and obesity.',
        citation: 'AAHA. Mental Health in Companion Animals. 2025.'
    },
    {
        icon: '🧪',
        question: 'Promptly Treat Any Infection or Wound',
        answer: 'Untreated infections may progress to sepsis, osteomyelitis, pyometra, or abscess formation; early vet intervention reduces risk.',
        citation: 'Mayo Clinic. Pet Infection and Treatment. 2025.'
    },
    {
        icon: '🐾',
        question: 'Check Paws, Nails, and Pads Weekly',
        answer: 'Foot injuries cause limping, infections, and sometimes arthritis or mobility loss—especially in active breeds.',
        citation: 'AAHA. Paw and Nail Care Guide. 2024.'
    },
    {
        icon: '🍃',
        question: 'Reduce Household Chemical Use',
        answer: 'Keep cleaning agents, insecticides, and medications locked away; certain toxins can cause seizures, kidney/liver failure or poisoning in pets.',
        citation: 'VCA. Pet Toxicity and Household Hazards. 2025.'
    },
    {
        icon: '🚫',
        question: 'Don’t Ignore Persistent Lethargy or Loss of Appetite',
        answer: 'Ongoing low energy or poor eating can signal kidney disease, pancreatitis, tick fever, or lymphoma—see a vet for checkup.',
        citation: 'NHP. Early Disease Signs in Pets. 2024.'
    },
    {
        icon: '🧴',
        question: 'Moisturize Dry, Cracked Pet Skin',
        answer: 'Dry and cracked skin raises risk of infections like ringworm; regular grooming and prescription balms help.',
        citation: 'AAHA. Managing Pet Skin Disease. 2024.'
    },
    {
        icon: '🦟',
        question: 'Protect Against Mosquitoes and Parasites',
        answer: 'Mosquito repellent, deworming, and tick/flea prevention lower risk for heartworm, ehrlichiosis, babesiosis, and filariasis.',
        citation: 'NHP. Parasitic Infection Prevention in Pets. 2024.'
    },
    {
        icon: '☔',
        question: 'Dry Off Pets After Rain or Bath',
        answer: 'Moist fur can lead to fungal infections, mange, and hot spots, especially in humid climate. Focus on ears and skin folds.',
        citation: 'AAHA. Skin Infection & Hygiene Recommendations. 2025.'
    },
    {
        icon: '🦵',
        question: 'Prevent Overweight With Controlled Portions',
        answer: 'Obesity leads to arthritis, hip dysplasia, and diabetes especially in senior pets; use measured feeds and monitor snacks.',
        citation: 'VCA. Weight Management for Pets. 2025.'
    },
    {
        icon: '🚲',
        question: 'Use Harnesses and Safe Leashes for Walks',
        answer: 'Proper gear lowers risk of neck injury and fractures from falls or sudden pulls, especially in energetic dogs.',
        citation: 'AAHA. Safe Walking for Dogs. 2025.'
    },
    {
        icon: '🏠',
        question: 'Keep Pet Living Spaces Clean and Safe',
        answer: 'Clean bedding and litter, no sharp objects or chemicals, and safe escape-proof fencing prevent trauma and reduce infections.',
        citation: 'CDC. Pet Home Safety and Zoonosis. 2025.'
    },
    {
        icon: '🧠',
        question: 'Observe for Sudden Behavioral Changes',
        answer: 'Pain, neurological disease, or aggression needs prompt vet attention, as it may signal rabies, anxiety, or hidden injury.',
        citation: 'VCA. Behavioral Health and Vet Care in Pets. 2024.'
    },
    {
        icon: '💊',
        question: 'Only Give Medicines Prescribed by a Vet',
        answer: 'Human drugs can be toxic to pets and cause seizures, organ failure, or death; always follow veterinary guidance.',
        citation: 'AAHA. Medicines and Pet Safety Guide. 2025.'
    },
    {
        icon: '🦠',
        question: 'Prevent Giardiasis by Proper Water and Hygiene',
        answer: 'Giardia parasites cause diarrhea in puppies, kittens, and young pets. Only give boiled/filtered water and keep bowls/living areas sanitized.',
        citation: 'NHP. Giardiasis in Animals. 2025.'
    },
    {
        icon: '💉',
        question: 'Timely Deworming for Puppies and Kittens',
        answer: 'Routine deworming protects against roundworms, hookworms, and tapeworms, improving growth and reducing risk of anemia/infection.',
        citation: 'NHP. Intestinal Worm Infestations. 2025.'
    },
    {
        icon: '🦴',
        question: 'Control Hip Dysplasia Risk in Large Breed Dogs',
        answer: 'Genetic screening and weight management from puppyhood reduce the chance of crippling hip dysplasia in Labradors, German Shepherds, etc.',
        citation: 'AKC. Hip Dysplasia Prevention. 2025.'
    },
    {
        icon: '🐓',
        question: 'Vaccination and Biosecurity for Backyard Poultry',
        answer: 'Protect chickens from Newcastle Disease, fowl pox, coccidiosis by vaccination and keeping flocks isolated from wild birds.',
        citation: 'NHP. Poultry Disease Prevention. 2025.'
    },
    {
        icon: '🥚',
        question: 'Avoid Raw Meat and Eggs in Pet Diet',
        answer: 'Feeding raw animal products increases the risk of Salmonella and E. coli infections in dogs, cats, and humans.',
        citation: 'CDC. Raw Diet and Pet Zoonoses. 2025.'
    },
    {
        icon: '🦜',
        question: 'Monitor for Psittacosis in Pet Birds',
        answer: 'Lethargy, nasal discharge, and diarrhea in parrots/cockatiels may indicate psittacosis—seek avian vet evaluation.',
        citation: 'CDC. Psittacosis in Birds. 2025.'
    },
    {
        icon: '🧫',
        question: 'Regular Ear Cleaning for Lop-Eared Rabbits',
        answer: 'Rabbits with droopy ears are prone to bacterial/fungal ear infections—check and clean ears weekly, seek vet help for swelling or pus.',
        citation: 'RSPCA. Rabbit Ear Care and Disease. 2024.'
    },
    {
        icon: '😾',
        question: 'Watch for Feline Lower Urinary Tract Disease (FLUTD)',
        answer: 'Male cats with straining, frequent urination, or blood in urine risk life-threatening blockage—prompt vet attention is needed.',
        citation: 'VCA. FLUTD in Cats. 2025.'
    },
    {
        icon: '🌿',
        question: "Don't Allow Pets to Chew Toxic Plants",
        answer: 'Many common plants (lilies, oleander, dieffenbachia) can cause kidney failure or poisoning in cats and dogs.',
        citation: 'ASPCA. Pet Toxic and Safe Plants. 2025.'
    },
    {
        icon: '🦢',
        question: 'Prevent Bacterial Shell Disease in Turtles',
        answer: 'Shell rot is common with poor tank hygiene or injuries—clean water and prompt wound care are essential.',
        citation: 'NHP. Turtle Shell Health. 2025.'
    },
    {
        icon: '🏠',
        question: 'Avoid Overcrowding to Prevent Respiratory Infections',
        answer: 'Crowded cages in rabbits, guinea pigs, and birds promote spread of respiratory infections—ensure adequate space and ventilation.',
        citation: 'CDC. Respiratory Disease in Small Pets. 2025.'
    },
    {
        icon: '👃',
        question: 'Protect Brachycephalic Breeds from Heat Stress',
        answer: 'Short-nosed dogs/cats (Pug, Bulldog, Persian) overheat easily—limit outdoor activity in summer, monitor for breathing distress.',
        citation: 'VCA. Heatstroke in Brachycephalic Pets. 2024.'
    },
    {
        icon: '🧩',
        question: 'Socialization to Prevent Anxiety and Aggression',
        answer: 'Early, gentle exposure to people and other animals lowers risk of phobias, aggression, and separation anxiety in dogs and cats.',
        citation: 'AAHA. Socialization for Behavioral Health. 2024.'
    },
    {
        icon: '🧼',
        question: 'Sanitize Litter Boxes Daily',
        answer: 'Dirty litterboxes promote toxoplasmosis and bacterial UTIs in cats—scoop daily and disinfect weekly.',
        citation: 'CDC. Cat Litterbox Hygiene. 2025.'
    },
    {
        icon: '🦷',
        question: "Chew Toys Can Prevent Dental Disease in Rodents",
        answer: 'Rabbits, guinea pigs need hard toys and hay to keep teeth trimmed—overgrown teeth cause pain, abscesses, and starvation.',
        citation: 'RSPCA. Rodent Dental Care. 2024.'
    },
    {
        icon: '🦢',
        question: "Prevent Avian Pox in Caged Birds",
        answer: 'Mosquito nets and regular cleaning of cages reduce risk of avian pox outbreaks in pet birds.',
        citation: 'NHP. Avian Pox. 2025.'
    },
    {
        icon: '🦋',
        question: 'Check for Signs of Mange in Stray Rescues',
        answer: 'Patchy hair loss and intense scratching in rescue dogs is often mange—seek immediate vet therapy to prevent spread and secondary infection.',
        citation: 'NHP. Mange and Stray Animals. 2025.'
    },
    {
        icon: '👁️',
        question: 'Monitor Senior Pets for Cataracts',
        answer: 'Older dogs and cats may develop cloudy eyes, bump into objects, or stop navigating stairs—these are signs of cataracts.',
        citation: 'VCA. Cataracts in Pets. 2024.'
    },
    {
        icon: '🩸',
        question: "Watch for Bleeding and Bruising in Young Dogs (Von Willebrand's Disease)",
        answer: "Unusual bruising, gum/nosebleeds in young purebred dogs (Doberman, Golden) could be inherited bleeding disorder; vet tests are needed.",
        citation: 'AKC. Von Willebrand Disease in Dogs. 2025.'
    },
    {
        icon: '😠',
        question: 'Seek Behavioral Consult for Repetitive Aggression',
        answer: 'Unexplained, repeated aggression may indicate pain, rabies, or neurological issue—veterinary and behavioral assessment is crucial.',
        citation: 'VCA. Aggressive Behaviors in Pets. 2025.'
    }
];

//CHATBOT TAB INITIALIZATION CONSTANTS
// ========================================================================

// ====================
// HEALTH ASSISTANT CHATBOT DATA & LOGIC
// ====================

// Main menu options
// Main menu options
const healthMainMenu = [
        "১. পারভো ভাইরাস",
        "২. ডিসটেম্পার ভাইরাস",
        "৩. রেবিস",
        "৪. কৃমি সমস্যা",
        "৫. চর্মরোগ",
        "৬. কান পাকা",
        "৭. মাড়ির রোগ",
        "৮. মূত্রনালীর সংক্রমণ",
        "৯. চোখের সংক্রমণ",
        "১০. শ্বাসযন্ত্রের সংক্রমণ",
        "১১. হিট স্ট্রোক",
        "১২. অ্যালার্জি"
];

// Sub-menu prompts
const healthPromptMap = {

"fracture": {
    "botPrompt": "ফ্র্যাকচার/হাড় ভাঙা সংক্রান্ত কোন সমস্যা জানতে চান?",
    "options": [
      "হাড়ে তীব্র ব্যথা",
      "ফোলা বা অস্বাভাবিক আকৃতি",
      "চলতে সমস্যা",
      "আঁচড় বা রক্তপাত",
      "পেশী দুর্বলতা"
    ]
  },
  "osteoporosis": {
    "botPrompt": "অস্টিওপোরোসিস/হাড় ক্ষয় সংক্রান্ত কোন সমস্যা জানতে চান?",
    "options": [
      "সহজেই হাড় ভেঙে যাওয়া",
      "পিঠে ব্যথা",
      "উচ্চতা কমে যাওয়া",
      "কমজোরি লাগা",
      "কোমর বা পিঠে বক্রতা"
    ]
  },
  "arthritis": {
    "botPrompt": "গাঁটের ব্যথা/আর্থ্রাইটিস সংক্রান্ত কোন সমস্যা জানতে চান?",
    "options": [
      "হাঁটু বা গাঁটে ব্যথা",
      "ফোলা",
      "শক্ত হয়ে যাওয়া",
      "চলাফেরায় অসুবিধা",
      "গাঁট গরম বা লাল"
    ]
  },
  "osteoarthritis": {
    "botPrompt": "অস্টিওআর্থ্রাইটিস সংক্রান্ত কোন সমস্যা জানতে চান?",
    "options": [
      "জয়েন্টে ব্যথা",
      "জয়েন্ট শক্ত",
      "সকালবেলা বেশি ব্যথা",
      "চলার সময় ব্যথা বাড়ে",
      "জয়েন্ট ফুলে থাকে"
    ]
  },
  "rheumatoid_arthritis": {
    "botPrompt": "রিউমাটয়েড আর্থ্রাইটিস সংক্রান্ত কোন সমস্যা জানতে চান?",
    "options": [
      "ছোট জয়েন্টে ব্যথা",
      "দুইহাত অথবা দুইপায়ে ফোলা",
      "সকালবেলা শক্ত হয়ে যাওয়া",
      "চলাচলে অসুবিধা",
      "জ্বর বা ক্লান্তি"
    ]
  },
  "back_pain": {
    "botPrompt": "ব্যাক পেইন/মেরুদণ্ডের ব্যথা সংক্রান্ত কোন সমস্যা জানতে চান?",
    "options": [
      "কোমরে/মেরুদণ্ডে লাগাতার ব্যথা",
      "চলতে বা উঠতে সমস্যা",
      "পা অবশ বা ইনজুরি",
      "নড়াচড়াতে ব্যথা বেড়ে যায়",
      "পেশীতে টান"
    ]
  },
  "spondylitis": {
    "botPrompt": "স্পন্ডিলাইটিস সংক্রান্ত কোন সমস্যা জানতে চান?",
    "options": [
      "গলা/ঘাড় ব্যথা",
      "হাত অবশ",
      "ঘাড় শক্ত",
      "মাথাব্যথা সাথে ঘাড়ে টান",
      "শুয়ে থাকলে সমস্যা কমে"
    ]
  },
  "scoliosis": {
    "botPrompt": "স্কোলিওসিস সংক্রান্ত কোন সমস্যা জানতে চান?",
    "options": [
      "মেরুদন্ড বেঁকিয়ে যাওয়া",
      "কোমর একদিকে বেশি উঁচু",
      "পিঠে ব্যথা",
      "অনুপযুক্ত ভঙ্গি",
      "শ্বাসকষ্ট (গুরুতর হলে)"
    ]
  },
  "herniated_disk": {
    "botPrompt": "ডিস্ক সমস্যা/হার্নিয়েটেড ডিস্ক সংক্রান্ত কোন সমস্যা জানতে চান?",
    "options": [
      "পিঠ বা কোমরে তীব্র ব্যথা",
      "পায়ে ব্যথা ছড়িয়ে যাওয়া",
      "পা অবশ",
      "উঠতে বসতে সমস্যা",
      "চলাফেরা সীমিত"
    ]
  },
  "muscle_strain": {
    "botPrompt": "মাসল স্ট্রেন/পেশী টান সংক্রান্ত কোন সমস্যা জানতে চান?",
    "options": [
      "পেশীতে হঠাৎ ব্যথা",
      "ফোলা",
      "চলাচলেও অসুবিধা",
      "পেশী দুর্বলতা",
      "ব্যায়ামে সমস্যা"
    ]
  },
  "tendinitis": {
    "botPrompt": "টেন্ডনাইটিস/টেন্ডনের সমস্যা সংক্রান্ত কোন সমস্যা জানতে চান?",
    "options": [
      "টেন্ডনে ব্যথা",
      "চলাচল করলে ব্যথা বাড়ে",
      "ফোলাভাব",
      "স্থানীয় গরম অনুভূতি",
      "টান বা জ্বর"
    ]
  },
  "bone_tumor": {
    "botPrompt": "হাড়ের টিউমার/অস্থি টিউমার সংক্রান্ত কোন সমস্যা জানতে চান?",
    "options": [
      "অস্থি বা হাড়ে ফোলাভাব",
      "হাড়ে অস্বাভাবিক ঘা",
      "পেশী দুর্বলতা",
      "স্থানে ব্যথা",
      "হঠাৎ ভাঙা/ক্র্যাক"
      ]
    }
};

// Map Bengali to English keys
const nextStateMap = {
    "১. পারভো ভাইরাস" : "Parvovirus",
    "২. ডিসটেম্পার ভাইরাস" : "Distemper",
    "৩. রেবিস" : "Rabies",
    "৪. কৃমি সমস্যা" : "Worm Infestation",
    "৫. চর্মরোগ" : "Skin Disease",
    "৬. কান পাকা" : "Ear Infection",
    "৭. মাড়ির রোগ" : "Gingivitis/Periodontal Disease",
    "৮. মূত্রনালীর সংক্রমণ" : "Urinary Tract Infection (UTI)",
    "৯. চোখের সংক্রমণ" : "Eye Infection",
    "১০. শ্বাসযন্ত্রের সংক্রমণ" : "Respiratory Infection",
    "১১. হিট স্ট্রোক" : "Heatstroke",
    "১২. অ্যালার্জি" : "Allergy"
};

// Chatbot state
const chatbotState = {
    awaitingMainMenu: true,
    awaitingSubMenu: false,
    currentSection: null
};


// ====================
// CONVERSATION STATS TRACKING
// ====================

const conversationStats = {
    totalMessages: 0,
    botResponses: 0,
    buttonClicks: 0,
    typedMessages: 0,
    conversationChain: 1
};

/* CHatbot functions taken from standalone chatbot */

/*RAG Integration */

// Trigger RAG with complete Q1-12 context
function triggerFinalRAGWithAllContext() {
    // Combine all Q&A from both Q1-5 and Q6-12
    const allQA = [...appState.q1ToQ5History, ...appState.q6ToQ12History];

    // Format conversation_history as array of strings
    const conversationHistory = allQA.map((qa, index) =>
        `প্রশ্ন ${index + 1}: ${qa.question}\nউত্তর: ${qa.answer}`
    );

    const ragData = {
        query: `${appState.selectedSubcategory} - সম্পূর্ণ তথ্য বিশ্লেষণ`,
        conversation_history: conversationHistory,
        question_stage: 'after_q12'
    };

    console.log('🔍 Calling RAG with COMPLETE Q1-12 context:', ragData);

    // Show loading message
    addChatMessage("assistant", "⏳ আপনার সম্পূর্ণ তথ্য বিশ্লেষণ করছি...");

    fetch('/api/rag-query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ragData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('✅ Final RAG Response with Q1-12 context:', data);

        // Remove loading message
        const chatMessages = document.getElementById('chatMessages');
        if (chatMessages && chatMessages.lastChild) {
            chatMessages.removeChild(chatMessages.lastChild);
        }

        // ✅ SHOW THE RAG RESPONSE
        const responseText = data.answer || data.response || "দুঃখিত, এই মুহূর্তে বিস্তারিত তথ্য পাওয়া যায়নি।";
        addChatMessage("assistant", responseText);

        // ✅ Enable freeform mode for 2 followup questions
        setTimeout(() => {
            appState.followupCount = 0;
            chatbotState.awaitingFreeformQuestion = true;
            addChatMessage("assistant", "আপনার কি আরও কোনো প্রশ্ন আছে? প্রশ্ন টাইপ করুন:", ["না", "প্রথম থেকে শুরু করুন"]);
        }, 1000);
    })
    .catch(error => {
        console.error('❌ Final RAG Error:', error);

        // Remove loading message
        const chatMessages = document.getElementById('chatMessages');
        if (chatMessages && chatMessages.lastChild) {
            chatMessages.removeChild(chatMessages.lastChild);
        }

        addChatMessage("assistant", "দুঃখিত, সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।", ["প্রথম থেকে শুরু করুন"]);
    });
}

// Trigger RAG with all collected context
function triggerRAGWithContext() {
    const ragData = {
        query: appState.selectedSubcategory,
        conversation_history: appState.q1ToQ5History.map(qa =>
            `প্রশ্ন: ${qa.question}\nউত্তর: ${qa.answer}`
        ),
        question_stage: 'initial_with_context',
        health_category: appState.healthCategory
    };

    console.log('🔍 Calling RAG with full context:', ragData);

    fetch('/api/rag-query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ragData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('✅ RAG Response received:', data);

        const responseText = data.answer || data.response || "দুঃখিত, এই মুহূর্তে তথ্য পাওয়া যায়নি।";
        addChatMessage("assistant", responseText);

        // Ask if user wants more information
        // Enable free-form followup questions (max 2)
       // Ask if user wants doctor contact information
        setTimeout(() => {
            addChatMessage("assistant", "আপনি কি ডাক্তারের যোগাযোগের তথ্য চান?", ["হ্যাঁ", "না"]);
            chatbotState.awaitingDoctorContactDecision = true;
        }, 1000);
    })
    .catch(error => {
        console.error('❌ RAG Error:', error);
        addChatMessage("assistant", "দুঃখিত, সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।", ["প্রথম থেকে শুরু করুন"]);
    });
}

function triggerInitialRagResponse() {
    const contextSummary = appState.q1ToQ5History.join('\n');
    const query = `বিভাগ: ${appState.healthCategory}, উপবিভাগ: ${appState.selectedSubcategory}। প্রথম ৫টি উত্তর: ${contextSummary}`;

    fetch('http://localhost:8502/api/rag-query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: query,
            conversation_history: appState.conversationHistory.map(h => `${h.sender}: ${h.text}`),
            question_stage: 'after_q5'
        })
    })
    .then(response => response.json())
    .then(data => {
        const responseText = data.answer + (data.citations || '');
        addMessage("assistant", responseText);

        appState.initialRagDone = true;

        const districtOptions = DISTRICTS.join(", ");
        const contactPrompt = "আপনি কি স্থানীয় স্বাস্থ্য কেন্দ্র ও ডাক্তারদের যোগাযোগের তথ্য জানতে চান?";
        console.log("Printing contactPrompt")
            setTimeout(() => {
                addMessage("assistant", contactPrompt);
                appState.awaitingContactConfirmation = true;
                console.log("Printing setTimeout")
                enableTextInput();
            }, 2000);

       console.log("After contactPrompt")
    })
    .catch(error => {
        console.error('RAG Error:', error);
        addMessage("assistant", "দুঃখিত, সমস্যা হয়েছে। আবার চেষ্টা করুন।");
        setTimeout(() => {
            askNextQuestion();
        }, 2000);
    });
}

function triggerFinalRagResponse() {
    const allContext = appState.q1ToQ5History.concat(appState.q6ToQ12History).join('\n');
    const query = `সম্পূর্ণ মূল্যায়ন - বিভাগ: ${appState.healthCategory}, উপবিভাগ: ${appState.selectedSubcategory}। সকল উত্তর: ${allContext}`;

    fetch('http://localhost:8502/api/rag-query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: query,
            conversation_history: appState.conversationHistory.map(h => `${h.sender}: ${h.text}`),
            question_stage: 'after_q12'
        })
    })
    .then(response => response.json())
    .then(data => {
        const responseText = data.answer + (data.citations || '');
        addMessage("assistant", responseText);

        setTimeout(() => {
            addMessage("assistant", "❓ **আপনার আর কোনো প্রশ্ন আছে? যদি থাকে তাহলে লিখুন:**");
            appState.awaitingFollowupDecision = true;
            enableTextInput();
        }, 2000);
    })
    .catch(error => {
        console.error('RAG Error:', error);
        addMessage("assistant", "দুঃখিত, সমস্যা হয়েছে।");
        setTimeout(() => {
            addMessage("assistant", "❓ **আপনার আর কোনো প্রশ্ন আছে? যদি থাকে তাহলে লিখুন:**");
            appState.awaitingFollowupDecision = true;
            enableTextInput();
        }, 2000);
    });
}

/* CHATBOT END RAG */

/* START CHATBOT Conversational Flow */

// Ask next question
// Ask next question from QUESTION_SEQUENCES
function askNextQuestion() {
    const questions = QUESTION_SEQUENCES[appState.healthCategory];
    if (!questions) {
        console.error('No questions found for category:', appState.healthCategory);
        return;
    }

    const questionNum = appState.askedQuestions.length;

    // Ask first 5 questions only
    if (questionNum < 5) {
        const currentQuestion = questions[questionNum];
        appState.askedQuestions.push(currentQuestion);

        addChatMessage("assistant", `প্রশ্ন ${questionNum + 1}/5: ${currentQuestion}`);

        // Set state to wait for answer
        chatbotState.awaitingQuestionAnswer = true;
        chatbotState.currentQuestionIndex = questionNum;

        console.log(`Asked question ${questionNum + 1}:`, currentQuestion);
    } else {
        // All 5 questions answered, trigger RAG
        triggerRAGWithContext();
    }
}
// Handle user's answer to question
function handleQuestionAnswer(userInput) {
    const questionNum = appState.askedQuestions.length - 1;

    // Determine if this is Q1-5 or Q6-12
    if (questionNum < 5) {
        // Store in Q1-5 history
        appState.q1ToQ5History.push({
            question: appState.askedQuestions[questionNum],
            answer: userInput
        });
        console.log(`Answer ${questionNum + 1} (Q1-5) saved:`, userInput);

        // Ask next question or trigger RAG after Q5
        if (questionNum < 4) {
            setTimeout(() => {
                askNextQuestion();
            }, 500);
        } else {
            // All Q1-5 answered - call RAG with Q1-5 context
            chatbotState.awaitingQuestionAnswer = false;
            setTimeout(() => {
                addChatMessage("assistant", "✅ ধন্যবাদ! আপনার তথ্যের ভিত্তিতে সঠিক পরামর্শ খুঁজছি...");
                triggerRAGWithContext();
            }, 500);
        }
    } else {
        // ✅ Store in Q6-12 history
        appState.q6ToQ12History.push({
            question: appState.askedQuestions[questionNum],
            answer: userInput
        });
        console.log(`Answer ${questionNum + 1} (Q6-12) saved:`, userInput);

        // Ask next question or trigger final RAG after Q12
        if (questionNum < 11) {
            // More Q6-12 questions remaining
            setTimeout(() => {
                // Ask next question from Q6-12
                const questions = QUESTION_SEQUENCES[appState.healthCategory];
                const nextQuestionNum = questionNum + 1;

                if (questions && questions[nextQuestionNum]) {
                    const currentQuestion = questions[nextQuestionNum];
                    appState.askedQuestions.push(currentQuestion);

                    const questionLabel = nextQuestionNum - 4; // Q6=2, Q7=3, etc.
                    addChatMessage("assistant", `প্রশ্ন ${questionLabel}/7: ${currentQuestion}`);

                    chatbotState.awaitingQuestionAnswer = true;
                    chatbotState.currentQuestionIndex = nextQuestionNum;

                    console.log(`Asked followup question ${questionLabel}:`, currentQuestion);
                }
            }, 500);
        } else {
            // ✅ All Q6-12 answered - call RAG with COMPLETE Q1-12 context
            chatbotState.awaitingQuestionAnswer = false;
            setTimeout(() => {
                addChatMessage("assistant", "✅ সব প্রশ্নের উত্তর পেয়েছি! আরও বিস্তারিত পরামর্শ খুঁজছি...");
                triggerFinalRAGWithAllContext();  // ✅ This calls RAG with Q1-12
            }, 500);
        }
    }
}

// Handle free-form followup questions with full Q1-12 context
function handleFreeformFollowupQuestion(userQuestion) {
    // Increment followup counter
    appState.followupCount++;

    console.log(`Followup question ${appState.followupCount}/2:`, userQuestion);

    // Combine all previous Q&A as context
    const allQA = [...appState.q1ToQ5History, ...appState.q6ToQ12History];

    const conversationHistory = allQA.map((qa, index) =>
        `প্রশ্ন ${index + 1}: ${qa.question}\nউত্তর: ${qa.answer}`
    );

    const ragData = {
        query: userQuestion,
        conversation_history: conversationHistory,
        question_stage: 'freeform_followup'
    };

    console.log('🔍 Freeform followup question with Q1-12 context:', ragData);

    // Show loading
    addChatMessage("assistant", "⏳ আপনার প্রশ্নের উত্তর খুঁজছি...");

    fetch('/api/rag-query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ragData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('✅ Followup RAG Response:', data);

        // Remove loading message
        const chatMessages = document.getElementById('chatMessages');
        if (chatMessages && chatMessages.lastChild) {
            chatMessages.removeChild(chatMessages.lastChild);
        }

        const responseText = data.answer || data.response || "দুঃখিত, উত্তর পাওয়া যায়নি।";
        addChatMessage("assistant", responseText);

        // Check if this was the 2nd followup question
        if (appState.followupCount >= 2) {
            // ✅ After 2 followups, thank and reset
            setTimeout(() => {
                addChatMessage("assistant", "ধন্যবাদ! আশা করি আমি আপনাকে সাহায্য করতে পেরেছি। 🌸");
                setTimeout(() => {
                    addChatMessage("assistant", "নতুন কথোপকথন শুরু করতে চাইলে নিচের বাটনে ক্লিক করুন:", ["প্রথম থেকে শুরু করুন"]);
                }, 1000);
            }, 1000);
        } else {
            // ✅ Still have followups remaining
            setTimeout(() => {
                const remaining = 2 - appState.followupCount;
                addChatMessage("assistant", `আরও প্রশ্ন করতে পারেন (${remaining} টি বাকি):`, ["না", "প্রথম থেকে শুরু করুন"]);
                chatbotState.awaitingFreeformQuestion = true;
            }, 1000);
        }
    })
    .catch(error => {
        console.error('❌ Followup RAG Error:', error);

        // Remove loading message
        const chatMessages = document.getElementById('chatMessages');
        if (chatMessages && chatMessages.lastChild) {
            chatMessages.removeChild(chatMessages.lastChild);
        }

        addChatMessage("assistant", "দুঃখিত, সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।", ["প্রথম থেকে শুরু করুন"]);
    });
}

// Handle text input (when user types and presses Enter)
function handleTextInput(userInput) {
    if (!userInput || !userInput.trim()) return;

    addChatMessage("user", userInput);

    if (chatbotState.awaitingQuestionAnswer) {
        // User is answering one of the 5 questions
        handleQuestionAnswer(userInput);
    } else if (chatbotState.awaitingFollowup) {
        // User wants to ask more questions
        chatbotState.awaitingFollowup = false;
        // Treat as free-form question to RAG
        triggerRAGWithFreeformQuestion(userInput);
    }
    // ... other conditions
}

function askFollowupQuestion() {
// Reset state to general information mode
    appState.currentState = 'collecting_info';
    appState.awaitingFollowupDecision = true;

    const followupPrompt = "আপনার কি অন্য কোনো প্রশ্ন বা জিজ্ঞাসা আছে? অথবা অন্য কোনো জেলার তথ্য জানতে চান?";

    // Display the question
    addMessage("assistant", followupPrompt);

    // Enable input and prepare for the user's Yes/No response
    enableTextInput();
}

function handleFollowupDecision(userInput) {
    const wantsFollowup = detectYesNo(userInput);
    appState.awaitingFollowupDecision = false;

    if (wantsFollowup) {
        addMessage("assistant", "ঠিক আছে, আপনি আপনার প্রশ্নটি জিজ্ঞাসা করতে পারেন।");
        appState.currentState = 'collecting_info';
        // The conversation simply continues from here.
    } else {
        addMessage("assistant", "আপনাকে সাহায্য করতে পেরে খুশি হলাম। ধন্যবাদ।");
        // End the conversation / start the countdown timer
        setTimeout(resetConversation, 5000);
    }
    enableTextInput();
}

function handleFollowupQuestion(userInput) {
    appState.followupCount++;

    fetch('http://localhost:8502/api/rag-query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: userInput,
            conversation_history: appState.conversationHistory.map(h => `${h.sender}: ${h.text}`),
            question_stage: 'followup'
        })
    })
    .then(response => response.json())
    .then(data => {
        const responseText = data.answer + (data.citations || '');
        addMessage("assistant", responseText);

        if (appState.followupCount < 2) {
            setTimeout(() => {
                addMessage("assistant", "✅ আপনি আরও একটি প্রশ্ন করতে পারেন। আপনার প্রশ্ন লিখুন:");
                enableTextInput();
            }, 2000);
        } else {
            setTimeout(() => {
                addMessage("assistant", "ধন্যবাদ! আপনার সুস্বাস্থ্য কামনা করি। 🌸\n\n*(৯০ সেকেন্ডের মধ্যে নতুন কথোপকথন শুরু হবে)*");
                appState.currentState = 'ready_to_reset';
            }, 2000);
        }

        updateStats();
    })
    .catch(error => {
        console.error('RAG Error:', error);
        addMessage("assistant", "দুঃখিত, সমস্যা হয়েছে।");

        if (appState.followupCount < 2) {
            setTimeout(() => {
                enableTextInput();
            }, 1500);
        } else {
            appState.currentState = 'ready_to_reset';
        }
    });
}

function detectYesNo(userInput) {
    const affirmative = ["হ্যাঁ", "হা", "yes", "আছে", "চাই", "জানতে", "হাঁ", "y", "হ্যা"];
    const negative = ["না", "no", "নেই", "নাই", "n"];
    // Lowercase and remove punctuation/spaces for comparison
    const sanitized = userInput.trim().replace(/[।.!?]/g, "").toLowerCase();

    // 🏆 FIX: Add a check for EXACT match first for common words
    if (affirmative.includes(sanitized)) {
        return true;
    }
    if (negative.includes(sanitized)) {
        return false;
    }

    // Existing startsWith logic (for phrases like 'হ্যাঁ চাই')
    if (negative.some(neg => sanitized.startsWith(neg))) {
        return false;
    }
    if (affirmative.some(pos => sanitized.startsWith(pos))) {
        return true;
    }

    // Default: return false
    return false;
}
/* END CHATBOT Conversational Flow */


/*Msg Handling Chatbot functions */

// Show doctor contacts for selected district
function showDoctorContacts(district) {
    console.log('Fetching doctors for district:', district);

    // Get doctor info from WOMENSHEALTHRESOURCES
    const districtData = CANCER_HEALTH_RESOURCES[district];
    console.log('Doctor data:', districtData);

    if (!districtData) {
        addChatMessage("assistant", `[দুঃখিত], ${district} [জেলার জন্য এই মুহূর্তে ডাক্তারদের তথ্য পাওয়া যাচ্ছে না।]`);
        return;
    }

    // Format doctor information
    let doctorInfo = `📍 ${district} [জেলার ডাক্তারদের তথ্য:]\n\n`;

    if (districtData.doctors && districtData.doctors.length > 0) {
        districtData.doctors.forEach((doc, index) => {
            doctorInfo += `${index + 1}. ${doc.name}\n`;
            doctorInfo += `   📞 [ফোন]: ${doc.phone}\n\n`;
        });
    }

    // Show centers if available
    if (districtData.centers && districtData.centers.length > 0) {
        doctorInfo += '\n🏥 [স্বাস্থ্যকেন্দ্র:]\n\n';
        districtData.centers.forEach((center, index) => {
            doctorInfo += `${index + 1}. ${center.name}\n`;
            doctorInfo += `   📞 [ফোন]: ${center.phone}\n`;
            if (center.address) {
                doctorInfo += `   📍 [ঠিকানা]: ${center.address}\n`;
            }
            doctorInfo += '\n';
        });
    }

    addChatMessage("assistant", doctorInfo);

    // Ask if user wants more questions (Q6-12)
    setTimeout(() => {
        addChatMessage("assistant", "আপনি কি আরও কিছু প্রশ্ন করতে চান?", ["হ্যাঁ", "না"]);
        chatbotState.awaitingFollowup = true;
    }, 1000);
}

// Add message to chat
function addMessage(sender, text, resources = null, options = null) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;

    let bubbleContent = text.replace(/\n/g, '<br>');

    if (resources) {
        bubbleContent += resources;
    }

    let optionsHtml = '';
    if (options && options.length > 0) {
        optionsHtml = `
            <div class="options-grid">
                ${options.map((option, index) => `
                    <button class="option-btn" onclick="handleOptionClick('${option.replace(/'/g, "\\'")}', ${index})">
                        ${option}
                    </button>
                `).join('')}
            </div>
        `;
    }

    messageDiv.innerHTML = `
        <div class="message-bubble">${bubbleContent}</div>
        ${optionsHtml}
    `;

    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    appState.conversationHistory.push({
        sender: sender,
        text: text,
        timestamp: new Date().toISOString()
    });
}

// Send message
function sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value.trim();

    if (!message) return;

    addMessage("user", message);
    input.value = '';
    disableTextInput();

    if (appState.awaitingContactConfirmation) {
        console.log("Going for handleconfirmation")
        handleContactConfirmation(message);
    }
    else if (appState.awaitingDistrictSelection) {
        console.log("Going in")
        handleDistrictSelection(message);
    }
    else if (appState.awaitingFollowupDecision) {
        handleFollowupDecision(message);
    }
    else if (appState.currentState === 'followup_question') {
        handleFollowupQuestion(message);
    }
    else if (appState.currentState === 'collecting_info') {
        handleUserInput(message);
    }
}

// Handle user input (Q1-Q12)
function handleUserInput(userInput) {
    const questionNum = appState.askedQuestions.length;
    const currentQA = `Q${questionNum}: ${appState.askedQuestions[questionNum - 1]}\nA${questionNum}: ${userInput}`;

    if (questionNum <= 5) {
        appState.q1ToQ5History.push(currentQA);
    } else {
        appState.q6ToQ12History.push(currentQA);
    }

    if (questionNum === 5 && !appState.initialRagDone) {
        setTimeout(() => {
            addMessage("assistant", "আপনার প্রথম ৫টি উত্তরের ভিত্তিতে বিশ্লেষণ করছি...");
            triggerInitialRagResponse();
        }, 1000);
    }
    else if (questionNum >= 12) {
        setTimeout(() => {
            addMessage("assistant", "সব প্রশ্নের উত্তর সংগ্রহ সম্পূর্ণ! চূড়ান্ত পরামর্শ ও বিশ্লেষণ করছি...");
            triggerFinalRagResponse();
        }, 1000);
    }
    else {
        setTimeout(() => {
            askNextQuestion();
        }, 1000);
    }
}


// Handle option button click
function handleOptionClick(option) {
    console.log('Option clicked:', option);

    // Add user's selection to chat
    addChatMessage("user", option);
    // ✅ CHECK FOR RESET FIRST (highest priority)
    if (option === "প্রথম থেকে শুরু করুন") {
        resetChatbot();
        return;  // ✅ IMPORTANT: Return immediately
    }

    if (chatbotState.awaitingMainMenu) {
        handleMainMenuSelection(option);
    } else if (chatbotState.awaitingSubMenu) {
        handleSubMenuSelection(option);
    } else if (chatbotState.awaitingQuestionAnswer) {
        handleQuestionAnswer(option);
    } else if (chatbotState.awaitingDoctorContactDecision) {
        // ✅ NEW: Handle doctor contact decision after Q5
        chatbotState.awaitingDoctorContactDecision = false;

        if (option === "হ্যাঁ") {
            // Show district selection
            addChatMessage("assistant", "দয়া করে আপনার জেলা নির্বাচন করুন:", DISTRICT_LIST);
            chatbotState.awaitingDistrictSelection = true;
        } else if (option === "না") {
            // Skip doctor contact, ask about Q6-12
            setTimeout(() => {
                addChatMessage("assistant", "আপনি কি আরও কিছু প্রশ্ন করতে চান?", ["হ্যাঁ", "না"]);
                chatbotState.awaitingFollowup = true;
            }, 500);
        }
    } else if (chatbotState.awaitingDistrictSelection) {
        // ✅ NEW: Handle district selection
        chatbotState.awaitingDistrictSelection = false;
        appState.selectedDistrict = option;
        showDoctorContacts(option);
    } else if (chatbotState.awaitingFollowup) {
    // Handle followup decision (Q6-12 or exit)
    chatbotState.awaitingFollowup = false;

    if (option === "হ্যাঁ") {
            // ✅ FIXED: Start Q6-12 sequence
            setTimeout(() => {
                addChatMessage("assistant", "ঠিক আছে! আমি আরও কয়েকটি প্রশ্ন করব আপনাকে আরও ভালভাবে সাহায্য করার জন্য।");
                setTimeout(() => {
                    // Start from Q6 (index 5)
                    const questionNum = 5;

                    // ✅ ADD VALIDATION AND LOGGING
                    console.log("Starting Q6-12 with healthCategory:", appState.healthCategory);

                    const questions = QUESTION_SEQUENCES[appState.healthCategory];

                    if (!questions) {
                        console.error("❌ No questions found for category:", appState.healthCategory);
                        console.log("Available categories:", Object.keys(QUESTION_SEQUENCES));
                        addChatMessage("assistant", "দুঃখিত, প্রশ্ন লোড করতে সমস্যা হয়েছে। দয়া করে আবার শুরু করুন।", ["প্রথম থেকে শুরু করুন"]);
                        return;
                    }

                    if (!questions[questionNum]) {
                        console.error("❌ Question not found at index:", questionNum);
                        console.log("Total questions available:", questions.length);
                        addChatMessage("assistant", "দুঃখিত, প্রশ্ন পাওয়া যায়নি।", ["প্রথম থেকে শুরু করুন"]);
                        return;
                    }

                    const currentQuestion = questions[questionNum];
                    appState.askedQuestions.push(currentQuestion);

                    const questionLabel = questionNum - 4;  // Q6 = 2
                    addChatMessage("assistant", `প্রশ্ন ${questionLabel}/7: ${currentQuestion}`);

                    chatbotState.awaitingQuestionAnswer = true;
                    chatbotState.currentQuestionIndex = questionNum;

                    console.log(`✅ Starting Q6-12 sequence - Question ${questionLabel}:`, currentQuestion);
                }, 1000);
            }, 500);
         }

    }
}
/* END CHatbot Message Handlers */

/*UI Controls Chatbot */

function disableTextInput() {
            document.getElementById('messageInput').disabled = true;
            document.getElementById('sendBtn').disabled = true;
        }

// Enable/disable text input
function enableTextInput() {
    document.getElementById('messageInput').disabled = false;
    document.getElementById('sendBtn').disabled = false;
    document.getElementById('messageInput').focus();
}


function startCountdown() {
        if (appState.countdownTimer) {
            clearInterval(appState.countdownTimer);
        }

        appState.countdownSeconds = 200;

        appState.countdownTimer = setInterval(() => {
            const minutes = Math.floor(appState.countdownSeconds / 60);
            const seconds = appState.countdownSeconds % 60;

            document.getElementById('countdownTimer').textContent =
                `${minutes}:${seconds.toString().padStart(2, '0')}`;

            appState.countdownSeconds--;

            if (appState.countdownSeconds < 0) {
                resetConversation();
            }
        }, 1000);
 }


/* END CHATBOT UI CONTROLS */

/*CORE CHATBOT FUNCTIONS */

function updateStats() {
    document.getElementById('questionsAsked').textContent = `${appState.askedQuestions.length}/12`;
    document.getElementById('followUpCount').textContent = `${appState.followupCount}/2`;
    document.getElementById('currentCategory').textContent = appState.healthCategory || 'প্রারম্ভিক';
    document.getElementById('currentState').textContent = appState.currentState;
}

 // Initialize chatbot
function initializeChatbot() {
    addMessage("assistant", HEALTH_CATEGORIES.start.botPrompt, null, HEALTH_CATEGORIES.start.options);
    startCountdown();
    updateStats();
}


  function resetConversation() {
    if (appState.countdownTimer) {
        clearInterval(appState.countdownTimer);
    }

    // Reset state
    appState.currentState = 'start';
    appState.healthCategory = null;
    appState.selectedSubcategory = null;
    appState.selectedDistrict = null;
    appState.askedQuestions = [];
    appState.q1ToQ5History = [];
    appState.q6ToQ12History = [];
    appState.conversationHistory = [];
    appState.awaitingContactConfirmation = false;
    appState.awaitingDistrictSelection = false;
    appState.initialRagDone = false;
    appState.awaitingFollowupDecision = false;
    appState.followupCount = 0;
    appState.countdownSeconds = 200;

    // Clear chat
    document.getElementById('chatMessages').innerHTML = '';
    document.getElementById('messageInput').value = '';
    disableTextInput();

    // Restart
    initializeChatbot();
}

/*END CORE CHATBOT FUNCTIONS */


function handleFollowupDecision(userInput) {
    const wantsFollowup = detectYesNo(userInput);
    appState.awaitingFollowupDecision = false;

    if (wantsFollowup) {
        addMessage("assistant", "ঠিক আছে, আপনি আপনার প্রশ্নটি জিজ্ঞাসা করতে পারেন।");
        appState.currentState = 'collecting_info';
        // The conversation simply continues from here.
    } else {
        addMessage("assistant", "আপনাকে সাহায্য করতে পেরে খুশি হলাম। ধন্যবাদ।");
        // End the conversation / start the countdown timer
        setTimeout(resetConversation, 5000);
    }
    enableTextInput();
}


/* START CHATBOT District & Contact */


function handleDistrictSelection(districtName) {

        console.log("handleDistrictSelection")
        // 1. Clean up state and UI
        appState.awaitingDistrictSelection = false;
        appState.selectedDistrict = districtName;
        disableTextInput();

        // 🚨 Critical Log: If this fails, the error is inside 'addMessage' itself.
        console.log("Dis added")

        // 3. Add a loading message
        const loadingMessageId = Date.now();
        addMessage("assistant", "যোগাযোগের তথ্য খুঁজছি, অনুগ্রহ করে অপেক্ষা করুন...", true, null, loadingMessageId);
        console.log("msg added")
        // 🛑 CRITICAL FIX: Format the conversation history into a list of strings
        const formattedConversationHistory = (appState.conversationHistory || []).map(entry => {
            // Format each object as a single string: "sender: text"
            return `${entry.sender}: ${entry.text}`;
        });

        const payload = {
            prompt: `Find health center contacts for ${districtName}.`,
            q1ToQ5History: appState.q1ToQ5History || [],
            q6ToQ12History: appState.q6ToQ12History || [],
            // 🛑 USE THE FORMATTED HISTORY HERE
            conversationHistory: formattedConversationHistory,
            district_selection: districtName
        };
        // 🛑 ADD THIS CRITICAL LOG LINE:
        console.log("Sending payload:", JSON.stringify(payload));

        // 4. Send a request to the backend
        fetch('http://localhost:8502/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // 🛑 ENSURE THIS BODY MATCHES QueryData EXACTLY 🛑
            body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(data => {
            // Remove the loading message
            const messages = document.getElementById('chatMessages');
            messages.removeChild(messages.lastElementChild);

            // 6. Display the result from the backend
            if (data.answer) {
                addMessage("assistant", data.answer);
            } else {
                addMessage("assistant", "দুঃখিত, এই জেলার জন্য যোগাযোগের তথ্য খুঁজে পাওয়া যায়নি।");
            }

            // 7. Re-enable input or continue conversation
            // The conversation should now transition back to the main flow or ask for follow-up
            appState.currentState = 'collecting_info'; // Return to general info collection state
            enableTextInput(); // Ensure input is enabled

            // 🛑 START OF NEW LOGIC TO RESUME QUESTIONS 🛑
            const nextQuestionNum = appState.askedQuestions.length + 1;
            if (appState.initialRagDone && nextQuestionNum <= 12) {
                // If we've done Q1-Q5 and have more questions to ask (Q6-Q12)
                setTimeout(() => {
                    askNextQuestion();
                }, 1000);
            } else {
                // If Q1-Q12 is complete, or if the user asked for contacts before the RAG flow started
                setTimeout(() => {
                    askFollowupQuestion(); // Ask if they need anything else
                }, 1000);
            }
            // 🛑 END OF NEW LOGIC 🛑
        })
        .catch(error => {
            console.error('Error fetching district contacts:', error);
            // Remove loading message and display error
            const messages = document.getElementById('chatMessages');
            messages.removeChild(messages.lastElementChild);
            addMessage("assistant", "যোগাযোগের তথ্য পেতে ব্যর্থ: নেটওয়ার্ক ত্রুটি বা সার্ভার সমস্যা।");
        });
    }


function handleContactConfirmation(userInput) {

        const wantsContacts = detectYesNo(userInput);
        console.log(wantsContacts)
        if (wantsContacts) {
            // Use grid/option buttons for districts
            const districtListText = "আপনার জেলা নির্বাচন করুন: \n" + DISTRICTS.map(d => `• ${d}`).join('\n');
            appState.awaitingContactConfirmation = false;
            addMessage("assistant", districtListText); // Now sends a block of text
            appState.awaitingDistrictSelection = true;
            enableTextInput();

        } else {
            setTimeout(() => {
                askNextQuestion();
            }, 500);
        }
    }

    /* END CHATBOT District & Contact */


// Update stats display
function updateConversationStats() {
    document.getElementById('totalMessages').textContent = conversationStats.totalMessages;
    document.getElementById('botResponses').textContent = conversationStats.botResponses;
    document.getElementById('buttonClicks').textContent = conversationStats.buttonClicks;
    document.getElementById('typedMessages').textContent = conversationStats.typedMessages;
    document.getElementById('conversationChain').textContent = conversationStats.conversationChain;
}

// Track button click
function trackButtonClick() {
    conversationStats.buttonClicks++;
    conversationStats.totalMessages++;
    updateConversationStats();
}

// Track typed message
function trackTypedMessage() {
    conversationStats.typedMessages++;
    conversationStats.totalMessages++;
    updateConversationStats();
}

// Track bot response
function trackBotResponse() {
    conversationStats.botResponses++;
    updateConversationStats();
}

// Increment conversation chain
function incrementChain() {
    conversationStats.conversationChain++;
    updateConversationStats();
}

//CHATBBOT FUNCTIONS


// Handle main menu selection
function handleSubMenuSelection(userInput) {
    chatbotState.awaitingSubMenu = false;

    // Store selected subcategory
    appState.selectedSubcategory = userInput;
    appState.healthCategory = chatbotState.currentSection;
    appState.askedQuestions = [];
    appState.q1ToQ5History = [];

    // Show acknowledgment
    setTimeout(() => {
        addChatMessage("assistant", `ধন্যবাদ! "${userInput}" সম্পর্কে আপনাকে আরও ভালভাবে সাহায্য করার জন্য আমি ৫টি প্রশ্ন করব।`);

        // Start asking questions after a short delay
        setTimeout(() => {
            askNextQuestion();
        }, 1000);
    }, 500);
}


// Reset chatbot and stats
function resetChatbot() {
    // Reset stats
    conversationStats.totalMessages = 0;
    conversationStats.botResponses = 0;
    conversationStats.buttonClicks = 0;
    conversationStats.typedMessages = 0;
    conversationStats.conversationChain = 1;
    updateConversationStats();

    // Reinitialize chatbot
    initializeHealthAssistant();
}

// ====================
// END CHATBOT FUNCTIONS (ADD AFTER YOUR DATA STRUCTURES)
// ====================


// ====================
// CHATBOT TAB INITIALIZATION
// ====================



// Add message to chat
// Modify existing addChatMessage to track stats
function addChatMessage(sender, text, options = null) {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) {
        console.error('❌ chatMessages container not found!');
        return;
    }

    // EXTENSIVE DEBUG LOGGING
    console.log('═══════════════════════════════════════════════════');
    console.log('📨 addChatMessage called');
    console.log('Sender:', sender);
    console.log('Text:', text);
    console.log('Options:', options);
    console.log('Options type:', typeof options);
    console.log('Is Array?', Array.isArray(options));
    console.log('Options length:', options ? options.length : 'N/A');
    if (options) {
        console.log('Options content:', JSON.stringify(options, null, 2));
    }
    console.log('═══════════════════════════════════════════════════');

    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}-message`;
    messageDiv.style.cssText = 'margin-bottom: 1rem; padding: 1rem; border-radius: var(--radius-md); max-width: 85%; animation: fadeIn 0.3s ease;' +
                               (sender === 'user' ? 'background: var(--color-primary); color: white; margin-left: auto; border-bottom-right-radius: 4px;' : 'background: var(--color-surface); color: var(--color-text); border: 1px solid var(--color-border); margin-right: auto; border-bottom-left-radius: 4px;');

    const textDiv = document.createElement('div');
    textDiv.className = 'message-text';
    textDiv.textContent = text;
    textDiv.style.cssText = 'line-height: 1.5; margin-bottom: 0;';
    messageDiv.appendChild(textDiv);

    // Track bot response
    if (sender === 'assistant' || sender === 'bot') {
        if (typeof trackBotResponse === 'function') {
            trackBotResponse();
        }
    }

    // CRITICAL: Check if options is actually an array
    if (options && Array.isArray(options) && options.length > 0) {
        console.log('✅ Creating buttons for', options.length, 'options');

        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'chat-options';
        optionsDiv.style.cssText = 'display: grid; grid-template-columns: 1fr; gap: 0.5rem; margin-top: 1rem;';

        options.forEach((option, index) => {
            console.log(`  Creating button ${index + 1}:`, option);

            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = option;
            btn.style.cssText = 'background: var(--color-secondary); padding: 0.75rem 1rem; border: 1px solid var(--color-border); border-radius: var(--radius-sm); cursor: pointer; text-align: left; transition: all 0.2s ease; font-size: 1rem; font-weight: 500; color: var(--color-text);';

            btn.addEventListener('click', () => {
                console.log('🔘 Button clicked:', option);
                if (typeof trackButtonClick === 'function') {
                    trackButtonClick();
                }
                handleOptionClick(option);
            });

            btn.addEventListener('mouseenter', () => {
                btn.style.background = 'var(--color-primary)';
                btn.style.color = 'white';
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.background = 'var(--color-secondary)';
                btn.style.color = 'var(--color-text)';
            });

            optionsDiv.appendChild(btn);
        });

        messageDiv.appendChild(optionsDiv);
        console.log('✅ All buttons appended to message');
    } else {
        console.log('❌ No buttons created');
        console.log('  Reason: options is', typeof options, options);
    }

    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    console.log('✅ Message added to chat');
}

// Initialize chatbot when tab loads
function initializeHealthAssistant() {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) {
        console.error('Chat messages container not found');
        return;
    }

    // Clear previous messages
    chatMessages.innerHTML = '';

    // Reset state
    chatbotState.awaitingMainMenu = true;
    chatbotState.awaitingSubMenu = false;
    chatbotState.currentSection = null;

    // Add welcome message with options
    addChatMessage("assistant", "আপনার কোন বিষয়ে সাহায্য দরকার? নিচের অপশন থেকে নির্বাচন করুন:", healthMainMenu);
}

// PET COMMUNITY GROUP

// Ensure formData is initialized.
if (typeof formData === "undefined") {
  var formData = {};
}
// Get veterType and community consent from form
formData.veterType = document.getElementById('veterType')?.value || "";
formData.joinCommunity = document.getElementById('joinCommunity')?.checked || false;

// Get veterType (disease) and community consent from form
const veterType = document.getElementById('veterType')?.value || "";
const joinCommunity = document.getElementById('joinCommunity')?.checked || false;
formData.veterType = veterType;
formData.joinCommunity = joinCommunity;

// Data for vetero community groups
const VETERO_COMMUNITY_GROUPS = {

     fracture: {
        name: "Bone Fracture Support Network",
        members: 85,
        description: "Share recovery stories, tips, ask questions and connect with others healing from fractures.",
        color: "#1976d2"
      },
      osteoporosis: {
        name: "Osteoporosis Awareness Group",
        members: 120,
        description: "Daily bone health tips, support, expert Q&A and wellness meetups.",
        color: "#fbc02d"
      },
      arthritis: {
        name: "Arthritis Warriors Community",
        members: 140,
        description: "Discuss pain management, share mobility strategies and join live webinars.",
        color: "#388e3c"
      },
      spondylitis: {
        name: "Spondylitis Support Forum",
        members: 65,
        description: "Talk to others, share therapies, and discover latest treatments.",
        color: "#8e24aa"
      },
      muscle_strain: {
        name: "Muscle Strain Recovery Circle",
        members: 50,
        description: "Connect to physiotherapists, share exercises, learn best practices for healing strains.",
        color: "#0288d1"
      },
      osteoarthritis: {
        name: "Osteoarthritis Pet Parent Group",
        members: 105,
        description: "Exchange management ideas, learn joint supplements, share home care tips for chronic pain.",
        color: "#ff7043"
      },
      hip_dysplasia: {
        name: "Hip Dysplasia Canine Network",
        members: 93,
        description: "Dedicated to dog owners coping with hip dysplasia. Share stories, surgery info, exercise plans.",
        color: "#7b1fa2"
      },
      elbow_dysplasia: {
        name: "Elbow Dysplasia Supporters Club",
        members: 55,
        description: "Community for owners managing this joint ailment in large breed dogs. Advice and support.",
        color: "#0097a7"
      },
      patellar_luxation: {
        name: "Patellar Luxation Help Group",
        members: 42,
        description: "Find practical info, vet Q&A and recovery strategies for small breeds with patella issues.",
        color: "#f06292"
      },
      lameness: {
        name: "Lameness & Limp Care Forum",
        members: 73,
        description: "Owners discuss sudden or chronic limp causes, vet treatments, and rehabilitation plans.",
        color: "#388e3c"
      },
      joint_replacement: {
        name: "Joint Replacement Journey",
        members: 44,
        description: "People share experiences from orthopedic surgeries, post-op tips and mobility exercises.",
        color: "#d32f2f"
      },
      intervertebral_disk_disease: {
        name: "IVDD & Spinal Support Community",
        members: 51,
        description: "For pet parents dealing with disk disease, surgery options, crate rest, and recovery.",
        color: "#0288d1"
      },
      spondylosis: {
        name: "Spondylosis Animal Owners Forum",
        members: 39,
        description: "Join owners navigating chronic spinal pain; share management tips and supportive therapies.",
        color: "#6d4c41"
      },
      skin_allergy: {
        name: "Pet Skin Allergy Community",
        members: 98,
        description: "Help fellow owners tackle itching, rashes, allergies and parasite control in pets.",
        color: "#43a047"
      },
      dental_disease: {
        name: "Pet Dental Health Chat",
        members: 86,
        description: "Oral hygiene, dental diet tips, toothache and cleaning advice for cats & dogs.",
        color: "#ffb300"
      },
      obesity: {
        name: "Healthy Weight Pet Circle",
        members: 112,
        description: "Nutrition advice, weight loss challenges, exercise plans and motivational stories for overweight pets.",
        color: "#8bc34a"
      },
      heart_disease: {
        name: "Pet Heart Care Advocates",
        members: 58,
        description: "Group for parents of pets with murmurs or cardiac issues, share medication, diet and symptoms watch.",
        color: "#c2185b"
      },
      kidney_disease: {
        name: "Renal Support Pet Network",
        members: 61,
        description: "Connect over kidney disease management, dialysis options and nutritional support for cats/dogs.",
        color: "#1976d2"
      },
      cancer: {
        name: "Pet Cancer Awareness Peer Group",
        members: 70,
        description: "Share cancer care journeys, latest treatment options, support and hope for affected pets.",
        color: "#fb8c00"
      },
      behavioral: {
        name: "Pet Behavior & Anxiety Forum",
        members: 127,
        description: "Behavior modification, anxiety relief, training tips and success stories for troubled pets.",
        color: "#455a64"
      }
  // Add additional conditions here
};

// Display community groups based on selected Pet condition
function showRecommendedGroups(userVeterType) {
  const section = document.getElementById("patientGroupsSection");
  if (!section) return;

  section.innerHTML = `<h3 style="color: var(--color-primary); margin-bottom: 1rem;">Pet Support Communities</h3>`;
  let groupList = "";

  Object.entries(VETERO_COMMUNITY_GROUPS).forEach(([key, group]) => {
    if (key === userVeterType || userVeterType === "") {
      groupList += `
        <div class="group-card" style="border-left: 4px solid ${group.color}; margin-bottom: 1rem; padding: 1rem;">
          <b>${group.name}</b><br>
          <span>Active Members: ${group.members}</span><br>
          <span>${group.description}</span><br>
          <button type="button" class="connect-btn" style="margin-top: 0.8rem;">Join Group</button>
        </div>
      `;
    }
  });

  section.innerHTML += `<div id="groupsList">${groupList}</div>`;
}

// Call after registration/success
if (formData.joinCommunity && formData.veterType) {
  showRecommendedGroups(formData.veterType);
} else if (formData.joinCommunity) {
  showRecommendedGroups(""); // Show all groups
}

// Use only once per page load—after DOM is ready and 'patientGroupsSection' exists
const patientGroupsSection = document.getElementById("patientGroupsSection");
if (patientGroupsSection) {
  patientGroupsSection.addEventListener("click", function(e) {
    if (e.target.classList.contains("connect-btn")) {
      alert("You have joined the group! Check your inbox/community page for next steps.");
      // TODO: Send join request to backend here if needed.
    }
  });
}

// Consent and privacy notification
if (formData.joinCommunity) {
  // Show consent message about profile visibility in the ortho community group
  // e.g. document.getElementById("consentNotice").style.display = "block";
}
// END PET COMMUNITY GROUP


// Initialize when DOM is ready
// Handle tab switching for all sections
document.addEventListener('DOMContentLoaded', function() {
    const navTabs = document.querySelectorAll('.nav-tab');
    const sections = document.querySelectorAll('.section');

    navTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');

            // Remove active class from all tabs
            navTabs.forEach(t => t.classList.remove('active'));

            // Add active class to clicked tab
            this.classList.add('active');

            // Hide all sections
            sections.forEach(section => {
                section.style.display = 'none';
            });

            // Show target section
            const target = document.getElementById(targetSection);
            if (target) {
                target.style.display = 'block';

                // Special handling for chatbot initialization
                if (targetSection === 'chatbot') {
                    setTimeout(() => {
                        if (typeof initializeHealthAssistant === 'function') {
                            initializeHealthAssistant();
                        }
                    }, 100);
                }

                // Special handling for prevention section
                if (targetSection === 'prevention') {
                    setTimeout(() => {
                        if (typeof loadPreventionData === 'function') {
                            loadPreventionData();
                        }
                    }, 100);
                }
            }
        });
    });

    // Initialize first tab as active if none are active
    if (!document.querySelector('.nav-tab.active')) {
        const firstTab = document.querySelector('.nav-tab');
        if (firstTab) {
            firstTab.click();
        }
    }
});
/*document.addEventListener('DOMContentLoaded', () => {
    // Find and attach to chatbot tab click
    const navTabs = document.querySelectorAll('.nav-tab');
    navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const sectionId = tab.getAttribute('data-section');
            console.log('Tab clicked:', sectionId);

            if (sectionId === 'chatbot') {
                // Small delay to ensure DOM is updated
                setTimeout(() => {
                    initializeHealthAssistant();
                }, 100);
            }
        });
    });
});*/

// ========================================================================
// CHAT INPUT HANDLER - Connect text input to handleTextInput function
// ========================================================================

document.addEventListener('DOMContentLoaded', function() {
    // Get chat input and send button
    const chatInput = document.getElementById('chatInput');
    const chatSendBtn = document.getElementById('chatSendBtn');

    if (chatInput && chatSendBtn) {
        console.log('✅ Chat input elements found');

        // Handle Enter key press
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                const userMessage = chatInput.value.trim();
                if (userMessage) {
                    handleTextInput(userMessage);
                    chatInput.value = ''; // Clear input
                }
            }
        });

        // Handle send button click
        chatSendBtn.addEventListener('click', function() {
            const userMessage = chatInput.value.trim();
            if (userMessage) {
                handleTextInput(userMessage);
                chatInput.value = ''; // Clear input
            }
        });

        console.log('✅ Chat input handlers connected');
    } else {
        console.error('❌ Chat input elements not found:', {
            chatInput: !!chatInput,
            chatSendBtn: !!chatSendBtn
        });
    }
});

// Modify handleChatbot to track typed messages
window.handleChatbot = () => {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();

    if (!message) return;

    trackTypedMessage();
    addChatMessage("user", message);
    input.value = '';

    if (message === "প্রথম থেকে শুরু করুন" || message.toLowerCase().includes("restart")) {
        resetChatbot();
        return;
    }

    // Check all possible states in order
    if (chatbotState.awaitingMainMenu) {
        handleMainMenuSelection(message);
    } else if (chatbotState.awaitingSubMenu) {
        handleSubMenuSelection(message);
    } else if (chatbotState.awaitingQuestionAnswer) {
        handleQuestionAnswer(message);
    } else if (chatbotState.awaitingFreeformQuestion) {
        // ✅ Handle freeform followup questions
        handleFreeformFollowupQuestion(message);
    } else if (chatbotState.awaitingFollowup) {
        // ✅ Handle followup state
        addChatMessage("assistant", "দয়া করে বাটনে ক্লিক করুন অথবা প্রশ্ন টাইপ করুন।");
    } else {
        addChatMessage("assistant", "Sorry, I didn't understand. Please select from the options.");
    }
};

// ========================================================================

// ========================================================================
// RENDER DISEASES FUNCTION (MODIFIED)
// ========================================================================
// ... (renderDiseases function is retained as is)

function renderDiseases(diseasesToShow = diseases) {
    const grid = document.getElementById('diseasesGrid');
    const noResults = document.getElementById('noResults');

    if (diseasesToShow.length === 0) {
        grid.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }

    grid.style.display = 'grid';
    noResults.style.display = 'none';

    grid.innerHTML = diseasesToShow.map(disease => `
        <div class="disease-card">
            <span class="disease-category">${disease.category}</span>
            <h3>${disease.name}</h3>

            <div class="disease-section">
                <h4>Symptoms</h4>
                <ul>
                    ${disease.symptoms.slice(0, 4).map(s => `<li>${s}</li>`).join('')}
                    ${disease.symptoms.length > 4 ? '<li><em>...and more</em></li>' : ''}
                </ul>
            </div>


            <div class="disease-section">
                <h4>Age Group</h4>
                <p>${disease.ageGroup}</p>
            </div>


            <div class="disease-section">
                <h4>Common Causes</h4>
                <ul>
                    ${disease.causes.slice(0, 3).map(c => `<li>${c}</li>`).join('')}
                </ul>
            </div>

            <div class="disease-section">
                <h4>Treatment Options</h4>
                <ul>
                    ${disease.treatment.slice(0, 3).map(t => `<li>${t}</li>`).join('')}
                    ${disease.treatment.length > 3 ? '<li><em>...and more</em></li>' : ''}
                </ul>
            </div>

            <div class="disease-section">
                <h4>Prevention</h4>
                <p>${disease.prevention}</p>
            </div>

            ${disease.citation ? `
                <div style="background: #e8f4f8; border-left: 3px solid #2196f3; padding: 0.75rem; margin-top: 1rem; border-radius: 4px; font-size: 0.85rem;">
                    <strong style="color: #2196f3;">📚 Research Sources:</strong><br>
                    ${disease.citation}
                </div>
            ` : ''}

            <button class="btn-learn-more" style="margin-top: 1.5rem;" onclick="showDiseaseDetails('${disease.name.replace(/'/g, "\\'")}')">View Full Details</button>
        </div>
    `).join('');
}

// ========================================================================
// RENDER FAQs FUNCTION (UNCHANGED)
// ========================================================================

function renderFAQs() {
    const container = document.getElementById('faqContainer');
    container.innerHTML = faqs.map((faq, index) => `
        <div class="faq-item" data-index="${index}">
            <div class="faq-question">
                <span>${faq.question}</span>
                <span class="faq-toggle">+</span>
            </div>
            <div class="faq-answer">
                ${faq.answer}
                ${faq.citation ? `
                    <div style="background: #e8f4f8; border-left: 3px solid #2196f3; padding: 0.75rem; margin-top: 1rem; border-radius: 4px; font-size: 0.85rem;">
                        <strong style="color: #2196f3;">📚 Research Source:</strong><br>
                        ${faq.citation}
                    </div>
                ` : ''}
            </div>
        </div>
    `).join('');
}


// ========================================================================
// NEW RENDER FUNCTIONS FOR MISSING SECTIONS
// ========================================================================

// Reusable function for the FAQ-style sections
function renderSectionContent(data, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = data.map((item, index) => `
        <div class="faq-item" data-index="${index}">
            <div class="faq-question">
                <span>${item.question}</span>
                <span class="faq-toggle">+</span>
            </div>
            <div class="faq-answer">
                ${item.answer}
                ${item.citation ? `
                    <div style="background: #e8f4f8; border-left: 3px solid #2196f3; padding: 0.75rem; margin-top: 1rem; border-radius: 4px; font-size: 0.85rem;">
                        <strong style="color: #2196f3;">📚 Research Source:</strong><br>
                        ${item.citation}
                    </div>
                ` : ''}
            </div>
        </div>
    `).join('');
}

function renderWhenToSee() {
    // The "When to See a Oncologist" section uses the same FAQ-like structure
    renderSectionContent(whenToSeeData, 'whenToSeeContainer');
}

function renderPrevention() {
    // The "Prevention & Care" section uses the same FAQ-like structure
    renderSectionContent(preventionData, 'preventionContainer');
}

function renderDoctors(doctorsToShow = []) {
    const container = document.getElementById('doctorsContainer');
    if (!container) return;

    if (doctorsToShow.length === 0) {
        container.innerHTML = `<div class="info-card" style="text-align: center; max-width: none;"><h3>No Doctors Found in This City</h3><p>Please try another city or check back later for updated listings.</p></div>`;
        return;
    }

    container.innerHTML = doctorsToShow.map(doctor => `
        <div class="doctor-card">
            <h3>${doctor.name}</h3>
            <div class="credentials">${doctor.specialization} - ${doctor.hospital}</div>
            <div class="experience">Experience: ${doctor.experience}</div>
            <p><strong>City:</strong> ${doctor.city}</p>
            <p><strong>Contact:</strong> ${doctor.phone}</p>
            <a href="${doctor.link}" target="_blank" class="btn-learn-more" style="width: auto; display: inline-block; margin-top: 0.5rem; background: var(--color-info);">Book Appointment (External)</a>
        </div>
    `).join('');
}

// ========================================================================
// SHOW DISEASE DETAILS MODAL FUNCTION (UNCHANGED)
// ========================================================================

window.showDiseaseDetails = (diseaseName) => {
    const disease = diseases.find(d => d.name === diseaseName);
    if (!disease) return;

    // Use the specific image URL from the disease object (which we added above).
    // The placeholder uses the disease name for clear identification in the UI.
    const imageUrl = disease.imageUrl || `https://via.placeholder.com/900x250/8b4f8b/fef9fc?text=${encodeURIComponent(disease.name.toUpperCase() + " IMAGE")}`;

    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <div class="detail-header">
            <span class="disease-category">${disease.category}</span>
            <h2>${disease.name}</h2>
        </div>

        <p style="font-size: 1.1rem; color: var(--color-text); font-style: italic; margin-bottom: 1.5rem;">
            A detailed overview of ${disease.name}, a ${disease.category.toLowerCase()} that primarily affects cancer patients.
        </p>

        <img src="${imageUrl}" alt="${disease.name} Image" class="detail-image">

        <div class="disease-section">
            <h4>Symptoms</h4>
            <ul>
                ${disease.symptoms.map(s => `<li>${s}</li>`).join('')}
            </ul>
        </div>

         <div class="disease-section">
            <h4>Age Group</h4>
            <ul>
             <p>${disease.ageGroup}</p>
            </ul>
        </div>


        <div class="disease-section">
            <h4>Causes</h4>
            <ul>
                ${disease.causes.map(c => `<li>${c}</li>`).join('')}
            </ul>
        </div>

        <div class="disease-section">
            <h4>Treatment Options</h4>
            <ul>
                ${disease.treatment.map(t => `<li>${t}</li>`).join('')}
            </ul>
        </div>

        <div class="disease-section">
            <h4>Prevention & Care</h4>
            <p>${disease.prevention}</p>
        </div>

        ${disease.citation ? `
            <div style="background: #e8f4f8; border-left: 3px solid #2196f3; padding: 0.75rem; margin-top: 2rem; border-radius: 4px; font-size: 0.9rem;">
                <strong style="color: #2196f3;">📚 Research Sources:</strong><br>
                ${disease.citation}
            </div>
        ` : ''}
    `;

    document.getElementById('diseaseDetailModal').classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevents background scrolling when modal is open
};

// ========================================================================
// SEARCH FUNCTIONALITY (RETAINED)
// ========================================================================

document.getElementById('searchBox').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();

    if (!searchTerm) {
        renderDiseases();
        return;
    }

    const filtered = diseases.filter(disease => {
        return disease.name.toLowerCase().includes(searchTerm) ||
               disease.category.toLowerCase().includes(searchTerm) ||
               disease.symptoms.some(s => s.toLowerCase().includes(searchTerm)) ||
               disease.causes.some(c => c.toLowerCase().includes(searchTerm)) ||
               disease.treatment.some(t => t.toLowerCase().includes(searchTerm));
    });

    renderDiseases(filtered);
});

// ========================================================================
// DOCTOR FILTERING LOGIC (UPDATED)
// ========================================================================

// ========================================================================\
// DOCTORS SECTION
// ========================================================================\

function filterDoctorsByCity() {
    const citySelect = document.getElementById('citySelect');
    const selectedCity = citySelect.value;
    const doctorsContainer = document.getElementById('doctorsContainer');

    doctorsContainer.innerHTML = '';

    if (!selectedCity) {
        doctorsContainer.innerHTML = `
            <div class="no-results">
                <h3>Please select a city to find Gynecologists</h3>
                <p>We provide listings for major Indian cities like Delhi, Mumbai, and Bangalore.</p>
            </div>
        `;
        return;
    }

    const doctors = doctorsData[selectedCity] || [];

    if (doctors.length === 0) {
        doctorsContainer.innerHTML = `
            <div class="no-results">
                <h3>No Doctors found in ${selectedCity}</h3>
                <p>We are working to expand our list of verified healthcare providers.</p>
            </div>
        `;
        return;
    }

    doctorsContainer.innerHTML = doctors.map(doctor => `
        <div class="doctor-card">
            <div style="display: flex; gap: 1.5rem; align-items: flex-start;">
                <div style="flex-shrink: 0;">
                    <div style="width: 80px; height: 80px; border-radius: 50%; background-color: var(--color-accent); display: flex; align-items: center; justify-content: center; font-size: 2rem; color: var(--color-primary);">👩‍⚕️</div>
                </div>
                <div style="flex-grow: 1;">
                    <h3>${doctor.name}</h3>
                    <p class="credentials">${doctor.credentials}</p>
                    <p class="experience" style="color: var(--color-secondary);">${doctor.experience}</p>
                    <p style="margin-bottom: 0.5rem; color: var(--color-text);"><strong>Hospital:</strong> ${doctor.hospital}</p>
                    <p style="margin-bottom: 0.5rem; font-size: 0.95rem; color: var(--color-text-secondary);">📍 ${doctor.address}</p>
                    <p style="margin-bottom: 0.5rem; font-size: 0.95rem; color: var(--color-text-secondary);">📞 ${doctor.phone}</p>
                    <p style="margin-bottom: 0.5rem; font-size: 0.95rem; color: var(--color-text-secondary);">⭐ ${doctor.rating}</p>
                </div>
            </div>

            <div style="margin-top: 1rem; border-top: 1px dashed var(--color-border); padding-top: 1rem;">
                <p style="font-size: 0.9rem; color: var(--color-primary-dark); margin-bottom: 0.75rem;"><strong>Specializations:</strong> ${doctor.specializations}</p>
                <a href="${doctor.bookingLink}" target="_blank" rel="noopener noreferrer" style="display: inline-block; background: var(--color-primary); color: white; padding: 0.75rem 2rem; border-radius: var(--radius-sm); text-decoration: none; font-weight: 600; transition: all 0.3s ease; box-shadow: var(--shadow-sm);" onmouseover="this.style.background='var(--color-primary-dark)'; this.style.transform='translateY(-2px)'; this.style.boxShadow='var(--shadow-md)';" onmouseout="this.style.background='var(--color-primary)'; this.style.transform='translateY(0)'; this.style.boxShadow='var(--shadow-sm)';"> 📅 Book Appointment Online </a>
            </div>
        </div>
    `).join('');
}

// ========================================================================
// TAB NAVIGATION (RETAINED)
// ========================================================================

/*document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        // Update active tab
        document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Update active section
        const sectionId = tab.getAttribute('data-section');
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        document.getElementById(sectionId).classList.add('active');

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});*/


// ========================================================================
// REGISTRATION & SUBSCRIBE BUTTON
// ========================================================================
function handleRegistration(event) {
    event.preventDefault();

    // Get form data
    const formData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('emailAddress').value,
        city: document.getElementById('cityOfResidence').value,
        phone: document.getElementById('phoneNumber')?.value || '',
        preferences: {
            monthly: document.querySelector('input[name="subscribeMonthly"]').checked,
            screening: document.querySelector('input[name="subscribeScreening"]').checked,
            updates: document.querySelector('input[name="subscribeUpdates"]').checked
        },
        timestamp: new Date().toISOString()
    };

    console.log('Registration Data:', formData);

    // Here you would typically send data to your backend
    // For now, show success message

    // Hide form, show success message
    document.getElementById('registrationForm').style.display = 'none';
    document.getElementById('registrationSuccess').style.display = 'block';

    // Optional: Reset and show form again after 5 seconds
    setTimeout(() => {
        document.getElementById('registrationForm').reset();
        document.getElementById('registrationForm').style.display = 'block';
        document.getElementById('registrationSuccess').style.display = 'none';
    }, 5000);
}

// ========================================================================
// FAQ TOGGLE (RETAINED)
// ========================================================================

document.addEventListener('click', (e) => {
    if (e.target.closest('.faq-item')) {
        const faqItem = e.target.closest('.faq-item');
        faqItem.classList.toggle('active');
    }
});

// ========================================================================
// MODAL CLOSE LISTENERS (RETAINED)
// ========================================================================

// Event listener for closing the modal using the 'x' button
document.querySelector('.close-btn').addEventListener('click', () => {
    document.getElementById('diseaseDetailModal').classList.remove('active');
    document.body.style.overflow = 'auto'; // Restore background scrolling
});

// Close modal when clicking outside of the modal content
window.addEventListener('click', (event) => {
    const modal = document.getElementById('diseaseDetailModal');
    if (event.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore background scrolling
    }
});
// ========================================================================
// MAIN SEARCH HANDLER (FIXED)
// ========================================================================

// ========================================================================
// CORE UTILITY FUNCTIONS
// ========================================================================

// Helper function to get the currently active section ID
function getActiveSection() {
    // This finds the button with the 'active' class in the navigation
    const activeTab = document.querySelector('.nav-tab.active');
    // It returns the data-section attribute, or 'diseases' as a fallback
    return activeTab ? activeTab.getAttribute('data-section') : 'diseases';
}

// Function to handle doctor filtering by city AND search query
function filterDoctorsByCity(searchQuery = '') {
    const city = document.getElementById('citySelect').value;
    let doctorsInCity = doctorsData[city] || [];
    const query = searchQuery.toLowerCase();

    if (query) {
         doctorsInCity = doctorsInCity.filter(doctor =>
            doctor.name.toLowerCase().includes(query) ||
            doctor.specializations.toLowerCase().includes(query) ||
            doctor.hospital.toLowerCase().includes(query) ||
            doctor.credentials.toLowerCase().includes(query)
        );
    }

    renderDoctors(doctorsInCity);
}


// ========================================================================
// MAIN SEARCH HANDLER (FIXED)
// This function is now responsible for ALL tab searches.
// ========================================================================

// Expose the function globally so the event listener can use it
window.handleSearch = () => {
    const query = document.getElementById('searchBox').value.trim().toLowerCase();
    const activeSection = getActiveSection();

    // Manage visibility of any general no-results banner if necessary
    const noResultsElement = document.getElementById('noResults');
    if (noResultsElement) {
        noResultsElement.style.display = 'none';
    }

    switch (activeSection) {
        case 'diseases':
            // HEALTH CONDITIONS
            const filteredDiseases = diseases.filter(disease =>
                disease.name.toLowerCase().includes(query) ||
                disease.category.toLowerCase().includes(query) ||
                disease.symptoms.some(s => s.toLowerCase().includes(query)) ||
                disease.treatment.some(t => t.toLowerCase().includes(query))
            );
            renderDiseases(filteredDiseases);
            break;

        case 'when-to-see':
            // WHEN TO SEE A GYNECOLOGIST
            const filteredWhenToSee = whenToSee.filter(item =>
                item.question.toLowerCase().includes(query) ||
                item.answer.toLowerCase().includes(query)
            );
            renderWhenToSee(filteredWhenToSee);
            break;

        case 'doctors':
            // FIND GYNECOLOGISTS (Delegates to the city filter)
            filterDoctorsByCity(query);
            break;

        case 'prevention':
            // PREVENTION & CARE
            const filteredPrevention = preventionTips.filter(item =>
                item.question.toLowerCase().includes(query) ||
                item.answer.toLowerCase().includes(query)
            );
            renderPrevention(filteredPrevention);
            break;

        case 'faq':
            // FAQ
            const filteredFAQs = faqs.filter(item =>
                item.question.toLowerCase().includes(query) ||
                item.answer.toLowerCase().includes(query)
            );
            renderFAQs(filteredFAQs);
            break;

        case 'chatbot':
        case 'registration':
            // Health Assistant and Registration tabs do not have search functionality
            break;
    }
}

// ========================================================================
// EVENT LISTENERS (FIXED: Attaching the unified search handler)
// ========================================================================

// *** THIS LINE REPLACES the old, hardcoded search block ***
document.getElementById('searchBox').addEventListener('input', window.handleSearch);

// ========================================================================
// INITIALIZE APPLICATION (UPDATED)
// ========================================================================

renderDiseases();
renderFAQs();
renderWhenToSee();   // NEW: Initializes "When to See a Gynecologist" content
renderPrevention();  // NEW: Initializes "Prevention & Care" content
//renderDoctors();     // NEW: Initializes "Find Gynecologists" content
const allDoctors = Object.values(doctorsData).flat();
renderDoctors(allDoctors);

// Placeholder functions to prevent errors for other sections


// On main menu option select
function handleMainMenuSelection(userInput) {

  const cleanInput = userInput.trim();
  const stateKey = nextStateMap[cleanInput];
  chatbotState.awaitingMainMenu = false;  // ✅ Changed from appState
  console.log("In handleMainMenuSelection", stateKey)
  if (stateKey && healthPromptMap[stateKey]) {
    const { botPrompt, options } = healthPromptMap[stateKey];
    //console.log("stateKey", botPrompt, options)
    addChatMessage("assistant", botPrompt, options);
    chatbotState.awaitingSubMenu = true;  // ✅ Changed from appState.awaitingSubMenuSelection
    chatbotState.currentSection = stateKey;  // ✅ Changed from appState
  } else {
    addChatMessage("assistant", "ভুল নির্বাচন। দয়া করে তালিকা থেকে সঠিক বিষয়টি বাছাই করুন:", healthMainMenu);
    chatbotState.awaitingMainMenu = true;  // ✅ Changed from appState
  }
}


window.handleRegistration = (event) => {
    event.preventDefault();
    console.log("Registration submitted!");
    alert("Thank you for registering! We'll send you monthly health tips.");
};