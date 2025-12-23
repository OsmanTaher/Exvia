import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import User from "@/lib/models/User";

export async function GET() {
  try {
    await connectToDatabase();
    const users = await User.find({}).sort({ createdAt: -1 });
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ message: "Error fetching users" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    const existingUser = await User.findOne({ code: body.code });
    if (existingUser) {
      return NextResponse.json({ message: "User with this code already exists" }, { status: 400 });
    }

    const newUser = await User.create(body);
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error creating user", error }, { status: 500 });
  }
}