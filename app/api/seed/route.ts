import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import User from "@/lib/models/User";

const firstNames = [
  "Ahmed", "Mohamed", "Mahmoud", "Sara", "Nour", "Youssef", "Omar", "Fatma",
  "Mariam", "Khaled", "Amr", "Hassan", "Mona", "Ali", "Ibrahim", "Yara",
  "Hoda", "Ziad", "Salma", "Karim", "Dina", "Sherif"
];

const lastNames = [
  "Ali", "Ibrahim", "Hassan", "Yasser", "Fawzy", "Adel", "Salem", "Helmy",
  "Nabil", "Saad", "Osman", "Kamel", "Samir", "Zaki", "Taha", "Refaat"
];

const getRandomName = (prefix = "") => {
  const first = firstNames[Math.floor(Math.random() * firstNames.length)];
  const last = lastNames[Math.floor(Math.random() * lastNames.length)];
  return prefix ? `${prefix} ${first} ${last}` : `${first} ${last}`;
};

const generateRandomSuffix = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

export async function GET() {
  try {
    await connectToDatabase();

    await User.deleteMany({});
    console.log("🧹 Old data cleared");

    const users = [];

    users.push({
      name: "Main System Admin",
      code: "0000",
      password: "0000",
      role: "admin",
      department: "GN",
    });

    for (let i = 1; i <= 4; i++) {
      users.push({
        name: getRandomName("Dr."),
        code: `901${i}`,
        password: "123456",
        role: "professor",
        department: "IS",
        academicDegree: i % 2 === 0 ? "PhD" : "Master",
        age: 35 + Math.floor(Math.random() * 20),
      });
    }

    for (let i = 1; i <= 6; i++) {
      users.push({
        name: getRandomName("Dr."),
        code: `902${i}`,
        password: "123456",
        role: "professor",
        department: "CS",
        academicDegree: "PhD",
        age: 35 + Math.floor(Math.random() * 20),
      });
    }

    for (let i = 1; i <= 5; i++) {
      users.push({
        name: getRandomName("Dr."),
        code: `903${i}`,
        password: "123456",
        role: "professor",
        department: "IT",
        academicDegree: "Associate Professor",
        age: 35 + Math.floor(Math.random() * 20),
      });
    }

    const specializedDepartments = ["IS", "CS", "IT"];

    for (let i = 1; i <= 8; i++) {
      users.push({
        name: getRandomName(),
        code: `2025${generateRandomSuffix()}`,
        password: "123456",
        role: "student",
        grade: "1",
        department: "GN",
      });
    }

    for (let i = 1; i <= 8; i++) {
      users.push({
        name: getRandomName(),
        code: `2024${generateRandomSuffix()}`,
        password: "123456",
        role: "student",
        grade: "2",
        department: "GN",
      });
    }

    for (let i = 1; i <= 7; i++) {
      const randomDept = specializedDepartments[Math.floor(Math.random() * specializedDepartments.length)];
      users.push({
        name: getRandomName(),
        code: `2023${generateRandomSuffix()}`,
        password: "123456",
        role: "student",
        grade: "3",
        department: randomDept,
      });
    }

    for (let i = 1; i <= 7; i++) {
      const randomDept = specializedDepartments[Math.floor(Math.random() * specializedDepartments.length)];
      users.push({
        name: getRandomName(),
        code: `2022${generateRandomSuffix()}`,
        password: "123456",
        role: "student",
        grade: "4",
        department: randomDept,
      });
    }

    await User.insertMany(users);

    return NextResponse.json({
      message: "Database seeded successfully with Random Names! 🎉",
      counts: {
        admin: 1,
        professors: 15,
        students: 30
      }
    });

  } catch (error: any) {
    return NextResponse.json(
      { message: "Error seeding data", error: error.message },
      { status: 500 }
    );
  }
}
