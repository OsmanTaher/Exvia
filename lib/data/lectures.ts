
import { LectureData } from "@/types"; 
import {  quizLecture1, quizLecture2 } from "./quizzes";

export const lectures: LectureData[] = [
  {
    id: 1,
    title: "Lecture 1",
    week: "Week 1",
    videoUrl: "https://www.youtube.com/watch?v=czDVLNH39lk",
    pdfUrl: "/lecture/ch1.pdf",
    quiz: quizLecture1 
  },
  {
    id: 2,
    title: "Lecture 2",
    week: "Week 2",
    videoUrl: "https://youtu.com/watch?v=gT468xAGVBE",
    pdfUrl: "/lecture/ch2.pdf",
    quiz: quizLecture2
  },
];