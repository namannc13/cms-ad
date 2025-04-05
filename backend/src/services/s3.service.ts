import {
  GetObjectCommand,
  PutObjectCommand,
  ListObjectsCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client, BUCKET_NAME } from "../config/aws.config";

export async function uploadFileToS3(file: Express.Multer.File) {
  const key = `uploads/user-uploads/${Date.now()}-${file.originalname}`;

  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
  });

  await s3Client.send(command);
  return key;
}

export async function getObjectUrl(key: string) {
  const command = new GetObjectCommand({ Bucket: BUCKET_NAME, Key: key });

  return await getSignedUrl(s3Client, command);
}

export async function listAdObjects() {
  const command = new ListObjectsCommand({ Bucket: BUCKET_NAME });

  return await s3Client.send(command);
}

export async function deleteAdObject(key: string) {
  const command = new DeleteObjectCommand({ Bucket: BUCKET_NAME, Key: key });

  return await s3Client.send(command);
}
