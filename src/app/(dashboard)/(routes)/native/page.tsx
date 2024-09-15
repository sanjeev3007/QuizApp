"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import CircularProgress from "@mui/material/CircularProgress";

const NativeComponent = () => {
  console.log("caleed native");
  const router = useRouter();
  useEffect(() => {
    const handleMessage = async (event) => {
      const data = event.data;
      console.log(event.data, "event data");

      // Handle the received data in your web app
      if (data?.authToken && data?.refreshToken) {
        console.log("any datat here");
        setCookie("Authorization", data?.authToken);
        setCookie("refresh-token", data?.refreshToken);
        setCookie("userName", data?.userName);
        setCookie("userId", data?.userId);
        setCookie("grade", data?.grade);

        // Route to the main page
        router.push("/");
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  });
  return (
    <div className="flex justify-center align-middle">
      {" "}
      <CircularProgress color="inherit" size={25} />
    </div>
  );
};

export default NativeComponent;
