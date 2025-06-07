const BaseUrl = "http://localhost:4000/api"

import axios from "axios";

// Replace this with your actual backend API endpoint

const createTask = async (index:number) => {
  const task = {
    title: `Task #${index} - ${randomTitle()}`,
    description: `Description for task #${index}. Details: ${randomSentence()}`,
    dueDate: randomFutureDate(),
  };

 
    const res = await axios.post(
      BaseUrl,
      task,
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTc0ODA4NjU3NSwiZXhwIjoxNzQ4MTI5Nzc1fQ.EOZ-pjUbymTYJcOnohcte-C3tnBg34M0tyVMaTVV_tA`,
        },
      }
    );
    console.log(`✅ Created task #${index}: ${res.data.task.title}`);
};

function randomTitle() {
  const words = ["Alpha", "Project", "Build", "Fix", "Update", "Design", "Review"];
  return words[Math.floor(Math.random() * words.length)];
}

function randomSentence() {
  const phrases = [
    "needs refactoring",
    "awaiting client feedback",
    "blocked by issue #42",
    "can be optimized further",
    "is critical for release",
    "has passed initial QA",
    "to be discussed in standup"
  ];
  return phrases[Math.floor(Math.random() * phrases.length)];
}

function randomFutureDate() {
  const now = new Date();
  const daysToAdd = Math.floor(Math.random() * 30);
  const futureDate = new Date(now.setDate(now.getDate() + daysToAdd));
  return futureDate.toISOString();
}

// Loop to create 100 tasks
(async () => {
  for (let i = 1; i <= 100; i++) {
    await createTask(i);
  }
})();
