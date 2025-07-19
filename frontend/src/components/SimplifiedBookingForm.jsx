import React, { useState } from 'react';
import { Calendar, Clock, Star, CheckCircle, ArrowRight, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { languages, techTopics, timeSlots } from '../data/instructors.js';
import { useAuth } from '../contexts/AuthContext';

const SimplifiedBookingForm = ({ onBookingSubmit }) => {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1); // 1 for topics, 2 for time slots
  const [formData, setFormData] = useState({
    topic: '',
    timeSlots: []
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateCurrentStep = () => {
    const newErrors = {};
    
    if (currentStep === 1 && !formData.topic) {
      newErrors.topic = 'Please select what you\'d like to learn';
    }
    
    if (currentStep === 2 && formData.timeSlots.length === 0) {
      newErrors.timeSlots = 'Please select at least one time that works for you';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleTopicSelect = (topic) => {
    setFormData(prev => ({ ...prev, topic }));
    if (errors.topic) {
      setErrors(prev => ({ ...prev, topic: '' }));
    }
  };

  const handleTimeSlotChange = (slot) => {
    setFormData(prev => ({
      ...prev,
      timeSlots: prev.timeSlots.includes(slot)
        ? prev.timeSlots.filter(s => s !== slot)
        : [...prev.timeSlots, slot]
    }));
    if (errors.timeSlots) {
      setErrors(prev => ({ ...prev, timeSlots: '' }));
    }
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep(2);
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
    setErrors({});
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Combine user data with form data
    const bookingData = {
      fullName: user.name,
      email: user.email,
      zipCode: user.zipCode,
      languages:user.languages,
      ...formData
    };
    
    onBookingSubmit(bookingData);
    setIsSubmitting(false);
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8 sm:mb-12">
      <div className="flex items-center space-x-4">
        <div className={`flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full text-xl sm:text-2xl font-bold ${
          currentStep >= 1 
            ? 'bg-blue-600 dark:bg-blue-500 text-white' 
            : 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
        }`}>
          1
        </div>
        <div className={`w-16 sm:w-24 h-2 rounded-full ${
          currentStep >= 2 
            ? 'bg-blue-600 dark:bg-blue-500' 
            : 'bg-gray-300 dark:bg-gray-600'
        }`}></div>
        <div className={`flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full text-xl sm:text-2xl font-bold ${
          currentStep >= 2 
            ? 'bg-blue-600 dark:bg-blue-500 text-white' 
            : 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
        }`}>
          2
        </div>
      </div>
    </div>
  );

  const renderTopicSelection = () => (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 sm:p-8 md:p-12 rounded-3xl">
      <div className="text-center mb-6 sm:mb-8">
        <Star className="mx-auto mb-3 sm:mb-4 text-blue-600 dark:text-blue-400" size={48} />
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
          What would you like to learn? 🎯
        </h2>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300">
          Choose the technology topic you're most interested in
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {[...techTopics].map(topic => (
          <button
            key={topic}
            onClick={() => handleTopicSelect(topic)}
            className={`p-4 sm:p-6 lg:p-8 border-4 rounded-2xl sm:rounded-3xl cursor-pointer transition-all duration-300 text-left ${
              formData.topic === topic
                ? 'border-blue-500 dark:border-blue-400 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 shadow-2xl transform scale-105'
                : 'border-gray-300 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 bg-white dark:bg-gray-700 hover:shadow-xl hover:transform hover:scale-102'
            }`}
          >
            <div className="flex items-start justify-between mb-3 sm:mb-4">
              <span className="text-lg sm:text-xl lg:text-2xl font-bold leading-tight pr-2">{topic}</span>
              {formData.topic === topic && (
                <CheckCircle className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" size={24} />
              )}
            </div>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
              Learn the basics and advanced features
            </p>
          </button>
        ))}
      </div>
      
      {errors.topic && (
        <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-2xl">
          <p className="text-lg sm:text-xl lg:text-2xl text-red-600 dark:text-red-400 font-semibold text-center">
            {errors.topic}
          </p>
        </div>
      )}

      <div className="text-center mt-8 sm:mt-12">
        <button
          onClick={handleNext}
          disabled={!formData.topic}
          className={`px-8 sm:px-12 lg:px-16 py-4 sm:py-5 lg:py-6 text-lg sm:text-xl lg:text-2xl font-bold rounded-2xl transition-all duration-200 shadow-2xl flex items-center mx-auto ${
            !formData.topic
              ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed text-white'
              : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600 text-white transform hover:scale-105'
          }`}
        >
          Next: Choose Your Times
          <ArrowRight className="ml-2 sm:ml-4" size={24} />
        </button>
      </div>
    </div>
  );

  const renderTimeSlotSelection = () => (
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 sm:p-8 md:p-12 rounded-3xl">
      <div className="text-center mb-6 sm:mb-8">
        <Clock className="mx-auto mb-3 sm:mb-4 text-green-600 dark:text-green-400" size={48} />
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
          When are you available? ⏰
        </h2>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-3 sm:mb-4">
          Select all the times that work for you
        </p>
        <div className="inline-flex items-center bg-blue-100 dark:bg-blue-900/30 px-4 sm:px-6 py-2 sm:py-3 rounded-2xl">
          <Star className="mr-2 sm:mr-3 text-blue-600 dark:text-blue-400" size={20} />
          <span className="text-base sm:text-lg lg:text-xl font-semibold text-blue-800 dark:text-blue-200">
            Learning: {formData.topic}
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {timeSlots(formData.topic).map(slot => (
          <button
            key={slot}
            onClick={() => handleTimeSlotChange(slot)}
            className={`p-3 sm:p-4 lg:p-6 border-4 rounded-2xl cursor-pointer transition-all duration-300 ${
              formData.timeSlots.includes(slot)
                ? 'border-green-500 dark:border-green-400 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 shadow-xl transform scale-105'
                : 'border-gray-300 dark:border-gray-600 hover:border-green-300 dark:hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/10 bg-white dark:bg-gray-700 hover:shadow-lg hover:transform hover:scale-102'
            }`}
          >
            <div className="text-center">
              {formData.timeSlots.includes(slot) && (
                <CheckCircle className="mx-auto mb-1 sm:mb-2 text-green-600 dark:text-green-400" size={20} />
              )}
              <span className="text-sm sm:text-base lg:text-lg font-bold block">{slot}</span>
            </div>
          </button>
        ))}
      </div>

      {formData.timeSlots.length > 0 && (
        <div className="bg-green-100 dark:bg-green-900/20 p-4 sm:p-6 rounded-2xl mb-6 sm:mb-8">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-green-800 dark:text-green-200 mb-2 sm:mb-3 text-center">
            Selected Times ({formData.timeSlots.length}):
          </h3>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {formData.timeSlots.map(slot => (
              <span 
                key={slot}
                className="px-3 sm:px-4 py-1 sm:py-2 bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 rounded-xl text-sm sm:text-base lg:text-lg font-semibold"
              >
                {slot}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {errors.timeSlots && (
        <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-2xl">
          <p className="text-lg sm:text-xl lg:text-2xl text-red-600 dark:text-red-400 font-semibold text-center">
            {errors.timeSlots}
          </p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
        <button
          onClick={handleBack}
          className="w-full sm:w-auto px-8 sm:px-10 lg:px-12 py-4 sm:py-5 lg:py-6 text-lg sm:text-xl lg:text-2xl font-bold text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border-4 border-gray-300 dark:border-gray-600 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200 shadow-xl flex items-center justify-center"
        >
          <ArrowLeft className="mr-2 sm:mr-4" size={24} />
          Back to Topics
        </button>
        
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || formData.timeSlots.length === 0}
          className={`w-full sm:w-auto px-8 sm:px-12 lg:px-16 py-4 sm:py-5 lg:py-6 text-lg sm:text-xl lg:text-2xl font-bold rounded-2xl transition-all duration-200 shadow-2xl flex items-center justify-center ${
            isSubmitting || formData.timeSlots.length === 0
              ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed text-white'
              : 'bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 dark:from-green-500 dark:to-blue-500 dark:hover:from-green-600 dark:hover:to-blue-600 text-white transform hover:scale-105'
          }`}
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-white mr-2 sm:mr-4"></div>
              Finding Your Instructor...
            </>
          ) : (
            <>
              Find My Instructor! 🚀
              <CheckCircle className="ml-2 sm:ml-4" size={24} />
            </>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
          Let's Get Started! 🎓
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 leading-relaxed">
          Just 2 simple steps to find your perfect tech instructor
        </p>
      </div>

      {renderStepIndicator()}

      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-4 sm:p-6 md:p-8">
          {currentStep === 1 ? renderTopicSelection() : renderTimeSlotSelection()}
        </div>
      </div>
    </div>
  );
};

export default SimplifiedBookingForm;