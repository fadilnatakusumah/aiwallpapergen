"use client";

import { motion } from "framer-motion";
import { useState } from "react";

import { Button } from "./ui/button";

interface DeviceSelectorProps {
  onChange?: (device: "desktop" | "mobile") => void;
  className?: string;
}

export default function DeviceSelector({
  onChange,
  className = "",
}: DeviceSelectorProps) {
  const [activeDevice, setActiveDevice] = useState<"desktop" | "mobile">(
    "desktop",
  );

  const handleDeviceChange = (device: "desktop" | "mobile") => {
    setActiveDevice(device);
    if (onChange) {
      onChange(device);
    }
  };

  return (
    <div
      className={`rounded-full border border-gray-200 bg-white p-1 ${className}`}
    >
      <div className="relative">
        {/* Animated background pill */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500"
          initial={false}
          animate={{
            x: activeDevice === "desktop" ? 0 : "100%",
            width: "50%",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />

        <div className="relative flex">
          <Button
            variant="ghost"
            className="z-10 rounded-full px-4 text-gray-900 data-[state=active]:text-white"
            data-state={activeDevice === "desktop" ? "active" : "inactive"}
            onClick={() => handleDeviceChange("desktop")}
          >
            Desktop
          </Button>
          <Button
            variant="ghost"
            className="z-10 rounded-full px-4 text-gray-900 data-[state=active]:text-white"
            data-state={activeDevice === "mobile" ? "active" : "inactive"}
            onClick={() => handleDeviceChange("mobile")}
          >
            Mobile
          </Button>
        </div>
      </div>
    </div>
  );
}
