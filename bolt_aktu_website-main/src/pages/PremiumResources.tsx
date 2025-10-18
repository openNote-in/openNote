import React from 'react';
import { ArrowRight, Lock, BookOpen, Eye, Shield, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const PremiumResources = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Curated PYQ Solutions',
      description: 'Step-by-step solutions to previous year questions with detailed explanations and marking schemes.',
      highlights: ['Expert-verified solutions', 'Marking scheme included', 'Topic-wise organization', 'Latest exam patterns']
    },
    {
      icon: Eye,
      title: 'Exclusive Study Notes',
      description: 'Comprehensive notes created by AKTU toppers and verified by subject experts.',
      highlights: ['Topper-created content', 'Subject expert reviewed', 'Exam-focused approach', 'Easy to understand']
    },
    {
      icon: Shield,
      title: 'Secure Platform',
      description: 'All premium content is viewable only within our secure platform with advanced protection.',
      highlights: ['No downloads allowed', 'Watermarked content', 'Single device login', 'Copyright protected']
    }
  ];

  const benefits = [
    'Access to premium PYQ solutions with detailed explanations',
    'Exclusive study notes created by AKTU toppers',
    'Priority customer support and doubt resolution',
    'Regular content updates and new additions',
    'Secure in-platform viewing with no download restrictions',
    'Mobile-optimized PDF viewer for study on the go'
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-8">
            <Lock className="w-4 h-4 mr-2" />
            Premium Resources
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Unlock Premium Study
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Materials & Solutions
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Get exclusive access to curated content, detailed PYQ solutions, and expert-created notes 
            that guarantee better exam performance and deeper understanding.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/dashboard"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Lock className="w-5 h-5" />
              <span>Access Premium Content</span>
            </Link>
            <Link
              to="/pricing"
              className="w-full sm:w-auto px-8 py-4 border border-purple-500/50 text-purple-400 rounded-xl font-semibold text-lg hover:border-purple-400 hover:text-purple-300 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
            >
              <span>View Pricing</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-8 hover:bg-gray-800/50 transition-all duration-300 hover:scale-105 group"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-center text-gray-300 text-sm">
                      <Star className="w-4 h-4 text-yellow-400 mr-3 flex-shrink-0" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Security Section */}
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-8 lg:p-12 mb-16">
          <div className="text-center mb-8">
            <Shield className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Secure Platform Access</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Our premium content is protected with advanced security measures to ensure copyright compliance and exclusive access.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Security Features</h3>
              <ul className="space-y-3">
                {[
                  'In-platform viewing only - no downloads',
                  'Watermarked content for protection',
                  'Single device login restriction',
                  'Session timeout for security',
                  'Encrypted content delivery'
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Why This Approach?</h3>
              <ul className="space-y-3">
                {[
                  'Protects intellectual property rights',
                  'Ensures content remains exclusive',
                  'Prevents unauthorized distribution',
                  'Maintains premium value for users',
                  'Supports content creators fairly'
                ].map((item, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-pink-400 rounded-full mr-3"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">Premium Benefits</h2>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <p className="text-gray-300 leading-relaxed">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/5940840/pexels-photo-5940840.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Student studying with premium resources"
              className="rounded-2xl shadow-2xl w-full"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-transparent rounded-2xl"></div>
            <div className="absolute top-4 left-4 bg-purple-500/20 backdrop-blur-xl border border-purple-500/30 rounded-lg p-3">
              <Lock className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </div>

        {/* Comparison Section */}
        <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-8 lg:p-12 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Free vs Premium Resources</h2>
            <p className="text-lg text-gray-400">See what's included in our premium offering</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-700/30 border border-gray-600/50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-green-400 mb-4 flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                Free Resources
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center"><div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>AKTU Syllabus</li>
                <li className="flex items-center"><div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>Previous Year Papers</li>
                <li className="flex items-center"><div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>Quantum Series Books</li>
                <li className="flex items-center"><div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>Basic Study Materials</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-purple-400 mb-4 flex items-center">
                <Lock className="w-5 h-5 mr-2" />
                Premium Resources
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center"><div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>Everything in Free +</li>
                <li className="flex items-center"><div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>Detailed PYQ Solutions</li>
                <li className="flex items-center"><div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>Expert-Created Notes</li>
                <li className="flex items-center"><div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>Secure Platform Access</li>
                <li className="flex items-center"><div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>Priority Support</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-8 lg:p-12">
          <h2 className="text-3xl font-bold mb-6">Ready to Upgrade Your Study Experience?</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Join premium members who are achieving better grades with our expert-curated content and detailed solutions.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/pricing"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
            >
              <span>View Pricing Plans</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/dashboard"
              className="w-full sm:w-auto px-8 py-4 border border-gray-600 text-gray-300 rounded-xl font-semibold text-lg hover:border-gray-500 hover:text-white transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Eye className="w-5 h-5" />
              <span>Preview Content</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumResources;