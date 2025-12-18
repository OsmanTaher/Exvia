"use client";
import { useState, useEffect } from "react";
import { QuizQuestion } from "@/types";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import QuizHeader from "../../ui/quiz/QuizHeader";
import QuestionNav from "../../ui/quiz/QuestionNav";
import QuestionCard from "../../ui/quiz/QuestionCard";
import QuizControls from "../../ui/quiz/QuizControls";

interface QuizInterfaceProps {
  quizData: QuizQuestion[];
  onExit: () => void;
}

const QuizInterface = ({ quizData, onExit }: QuizInterfaceProps) => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0 && !showResult) {
      handleFinishExam();
    }
    const timer = setInterval(() => setTimeLeft((p) => p - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, showResult]);

  const handleSelectOption = (optionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [currentQIndex]: optionIndex }));
  };

  const handleFinishExam = () => {
    setShowResult(true);
  };

  const calculateScore = () => {
    let correct = 0;
    quizData.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) correct++;
    });
    return Math.round((correct / quizData.length) * 100);
  };

  if (showResult) {
    const score = calculateScore();
    const isPassed = score >= 50;
    
    return (
      <div className="w-full bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center animate-in fade-in zoom-in">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Exam Results</h2>
        
        <div className="w-48 h-48 mb-6">
          <CircularProgressbar
            value={score}
            text={`${score}%`}
            styles={buildStyles({

              pathColor: isPassed ? `#22c55e` : `#ef4444`,
              textColor: isPassed ? `#15803d` : `#b91c1c`,
              trailColor: "#f3f4f6",
            })}
          />
        </div>

        <p className="text-lg text-gray-600 mb-8">
          {isPassed ? "Great job! You passed the exam." : "Keep studying and try again!"}
        </p>

        <button
          onClick={onExit}
          className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-bold shadow-lg"
        >
          Return to Course
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
      <QuizHeader timeLeft={timeLeft} />
      <div className="p-6">
        <QuestionNav
          totalQuestions={quizData.length}
          currentIndex={currentQIndex}
          answers={answers}
          onJumpTo={setCurrentQIndex}
        />
        <QuestionCard
          question={quizData[currentQIndex]}
          questionIndex={currentQIndex}
          selectedOption={answers[currentQIndex]}
          onSelectOption={handleSelectOption}
        />
        <QuizControls
          isFirst={currentQIndex === 0}
          isLast={currentQIndex === quizData.length - 1}
          onPrev={() => setCurrentQIndex((p) => p - 1)}
          onNext={() => setCurrentQIndex((p) => p + 1)}
          onSubmit={handleFinishExam} 
        />
      </div>
    </div>
  );
};

export default QuizInterface;