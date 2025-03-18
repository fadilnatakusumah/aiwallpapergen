import CreateWallpaper from "~/components/customs/CreatingWallpaper";
import { pageview } from "~/lib/gtag";

export default function Chat() {
  pageview("/c");

  return (
    <main className="h-full">
      <CreateWallpaper />
    </main>
  );
}
