import Activity from "@/components/activity";
import NoahHeader from "@/components/noah-subject-header";

const PageContent = () => {
  return (
    <>
      <NoahHeader />
      <Activity />
    </>
  );
};

const Page = () => {
  return (
    <div className="p-5 md:px-12 w-full md:max-w-7xl mx-auto bg-[#FFF] !important">
      <PageContent />
    </div>
  );
};

export default Page;
