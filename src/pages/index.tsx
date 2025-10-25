import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: "🌾",
      title: "Fresh Local Produce",
      description: "Get farm-fresh products delivered directly from local farmers to your doorstep"
    },
    {
      icon: "💰",
      title: "Fair Pricing",
      description: "Eliminate middlemen and ensure fair prices for both farmers and consumers"
    },
    {
      icon: "🤝",
      title: "Direct Connection",
      description: "Build relationships with local farmers and know where your food comes from"
    },
    {
      icon: "📱",
      title: "Easy to Use",
      description: "Simple platform for browsing, ordering, and managing your farm products"
    }
  ];

  const stats = [
    { value: "500+", label: "Active Farmers" },
    { value: "10K+", label: "Happy Customers" },
    { value: "50K+", label: "Products Sold" },
    { value: "4.8★", label: "Average Rating" }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Farmer",
      content: "AgriConnect helped me reach customers directly. My income increased by 40%!",
      avatar: "👨‍🌾"
    },
    {
      name: "Priya Sharma",
      role: "Consumer",
      content: "I love getting fresh vegetables directly from local farms. Quality is amazing!",
      avatar: "👩"
    },
    {
      name: "Amit Patel",
      role: "Farmer",
      content: "The platform is easy to use and customer support is excellent. Highly recommend!",
      avatar: "👨"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <div className="py-8 sm:py-12 md:py-16">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-br from-green-900/40 via-blue-900/40 to-green-900/40 backdrop-blur-sm border border-white/10 p-6 sm:p-8 md:p-12 lg:p-16 mb-12 sm:mb-16 md:mb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-brandBlue/5 to-brandGreen/5"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-brandGreen rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-brandBlue rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        <div className="relative text-center max-w-4xl lg:max-w-5xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 sm:mb-8 font-poppins animate-fade-in">
            Connecting Farmers & Consumers
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-12 sm:mb-16 leading-relaxed max-w-2xl lg:max-w-3xl mx-auto px-4">
            Direct market access for fresh, local produce. 
            Connect with farmers in your community and discover quality products.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4">
            <Link
              href="/consumer"
              className="group inline-flex items-center justify-center px-6 sm:px-8 lg:px-10 py-4 sm:py-5 bg-brandGreen text-white font-semibold text-lg sm:text-xl rounded-xl sm:rounded-2xl hover:bg-brandGreenHover transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-brandGreen/30 shadow-brand-lg hover:shadow-2xl hover:scale-105 active:scale-95"
            >
              <span>Explore Products</span>
              <svg className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/farmer"
              className="group inline-flex items-center justify-center px-6 sm:px-8 lg:px-10 py-4 sm:py-5 bg-brandBlue text-white font-semibold text-lg sm:text-xl rounded-xl sm:rounded-2xl hover:bg-brandBlueHover transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-brandBlue/30 shadow-brand-lg hover:shadow-2xl hover:scale-105 active:scale-95"
            >
              <span>Farmer Dashboard</span>
              <svg className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16 md:mb-20">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-2xl text-center hover:shadow-green-500/20 transition-all duration-300 hover:scale-105 border border-white/10"
          >
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-400 mb-2">{stat.value}</div>
            <div className="text-sm sm:text-base text-gray-300 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Features Section */}
      <div className="mb-12 sm:mb-16 md:mb-20">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-8 sm:mb-12">
          Why Choose AgriConnect?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`bg-slate-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 shadow-2xl hover:shadow-green-500/20 transition-all duration-500 cursor-pointer border-2 ${
                activeFeature === index ? 'border-green-500 scale-105 bg-slate-800/70' : 'border-white/10'
              }`}
              onMouseEnter={() => setActiveFeature(index)}
            >
              <div className="text-4xl sm:text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-sm sm:text-base text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="mb-12 sm:mb-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-8 sm:mb-12">
          What Our Community Says
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 hover:scale-105 border border-white/10"
            >
              <div className="flex items-center mb-4">
                <div className="text-4xl mr-3">{testimonial.avatar}</div>
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-sm text-gray-400">{testimonial.role}</div>
                </div>
              </div>
              <p className="text-gray-300 italic">&quot;{testimonial.content}&quot;</p>
              <div className="mt-3 text-yellow-500">★★★★★</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-brandGreen to-brandBlue rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center text-white">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-lg sm:text-xl mb-8 opacity-90">Join thousands of farmers and consumers already using AgriConnect</p>
        <Link
          href="/auth/signup"
          className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-600 font-semibold text-lg rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105"
        >
          Sign Up Now
          <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
