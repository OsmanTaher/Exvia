"use client";
import { departments } from "@/lib/department";
import MaterialCard from "@/components/ui/cards/MaterialCard";

const Department = ({ grade }: { grade: string }) => {
  return (
    <section className=" depart ">
      {departments.map((depart, index) => {
        return (
          <MaterialCard
            key={index}
            icon={depart.icon as "database" | "server" | "code"}
            title={depart.title}
            desc={depart.desc}
            link={depart.depart}
            grade={grade}
          />
        );
      })}
    </section>
  );
};

export default Department;
