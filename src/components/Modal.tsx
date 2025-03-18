"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { cn } from "~/lib/utils";
import { Button } from "./ui/button";

interface ModalDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function ModalDialog({
  isOpen,
  onClose,
  title,
  children,
  className,
}: ModalDialogProps) {
  // Controls whether the modal is in the DOM
  const [isVisible, setIsVisible] = useState(false);
  // Controls the animation state
  const [isAnimating, setIsAnimating] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle mounting/unmounting and animation
  useEffect(() => {
    if (isOpen) {
      // First make the modal visible
      setIsVisible(true);
      // Then trigger animation in the next frame
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    } else {
      // First start the closing animation
      setIsAnimating(false);
      // Then remove from DOM after animation completes
      const timer = setTimeout(() => {
        setIsVisible(false);
        document.body.style.overflow = ""; // Re-enable scrolling
      }, 300); // Match transition duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Handle escape key
  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]);

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4",
        "transition-all duration-300 ease-in-out",
        isAnimating ? "bg-black/50 opacity-100" : "bg-black/0 opacity-0",
      )}
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        className={cn(
          "w-full max-w-md rounded-lg bg-background shadow-lg",
          "transform transition-all duration-300 ease-out",
          isAnimating
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-8 scale-95 opacity-0",
          className,
        )}
      >
        <div className="flex items-center justify-between border-b p-4">
          <h2 id="modal-title" className="text-xl font-semibold">
            {title}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
