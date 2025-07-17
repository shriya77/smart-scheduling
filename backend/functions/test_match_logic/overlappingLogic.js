const fs = require('fs');

// Load and parse JSON data
const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
const zoomers = data.zoomers;
const boomers = data.boomers;

// Create language-to-zoomer map
// faster access I chose language map because language is non-negotiable and we can reduce the search area from
// the very begining  
const langMap = {};
for (const [id, zoomer] of Object.entries(zoomers)) {
  for (let lang of zoomer.languages) {
    lang = lang.toLowerCase();
    if (!langMap[lang]) langMap[lang] = [];
    langMap[lang].push(id);
  }
}

// Set of matched zoomer IDs
const zoomData = new Set();
const boomer = boomers[1]; // Selecting the 2nd boomer

// Match based on language and requirement
for (const lang of boomer.languages) {
  const matches = langMap[lang.toLowerCase()] || [];
  for (const id of matches) {
    for (const req of boomer.requirement) {
      if (zoomers[id].expertise.includes(req)) {
        zoomData.add(id);
      }
    }
  }
}

// Parse time string to float hours
function parseTime(t) {
  if (t.includes(":")) {
    const [hr, mi] = t.split(":").map(Number);
    return hr + mi / 60.0;
  } else {
    return parseFloat(t);
  }
}

// Check overlapping timings
// It check for complete and partial overlap 
// if complete overlap it give it 1 and partial it gives -1 i.e might by adjustable but low priority
// 1 higher probability and -1 lower probablity 
function checkOverlappingTimings(boomerAvailability, zoomerAvailability) {
  for (let bTime of boomerAvailability) {
    const [day, timeRange] = bTime.split(" ");
    let [startB, endB] = timeRange.split("-").map(parseTime);

    for (let zTime of zoomerAvailability) {
      const [zDay, zRange] = zTime.split(" ");
      if (zDay !== day) continue;

      let [startZ, endZ] = zRange.split("-").map(parseTime);
      if (endZ < startZ) endZ += 12;

      if (startZ <= startB && endZ >= endB) {
        console.log(startB, endB, " ", startZ, endZ, 1);
        return [true, 1];
      } else if ((startZ > startB && endZ < endB) || (startZ < startB && endZ > endB)) {
        console.log(startB, endB, " ", startZ, endZ, -1);
        return [true, -1];
      }
    }
  }
  return [false, 0];
}

// Final matching and printing
for (const id of zoomData) {
  if (checkOverlappingTimings(boomer.availability, zoomers[id].availability)[0]) {
    console.log(boomer, zoomers[id]);
    console.log('---------------------------');
  }
}
