import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import RoleBasedRoute from './components/RoleBasedRoute';
import ScrollToTop from './components/ScrollToTop';
import CookieConsent from './components/CookieConsent';
import { seedDatabase } from './services/seedData';
import Layout from './components/Layout/Layout';

// Import pages
import Home from './pages/Home';
import About from './pages/About';
import FreeResources from './pages/FreeResources';
import PremiumResources from './pages/PremiumResources';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Register from './pages/Register';
import FAQ from './pages/FAQ';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Cookies from './pages/Cookies';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Settings from './pages/Settings';

function App() {
  useEffect(() => {
    // Seed database with sample data on app load
    seedDatabase();
  }, []);


  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        <div className="min-h-screen bg-gray-900 text-white">
          <Routes>
            {/* Public routes without layout */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/register" element={<Register />} />
            
            {/* Routes with layout */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="free-resources" element={<FreeResources />} />
              <Route path="premium-resources" element={<PremiumResources />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="contact" element={<Contact />} />
              <Route path="faq" element={<FAQ />} />
              <Route path="terms" element={<Terms />} />
              <Route path="privacy" element={<Privacy />} />
              <Route path="cookies" element={<Cookies />} />

              {/* Protected routes */}
              <Route
                path="dashboard"
                element={
                  <PrivateRoute>
                    <RoleBasedRoute allowedRoles={['user']} redirectTo="/admin">
                      <UserDashboard />
                    </RoleBasedRoute>
                  </PrivateRoute>
                }
              />

              <Route
                path="admin"
                element={
                  <PrivateRoute>
                    <RoleBasedRoute allowedRoles={['admin']} redirectTo="/dashboard">
                      <AdminDashboard />
                    </RoleBasedRoute>
                  </PrivateRoute>
                }
              />

              <Route
                path="profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />

              <Route
                path="profile/edit"
                element={
                  <PrivateRoute>
                    <ProfileEdit />
                  </PrivateRoute>
                }
              />

              <Route
                path="settings"
                element={
                  <PrivateRoute>
                    <Settings />
                  </PrivateRoute>
                }
              />
            </Route>
          </Routes>
          <CookieConsent />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;