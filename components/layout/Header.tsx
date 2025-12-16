import Link from "next/link";
import { GraduationCap, Moon, Sun } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/60 backdrop-blur-lg">
      
      <div className="container h-16 flex items-center justify-between">
        
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
          <div className="bg-blue-500 p-1.5 rounded-lg">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-900">Exvia</span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-slate-700 hover:bg-sky-500 hover:text-white px-5 py-2 rounded-md transition-colors">
            Home
          </Link>

          <Link 
            href="/login" 
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Login
          </Link>

          <button className="p-2 rounded-md hover:bg-slate-100 hover:cursor-pointer text-slate-700 transition-colors">
             <Moon className="h-5 w-5 hidden dark:block" /> 
             <Sun className="h-5 w-5 block dark:hidden" /> 
          </button>
        </nav>

      </div>
    </header>
  )
}

export default Header
