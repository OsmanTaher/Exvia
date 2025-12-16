import { Timer, HelpCircle } from "lucide-react";

interface QuizHeaderProps {
  timeLeft: number; // الوقت المتبقي بالثواني
}

const QuizHeader = ({ timeLeft }: QuizHeaderProps) => {
  // دالة تحويل الثواني إلى دقيقة:ثانية
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="bg-[#3C83F6] text-white p-4 flex justify-between items-center shadow-md">
      <div className="flex items-center gap-2">
        <HelpCircle className="w-6 h-6" />
        <h2 className="text-xl font-bold">Exam Mode</h2>
      </div>
      
      {/* التايمر: يحمر لونه لما الوقت يقرب يخلص */}
      <div className={`flex items-center gap-2 font-mono text-xl font-bold bg-white/20 px-4 py-1 rounded-lg ${timeLeft < 60 ? "text-red-200 animate-pulse" : ""}`}>
        <Timer className="w-5 h-5" />
        {formatTime(timeLeft)}
      </div>
    </div>
  );
};

export default QuizHeader;