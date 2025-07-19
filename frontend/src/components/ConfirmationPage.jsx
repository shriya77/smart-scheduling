import React, { useState } from 'react';
import { CheckCircle, Calendar, Clock, MapPin, Star, Video, Mail, Phone, ArrowLeft, User, ChevronRight } from 'lucide-react';
import { matchInstructor } from '../utils/matchingAlgorithm';

const ConfirmationPage = ({ booking, matchedInstructor, onStartOver }) => {
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [showFinalConfirmation, setShowFinalConfirmation] = useState(false);

  // For demo purposes, we'll show multiple instructor options
  // In a real app, this would come from the matching algorithm
  const availableInstructors = [
    matchedInstructor.instructor,
    // Add a few more options for selection
    // Get additional matches from the new algorithm
    ...getAdditionalMatches(booking).slice(1, 3) // Get 2nd and 3rd best matches
  ].filter((instructor, index, self) => 
    index === self.findIndex(i => i.id === instructor.id)
  );

  // Helper function to get additional instructor matches
  function getAdditionalMatches(bookingData) {
    const matches = matchInstructor(
      bookingData.topic, 
      bookingData.timeSlots, 
      bookingData.languages || [], 
      bookingData.zipCode || ""
    );
    return matches.map(match => match.instructor);
  }

  const handleInstructorSelect = (instructor) => {
    setSelectedInstructor(instructor);
  };

  const handleConfirmSelection = () => {
    setShowFinalConfirmation(true);
  };

  const handleBackToSelection = () => {
    setShowFinalConfirmation(false);
    setSelectedInstructor(null);
  };

  const sessionDate = new Date();
  sessionDate.setDate(sessionDate.getDate() + 7); // Default to next week
  
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTimeFromSlot = (slot) => {
    const [day, time] = slot.split(' ');
    return time;
  };

  // Final confirmation page
  if (showFinalConfirmation && selectedInstructor) {
    return (
      <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
        {/* Success Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex justify-center mb-4">
            <CheckCircle className="text-green-500 dark:text-green-400" size={60} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Booking Confirmed! 🎉
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Your session with {selectedInstructor.name} is all set!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Session Details */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center">
              <Calendar className="mr-2 sm:mr-3 text-blue-600 dark:text-blue-400" size={24} />
              Session Details
            </h2>
            
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start">
                <User className="mr-2 sm:mr-3 text-gray-500 dark:text-gray-400 mt-1" size={18} />
                <div>
                  <p className="text-base sm:text-lg font-medium text-gray-900 dark:text-white">Student</p>
                  <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">{booking.fullName}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Star className="mr-2 sm:mr-3 text-orange-500 dark:text-orange-400 mt-1" size={18} />
                <div>
                  <p className="text-base sm:text-lg font-medium text-gray-900 dark:text-white">Topic</p>
                  <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">{booking.topic}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="mr-2 sm:mr-3 text-green-600 dark:text-green-400 mt-1" size={18} />
                <div>
                  <p className="text-base sm:text-lg font-medium text-gray-900 dark:text-white">Date & Time</p>
                  <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
                    {formatDate(sessionDate)}
                  </p>
                  <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
                    {getTimeFromSlot(selectedInstructor.availability[0])}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Video className="mr-2 sm:mr-3 text-purple-600 dark:text-purple-400 mt-1" size={18} />
                <div>
                  <p className="text-base sm:text-lg font-medium text-gray-900 dark:text-white">Meeting Link</p>
                  <a 
                    href={matchedInstructor.zoomLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-base sm:text-lg text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline break-all"
                  >
                    Join Zoom Session
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="mr-2 sm:mr-3 text-red-500 dark:text-red-400 mt-1" size={18} />
                <div>
                  <p className="text-base sm:text-lg font-medium text-gray-900 dark:text-white">Session ID</p>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-mono break-all">{matchedInstructor.sessionId}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Instructor Profile */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
              Your Instructor
            </h2>
            
            <div className="text-center mb-4 sm:mb-6">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-2xl sm:text-3xl font-bold text-white">
                  {selectedInstructor.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                {selectedInstructor.name}
              </h3>
              <div className="flex justify-center items-center mt-2">
                <Star className="text-yellow-500 dark:text-yellow-400 mr-1" size={18} />
                <span className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                  {selectedInstructor.rating}
                </span>
                <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300 ml-1">
                  ({selectedInstructor.sessionsCompleted} sessions)
                </span>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div>
                <p className="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-2">About</p>
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  {selectedInstructor.bio}
                </p>
              </div>

              <div>
                <p className="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-2">Expertise</p>
                <div className="flex flex-wrap gap-2">
                  {selectedInstructor.expertise.map(skill => (
                    <span 
                      key={skill}
                      className="px-2 sm:px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-sm sm:text-base font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-2">Languages</p>
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
                  {selectedInstructor.languages.join(', ')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="mt-6 sm:mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
            What Happens Next?
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div className="flex items-start">
              <Mail className="mr-2 sm:mr-3 text-blue-600 dark:text-blue-400 mt-1" size={20} />
              <div>
                <p className="text-base sm:text-lg font-medium text-gray-900 dark:text-white">Confirmation Email</p>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                  You'll receive a detailed email with session information and calendar invite within 5 minutes.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Phone className="mr-2 sm:mr-3 text-green-600 dark:text-green-400 mt-1" size={20} />
              <div>
                <p className="text-base sm:text-lg font-medium text-gray-900 dark:text-white">Instructor Contact</p>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                  Your instructor will reach out 24 hours before the session to confirm and answer any questions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-6 sm:mt-8">
          <button
            onClick={onStartOver}
            className="flex items-center justify-center px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-600 transition-all"
          >
            <ArrowLeft className="mr-1 sm:mr-2" size={18} />
            Schedule Another Session
          </button>
          
          <a
            href={`mailto:${booking.email}?subject=Tech Learning Session Confirmation&body=Your session with ${selectedInstructor.name} is confirmed!`}
            className="flex items-center justify-center px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold text-white bg-blue-600 dark:bg-blue-500 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-600 transition-all"
          >
            <Mail className="mr-1 sm:mr-2" size={18} />
            Email Confirmation
          </a>
        </div>
      </div>
    );
  }

  // Instructor selection page
  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
          Choose Your Instructor 👨‍🏫
        </h1>
        <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6">
          We found {availableInstructors.length} great instructors for <span className="font-semibold text-blue-600 dark:text-blue-400">{booking.topic}</span>
        </p>
        <div className="inline-flex items-center bg-blue-100 dark:bg-blue-900/30 px-4 sm:px-6 py-2 sm:py-3 rounded-2xl">
          <Clock className="mr-2 sm:mr-3 text-blue-600 dark:text-blue-400" size={20} />
          <span className="text-base sm:text-lg font-semibold text-blue-800 dark:text-blue-200">
            Available: {booking.timeSlots.join(', ')}
          </span>
        </div>
      </div>

      {/* Instructor Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {availableInstructors.map((instructor) => (
          <div
            key={instructor.id}
            onClick={() => handleInstructorSelect(instructor)}
            className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-6 cursor-pointer transition-all duration-300 border-4 ${
              selectedInstructor?.id === instructor.id
                ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20 transform scale-105 shadow-2xl'
                : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-xl hover:transform hover:scale-102'
            }`}
          >
            {/* Instructor Avatar */}
            <div className="text-center mb-4 sm:mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-xl sm:text-2xl font-bold text-white">
                  {instructor.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {instructor.name}
              </h3>
              <div className="flex justify-center items-center">
                <Star className="text-yellow-500 dark:text-yellow-400 mr-1" size={16} />
                <span className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                  {instructor.rating}
                </span>
                <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300 ml-1">
                  ({instructor.sessionsCompleted} sessions)
                </span>
              </div>
            </div>

            {/* Instructor Details */}
            <div className="space-y-3 sm:space-y-4">
              <div>
                <p className="text-sm sm:text-base font-medium text-gray-900 dark:text-white mb-2">About</p>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                  {instructor.bio}
                </p>
              </div>

              <div>
                <p className="text-sm sm:text-base font-medium text-gray-900 dark:text-white mb-2">Expertise</p>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {instructor.expertise.slice(0, 3).map(skill => (
                    <span 
                      key={skill}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-xs sm:text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                  {instructor.expertise.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-xs sm:text-sm">
                      +{instructor.expertise.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <div>
                <p className="text-sm sm:text-base font-medium text-gray-900 dark:text-white mb-2">Languages</p>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                  {instructor.languages.join(', ')}
                </p>
              </div>

              <div>
                <p className="text-sm sm:text-base font-medium text-gray-900 dark:text-white mb-2">Available Times</p>
                <div className="flex flex-wrap gap-1">
                  {instructor.availability.slice(0, 2).map(slot => (
                    <span 
                      key={slot}
                      className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-full text-xs sm:text-sm font-medium"
                    >
                      {slot}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Selection Indicator */}
            {selectedInstructor?.id === instructor.id && (
              <div className="mt-4 sm:mt-6 flex items-center justify-center">
                <CheckCircle className="text-blue-600 dark:text-blue-400 mr-2" size={20} />
                <span className="text-base sm:text-lg font-bold text-blue-600 dark:text-blue-400">
                  Selected!
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
        <button
          onClick={onStartOver}
          className="flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg lg:text-xl font-semibold text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-600 transition-all"
        >
          <ArrowLeft className="mr-2" size={20} />
          Back to Booking
        </button>
        
        <button
          onClick={handleConfirmSelection}
          disabled={!selectedInstructor}
          className={`flex items-center justify-center px-8 sm:px-12 py-3 sm:py-4 text-base sm:text-lg lg:text-xl font-bold rounded-xl transition-all duration-200 shadow-lg ${
            !selectedInstructor
              ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed text-white'
              : 'bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 dark:from-blue-500 dark:to-green-500 dark:hover:from-blue-600 dark:hover:to-green-600 text-white transform hover:scale-105'
          }`}
        >
          Confirm Selection
          <ChevronRight className="ml-2" size={20} />
        </button>
      </div>
    </div>
  );
};

export default ConfirmationPage;