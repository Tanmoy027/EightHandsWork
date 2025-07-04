"use client"

import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  ArrowRight, 
  Star, 
  Users, 
  TrendingUp, 
  Shield, 
  Clock, 
  Award,
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  Play,
  Building,
  Percent,
  Package
} from 'lucide-react';

const ResellerPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if the device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Set initial state
    checkMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);
    
    setIsVisible(true);
    
    // Set different intervals for mobile and desktop
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, isMobile ? 5000 : 4000); // 1 second for mobile, 4 seconds for desktop
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

  const benefits = [
    {
      icon: <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8" />,
      title: "Increase Revenue",
      description: "Boost your sales with our premium furniture collection and competitive pricing structure."
    },
    {
      icon: <Shield className="h-6 w-6 sm:h-8 sm:w-8" />,
      title: "Quality Assurance",
      description: "All products come with comprehensive warranties and quality guarantees for your peace of mind."
    },
    {
      icon: <Users className="h-6 w-6 sm:h-8 sm:w-8" />,
      title: "Dedicated Support",
      description: "Get personalized support from our dedicated reseller team to help grow your business."
    },
    {
      icon: <Award className="h-6 w-6 sm:h-8 sm:w-8" />,
      title: "Exclusive Access",
      description: "Access to exclusive product lines and early releases before they hit the general market."
    }
  ];

  const processSteps = [
    {
      title: "Step 1",
      subtitle: "Fill out the signup form",
      description: "Complete our simple registration process with your business details and requirements.",
      icon: "👤",
      color: "from-amber-500 to-orange-500"
    },
    {
      title: "Step 2", 
      subtitle: "Review & Approve",
      description: "Our team reviews your application and approves your reseller account within 24-48 hours.",
      icon: "📋",
      color: "from-amber-600 to-orange-600"
    },
    {
      title: "Step 3",
      subtitle: "Start enjoying the benefits",
      description: "Access your reseller portal, browse products, and start earning with competitive margins.",
      icon: "🎉",
      color: "from-amber-500 to-orange-500"
    }
  ];

  const resellerFaqs = [
    {
      question: "How does the reseller program work?",
      answer: "Our reseller program allows qualified businesses to purchase Eight Hands Work furniture at wholesale prices and resell to their customers. You'll get access to our complete catalog, dedicated support, and marketing materials to help grow your business."
    },
    {
      question: "What are the commission rates and pricing structure?",
      answer: "Resellers enjoy wholesale pricing with margins typically ranging from 25-45% depending on product categories and order volumes. Higher volume commitments unlock better pricing tiers and additional benefits."
    },
    {
      question: "How do I place orders and manage inventory?",
      answer: "Once approved, you'll receive access to our reseller portal where you can browse products, check real-time inventory, place orders, and track shipments. Orders can be placed 24/7 with most items shipping within 3-5 business days."
    },
    {
      question: "What support and training do you provide?",
      answer: "We provide comprehensive onboarding, product training, sales materials, high-resolution images, and ongoing support from your dedicated account manager. We also offer co-marketing opportunities and seasonal promotions."
    },
    {
      question: "How are orders fulfilled and shipped?",
      answer: "Orders are processed through our distribution network and can be shipped directly to your customers or to your location. We handle all logistics, tracking, and provide white-label shipping options to maintain your brand experience."
    },
    {
      question: "What are the requirements to maintain reseller status?",
      answer: "Active resellers are expected to maintain minimum quarterly order volumes and uphold our brand standards. We provide quarterly business reviews and growth planning to help you succeed and maintain your partnership benefits."
    }
  ];

  const partnershipBenefits = [
    "Competitive margins up to 45%",
    "Exclusive product access",
    "Marketing support included",
    "Dedicated account manager",
    "Fast approval process"
  ];

  const scrollToContact = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-amber-50">
      {/* Hero Section - Mobile Optimized */}
      <div className="relative flex flex-col md:flex-row items-center justify-center overflow-hidden">
        {/* Mobile Hero */}
        <div className="w-full md:hidden">
          <div className="relative h-[50vh] bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop)'
            }}>
            <div className="absolute inset-0 bg-gradient-to-b from-amber-600/80 to-orange-600/90 flex items-center justify-center">
              <div className="text-center text-white px-6 py-10">
                <h1 className="text-3xl font-bold mb-4 leading-tight">
                  Welcome to Eight Hands Work
                  <span className="block text-2xl mt-2">For Business</span>
                </h1>
                <p className="text-base mb-6 max-w-md mx-auto">
                  With our platform, you can streamline your furniture procurement and workplace enhancement needs effortlessly.
                </p>
                {/* Removed the "SIGN UP YOUR COMPANY" button as requested */}
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Hero */}
        <div className="hidden md:grid md:grid-cols-3 gap-0 h-[70vh] w-full">
          {/* Left Image */}
          <div 
            className="bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop)'
            }}
          ></div>
          
          {/* Center Content */}
          <div className="bg-gradient-to-br from-amber-600/95 via-amber-500/90 to-orange-600/95 flex items-center justify-center">
            <div className="text-center text-white px-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Welcome to Eight Hands Work
                <span className="block text-2xl sm:text-3xl md:text-4xl mt-2">For Business</span>
              </h1>
              <p className="text-base sm:text-lg mb-8 max-w-md mx-auto leading-relaxed">
                With our platform, you can streamline your furniture procurement and workplace enhancement needs effortlessly.
              </p>
              {/* Removed the "SIGN UP YOUR COMPANY" button as requested */}
            </div>
          </div>
          
          {/* Right Image */}
          <div 
            className="bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop)'
            }}
          ></div>
        </div>
      </div>

      {/* How it Works Section - Different view for mobile and desktop */}
      <div className="py-12 sm:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-bold text-center mb-10 sm:mb-16 text-gray-800">
            How it Works
          </h2>
          
          {/* Mobile Slider (Only visible on mobile) */}
          <div className="md:hidden">
            {processSteps.map((step, index) => (
              <div 
                key={index}
                className={`text-center transition-all duration-1000 ${
                  activeStep === index ? 'block' : 'hidden'
                }`}
                style={{
                  animation: activeStep === index ? 'slideIn 1s forwards' : 'none'
                }}
              >
                <div className="relative mb-8">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                    <div className="text-3xl">{step.icon}</div>
                  </div>
                  <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-lg shadow-lg transition-all duration-500`}>
                    {index + 1}
                  </div>
                </div>
                
                <h3 className="font-bold text-xl mb-2 text-gray-800">{step.title}</h3>
                <h4 className="font-semibold text-lg mb-4 text-amber-600">{step.subtitle}</h4>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
            
            {/* Dots for mobile navigation */}
            <div className="flex justify-center space-x-2 mt-8">
              {processSteps.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    activeStep === index ? 'bg-amber-500' : 'bg-gray-300'
                  }`}
                  onClick={() => setActiveStep(index)}
                />
              ))}
            </div>
          </div>
          
          {/* Desktop Grid (Only visible on desktop) */}
          <div className="hidden md:grid md:grid-cols-3 gap-8 lg:gap-12">
            {processSteps.map((step, index) => (
              <div 
                key={index}
                className={`text-center transition-all duration-500 transform ${
                  activeStep === index ? 'scale-105' : 'hover:scale-105'
                }`}
              >
                <div className="relative mb-8">
                  <div className="w-28 h-28 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                    <div className="text-4xl">{step.icon}</div>
                  </div>
                  <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-lg shadow-lg ${
                    activeStep === index ? 'scale-110 shadow-xl' : ''
                  } transition-all duration-500`}>
                    {index + 1}
                  </div>
                </div>
                
                <h3 className="font-bold text-xl mb-2 text-gray-800">{step.title}</h3>
                <h4 className="font-semibold text-lg mb-4 text-amber-600">{step.subtitle}</h4>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section - Mobile responsive */}
      <div className="py-12 sm:py-24 px-4 sm:px-6 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6 text-gray-800">
              Why Partner With Us
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Join thousands of successful resellers who have grown their business with our comprehensive furniture solutions and support system.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="group bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-amber-100"
              >
                <div className="text-amber-600 mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-800 group-hover:text-amber-600 transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA Section - Mobile Optimized */}
      <div className="py-12 sm:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-2xl">
            {/* Stacked on mobile, side-by-side on desktop */}
            <div className="grid grid-cols-2 gap-0 h-64 sm:h-80 lg:h-auto">
              <div 
                className="bg-cover bg-center"
                style={{
                  backgroundImage: 'url(https://images.pexels.com/photos/6474468/pexels-photo-6474468.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop)'
                }}
              ></div>
              <div 
                className="bg-cover bg-center"
                style={{
                  backgroundImage: 'url(https://images.pexels.com/photos/6474470/pexels-photo-6474470.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop)'
                }}
              ></div>
            </div>
            
            {/* CTA - More padding on mobile */}
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-8 sm:p-12 flex items-center justify-center">
              <div className="text-center text-white">
                <h2 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6">
                  Book a Free
                  <span className="block">Appointment</span>
                  <span className="block">with Us</span>
                </h2>
                <p className="text-base sm:text-lg mb-6 sm:mb-8 opacity-90">
                  Schedule a consultation to discuss your reseller opportunities and business growth potential.
                </p>
                <button 
                  onClick={scrollToContact}
                  className="bg-white text-amber-600 px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-amber-50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                >
                  SCHEDULE NOW
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form - Mobile optimized */}
      <div id="contact-form" className="py-12 sm:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6 text-gray-800">
              Ready to Get Started?
            </h2>
            <p className="text-lg sm:text-xl text-gray-700">
              Join our reseller network and start growing your business today!
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            <div className="space-y-6 sm:space-y-8">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                  <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-base sm:text-lg">Call Us</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                  <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-base sm:text-lg">Email Us</h3>
                  <p className="text-gray-600">partners@eighthandswork.com</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                  <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-base sm:text-lg">Visit Us</h3>
                  <p className="text-gray-600">123 Business District, Corporate City, CC 12345</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-5 sm:p-6 rounded-2xl">
                <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4 text-gray-800">Partnership Benefits</h3>
                <ul className="space-y-2">
                  {partnershipBenefits.map((benefit, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500 mr-2 flex-shrink-0" />
                      <span className="text-sm sm:text-base text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Form with larger touch targets for mobile */}
            <form className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 sm:py-3 rounded-xl border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-300 text-base"
                />
                <input
                  type="email"
                  placeholder="Business Email"
                  className="w-full px-4 py-3 sm:py-3 rounded-xl border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-300 text-base"
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-4 py-3 sm:py-3 rounded-xl border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-300 text-base"
                />
                <input
                  type="text"
                  placeholder="Company Name"
                  className="w-full px-4 py-3 sm:py-3 rounded-xl border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-300 text-base"
                />
              </div>
              
              <select className="w-full px-4 py-3 sm:py-3 rounded-xl border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-300 text-base">
                <option>Business Type</option>
                <option>Furniture Retailer</option>
                <option>Interior Designer</option>
                <option>Office Solutions Provider</option>
                <option>Contractor</option>
                <option>Other</option>
              </select>
              
              <textarea
                rows={4}
                placeholder="Tell us about your business and goals..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-300 resize-none text-base"
              ></textarea>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 sm:py-4 px-6 rounded-xl font-semibold text-base sm:text-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                Submit Application
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* FAQ Section - Mobile optimized */}
      <div className="py-12 sm:py-24 px-4 sm:px-6 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-bold text-center mb-10 sm:mb-16 text-gray-800">
            How Our Reseller Program Works
          </h2>
          
          <div className="space-y-3 sm:space-y-4">
            {resellerFaqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl shadow-lg border border-amber-100 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-4 sm:px-6 py-4 sm:py-6 text-left flex items-center justify-between hover:bg-amber-50 transition-colors duration-300"
                >
                  <h3 className="font-semibold text-base sm:text-lg text-gray-800 pr-4">
                    {faq.question}
                  </h3>
                  <ChevronDown 
                    className={`h-5 w-5 text-amber-500 transition-transform duration-300 flex-shrink-0 ${
                      expandedFaq === index ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
                
                <div className={`overflow-hidden transition-all duration-300 ${
                  expandedFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Add CSS Animation for Mobile Slide */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default ResellerPage;