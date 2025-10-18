import React, { useState, useEffect } from 'react';
import { Cookie, X, Settings, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const CookieConsent: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true, // Always true, cannot be disabled
    analytics: true,
    marketing: true,
    preferences: true
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const consentData = {
      essential: true,
      analytics: true,
      marketing: true,
      preferences: true,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consentData));
    setShowBanner(false);
    setShowSettings(false);
  };

  const handleRejectAll = () => {
    const consentData = {
      essential: true, // Essential cookies cannot be rejected
      analytics: false,
      marketing: false,
      preferences: false,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consentData));
    setShowBanner(false);
    setShowSettings(false);
  };

  const handleSavePreferences = () => {
    const consentData = {
      ...preferences,
      essential: true, // Always true
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consentData));
    setShowBanner(false);
    setShowSettings(false);
  };

  const handlePreferenceChange = (key: keyof typeof preferences) => {
    if (key === 'essential') return; // Cannot change essential cookies
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6 shadow-2xl">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <Cookie className="w-6 h-6 text-white" />
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">
                  We use cookies to improve your experience
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  We use cookies to analyze our traffic, personalize content, and provide social media features. 
                  By continuing to use our site, you agree to our use of cookies. You can customize your preferences or learn more in our{' '}
                  <Link to="/cookies" className="text-blue-400 hover:text-blue-300 underline">
                    Cookie Policy
                  </Link>.
                </p>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
                  <button
                    onClick={handleAcceptAll}
                    className="w-full sm:w-auto px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
                  >
                    <Check className="w-4 h-4" />
                    <span>Accept All</span>
                  </button>
                  
                  <button
                    onClick={() => setShowSettings(true)}
                    className="w-full sm:w-auto px-6 py-2 border border-gray-600 text-gray-300 rounded-lg font-medium hover:border-gray-500 hover:text-white transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Customize</span>
                  </button>
                  
                  <button
                    onClick={handleRejectAll}
                    className="w-full sm:w-auto px-6 py-2 text-gray-400 hover:text-gray-300 transition-colors text-sm"
                  >
                    Reject All
                  </button>
                </div>
              </div>
              
              <button
                onClick={() => setShowBanner(false)}
                className="flex-shrink-0 p-1 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cookie Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Cookie Preferences</h2>
              <button
                onClick={() => setShowSettings(false)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <p className="text-gray-300 mb-6">
              Customize your cookie preferences below. Essential cookies are required for the website to function and cannot be disabled.
            </p>
            
            <div className="space-y-6">
              {/* Essential Cookies */}
              <div className="flex items-start justify-between p-4 bg-gray-800/50 rounded-lg">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">Essential Cookies</h3>
                  <p className="text-gray-400 text-sm">
                    Required for the website to function properly, including authentication and security features.
                  </p>
                </div>
                <div className="ml-4">
                  <div className="w-12 h-6 bg-green-500 rounded-full flex items-center justify-end px-1">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                  <p className="text-xs text-green-400 mt-1">Always On</p>
                </div>
              </div>
              
              {/* Analytics Cookies */}
              <div className="flex items-start justify-between p-4 bg-gray-800/50 rounded-lg">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">Analytics Cookies</h3>
                  <p className="text-gray-400 text-sm">
                    Help us understand how visitors interact with our website by collecting anonymous information.
                  </p>
                </div>
                <div className="ml-4">
                  <button
                    onClick={() => handlePreferenceChange('analytics')}
                    className={`w-12 h-6 rounded-full flex items-center transition-colors ${
                      preferences.analytics ? 'bg-blue-500 justify-end' : 'bg-gray-600 justify-start'
                    } px-1`}
                  >
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </button>
                </div>
              </div>
              
              {/* Marketing Cookies */}
              <div className="flex items-start justify-between p-4 bg-gray-800/50 rounded-lg">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">Marketing Cookies</h3>
                  <p className="text-gray-400 text-sm">
                    Used to deliver relevant advertisements and track the effectiveness of our marketing campaigns.
                  </p>
                </div>
                <div className="ml-4">
                  <button
                    onClick={() => handlePreferenceChange('marketing')}
                    className={`w-12 h-6 rounded-full flex items-center transition-colors ${
                      preferences.marketing ? 'bg-purple-500 justify-end' : 'bg-gray-600 justify-start'
                    } px-1`}
                  >
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </button>
                </div>
              </div>
              
              {/* Preference Cookies */}
              <div className="flex items-start justify-between p-4 bg-gray-800/50 rounded-lg">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">Preference Cookies</h3>
                  <p className="text-gray-400 text-sm">
                    Remember your settings and preferences to provide a personalized experience.
                  </p>
                </div>
                <div className="ml-4">
                  <button
                    onClick={() => handlePreferenceChange('preferences')}
                    className={`w-12 h-6 rounded-full flex items-center transition-colors ${
                      preferences.preferences ? 'bg-orange-500 justify-end' : 'bg-gray-600 justify-start'
                    } px-1`}
                  >
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-end space-y-3 sm:space-y-0 sm:space-x-3 mt-8">
              <button
                onClick={handleSavePreferences}
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105"
              >
                Save Preferences
              </button>
              <button
                onClick={handleAcceptAll}
                className="w-full sm:w-auto px-6 py-3 border border-gray-600 text-gray-300 rounded-lg font-semibold hover:border-gray-500 hover:text-white transition-all duration-300"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsent;