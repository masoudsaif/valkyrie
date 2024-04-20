import { S3Client } from "@aws-sdk/client-s3";

export let s3Client: S3Client | null = null;

export const connectS3 = () => {
  s3Client = new S3Client({
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY!,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
    },
    region: process.env.S3_REGION!,
  });
};
