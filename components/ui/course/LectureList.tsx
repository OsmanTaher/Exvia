import { LectureData, QuizQuestion } from "@/types";
import LectureCard from "../cards/LectureCard";
import LectureContent from "../lecture/LectureContent";

interface LectureListProps {
  lectures: LectureData[];
  openLectureId: number | null;
  activeVideoUrl: string;
  activeQuizId: number | null; // 👈 الخاصية الجديدة
  onToggle: (id: number) => void;
  onPlayVideo: (url: string) => void;
  // 👇 تحديث التوقيع ليشمل رقم المحاضرة
  onStartQuiz: (id: number, quiz: QuizQuestion[]) => void;
}

const LectureList = ({
  lectures,
  openLectureId,
  activeVideoUrl,
  activeQuizId, // استلامها
  onToggle,
  onPlayVideo,
  onStartQuiz,
}: LectureListProps) => {
  return (
    <div className="flex flex-col gap-4">
      {lectures.map((item) => (
        <LectureCard
          key={item.id}
          title={item.title}
          week={item.week}
          isOpen={openLectureId === item.id}
          onToggle={() => onToggle(item.id)}
        >
          {openLectureId === item.id && (
            <LectureContent
              lecture={item}
              activeVideoUrl={activeVideoUrl}
              activeQuizId={activeQuizId} // 👈 تمريرها للابن
              onPlay={onPlayVideo}
              onStartQuiz={onStartQuiz}
            />
          )}
        </LectureCard>
      ))}
    </div>
  );
};

export default LectureList;