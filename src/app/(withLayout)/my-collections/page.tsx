"use client";

import React from "react";
import { api } from "~/trpc/react";

function MyCollectionPage() {
  const wallpapers = api.wallpaper.getAllMyWallpapers.useQuery();
  return (
    <div>
      <h1>MyCollectionPage</h1>
    </div>
  );
}

export default MyCollectionPage;
