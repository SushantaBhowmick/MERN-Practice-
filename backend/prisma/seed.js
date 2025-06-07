const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

const randomTitle = () => {
  const words = ["Fix", "Design", "Build", "Refactor", "Deploy", "Test"];
  return words[Math.floor(Math.random() * words.length)];
};

const randomDescription = () => {
  const notes = ["Urgent", "Normal", "Low priority", "QA passed", "Blocked", "In review"];
  return notes[Math.floor(Math.random() * notes.length)];
};

const randomFutureDate = () => {
  const now = new Date();
  now.setDate(now.getDate() + Math.floor(Math.random() * 30));
  return now;
};


// task seed
// const main = async () => {
//   for (let i = 1; i <= 1020; i++) {
//     await prisma.task.create({
//       data: {
//         title: `RS Task #${i} - ${randomTitle()}`,
//         description: `${randomDescription()} task for testing.`,
//         dueDate: randomFutureDate(),
//         userId: 1,
//       },
//     });
//     console.log(`✅ Created task #${i}`);
//   }
// };

async function main(){
  await prisma.category.createMany({
    data:[
     { name: "Electronics" },
      { name: "Books" },
      { name: "Clothing" },
      { name: "Home & Kitchen" },
      { name: "Beauty & Personal Care" },
      { name: "Sports & Outdoors" },
      { name: "Health & Wellness" },
      { name: "Toys & Games" },
      { name: "Automotive" },
      { name: "Pet Supplies" },
      { name: "Stationery & Office" },
      { name: "Groceries" },
    ]
  })
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log("🔌 Disconnected Prisma");
  });
