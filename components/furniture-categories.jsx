"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function FurnitureCategories() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const categories = [
    {
      name: "Epoxy Table",
      icon: "/icon/desk.png",
      description: "Stylish epoxy resin tables with unique designs",
      link: "/products?category=epoxy-table"
    },
    {
      name: "Epoxy Chair",
      icon: "/icon/night-stand.png",
      description: "Elegant and comfortable epoxy resin chairs",
      link: "/products?category=epoxy-chair"
    },
    {
      name: "Sofa",
      icon: "/icon/armchair.png",
      description: "Luxurious and comfortable sofas for your living room",
      link: "/products?category=sofa"
    },
    {
      name: "Interior",
      icon: "/icon/intorior.png",
      description: "Complete interior design solutions for your space",
      link: "/products?category=interior"
    },
    {
      name: "Dining Table",
      icon: "/icon/dinner-table.png",
      description: "Elegant dining tables for family gatherings",
      link: "/products?category=dining-table"
    },
    {
      name: "Cabinet",
      icon: "/icon/cabinet.png",
      description: "Stylish storage solutions for your home",
      link: "/products?category=cabinet"
    },
    {
      name: "Bar Stool",
      icon: "/icon/bar-stool.png",
      description: "Modern bar stools for your kitchen or bar area",
      link: "/products?category=bar-stool"
    },
    {
      name: "Bed",
      icon: "/icon/hotel-bed.png",
      description: "Comfortable beds for a good night's sleep",
      link: "/products?category=bed"
    },
    {
      name: "Shoe Rack",
      icon: "/icon/shoe-rack.png",
      description: "Organized storage for your footwear collection",
      link: "/products?category=shoe-rack"
    },
    {
      name: "Swivel Chair",
      icon: "/icon/swivel-chair.png",
      description: "Comfortable and functional swivel chairs",
      link: "/products?category=swivel-chair"
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      // Calculate total number of possible slides
      const totalSlides = Math.ceil(categories.length / 4);
      // Move to the next slide or wrap around to the first slide
      setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    }, 3000); // Change slide every 3 seconds
    
    return () => clearInterval(interval);
  }, [categories.length]);

  // Get the current 4 categories to display
  const visibleCategories = categories.slice(currentSlide * 4, (currentSlide * 4) + 4);
  
  // If we don't have 4 categories to show, wrap around to the beginning
  while (visibleCategories.length < 4) {
    visibleCategories.push(categories[visibleCategories.length % categories.length]);
  }

  return (
    <section className="py-8 md:py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-medium text-center mb-8">
          FEATURED CATEGORIES
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 max-w-4xl mx-auto">
          {visibleCategories.map((category, index) => (
            <Link
              href={category.link}
              key={`slide-${currentSlide}-item-${index}`}
              className="flex flex-col items-center group"
            >
              <div className="bg-white rounded-lg p-3 md:p-6 w-full shadow-sm hover:shadow-md transition-all">
                <div className="flex justify-center mb-2 md:mb-4">
                  <img 
                    src={category.icon} 
                    alt={category.name} 
                    className="h-12 md:h-16 w-auto object-contain"
                  />
                </div>
                <h3 className="text-xs md:text-lg font-medium text-center text-gray-800 mb-1 md:mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-600 text-center text-[10px] md:text-xs line-clamp-2">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Slide indicators */}
        <div className="flex justify-center mt-6">
          {Array.from({ length: Math.ceil(categories.length / 4) }).map((_, i) => (
            <button
              key={i}
              className={`w-2 h-2 mx-1 rounded-full ${i === currentSlide ? 'bg-blue-600' : 'bg-gray-300'}`}
              onClick={() => setCurrentSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}