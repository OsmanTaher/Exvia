"use client";
import "@/app/globals.css";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { lectures } from "@/lib/data/lectures"; // تأكد أن مسار البيانات صحيح
import { QuizQuestion } from "@/types"; // تأكد من مسار الأنواع

// استدعاء المكونات الفرعية
import SectionHeader from "../../ui/common/SectionHeader";
import VideoPlayer from "../player/VideoPlayer";
import QuizInterface from "../quiz/QuizInterface";
import NotFound from "../page/NotFound"; // تأكد من المسار حسب هيكلة ملفاتك
import LectureList from "../../ui/course/LectureList";

const Course = () => {
  const searchParams = useSearchParams();
  const title = searchParams.get("title") ?? "Course";

  // --- States (الحالات) ---
  const [openLectureId, setOpenLectureId] = useState<number | null>(0);
  const [viewMode, setViewMode] = useState<"default" | "video" | "quiz">("default");
  
  // بيانات المحتوى النشط
  const [activeVideo, setActiveVideo] = useState<string>("");
  const [activeQuiz, setActiveQuiz] = useState<QuizQuestion[]>([]);
  
  // تحديد رقم المحاضرة التي الكويز الخاص بها مفتوح (لتحويل الزر للأحمر)
  const [activeQuizId, setActiveQuizId] = useState<number | null>(null);

  // --- Handlers (الدوال) ---

  // 1. منطق تشغيل/إغلاق الفيديو
  const handleToggleVideo = (url: string) => {
    // إذا كان الفيديو الحالي هو نفسه الذي ضغطنا عليه -> قم بإغلاقه
    if (viewMode === "video" && activeVideo === url) {
      handleBackToDefault();
    } else {
      // تشغيل فيديو جديد
      setActiveVideo(url);
      setActiveQuizId(null); // 👈 إغلاق أي كويز مفتوح فوراً
      setViewMode("video");
      // 🚫 تم إلغاء الصعود التلقائي (scrollTo) بناءً على طلبك
    }
  };

  // 2. منطق تشغيل/إغلاق الكويز
  const handleToggleQuiz = (lectureId: number, quiz: QuizQuestion[]) => {
    // إذا كان الكويز الحالي هو نفسه المفتوح -> قم بإغلاقه
    if (viewMode === "quiz" && activeQuizId === lectureId) {
      handleBackToDefault();
    } else {
      // فتح كويز جديد
      setActiveQuiz(quiz);
      setActiveQuizId(lectureId); // تسجيل رقم المحاضرة
      setActiveVideo("");         // 👈 إغلاق أي فيديو مفتوح فوراً
      setViewMode("quiz");
      // 🚫 تم إلغاء الصعود التلقائي (scrollTo) بناءً على طلبك
    }
  };

  // 3. العودة للوضع الافتراضي
  const handleBackToDefault = () => {
    setViewMode("default");
    setActiveVideo("");
    setActiveQuizId(null);
  };

  // معالجة الخطأ في العنوان
  if (title === "Error") return <NotFound />;

  return (
    <section className="bg-[--mainColor] min-h-screen pb-20">
      <div className="w-full container mx-auto p-4 max-w-[1260px]">
        
        {/* --- المنطقة العلوية (Dynamic Header) --- */}
        <div className="mb-8 animate-in fade-in duration-500">
          
          {/* الحالة 1: الوضع الافتراضي (صورة وعنوان الكورس) */}
          {viewMode === "default" && (
            <SectionHeader 
               title={title} 
               subtitle="Course Content & Materials" 
            />
          )}

          {/* الحالة 2: مشغل الفيديو */}
          {viewMode === "video" && (
             <VideoPlayer videoUrl={activeVideo} />
          )}

          {/* الحالة 3: واجهة الامتحان */}
          {viewMode === "quiz" && (
            <QuizInterface 
               quizData={activeQuiz} 
               onExit={handleBackToDefault} 
            />
          )}
        </div>

        {/* --- قائمة المحاضرات (Lecture List) --- */}
        <LectureList
          lectures={lectures}
          openLectureId={openLectureId}
          // نمرر الحالات لكي تعرف القائمة ماذا تلون بالأحمر
          activeVideoUrl={activeVideo}
          activeQuizId={activeQuizId}
          // دوال التحكم
          onToggle={(id) => setOpenLectureId(openLectureId === id ? null : id)}
          onPlayVideo={handleToggleVideo}
          onStartQuiz={handleToggleQuiz}
        />

      </div>
    </section>
  );
};

export default Course;