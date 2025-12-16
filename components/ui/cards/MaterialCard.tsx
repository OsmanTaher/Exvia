"use client";
import { Database, Server, Code, BookOpen } from "lucide-react";
import { useRouter, usePathname  } from "next/navigation";

const iconsMap = {
  database: Database,
  server: Server,
  code: Code,
  bookopen: BookOpen
};

interface MaterialCardProps {
  icon: keyof typeof iconsMap;
  title: string;
  desc: string;
  link?: string;
  grade?: string;
}

const MaterialCard = ({icon, title, desc, link, grade}: MaterialCardProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const Icon = iconsMap[icon];
  const clickView = ()=>{
    if(link && grade){
      router.push(`${grade}/${link}`);
    }
    else{
      router.push(`${pathname}/course?title=${title}`);
    }
  };
  return (
    <div className="card pr-[50px] mx-[15px] sm:mx-0 hover:shadow-lg hover:shadow-gray-300 hover:scale-105 transition-all">
      <Icon className="w-12 h-12 mb-[15px] text-white bg-[#3C83F6]  p-2  rounded-xl " />
      <h2 className="text-2xl font-medium ">{title}</h2>
      <p className="my-[15px] text-gray-500 text-[16px]">{desc}</p>
      <button
        onClick={ clickView }
        className="text-center  text-white bg-[#3C83F6] hover:opacity-90 rounded-lg
                  py-1 font-600  block w-[calc(100%+30px)] cursor-pointer"
      >
        View Courses
      </button>
    </div>
  );
};

export default MaterialCard;
