"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Lock, ShieldCheck, GraduationCap, School } from "lucide-react";

const login = () => {
  const router = useRouter();

  // 1. تعريف المتغيرات (State)
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student"); // القيمة الافتراضية طالب
  const [error, setError] = useState("");

  // 2. دالة التعامل مع تسجيل الدخول
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // التحقق البسيط (Hardcoded)
    if (password === "123456" && code !== "") {
      setError(""); // مسح أي خطأ سابق
      
      // توجيه المستخدم حسب الرتبة (يمكنك تغيير الروابط لاحقاً)
      if (role === "student") {
        router.push("/grade/1/IS"); // مثال: يذهب لصفحة الطالب
      } else if (role === "professor") {
        router.push("/professor-dashboard"); // صفحة الدكتور
      } else {
        router.push("/admin-dashboard"); // صفحة الأدمن
      }
      
    } else {
      setError("بيانات الدخول غير صحيحة. تأكد من الكود وكلمة المرور.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EDF5FF] p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        
        {/* الشعار والعنوان */}
        <div className="text-center mb-8">
          <div className="bg-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg text-white">
            <GraduationCap className="w-10 h-10" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">تسجيل الدخول</h1>
          <p className="text-gray-500 mt-2 text-sm">أهلاً بك في منصة الامتحانات</p>
        </div>

        {/* نموذج التسجيل */}
        <form onSubmit={handleLogin} className="space-y-5">
          
          {/* 1. اختيار الصلاحية (Role) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">الدخول كـ:</label>
            <div className="grid grid-cols-3 gap-2">
              {/* زر طالب */}
              <button
                type="button"
                onClick={() => setRole("student")}
                className={`p-2 rounded-lg text-sm flex flex-col items-center gap-1 border transition-all ${
                  role === "student" ? "bg-blue-50 border-blue-500 text-blue-700" : "border-gray-200 text-gray-500 hover:bg-gray-50"
                }`}
              >
                <GraduationCap className="w-5 h-5" />
                <span>Student</span>
              </button>

              {/* زر دكتور */}
              <button
                type="button"
                onClick={() => setRole("professor")}
                className={`p-2 rounded-lg text-sm flex flex-col items-center gap-1 border transition-all ${
                  role === "professor" ? "bg-blue-50 border-blue-500 text-blue-700" : "border-gray-200 text-gray-500 hover:bg-gray-50"
                }`}
              >
                <School className="w-5 h-5" />
                <span>Professor</span>
              </button>

              {/* زر أدمن */}
              <button
                type="button"
                onClick={() => setRole("admin")}
                className={`p-2 rounded-lg text-sm flex flex-col items-center gap-1 border transition-all ${
                  role === "admin" ? "bg-blue-50 border-blue-500 text-blue-700" : "border-gray-200 text-gray-500 hover:bg-gray-50"
                }`}
              >
                <ShieldCheck className="w-5 h-5" />
                <span>Admin</span>
              </button>
            </div>
          </div>

          {/* 2. كود الطالب (Username) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {role === "student" ? "كود الطالب" : "اسم المستخدم"}
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
                placeholder={role === "student" ? "أدخل كود الطالب" : "اسم المستخدم"}
                required
              />
            </div>
          </div>

          {/* 3. كلمة المرور */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">كلمة المرور</label>
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

          {/* رسالة الخطأ */}
          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg text-center">
              {error}
            </div>
          )}

          {/* زر الدخول */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-md hover:shadow-lg"
          >
            تسجيل الدخول
          </button>
        </form>

      </div>
    </div>
  );
};

export default login;