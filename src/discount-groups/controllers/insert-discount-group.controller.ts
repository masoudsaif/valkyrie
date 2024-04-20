import { RequestHandler } from "express";
import { FieldPacket, ResultSetHeader } from "mysql2";

import { pool } from "../../mysql";
import IDiscountGroup from "../../types/discount-group.interface";
import IResponse from "../../types/response.interface";
import IDiscountGroupBody from "../types/discount-group-body.interface";

const insertDiscountGroup: RequestHandler<
  unknown,
  IResponse<IDiscountGroup>,
  IDiscountGroupBody
> = async (req, res, next) => {
  try {
    const connection = await pool?.getConnection();
    const { name, ranking } = req.body;

    const insertQuery: [ResultSetHeader, FieldPacket[]] =
      await connection!.execute(
        "INSERT INTO discount_groups (name, ranking) VALUES (?, ?)",
        [name, ranking]
      );

    connection?.release();

    res.json({
      success: true,
      data: {
        id: insertQuery[0].insertId,
        name,
        ranking,
      },
    });
  } catch (e) {
    next(e);
  }
};

export default insertDiscountGroup;
