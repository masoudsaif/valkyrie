export const getKeyFromS3Url = (url: string) => {
  // Remove protocol and double slashes
  const trimmedUrl = url.replace(/(^\w+:|^)\/\//, "");

  // Split by slash to get parts
  const parts = trimmedUrl.split("/");

  // Key is everything after the bucket name (first part)
  const key = parts.slice(1).join("/");

  return key;
};

export const getS3Url = (key: string, bucket: string) =>
  `https://${bucket}.s3.amazonaws.com/${key}`;
