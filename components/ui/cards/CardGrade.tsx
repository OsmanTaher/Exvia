import Image from "next/image";
import Link from "next/link";

interface CardGradeProps {
  id: string | number;
  title: string;
  img: string;
}

const CardGrade = ({ id, title, img }: CardGradeProps) => {
  return (
    <div className="relative bg-white w-[300px] group pb-2.5 m-2.5 grow md:grow-0
                    rounded-[20px] overflow-hidden hover:scale-105 transition-all border-2 border-gray-200">
      <Link href={`grade/${id}`}>
        <div className="relative">
          <Image
            src={img}
            className="group-hover:scale-105 transition-all"
            alt={title}
            width={500}
            height={400}
          />
          <div className="absolute inset-0 bg-black/20 hover:bg-black/0 transition-all"></div>
        </div>
        <h2 className="text-2xl text-gray-700 mt-2">{title}</h2>
      </Link>
    </div>
  );
};

export default CardGrade;
