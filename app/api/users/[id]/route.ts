import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import User from "@/lib/models/User";

// حذف مستخدم
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    await connectToDatabase();
    await User.findByIdAndDelete(id);
    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting user" }, { status: 500 });
  }
}

// تعديل بيانات مستخدم
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    await connectToDatabase();
    
    const updatedUser = await User.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ message: "Error updating user" }, { status: 500 });
  }
}