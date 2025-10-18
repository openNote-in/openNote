import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Eye, Lock, Database, UserCheck, Globe } from 'lucide-react';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium mb-8">
            <Shield className="w-4 h-4 mr-2" />
            Privacy & Security
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Privacy
            <span className="block bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
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
            
            {/* Introduction */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Eye className="w-6 h-6 mr-2 text-blue-400" />
                1. Introduction
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                At openNote, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
              </p>
            </section>

            {/* Data We Collect */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Database className="w-6 h-6 mr-2 text-purple-400" />
                2. Data We Collect
              </h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">Personal Information</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
                <li>Register for an account</li>
                <li>Subscribe to our premium services</li>
                <li>Contact us with questions or feedback</li>
                <li>Participate in surveys or promotions</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">Information Collected Automatically</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                When you visit our website, we may automatically collect certain information about your device, including:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                <li>IP address and location data</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Pages visited and time spent on our site</li>
                <li>Referring website addresses</li>
              </ul>
            </section>

            {/* How We Use Your Data */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <UserCheck className="w-6 h-6 mr-2 text-green-400" />
                3. How We Use Your Data
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                <li>Provide, operate, and maintain our services</li>
                <li>Process your transactions and manage your account</li>
                <li>Send you technical notices and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Improve our website and services</li>
                <li>Analyze usage patterns and trends</li>
                <li>Prevent fraudulent activities and enhance security</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            {/* Sharing of Data */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">4. Sharing of Data</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                <li><strong>Service Providers:</strong> We may share information with trusted third-party service providers who assist us in operating our website and services</li>
                <li><strong>Legal Requirements:</strong> We may disclose information when required by law or to protect our rights and safety</li>
                <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred</li>
                <li><strong>With Your Consent:</strong> We may share information for any other purpose with your explicit consent</li>
              </ul>
            </section>

            {/* Cookies & Tracking */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Globe className="w-6 h-6 mr-2 text-orange-400" />
                5. Cookies & Tracking Technologies
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We use cookies and similar tracking technologies to enhance your experience on our website. Cookies are small data files stored on your device.
              </p>
              
              <h3 className="text-xl font-semibold text-white mb-3">Types of Cookies We Use:</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
              </ul>
              
              <p className="text-gray-300 leading-relaxed">
                You can control cookies through your browser settings. However, disabling certain cookies may affect the functionality of our website.
              </p>
            </section>

            {/* Data Security */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Lock className="w-6 h-6 mr-2 text-red-400" />
                6. Data Security
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
              </p>
              
              <h3 className="text-xl font-semibold text-white mb-3">Security Measures Include:</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                <li>SSL encryption for data transmission</li>
                <li>Secure servers and databases</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and authentication</li>
                <li>Employee training on data protection</li>
              </ul>
              
              <p className="text-gray-300 leading-relaxed">
                However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
              </p>
            </section>

            {/* Your Rights */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">7. Your Rights</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Depending on your location, you may have the following rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                <li><strong>Access:</strong> Request access to your personal information</li>
                <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Portability:</strong> Request transfer of your data to another service</li>
                <li><strong>Objection:</strong> Object to processing of your personal information</li>
                <li><strong>Restriction:</strong> Request restriction of processing</li>
              </ul>
              
              <p className="text-gray-300 leading-relaxed">
                To exercise these rights, please contact us using the information provided below.
              </p>
            </section>

            {/* Data Retention */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">8. Data Retention</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We retain your personal information only for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required or permitted by law.
              </p>
              <p className="text-gray-300 leading-relaxed">
                When we no longer need your personal information, we will securely delete or anonymize it.
              </p>
            </section>

            {/* Children's Privacy */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">9. Children's Privacy</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Our services are not intended for children under the age of 13. We do not knowingly collect personal information from children under 13.
              </p>
              <p className="text-gray-300 leading-relaxed">
                If you are a parent or guardian and believe your child has provided us with personal information, please contact us so we can delete such information.
              </p>
            </section>

            {/* Changes to Privacy Policy */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">10. Changes to This Privacy Policy</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "Last updated" date.
              </p>
              <p className="text-gray-300 leading-relaxed">
                You are advised to review this privacy policy periodically for any changes. Changes to this privacy policy are effective when they are posted on this page.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">11. Contact Information</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <div className="bg-gray-700/30 border border-gray-600/50 rounded-lg p-4">
                <p className="text-gray-300 mb-2"><strong>Email:</strong> privacy@opennote-aktu.com</p>
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
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Privacy;