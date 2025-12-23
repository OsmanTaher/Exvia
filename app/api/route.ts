import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import MyData from "@/lib/models/MyData";

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const body = await request.json();
    console.log("Data received:", body);

    const newData = new MyData(body);
    await newData.save();

    return NextResponse.json({ message: "Data saved successfully!", data: newData }, { status: 201 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error saving data" }, { status: 500 });
  }
}