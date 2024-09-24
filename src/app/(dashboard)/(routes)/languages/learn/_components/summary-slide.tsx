import { RefreshCcw } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export const SummarySlide = ({
  correctAnswers,
  totalQuestions,
  onRestart,
}: {
  correctAnswers: number;
  totalQuestions: number;
  onRestart: () => void;
}) => {
  const searchParams = useSearchParams();
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
        <p className="text-xl mb-4">
          You got{" "}
          <span className="font-bold text-orange-400">{correctAnswers}</span>{" "}
          out of <span className="font-bold">{totalQuestions}</span> correct!
        </p>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
          <div
            className="bg-orange-400 h-2.5 rounded-full"
            style={{ width: `${(correctAnswers / totalQuestions) * 100}%` }}
          ></div>
        </div>
        <div className="flex flex-col space-y-4">
          <button
            onClick={onRestart}
            className="bg-orange-400 text-white px-4 py-2 rounded-full transition-transform hover:scale-105 flex items-center justify-center mx-auto"
          >
            <RefreshCcw size={20} className="mr-2" />
            Restart
          </button>
          <Link
            href={"/language/learn?" + searchParams.get("lang")}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-full transition-transform hover:scale-105 flex items-center justify-center mx-auto"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};
