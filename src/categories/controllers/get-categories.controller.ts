import { RequestHandler } from "express";
import { RowDataPacket } from "mysql2";

import { pool } from "../../mysql";
import { IExecute } from "../../types/execute.interface";
import IResponse from "../../types/response.interface";

const getCategories: RequestHandler<
  unknown,
  IResponse<RowDataPacket[]>
> = async (_req, res, next) => {
  try {
    const connection = await pool?.getConnection();
    const [rows]: IExecute = await connection!.execute(
      "SELECT * FROM product_categories"
    );

    connection?.release();
    res.json({ success: true, data: rows });
  } catch (e) {
    next(e);
  }
};

export default getCategories;
