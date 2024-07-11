import Slider from "react-slick";
import TopicCard from "./topic-card";
import "./topic-card.css";

const TopicCardCarousel = ({ items }: { items: any }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    initialSlide: 0,
    rows: 2,
    nextArrow: (
      <div className="carousel-buttons">
        <div className="next-slick-arrow rounded-[8px] xs:w-[15px] xs:h-[15px] md:w-[24px] md:h-[24px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            stroke="black"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
            className="xs:w-[15px] xs:h-[15px] md:w-[24px] md:h-[24px]"
          >
            <path d="m242-200 200-280-200-280h98l200 280-200 280h-98Zm238 0 200-280-200-280h98l200 280-200 280h-98Z" />
          </svg>
        </div>
      </div>
    ),
    prevArrow: (
      <div className="carousel-buttons">
        <div className="next-slick-arrow rotate-180 xs:w-[15px] xs:h-[15px] md:w-[24px] md:h-[24px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            stroke="black"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
            className="xs:w-[15px] xs:h-[15px] md:w-[24px] md:h-[24px]"
          >
            <path d="m242-200 200-280-200-280h98l200 280-200 280h-98Zm238 0 200-280-200-280h98l200 280-200 280h-98Z" />
          </svg>
        </div>
      </div>
    ),
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 1,
          dots: false,
        },
      },
    ],
  };

  return (
    <div className="carousel-container">
      {items.length > 0 && (
        <Slider {...settings}>
          {items.map((item: any, index: number) => {
            return (
              <div key={index}>
                <TopicCard
                  topic={item.topicName}
                  badge="assigned"
                  rating={item.totalScore}
                />
              </div>
            );
          })}
        </Slider>
      )}
    </div>
  );
};

export default TopicCardCarousel;
