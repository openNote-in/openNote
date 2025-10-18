import React from 'react';
import { BookOpen, Mail, MapPin, Facebook, Linkedin, Instagram, MessageCircle, Hash } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-950/50 border-t border-gray-800/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                openNote
              </span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
              Your trusted companion for AKTU B.Tech success. Access free resources and unlock premium content to excel in your academic journey.
            </p>
            <div className="flex flex-col space-y-2 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-blue-400" />
                <span>support@opennote-aktu.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span>Lucknow, Uttar Pradesh</span>
              </div>
            </div>
            
            {/* Social Media Links */}
            <div className="mt-6">
              <h4 className="text-white font-medium mb-3">Follow Us</h4>
              <div className="flex space-x-3">
                <a
                  href="https://facebook.com/opennote-aktu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800/50 hover:bg-blue-600/20 border border-gray-700/50 hover:border-blue-500/50 rounded-lg flex items-center justify-center text-gray-400 hover:text-blue-400 transition-all duration-300 hover:scale-110"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com/company/opennote-aktu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800/50 hover:bg-blue-600/20 border border-gray-700/50 hover:border-blue-500/50 rounded-lg flex items-center justify-center text-gray-400 hover:text-blue-400 transition-all duration-300 hover:scale-110"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://instagram.com/opennote_aktu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800/50 hover:bg-pink-600/20 border border-gray-700/50 hover:border-pink-500/50 rounded-lg flex items-center justify-center text-gray-400 hover:text-pink-400 transition-all duration-300 hover:scale-110"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://t.me/opennote_aktu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800/50 hover:bg-blue-500/20 border border-gray-700/50 hover:border-blue-400/50 rounded-lg flex items-center justify-center text-gray-400 hover:text-blue-300 transition-all duration-300 hover:scale-110"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
                <a
                  href="https://discord.gg/opennote-aktu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800/50 hover:bg-indigo-600/20 border border-gray-700/50 hover:border-indigo-500/50 rounded-lg flex items-center justify-center text-gray-400 hover:text-indigo-400 transition-all duration-300 hover:scale-110"
                >
                  <Hash className="w-5 h-5" />
                </a>
                <a
                  href="https://twitter.com/opennote_aktu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800/50 hover:bg-gray-600/20 border border-gray-700/50 hover:border-gray-500/50 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-300 transition-all duration-300 hover:scale-110"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: 'Home', path: '/' },
                { name: 'About Us', path: '/about' },
                { name: 'Free Resources', path: '/free-resources' },
                { name: 'Premium Resources', path: '/premium-resources' },
                { name: 'Dashboard', path: '/dashboard' }
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {[
                { name: 'Contact Us', path: '/contact' },
                { name: 'FAQ', path: '/faq' },
                { name: 'Pricing', path: '/pricing' },
                { name: 'Terms of Service', path: '/terms' },
                { name: 'Privacy Policy', path: '/privacy' }
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 openNote AKTU. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link to="/terms" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
              Terms
            </Link>
            <Link to="/privacy" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
              Privacy
            </Link>
            <Link to="/cookies" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;