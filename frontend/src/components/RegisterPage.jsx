import React, { useState } from 'react';
import { Eye, EyeOff, UserPlus, Mail, Lock, User, MapPin, Globe, Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { languages } from '../data/instructors.js';

const RegisterPage = ({ onSwitchToLogin }) => {
  const { register, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    zipCode: '',
    languages: ['English'] // Default to English
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

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
    if (errors.languages) {
      setErrors(prev => ({ ...prev, languages: '' }));
    }
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
    
    if (!formData.password.trim()) {
      newErrors.password = 'Please enter a password';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }
    
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const { confirmPassword, ...userData } = formData;
    const result = await register(userData);
    
    if (!result.success) {
      setErrors({ general: result.error });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-sm sm:max-w-md w-full space-y-6 sm:space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 sm:h-20 sm:w-20 bg-green-600 dark:bg-green-500 rounded-full flex items-center justify-center mb-4 sm:mb-6">
            <UserPlus className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Create Account
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300">
            Join TechConnect to start learning
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 sm:p-8">
          {errors.general && (
            <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-base sm:text-lg text-red-600 dark:text-red-400 text-center font-medium">
                {errors.general}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label htmlFor="name" className="block text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2 sm:mb-3">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full pl-11 sm:pl-14 pr-3 sm:pr-4 py-3 sm:py-4 text-lg sm:text-xl border rounded-xl focus:ring-4 focus:ring-green-300 dark:focus:ring-green-600 focus:border-green-500 dark:focus:border-green-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${
                    errors.name ? 'border-red-500 dark:border-red-400 bg-red-50 dark:bg-red-900/20' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder="Enter your full name"
                />
              </div>
              {errors.name && (
                <p className="mt-2 sm:mt-3 text-base sm:text-lg text-red-600 dark:text-red-400 font-medium">{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2 sm:mb-3">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full pl-11 sm:pl-14 pr-3 sm:pr-4 py-3 sm:py-4 text-lg sm:text-xl border rounded-xl focus:ring-4 focus:ring-green-300 dark:focus:ring-green-600 focus:border-green-500 dark:focus:border-green-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${
                    errors.email ? 'border-red-500 dark:border-red-400 bg-red-50 dark:bg-red-900/20' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder="your.email@example.com"
                />
              </div>
              {errors.email && (
                <p className="mt-2 sm:mt-3 text-base sm:text-lg text-red-600 dark:text-red-400 font-medium">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="zipCode" className="block text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2 sm:mb-3">
                Zip Code
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
                <input
                  type="text"
                  id="zipCode"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  className={`w-full pl-11 sm:pl-14 pr-3 sm:pr-4 py-3 sm:py-4 text-lg sm:text-xl border rounded-xl focus:ring-4 focus:ring-green-300 dark:focus:ring-green-600 focus:border-green-500 dark:focus:border-green-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${
                    errors.zipCode ? 'border-red-500 dark:border-red-400 bg-red-50 dark:bg-red-900/20' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder="12345"
                  maxLength="5"
                />
              </div>
              {errors.zipCode && (
                <p className="mt-2 sm:mt-3 text-base sm:text-lg text-red-600 dark:text-red-400 font-medium">{errors.zipCode}</p>
              )}
            </div>

            <div>
              <label className="block text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2 sm:mb-3">
                <Globe className="inline mr-2 text-orange-600 dark:text-orange-400" size={20} />
                Languages You're Comfortable With
              </label>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">
                Select all languages you can communicate in during tech sessions
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                {[...languages].map(language => (
                  <button
                    key={language}
                    type="button"
                    onClick={() => handleLanguageToggle(language)}
                    className={`p-2 sm:p-3 border-2 rounded-xl cursor-pointer transition-all duration-200 text-left ${
                      formData.languages.includes(language)
                        ? 'border-orange-500 dark:border-orange-400 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200'
                        : 'border-gray-300 dark:border-gray-600 hover:border-orange-300 dark:hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/10 bg-white dark:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm sm:text-base font-medium">{language}</span>
                      {formData.languages.includes(language) && (
                        <Check className="text-orange-600 dark:text-orange-400" size={16} />
                      )}
                    </div>
                  </button>
                ))}
              </div>
              {errors.languages && (
                <p className="mt-2 sm:mt-3 text-base sm:text-lg text-red-600 dark:text-red-400 font-medium">{errors.languages}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2 sm:mb-3">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`w-full pl-11 sm:pl-14 pr-11 sm:pr-14 py-3 sm:py-4 text-lg sm:text-xl border rounded-xl focus:ring-4 focus:ring-green-300 dark:focus:ring-green-600 focus:border-green-500 dark:focus:border-green-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${
                    errors.password ? 'border-red-500 dark:border-red-400 bg-red-50 dark:bg-red-900/20' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 sm:mt-3 text-base sm:text-lg text-red-600 dark:text-red-400 font-medium">{errors.password}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2 sm:mb-3">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className={`w-full pl-11 sm:pl-14 pr-11 sm:pr-14 py-3 sm:py-4 text-lg sm:text-xl border rounded-xl focus:ring-4 focus:ring-green-300 dark:focus:ring-green-600 focus:border-green-500 dark:focus:border-green-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${
                    errors.confirmPassword ? 'border-red-500 dark:border-red-400 bg-red-50 dark:bg-red-900/20' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-2 sm:mt-3 text-base sm:text-lg text-red-600 dark:text-red-400 font-medium">{errors.confirmPassword}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 sm:py-4 px-4 sm:px-6 text-lg sm:text-xl font-bold rounded-xl transition-all duration-200 ${
                isLoading
                  ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-600'
              } text-white shadow-lg`}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 sm:mt-8 text-center">
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
              Already have an account?{' '}
              <button
                onClick={onSwitchToLogin}
                className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 font-semibold underline"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;