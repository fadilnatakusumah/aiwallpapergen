import { ComponentProps } from "react";
import "./index.css";

export function SpinnerGenerateWallpaper(props: ComponentProps<"span">) {
  return <span className="loader-generating" {...props} />;
}
