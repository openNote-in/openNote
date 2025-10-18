import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Scale, Shield, AlertTriangle } from 'lucide-react';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8">
            <Scale className="w-4 h-4 mr-2" />
            Legal Document
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Terms of
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Service
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
                <BookOpen className="w-6 h-6 mr-2 text-blue-400" />
                1. Introduction
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Welcome to openNote ("we," "our," or "us"). These Terms of Service ("Terms") govern your use of our website and services located at opennote-aktu.com (the "Service") operated by openNote.
              </p>
              <p className="text-gray-300 leading-relaxed">
                By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of these terms, then you may not access the Service.
              </p>
            </section>

            {/* Acceptance of Terms */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">2. Acceptance of Terms</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                By creating an account or using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy.
              </p>
              <p className="text-gray-300 leading-relaxed">
                These Terms apply to all visitors, users, and others who access or use the Service.
              </p>
            </section>

            {/* User Responsibilities */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Shield className="w-6 h-6 mr-2 text-green-400" />
                3. User Responsibilities
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">As a user of openNote, you agree to:</p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                <li>Provide accurate and complete information when creating your account</li>
                <li>Maintain the security of your account credentials</li>
                <li>Use the Service only for lawful purposes and in accordance with these Terms</li>
                <li>Respect the intellectual property rights of others</li>
                <li>Not share your premium account access with others</li>
                <li>Report any unauthorized use of your account immediately</li>
              </ul>
            </section>

            {/* Prohibited Activities */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <AlertTriangle className="w-6 h-6 mr-2 text-red-400" />
                4. Prohibited Activities
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">You may not use our Service to:</p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe upon the rights of others</li>
                <li>Upload or distribute malicious software or content</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Share, distribute, or resell premium content</li>
                <li>Use automated systems to access the Service without permission</li>
                <li>Engage in any activity that disrupts or interferes with the Service</li>
              </ul>
            </section>

            {/* Intellectual Property */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">5. Intellectual Property</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                The Service and its original content, features, and functionality are and will remain the exclusive property of openNote and its licensors. The Service is protected by copyright, trademark, and other laws.
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">
                Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Premium content is provided for personal, educational use only and may not be redistributed, shared, or used for commercial purposes.
              </p>
            </section>

            {/* Premium Services */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">6. Premium Services</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Some parts of the Service are billed on a subscription basis ("Premium Services"). You will be billed in advance on a recurring and periodic basis ("Billing Cycle").
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">
                Premium content is accessible only through our secure platform and cannot be downloaded. Sharing premium account access is strictly prohibited.
              </p>
              <p className="text-gray-300 leading-relaxed">
                You may cancel your subscription at any time. Upon cancellation, you will continue to have access to Premium Services until the end of your current billing period.
              </p>
            </section>

            {/* Limitation of Liability */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">7. Limitation of Liability</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                In no event shall openNote, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the Service.
              </p>
              <p className="text-gray-300 leading-relaxed">
                We do not guarantee the accuracy, completeness, or usefulness of any information on the Service, and we are not responsible for any errors or omissions in the content.
              </p>
            </section>

            {/* Disclaimer */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">8. Disclaimer</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                The information on this Service is provided on an "as is" basis. To the fullest extent permitted by law, this Company excludes all representations, warranties, conditions and terms.
              </p>
              <p className="text-gray-300 leading-relaxed">
                openNote is not officially affiliated with AKTU (Abdul Kalam Technical University). We are an independent platform created by students for students.
              </p>
            </section>

            {/* Changes to Terms */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">9. Changes to Terms</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
              </p>
              <p className="text-gray-300 leading-relaxed">
                What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">10. Contact Information</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-gray-700/30 border border-gray-600/50 rounded-lg p-4">
                <p className="text-gray-300 mb-2"><strong>Email:</strong> legal@opennote-aktu.com</p>
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
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Terms;