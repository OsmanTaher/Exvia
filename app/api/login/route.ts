import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import connectToDatabase from "@/lib/db";
import User from "@/lib/models/User";

export async function POST(request: Request) {
  try {
    const { code, password } = await request.json();
    await connectToDatabase();

    const user = await User.findOne({ code });

    if (!user || String(user.password) !== String(password)) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const userData = {
      id: user._id,
      name: user.name,
      code: user.code,
      role: user.role,
      grade: user.grade,
      department: user.department,

      academicDegree: user.academicDegree,
      age: user.age
    };

    const cookieStore = await cookies();
    cookieStore.set("session", JSON.stringify(userData), {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24, 
    });

    return NextResponse.json({ message: "Success", role: user.role });

  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}