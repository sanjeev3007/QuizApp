import Image from "next/image";

// Create a reusable Icon component
const Icon = ({ src, alt }: { src: string; alt: string }) => {

  const imagePath = `/images/icons/${src}`;
  return (
    <Image
      src={imagePath}
      alt={alt}
      width={24}
      height={24}
      className="inline-block"
    />
  );
};

export const Icons = {
  burger: <Icon src="burger.svg" alt="Burger" />,
  coin: <Icon src="coin.svg" alt="Coin" />,
  greetings: <Icon src="greetings.svg" alt="Greetings" />,
  school: <Icon src="school.svg" alt="School" />,
  numbers: <Icon src="numbers.svg" alt="Numbers" />,
  makefriends: <Icon src="make-friends.svg" alt="Make Friends" />,
  laughingdog: <Icon src="laughing-dog.png" alt="laughing-dog" />,
  bodyparts: <Icon src="body-parts.png" alt="body-parts" />,
  familymembers: <Icon src="family-members.png" alt="family members" />,
  everyday: <Icon src="every-day-objects.png" alt="every-day-objects" />,
  hobbies: <Icon src="hobbies.png" alt=" hobbies" />,
  hollydays: <Icon src="hollydays.png" alt="hollydays" />,
  music: <Icon src="music.png" alt="music and arts" />,
  rainbow: <Icon src="rainbow.png" alt="colors and shapes" />,
  shopping: <Icon src="shopping.png" alt="shopping" />,
  travel: <Icon src="travel.png" alt="travels" />,
  weather: <Icon src="weathers.png" alt="weathers.png" />,
  swimming: <Icon src="swimming.png" alt="swimming" />,
  restaurant: <Icon src="restaurant.png" alt="restaurant" />,
  shapes: <Icon src="shapes.png" alt="shapes" />
};
