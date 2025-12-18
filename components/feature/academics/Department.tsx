"use client";
import { departments } from "@/lib/department";
import { useRouter } from "next/navigation";
import MaterialCard from "@/components/ui/cards/MaterialCard";

const Department = ({ grade }: { grade: string }) => {
  const pathname = useRouter();
  return (
    <section className="py-[50px] bg-[#F0F7FF] ">
      <h3 onClick={ ()=> pathname.back() } className="titleStyle md:mb-12  transform translate-x-4 sm:translate-x-16 cursor-pointer">Back </h3>
      <div className=" depart ">
        {departments.map((depart, index) => {
          return (
            <MaterialCard
              key={index}
              icon={depart.icon}
              title={depart.title}
              desc={depart.desc}
              link={depart.depart}
              grade={grade}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Department;
