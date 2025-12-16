interface SectionHeaderProps {
  title: string;
  subtitle: string;
}

const SectionHeader = ({ title, subtitle }: SectionHeaderProps) => {
  return (
    <div className="text-center mb-16">
      <h2 className="text-[30px] md:text-[40px] font-bold text-slate-800 mb-4">
        {title}
      </h2>
      <p className="text-slate-500 text-[15px] md:text-[20px] mx-auto">
        {subtitle}
      </p>
    </div>
  );
};

export default SectionHeader;
