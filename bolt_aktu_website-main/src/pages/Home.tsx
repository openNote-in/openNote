import React from 'react';
import { ArrowRight, BookOpen, Zap, Users, Shield, Search, Download, Eye, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Home = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: BookOpen,
      title: 'Comprehensive Resources',
      description: 'Access syllabus, previous year papers, and quantum books for CSE, IT, and ECE branches.'
    },
    {
      icon: Zap,
      title: 'Premium Content',
      description: 'Unlock curated PYQs and exclusive notes with our secure, in-platform PDF viewer.'
    },
    {
      icon: Shield,
      title: 'Secure Access',
      description: 'Premium content viewable only within our platform. No downloads, maximum security.'
    },
    {
      icon: Users,
      title: 'Student-Focused',
      description: 'Built by AKTU students, for AKTU students. We understand your needs.'
    }
  ];

  const resourceTypes = [
    {
      icon: Download,
      title: 'Free Resources',
      items: ['AKTU Syllabus 2025', 'Previous Year Papers', 'Quantum Books PDF'],
      cta: 'Access Free Resources',
      link: '/free-resources',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: Lock,
      title: 'Premium Resources',
      items: ['Curated PYQ Solutions', 'Exclusive Study Notes', 'Expert-Reviewed Content'],
      cta: 'Unlock Premium',
      link: '/premium-resources',
      gradient: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8">
                <Zap className="w-4 h-4 mr-2" />
                Trusted by AKTU Students
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                Your Gateway to
                <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  AKTU Success
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                Access comprehensive study materials, previous year papers, and premium curated content designed specifically for AKTU B.Tech students.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link
                to="/free-resources"
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
              >
                <BookOpen className="w-5 h-5" />
                <span>Start Learning for Free</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/premium-resources"
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Zap className="w-5 h-5" />
                <span>Unlock Premium Notes</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="text-center">
              <Link
                to="/dashboard"
                className="inline-flex items-center px-6 py-3 bg-gray-800/50 border border-gray-700/50 text-gray-300 rounded-lg font-medium hover:bg-gray-700/50 hover:text-white transition-all duration-300"
              >
                <Eye className="w-4 h-4 mr-2" />
                Access Your Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Resource Types Section */}
      <section className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Choose Your Learning Path
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Access free resources or unlock premium content tailored for your AKTU B.Tech journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {resourceTypes.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <div
                  key={index}
                  className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-8 hover:bg-gray-800/50 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${resource.gradient} rounded-xl flex items-center justify-center mb-6`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{resource.title}</h3>
                  <ul className="space-y-2 mb-8">
                    {resource.items.map((item, idx) => (
                      <li key={idx} className="flex items-center text-gray-300">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={resource.link}
                    className={`block w-full py-3 px-6 bg-gradient-to-r ${resource.gradient} text-white rounded-lg font-semibold text-center hover:shadow-lg transition-all duration-300 hover:scale-105`}
                  >
                    {resource.cta}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Everything You Need to Excel
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Comprehensive study materials and advanced features designed specifically for AKTU B.Tech students.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-6 hover:bg-gray-800/50 transition-all duration-300 hover:scale-105 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Transform Your AKTU Journey?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of AKTU students who are already excelling with openNote. Start your academic success story today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {user ? (
                <Link
                  to="/dashboard"
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <BookOpen className="w-5 h-5" />
                  <span>Browse Resources</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              ) : (
                <Link
                  to="/register"
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              )}
              <Link
                to="/pricing"
                className="w-full sm:w-auto px-8 py-4 border border-gray-600 text-gray-300 rounded-xl font-semibold text-lg hover:border-gray-500 hover:text-white transition-all duration-300 hover:scale-105"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;