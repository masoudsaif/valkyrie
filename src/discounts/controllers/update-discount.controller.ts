import { RequestHandler } from "express";
import { FieldPacket, ResultSetHeader } from "mysql2";

import { pool } from "../../mysql";
import IResponse from "../../types/response.interface";
import IDiscountBody from "../types/discount-body.interface";
import IDiscountParams from "../types/discount-parms.interface";

const updateDiscount: RequestHandler<
  IDiscountParams,
  IResponse<ResultSetHeader>,
  IDiscountBody
> = async (req, res, next) => {
  try {
    const connection = await pool?.getConnection();
    const { id } = req.params;
    const { name, percentage, discountGroupId = null, isActive = 0 } = req.body;

    const [data]: [ResultSetHeader, FieldPacket[]] = await connection!.execute(
      "UPDATE discounts SET name = ?, percentage = ?, discountGroupId = ?, isActive = ? WHERE id = ?",
      [name, percentage, discountGroupId, isActive, id]
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

export default updateDiscount;
