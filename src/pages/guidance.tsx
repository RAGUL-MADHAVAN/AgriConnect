import { useState } from "react";
import Link from "next/link";

export default function Guidance() {
  const [activeRole, setActiveRole] = useState<"farmer" | "consumer">("consumer");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const farmerGuides = [
    {
      icon: "📝",
      title: "Create Your Account",
      description: "Sign up as a farmer and complete your profile with farm details and contact information.",
      steps: ["Click on 'Sign Up'", "Select 'Farmer' role", "Fill in your farm details", "Verify your email"]
    },
    {
      icon: "🌾",
      title: "Add Your Products",
      description: "List your farm products with prices, quantities, and descriptions.",
      steps: ["Go to Farmer Dashboard", "Click 'Add Product'", "Enter product details", "Set pricing and stock"]
    },
    {
      icon: "📦",
      title: "Manage Orders",
      description: "Track and fulfill customer orders efficiently through your dashboard.",
      steps: ["View orders in real-time", "Update order status", "Communicate with customers", "Track your revenue"]
    },
    {
      icon: "💰",
      title: "Get Paid",
      description: "Receive payments directly from customers with transparent pricing.",
      steps: ["Set up payment method", "Receive order payments", "Track your earnings", "Withdraw funds"]
    }
  ];

  const consumerGuides = [
    {
      icon: "👤",
      title: "Create Your Account",
      description: "Sign up as a consumer and set your delivery preferences.",
      steps: ["Click on 'Sign Up'", "Select 'Consumer' role", "Add delivery address", "Verify your email"]
    },
    {
      icon: "🔍",
      title: "Browse Products",
      description: "Explore fresh products from local farmers in your area.",
      steps: ["Visit the marketplace", "Use filters and search", "Check product details", "View farmer profiles"]
    },
    {
      icon: "🛒",
      title: "Place Orders",
      description: "Add products to cart and checkout securely.",
      steps: ["Add items to cart", "Review your order", "Choose delivery time", "Complete payment"]
    },
    {
      icon: "⭐",
      title: "Leave Reviews",
      description: "Share your experience and help the community grow.",
      steps: ["Receive your order", "Rate the products", "Write a review", "Help others decide"]
    }
  ];

  const faqs = [
    {
      question: "How does AgriConnect ensure product quality?",
      answer: "All farmers on our platform are verified. We encourage transparent communication between farmers and consumers. Our review system helps maintain quality standards."
    },
    {
      question: "What are the delivery options?",
      answer: "Delivery options vary by farmer and location. Most farmers offer local delivery or pickup options. Check individual product listings for specific delivery details."
    },
    {
      question: "How do I contact a farmer directly?",
      answer: "You can message farmers through our platform after placing an order. Each product listing also shows the farmer's profile with contact options."
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept various payment methods including credit/debit cards, UPI, and digital wallets. All transactions are secure and encrypted."
    },
    {
      question: "Can I return products if I'm not satisfied?",
      answer: "Return policies vary by farmer. Most farmers offer returns for damaged or incorrect items. Contact the farmer directly through our platform to resolve any issues."
    },
    {
      question: "How do farmers benefit from AgriConnect?",
      answer: "Farmers get direct access to consumers, eliminating middlemen. They set their own prices, manage their inventory, and build direct customer relationships."
    }
  ];

  const guides = activeRole === "farmer" ? farmerGuides : consumerGuides;

  return (
    <div className="py-8 sm:py-12 md:py-16">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 font-poppins">
          Getting Started Guide
        </h1>
        <p className="text-gray-300">Everything you need to know about using AgriConnect</p>
      </div>

      {/* Role Toggle */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveRole("consumer")}
          className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
            activeRole === "consumer"
              ? 'bg-green-600 text-white shadow-2xl shadow-green-500/50 scale-105'
              : 'bg-slate-800/50 text-gray-300 hover:bg-slate-700/50 border border-white/10'
          }`}
        >
          <div className="text-3xl mb-2">🛒</div>
          <div>For Consumers</div>
        </button>
        <button
          onClick={() => setActiveRole("farmer")}
          className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
            activeRole === "farmer"
              ? 'bg-blue-600 text-white shadow-2xl shadow-blue-500/50 scale-105'
              : 'bg-slate-800/50 text-gray-300 hover:bg-slate-700/50 border border-white/10'
          }`}
        >
          <div className="text-3xl mb-2">👨‍🌾</div>
          <div>For Farmers</div>
        </button>
      </div>

      {/* Step-by-Step Guides */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">Step-by-Step Guide</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {guides.map((guide, index) => (
            <div
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 shadow-2xl hover:shadow-green-500/20 transition-all duration-300 border border-white/10 hover:scale-105"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="text-5xl">{guide.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-brandGreen text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </span>
                    <h3 className="text-xl font-semibold text-white">{guide.title}</h3>
                  </div>
                  <p className="text-gray-300 mb-4">{guide.description}</p>
                </div>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-4 border border-white/10">
                <div className="space-y-2">
                  {guide.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <span className="text-sm text-gray-300">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Tutorial Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 mb-12 text-white shadow-2xl">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-6xl mb-4">🎥</div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Video Tutorials</h2>
          <p className="text-lg mb-6 opacity-90">
            Watch our comprehensive video guides to learn how to make the most of AgriConnect
          </p>
          <button className="bg-white text-green-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105">
            Watch Tutorials
          </button>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-2xl border border-white/10 overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-700/50 transition-colors"
              >
                <span className="font-semibold text-white text-left">{faq.question}</span>
                <span className={`text-white text-2xl transition-transform duration-300 ${expandedFaq === index ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              {expandedFaq === index && (
                <div className="px-6 pb-4 text-gray-300">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Tips Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 shadow-2xl border border-white/10">
          <div className="text-4xl mb-3">💡</div>
          <h3 className="font-semibold text-white mb-2">Pro Tips</h3>
          <p className="text-sm text-gray-300">
            {activeRole === "farmer" 
              ? "Update your inventory regularly and respond to customer queries promptly for better ratings."
              : "Check product reviews and farmer ratings before ordering. Build relationships with your favorite farmers."}
          </p>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 shadow-2xl border border-white/10">
          <div className="text-4xl mb-3">🔒</div>
          <h3 className="font-semibold text-white mb-2">Stay Safe</h3>
          <p className="text-sm text-gray-300">
            Always use our secure platform for transactions. Never share personal financial information outside the platform.
          </p>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 shadow-2xl border border-white/10">
          <div className="text-4xl mb-3">📞</div>
          <h3 className="font-semibold text-white mb-2">Need Help?</h3>
          <p className="text-sm text-gray-300">
            Our support team is available 24/7. Contact us through the help center or email support@agriconnect.com
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/10 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Ready to Get Started?</h2>
        <p className="text-gray-300 mb-6">
          Join thousands of {activeRole === "farmer" ? "farmers" : "consumers"} already using AgriConnect
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/auth/signup" className="bg-green-600 text-white px-8 py-3 rounded-xl hover:bg-green-700 transition-all duration-300 shadow-2xl hover:shadow-green-500/50 font-semibold text-center">
            Sign Up Now
          </Link>
          <Link href="/support" className="bg-slate-700/50 text-green-400 border-2 border-green-500 px-8 py-3 rounded-xl hover:bg-green-600 hover:text-white transition-all duration-300 font-semibold text-center">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
