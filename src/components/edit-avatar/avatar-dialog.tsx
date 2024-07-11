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
import Avatars from "./avatars";
import CloseIcon from "@mui/icons-material/Close";
import avatarCount from "@/constants/avatarCount.json";
import apiService from "@/lib/apiService";

type EditProfileDialogProps = {
  open: boolean;
  onClose: () => void;
  userName: String;
  grade: String;
  studentId: String;
  setAvatar: Function;
};

const ActivityDialog: React.FC<EditProfileDialogProps> = ({
  open,
  onClose,
  userName,
  grade,
  studentId,
  setAvatar,
}) => {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [selectedAvatar, setSelectedAvatar] = useState<string>("");

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleAvatarSelect = (obj: any, index: number) => {
    setSelectedAvatar(
      `https://cy-asset-files.codeyoung.com/avatars/${obj.folder}/${obj.key}-${index}.png`
    );
  };

  const categoryList = {
    0: {
      name: "Toons",
      folder: "toons",
      key: "Toon",
      count: avatarCount["Toons"],
    },
    1: {
      name: "Prefects",
      folder: "prefects",
      key: "Bliss",
      count: avatarCount["Prefects"],
    },
    2: {
      name: "Cadets",
      folder: "cadets",
      key: "Space",
      count: avatarCount["Cadets"],
    },
    3: {
      name: "Gamers",
      folder: "gamers",
      key: "Gamer",
      count: avatarCount["Gamers"],
    },
    4: {
      name: "Supers",
      folder: "supers",
      key: "Super",
      count: avatarCount["Supers"],
    },
    5: {
      name: "Slayers",
      folder: "slayers",
      key: "Anime",
      count: avatarCount["Slayers"],
    },
    6: {
      name: "Animes",
      folder: "animes",
      key: "shimy",
      count: avatarCount["Animes"],
    },
  };

  const handleSubmit = async () => {
    try {
      await apiService.post("/student/profileImage", {
        imageURL: selectedAvatar,
        studentId,
      });
      setAvatar(selectedAvatar);
    } catch (err) {
      console.error("🚀 ~ handleSubmit ~ err:", err);
    }
    onClose();
  };

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
            src={selectedAvatar}
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
          {Object.keys(avatarCount).map((category, index) => (
            <Tab key={index} label={category} />
          ))}
        </Tabs>

        <Avatars
          categoryList={categoryList}
          selectedTab={selectedTab}
          handleAvatarSelect={handleAvatarSelect}
        />

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
