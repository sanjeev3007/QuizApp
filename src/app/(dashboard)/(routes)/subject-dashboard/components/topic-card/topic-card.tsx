import Image from "next/image";
import { Button } from "@mui/material";
import "../subject-dashboard.css";

const TopicCard = ({
  badge,
  topic,
  rating,
}: {
  badge: string | null;
  topic: string;
  rating: number;
}) => {
  const badgeName = `topic-card-badge-${badge}`;
  const badgeText =
    badge == "assigned"
      ? "Assigned to you"
      : badge == "recommended"
      ? "Recommended"
      : "";

  const filledStarsArr = [];
  for (let i = 0; i < Math.floor(rating); i++) {
    filledStarsArr.push(i);
  }
  let halfFilledStar = false;
  if (rating - Math.floor(rating) > 0) {
    halfFilledStar = true;
  }
  const unfilledStarsArr = [];
  for (let i = 0; i < 5 - Math.ceil(rating); i++) {
    unfilledStarsArr.push(i);
  }

  const level = rating == 5 ? "master" : rating > 3 ? "pro" : "beginner";
  const nextBadge =
    level == "beginner" ? "Pro" : level == "pro" ? "Master" : null;

  return (
    <div className={`topic-card-container`}>
      <span className={`topic-card-badge ${badgeName} flex flex-row`}>
        <span>{badgeText}</span>
        {badge == "recommended" && (
          <span>
            <Image
              src="/images/Union.png"
              alt="star"
              width={14.5}
              height={16}
            />
          </span>
        )}
      </span>
      <div className="topic-card-heading">{`${topic}`}</div>
      <div className="topic-card-rating-container">
        <div className="flex flex-row justify-between">
          <div>
            <div>
              <span className="topic-card-rating-text">Your level: </span>
              <span
                className={`font-bowlby topic-card-rating-level level-${level}`}
              >
                {level?.toUpperCase()}
              </span>
            </div>
            <div className="flex flex-row mt-2 gap-5">
              <span className="flex flex-row gap-[8px] mt-auto mb-auto">
                {filledStarsArr.map((index) => {
                  return (
                    <Image
                      src="/images/full-star.png"
                      alt="full-star"
                      width={20}
                      height={20}
                      key={index}
                    />
                  );
                })}
                {halfFilledStar && (
                  <Image
                    src="/images/half-star.png"
                    alt="half-star"
                    width={20}
                    height={20}
                  />
                )}
                {unfilledStarsArr.map((index) => {
                  return (
                    <Image
                      src="/images/null-star.png"
                      alt="null-star"
                      width={20}
                      height={20}
                      key={index}
                    />
                  );
                })}
              </span>
              <span className="font-sans font-bold text-[#F0A205] text-center mt-auto mb-auto">{`${rating} / 5`}</span>
            </div>
            {level != "master" ? (
              <div>
                <span className="topic-card-rating-text">Achieve </span>
                <span
                  className={`font-inter text-xs font-bold leading-[14.52px] text-left level-${level}`}
                >
                  {`${level == "beginner" ? "3" : "5"} stars`}
                </span>
                <span className="topic-card-rating-text">{` to unlock '${nextBadge}' badge`}</span>
              </div>
            ) : (
              <div className="topic-card-rating-text mt-1">
                You achieved Master badge for this topic
              </div>
            )}
          </div>
          <div>
            <Image
              alt="level-icon"
              width={48}
              height={48}
              src={`/images/icons/level-${level}.png`}
              className="mt-4"
            />
          </div>
        </div>
      </div>
      <hr className="topic-card-hr" />
      <div className="flex flex-row justify-between md:mt-6 xs:mt-3">
        <div className="text-[#A3A3A3] text-sm mt-auto mb-auto">
          140 questions answered
        </div>
        <Button
          className="font-sans w-[120px] h-[37px] rounded-lg padding-[10px 20px 10px 20px] bg-[#EB9B3A] text-[#FFF] gap-1"
          style={{ textTransform: "none" }}
        >
          <span className="text-sm font-semibold">Practice</span>
          <span>
            <Image
              src="/images/icons/arrow-right.png"
              alt="arrow"
              width={16}
              height={16}
            />
          </span>
        </Button>
      </div>
    </div>
  );
};

export default TopicCard;
