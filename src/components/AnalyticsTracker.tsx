"use client"; // This directive makes the component a Client Component
import { useEffect } from "react";
import { pageview } from "~/lib/gtag";

export default function AnalyticsTracker() {
  useEffect(() => {
    // This will only run on the client side
    pageview(window.location.pathname + window.location.search);
  }, []);

  return null; // This component doesn't render anything visible
}
