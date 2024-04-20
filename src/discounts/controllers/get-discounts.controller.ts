import { RequestHandler } from "express";
import { RowDataPacket } from "mysql2";

import { pool } from "../../mysql";
import { IExecute } from "../../types/execute.interface";
import IResponse from "../../types/response.interface";

const getDiscounts: RequestHandler<
  unknown,
  IResponse<RowDataPacket[]>
> = async (_req, res, next) => {
  try {
    const connection = await pool?.getConnection();
    const [data]: IExecute = await connection!.execute(`
        SELECT 
            pd.id AS id,
            pd.discountGroupId,
            pd.name AS name,
            pd.percentage,
            pd.isActive,
            dg.name AS discountGroupName
        FROM 
            discounts pd
        LEFT JOIN 
            discount_groups dg ON pd.discountGroupId = dg.id`);

    connection?.release();
    res.json({ success: true, data });
  } catch (e) {
    next(e);
  }
};

export default getDiscounts;
