const { google } = require('googleapis');

// You need to set up OAuth2 credentials and tokens for the instructor
const oAuth2Client = new google.auth.OAuth2(
  'YOUR_CLIENT_ID',
  'YOUR_CLIENT_SECRET',
  'YOUR_REDIRECT_URI'
);
// oAuth2Client.setCredentials({ refresh_token: 'INSTRUCTOR_REFRESH_TOKEN' });

async function createCalendarEvent({ instructor, student, topic, time, zoomLink }) {
  const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

  // Calculate end time (assume 1 hour duration)
  const startDate = new Date(time);
  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);

  const event = {
    summary: `Tutoring: ${topic}`,
    description: `Session with ${student.name}. Zoom: ${zoomLink}`,
    start: { dateTime: startDate.toISOString(), timeZone: 'UTC' },
    end: { dateTime: endDate.toISOString(), timeZone: 'UTC' },
    attendees: [
      { email: instructor.email },
      { email: student.email }
    ]
  };

  const res = await calendar.events.insert({
    calendarId: 'primary',
    resource: event,
    sendUpdates: 'all'
  });

  return res.data;
}

module.exports = { createCalendarEvent };
