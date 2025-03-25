export function fsStatus() {
  if (!document || window === undefined) return -1;

  const isFullScreen =
    document?.fullscreenElement ??
    (document as unknown as any).mozFullScreenElement ??
    (document as unknown as any).webkitFullScreenElement ??
    (document as unknown as any).msFullScreenElement;

  if (isFullScreen) return 1;
  else return -1;
}
