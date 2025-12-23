import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Result from "@/lib/models/Result";

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    
    const newResult = await Result.create(body);
    
    return NextResponse.json({ message: "Score saved", data: newResult });
  } catch (error) {
    return NextResponse.json({ message: "Error saving score" }, { status: 500 });
  }
}