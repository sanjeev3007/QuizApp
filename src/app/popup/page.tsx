"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Rocket,
  Brain,
  Calculator,
  Atom,
  BookOpen,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import NoahImage from "@/assets/Images/noahHomepageImage.png";
import Image from "next/image";

const rocketVariants = {
  animate: {
    x: [0, 10, 10, 0],
    y: [0, -10, -10, 0],
    rotate: [0, 0, 0, -360],
    transition: {
      duration: 3,
      ease: "easeInOut",
      times: [0, 0.4, 0.6, 1],
      repeat: Infinity,
      repeatDelay: 1,
    },
  },
};

export default function Component() {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md overflow-hidden rounded-3xl">
        <CardHeader className="bg-gradient-to-r from-[#ff9f6b] to-[#ff7f7f] p-4">
          <motion.div
            className="flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
          >
            <Image src={NoahImage} alt="Noah" width={100} height={100} />
          </motion.div>
          <h2 className="text-2xl font-bold text-white text-center mt-4">
            Learn with Noah!
          </h2>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <p className="text-center">
            Ready to challenge your mind and have fun?
            <br /> 🧠💪
          </p>
          <p className="text-sm text-gray-600 text-center mt-4">
            Explore exciting quizzes and chat with a smart Bot!
          </p>
          <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
            <div className="flex items-center space-x-2">
              <Calculator className="w-6 h-6 text-blue-500" />
              <span>Math Mysteries</span>
            </div>
            <div className="flex items-center space-x-2">
              <Atom className="w-6 h-6 text-green-500" />
              <span>Science Quests</span>
            </div>
            <div className="flex items-center space-x-2">
              <BookOpen className="w-6 h-6 text-yellow-500" />
              <span>English Adventures</span>
            </div>
            <div className="flex items-center space-x-2">
              <MessageCircle className="w-6 h-6 text-purple-500" />
              <span>Study Assistant</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 bg-gray-50 flex justify-center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => {}}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className="w-full bg-gradient-to-r from-[#ff9f6b] to-[#ff7f7f] transition-all h-12 rounded-full shadow-lg px-6"
            >
              <span className="flex items-center gap-2">
                <motion.div variants={rocketVariants} animate="animate">
                  <Rocket className="w-5 h-5" />
                </motion.div>
                Start Your Learning Adventure!
              </span>
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </div>
  );
}
