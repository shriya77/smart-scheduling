import React, { useState } from 'react';
import { User, Mail, MapPin, Globe, Save, Edit3, Check, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { languages } from '../data/instructors.js';

const ProfilePage = ({ onNavigateToBooking }) => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    zipCode: user?.zipCode || '',
    languages: user?.languages || ['English']
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleLanguageToggle = (language) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter(lang => lang !== language)
        : [...prev.languages, language]
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your full name';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'Please enter your zip code';
    } else if (!/^\d{5}$/.test(formData.zipCode)) {
      newErrors.zipCode = 'Zip code must be exactly 5 digits';
    }

    if (formData.languages.length === 0) {
      newErrors.languages = 'Please select at least one language';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const result = await updateProfile(formData);
    
    if (result.success) {
      setIsEditing(false);
    } else {
      setErrors({ general: result.error });
    }
    
    setIsLoading(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      zipCode: user?.zipCode || '',
      languages: user?.languages || ['English']
    });
    setErrors({});
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 sm:py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <span className="text-2xl sm:text-3xl font-bold text-white">
              {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            My Profile
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300">
            Manage your account information and preferences
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8">
          {errors.general && (
            <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-base sm:text-lg text-red-600 dark:text-red-400 text-center font-medium">
                {errors.general}
              </p>
            </div>
          )}

          {/* Edit Toggle */}
          <div className="flex justify-between items-center mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
              Personal Information
            </h2>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white rounded-xl transition-colors duration-200"
              >
                <Edit3 className="mr-1 sm:mr-2" size={18} />
                <span className="text-base sm:text-lg font-medium">Edit</span>
              </button>
            ) : (
              <div className="flex gap-2 sm:gap-3">
                <button
                  onClick={handleCancel}
                  className="flex items-center px-3 sm:px-4 py-2 sm:py-3 bg-gray-500 dark:bg-gray-600 hover:bg-gray-600 dark:hover:bg-gray-700 text-white rounded-xl transition-colors duration-200"
                >
                  <X className="mr-1" size={18} />
                  <span className="text-sm sm:text-base font-medium hidden sm:inline">Cancel</span>
                </button>
                <button
                  onClick={handleSave}
                  disabled={isLoading}
                  className={`flex items-center px-3 sm:px-4 py-2 sm:py-3 rounded-xl transition-colors duration-200 ${
                    isLoading
                      ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                      : 'bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-600'
                  } text-white`}
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-1 sm:mr-2"></div>
                  ) : (
                    <Check className="mr-1 sm:mr-2" size={18} />
                  )}
                  <span className="text-sm sm:text-base font-medium hidden sm:inline">
                    {isLoading ? 'Saving...' : 'Save'}
                  </span>
                </button>
              </div>
            )}
          </div>

          <div className="space-y-6 sm:space-y-8">
            {/* Full Name */}
            <div>
              <label className="block text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2 sm:mb-3">
                <User className="inline mr-2 text-blue-600 dark:text-blue-400" size={20} />
                Full Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full px-4 py-3 sm:py-4 text-lg sm:text-xl border rounded-xl focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-600 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${
                    errors.name ? 'border-red-500 dark:border-red-400 bg-red-50 dark:bg-red-900/20' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder="Enter your full name"
                />
              ) : (
                <p className="text-lg sm:text-xl text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:py-4 rounded-xl">
                  {user?.name || 'Not set'}
                </p>
              )}
              {errors.name && (
                <p className="mt-2 sm:mt-3 text-base sm:text-lg text-red-600 dark:text-red-400 font-medium">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2 sm:mb-3">
                <Mail className="inline mr-2 text-green-600 dark:text-green-400" size={20} />
                Email Address
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full px-4 py-3 sm:py-4 text-lg sm:text-xl border rounded-xl focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-600 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${
                    errors.email ? 'border-red-500 dark:border-red-400 bg-red-50 dark:bg-red-900/20' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder="your.email@example.com"
                />
              ) : (
                <p className="text-lg sm:text-xl text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:py-4 rounded-xl">
                  {user?.email || 'Not set'}
                </p>
              )}
              {errors.email && (
                <p className="mt-2 sm:mt-3 text-base sm:text-lg text-red-600 dark:text-red-400 font-medium">{errors.email}</p>
              )}
            </div>

            {/* Zip Code */}
            <div>
              <label className="block text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2 sm:mb-3">
                <MapPin className="inline mr-2 text-purple-600 dark:text-purple-400" size={20} />
                Zip Code
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  className={`w-full sm:w-1/2 px-4 py-3 sm:py-4 text-lg sm:text-xl border rounded-xl focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-600 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${
                    errors.zipCode ? 'border-red-500 dark:border-red-400 bg-red-50 dark:bg-red-900/20' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder="12345"
                  maxLength="5"
                />
              ) : (
                <p className="text-lg sm:text-xl text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:py-4 rounded-xl w-full sm:w-1/2">
                  {user?.zipCode || 'Not set'}
                </p>
              )}
              {errors.zipCode && (
                <p className="mt-2 sm:mt-3 text-base sm:text-lg text-red-600 dark:text-red-400 font-medium">{errors.zipCode}</p>
              )}
            </div>

            {/* Languages */}
            <div>
              <label className="block text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2 sm:mb-3">
                <Globe className="inline mr-2 text-orange-600 dark:text-orange-400" size={20} />
                Languages You're Comfortable With
              </label>
              {isEditing ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                  {[...languages].map(language => (
                    <button
                      key={language}
                      type="button"
                      onClick={() => handleLanguageToggle(language)}
                      className={`p-3 sm:p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 text-left ${
                        formData.languages.includes(language)
                          ? 'border-orange-500 dark:border-orange-400 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200'
                          : 'border-gray-300 dark:border-gray-600 hover:border-orange-300 dark:hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/10 bg-white dark:bg-gray-700'
                      }`}
                    >
                      <span className="text-base sm:text-lg font-medium">{language}</span>
                      {formData.languages.includes(language) && (
                        <Check className="float-right text-orange-600 dark:text-orange-400 mt-1" size={18} />
                      )}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {(user?.languages || ['English']).map(language => (
                    <span 
                      key={language}
                      className="px-3 sm:px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 rounded-xl text-base sm:text-lg font-medium"
                    >
                      {language}
                    </span>
                  ))}
                </div>
              )}
              {errors.languages && (
                <p className="mt-2 sm:mt-3 text-base sm:text-lg text-red-600 dark:text-red-400 font-medium">{errors.languages}</p>
              )}
            </div>
          </div>

          {/* Account Stats */}
          <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
              Account Information
            </h3>
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 sm:p-6 rounded-xl">
                <p className="text-sm sm:text-base text-blue-600 dark:text-blue-400 font-medium mb-1">Member Since</p>
                <p className="text-lg sm:text-xl font-bold text-blue-800 dark:text-blue-200">January 2025</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 sm:p-6 rounded-xl">
                <p className="text-sm sm:text-base text-green-600 dark:text-green-400 font-medium mb-1">Sessions Completed</p>
                <p className="text-lg sm:text-xl font-bold text-green-800 dark:text-green-200">0 sessions</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
            <button
              onClick={onNavigateToBooking}
              className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white bg-blue-600 dark:bg-blue-500 rounded-xl hover:bg-blue-700 dark:hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-600 transition-all"
            >
              Schedule a Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;