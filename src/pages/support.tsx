import { useState } from 'react';
import Link from 'next/link';

export default function Support() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    priority: 'medium'
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send to an API
    console.log('Support request:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        priority: 'medium'
      });
    }, 3000);
  };

  return (
    <div className="py-8 sm:py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 font-poppins">
            Contact Support
          </h1>
          <p className="text-gray-300 text-lg">
            We&apos;re here to help! Get in touch with our support team.
          </p>
        </div>

        {/* Success Message */}
        {submitted && (
          <div className="bg-green-500/10 border border-green-500/50 text-green-400 px-6 py-4 rounded-lg mb-8 text-center">
            ✓ Your message has been sent! We&apos;ll get back to you within 24 hours.
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-white/20 bg-slate-700/50 text-white placeholder-gray-400 rounded-lg focus:border-green-500 focus:outline-none"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-white/20 bg-slate-700/50 text-white placeholder-gray-400 rounded-lg focus:border-green-500 focus:outline-none"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-white/20 bg-slate-700/50 text-white placeholder-gray-400 rounded-lg focus:border-green-500 focus:outline-none"
                      placeholder="1234567890"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Priority</label>
                    <select
                      value={formData.priority}
                      onChange={(e) => setFormData({...formData, priority: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-white/20 bg-slate-700/50 text-white rounded-lg focus:border-green-500 focus:outline-none"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Subject *</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-white/20 bg-slate-700/50 text-white placeholder-gray-400 rounded-lg focus:border-green-500 focus:outline-none"
                    placeholder="How can we help you?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Message *</label>
                  <textarea
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-white/20 bg-slate-700/50 text-white placeholder-gray-400 rounded-lg focus:border-green-500 focus:outline-none resize-none"
                    placeholder="Please describe your issue or question in detail..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-3 px-6 rounded-xl hover:bg-green-700 transition-all duration-300 font-semibold shadow-2xl hover:shadow-green-500/50 hover:scale-105"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            {/* Quick Contact */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">Quick Contact</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📧</span>
                  <div>
                    <div className="font-medium text-gray-300">Email</div>
                    <a href="mailto:support@agriconnect.com" className="text-green-400 hover:text-green-300">
                      ragulmadhavans28@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📞</span>
                  <div>
                    <div className="font-medium text-gray-300">Phone</div>
                    <a href="tel:+911234567890" className="text-green-400 hover:text-green-300">
                      +91 9047693022
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">⏰</span>
                  <div>
                    <div className="font-medium text-gray-300">Hours</div>
                    <div className="text-sm text-gray-400">24/7 Support Available</div>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQs Link */}
            <div className="bg-gradient-to-br from-green-600 to-blue-600 rounded-2xl p-6 shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-2">Check our FAQs</h3>
              <p className="text-white/90 text-sm mb-4">
                Find quick answers to common questions
              </p>
              <Link
                href="/guidance"
                className="inline-block bg-white text-green-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                View FAQs
              </Link>
            </div>

            {/* Emergency Contact */}
            <div className="bg-red-500/10 border-2 border-red-500/30 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-red-400 mb-2">🚨 Emergency?</h3>
              <p className="text-gray-300 text-sm mb-3">
                For urgent issues, call us directly:
              </p>
              <a
                href="tel:+911800123456"
                className="block text-center bg-red-500 text-white px-4 py-3 rounded-lg font-bold hover:bg-red-600 transition-colors"
              >
                1800-123-456 (Toll Free)
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
