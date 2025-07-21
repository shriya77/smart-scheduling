const axios = require('axios');

const ZOOM_JWT_TOKEN = 'YOUR_ZOOM_JWT_TOKEN'; // Replace with your JWT or OAuth token

async function createZoomMeeting({ topic, startTime, host, student }) {
  const userId = 'me'; // or instructor's Zoom user ID/email
  const url = `https://api.zoom.us/v2/users/${userId}/meetings`;

  const payload = {
    topic: topic,
    type: 2, // Scheduled meeting
    start_time: startTime, // ISO 8601 format
    duration: 60, // minutes
    timezone: 'UTC',
    agenda: `Session with ${student.name}`,
    settings: {
      join_before_host: false,
      approval_type: 1,
      registration_type: 1,
      enforce_login: false,
      waiting_room: true
    }
  };

  const response = await axios.post(url, payload, {
    headers: {
      'Authorization': `Bearer ${ZOOM_JWT_TOKEN}`,
      'Content-Type': 'application/json'
    }
  });

  return response.data; // Contains join_url, start_url, etc.
}

module.exports = { createZoomMeeting };
