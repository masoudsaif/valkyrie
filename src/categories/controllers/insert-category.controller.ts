import { PutObjectCommand, PutObjectCommandInput } from "@aws-sdk/client-s3";
import { RequestHandler } from "express";
import { UploadedFile } from "express-fileupload";
import { FieldPacket, ResultSetHeader } from "mysql2";

import { pool } from "../../mysql";
import { s3Client } from "../../s3";
import ICategory from "../../types/category.interface";
import IResponse from "../../types/response.interface";
import { getS3Url } from "../../utility/s3";
import IInsertCategoryBody from "../types/insert-category-body.interface";

const insertCategory: RequestHandler<
  unknown,
  IResponse<ICategory>,
  IInsertCategoryBody
> = async (req, res, next) => {
  try {
    const connection = await pool?.getConnection();
    const { name, description = null, parentId = null } = req.body;
    const image = req.files!.image! as UploadedFile;
    const key = `categories/${Date.now()}-${image.name}`;
    const params: PutObjectCommandInput = {
      Bucket: process.env.S3_BUCKET,
      Key: key,
      Body: image.data,
      ContentType: image.mimetype,
    };
    await s3Client!.send(new PutObjectCommand(params));
    const imageUrl = getS3Url(key, process.env.S3_BUCKET!);
    const insertQuery: [ResultSetHeader, FieldPacket[]] =
      await connection!.execute(
        "INSERT INTO product_categories (name, description, parentId, imageUrl) VALUES (?, ?, ?, ?)",
        [name, description, parentId, imageUrl]
      );
    connection?.release();

    res.json({
      success: true,
      data: {
        id: insertQuery[0].insertId,
        name,
        description,
        parentId,
        imageUrl,
      },
    });
  } catch (e) {
    next(e);
  }
};

export default insertCategory;
