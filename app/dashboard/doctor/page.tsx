import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { User, School, Briefcase, Clock, FileText } from "lucide-react";

export default async function DoctorDashboard() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");

  if (!session) redirect("/login");

  const user = JSON.parse(session.value);

  if (user.role !== "professor") {
    return <div className="p-10 text-red-600">Access Denied</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-5xl mx-auto">
        
        <div className="bg-blue-900 text-white rounded-2xl p-8 shadow-lg mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Dr. {user.name}</h1>
            <p className="text-blue-200">Welcome to your academic dashboard</p>
          </div>
          <div className="bg-white/10 p-4 rounded-full">
            <User className="w-12 h-12" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="text-slate-400 mb-2"><Briefcase className="w-6 h-6"/></div>
            <p className="text-sm text-slate-500">Academic Degree</p>
            <h3 className="text-xl font-bold text-slate-800">{user.academicDegree || "Not Set"}</h3>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="text-slate-400 mb-2"><School className="w-6 h-6"/></div>
            <p className="text-sm text-slate-500">Department</p>
            <h3 className="text-xl font-bold text-slate-800">{user.department}</h3>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
             <div className="text-slate-400 mb-2"><Clock className="w-6 h-6"/></div>
            <p className="text-sm text-slate-500">Age</p>
            <h3 className="text-xl font-bold text-slate-800">{user.age || "--"} Years</h3>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
             <div className="text-slate-400 mb-2"><FileText className="w-6 h-6"/></div>
            <p className="text-sm text-slate-500">Code</p>
            <h3 className="text-xl font-bold text-slate-800">{user.code}</h3>
          </div>

        </div>

      </div>
    </div>
  );
}