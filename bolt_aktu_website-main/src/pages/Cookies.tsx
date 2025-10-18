import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Cookie, Settings, Eye, BarChart3, Target, Shield } from 'lucide-react';

const Cookies = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-8">
            <Cookie className="w-4 h-4 mr-2" />
            Cookie Information
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Cookie
            <span className="block bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
              Policy
            </span>
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            Last updated: January 10, 2025
          </p>
        </div>

        {/* Content */}
        <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-8 lg:p-12 mb-8">
          <div className="prose prose-invert max-w-none">
            
            {/* What are Cookies */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Cookie className="w-6 h-6 mr-2 text-orange-400" />
                1. What are Cookies?
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and to provide information to website owners.
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">
                Cookies contain information that is transferred to your computer's hard drive. They help us improve your experience by remembering your preferences and understanding how you use our website.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Most web browsers automatically accept cookies, but you can usually modify your browser settings to decline cookies if you prefer.
              </p>
            </section>

            {/* How We Use Cookies */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Eye className="w-6 h-6 mr-2 text-blue-400" />
                2. How We Use Cookies
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                openNote uses cookies for several purposes to enhance your browsing experience and improve our services:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-700/30 border border-gray-600/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-green-400" />
                    Essential Cookies
                  </h3>
                  <p className="text-gray-300 text-sm">
                    Required for the website to function properly, including authentication and security features.
                  </p>
                </div>
                
                <div className="bg-gray-700/30 border border-gray-600/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-purple-400" />
                    Analytics Cookies
                  </h3>
                  <p className="text-gray-300 text-sm">
                    Help us understand how visitors interact with our website by collecting anonymous information.
                  </p>
                </div>
                
                <div className="bg-gray-700/30 border border-gray-600/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                    <Settings className="w-5 h-5 mr-2 text-blue-400" />
                    Preference Cookies
                  </h3>
                  <p className="text-gray-300 text-sm">
                    Remember your settings and preferences to provide a personalized experience.
                  </p>
                </div>
                
                <div className="bg-gray-700/30 border border-gray-600/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-red-400" />
                    Marketing Cookies
                  </h3>
                  <p className="text-gray-300 text-sm">
                    Used to deliver relevant advertisements and track the effectiveness of our marketing campaigns.
                  </p>
                </div>
              </div>
            </section>

            {/* Types of Cookies */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">3. Types of Cookies We Use</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Session Cookies</h3>
                  <p className="text-gray-300 leading-relaxed mb-2">
                    These are temporary cookies that are deleted when you close your browser. They help us:
                  </p>
                  <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                    <li>Maintain your login session</li>
                    <li>Remember items in your cart</li>
                    <li>Ensure website security</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Persistent Cookies</h3>
                  <p className="text-gray-300 leading-relaxed mb-2">
                    These cookies remain on your device for a set period or until you delete them. They help us:
                  </p>
                  <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                    <li>Remember your preferences and settings</li>
                    <li>Provide personalized content</li>
                    <li>Analyze website usage patterns</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Third-Party Cookies</h3>
                  <p className="text-gray-300 leading-relaxed mb-2">
                    These are set by external services we use, such as:
                  </p>
                  <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                    <li>Google Analytics for website analytics</li>
                    <li>Social media platforms for sharing features</li>
                    <li>Payment processors for secure transactions</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Managing Cookies */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Settings className="w-6 h-6 mr-2 text-green-400" />
                4. Managing Cookies
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                You have several options for managing cookies on our website:
              </p>
              
              <h3 className="text-xl font-semibold text-white mb-3">Browser Settings</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Most web browsers allow you to control cookies through their settings. You can:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
                <li>Block all cookies</li>
                <li>Block third-party cookies only</li>
                <li>Delete existing cookies</li>
                <li>Set your browser to notify you when cookies are being sent</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-white mb-3">Cookie Consent</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                When you first visit our website, you'll see a cookie consent banner. You can:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                <li>Accept all cookies</li>
                <li>Customize your cookie preferences</li>
                <li>Reject non-essential cookies</li>
              </ul>
              
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-4">
                <p className="text-yellow-300 text-sm">
                  <strong>Note:</strong> Disabling certain cookies may affect the functionality of our website and your user experience.
                </p>
              </div>
            </section>

            {/* Opt-out Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">5. Opt-out Information</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                You can opt out of specific types of cookies and tracking:
              </p>
              
              <div className="space-y-4">
                <div className="bg-gray-700/30 border border-gray-600/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Google Analytics</h3>
                  <p className="text-gray-300 text-sm mb-2">
                    To opt out of Google Analytics tracking, you can install the Google Analytics Opt-out Browser Add-on.
                  </p>
                  <a 
                    href="https://tools.google.com/dlpage/gaoptout" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 text-sm underline"
                  >
                    Download Google Analytics Opt-out Add-on
                  </a>
                </div>
                
                <div className="bg-gray-700/30 border border-gray-600/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Advertising Cookies</h3>
                  <p className="text-gray-300 text-sm mb-2">
                    You can opt out of personalized advertising by visiting:
                  </p>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• <a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">Digital Advertising Alliance</a></li>
                    <li>• <a href="http://www.youronlinechoices.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">Your Online Choices</a></li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Updates to Cookie Policy */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">6. Updates to This Cookie Policy</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons.
              </p>
              <p className="text-gray-300 leading-relaxed">
                We will notify you of any significant changes by posting the updated policy on our website and updating the "Last updated" date at the top of this page.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">7. Contact Us</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                If you have any questions about our use of cookies or this Cookie Policy, please contact us:
              </p>
              <div className="bg-gray-700/30 border border-gray-600/50 rounded-lg p-4">
                <p className="text-gray-300 mb-2"><strong>Email:</strong> cookies@opennote-aktu.com</p>
                <p className="text-gray-300 mb-2"><strong>Address:</strong> Lucknow, Uttar Pradesh, India</p>
                <p className="text-gray-300"><strong>Website:</strong> opennote-aktu.com</p>
              </div>
            </section>

          </div>
        </div>

        {/* Back to Home Button */}
        <div className="text-center">
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cookies;