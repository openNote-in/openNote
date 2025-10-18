import React from 'react';
import { Check, ArrowRight, BookOpen, Lock, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Pricing = () => {
  const plans = [
    {
      name: 'Free',
      price: '₹0',
      period: 'Forever',
      description: 'Perfect for getting started with basic AKTU resources',
      features: [
        'Complete AKTU Syllabus 2025',
        'Previous Year Question Papers',
        'Quantum Series Books',
        'Basic study materials',
        'Community support',
        'Mobile-friendly access'
      ],
      cta: 'Get Started Free',
      ctaLink: '/register',
      gradient: 'from-green-500 to-emerald-500',
      popular: false
    },
    {
      name: 'Premium',
      price: '₹299',
      period: 'Per Semester',
      description: 'Unlock exclusive content and expert-curated materials',
      features: [
        'Everything in Free plan',
        'Detailed PYQ solutions with explanations',
        'Expert-reviewed study notes',
        'Curated content by AKTU toppers',
        'Secure in-platform PDF viewer',
        'Priority customer support',
        'Regular content updates',
        'Single device restriction for security'
      ],
      cta: 'Upgrade to Premium',
      ctaLink: '/register',
      gradient: 'from-purple-500 to-pink-500',
      popular: true
    }
  ];

  const faqs = [
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major payment methods including credit/debit cards, UPI, net banking, and digital wallets through our secure payment gateway.'
    },
    {
      question: 'Can I cancel my premium subscription anytime?',
      answer: 'Yes, you can cancel your premium subscription at any time. You will continue to have access to premium content until the end of your current billing period.'
    },
    {
      question: 'Is the premium content really worth it?',
      answer: 'Our premium content is created by AKTU toppers and verified by subject experts. It includes detailed solutions, explanations, and curated notes that significantly improve exam performance.'
    },
    {
      question: 'Why can\'t I download premium content?',
      answer: 'Premium content is viewable only within our secure platform to protect intellectual property rights and maintain the exclusive nature of the content.'
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8">
            <Zap className="w-4 h-4 mr-2" />
            Simple Pricing
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Choose Your
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Learning Plan
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Start with free resources or unlock premium content for comprehensive AKTU exam preparation.
            No hidden fees, no complicated tiers.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-gray-800/30 border rounded-2xl p-8 hover:bg-gray-800/50 transition-all duration-300 hover:scale-105 ${
                plan.popular 
                  ? 'border-purple-500/50 shadow-lg shadow-purple-500/10' 
                  : 'border-gray-700/50'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400 ml-2">/ {plan.period}</span>
                </div>
                <p className="text-gray-400 leading-relaxed">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <div className={`w-6 h-6 bg-gradient-to-r ${plan.gradient} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-300 leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                to={plan.ctaLink}
                className={`block w-full py-4 px-6 bg-gradient-to-r ${plan.gradient} text-white rounded-xl font-semibold text-center hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2`}
              >
                <span>{plan.cta}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        {/* Features Comparison */}
        <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-8 lg:p-12 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Upgrade to Premium?</h2>
            <p className="text-lg text-gray-400">
              Unlock advanced features and exclusive content for better exam performance
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                title: 'Expert Content',
                description: 'Access notes and solutions created by AKTU toppers and subject experts.',
                gradient: 'from-blue-500 to-cyan-500'
              },
              {
                icon: Shield,
                title: 'Secure Access',
                description: 'Premium content protected with advanced security and exclusive platform access.',
                gradient: 'from-purple-500 to-pink-500'
              },
              {
                icon: Lock,
                title: 'Exclusive Materials',
                description: 'Curated PYQ solutions and study materials not available anywhere else.',
                gradient: 'from-green-500 to-emerald-500'
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-400">
              Everything you need to know about our pricing and plans
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">{faq.question}</h3>
                <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-8 lg:p-12">
          <h2 className="text-3xl font-bold mb-6">Start Your AKTU Success Journey</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Choose the plan that fits your needs and start accessing quality study materials today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
            >
              <span>Start Free Today</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/dashboard"
              className="w-full sm:w-auto px-8 py-4 border border-gray-600 text-gray-300 rounded-xl font-semibold text-lg hover:border-gray-500 hover:text-white transition-all duration-300 hover:scale-105"
            >
              Browse Resources
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;