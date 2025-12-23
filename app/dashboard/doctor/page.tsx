import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import connectToDatabase from "@/lib/db";
import User from "@/lib/models/User";
import Result from "@/lib/models/Result";
import { User as UserIcon, GraduationCap, FileText } from "lucide-react";

async function getDoctorData(department: string) {
  await connectToDatabase();

  const students = await User.find({ role: "student", department: department });
  const results = await Result.find({ department: department }).sort({ createdAt: -1 });

  return { students, results };
}

export default async function DoctorDashboard() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");
  if (!session) redirect("/login");

  const user = JSON.parse(session.value);
  if (user.role !== "professor") return <div>Access Denied</div>;

  const { students, results } = await getDoctorData(user.department);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white p-6 rounded-xl shadow-sm border mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Dr. {user.name}</h1>
            <p className="text-gray-500">Department: {user.department}</p>
          </div>
          <div className="bg-blue-100 p-3 rounded-full">
            <UserIcon className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <GraduationCap className="text-blue-600" />
              Your Students ({students.length})
            </h2>
            <div className="overflow-y-auto max-h-[400px]">
              {students.length > 0 ? (
                <ul className="divide-y">
                  {students.map((student: any) => (
                    <li key={student._id} className="py-3 flex justify-between items-center">
                      <div>
                        <p className="font-semibold">{student.name}</p>
                        <p className="text-xs text-gray-500">Code: {student.code}</p>
                      </div>
                      <span className="bg-gray-100 text-xs px-2 py-1 rounded">
                        Grade {student.grade}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-center py-4">
                  No students found in {user.department}
                </p>
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FileText className="text-green-600" />
              Recent Quiz Results
            </h2>
            <div className="overflow-y-auto max-h-[400px]">
              {results.length > 0 ? (
                <ul className="divide-y">
                  {results.map((res: any) => (
                    <li key={res._id} className="py-3">
                      <div className="flex justify-between">
                        <p className="font-semibold text-gray-800">
                          {res.studentName}
                        </p>
                        <span
                          className={`font-bold ${
                            res.score >= res.total / 2
                              ? "text-green-600"
                              : "text-red-500"
                          }`}
                        >
                          {res.score} / {res.total}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>
                          {res.courseName} - {res.quizName}
                        </span>
                        <span>
                          {new Date(res.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-center py-4">
                  No results yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
