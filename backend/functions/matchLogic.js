const tutors = [
  {
    "name": "John Doe",
    "expertise": ["Google Photos", "Google Docs"],
    "languages": ["English"],
    "availability": ["Mon 10-12", "Wed 2-4"]
  },
  {
    "name": "John Nolan",
    "expertise": ["Microsoft Excel", "Google Docs"],
    "languages": ["Spanish"],
    "availability": ["Fri 11-1", "Sat 3-5"]
  },
  {
    "name": "Mary Smith",
    "expertise": ["Microsoft Excel", "Microsoft Word"],
    "languages": ["English", "Spanish"],
    "availability": ["Tue 9-11", "Thu 1-3"]
  }
]

// function written by Shriya
function matchInstructor(requestedTopic, preferredTime, preferredLanguage) {
    return tutors
        .filter(tutor => tutor.expertise.includes(requestedTopic))
        .filter(tutor => tutor.availability.includes(preferredTime))
        .filter(tutor => tutor.languages.includes(preferredLanguage));
}

const requestedTopic = "Google Docs";
const preferredTime = "Wed 2-4";
const preferredLanguage = "English";

const matchedTutors = matchInstructor(requestedTopic, preferredTime, preferredLanguage);

if (matchedTutors.length > 0) {
  console.log("Matched Tutors:");
  matchedTutors.forEach(t => console.log(`- ${t.name}`));
} else {
  console.log("No matching tutor found.");
}

