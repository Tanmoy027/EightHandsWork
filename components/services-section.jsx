"use client"

import Image from "next/image"

export default function ServicesSection() {
  const services = [
    {
      icon: "/new section/home.png",
      title: "Residential",
      description: "We'll Provide Everything Your New Home Needs."
    },
    {
      icon: "/new section/building.png",
      title: "Commercial",
      description: "Moving to a Workplace Has Never Been Easier."
    },
    {
      icon: "/new section/light-bulb.png",
      title: "Architectural Consultancy",
      description: "Our Experts Will Bring Your Concept to Life."
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-6">
                <Image 
                  src={service.icon} 
                  alt={service.title} 
                  width={60} 
                  height={60} 
                  className="text-amber-700"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
