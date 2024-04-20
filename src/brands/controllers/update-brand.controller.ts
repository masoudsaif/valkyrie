import { RequestHandler } from "express";
import { FieldPacket, ResultSetHeader } from "mysql2";

import { pool } from "../../mysql";
import IResponse from "../../types/response.interface";
import IBrandBody from "../types/brand-body.interface";
import IBrandParams from "../types/brand-params.interface";

const updateBrand: RequestHandler<
  IBrandParams,
  IResponse<ResultSetHeader>,
  IBrandBody
> = async (req, res, next) => {
  try {
    const connection = await pool?.getConnection();
    const { id } = req.params;
    const { name, description = null } = req.body;

    const [data]: [ResultSetHeader, FieldPacket[]] = await connection!.execute(
      "UPDATE product_brands SET name = ?,  description = ? WHERE id = ?",
      [name, description, id]
    );
    connection?.release();

    res.json({
      success: true,
      data,
    });
  } catch (e) {
    next(e);
  }
};

export default updateBrand;
