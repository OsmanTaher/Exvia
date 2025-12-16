import { LucideIcon } from "lucide-react";

interface CardProps {
  title: string;
  desc: string;
  icon: LucideIcon; 
}


const Card = ({ title, desc, icon: Icon }: CardProps) => {
  return (
    <div className="card-base p-8 group hover:scale-105 rounded-2xl text-center md:text-start md:max-w-[300px] transition-transform bg-white grow">
      <div className="w-12 h-12 bg-blue-50 group-hover:bg-blue-200 rounded-xl mx-auto md:mx-0 flex items-center justify-center mb-6 text-blue-600">
        <Icon className="w-6 h-6" /> 
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
    </div>
  );
};

export default Card;