import { LucideIcon } from "lucide-react";


interface LectureItemProps {
  icon1: LucideIcon;
  icon2: LucideIcon;
  title: string;
  desc: string;
  actionText: string;
  onAction: () => void; 
  variant?: "blue" | "green" | "red";
}


const LectureItem = ({
  icon1: Icon1,
  icon2: Icon2,
  title,
  desc,
  actionText,
  onAction,
  variant = "blue",
}: LectureItemProps) => {
  
  const bgClass =
    variant === "green"
      ? "bg-green-600 hover:bg-green-700"
      : variant === "red"
      ? "bg-red-500 hover:bg-red-600" 
      : "bg-[#3C83F6] hover:bg-blue-700";
      
  const iconBgClass =
    variant === "green" 
      ? "bg-green-100 text-green-600" 
      : variant === "red"
      ? "bg-red-100 text-red-600" 
      : "bg-blue-100 text-blue-600";

  return (
    <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:shadow-md transition-shadow bg-white">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-lg ${iconBgClass}`}>
          <Icon1 className="w-6 h-6" />
        </div>
        <div>
          <h4 className="font-semibold text-gray-800 hidden sm:block">{title}</h4>
          <p className="text-sm text-gray-500 hidden sm:block">{desc}</p>
        </div>
      </div>

      <button
        onClick={onAction}
        className={`flex items-center gap-2 px-4 py-2 text-white rounded-lg transition-colors cursor-pointer font-medium ${bgClass}`}
      >
        <Icon2 className="w-4 h-4" />
        <span className="hidden md:inline">{actionText}</span>
      </button>
    </div>
  );
};

export default LectureItem;