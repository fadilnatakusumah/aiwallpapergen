import React, { useCallback, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
import useClickOutside from "~/hooks/use-click-outside";

export const PopoverColorPicker = ({
  color,
  onChange,
}: {
  color?: string;
  onChange?: (newColor: string) => void;
}) => {
  const popover = useRef<HTMLDivElement>(null);
  const [isOpen, toggle] = useState(false);

  const close = useCallback(() => toggle(false), []);

  useClickOutside(popover, close);

  return (
    <div className="relative z-20">
      <div
        className="h-8 w-8 cursor-pointer rounded-lg border border-gray-500"
        style={{ backgroundColor: color }}
        onClick={() => toggle(true)}
      />

      {isOpen && (
        <div className="absolute left-0 top-0 z-30" ref={popover}>
          <HexColorPicker color={color} onChange={onChange} />
        </div>
      )}
    </div>
  );
};
