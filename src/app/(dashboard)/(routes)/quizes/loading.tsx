import CircularProgress from "@mui/material/CircularProgress";

export default function QuizzesLoading() {
  return (
    <div className="flex justify-center items-center h-[90vh]">
      <CircularProgress size={40} />
    </div>
  );
}
