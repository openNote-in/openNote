import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, HelpCircle } from 'lucide-react';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const faqs = [
    {
      category: 'General',
      questions: [
        {
          question: 'What is openNote?',
          answer: 'openNote is a comprehensive study platform designed specifically for AKTU (Abdul Kalam Technical University) students. We provide both free and premium study resources including syllabus, previous year papers, quantum books, and expert-curated content to help students excel in their B.Tech journey.'
        },
        {
          question: 'Which branches are supported?',
          answer: 'Currently, we support three major branches: Computer Science and Engineering (CSE), Information Technology (IT), and Electronics and Communication Engineering (ECE). These are the most popular branches among AKTU students.'
        },
        {
          question: 'Is openNote officially affiliated with AKTU?',
          answer: 'openNote is an independent platform created by AKTU students for AKTU students. While we are not officially affiliated with the university, all our content is carefully curated to align with AKTU syllabus and examination patterns.'
        }
      ]
    },
    {
      category: 'Free Resources',
      questions: [
        {
          question: 'What free resources are available?',
          answer: 'Our free resources include: Complete AKTU Syllabus 2025, Previous Year Question Papers for all supported branches, Quantum Series Books in PDF format, and basic study materials. All free content can be downloaded without any restrictions.'
        },
        {
          question: 'Do I need to create an account for free resources?',
          answer: 'Yes, you need to create a free account to access our resources. This helps us organize content better and provide you with a personalized dashboard experience.'
        },
        {
          question: 'Are free resources really free forever?',
          answer: 'Absolutely! Our free resources will always remain free. We believe in making basic study materials accessible to all AKTU students without any cost.'
        }
      ]
    },
    {
      category: 'Premium Resources',
      questions: [
        {
          question: 'What makes premium content different?',
          answer: 'Premium content includes detailed solutions to PYQs with step-by-step explanations, expert-created study notes by AKTU toppers, curated content verified by subject experts, and exclusive materials not available elsewhere. All premium content is viewable only within our secure platform.'
        },
        {
          question: 'Why can\'t I download premium content?',
          answer: 'Premium content is protected with our secure viewing system to maintain intellectual property rights and ensure the exclusive nature of the content. This approach helps us provide high-quality, expert-created materials while supporting the content creators fairly.'
        },
        {
          question: 'How much does premium access cost?',
          answer: 'Premium access costs ₹299 per semester. This gives you unlimited access to all premium content including detailed PYQ solutions, expert notes, and priority customer support.'
        },
        {
          question: 'Can I cancel my premium subscription?',
          answer: 'Yes, you can cancel your premium subscription at any time. You will continue to have access to premium content until the end of your current billing period.'
        }
      ]
    },
    {
      category: 'Technical',
      questions: [
        {
          question: 'What is the single device login restriction?',
          answer: 'To maintain security and prevent account sharing, premium accounts can only be logged in from one device at a time. If you log in from a new device, you will be automatically logged out from the previous device.'
        },
        {
          question: 'How does the secure PDF viewer work?',
          answer: 'Our secure PDF viewer allows you to read premium content within the platform with features like zoom, rotation, and page navigation. The content is watermarked and cannot be downloaded or shared, ensuring copyright protection.'
        },
        {
          question: 'Is the platform mobile-friendly?',
          answer: 'Yes, openNote is fully responsive and works seamlessly on all devices including smartphones, tablets, and desktops. Our PDF viewer is optimized for mobile reading as well.'
        },
        {
          question: 'What if I face technical issues?',
          answer: 'Premium users get priority technical support. You can contact us through the contact form or email, and we typically respond within 2-4 hours during business hours. Free users can also reach out, and we respond within 24 hours.'
        }
      ]
    },
    {
      category: 'Account & Payment',
      questions: [
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major payment methods including credit/debit cards, UPI, net banking, and popular digital wallets. All payments are processed through secure payment gateways.'
        },
        {
          question: 'Is my payment information secure?',
          answer: 'Yes, we use industry-standard encryption and work with trusted payment processors. We do not store your payment information on our servers.'
        },
        {
          question: 'How do I reset my password?',
          answer: 'You can reset your password by clicking on "Forgot Password" on the login page. We will send you a secure reset link to your registered email address.'
        },
        {
          question: 'Can I change my email address?',
          answer: 'Yes, you can update your email address from your account settings. You will need to verify the new email address before the change takes effect.'
        }
      ]
    }
  ];

  const allQuestions = faqs.flatMap(category => 
    category.questions.map(q => ({
      ...q,
      category: category.category
    }))
  );

  const filteredQuestions = allQuestions.filter(
    faq =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8">
            <HelpCircle className="w-4 h-4 mr-2" />
            Frequently Asked Questions
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            How Can We
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Help You?
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Find answers to common questions about openNote, our resources, premium features, and account management.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search FAQ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
          </div>
        </div>

        {/* FAQ Content */}
        <div className="max-w-4xl mx-auto">
          {searchTerm ? (
            // Filtered Results
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white mb-6">
                Search Results ({filteredQuestions.length})
              </h2>
              {filteredQuestions.length > 0 ? (
                filteredQuestions.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-gray-800/30 border border-gray-700/50 rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full text-left p-6 hover:bg-gray-800/50 transition-all duration-300 flex items-center justify-between"
                    >
                      <div>
                        <div className="text-sm text-blue-400 mb-1">{faq.category}</div>
                        <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
                      </div>
                      {openFAQ === index ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                    {openFAQ === index && (
                      <div className="px-6 pb-6">
                        <div className="text-gray-300 leading-relaxed">{faq.answer}</div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <HelpCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-400 mb-2">No results found</h3>
                  <p className="text-gray-500">Try searching with different keywords.</p>
                </div>
              )}
            </div>
          ) : (
            // Category-wise FAQ
            <div className="space-y-8">
              {faqs.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <h2 className="text-2xl font-bold text-white mb-6">{category.category}</h2>
                  <div className="space-y-4">
                    {category.questions.map((faq, questionIndex) => {
                      const globalIndex = categoryIndex * 10 + questionIndex; // Unique index
                      return (
                        <div
                          key={questionIndex}
                          className="bg-gray-800/30 border border-gray-700/50 rounded-xl overflow-hidden hover:border-gray-600/50 transition-all duration-300"
                        >
                          <button
                            onClick={() => toggleFAQ(globalIndex)}
                            className="w-full text-left p-6 hover:bg-gray-800/50 transition-all duration-300 flex items-center justify-between"
                          >
                            <h3 className="text-lg font-semibold text-white pr-4">{faq.question}</h3>
                            {openFAQ === globalIndex ? (
                              <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                            )}
                          </button>
                          {openFAQ === globalIndex && (
                            <div className="px-6 pb-6 border-t border-gray-700/50">
                              <div className="pt-4 text-gray-300 leading-relaxed">{faq.answer}</div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-16 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-8 lg:p-12 max-w-4xl mx-auto">
          <HelpCircle className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-6">Still Have Questions?</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Can't find the answer you're looking for? Our support team is here to help you with any questions about openNote.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105"
            >
              Contact Support
            </a>
            <a
              href="mailto:support@opennote-aktu.com"
              className="w-full sm:w-auto px-8 py-4 border border-gray-600 text-gray-300 rounded-xl font-semibold text-lg hover:border-gray-500 hover:text-white transition-all duration-300 hover:scale-105"
            >
              Email Us Directly
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;