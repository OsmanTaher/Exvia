import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { User, GraduationCap, BookOpen, Hash, Building2 } from "lucide-react";

export default async function StudentDashboard() {

  const cookieStore = await cookies();
  const session = cookieStore.get("session");

  if (!session) {
    redirect("/login");
  }

  const user = JSON.parse(session.value);

  if (user.role !== "student") {
    return <div className="p-10 text-red-600">Access Denied: You are not a student.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white shadow-lg mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
            <p className="text-blue-100 opacity-90">Here is your academic profile overview.</p>
          </div>
          <div className="hidden md:block bg-white/10 p-4 rounded-full">
            <User className="w-12 h-12 text-white" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="bg-purple-100 p-3 rounded-lg text-purple-600">
              <Hash className="w-8 h-8" />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">Academic Code</p>
              <h3 className="text-2xl font-bold text-gray-800">{user.code}</h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-lg text-green-600">
              <GraduationCap className="w-8 h-8" />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">Current Grade</p>
              <h3 className="text-2xl font-bold text-gray-800">Grade {user.grade}</h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="bg-orange-100 p-3 rounded-lg text-orange-600">
              <Building2 className="w-8 h-8" />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">Department</p>
              <h3 className="text-2xl font-bold text-gray-800">{user.department} Department</h3>
            </div>
          </div>

          <a href={`/grade/${user.grade}/${user.department}`} className="group bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:border-blue-500 transition cursor-pointer">
            <div className="bg-blue-100 p-3 rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition">
              <BookOpen className="w-8 h-8" />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">Learning</p>
              <h3 className="text-xl font-bold text-blue-600 group-hover:text-blue-700">Go to My Courses &rarr;</h3>
            </div>
          </a>

        </div>
      </div>
    </div>
  );
}