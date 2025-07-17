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

// function written by Shriya
function matchInstructor(requestedTopic, preferredTimes, preferredLanguage = "") {
  const topic = requestedTopic.trim().toLowerCase();
  const lang = preferredLanguage.trim().toLowerCase();
  const times = preferredTimes.map(t => t.trim());

  const matches = tutors.filter(tutor =>
    tutor.expertise.some(e => e.toLowerCase() === topic) &&
    (!preferredLanguage || tutor.languages.some(l => l.toLowerCase() === lang)) &&
    tutor.availability.some(a => times.includes(a))
  );

  return matches;
}

// example call
const requestedTopic = "GOOGLE DOCS";
const preferredTimes = ["Wed 2-4", "Fri 11-1"];
const preferredLanguage = "";

const matchedTutors = matchInstructor(requestedTopic, preferredTimes, preferredLanguage);

if (matchedTutors.length > 0) {
  console.log("Matched Tutors:");
  matchedTutors.forEach(t => {
    console.log(`- ${t.name} (Available: ${t.availability.join(", ")})`);
  });
} else {
  console.log("No exact match found. Try a different time or topic.");
};