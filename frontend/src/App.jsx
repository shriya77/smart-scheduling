import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Header from './components/Header';
import ProfilePage from './components/ProfilePage';
import SimplifiedBookingForm from './components/SimplifiedBookingForm';
import ConfirmationPage from './components/ConfirmationPage';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { findBestMatch, generateZoomLink, generateSessionId } from './utils/matchingAlgorithm';
import { Users, Calendar, Shield } from 'lucide-react';

const AppContent = () => {
  const { user } = useAuth();
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [currentPage, setCurrentPage] = useState('booking'); // 'booking', 'confirmation', or 'profile'
  const [bookingData, setBookingData] = useState(null);
  const [matchResult, setMatchResult] = useState(null);

  const handleBookingSubmit = (formData) => {
    // Find the best matching instructor
    const match = findBestMatch(formData);
    
    if (match) {
      // Generate session details
      const enhancedMatch = {
        ...match,
        zoomLink: generateZoomLink(),
        sessionId: generateSessionId()
      };
      
      setBookingData(formData);
      setMatchResult(enhancedMatch);
      setCurrentPage('confirmation');
    } else {
      alert('Sorry, we couldn\'t find a matching instructor at this time. Please try different time slots or topics.');
    }
  };

  const handleStartOver = () => {
    setCurrentPage('booking');
    setBookingData(null);
    setMatchResult(null);
  };

  const handleNavigateToProfile = () => {
    setCurrentPage('profile');
  };

  const handleNavigateToBooking = () => {
    setCurrentPage('booking');
  };

  // Show auth pages if user is not logged in
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header currentPage={currentPage} />
        {authMode === 'login' ? (
          <LoginPage onSwitchToRegister={() => setAuthMode('register')} />
        ) : (
          <RegisterPage onSwitchToLogin={() => setAuthMode('login')} />
        )}
      </div>
    );
  }

  if (currentPage === 'profile') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header 
          onNavigateToProfile={handleNavigateToProfile} 
          currentPage={currentPage} 
        />
        <ProfilePage onNavigateToBooking={handleNavigateToBooking} />
      </div>
    );
  }

  if (currentPage === 'confirmation') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header 
          onNavigateToProfile={handleNavigateToProfile} 
          currentPage={currentPage} 
        />
        <ConfirmationPage 
          booking={bookingData}
          matchedInstructor={matchResult}
          onStartOver={handleStartOver}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Header 
        onNavigateToProfile={handleNavigateToProfile} 
        currentPage={currentPage} 
      />

      {/* Hero Section */}
      <section className="py-8 sm:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
            Welcome back, {user.name}! 👋
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 leading-relaxed max-w-4xl mx-auto">
            Ready to learn something new? Let's find you the perfect instructor for your next tech session.
          </p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
            <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-md">
              <Users className="text-blue-600 dark:text-blue-400 mx-auto mb-3 sm:mb-4" size={40} />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">Expert Instructors</h3>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
                Carefully vetted tech-savvy tutors with experience teaching seniors
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-md">
              <Calendar className="text-green-600 dark:text-green-400 mx-auto mb-3 sm:mb-4" size={40} />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">Simple Booking</h3>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
                Choose times that work for you with our intelligent matching system
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-md sm:col-span-2 lg:col-span-1">
              <Shield className="text-purple-600 dark:text-purple-400 mx-auto mb-3 sm:mb-4" size={40} />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">Safe & Secure</h3>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
                All sessions are conducted through secure video calls
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="pb-8 sm:pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SimplifiedBookingForm onBookingSubmit={handleBookingSubmit} />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-white py-6 sm:py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-base sm:text-lg">
            © 2025 TechConnect. Empowering seniors through technology education.
          </p>
        </div>
      </footer>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;