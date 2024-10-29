import React, { useState, useEffect } from "react";
import {
  SinglePlatform,
  osFromAgent,
  Os,
} from "@/app/utils/wakatime-setup/tutorial-utils.client";
import { AnimatePresence, motion } from "framer-motion";

export default function Platforms({ wakaKey }: { wakaKey: string }) {
  const [showAllPlatforms, setShowAllPlatforms] = useState(false);
  const [userOs, setUserOs] = useState<Os>("unknown");

  useEffect(() => {
    const os = osFromAgent();
    setUserOs(os);
    setShowAllPlatforms(os === "unknown");
  }, []);

  return (
    <AnimatePresence mode="wait">
      {showAllPlatforms ? (
        <motion.div
          key={0}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "fit-content", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
        >
          <SinglePlatform os={"windows"} wakaKey={wakaKey} />
          <SinglePlatform os={"macos"} wakaKey={wakaKey} />
          <SinglePlatform os={"linux"} wakaKey={wakaKey} />
          <p
            className="text-xs mt-1 underline cursor-pointer"
            onClick={() => setShowAllPlatforms(false)}
          >
            Nevermind
          </p>
        </motion.div>
      ) : (
        <motion.div
          key={1}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "fit-content", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
        >
          <SinglePlatform os={userOs} wakaKey={wakaKey} />
          <p className="text-xs mt-1">
            Not using {userOs}?{" "}
            <span
              className="underline cursor-pointer"
              onClick={() => setShowAllPlatforms(true)}
            >
              View instructions for all platforms
            </span>
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
