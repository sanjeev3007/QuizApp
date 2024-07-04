import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Avatar,
  Typography,
  Button,
  Tab,
  Tabs,
} from "@mui/material";
import "@/components/home-page.css";
import toon1 from "../assets/Images/Toons/Toon-1.png";
import toon2 from "../assets/Images/Toons/Toon-2.png";
import toon3 from "../assets/Images/Toons/Toon-3.png";
import toon4 from "../assets/Images/Toons/Toon-4.png";
import toon5 from "../assets/Images/Toons/Toon-5.png";
import toon6 from "../assets/Images/Toons/Toon-6.png";
import toon7 from "../assets/Images/Toons/Toon-7.png";
import toon8 from "../assets/Images/Toons/Toon-8.png";
import toon9 from "../assets/Images/Toons/Toon-9.png";
import toon10 from "../assets/Images/Toons/Toon-10.png";
import toon11 from "../assets/Images/Toons/Toon-11.png";
import toon12 from "../assets/Images/Toons/Toon-12.png";
import toon13 from "../assets/Images/Toons/Toon-13.png";
import toon14 from "../assets/Images/Toons/Toon-14.png";
import toon15 from "../assets/Images/Toons/Toon-15.png";
import toon16 from "../assets/Images/Toons/Toon-16.png";
import toon17 from "../assets/Images/Toons/Toon-17.png";
import toon18 from "../assets/Images/Toons/Toon-18.png";
import toon19 from "../assets/Images/Toons/Toon-19.png";
import toon20 from "../assets/Images/Toons/Toon-20.png";
import toon21 from "../assets/Images/Toons/Toon-21.png";
import toon22 from "../assets/Images/Toons/Toon-22.png";
import toon23 from "../assets/Images/Toons/Toon-23.png";
import toon24 from "../assets/Images/Toons/Toon-24.png";
import toon25 from "../assets/Images/Toons/Toon-25.png";
import toon26 from "../assets/Images/Toons/Toon-26.png";
import toon27 from "../assets/Images/Toons/Toon-27.png";
import toon28 from "../assets/Images/Toons/Toon-28.png";
import toon29 from "../assets/Images/Toons/Toon-29.png";
import toon30 from "../assets/Images/Toons/Toon-30.png";
import toon31 from "../assets/Images/Toons/Toon-31.png";
import toon32 from "../assets/Images/Toons/Toon-32.png";

import anime1 from "../assets/Images/Anime/shimy-1.png";
import anime2 from "../assets/Images/Anime/shimy-2.png";
import anime3 from "../assets/Images/Anime/shimy-3.png";
import anime4 from "../assets/Images/Anime/shimy-4.png";
import anime5 from "../assets/Images/Anime/shimy-5.png";
import anime6 from "../assets/Images/Anime/shimy-6.png";
import anime7 from "../assets/Images/Anime/shimy-7.png";
import anime8 from "../assets/Images/Anime/shimy-8.png";
import anime9 from "../assets/Images/Anime/shimy-9.png";
import anime10 from "../assets/Images/Anime/shimy-10.png";
import anime11 from "../assets/Images/Anime/shimy-11.png";
import anime12 from "../assets/Images/Anime/shimy-12.png";

import cadets1 from "../assets/Images/Cadets/Space-1.png";
import cadets2 from "../assets/Images/Cadets/Space-2.png";
import cadets3 from "../assets/Images/Cadets/Space-3.png";
import cadets4 from "../assets/Images/Cadets/Space-4.png";
import cadets5 from "../assets/Images/Cadets/Space-5.png";
import cadets6 from "../assets/Images/Cadets/Space-6.png";
import cadets7 from "../assets/Images/Cadets/Space-7.png";
import cadets8 from "../assets/Images/Cadets/Space-8.png";
import cadets9 from "../assets/Images/Cadets/Space-9.png";
import cadets10 from "../assets/Images/Cadets/Space-10.png";
import cadets11 from "../assets/Images/Cadets/Space-11.png";
import cadets12 from "../assets/Images/Cadets/Space-12.png";
import cadets13 from "../assets/Images/Cadets/Space-13.png";
import cadets14 from "../assets/Images/Cadets/Space-14.png";
import cadets15 from "../assets/Images/Cadets/Space-15.png";
import cadets16 from "../assets/Images/Cadets/Space-16.png";

