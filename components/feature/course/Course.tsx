"use client";
import "@/app/globals.css";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { lectures } from "@/lib/data/lectures";
import { QuizQuestion } from "@/types";

import SectionHeader from "../../ui/common/SectionHeader";
import VideoPlayer from "../player/VideoPlayer";
import QuizInterface from "../quiz/QuizInterface";
import LectureList from "../../ui/course/LectureList";
import NotFound from "../page/NotFound";

const Course = () => {
  const searchParams = useSearchParams();
  const title = searchParams.get("title") ?? "Course";

  const [openLectureId, setOpenLectureId] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"default" | "video" | "quiz">("default");

  const [activeVideo, setActiveVideo] = useState<string>("");
  const [activeQuiz, setActiveQuiz] = useState<QuizQuestion[]>([]);
  const [activeQuizId, setActiveQuizId] = useState<number | null>(null);
  
  // حالة لحفظ بيانات المستخدم
  const [user, setUser] = useState<any>(null);

  // جلب بيانات المستخدم عند تحميل الصفحة
  // (نحتاج هذا لأننا في Client Component ولا يمكننا استخدام cookies مباشرة)
  useEffect(() => {
    // سنقوم بقراءة الكوكيز من المتصفح يدوياً أو طلب API
    // الطريقة الأسهل هنا: قراءة الكوكي 'session' إذا كانت غير httpOnly
    // أو الأفضل: عمل endpoint بسيط '/api/me' يرجع بيانات المستخدم.
    // سأفترض وجود دالة لجلب المستخدم، أو سنقوم بفك تشفير الكوكي إذا كانت متاحة JS.
    
    // الحل البديل السريع: بما أننا في مشروع تعليمي، سنحاول جلبها من API قمنا بعمله سابقاً (login)
    // لكن بما أن الlogin API يعيد البيانات فقط عند الدخول..
    // سأقوم بعمل fetch بسيط من الـ Server Component في المستقبل.
    
    // **الحل العملي الآن:** سنقوم بإنشاء API صغير جداً اسمه /api/me لجلب المستخدم الحالي
    fetch("/api/me")
      .then(res => res.json())
      .then(data => {
        if (data.user) setUser(data.user);
      })
      .catch(err => console.error("Failed to fetch user", err));
  }, []);


  const handleToggleVideo = (url: string) => {
    if (viewMode === "video" && activeVideo === url) {
      handleBackToDefault();
    } else {
      setActiveVideo(url);
      setActiveQuizId(null);
      setViewMode("video");
      window.scrollTo({ top: 0, behavior: "smooth" }); // صعود للأعلى
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
      window.scrollTo({ top: 0, behavior: "smooth" }); // صعود للأعلى
    }
  };

  const handleBackToDefault = () => {
    setViewMode("default");
    setActiveVideo("");
    setActiveQuizId(null);
  };

  if (title !== "IS Strategy") {
    return  <NotFound />
  }

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

          {viewMode === "video" && <VideoPlayer videoUrl={activeVideo} />}

          {viewMode === "quiz" && (
            <QuizInterface 
              quizData={activeQuiz} 
              onExit={handleBackToDefault}
              // تمرير البيانات المطلوبة للحفظ
              user={user}
              courseName={title}
              quizName={`Quiz ${activeQuizId}`}
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