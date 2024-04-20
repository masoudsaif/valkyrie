import { RequestHandler } from "express";
import { RowDataPacket } from "mysql2";

import { pool } from "../../mysql";
import { IExecute } from "../../types/execute.interface";
import IResponse from "../../types/response.interface";
import IInventoryParams from "../types/inventory-params.interface";

const getInventory: RequestHandler<
  IInventoryParams,
  IResponse<RowDataPacket | null>
> = async (req, res, next) => {
  try {
    const connection = await pool?.getConnection();
    const { id } = req.params;

    const [rows]: IExecute = await connection!.execute(
      "SELECT * FROM product_inventory WHERE id = ?",
      [id]
    );

    const data = rows.length ? rows[0] : null;

    connection?.release();
    res.json({ success: true, data });
  } catch (e) {
    next(e);
  }
};

export default getInventory;
