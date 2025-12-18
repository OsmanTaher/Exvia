"use client";
import { Video, FileText, ClipboardList, Play, Download, X } from "lucide-react";
import LectureItem from "./LectureItem";
import { LectureData, QuizQuestion } from "@/types";

interface LectureContentProps {
  lecture: LectureData;
  activeVideoUrl: string;
  activeQuizId: number | null; 
  onPlay: (url: string) => void;
  onStartQuiz: (id: number, quiz: QuizQuestion[]) => void;
}

const LectureContent = ({ 
  lecture, 
  activeVideoUrl, 
  activeQuizId, 
  onPlay, 
  onStartQuiz 
}: LectureContentProps) => {
  
  const isVideoPlaying = activeVideoUrl === lecture.videoUrl;
  
  const isQuizActive = activeQuizId === lecture.id;

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
      
      <LectureItem
        icon1={Video}

        icon2={isVideoPlaying ? X : Play}
        title={`${lecture.title} Video`}
        desc={isVideoPlaying ? "Click close to stop watching" : "Watch the lecture explanation"}
        actionText={isVideoPlaying ? "Video" : "Video"}

        variant={isVideoPlaying ? "red" : "blue"}
        onAction={() => onPlay(lecture.videoUrl)}
      />

      <LectureItem
        icon1={FileText}
        icon2={Download}
        title="Lecture Notes (PDF)"
        desc="Download study materials"
        actionText="Download"
        onAction={handleDownload}
      />

      <LectureItem
        icon1={ClipboardList}

        icon2={isQuizActive ? X : Play}
        title="Lecture Quiz"
        desc={isQuizActive ? "Exam in progress..." : "Test your understanding"}
        actionText={isQuizActive ? "Close" : "Start"}

        variant={isQuizActive ? "red" : "green"}

        onAction={() => onStartQuiz(lecture.id, lecture.quiz)}
      />
      
    </div>
  );
};

export default LectureContent;