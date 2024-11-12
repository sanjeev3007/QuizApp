"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

export default function Component() {
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (timeLeft <= 0) {
      // setIsVisible(false);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="w-full bg-gray-50 p-6 flex items-center justify-center mb-8"
        >
          <Card className="w-full max-w-md p-6">
            <div className="flex flex-col items-center gap-4">
              <h1 className="text-2xl font-bold text-[#5b8989]">
                Ready for a Quiz?
              </h1>
              <Button
                size="lg"
                className="bg-[#e98451] hover:bg-[#e98451]/80 text-white font-medium px-8 py-2 rounded-md transition-colors"
              >
                Let&apos;s Start
              </Button>
              <div className="flex items-center gap-2">
                <span className="text-2xl">⏳</span>
                <p className="font-medium text-gray-700">
                  Time left:{" "}
                  <span className="text-2xl font-bold text-[#e98451]">
                    {timeLeft}
                  </span>{" "}
                  seconds
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
