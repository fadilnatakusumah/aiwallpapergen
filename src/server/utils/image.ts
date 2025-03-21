import sharp from "sharp";

import { COMPRESSED_IMAGE_QUALITY } from "~/data/settings";

export const optimizeImage = async (buffer: Buffer) => {
  return await sharp(buffer)
    .png({ quality: COMPRESSED_IMAGE_QUALITY }) // Adjust the quality (70-85 is usually a good balance)
    .toBuffer();
};
