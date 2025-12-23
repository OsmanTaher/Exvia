"use client";
import Link from "next/link";
import { useState } from "react";
import {User, LogOut, LayoutDashboard, GraduationCap } from "lucide-react";
import { useRouter } from "next/navigation";
import "@/app/globals.css";

function Header({ user }: { user: any}) {
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const getDashboardLink = () => {
    if (!user) return "/login";
    if (user.role  === "admin") return "/dashboard/admin";
    if (user.role === "professor") return "/dashboard/doctor";
    return "/dashboard/student";
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto  py-3 flex justify-between items-center ">
        <Link href="/" className="flex items-center gap-2 hover:scale-105 transition transform">
          <div className="bg-blue-600 w-10 h-10 rounded-lg flex items-center justify-center shadow-md text-white">
            <GraduationCap className="w-6 h-6" />
          </div>
          <span className="text-xl font-bold text-gray-800">Exvia</span>
        </Link>

        <nav className=" flex items-center gap-2 md:gap-8">
          <Link href="/" className="text-white  bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded-xl transition font-medium">
            Home
          </Link>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center justify-center w-10 h-10 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition ring-2 ring-transparent hover:ring-blue-200"
              >
                <User className="w-5 h-5" />
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-2 border-b border-gray-50 mb-2">
                    <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.role}</p>
                  </div>

                  <Link
                    href={getDashboardLink()}
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition"
                    onClick={() => setShowMenu(false)}
                  >
                    <LayoutDashboard className="w-4 h-4" /> Dashboard
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 transition"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="bg-blue-500 text-white px-6 py-2 rounded-xl hover:bg-blue-700 hover:shadow-lg transition duration-300 font-medium"
            >
              Login
            </Link>
          )}
        </nav>

        
      </div>
    </header>
  );

}

export default Header;