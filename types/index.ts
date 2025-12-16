// types/index.ts
import { LucideIcon  } from "lucide-react";

// 1. تعريف الكورس (منقول من courses.ts)
export interface Course {
  id: number;
  title: string;
  desc: string;
  depart: string; // أو "IS" | "CS" | "IT" لو حابب تحددها بدقة
}

// 2. تعريف السؤال (منقول من quizzes.ts)
export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

// 3. تعريف المحاضرة (منقول من lectures.ts)
export interface LectureData {
  id: number;
  title: string;
  week: string;
  videoUrl: string;
  pdfUrl: string;
  quiz: QuizQuestion[]; // لاحظ إنه بيستخدم النوع اللي عرفناه فوق
}

export interface Departments {
  icon: string;
  title: string;
  depart: string;
  desc: string;
}

export interface Grades {
  id: number;
  title: string;
  img: string;
}

export interface Features {
  icon: LucideIcon;
  title: string;
  desc: string;
}
