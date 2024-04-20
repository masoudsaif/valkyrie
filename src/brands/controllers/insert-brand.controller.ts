import { RequestHandler } from "express";
import { FieldPacket, ResultSetHeader } from "mysql2";

import { pool } from "../../mysql";
import IBrand from "../../types/brand.interface";
import IResponse from "../../types/response.interface";
import IBrandBody from "../types/brand-body.interface";

const insertBrand: RequestHandler<
  unknown,
  IResponse<IBrand>,
  IBrandBody
> = async (req, res, next) => {
  try {
    const connection = await pool?.getConnection();
    const { name, description = null } = req.body;

    const insertQuery: [ResultSetHeader, FieldPacket[]] =
      await connection!.execute(
        "INSERT INTO product_brands (name, description) VALUES (?, ?)",
        [name, description]
      );

    connection?.release();

    res.json({
      success: true,
      data: {
        id: insertQuery[0].insertId,
        name,
        description,
      },
    });
  } catch (e) {
    next(e);
  }
};

export default insertBrand;
