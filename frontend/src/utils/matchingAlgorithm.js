// Updated matching algorithm based on provided parseTime and checkOverlappingTimings functions
// Written by Shriya and Kunal, adapted for our data structure

import { instructors } from '../data/instructors.js';

function parseTime(t) {
  t = t.trim().toLowerCase().replace(/\s+/g, "");
  const ampmMatch = t.match(/^(\d{1,2})(?::(\d{2}))?(am|pm)?$/);

  if (!ampmMatch) return parseFloat(t); // fallback

  let [_, hr, mi, meridian] = ampmMatch;
  hr = parseInt(hr, 10);
  mi = mi ? parseInt(mi, 10) : 0;

  if (meridian === "pm" && hr !== 12) hr += 12;
  if (meridian === "am" && hr === 12) hr = 0;

  return hr + mi / 60.0;
}

function checkOverlappingTimings(userTimes, tutorTimes) {
  for (let uTime of userTimes) {
    const [day, timeRangeRaw] = uTime.trim().replace(/\s+/g, " ").split(" ");
    if (!timeRangeRaw) continue;
    const timeRange = timeRangeRaw.trim();
    let [startU, endU] = timeRange.includes("-")
      ? timeRange.split("-").map(parseTime)
      : [parseTime(timeRange), parseTime(timeRange) + 1];
    if (endU < startU) endU += 12;
    if (endU < startU) [startU, endU] = [endU, startU];

    for (let tTime of tutorTimes) {
      const [tDay, tRangeRaw] = tTime.trim().replace(/\s+/g, " ").split(" ");
      const tRange = tRangeRaw.trim();
      if (tDay.toLowerCase() !== day.toLowerCase()) continue;

      let [startT, endT] = tRange.split("-").map(parseTime);
      if (endT < startT) endT += 12;

      if (startT <= startU && endT >= endU) {
        return [true, 1];
      } else if (
        (startT >= startU && startT < endU) ||
        (endT > startU && endT <= endU)
      ) {
        return [true, -1];
      }
    }
  }
  return [false, 0];
}

// Updated function to work with our current data structure
// Original function written by Shriya and Kunal, adapted for our instructor data
function matchInstructor(requestedTopic, preferredTimes, preferredLanguages = [], zipCode = "") {
  const topic = requestedTopic.trim().toLowerCase();
  const times = preferredTimes.map(t => t.trim());
  
  const matchResults = instructors.map(instructor => {
    if (!Array.isArray(instructor.availability) || instructor.availability.length === 0) {
      return { instructor, confidence: 0 };
    }
    
    // Check topic match
    const topicMatch = instructor.expertise.some(e => e.toLowerCase() === topic);
    
    // Check language match - if user has language preferences, check if instructor supports any of them
    const langMatch = !preferredLanguages.length || 
      preferredLanguages.some(userLang => 
        instructor.languages.some(instructorLang => 
          instructorLang.toLowerCase() === userLang.toLowerCase()
        )
      );
    
    // Check time overlap
    const [hasOverlap, confidence] = checkOverlappingTimings(times, instructor.availability);
    
    // Calculate final confidence score
    let finalConfidence = 0;
    if (topicMatch && langMatch && hasOverlap) {
      finalConfidence = confidence;
      
      if (zipCode && instructor.zipCode) {
        const zipDifference = Math.abs(parseInt(zipCode) - parseInt(instructor.zipCode));
        if (zipDifference <= 10) finalConfidence += 0.2;
        else if (zipDifference <= 50) finalConfidence += 0.1;
      }
      // Bonus points for high ratings and experience
      if (instructor.rating >= 4.8) finalConfidence += 0.1;
      if (instructor.sessionsCompleted >= 50) finalConfidence += 0.1;
      
    }
    
    return {
      instructor,
      confidence: finalConfidence,
      availableSlots: instructor.availability.filter(slot => {
        const [hasSlotOverlap] = checkOverlappingTimings(times, [slot]);
        return hasSlotOverlap;
      })
    };
  });

  return matchResults
    .filter(r => r.confidence !== 0)
    .sort((a, b) => b.confidence - a.confidence);
}

// Updated findBestMatch function to use the new algorithm
export function findBestMatch(seniorRequest) {
  const { topic, timeSlots: preferredSlots, languages = [], zipCode = "" } = seniorRequest;
  
  const matchResults = matchInstructor(topic, preferredSlots, languages, zipCode);
  
  if (matchResults.length === 0) {
    return null;
  }
  
  // Return the best match with additional metadata
  const bestMatch = matchResults[0];
  return {
    instructor: bestMatch.instructor,
    score: bestMatch.confidence,
    availableSlots: bestMatch.availableSlots
  };
}

// Keep existing utility functions
export function generateZoomLink() {
  // In production, this would integrate with Zoom API
  const meetingId = Math.random().toString(36).substring(2, 15);
  return `https://zoom.us/j/${meetingId}`;
}

export function generateSessionId() {
  return 'session_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
}

// Export the new matching function for potential direct use
export { matchInstructor };