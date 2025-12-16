import Department from "@/components/feature/academics/Department";
import NotFound from "@/components/feature/page/NotFound";
const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <div>
      {id == "1" || id == "2" ? <NotFound /> : <Department grade={id} />}
    </div>
  );
};

export default page;
