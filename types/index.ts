import { LucideIcon } from "lucide-react";

export interface MaterialCardProps {
  icon: LucideIcon;
  title: string;
  desc: string;
  link?: string;
  grade?: string;
}

export interface Course {
  id: number;
  title: string;
  desc: string;
  depart: "IS" | "CS" | "IT"; 
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface LectureData {
  id: number;
  title: string;
  week: string;
  videoUrl: string;
  pdfUrl: string;
  quiz: QuizQuestion[]; 
}

export interface Departments {
  icon: LucideIcon;
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
