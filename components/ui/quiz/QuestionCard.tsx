import { CheckCircle } from "lucide-react";
import { QuizQuestion } from "@/types"; 

interface QuestionCardProps {
  question: QuizQuestion;
  questionIndex: number;
  selectedOption?: number; 
  onSelectOption: (idx: number) => void;
}

const QuestionCard = ({ question, questionIndex, selectedOption, onSelectOption }: QuestionCardProps) => {
  return (
    <div className="mb-8 min-h-[200px]">
      <h3 className="text-xl font-bold text-gray-800 mb-6 leading-relaxed">
        <span className="text-[#3C83F6] mr-2">Question {questionIndex + 1}:</span>
        {question.question}
      </h3>
      
      <div className="space-y-3">
        {question.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => onSelectOption(idx)}
            className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between group
              ${selectedOption === idx 
                ? "bg-blue-50 border-[#3C83F6] text-[#3C83F6] shadow-sm" 
                : "bg-white border-gray-100 hover:border-blue-200 hover:bg-gray-50 text-gray-600"} 
            `}
          >
            <div className="flex items-center gap-3">
              <span className={`w-8 h-8 rounded-full border flex items-center justify-center text-sm font-bold ${selectedOption === idx ? "bg-[#3C83F6] text-white border-transparent" : "border-gray-300 text-gray-400"}`}>
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="font-medium">{option}</span>
            </div>
            
            {selectedOption === idx && <CheckCircle className="w-5 h-5 text-[#3C83F6]" />}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;