"use client"

import React, { useState, useEffect } from 'react';
import { CheckCircle, ArrowRight, Star, ChevronDown, Phone, Mail, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

const EpoxyServices = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const services = [
    {
      title: "Epoxy Table",
      description: "Stunning handcrafted epoxy tables that become the centerpiece of any room.",
      image: "/service/table.jpg",
      features: [
        "River, ocean, and geode designs",
        "Custom dimensions and shapes",
        "Dining, coffee, and side tables",
        "Embedded objects and special effects"
      ]
    },
    {
      title: "Epoxy Clear Coating",
      description: "Crystal-clear epoxy finishes that protect and enhance the beauty of your surfaces.",
      image: "https://images.pexels.com/photos/6474471/pexels-photo-6474471.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop",
      features: [
        "Ultra-transparent finish",
        "UV-resistant formulations",
        "Highlights natural materials",
        "Waterproof protection"
      ]
    },
    {
      title: "Epoxy Marble Coating",
      description: "Premium marble-effect epoxy coatings that transform surfaces with elegant, unique patterns.",
      image: "/service/Marble Coating.jpg",
      features: [
        "Luxurious marble-like finish",
        "Customizable color combinations",
        "Durable and long-lasting",
        "Perfect for countertops and floors"
      ]
    },
    {
      title: "Epoxy Custom Basin",
      description: "Bespoke epoxy basins and sinks that become functional art pieces in your space.",
      image: "/service/basicn.jpg",
      features: [
        "Seamless construction",
        "Unique colors and designs",
        "Perfect for bathrooms and kitchens",
        "Stain and chemical resistant"
      ]
    },
    {
      title: "Epoxy Tray",
      description: "Elegant serving and decorative trays with stunning epoxy resin finishes.",
      image: "/service/Tray.jpg",
      features: [
        "Functional art for your home",
        "Durable and food-safe options",
        "Custom shapes and designs",
        "Perfect for gifts and home decor"
      ]
    },
    {
      title: "Epoxy Wall Clock",
      description: "Functional art pieces that tell time while showcasing beautiful epoxy designs.",
      image: "/service/clock.jpg",
      features: [
        "Unique handcrafted timepieces",
        "Various sizes available",
        "Quality clock mechanisms",
        "Customizable designs and colors"
      ]
    },
    {
      title: "Epoxy Wall Paneling",
      description: "Stunning epoxy wall panels that create dramatic visual impact in any space.",
      image: "/service/Wall Paneling.jpg",
      features: [
        "Customizable designs and patterns",
        "Moisture-resistant for bathrooms",
        "Easy to clean and maintain",
        "Adds dimension to interior spaces"
      ]
    },
    {
      title: "Epoxy Geode Art Wall Hanging",
      description: "Captivating geode-inspired wall art created with epoxy resin techniques for vibrant, dimensional pieces.",
      image: "/service/Art Wall Hanging.jpg",
      features: [
        "Stunning crystalline formations",
        "Custom sizes and color palettes",
        "Striking visual impact",
        "Perfect for home or office decor"
      ]
    }
  ];

  const processSteps = [
    {
      title: "Consultation",
      description: "We discuss your vision, requirements, and provide expert advice.",
      icon: "💬"
    },
    {
      title: "Design",
      description: "Our designers create detailed plans and mockups for your approval.",
      icon: "🎨"
    },
    {
      title: "Creation",
      description: "Our skilled artisans carefully craft your custom epoxy piece.",
      icon: "🔨"
    },
    {
      title: "Delivery",
      description: "We deliver and install your finished piece with care and precision.",
      icon: "🚚"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Interior Designer",
      quote: "The custom epoxy dining table transformed my client's space completely. The quality and craftsmanship are exceptional.",
      rating: 5
    },
    {
      name: "Ahmed Rahman",
      role: "Restaurant Owner",
      quote: "Our restaurant countertops have never looked better. Not only are they beautiful, but they've also stood up to heavy daily use.",
      rating: 5
    },
    {
      name: "Mina Chowdhury",
      role: "Homeowner",
      quote: "The river table in my living room is always the first thing guests comment on. It's truly a work of art.",
      rating: 5
    }
  ];

  const faqs = [
    {
      question: "How long does an epoxy project typically take?",
      answer: "Project timelines vary based on complexity and size. Small pieces may take 1-2 weeks, while larger custom furniture can take 3-6 weeks from design approval to delivery."
    },
    {
      question: "Is epoxy furniture durable?",
      answer: "Yes, epoxy resin creates extremely durable surfaces that resist scratches, stains, and heat when properly cured. Our epoxy pieces are designed to last for decades with proper care."
    },
    {
      question: "How do I care for and clean epoxy furniture?",
      answer: "Epoxy surfaces are easy to maintain. Simply clean with mild soap and water, avoiding abrasive cleaners. For detailed care instructions, we provide a maintenance guide with every purchase."
    },
    {
      question: "Can you match specific colors for my project?",
      answer: "Absolutely! We can color-match to your specifications, whether you're looking to complement existing decor or create a specific aesthetic."
    },
    {
      question: "Do you provide installation services?",
      answer: "Yes, we offer professional installation for larger pieces like countertops, bars, and specialized furniture. This service can be added to your order for an additional fee."
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Auto-advance testimonials on mobile
  useEffect(() => {
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(testimonialInterval);
  }, []); // Removed the testimonials.length dependency

  const scrollToContact = () => {
    const contactElement = document.getElementById('contact-form');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    const servicesElement = document.querySelector('.py-16.sm\\:py-24.px-4.sm\\:px-6.bg-white');
    if (servicesElement) {
      servicesElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-amber-50">
      {/* Hero Section - New Compact Design */}
      <div className="relative py-16 sm:py-20 md:py-24 bg-amber-50 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-amber-500 opacity-20" style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d97706' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Text Content */}
              <div className="text-left md:pr-8">
                <div className="inline-block bg-amber-100 text-amber-800 font-medium px-3 py-1 text-sm rounded-full mb-4">
                  Premium Craftsmanship
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900 leading-tight">
                  <span className="block">Expert</span>
                  <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                    Epoxy Services
                  </span>
                </h1>
                <p className="text-base sm:text-lg text-gray-700 mb-6">
                  Transform your space with our premium epoxy solutions. We craft beautiful, 
                  durable pieces that make a statement in any environment.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button 
                    onClick={scrollToContact}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-md hover:shadow-lg flex items-center"
                  >
                    Get Free Quote
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                  <button 
                    onClick={scrollToServices}
                    className="border-2 border-amber-500 text-amber-600 px-6 py-3 rounded-lg font-medium hover:bg-amber-50 transition-all duration-300 flex items-center"
                  >
                    View Services
                  </button>
                </div>
              </div>
              
              {/* Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl h-64 sm:h-80 md:h-96 transform md:translate-x-4">                <img 
                  src="/service/table.jpg" 
                  alt="Epoxy Table Craftsmanship" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-600/40 to-transparent"></div>
                
                {/* Floating Tags */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg">
                  <div className="flex items-center">
                    <span className="text-amber-600 font-semibold mr-2">⭐ 4.9</span>
                    <span className="text-sm text-gray-600">Top-rated service</span>
                  </div>
                </div>
                
                <div className="absolute top-4 right-4 bg-amber-500/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
                  <span className="text-white text-sm font-medium">Premium Quality</span>
                </div>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {[
                { number: "8+", text: "Years Experience" },
                { number: "200+", text: "Projects Completed" },
                { number: "50+", text: "Design Options" },
                { number: "100%", text: "Satisfaction" }
              ].map((stat, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm rounded-lg p-3 text-center shadow-md">
                  <div className="text-xl sm:text-2xl font-bold text-amber-600">{stat.number}</div>
                  <div className="text-xs sm:text-sm text-gray-600">{stat.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <div className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Expert Epoxy Craftsmanship
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              Eight Hands Work specializes in creating stunning epoxy resin furniture and decor pieces. 
              Our team of skilled artisans combines traditional woodworking techniques with modern epoxy
              applications to create pieces that are both functional and artistic.
            </p>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                { icon: "✨", text: "Premium Materials" },
                { icon: "🎨", text: "Custom Designs" },
                { icon: "🛡️", text: "5-Year Warranty" },
                { icon: "🚚", text: "Nationwide Delivery" }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="group bg-white p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-amber-100"
                >
                  <div className="text-2xl sm:text-3xl mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <span className="font-semibold text-gray-800 text-sm sm:text-base">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="py-16 sm:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            Our Epoxy Services
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-48 sm:h-52 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-amber-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button 
                    onClick={scrollToContact}
                    className="group/btn w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 px-4 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                  >
                    Request Service
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Process Section - Mobile Optimized */}
      <div className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            Our Process
          </h2>
          
          {/* Mobile: 2x2 Grid, Desktop: 1x4 Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {processSteps.map((step, index) => (
              <div 
                key={index}
                className={`text-center transition-all duration-500 transform ${
                  activeStep === index ? 'scale-105' : 'hover:scale-105'
                }`}
              >
                <div className={`relative w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-bold transition-all duration-500 ${
                  activeStep === index 
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg scale-110' 
                    : 'bg-gradient-to-r from-gray-400 to-gray-500 hover:from-amber-400 hover:to-orange-400'
                }`}>
                  <span className="text-xl sm:text-2xl">{step.icon}</span>
                  <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center text-amber-600 font-bold text-xs sm:text-sm shadow-lg">
                    {index + 1}
                  </div>
                </div>
                <h3 className="font-bold text-lg sm:text-xl mb-2 sm:mb-3 text-gray-800">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Projects Gallery */}
      <div className="py-16 sm:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            Featured Projects
          </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {[
              '/service/table.jpg',
              'https://images.pexels.com/photos/6474471/pexels-photo-6474471.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
              '/service/Marble Coating.jpg',
              '/service/basicn.jpg',
              '/service/Tray.jpg',
              '/service/clock.jpg',
              '/service/Wall Paneling.jpg',
              '/service/Art Wall Hanging.jpg'
            ].map((image, index) => (
              <div 
                key={index}
                className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <img 
                  src={image} 
                  alt={`Project ${index + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-6">
                  <span className="text-white font-semibold text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    View Project
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button className="group bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center mx-auto">
              View All Projects
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Testimonials - Mobile Slideshow */}
      <div className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            What Our Clients Say
          </h2>
          
          {/* Mobile Slideshow */}
          <div className="md:hidden relative">
            <div className="overflow-hidden rounded-2xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div 
                    key={index}
                    className="w-full flex-shrink-0 bg-white p-6 sm:p-8 border border-amber-100"
                  >
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-amber-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 italic mb-6 leading-relaxed text-base sm:text-lg">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 flex items-center justify-center text-white font-bold text-lg mr-4">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{testimonial.name}</p>
                        <p className="text-gray-600 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation Buttons */}
            <button 
              onClick={prevTestimonial}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300"
            >
              <ChevronLeft className="h-5 w-5 text-amber-600" />
            </button>
            <button 
              onClick={nextTestimonial}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300"
            >
              <ChevronRight className="h-5 w-5 text-amber-600" />
            </button>
            
            {/* Dots Indicator */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentTestimonial === index 
                      ? 'bg-amber-500 scale-125' 
                      : 'bg-amber-200 hover:bg-amber-300'
                  }`}
                />
              ))}
            </div>
          </div>
          
          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-amber-100"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-amber-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-6 leading-relaxed text-lg">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 flex items-center justify-center text-white font-bold text-lg mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{testimonial.name}</p>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div id="contact-form" className="py-16 sm:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Get Your Free Quote
            </h2>
            <p className="text-xl text-gray-700">
              Ready to transform your space? Let's discuss your project!
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Call Us</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Email Us</h3>
                  <p className="text-gray-600">info@eighthandswork.com</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Visit Us</h3>
                  <p className="text-gray-600">123 Craft Street, Design City, DC 12345</p>
                </div>
              </div>
            </div>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-300"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-300"
                />
              </div>
              
              <input
                type="tel"
                placeholder="Your Phone"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-300"
              />
              
              <select className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-300">
                <option>Select Service</option>
                {services.map((service, index) => (
                  <option key={index}>{service.title}</option>
                ))}
              </select>
              
              <textarea
                rows={4}
                placeholder="Tell us about your project..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-300 resize-none"
              ></textarea>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl shadow-lg border border-amber-100 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-amber-50 transition-colors duration-300"
                >
                  <h3 className="font-semibold text-lg text-gray-800 pr-4">
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
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
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

export default EpoxyServices;