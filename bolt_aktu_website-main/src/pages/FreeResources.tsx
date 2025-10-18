import React from 'react';
import { ArrowRight, Download, BookOpen, FileText, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const FreeResources = () => {
  const resources = [
    {
      icon: FileText,
      title: 'AKTU Syllabus 2025',
      description: 'Complete updated syllabus for all branches including CSE, IT, and ECE.',
      features: ['Latest curriculum', 'Subject-wise breakdown', 'Credit distribution', 'Examination pattern'],
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: BookOpen,
      title: 'Previous Year Papers',
      description: 'Comprehensive collection of previous year question papers for better exam preparation.',
      features: ['Last 5 years papers', 'Branch-specific papers', 'Semester-wise organized', 'High-quality scans'],
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: BookOpen,
      title: 'Quantum Series Books',
      description: 'Popular Quantum series PDFs covering all major subjects for AKTU students.',
      features: ['Subject-wise books', 'Easy to understand', 'Exam-focused content', 'Regularly updated'],
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: FileText,
      title: 'Notes',
      description: 'Comprehensive study notes covering key topics and concepts for all subjects.',
      features: ['Topic-wise organization', 'Easy to understand', 'Exam-focused content', 'Student-friendly format'],
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium mb-8">
            <Download className="w-4 h-4 mr-2" />
            Free Resources
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Free Study Materials for
            <span className="block bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              AKTU Students
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Access high-quality study materials completely free. No hidden charges, no subscriptions required.
            Start your AKTU journey with our comprehensive resource library.
          </p>
          
          <Link
            to="/dashboard"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 hover:scale-105"
          >
            <span>Access Free Resources</span>
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>

        {/* Resources Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <div
                key={index}
                className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-8 hover:bg-gray-800/50 transition-all duration-300 hover:scale-105 group"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${resource.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-green-500/25 transition-all duration-300`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{resource.title}</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">{resource.description}</p>
                <ul className="space-y-2 mb-8">
                  {resource.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-300 text-sm">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/dashboard"
                  className={`block w-full py-3 px-6 bg-gradient-to-r ${resource.gradient} text-white rounded-lg font-semibold text-center hover:shadow-lg transition-all duration-300 hover:scale-105`}
                >
                  Access Now
                </Link>
              </div>
            );
          })}
        </div>

        {/* How It Works Section */}
        <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-8 lg:p-12 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How to Access Free Resources</h2>
            <p className="text-lg text-gray-400">Simple steps to get started with your study materials</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Create Account', description: 'Sign up for free with your email' },
              { step: '2', title: 'Choose Your Path', description: 'Select year, branch, and subject' },
              { step: '3', title: 'Browse Resources', description: 'Explore available study materials' },
              { step: '4', title: 'Download & Study', description: 'Download PDFs and start learning' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">Why Choose Our Free Resources?</h2>
            <div className="space-y-6">
              {[
                {
                  title: 'Always Updated',
                  description: 'Content is regularly updated according to the latest AKTU syllabus and exam patterns.'
                },
                {
                  title: 'High Quality',
                  description: 'All PDFs are high-resolution, clearly readable, and properly organized for easy navigation.'
                },
                {
                  title: 'No Restrictions',
                  description: 'Download unlimited resources with no daily limits or time restrictions.'
                },
                {
                  title: 'Community Driven',
                  description: 'Resources contributed and verified by successful AKTU students and graduates.'
                }
              ].map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">{benefit.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/5940831/pexels-photo-5940831.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Students studying"
              className="rounded-2xl shadow-2xl w-full"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-green-500/20 to-transparent rounded-2xl"></div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl p-8 lg:p-12">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Learning?</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of AKTU students who are already using our free resources to excel in their studies.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/dashboard"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/dashboard"
              className="w-full sm:w-auto px-8 py-4 border border-gray-600 text-gray-300 rounded-xl font-semibold text-lg hover:border-gray-500 hover:text-white transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Users className="w-5 h-5" />
              <span>Browse Resources</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeResources;