"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ClipLoader from "react-spinners/ClipLoader";

type TagColors = {
  math: string;
  science: string;
  english: string;
  coding: string;
};

const SubjectCard = ({
  subjectName,
  rank,
  answeredCount,
  cardClassName,
  status,
  loading,
}: {
  subjectName: string;
  rank: number | null;
  answeredCount: number | null;
  cardClassName: keyof TagColors;
  status: boolean;
  loading: boolean;
}) => {
  const router = useRouter();
  const tagColors = {
    math: "#b58440",
    science: "#40b59b",
    english: "#4096b5",
    coding: "#b58440",
  };

  return (
    <div
      className={`rounded-[16px] xs:w-[343px] md:w-[340px] lg:w-[548px] shadow-[0px_2px_8px_0px_#00000029] card-${cardClassName} md:m-5 xs:mt-5 xs:ml-auto xs:mr-auto`}
    >
      <div className="flex justify-between flex-row">
        <div className="flex justify-center flex-col">
          <div className="text-xl font-semibold leading-[24.2px] text-left text-[#5B8989] ml-8 mt-5">
            {subjectName}
          </div>
          <div className="flex flex-row justify-left mt-3 h-[33px]">
            {status && (
              <span
                className={`ml-8 p-[8px] rounded-[6px] tags-${cardClassName}`}
              >
                {loading ? (
                  <span>
                    <ClipLoader
                      color={tagColors[cardClassName]}
                      loading={loading}
                      size={16}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  </span>
                ) : (
                  <span className="flex flex-row gap-[8px]">
                    <Image
                      alt="trophy"
                      src="/images/icons/trophy_star.svg"
                      width={16}
                      height={16}
                      className="mt-auto mb-auto"
                    />
                    <span className="lg:text-sm xs:text-[11px] font-medium leading-[16.94px] text-left mt-auto mb-auto">
                      {!rank && !answeredCount
                        ? "Start practicing to earn badges"
                        : rank
                        ? rank
                        : "-"}
                    </span>
                  </span>
                )}
              </span>
            )}
            {(rank || answeredCount) && status && (
              <span
                className={`flex flex-row p-[8px] gap-[8px] rounded-[6px] tags-${cardClassName} ml-4`}
              >
                {answeredCount && (
                  <span className="lg:text-sm xs:text-[11px] font-medium leading-[16.94px] text-left mt-auto mb-auto">
                    {answeredCount} answered
                  </span>
                )}
              </span>
            )}
          </div>
        </div>
        <Image
          alt={cardClassName}
          height={100}
          width={100}
          src={`/images/icons/${cardClassName}-icon.svg`}
          className="mr-6 mt-6 xs:h-[64px] xs:w-[64px] lg:h-[100px] lg:w-[100px]"
        />
      </div>
      <div className="ml-8 mt-4 mb-5">
        <Button
          className={`w-[156px] h-[48px] top-[137px] left-[32px] p-[14px_20px] gap-[10px] rounded-[8px] 
          ${
            status
              ? "bg-[#E98451] hover:bg-[#E98451]"
              : "bg-[#C3B5AC] hover:bg-[#C3B5AC]"
          } text-[#FFF] `}
          disabled={!status}
          onClick={() => {
            router.push(
              `/subject-dashboard?subject=${subjectName.toLowerCase()}`
            );
          }}
        >
          {status ? "Get Started" : "Coming soon!"}
        </Button>
      </div>
    </div>
  );
};

export default SubjectCard;
