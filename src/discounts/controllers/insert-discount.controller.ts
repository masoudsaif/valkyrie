import { RequestHandler } from "express";
import { FieldPacket, ResultSetHeader } from "mysql2";

import { pool } from "../../mysql";
import IDiscount from "../../types/discount.interface";
import IResponse from "../../types/response.interface";
import IDiscountBody from "../types/discount-body.interface";

const insertDiscount: RequestHandler<
  unknown,
  IResponse<IDiscount>,
  IDiscountBody
> = async (req, res, next) => {
  try {
    const connection = await pool?.getConnection();
    const { name, percentage, discountGroupId = null, isActive = 0 } = req.body;

    const insertQuery: [ResultSetHeader, FieldPacket[]] =
      await connection!.execute(
        "INSERT INTO discounts (name, discountGroupId, percentage, isActive) VALUES (?, ?, ?, ?)",
        [name, discountGroupId, percentage, isActive]
      );

    connection?.release();

    res.json({
      success: true,
      data: {
        id: insertQuery[0].insertId,
        name,
        discountGroupId,
        percentage,
        isActive: isActive || 0,
      },
    });
  } catch (e) {
    next(e);
  }
};

export default insertDiscount;
