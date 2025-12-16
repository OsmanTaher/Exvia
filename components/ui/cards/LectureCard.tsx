import { ReactNode } from "react";
import { ChevronDown } from "lucide-react";

/**
 * Interface for LectureCard props.
 * Note the addition of 'children' to allow nesting content.
 */
interface LectureCardProps {
  title: string;
  week: string;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode; // 👈 هذا هو السطر الناقص الذي يسبب الخطأ
}

const LectureCard = ({ title, week, isOpen, onToggle, children }: LectureCardProps) => {
  return (
    <div className={`border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm transition-all duration-300 ${isOpen ? "ring-1 ring-[#3C83F6] border-[#3C83F6]" : ""}`}>
      {/* Header Button (Clickable area) */}
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between p-6 transition-colors duration-300 ${isOpen ? "bg-blue-50" : "bg-white hover:bg-gray-50"}`}
      >
        <div className="text-left">
          <h3 className={`text-lg font-bold ${isOpen ? "text-[#3C83F6]" : "text-gray-800"}`}>
            {title}
          </h3>
          <span className="text-sm text-gray-500">{week}</span>
        </div>
        
        {/* Animated Arrow Icon */}
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#3C83F6]" : ""}`} />
      </button>

      {/* Content Area (Accordion Body) */}
      {/* Using grid animation for smooth open/close effect */}
      <div className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden bg-white border-t border-gray-100">
             {/* 👇 هنا سيتم عرض LectureContent */}
             {children}
        </div>
      </div>
    </div>
  );
};

export default LectureCard;