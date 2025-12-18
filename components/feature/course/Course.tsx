"use client";
import "@/app/globals.css";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { lectures } from "@/lib/data/lectures"; 
import { QuizQuestion } from "@/types";

import SectionHeader from "../../ui/common/SectionHeader";
import VideoPlayer from "../player/VideoPlayer";
import QuizInterface from "../quiz/QuizInterface";
import LectureList from "../../ui/course/LectureList";

const Course = () => {
  const searchParams = useSearchParams();
  const title = searchParams.get("title") ?? "Course";

  const [openLectureId, setOpenLectureId] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"default" | "video" | "quiz">("default");
  
  const [activeVideo, setActiveVideo] = useState<string>("");
  const [activeQuiz, setActiveQuiz] = useState<QuizQuestion[]>([]);
  
  const [activeQuizId, setActiveQuizId] = useState<number | null>(null);


  const handleToggleVideo = (url: string) => {
    if (viewMode === "video" && activeVideo === url) {
      handleBackToDefault();
    } else {
      setActiveVideo(url);
      setActiveQuizId(null); 
      setViewMode("video");
    }
  };

  const handleToggleQuiz = (lectureId: number, quiz: QuizQuestion[]) => {
    if (viewMode === "quiz" && activeQuizId === lectureId) {
      handleBackToDefault();
    } else {
      setActiveQuiz(quiz);
      setActiveQuizId(lectureId);
      setActiveVideo("");         
      setViewMode("quiz");
    }
  };

  // This Default Page .
  const handleBackToDefault = () => {
    setViewMode("default");
    setActiveVideo("");
    setActiveQuizId(null);
  };


  return (
    <section className="bg-[#EDF5FF] min-h-screen pb-20">
      <div className="w-full container mx-auto p-4 max-w-[1260px]">
        
        <div className="mb-8 animate-in fade-in duration-500">
          
          {viewMode === "default" && (
            <SectionHeader 
               title={title} 
               subtitle="Course Content & Materials" 
            />
          )}

          {viewMode === "video" && (
             <VideoPlayer videoUrl={activeVideo} />
          )}

          {viewMode === "quiz" && (
            <QuizInterface 
               quizData={activeQuiz} 
               onExit={handleBackToDefault} 
            />
          )}
        </div>

        <LectureList
          lectures={lectures}
          openLectureId={openLectureId}

          activeVideoUrl={activeVideo}
          activeQuizId={activeQuizId}

          onToggle={(id) => setOpenLectureId(openLectureId === id ? null : id)}
          onPlayVideo={handleToggleVideo}
          onStartQuiz={handleToggleQuiz}
        />

      </div>
    </section>
  );
};

export default Course;