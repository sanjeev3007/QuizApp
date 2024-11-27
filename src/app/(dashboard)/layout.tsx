"use client";
import React, { useEffect, useState } from "react";
import sandboxLogo from "@/assets/Images/sandboxLogo.svg";
import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import { usePathname, useRouter } from "next/navigation";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/HomeOutlined";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [showBackButton, setShowBackButton] = useState(false);
  const [isWebView, setIsWebView] = useState(false);

  useEffect(() => {
    // Check if we're in a WebView environment
    const checkWebView = () => {
      return window.ReactNativeWebView !== undefined;
    };

    setIsWebView(checkWebView());
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      setShowBackButton(true);
    } else {
      setShowBackButton(false);
    }
  }, [pathname]);

  const handleHome = () => {
    if (isWebView) {
      const mobileData = {
        type: "route",
      };
      window.ReactNativeWebView.postMessage(JSON.stringify(mobileData));
    }
  };

  return (
    <div
      className={`${inter.variable} font-sans h-full w-full bg-[#FFF] z-100`}
    >
      <div
        className={`w-full border-b-2 flex items-center justify-between bg-[#FFF] py-4 sticky top-0 z-[100] ${
          isWebView && "h-14"
        }`}
      >
        {showBackButton ? (
          <button
            onClick={() => {
              if (pathname.includes("student-dashboard")) {
                router.push("/");
              } else if (pathname.includes("subject-dashboard")) {
                router.push("/student-dashboard");
              } else if (pathname.includes("gk-quiz")) {
                router.push("/");
              } else if (pathname.includes("/quiz/")) {
                const subjectName = pathname.split("/")[2];
                router.push(
                  `/subject-dashboard?subject=${
                    subjectName == "math" ? "mathematics" : subjectName
                  }`
                );
              } else if (pathname.includes("chat-bot/")) {
                router.push("/chat-bot");
              } else if (pathname.includes("chat-bot")) {
                router.push("/");
              } else if (
                pathname.includes("languages/result") ||
                pathname.includes("languages/quiz") ||
                pathname.includes("languages/learn")
              ) {
                const urlParams = new URLSearchParams(window.location.search);
                const langParam = urlParams.get("lang");
                if (langParam) {
                  router.push(`/languages?lang=${langParam}`);
                } else {
                  router.push("/student-dashboard");
                }
              } else if (pathname.includes("languages")) {
                router.push("/student-dashboard");
              } else {
                router.back();
              }
            }}
            className="md:ml-6 xs:ml-5 lg:text-sm md:text-xs font-bold leading-tight
            text-left text-[#569090] flex flex-row justify-center items-center lg:hover:bg-[#FFF] xs:hover:bg-[#f2f7f7] p-2 rounded-full"
          >
            <Image
              src={"/images/icons/arrow-left.svg"}
              alt="arrow-left"
              width={20}
              height={20}
            />
            <span className="ml-1 xs:hidden md:block">Go Back</span>
          </button>
        ) : isWebView ? (
          <button
            onClick={() => {
              if (isWebView) {
                const mobileData = {
                  type: "route",
                };
                window.ReactNativeWebView.postMessage(
                  JSON.stringify(mobileData)
                );
              }
            }}
            className="xs:ml-5"
          >
            <Image
              src={"/images/icons/arrow-left.svg"}
              alt="arrow-left"
              width={20}
              height={20}
            />
          </button>
        ) : (
          <></>
        )}
        {!isWebView && (
          <Link href="/" className="mx-auto">
            <Image src={sandboxLogo} alt="sandbox-logo" />
          </Link>
        )}
        {isWebView && showBackButton && (
          <IconButton
            aria-label="home"
            onClick={handleHome}
            className=" right-0"
          >
            <HomeIcon style={{ color: "#569090" }} />
          </IconButton>
        )}
      </div>
      <main className="md:mt-[1rem] md:h-[calc(100vh-90px)] xs:h-[calc(100vh-56px)] bg-[#FFF] overflow-y-auto refresh-scroll-container">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