import game1 from "../assets/Images/Gamers/Gamer-1.png";
import game2 from "../assets/Images/Gamers/Gamer-2.png";
import game3 from "../assets/Images/Gamers/Gamer-3.png";
import game4 from "../assets/Images/Gamers/Gamer-4.png";
import game5 from "../assets/Images/Gamers/Gamer-5.png";
import game6 from "../assets/Images/Gamers/Gamer-6.png";
import game7 from "../assets/Images/Gamers/Gamer-7.png";
import game8 from "../assets/Images/Gamers/Gamer-8.png";
import game9 from "../assets/Images/Gamers/Gamer-9.png";

import perfect1 from "../assets/Images/Perfects/Bliss-1.png";
import perfect2 from "../assets/Images/Perfects/Bliss-2.png";
import perfect3 from "../assets/Images/Perfects/Bliss-3.png";
import perfect4 from "../assets/Images/Perfects/Bliss-4.png";
import perfect5 from "../assets/Images/Perfects/Bliss-5.png";
import perfect6 from "../assets/Images/Perfects/Bliss-6.png";
import perfect7 from "../assets/Images/Perfects/Bliss-7.png";
import perfect8 from "../assets/Images/Perfects/Bliss-8.png";
import perfect9 from "../assets/Images/Perfects/Bliss-9.png";
import perfect10 from "../assets/Images/Perfects/Bliss-10.png";
import perfect11 from "../assets/Images/Perfects/Bliss-11.png";
import perfect12 from "../assets/Images/Perfects/Bliss-12.png";
import perfect13 from "../assets/Images/Perfects/Bliss-13.png";
import perfect14 from "../assets/Images/Perfects/Bliss-14.png";
import perfect15 from "../assets/Images/Perfects/Bliss-15.png";
import perfect16 from "../assets/Images/Perfects/Bliss-16.png";

import slayers1 from "../assets/Images/Slayers/Anime-1.png";
import slayers2 from "../assets/Images/Slayers/Anime-2.png";
import slayers3 from "../assets/Images/Slayers/Anime-3.png";
import slayers4 from "../assets/Images/Slayers/Anime-4.png";
import slayers5 from "../assets/Images/Slayers/Anime-5.png";
import slayers6 from "../assets/Images/Slayers/Anime-6.png";
import slayers7 from "../assets/Images/Slayers/Anime-7.png";
import slayers8 from "../assets/Images/Slayers/Anime-8.png";
import slayers9 from "../assets/Images/Slayers/Anime-9.png";
import slayers10 from "../assets/Images/Slayers/Anime-10.png";
import slayers11 from "../assets/Images/Slayers/Anime-11.png";
import slayers12 from "../assets/Images/Slayers/Anime-12.png";
import slayers13 from "../assets/Images/Slayers/Anime-13.png";
import slayers14 from "../assets/Images/Slayers/Anime-14.png";
import slayers15 from "../assets/Images/Slayers/Anime-15.png";
import slayers16 from "../assets/Images/Slayers/Anime-16.png";
import slayers17 from "../assets/Images/Slayers/Anime-17.png";
import slayers18 from "../assets/Images/Slayers/Anime-18.png";
import slayers19 from "../assets/Images/Slayers/Anime-19.png";
import slayers20 from "../assets/Images/Slayers/Anime-20.png";

import super1 from "../assets/Images/Supers/Super-1.png";
import super2 from "../assets/Images/Supers/Super-2.png";
import super3 from "../assets/Images/Supers/Super-3.png";
import super4 from "../assets/Images/Supers/Super-4.png";
import super5 from "../assets/Images/Supers/Super-5.png";
import super6 from "../assets/Images/Supers/Super-6.png";
import super7 from "../assets/Images/Supers/Super-7.png";
import super8 from "../assets/Images/Supers/Super-8.png";
import super9 from "../assets/Images/Supers/Super-9.png";
import super10 from "../assets/Images/Supers/Super-10.png";
import super11 from "../assets/Images/Supers/Super-11.png";
import super12 from "../assets/Images/Supers/Super-12.png";
import super13 from "../assets/Images/Supers/Super-13.png";
import super14 from "../assets/Images/Supers/Super-14.png";
import super15 from "../assets/Images/Supers/Super-15.png";
import super16 from "../assets/Images/Supers/Super-16.png";
import super17 from "../assets/Images/Supers/Super-17.png";
import super18 from "../assets/Images/Supers/Super-18.png";
import super19 from "../assets/Images/Supers/Super-19.png";
import super20 from "../assets/Images/Supers/Super-20.png";

import CloseIcon from "@mui/icons-material/Close";
import { StaticImageData } from "next/image";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

type EditProfileDialogProps = {
  open: boolean;
  onClose: () => void;
  onAvatarUpdate: (avatar: string) => void;
  userName: String;
  grade: String;
};

