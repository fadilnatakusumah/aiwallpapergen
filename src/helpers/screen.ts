interface DocumentWithFullscreen extends Document {
  mozFullScreenElement?: Element | null;
  webkitFullscreenElement?: Element | null;
  msFullscreenElement?: Element | null;
}

export function fsStatus(): number {
  if (typeof document === "undefined" || typeof window === "undefined")
    return -1;

  const doc = document as DocumentWithFullscreen;

  const isFullScreen =
    doc.fullscreenElement ??
    doc.mozFullScreenElement ??
    doc.webkitFullscreenElement ??
    doc.msFullscreenElement;

  return isFullScreen ? 1 : -1;
}
