"use client";
import { coursesData } from "@/lib/data/courses";
import { BookOpen } from "lucide-react";
import MaterialCard from "@/components/ui/cards/MaterialCard";

const materials = ({ department }: { department: string }) => {
  return (
    <section className=" bg-[#EDF5FF]">
      <div className="container pt-[50px]">
        <h1 className="titleStyle">
          {department == "IT"
            ? "Information Technology"
            : department == "IS"
            ? "Information Systems"
            : "Computer Science"}
        </h1>
        <div className="depart">
          {coursesData.map((course, index) => (
            <MaterialCard
              key={index}
              icon= {BookOpen}
              title={course.title}
              desc={course.desc}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default materials;