const avatarCategories = [
  "Toons",
  "Prefects",
  "Cadets",
  "Gamers",
  "Supers",
  "Slayers",
  "Animes",
];

const toonImages = [
  toon1,
  toon2,
  toon3,
  toon4,
  toon5,
  toon6,
  toon7,
  toon8,
  toon9,
  toon10,
  toon11,
  toon12,
  toon13,
  toon14,
  toon15,
  toon16,
  toon17,
  toon18,
  toon19,
  toon20,
  toon21,
  toon22,
  toon23,
  toon24,
  toon25,
  toon26,
  toon27,
  toon28,
  toon29,
  toon30,
  toon31,
  toon32,
];

const animeImages = [
  anime1,
  anime2,
  anime3,
  anime4,
  anime5,
  anime6,
  anime7,
  anime8,
  anime9,
  anime10,
  anime11,
  anime12,
];

const cadetImages = [
  cadets1,
  cadets2,
  cadets3,
  cadets4,
  cadets5,
  cadets6,
  cadets7,
  cadets8,
  cadets9,
  cadets10,
  cadets11,
  cadets12,
  cadets13,
  cadets14,
  cadets15,
  cadets16,
];

const gamerImages = [
  game1,
  game2,
  game3,
  game4,
  game5,
  game6,
  game7,
  game8,
  game9,
];

const perfectImages = [
  perfect1,
  perfect2,
  perfect3,
  perfect4,
  perfect5,
  perfect6,
  perfect7,
  perfect8,
  perfect9,
  perfect10,
  perfect11,
  perfect12,
  perfect13,
  perfect14,
  perfect15,
  perfect16,
];

const slayersImages = [
  slayers1,
  slayers2,
  slayers3,
  slayers4,
  slayers5,
  slayers6,
  slayers7,
  slayers8,
  slayers9,
  slayers10,
  slayers11,
  slayers12,
  slayers13,
  slayers14,
  slayers15,
  slayers16,
  slayers17,
  slayers18,
  slayers19,
  slayers20,
];

const superImages = [
  super1,
  super2,
  super3,
  super4,
  super5,
  super6,
  super7,
  super8,
  super9,
  super10,
  super11,
  super12,
  super13,
  super14,
  super15,
  super16,
  super17,
  super18,
  super19,
  super20,
];

const ActivityDialog: React.FC<EditProfileDialogProps> = ({
  open,
  onClose,
  onAvatarUpdate,
  userName,
  grade,
}) => {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [selectedAvatar, setSelectedAvatar] = useState<StaticImageData>(
    toonImages[0]
  );

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleAvatarSelect = (avatar: StaticImageData) => {
    setSelectedAvatar(avatar);
  };

  const getAvatarsByCategory = (): StaticImageData[] => {
    switch (selectedTab) {
      case 0:
        return toonImages;
      case 1:
        return perfectImages;
      case 2:
        return cadetImages;
      case 3:
        return gamerImages;
      case 4:
        return superImages;
      case 5:
        return slayersImages;
      case 6:
        return animeImages;
      default:
        return toonImages;
    }
  };

  const handleSubmit = () => {
    onAvatarUpdate(selectedAvatar.src);
    onClose();
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const avatarSize = isMobile ? 48 : 64;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle className="dialog-title">
        <Typography className="activityDialogHeading">Edit Profile</Typography>
        <Button onClick={onClose} className="close-icon">
          <CloseIcon />
        </Button>
      </DialogTitle>
      <DialogContent className="dialog-content">
        <div className="dialog-profile">
          <Avatar
            src={selectedAvatar.src}
            style={{ width: 80, height: 80, marginRight: 20 }}
          />
          <div>
            <Typography className="nameTag">{userName}</Typography>
            <Typography className="gradeTag">Grade {grade}</Typography>
          </div>
        </div>

        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons={false}
        >
          {avatarCategories.map((category, index) => (
            <Tab key={index} label={category} />
          ))}
        </Tabs>

        <div className="avatar-grid">
          {getAvatarsByCategory().map((avatar, index) => (
            <Button key={index} onClick={() => handleAvatarSelect(avatar)}>
              <Avatar
                src={avatar.src}
                alt={`Avatar ${index + 1}`}
                sx={{
                  width: avatarSize,
                  height: avatarSize,
                  borderRadius: "4px",
                }}
              />
            </Button>
          ))}
        </div>

        <div className="submitBtnContainer">
          <Button
            variant="contained"
            onClick={handleSubmit}
            className="submitBtn"
          >
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ActivityDialog;
