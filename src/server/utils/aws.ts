// src/utils/s3.ts
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { env } from "~/env";

const s3 = new S3Client({
  region: env.MY_AWS_REGION,
  credentials: {
    accessKeyId: env.MY_AWS_ACCESS_KEY_ID,
    secretAccessKey: env.MY_AWS_SECRET_ACCESS_KEY,
  },
});

export const uploadToS3 = async (
  imageBuffer: Buffer,
  prompt: string,
  userId: string,
) => {
  const key = `wallpapers/${userId}/${Date.now()}.jpg`; // Generate unique filename
  const params = {
    Bucket: env.MY_AWS_S3_BUCKET,
    Key: key,
    Body: imageBuffer,
    ContentType: "image/jpeg",
    Metadata: {
      prompt,
    },
  };

  await s3.send(new PutObjectCommand(params));
  return `https://${env.MY_AWS_S3_BUCKET}.s3.${env.MY_AWS_REGION}.amazonaws.com/${key}`;
};
