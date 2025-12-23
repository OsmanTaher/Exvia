"use client";
import { useState, useEffect } from "react";
import { QuizQuestion } from "@/types";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import QuizHeader from "../../ui/quiz/QuizHeader";
import QuestionNav from "../../ui/quiz/QuestionNav";
import QuestionCard from "../../ui/quiz/QuestionCard";
import QuizControls from "../../ui/quiz/QuizControls";
import { Loader2 } from "lucide-react";

interface QuizInterfaceProps {
  quizData: QuizQuestion[];
  onExit: () => void;
  user: any;        // تأكد أن هذه البيانات تصل من الصفحة الأب
  courseName: string; 
  quizName: string;
}

const QuizInterface = ({ quizData, onExit, user, courseName, quizName }: QuizInterfaceProps) => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [timeLeft, setTimeLeft] = useState(10 * 60);
  const [showResult, setShowResult] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // 5. الصعود لأعلى الصفحة عند فتح الكويز
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (timeLeft <= 0 && !showResult && !isSaving) {
      handleFinishExam();
    }
    const timer = setInterval(() => setTimeLeft((p) => p - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, showResult, isSaving]);

  const handleSelectOption = (optionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [currentQIndex]: optionIndex }));
  };

  const getCorrectCount = () => {
    let correct = 0;
    quizData.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) correct++;
    });
    return correct;
  };

  const handleFinishExam = async () => {
    setIsSaving(true);
    const correctAnswersCount = getCorrectCount();

    // 4. حل مشكلة الإرسال (التأكد من البيانات)
    if (!user) {
      console.error("User data is missing!");
      setIsSaving(false);
      setShowResult(true);
      return;
    }

    const resultData = {
      studentCode: user.code,
      studentName: user.name,
      department: user.department,
      courseName: courseName,
      quizName: quizName,
      score: correctAnswersCount,
      total: quizData.length
    };

    try {
      await fetch("/api/results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resultData),
      });
    } catch (error) {
      console.error("Error saving result:", error);
    } finally {
      setIsSaving(false);
      setShowResult(true);
      window.scrollTo({ top: 0, behavior: "smooth" }); // اصعد للأعلى عند عرض النتيجة أيضاً
    }
  };

  const calculatePercentage = () => {
    return Math.round((getCorrectCount() / quizData.length) * 100);
  };

  if (showResult) {
    const score = calculatePercentage();
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
          {isPassed ? "Great job! You passed." : "Keep studying!"}
        </p>
        <button onClick={onExit} className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-bold shadow-lg">
          Return to Course
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden relative">
      {isSaving && (
        <div className="absolute inset-0 bg-white/80 z-50 flex flex-col items-center justify-center backdrop-blur-sm">
           <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-2" />
           <p className="font-semibold text-gray-700">Submitting...</p>
        </div>
      )}
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