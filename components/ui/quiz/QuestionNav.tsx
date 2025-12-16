interface QuestionNavProps {
  totalQuestions: number;
  currentIndex: number;
  answers: { [key: number]: number }; // الإجابات المسجلة عشان نلون الدوائر
  onJumpTo: (index: number) => void;
}

const QuestionNav = ({ totalQuestions, currentIndex, answers, onJumpTo }: QuestionNavProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-8 justify-center p-4 bg-gray-50 rounded-xl border border-gray-100">
      {Array.from({ length: totalQuestions }).map((_, idx) => {
        const isActive = currentIndex === idx;       // السؤال الحالي
        const isSolved = answers[idx] !== undefined; // هل تم حله؟

        return (
          <button
            key={idx}
            onClick={() => onJumpTo(idx)}
            className={`w-9 h-9 rounded-full text-sm font-bold transition-all border-2 flex items-center justify-center
              ${isActive 
                ? "bg-[#3C83F6] text-white border-[#3C83F6] scale-110 shadow-lg" // نشط
                : isSolved 
                  ? "bg-blue-800 text-white border-blue-800" // محلول
                  : "bg-white text-gray-500 border-gray-300 hover:border-[#3C83F6]" // لم يحل
              }
            `}
          >
            {idx + 1}
          </button>
        );
      })}
    </div>
  );
};

export default QuestionNav;