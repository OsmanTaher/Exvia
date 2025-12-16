import NotFound from "@/components/feature/page/NotFound";
import Materials from "@/components/feature/academics/Materials";

const page = async ({
  params,
}: {
  params: Promise<{ id: string; dpt: string }>;
}) => {
  const { id, dpt } = await params;
  return (
    <div>
      {dpt == "CS" || dpt == "IT" || id == "4" ? (
        <NotFound />
      ) : (
        <Materials department={dpt} />
      )}
    </div>
  );
};

export default page;
