"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

interface HeroVideoProps {
  videoSrc: string;
  className?: string;
}

export default function HeroVideoDialog({ videoSrc, className }: HeroVideoProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <div className={cn("relative", className)}>
      {/* Play Button */}
      <Button
        // className="flex size-12 items-center justify-center rounded-full bg-primary text-white shadow-md transition-transform hover:scale-110"
        onClick={() => setIsVideoOpen(true)}
      >
        watch video
        <Play className="size-6" />
      </Button>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md"
            onClick={() => setIsVideoOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="relative w-full max-w-2xl"
            >
              {/* Close Button */}
              <button
                className="absolute -top-10 right-0 flex size-8 items-center justify-center rounded-full bg-neutral-900 p-1 text-white shadow-md"
                onClick={() => setIsVideoOpen(false)}
              >
                <X className="size-5" />
              </button>

              {/* Video Player */}
              <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                <iframe
                  src={videoSrc}
                  className="w-full h-full"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
