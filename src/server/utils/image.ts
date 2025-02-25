import sharp from "sharp";

export const optimizeImage = async (buffer: Buffer) => {
  return await sharp(buffer)
    .jpeg({ quality: 80 }) // Adjust the quality (70-85 is usually a good balance)
    .toBuffer();
};
