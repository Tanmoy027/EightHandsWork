"use client"

import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function CompattaInteriorPage() {
  return (
    <div className="min-h-screen bg-background">

      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-amber-50 to-stone-100 rounded-3xl mx-4 mt-4 overflow-hidden">
        {/* Navigation */}
        <nav className="flex items-center justify-between p-6 relative z-10">
          <div className="text-2xl font-bold text-gray-800">Compatto</div>
          <div className="hidden md:flex space-x-8 text-sm text-gray-600">
            <a href="#who-we-are" className="hover:text-amber-500">
              Why we are
            </a>
            <a href="#simplify" className="hover:text-amber-500">
              The Challenge
            </a>
            <a href="#services" className="hover:text-amber-500">
              Our Service
            </a>
            <a href="#why-choose" className="hover:text-amber-500">
              Why Choose us
            </a>
          </div>
          <button className="bg-amber-500 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-amber-600">
            Contact Us
          </button>
        </nav>

        {/* Hero Content */}
        <div className="relative px-6 pb-12">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
                Bringing Simplicity
                <br />
                In The Furnishing Market
              </h1>
              <p className="text-gray-700 text-lg max-w-md">
                Compatto simplifies the complex process of furnishing all inclusive business & home spaces.
              </p>
              <button className="bg-gray-800 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-900 transition-colors">
                Start Your Furnishing Journey
              </button>
            </div>            <div className="relative">
              <Image
                src="/intorior/img1.jpg"
                alt="Modern living room with comfortable chair and warm lighting"
                width={600}
                height={400}
                className="rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Who We Are Section */}
      <div id="who-we-are" className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Stats Card */}
          <div className="bg-amber-50 rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-4 right-4 w-16 h-16 bg-amber-100 rounded-full opacity-50"></div>
            <div className="absolute top-8 right-8 w-12 h-12 bg-amber-200 rounded-full opacity-30"></div>
            <div className="space-y-4">
              <div className="text-6xl font-bold text-gray-800">150+</div>
              <div className="text-gray-600">
                <div className="font-medium">Furniture pieces</div>
                <div className="text-sm">Curated for you</div>
              </div>
            </div>
          </div>

          {/* Who We Are Content */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">
              Who <span className="text-amber-500">We Are</span>
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                At Compatto, we understand the challenges of creating exceptional spaces that bring elegance, comfort,
                and functionality together.
              </p>
              <p>
                As Bangladesh's premier furniture solutions provider, we've helped our clients to simplify the furniture buying
                process by offering end-to-end solutions from our initial consultation to final installation.
              </p>
            </div>            <div className="relative">
              <Image
                src="/intorior/img2.jpg"
                alt="Furniture craftsmanship"
                width={300}
                height={200}
                className="rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* How We Simplify Section */}
      <div id="simplify" className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-12">
          How We <span className="text-amber-500">Simplify</span> Your
          <br />
          Furnishing Experience
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-amber-50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  After-Sales <span className="text-amber-500">Support</span>
                  <br />
                  and <span className="text-amber-500">Maintenance</span>
                </h3>
                <p className="text-gray-600">
                  Our commitment to your satisfaction extends beyond the first installation. We conduct a thorough final
                  walkthrough to ensure your satisfaction, and we offer comprehensive after-sales support for warranty
                  claims, maintenance, and care instructions.
                </p>
              </div>
            </div>
          </div>          <div className="relative">
            <Image
              src="/intorior/img3.jpg"
              alt="Elegant dining room with modern chandelier"
              width={500}
              height={400}
              className="rounded-2xl object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg">
              <div className="text-sm font-medium text-gray-800">Dining</div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Compatto Section */}
      <div id="why-choose" className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-12">
          Why <span className="text-amber-500">Choose</span> Compatto
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* End-to-End Solutions */}
          <div className="bg-amber-50 rounded-3xl p-6 space-y-4">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-amber-500 rounded-full"></div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800">End-to-End Solutions</h3>
            <p className="text-gray-600 text-sm">
              We manage every aspect of your furnishing project, from initial design consultation to final installation
              and beyond.
            </p>
          </div>

          {/* After-Sales Support */}
          <div className="bg-stone-50 rounded-3xl p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">After-Sales Support</h3>
            <p className="text-gray-600 text-sm">
              We offer comprehensive after-sales support including warranty claims, maintenance guidance, and care
              instructions.
            </p>
          </div>

          {/* No Variety Restrictions */}
          <div className="bg-amber-600 text-white rounded-3xl p-6 space-y-4">
            <h3 className="text-xl font-semibold">No Variety Restrictions</h3>
            <p className="text-white/90 text-sm">
              Whether you need contemporary, traditional, or eclectic pieces, we provide access to a vast range of
              furniture products to suit your unique taste and preferences.
            </p>
          </div>

          {/* Superior Quality */}
          <div className="md:col-span-2 lg:col-span-3 bg-gray-800 text-white rounded-3xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 space-y-4">
                <h3 className="text-2xl font-semibold">Superior Quality</h3>
                <p className="text-white/90">
                  Our commitment to quality means that every piece we recommend undergoes rigorous quality checks to
                  ensure durability, comfort, and aesthetic appeal.
                </p>
                <div className="text-sm text-amber-500">Bespoke Furniture</div>
                <p className="text-white/90 text-sm">
                  We specialize in creating custom-made furniture pieces that perfectly match your unique requirements
                  and design preferences.
                </p>
              </div>              <div className="relative h-64 lg:h-auto">
                <Image
                  src="/intorior/img4.jpg"
                  alt="Modern dining area with custom furniture"
                  width={400}
                  height={300}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
        {/* Services Section */}
      <div id="services" className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-12">
          Our <span className="text-amber-500">Services</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="card p-6 border border-gray-100 hover:border-amber-200 transition-colors">
            <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mb-4">
              <div className="w-6 h-6 bg-amber-500 rounded-full"></div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Interior Design</h3>
            <p className="text-gray-600">
              Our expert designers work with you to create personalized interior designs that reflect your style and meet your functional needs.
            </p>
          </div>
          
          <div className="card p-6 border border-gray-100 hover:border-amber-200 transition-colors">
            <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mb-4">
              <div className="w-6 h-6 bg-amber-500 rounded-full"></div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Custom Furniture</h3>
            <p className="text-gray-600">
              We create bespoke furniture pieces tailored to your specifications, ensuring a perfect fit for your space.
            </p>
          </div>
          
          <div className="card p-6 border border-gray-100 hover:border-amber-200 transition-colors">
            <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mb-4">
              <div className="w-6 h-6 bg-amber-500 rounded-full"></div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Installation</h3>
            <p className="text-gray-600">
              Our professional team ensures seamless delivery and installation of all furniture pieces, with attention to detail.
            </p>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="max-w-6xl mx-auto px-6 py-16 bg-amber-50/50 rounded-3xl my-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
          Our <span className="text-amber-500">Featured</span> Work
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="group relative overflow-hidden rounded-xl">
            <Image
              src="/intorior/product1.jpg"
              alt="Featured interior product"
              width={300}
              height={400}
              className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <h3 className="text-white font-semibold">Living Room</h3>
              <p className="text-white/80 text-sm">Modern elegance</p>
            </div>
          </div>
          
          <div className="group relative overflow-hidden rounded-xl">
            <Image
              src="/intorior/product2.jpg"
              alt="Featured interior product"
              width={300}
              height={400}
              className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <h3 className="text-white font-semibold">Dining Area</h3>
              <p className="text-white/80 text-sm">Contemporary design</p>
            </div>
          </div>
          
          <div className="group relative overflow-hidden rounded-xl">
            <Image
              src="/intorior/product3.jpg"
              alt="Featured interior product"
              width={300}
              height={400}
              className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <h3 className="text-white font-semibold">Office Space</h3>
              <p className="text-white/80 text-sm">Professional comfort</p>
            </div>
          </div>
          
          <div className="group relative overflow-hidden rounded-xl">
            <Image
              src="/intorior/product4.jpg"
              alt="Featured interior product"
              width={300}
              height={400}
              className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <h3 className="text-white font-semibold">Bedroom</h3>
              <p className="text-white/80 text-sm">Peaceful retreat</p>
            </div>
          </div>
        </div>
          <div className="mt-10 text-center">
          <button className="bg-amber-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-amber-600 transition-colors">
            View All Projects
          </button>
        </div>
      </div>
      
      {/* Design Gallery */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Design <span className="text-amber-500">Gallery</span>
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl">
          Explore our collection of beautifully designed interior spaces that showcase our attention to detail and commitment to quality.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="relative h-80 overflow-hidden rounded-xl">
            <Image
              src="/intorior/img5.jpg"
              alt="Interior design gallery item"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="relative h-80 overflow-hidden rounded-xl md:col-span-2">
            <Image
              src="/intorior/product1.jpg"
              alt="Interior design gallery item"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="relative h-80 overflow-hidden rounded-xl md:col-span-2">
            <Image
              src="/intorior/product2.jpg"
              alt="Interior design gallery item"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="relative h-80 overflow-hidden rounded-xl">
            <Image
              src="/intorior/product3.jpg"
              alt="Interior design gallery item"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>

    </div>
  )
}
