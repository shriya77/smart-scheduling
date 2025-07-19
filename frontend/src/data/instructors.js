export const instructors = [
  {
    id: "inst_001",
    name: "Alex Chen",
    expertise: ["Google Photos", "iPhone Basics", "Email Basics", "Video Calling"],
    languages: ["English", "Mandarin"],
    availability: ["Mon 10-12", "Wed 2-4", "Fri 9-11", "Sat 1-3"],
    zipCode: "10001",
    rating: 4.9,
    sessionsCompleted: 47,
    bio: "Patient instructor specializing in photo organization and smartphone basics."
  },
  {
    id: "inst_002", 
    name: "Maria Rodriguez",
    expertise: ["Microsoft Excel", "Google Docs", "Online Banking", "Password Management"],
    languages: ["English", "Spanish"],
    availability: ["Tue 11-1", "Thu 3-5", "Sat 10-12", "Sun 2-4"],
    zipCode: "10002",
    rating: 4.8,
    sessionsCompleted: 62,
    bio: "Excel expert who loves helping seniors manage their finances digitally."
  },
  {
    id: "inst_003",
    name: "David Park", 
    expertise: ["Social Media", "Facebook", "WhatsApp", "Online Shopping"],
    languages: ["English", "Korean"],
    availability: ["Mon 1-3", "Wed 10-12", "Fri 2-4", "Sun 11-1"],
    zipCode: "10003",
    rating: 4.7,
    sessionsCompleted: 34,
    bio: "Social media enthusiast helping seniors stay connected with family."
  },
  {
    id: "inst_004",
    name: "Sarah Johnson",
    expertise: ["iPad Basics", "App Store", "Entertainment Apps", "Health Apps"],
    languages: ["English"],
    availability: ["Tue 9-11", "Thu 1-3", "Fri 11-1", "Sat 3-5"],
    zipCode: "10004", 
    rating: 4.9,
    sessionsCompleted: 56,
    bio: "iPad specialist focused on entertainment and health applications for seniors."
  },
  {
    id: "inst_005",
    name: "Michael Thompson",
    expertise: ["Computer Security", "Google Chrome", "Wi-Fi Setup", "Email Basics"],
    languages: ["English", "French"],
    availability: ["Mon 2-4", "Tue 10-12", "Wed 1-3", "Thu 11-1"],
    zipCode: "10005",
    rating: 4.6,
    sessionsCompleted: 41,
    bio: "Security-focused instructor helping seniors stay safe online."
  },
  {
    id: "inst_006",
    name: "Lisa Wang",
    expertise: ["Zoom", "Video Calling", "Google Meet", "WhatsApp"],
    languages: ["English", "Mandarin", "Cantonese"],
    availability: ["Wed 9-11", "Thu 2-4", "Sat 11-1", "Sun 3-5"],
    zipCode: "10006",
    rating: 4.8,
    sessionsCompleted: 73,
    bio: "Video calling expert specializing in keeping families connected."
  },
  {
    id: "inst_007",
    name: "Robert Martinez",
    expertise: ["Google Photos", "Cloud Storage", "Photo Sharing", "Backup Solutions"],
    languages: ["English", "Spanish"],
    availability: ["Mon 11-1", "Tue 3-5", "Fri 10-12", "Sun 1-3"],
    zipCode: "10007",
    rating: 4.7,
    sessionsCompleted: 38,
    bio: "Photo organization specialist helping seniors preserve and share memories."
  },
  {
    id: "inst_008",
    name: "Emily Foster",
    expertise: ["Microsoft Word", "Google Docs", "Email Organization", "Calendar Apps"],
    languages: ["English"],
    availability: ["Tue 1-3", "Wed 11-1", "Thu 9-11", "Sat 2-4"],
    zipCode: "10008",
    rating: 4.9,
    sessionsCompleted: 51,
    bio: "Document and organization expert helping seniors stay productive."
  }
];
export const techTopics = new Set();

for (let i = 0; i < instructors.length; i++) {
  for (let j = 0; j < instructors[i].expertise.length; j++) {
    techTopics.add(instructors[i].expertise[j]);
  }
}
// techTopics = techTopics.values()
console.log(techTopics);
export const timeSlots = function(expert) {
  const time_ava = new Set();

  for (let i = 0; i < instructors.length; i++) {
    if (instructors[i].expertise.includes(expert)) {
      for (let j = 0; j < instructors[i].availability.length; j++) {
        time_ava.add(instructors[i].availability[j]);
      }
    }
  }

  console.log(expert, time_ava);
  return [...time_ava]; // Convert Set to array before returning
};

  

export const languages = new Set();

for (let i = 0; i < instructors.length; i++) {
  for (let j = 0; j < instructors[i].languages.length; j++) {
    languages.add(instructors[i].languages[j]);
  }
}
console.log(languages)