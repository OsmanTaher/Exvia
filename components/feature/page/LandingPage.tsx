import SectionHeader from "@/components/ui/common/SectionHeader";
import { features } from "@/lib/features";
import { grades } from "@/lib/grades";
import CardGrade from "@/components/ui/cards/CardGrade";
import Card from "@/components/ui/cards/Card";

export default function LandingPage() {
  return (
    <div>
      <section className="py-20 bg-[#EDF5FF] ">
        <div className="container">
          <SectionHeader
            title="Why Choose Our Platform?"
            subtitle="Discover the advantages that make us the trusted choice for modern education"
          />

          <div className="flex justify-around items-center flex-wrap gap-4  ">
            {features.map((feature, ind) => (
              <Card
                key={ind}
                icon={feature.icon}
                title={feature.title}
                desc={feature.desc}
              />
            ))}
          </div>
        </div>
      </section>
      {/* Section For Grade  */}
      <section className="text-center pb-[30px] md:pb-[60px] bg-[#EDF5FF] ">
        <SectionHeader
          title="Select Your Grade"
          subtitle="Choose your grade level to access courses and examinations"
        />
        <div className="  flex justify-center items-center flex-wrap gap-6">
          {grades.map((grade) => (
            <CardGrade
              key={grade.id}
              id={grade.id}
              title={grade.title}
              img={grade.img}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
