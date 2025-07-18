// dummy test data
const tutors = [
  {
    name: "John Doe",
    expertise: ["Google Photos", "Google Docs"],
    languages: ["English"],
    availability: ["Mon 10-12", "Wed 2-4"]
  },
  {
    name: "John Nolan",
    expertise: ["Microsoft Excel", "Google Docs"],
    languages: ["English", "Spanish"],
    availability: ["Fri 11-1", "Sat 3-5"]
  },
  {
    name: "Mary Smith",
    expertise: ["Microsoft Excel", "Microsoft Word"],
    languages: ["English", "Spanish"],
    availability: ["Tue 9-11", "Thu 1-3"]
  }
];

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
        (endT > startU && endT <= endU) ||
        (startT <= startU && endT >= endU) // tutor time fully covers user time
      ) {
        return [true, -1];
      }
    }
  }
  return [false, 0];
}

// function written by Shriya and Kunal
function matchInstructor(requestedTopic, preferredTimes, preferredLanguage = "") {
  const topic = requestedTopic.trim().toLowerCase();
  const lang = preferredLanguage.trim().toLowerCase();
  const times = preferredTimes.map(t => t.trim());

  const matchResults = tutors.map(tutor => {
    if (!Array.isArray(tutor.availability) || tutor.availability.length === 0) return { tutor, confidence: 0 };
    const topicMatch = tutor.expertise.some(e => e.toLowerCase() === topic);
    const langMatch = !preferredLanguage || tutor.languages.some(l => l.toLowerCase() === lang);
    const [hasOverlap, confidence] = checkOverlappingTimings(times, tutor.availability);
    return {
      tutor,
      confidence: topicMatch && langMatch && hasOverlap ? confidence : 0
    };
  });

  return matchResults
    .filter(r => r.confidence !== 0)
    .sort((a, b) => b.confidence - a.confidence)
    .map(r => r.tutor);
}

// example call
const requestedTopic = "GOOGLE DOCS";
const preferredTimes = ["Fri 11am-1pm"];
const preferredLanguage = "";

const matchedTutors = matchInstructor(requestedTopic, preferredTimes, preferredLanguage);

if (matchedTutors.length > 0) {
  console.log("Matched Tutors:");
  matchedTutors.forEach(t => {
    const tutorConfidence = checkOverlappingTimings(preferredTimes, t.availability)[1];
    const label = tutorConfidence === 1 ? "Strong Match" : "⚠️ Partial Match";
    console.log(`- ${t.name} (${label}, Available: ${t.availability.join(", ")})`);
  });
} else {
  console.log("No exact match found. Try a different time or topic.");
};