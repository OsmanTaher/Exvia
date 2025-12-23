"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";


const Home = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const title = searchParams.get("title") ?? "Course";
  if (pathname === "/login" ||( pathname.includes("/course") && title == "IS Strategy")) {
    return null;
  }
  return (
    <div>
      <section className=" h-[calc(100vh-65px)] flex items-center justify-center text-center px-4">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-image.jpg"
            alt="Hero Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <div className="relative z-10 container  mx-auto">
          <h1
            className=" text-[40px] md:text-[70px] font-bold mb-6 leading-tight 
                        bg-linear-to-r from-blue-300 via-blue-500 to-blue-700 
                        bg-clip-text text-transparent"
          >
            Welcome to Student Exvia Platform
          </h1>

          <p className=" text-slate-300 font-semibold mb-8 mx-auto text-[30px] md:text-[40px] ">
            You can learn without paying a dime
          </p>
          <div className="flex justify-center"></div>
        </div>
      </section>
    </div>
  );
};

export default Home;
