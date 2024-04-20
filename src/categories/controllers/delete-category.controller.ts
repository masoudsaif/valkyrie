import {
  DeleteObjectCommand,
  DeleteObjectCommandInput,
} from "@aws-sdk/client-s3";
import { RequestHandler } from "express";

import { pool } from "../../mysql";
import { s3Client } from "../../s3";
import { IExecute } from "../../types/execute.interface";
import IResponse from "../../types/response.interface";
import { getKeyFromS3Url } from "../../utility/s3";
import ICategoryParam from "../types/category-params.interface";

const deleteCategory: RequestHandler<
  ICategoryParam,
  IResponse<IExecute>
> = async (req, res, next) => {
  try {
    const connection = await pool?.getConnection();
    const { id } = req.params;
    const [rows]: IExecute = await connection!.execute(
      "SELECT imageUrl FROM product_categories WHERE id = ?",
      [id]
    );

    const params: DeleteObjectCommandInput = {
      Bucket: process.env.S3_BUCKET!,
      Key: getKeyFromS3Url(rows[0].imageUrl),
    };
    await s3Client!.send(new DeleteObjectCommand(params));
    const data: IExecute = await connection!.execute(
      "DELETE FROM product_categories WHERE id = ?",
      [id]
    );
    connection?.release();
    res.json({ success: true, data });
  } catch (e) {
    next(e);
  }
};

export default deleteCategory;
