import {
  DeleteObjectCommand,
  DeleteObjectCommandInput,
  PutObjectCommand,
  PutObjectCommandInput,
} from "@aws-sdk/client-s3";
import { RequestHandler } from "express";
import { UploadedFile } from "express-fileupload";
import { FieldPacket, ResultSetHeader } from "mysql2";

import { pool } from "../../mysql";
import { s3Client } from "../../s3";
import { IExecute } from "../../types/execute.interface";
import IResponse from "../../types/response.interface";
import { getKeyFromS3Url, getS3Url } from "../../utility/s3";
import ICategoryParam from "../types/category-params.interface";
import IUpdateCategoryBody from "../types/update-category-body.interface";

const updateCategory: RequestHandler<
  ICategoryParam,
  IResponse<ResultSetHeader>,
  IUpdateCategoryBody
> = async (req, res, next) => {
  try {
    const connection = await pool?.getConnection();
    const { id } = req.params;
    const { name, description = null, parentId = null } = req.body;
    const [rows]: IExecute = await connection!.execute(
      "SELECT imageUrl FROM product_categories WHERE id = ?",
      [id]
    );
    const imageUrl = rows[0].imageUrl;

    if (req.files?.image) {
      const image = req.files.image! as UploadedFile;
      const deleteParams: DeleteObjectCommandInput = {
        Bucket: process.env.S3_BUCKET!,
        Key: getKeyFromS3Url(imageUrl),
      };
      const key = `categories/${Date.now()}-${image.name}`;
      const params: PutObjectCommandInput = {
        Bucket: process.env.S3_BUCKET!,
        Key: key,
        Body: image.data,
        ContentType: image.mimetype,
      };

      await s3Client!.send(new DeleteObjectCommand(deleteParams));
      await s3Client!.send(new PutObjectCommand(params));

      const newImageUrl = getS3Url(key, process.env.S3_BUCKET!);
      const [data]: [ResultSetHeader, FieldPacket[]] =
        await connection!.execute(
          "UPDATE product_categories SET name = ?, description = ?, parentId = ?, imageUrl = ? WHERE id = ?",
          [name, description, parentId, newImageUrl, id]
        );
      connection?.release();

      res.json({
        success: true,
        data,
      });
    } else {
      const [rows]: [ResultSetHeader, FieldPacket[]] =
        await connection!.execute(
          "UPDATE product_categories SET name = ?, description = ?, parentId = ?, imageUrl = ? WHERE id = ?",
          [name, description, parentId, imageUrl, id]
        );
      connection?.release();

      res.json({
        success: true,
        data: rows,
      });
    }
  } catch (e) {
    next(e);
  }
};

export default updateCategory;
