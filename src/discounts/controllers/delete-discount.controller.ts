import { RequestHandler } from "express";

import { pool } from "../../mysql";
import { IExecute } from "../../types/execute.interface";
import IResponse from "../../types/response.interface";
import IDiscountParams from "../types/discount-parms.interface";

const deleteDiscount: RequestHandler<
  IDiscountParams,
  IResponse<IExecute>
> = async (req, res, next) => {
  try {
    const connection = await pool?.getConnection();
    const { id } = req.params;

    const data: IExecute = await connection!.execute(
      "DELETE FROM discounts WHERE id = ?",
      [id]
    );

    connection?.release();
    res.json({ success: true, data });
  } catch (e) {
    next(e);
  }
};

export default deleteDiscount;
