export const downloadImage = async (
  url: string,
  _filename = `aiwallpapergen-${new Date().toISOString()}`,
) => {
  const redirectWindow = window.open(url, "_blank");
  redirectWindow?.location;
};
