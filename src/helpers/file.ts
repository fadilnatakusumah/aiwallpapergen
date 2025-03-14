export const downloadImage = (
  url: string,
  filename: string = `aiwallpapergen-${new Date().toISOString()}`,
) => {
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.target = "_blank";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
};
