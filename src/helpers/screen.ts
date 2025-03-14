export function fsStatus() {
  if (!document || window === undefined) return -1;

  const isFullScreen =
    (document && document.fullscreenElement) ||
    (document as any).mozFullScreenElement ||
    (document as any).webkitFullScreenElement ||
    (document as any).msFullScreenElement;
  if (isFullScreen) return 1;
  else return -1;
}
