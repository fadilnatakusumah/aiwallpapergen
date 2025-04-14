"use client";

// import dynamic from "next/dynamic";
import "driver.js/dist/driver.css";

// Dynamically import driver.js to disable SSR.
import { type Config, driver } from "driver.js";

export function appDriver(config?: Config) {
  return driver(config);
}
