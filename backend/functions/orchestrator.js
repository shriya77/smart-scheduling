const { matchInstructor } = require('./matchLogic');
const { createZoomMeeting } = require('../services/zoom');
const { createCalendarEvent } = require('../services/calendar');
const { sendConfirmationEmail } = require('../services/email');

async function orchestrateBooking({ requestedTopic, preferredTimes, preferredLanguage, studentInfo }) {
  // 1. Match instructor
  const matchedTutors = matchInstructor(requestedTopic, preferredTimes, preferredLanguage);
  if (!matchedTutors.length) throw new Error('No suitable instructor found.');
  const instructor = matchedTutors[0];

  // 2. Create Zoom meeting
  const zoomMeeting = await createZoomMeeting({
    topic: requestedTopic,
    startTime: preferredTimes[0], // Should be ISO 8601
    host: instructor,
    student: studentInfo
  });

  // 3. Schedule on instructor's calendar
  const calendarEvent = await createCalendarEvent({
    instructor,
    student: studentInfo,
    topic: requestedTopic,
    time: preferredTimes[0], // Should be ISO 8601
    zoomLink: zoomMeeting.join_url
  });

  // 4. Send confirmation emails
  await sendConfirmationEmail({
    to: [studentInfo.email, instructor.email],
    subject: `Session Confirmed: ${requestedTopic}`,
    body: `Your session is scheduled! Join link: ${zoomMeeting.join_url}`
  });

  return {
    instructor,
    zoomMeeting,
    calendarEvent
  };
}

module.exports = { orchestrateBooking }; 