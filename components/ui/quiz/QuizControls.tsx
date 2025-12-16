import { ArrowLeft, ArrowRight } from "lucide-react";

interface QuizControlsProps {
  isFirst: boolean;
  isLast: boolean;
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

const QuizControls = ({ isFirst, isLast, onPrev, onNext, onSubmit }: QuizControlsProps) => {
  return (
    <div className="flex justify-between items-center border-t pt-6 mt-4">
      {/* زر السابق */}
      <button
        disabled={isFirst}
        onClick={onPrev}
        className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-gray-600 font-medium hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        <ArrowLeft className="w-4 h-4" /> Previous
      </button>

      {/* زر التالي أو إنهاء */}
      {isLast ? (
         <button
           onClick={onSubmit}
           className="flex items-center gap-2 px-8 py-2.5 rounded-lg bg-green-600 text-white hover:bg-green-700 font-bold shadow-md hover:shadow-lg transition"
         >
           Submit Exam
         </button>
      ) : (
        <button
          onClick={onNext}
          className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#3C83F6] text-white hover:bg-blue-700 font-bold shadow-md hover:shadow-lg transition"
        >
          Next Question <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default QuizControls;