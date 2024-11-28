"use client";

import React, { useRef } from "react";
import Typed from "typed.js";

function HeroTypedAnimation() {
  const elTypedAnimation = useRef(null);

  React.useEffect(() => {
    const typed = new Typed(elTypedAnimation.current, {
      // showCursor: false,
      strings: [
        "Generate me a cool wallpaper",
        "Generate me an <strong>AWESOME</strong> wallpaper",
      ],
      typeSpeed: 50,
      contentType: "html",
      smartBackspace:true,
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);

  return (
    <div className="text-4xl mb-4">
      <span ref={elTypedAnimation} />
    </div>
  );
}

export default HeroTypedAnimation;
