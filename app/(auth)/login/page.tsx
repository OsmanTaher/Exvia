"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Lock, ShieldCheck, GraduationCap, School } from "lucide-react";

const Login = () => {
  const router = useRouter();

  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (password === "123456" && code !== "") {
      setError(""); 
      
      if (role === "student") {
        router.push("/grade/1/IS");
      } else if (role === "professor") {
        router.push("/professor-dashboard");
      } else {
        router.push("/admin-dashboard");
      }
      
    } else {
      setError("Login details are incorrect. Please check the code and password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EDF5FF] p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md  border-gray-100 border">
        
        <div className="text-center mb-8">
          <div className="bg-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg text-white">
            <GraduationCap className="w-10 h-10" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Exvia Platform</h1>
          <p className="text-gray-600 mt-2 text-md font-semibold">You can learn without paying a dime</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          
          <div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setRole("student")}
                className={`p-2 rounded-lg text-sm flex flex-col items-center gap-1 border transition-all cursor-pointer ${
                  role === "student" ? "bg-blue-50 border-blue-500 text-blue-700" : "border-gray-200 text-gray-500 hover:bg-gray-100"
                }`}
              >
                <GraduationCap className="w-5 h-5" />
                <span>Student</span>
              </button>

              <button
                type="button"
                onClick={() => setRole("professor")}
                className={` p-2 rounded-lg text-sm flex flex-col items-center gap-1 border transition-all cursor-pointer ${
                  role === "professor" ? "bg-blue-50 border-blue-500 text-blue-700" : "border-gray-200 text-gray-500 hover:bg-gray-100"
                }`}
              >
                <School className="w-5 h-5" />
                <span>Professor</span>
              </button>

              <button
                type="button"
                onClick={() => setRole("admin")}
                className={`p-2 rounded-lg text-sm flex flex-col items-center gap-1 border transition-all cursor-pointer ${
                  role === "admin" ? "bg-blue-50 border-blue-500 text-blue-700" : "border-gray-200 text-gray-500 hover:bg-gray-100"
                }`}
              >
                <ShieldCheck className="w-5 h-5" />
                <span>Admin</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {role === "student" ? "Code" : "Username"}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder={role === "student" ? "Code" : "Username"}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="••••••"
                required
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-md hover:shadow-lg"
          >
          Login
          </button>
        </form>

      </div>
    </div>
  );
};

export default Login;