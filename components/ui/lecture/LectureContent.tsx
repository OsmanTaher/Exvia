"use client";
import { Video, FileText, ClipboardList, Play, Download, X } from "lucide-react";
import LectureItem from "./LectureItem";
import { LectureData, QuizQuestion } from "@/types";

interface LectureContentProps {
  lecture: LectureData;
  activeVideoUrl: string;
  activeQuizId: number | null; // 👈 1. استقبال حالة الكويز النشط
  onPlay: (url: string) => void;
  // 👈 2. تحديث الدالة لتستقبل ID المحاضرة
  onStartQuiz: (id: number, quiz: QuizQuestion[]) => void;
}

const LectureContent = ({ 
  lecture, 
  activeVideoUrl, 
  activeQuizId, 
  onPlay, 
  onStartQuiz 
}: LectureContentProps) => {
  
  // هل الفيديو الخاص بهذه المحاضرة يعمل؟
  const isVideoPlaying = activeVideoUrl === lecture.videoUrl;
  
  // هل الكويز الخاص بهذه المحاضرة مفتوح؟
  const isQuizActive = activeQuizId === lecture.id;

  // --- دالة التحميل (Download Logic) ---
  const handleDownload = () => {
    if (!lecture.pdfUrl) {
      alert("No PDF file attached.");
      return;
    }

    const link = document.createElement('a');
    link.href = lecture.pdfUrl;
    link.setAttribute('download', lecture.pdfUrl.split('/').pop() || 'lecture-note.pdf');
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-4 flex flex-col gap-3 bg-gray-50/50">
      
      {/* 1. Video Item */}
      <LectureItem
        icon1={Video}
        // لو شغال اعرض X، لو لا اعرض Play
        icon2={isVideoPlaying ? X : Play}
        title={`${lecture.title} Video`}
        desc={isVideoPlaying ? "Click close to stop watching" : "Watch the lecture explanation"}
        actionText={isVideoPlaying ? "Close Video" : "Play Video"}
        // لو شغال لونه أحمر، لو لا أزرق
        variant={isVideoPlaying ? "red" : "blue"}
        onAction={() => onPlay(lecture.videoUrl)}
      />

      {/* 2. PDF Item */}
      <LectureItem
        icon1={FileText}
        icon2={Download}
        title="Lecture Notes (PDF)"
        desc="Download study materials"
        actionText="Download"
        onAction={handleDownload}
      />

      {/* 3. Quiz Item */}
      <LectureItem
        icon1={ClipboardList}
        // لو مفتوح اعرض X، لو مقفول اعرض Play
        icon2={isQuizActive ? X : Play}
        title="Lecture Quiz"
        desc={isQuizActive ? "Exam in progress..." : "Test your understanding"}
        actionText={isQuizActive ? "Close Exam" : "Start Exam"}
        // لو مفتوح لونه أحمر، لو مقفول أخضر
        variant={isQuizActive ? "red" : "green"}
        // نرسل ID المحاضرة + الأسئلة
        onAction={() => onStartQuiz(lecture.id, lecture.quiz)}
      />
      
    </div>
  );
};

export default LectureContent;