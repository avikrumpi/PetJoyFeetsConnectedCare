'use client';

import { useState, useEffect } from 'react';  // ← Make sure useEffect is here
import { 
  Heart, Activity, Users, Video, ChevronRight, Play, CheckCircle2, Star,
  Stethoscope, Pill, Hospital, LogIn, UserPlus, PawPrint, Zap, Sparkles,
  Globe, Shield, ShoppingCart, MessageCircle, MessageSquare, Bot, Headphones, X, Clock,
  MapPin, Award, Lock, Eye, Ban, UserCheck, Monitor  // ← Make sure Monitor is here
} from 'lucide-react';
import { getTranslation } from '@/locales';

export default function Home() {
  const [language, setLanguage] = useState('en');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [showPersonaModal, setShowPersonaModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [locationData, setLocationData] = useState(null);
  const [browserInfo, setBrowserInfo] = useState(null);

  const [loginError, setLoginError] = useState('');

  const t = getTranslation(language);

  const iconMap = {
    Heart,
    Stethoscope,
    Hospital,
    Users,
    PawPrint,
    Activity,
    Pill,
    Shield,
    Award,
    Lock,
    Eye,
    Ban,
    UserCheck
  };

  // ADD THIS ENTIRE useEffect BLOCK HERE ↓↓↓
  useEffect(() => {
    // Detect Browser Info
    if (typeof window !== 'undefined') {
      const userAgent = navigator.userAgent;
      let browserName = 'Unknown';
      let osName = 'Unknown';

      // Detect Browser
      if (userAgent.includes('Firefox')) browserName = 'Firefox';
      else if (userAgent.includes('Chrome')) browserName = 'Chrome';
      else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) browserName = 'Safari';
      else if (userAgent.includes('Edge')) browserName = 'Edge';
      else if (userAgent.includes('Opera')) browserName = 'Opera';

      // Detect OS
      if (userAgent.includes('Windows')) osName = 'Windows';
      else if (userAgent.includes('Mac')) osName = 'macOS';
      else if (userAgent.includes('Linux')) osName = 'Linux';
      else if (userAgent.includes('Android')) osName = 'Android';
      else if (userAgent.includes('iPhone') || userAgent.includes('iPad')) osName = 'iOS';

      setBrowserInfo({
        browser: browserName,
        os: osName,
        language: navigator.language,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height
      });
    }

    // Detect Location
    const detectLocation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        setLocationData({
          city: data.city || 'Unknown',
          region: data.region || 'Unknown',
          country: data.country_name || 'Unknown',
          timezone: data.timezone || 'Unknown',
          ip: data.ip || 'Unknown'
        });

        console.log('Location detected:', data); // Debug log
      } catch (error) {
        console.error('Location detection failed:', error);
        // Set fallback data
        setLocationData({
          city: 'Unknown',
          region: 'Unknown',
          country: 'India',
          timezone: 'Asia/Kolkata',
          ip: 'Unknown'
        });
      }
    };

    detectLocation();
  }, []); // Empty dependency array - runs once on mount

  // THEN YOUR openAuth and openPersonaSelection functions...
  const openAuth = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const openPersonaSelection = () => {
    setShowPersonaModal(true);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Hardcoded demo credentials
    if (username === 'demo' && password === 'demo') {
      // Successful login - redirect to demo introduction
      window.location.href = '/demoIntroduction';
    } else {
      setLoginError('Invalid credentials! Please use username: "demo" and password: "demo"');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
                {t.nav.logo}
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#solutions" className="text-gray-700 hover:text-teal-600 transition font-medium">{t.nav.solutions}</a>
              <a href="#features" className="text-gray-700 hover:text-teal-600 transition font-medium">{t.nav.features}</a>
              <a href="#about" className="text-gray-700 hover:text-teal-600 transition font-medium">{t.nav.about}</a>
              <a href="#contact" className="text-gray-700 hover:text-teal-600 transition font-medium">{t.nav.contact}</a>
            </div>

            <div className="flex items-center space-x-3">
              

              <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
                <option value="bn">বাংলা</option>
              </select>
              
              <button 
                onClick={() => openAuth('login')}
                className="px-4 py-2 text-teal-600 hover:bg-teal-50 rounded-lg transition font-medium flex items-center"
              >
                <LogIn className="h-4 w-4 mr-2" />
                {t.nav.login}
              </button>
              
              <button 
                onClick={() => openAuth('register')}
                className="px-4 py-2 bg-gradient-to-r from-teal-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition font-medium flex items-center"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                {t.nav.register}
              </button>
              
              <button 
                onClick={openPersonaSelection}
                className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition font-semibold flex items-center shadow-md"
              >
                <Zap className="h-4 w-4 mr-2" />
                {t.nav.bookNow}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Floating Action Buttons for Mobile */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        <button 
          onClick={() => setShowChatModal(true)}
          className="w-14 h-14 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-full shadow-lg hover:shadow-xl transition flex items-center justify-center"
          title={t.nav.chat}
        >
          <MessageCircle className="h-6 w-6" />
        </button>
        <button 
          onClick={() => setShowFeedbackModal(true)}
          className="w-14 h-14 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition flex items-center justify-center"
          title={t.nav.feedback}
        >
          <MessageSquare className="h-6 w-6" />
        </button>
      </div>

      {/* Chat Modal */}
      {showChatModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 relative">
            <button 
              onClick={() => setShowChatModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
            
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bot className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{t.chatBot.title}</h2>
              <p className="text-gray-600">{t.chatBot.subtitle}</p>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="text-center p-6 bg-teal-50 rounded-xl border-2 border-teal-200">
                <div className="text-4xl font-bold text-teal-600 mb-2">{t.chatBot.avgTime}</div>
                <div className="text-sm text-gray-600">{t.chatBot.avgTimeLabel}</div>
              </div>
              <div className="text-center p-6 bg-purple-50 rounded-xl border-2 border-purple-200">
                <div className="text-4xl font-bold text-purple-600 mb-2">{t.chatBot.solveRate}</div>
                <div className="text-sm text-gray-600">{t.chatBot.solveRateLabel}</div>
              </div>
            </div>

            <div className="mb-6">
              <p className="font-semibold text-gray-900 mb-3">{t.chatBot.helpText}</p>
              <ul className="space-y-2">
                {t.chatBot.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-700">
                    <CheckCircle2 className="h-5 w-5 text-teal-600 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <button className="w-full py-4 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg hover:shadow-lg transition font-semibold text-lg mb-4">
              {t.chatBot.startChat}
            </button>

            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-2">{t.chatBot.customerCare}</p>
              <a 
                href={`tel:${t.chatBot.customerCareNumber}`}
                className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition font-medium"
              >
                <Headphones className="h-5 w-5 mr-2" />
                {t.chatBot.customerCareNumber}
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {showFeedbackModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setShowFeedbackModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
            
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{t.feedback.title}</h2>
              <p className="text-gray-600">{t.feedback.subtitle}</p>
            </div>

            <form className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.feedback.name}</label>
                  <input 
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder={t.feedback.name}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.feedback.email}</label>
                  <input 
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder={t.feedback.email}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.feedback.phone}</label>
                  <input 
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder={t.feedback.phone}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.feedback.category}</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    {t.feedback.categories.map((cat, idx) => (
                      <option key={idx} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.feedback.message}</label>
                <textarea 
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder={t.feedback.message}
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:shadow-lg transition font-semibold text-lg"
              >
                {t.feedback.submit}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
            <button 
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
            >
              ✕
            </button>
            
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                {authMode === 'login' ? <LogIn className="h-8 w-8 text-white" /> : <UserPlus className="h-8 w-8 text-white" />}
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                {authMode === 'login' ? t.auth.loginTitle : t.auth.registerTitle}
              </h2>
              {authMode === 'login' && (
                <p className="text-sm text-gray-500 mt-2">
                  Demo: Use username "<span className="font-mono font-bold text-teal-600">demo</span>" and password "<span className="font-mono font-bold text-teal-600">demo</span>"
                </p>
              )}
            </div>

            <form className="space-y-4" onSubmit={handleLogin}>
              {authMode === 'register' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t.auth.name}</label>
                    <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent" placeholder={t.auth.name} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t.auth.phone}</label>
                    <input type="tel" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent" placeholder={t.auth.phone} />
                  </div>
                </>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {authMode === 'login' ? 'Username' : t.auth.email}
                </label>
                <input 
                  type="text" 
                  id="username"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent" 
                  placeholder={authMode === 'login' ? 'Enter username' : t.auth.email}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.auth.password}</label>
                <input 
                  type="password" 
                  id="password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent" 
                  placeholder={t.auth.password}
                  required
                />
              </div>

              {authMode === 'login' && (
                <div className="text-right">
                  <a href="#" className="text-sm text-teal-600 hover:text-teal-700">{t.auth.forgotPassword}</a>
                </div>
              )}

              {loginError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{loginError}</p>
                </div>
              )}

              <button type="submit" className="w-full py-3 bg-gradient-to-r from-teal-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition font-semibold">
                {authMode === 'login' ? t.auth.loginButton : t.auth.registerButton}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')} className="text-sm text-gray-600 hover:text-teal-600">
                {authMode === 'login' ? t.auth.switchToRegister : t.auth.switchToLogin}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Persona Selection Modal */}
      {showPersonaModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full p-8 relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setShowPersonaModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl">✕</button>
            
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{t.personas.title}</h2>
              <p className="text-gray-600">{t.personas.subtitle}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {t.personas.options.map((persona) => {
                const Icon = iconMap[persona.icon] || Heart;
                return (
                  <button 
                    key={persona.id}
                    className="p-6 border-2 border-gray-200 rounded-xl hover:border-teal-500 transition group text-left"
                    onClick={() => { 
                      setShowPersonaModal(false); 
                      alert(`${t.personas.redirecting} ${persona.title} ${t.personas.dashboard}`); 
                    }}
                  >
                    <div className={`w-14 h-14 bg-gradient-to-br ${persona.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition`}>
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{persona.title}</h3>
                    <p className="text-sm text-gray-600">{persona.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-100/50 via-purple-100/30 to-amber-100/20 -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-teal-100 to-purple-100 rounded-full text-transparent bg-clip-text bg-gradient-to-r from-teal-700 to-purple-700 font-semibold mb-8 border border-teal-200">
              {t.hero.badge}
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              {t.hero.title}<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-purple-600 to-amber-500">
                {t.hero.titleHighlight}
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">{t.hero.subtitle}</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button onClick={openPersonaSelection} className="px-8 py-4 bg-gradient-to-r from-teal-600 to-purple-600 text-white rounded-lg hover:shadow-xl transition font-semibold text-lg flex items-center justify-center">
                {t.hero.cta1}
                <ChevronRight className="ml-2 h-5 w-5" />
              </button>
              <button className="px-8 py-4 bg-white text-gray-900 rounded-lg border-2 border-gray-300 hover:border-teal-600 transition font-semibold text-lg flex items-center justify-center shadow-md">
                <Play className="mr-2 h-5 w-5" />
                {t.hero.cta2}
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {t.hero.stats.map((stat, idx) => (
                <div key={idx} className="text-center p-4 bg-white/80 backdrop-blur rounded-xl shadow-md">
                  <div className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent mb-2">{stat.value}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Healthcare Products Marketplace */}
      <section className="py-24 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-100 to-blue-100 rounded-full mb-4">
              <ShoppingCart className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-green-700 font-semibold text-sm">{t.marketplace.tagline}</span>
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-4">{t.marketplace.title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.marketplace.subtitle}</p>
          </div>

          {t.marketplace.categories.map((category, catIdx) => (
            <div key={category.id} className="mb-16">
              <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">{category.name}</h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.products.map((product, pIdx) => (
                  <div key={pIdx} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-6 border-2 border-gray-100 hover:border-teal-300">
                    <div className="relative mb-4">
                      <div className="text-7xl text-center mb-3">{product.image}</div>
                      <div className="absolute top-0 right-0 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        {product.discount}
                      </div>
                      <div className="absolute top-8 right-0 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                        {product.badge}
                      </div>
                    </div>

                    <h4 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h4>
                    <p className="text-sm font-semibold text-teal-600 italic mb-2">"{product.tagline}"</p>
                    <p className="text-sm text-gray-600 mb-4">{product.description}</p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="text-2xl font-bold text-gray-900">{product.price}</div>
                      <div className="flex items-center">
                        <Star className="h-5 w-5 text-yellow-400 fill-current" />
                        <span className="ml-1 font-semibold text-gray-900">{product.rating}</span>
                      </div>
                    </div>

                    <button className="w-full py-3 bg-gradient-to-r from-teal-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition font-semibold flex items-center justify-center">
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      {t.marketplace.addToCart}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="text-center mt-12">
            <button className="px-10 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:shadow-xl transition font-bold text-lg inline-flex items-center">
              {t.marketplace.cta}
              <ChevronRight className="ml-2 h-6 w-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Specialized Care Section */}
      <section id="specialized-care" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-teal-50/30 to-pink-50/50 -z-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mb-4">
              <Sparkles className="h-5 w-5 text-purple-600 mr-2" />
              <span className="text-purple-700 font-semibold text-sm">{t.specializedCare.tagline}</span>
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-4">{t.specializedCare.title}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t.specializedCare.subtitle}</p>
          </div>

          <div className="space-y-16">
            {t.specializedCare.sections.map((section, idx) => (
              <div key={section.id} className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}>
                <div className="lg:w-1/2">
                  <div className={`relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br ${section.bgColor} p-8`}>
                    <div className="text-center py-16">
                      <div className="text-9xl mb-6">{section.emoji}</div>
                      <div className="text-6xl mb-4">{section.icon}</div>
                      <h4 className={`text-2xl font-bold bg-gradient-to-r ${section.color} bg-clip-text text-transparent`}>{section.title}</h4>
                    </div>
                  </div>
                </div>

                <div className="lg:w-1/2">
                  <div className="space-y-6">
                    <div>
                      <h3 className={`text-4xl font-bold mb-3 bg-gradient-to-r ${section.color} bg-clip-text text-transparent`}>{section.title}</h3>
                      <p className="text-2xl font-semibold text-gray-700 italic mb-4">"{section.tagline}"</p>
                      <p className="text-lg text-gray-600 leading-relaxed">{section.description}</p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900 text-lg mb-4">{t.specializedCare.keyServices}</h4>
                      {section.features.map((feature, featureIdx) => (
                        <div key={featureIdx} className="flex items-center space-x-3">
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${section.color}`}></div>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <button onClick={openPersonaSelection} className={`mt-6 px-8 py-4 bg-gradient-to-r ${section.color} text-white rounded-lg hover:shadow-xl transition font-semibold text-lg inline-flex items-center`}>
                      {t.specializedCare.bookConsultation} {section.title} {t.specializedCare.consultation}
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
            {/* Nearby Healthcare Providers Section */}
            <section className="py-24 bg-gradient-to-br from-gray-50 via-blue-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-teal-100 rounded-full mb-4">
              <MapPin className="h-5 w-5 text-blue-600 mr-2" />
              <span className="text-blue-700 font-semibold text-sm">Verified Providers</span>
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-4">{t.nearbyProviders.title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.nearbyProviders.subtitle}</p>
          </div>

          <div className="space-y-16">
            {t.nearbyProviders.categories.map((category) => {
              const Icon = iconMap[category.icon] || Activity;
              return (
                <div key={category.id}>
                  <div className="flex items-center mb-8">
                    <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center mr-4`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900">{category.title}</h3>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.providers.map((provider, idx) => (
                      <div key={idx} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-6 border border-gray-100">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="text-xl font-bold text-gray-900 mb-1">{provider.name}</h4>
                            <p className="text-teal-600 font-medium">{provider.specialty}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center justify-end mb-1">
                              <span className="text-sm text-gray-600 mr-1">Google:</span>
                              <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                              <span className="font-bold text-gray-900">{provider.googleRating}</span>
                            </div>
                            <div className="flex items-center justify-end">
                              <span className="text-sm text-gray-600 mr-1">Platform:</span>
                              <Star className="h-4 w-4 text-teal-500 fill-current mr-1" />
                              <span className="font-bold text-teal-600">{provider.platformRating}</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-gray-600 text-sm">
                            <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                            <span>{provider.distance} away</span>
                          </div>
                          
                          {provider.experience && (
                            <div className="flex items-center text-gray-600 text-sm">
                              <Award className="h-4 w-4 mr-2 text-gray-400" />
                              <span>{provider.experience} experience</span>
                            </div>
                          )}

                          {provider.consultations && (
                            <div className="flex items-center text-gray-600 text-sm">
                              <Users className="h-4 w-4 mr-2 text-gray-400" />
                              <span>{provider.consultations}</span>
                            </div>
                          )}

                          {provider.beds && (
                            <div className="flex items-center text-gray-600 text-sm">
                              <Hospital className="h-4 w-4 mr-2 text-gray-400" />
                              <span>{provider.beds}</span>
                            </div>
                          )}

                          {provider.services && (
                            <div className="flex items-start text-gray-600 text-sm">
                              <Activity className="h-4 w-4 mr-2 text-gray-400 mt-0.5" />
                              <span>{provider.services}</span>
                            </div>
                          )}

                          {provider.timing && (
                            <div className="flex items-center text-gray-600 text-sm">
                              <Clock className="h-4 w-4 mr-2 text-gray-400" />
                              <span>{provider.timing}</span>
                            </div>
                          )}

                          {provider.delivery && (
                            <div className="flex items-center text-teal-600 text-sm font-medium">
                              <CheckCircle2 className="h-4 w-4 mr-2" />
                              <span>{provider.delivery}</span>
                            </div>
                          )}

                          {provider.languages && (
                            <div className="flex items-start text-gray-600 text-sm">
                              <Globe className="h-4 w-4 mr-2 text-gray-400 mt-0.5" />
                              <span>{provider.languages}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <button className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium text-sm">
                            {t.nearbyProviders.viewProfile}
                          </button>
                          <button 
                            onClick={openPersonaSelection}
                            className="flex-1 py-2 bg-gradient-to-r from-teal-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition font-semibold text-sm"
                          >
                            {t.nearbyProviders.bookNow}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

            {/* Government Initiatives Section */}
            <section className="py-24 bg-gradient-to-br from-orange-50 via-white to-green-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-64 h-64 bg-orange-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-100 to-green-100 rounded-full mb-4">
              <span className="text-orange-700 font-semibold text-sm">{t.governmentInitiatives.tagline}</span>
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-4">{t.governmentInitiatives.title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.governmentInitiatives.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.governmentInitiatives.initiatives.map((initiative) => (
              <div key={initiative.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition p-8 border-2 border-transparent hover:border-orange-200">
                <div className="flex items-start justify-between mb-4">
                  <div className={`text-6xl group-hover:scale-110 transition`}>
                    {initiative.icon}
                  </div>
                  <div className={`w-12 h-12 bg-gradient-to-r ${initiative.color} rounded-full opacity-20 group-hover:opacity-100 transition`}></div>
                </div>
                
                <h3 className={`text-2xl font-bold mb-3 bg-gradient-to-r ${initiative.color} bg-clip-text text-transparent`}>
                  {initiative.name}
                </h3>
                <p className="text-gray-600 leading-relaxed">{initiative.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy & Compliance Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px'}}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur rounded-full mb-4 border border-white/20">
              <Shield className="h-5 w-5 text-teal-400 mr-2" />
              <span className="text-teal-400 font-semibold text-sm">{t.privacyCompliance.tagline}</span>
            </div>
            <h2 className="text-5xl font-bold mb-4">{t.privacyCompliance.title}</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">{t.privacyCompliance.subtitle}</p>
          </div>

          {/* Core Values */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {t.privacyCompliance.coreValues.map((value) => {
              const Icon = iconMap[value.icon] || Shield;
              return (
                <div key={value.id} className="bg-white/5 backdrop-blur rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition">
                  <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-xl flex items-center justify-center mb-6`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>

          {/* Certifications */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-center mb-8">Security Certifications</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {t.privacyCompliance.certifications.map((cert, idx) => (
                <div key={idx} className="bg-white/5 backdrop-blur rounded-xl p-6 text-center border border-white/10 hover:border-teal-400/50 transition">
                  <div className="text-5xl mb-4">{cert.icon}</div>
                  <h4 className="text-lg font-bold mb-2">{cert.name}</h4>
                  <p className="text-sm text-gray-400">{cert.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Patient & Doctor Security */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Patient Security */}
            <div className="bg-gradient-to-br from-teal-500/10 to-blue-500/10 backdrop-blur rounded-2xl p-8 border border-teal-400/20">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center mr-4">
                  <Eye className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold">{t.privacyCompliance.patientSecurity.title}</h3>
              </div>
              <ul className="space-y-3">
                {t.privacyCompliance.patientSecurity.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-teal-400 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-200">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Doctor Security */}
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur rounded-2xl p-8 border border-purple-400/20">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mr-4">
                  <UserCheck className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold">{t.privacyCompliance.doctorSecurity.title}</h3>
              </div>
              <ul className="space-y-3">
                {t.privacyCompliance.doctorSecurity.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-purple-400 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-200">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
            {/* Analytics & Instrumentation Section (Hidden but Active) */}
            <div className="hidden">
        {locationData && (
          <div id="analytics-data" data-location={JSON.stringify(locationData)}>
            {/* Analytics metadata for tracking */}
            <meta name="user-location" content={`${locationData.city}, ${locationData.country}`} />
            <meta name="user-timezone" content={locationData.timezone} />
          </div>
        )}
      </div>

          {/* Footer */}
          <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl">{t.nav.logo}</span>
            </div>
            
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-gray-400 mb-2">{t.footer.tagline}</p>
              <p className="text-gray-500 text-sm">{t.footer.copyright}</p>
              
              {/* Session & Location Info - THIS PART */}
              <div className="mt-3 pt-3 border-t border-gray-700">
                <div className="flex flex-col gap-1 text-xs text-gray-400">
                  {/* Session ID - Always shows */}
                  <div className="flex items-center justify-center md:justify-start">
                    <span className="font-semibold mr-2">Session ID:</span>
                    <span className="font-mono text-teal-400">{Date.now().toString(36).toUpperCase()}</span>
                  </div>
                  
                  {/* Location - Only shows when data is loaded */}
                  {locationData ? (
                    <div className="flex items-center justify-center md:justify-start">
                      <MapPin className="h-3 w-3 mr-1 text-teal-400" />
                      <span className="font-semibold mr-2">Location:</span>
                      <span className="text-gray-300">{locationData.city}, {locationData.region}, {locationData.country}</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center md:justify-start">
                      <span className="text-gray-500">Loading location...</span>
                    </div>
                  )}
                  
                  {/* Device Mode - Only shows when browser info is loaded */}
                  {browserInfo ? (
                    <div className="flex items-center justify-center md:justify-start">
                      <Monitor className="h-3 w-3 mr-1 text-purple-400" />
                      <span className="font-semibold mr-2">Mode:</span>
                      <span className="text-gray-300">
                        {browserInfo.screenWidth < 768 ? 'Mobile App Mode' : 'Browser Mode'}
                        <span className="text-gray-500 ml-1">
                          ({browserInfo.browser} • {browserInfo.os})
                        </span>
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center md:justify-start">
                      <span className="text-gray-500">Loading device info...</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex space-x-6">
              <Globe className="h-6 w-6 text-gray-400 hover:text-teal-400 cursor-pointer transition" />
              <Shield className="h-6 w-6 text-gray-400 hover:text-teal-400 cursor-pointer transition" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
