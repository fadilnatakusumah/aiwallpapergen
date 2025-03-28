"use client";

import { motion, type MotionProps } from "framer-motion";
import { forwardRef } from "react";

type MotionTags = keyof HTMLElementTagNameMap; // Restrict to valid HTML tags

interface MotionWrapperProps extends MotionProps {
  tag?: MotionTags; // Accepts only valid HTML tag names
  className?: string;
  children?: React.ReactNode;
}

const MotionWrapper = forwardRef<HTMLElement, MotionWrapperProps>(
  ({ tag = "div", className, children, ...props }, ref) => {
    const MotionComponent = motion[tag] as React.ElementType; // Dynamically get motion.[tag]

    return (
      <MotionComponent ref={ref} className={className} {...props}>
        {children}
      </MotionComponent>
    );
  }
);

MotionWrapper.displayName = "MotionWrapper";

export default MotionWrapper;
