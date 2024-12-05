import { Icons } from "./_icons";

export const getCardIcon = (topic: string) => {
  switch (topic) {
    case "Animals and Nature":
      return Icons.laughingdog;
    case "Body Parts":
      return Icons.bodyparts;
    case "Everyday Objects":
      return Icons.everyday;
    case "Family Members":
      return Icons.familymembers;
    case "Food and Drinks":
      return Icons.burger;
    case "Colors and Shapes":
      return Icons.rainbow;
    case "Greetings and Introductions":
      return Icons.greetings;
    case "School and Classroom":
      return Icons.school;
    case "Numbers and Time":
      return Icons.numbers;
    case "Shopping and Money":
      return Icons.shopping;
    case "Weather and Seasons":
      return Icons.weather;
    case "Hobbies and Activities":
      return Icons.hobbies;
    case "Holidays and Celebrations":
      return Icons.hollydays;
    case "Making Friends":
      return Icons.makefriends;
    case "Music and Arts":
      return Icons.music;
    case "Travel and Transportation":
      return Icons.travel;
    case "At the Restaurant":
      return Icons.restaurant;
    case "Sports and Games":
      return Icons.swimming;
    case "Colors":
      return Icons.rainbow;
    case "Shapes":
      return Icons.shapes;
  }
};
