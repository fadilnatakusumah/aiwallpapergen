import { isMobile, isTablet } from "react-device-detect";

export function getDeviceType() {
  if (isMobile) return "mobile";
  if (isTablet) return "tablet";
  return "desktop";
}
