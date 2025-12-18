import { ReactNode } from "react";
import { ChevronDown } from "lucide-react";

interface LectureCardProps {
  title: string;
  week: string;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode; 
}

const LectureCard = ({ title, week, isOpen, onToggle, children }: LectureCardProps) => {
  return (
    <div className={`border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm transition-all duration-300 `}>
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between p-6 transition-colors cursor-pointer duration-300 ${isOpen ? "bg-blue-50" : "bg-white hover:bg-gray-50"}`}
      >
        <div className="text-left">
          <h3 className={`text-lg font-bold ${isOpen ? "text-[#3C83F6]" : "text-gray-800"}`}>
            {title}
          </h3>
          <span className="text-sm text-gray-500">{week}</span>
        </div>
        
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#3C83F6]" : ""}`} />
      </button>

      <div className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden bg-white border-t border-gray-100 border-color">
             {children}
        </div>
      </div>
    </div>
  );
};

export default LectureCard;