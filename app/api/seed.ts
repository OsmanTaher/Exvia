import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import User from "@/lib/models/User";

export async function GET() {
  try {
    await connectToDatabase();

    const existingUser = await User.findOne({ code: "0000" });
    if (existingUser) {
      return NextResponse.json({ message: "Admin already exists" });
    }

    const newAdmin = await User.create({
      code: "0000", 
      password: "admin", 
      name: "Main Admin",
      role: "admin",
    });

    return NextResponse.json({ message: "Admin created successfully", user: newAdmin });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}