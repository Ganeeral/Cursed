import { StaticImageData } from "next/image";
import {
  backgroundImage1,
  backgroundImage2,
  backgroundImage3,
  backgroundImage4,
  backgroundImage5,
  backgroundImage6,
  backgroundImage7,
} from "@/ui/background";

const backgroundImages: StaticImageData[] = [
  backgroundImage1,
  backgroundImage2,
  backgroundImage3,
  backgroundImage4,
  backgroundImage5,
  backgroundImage6,
  backgroundImage7,
];

export const getRandomBackgroundImage = (): StaticImageData => {
  const randomIndex = Math.floor(Math.random() * backgroundImages.length);
  return backgroundImages[randomIndex];
};
