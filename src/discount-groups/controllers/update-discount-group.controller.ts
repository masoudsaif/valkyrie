import { RequestHandler } from "express";
import { FieldPacket, ResultSetHeader } from "mysql2";

import { pool } from "../../mysql";
import IResponse from "../../types/response.interface";
import IDiscountGroupBody from "../types/discount-group-body.interface";
import IDiscountGroupParams from "../types/discount-group-params.interface";

const updateDiscountGroup: RequestHandler<
  IDiscountGroupParams,
  IResponse<ResultSetHeader>,
  IDiscountGroupBody
> = async (req, res, next) => {
  try {
    const connection = await pool?.getConnection();
    const { id } = req.params;
    const { name, ranking } = req.body;

    const [data]: [ResultSetHeader, FieldPacket[]] = await connection!.execute(
      "UPDATE discount_groups SET name = ?, ranking = ? WHERE id = ?",
      [name, ranking, , id]
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

export default updateDiscountGroup;
