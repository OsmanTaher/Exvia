import { LucideIcon } from "lucide-react";

/**
 * Interface defining the props for the LectureItem component.
 * It includes icons, text details, and the action handler.
 */
interface LectureItemProps {
  icon1: LucideIcon;
  icon2: LucideIcon;
  title: string;
  desc: string;
  actionText: string;
  onAction: () => void; // Function to execute when the button is clicked
  // 👇 1. إضافة "red" هنا للأنواع المسموحة
  variant?: "blue" | "green" | "red";
}

/**
 * Renders a single lecture item row (Video, File, or Quiz) with an action button.
 * @param props - The properties for the lecture item.
 */
const LectureItem = ({
  icon1: Icon1,
  icon2: Icon2,
  title,
  desc,
  actionText,
  onAction,
  variant = "blue",
}: LectureItemProps) => {
  
  // 👇 2. تحديد لون خلفية الزر (Button Background)
  const bgClass =
    variant === "green"
      ? "bg-green-600 hover:bg-green-700"
      : variant === "red"
      ? "bg-red-500 hover:bg-red-600" // اللون الأحمر عند الإغلاق
      : "bg-[#3C83F6] hover:bg-blue-700";
      
  // 👇 3. تحديد لون خلفية الأيقونة (Icon Background)
  const iconBgClass =
    variant === "green" 
      ? "bg-green-100 text-green-600" 
      : variant === "red"
      ? "bg-red-100 text-red-600" // خلفية حمراء فاتحة للأيقونة
      : "bg-blue-100 text-blue-600";

  return (
    <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:shadow-md transition-shadow bg-white">
      {/* Left Section: Icon and Text */}
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-lg ${iconBgClass}`}>
          <Icon1 className="w-6 h-6" />
        </div>
        <div>
          <h4 className="font-semibold text-gray-800">{title}</h4>
          <p className="text-sm text-gray-500">{desc}</p>
        </div>
      </div>

      {/* Right Section: Action Button */}
      <button
        onClick={onAction}
        className={`flex items-center gap-2 px-4 py-2 text-white rounded-lg transition-colors cursor-pointer font-medium ${bgClass}`}
      >
        <Icon2 className="w-4 h-4" />
        <span>{actionText}</span>
      </button>
    </div>
  );
};

export default LectureItem;