import Activity from "@/components/activity";

const PageContent = () => {
  return <Activity/>;
};

const Page = () => {
  return (
    <div className="p-5 md:px-12 w-full md:max-w-7xl mx-auto bg-[#FFF] !important">
      <PageContent />
    </div>
  );
};

export default Page;
