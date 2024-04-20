import { RequestHandler } from "express";
import { FieldPacket, ResultSetHeader } from "mysql2";

import { pool } from "../../mysql";
import IResponse from "../../types/response.interface";
import IInventoryBody from "../types/inventory-body.interface";
import IInventoryParams from "../types/inventory-params.interface";

const updateInventory: RequestHandler<
  IInventoryParams,
  IResponse<ResultSetHeader>,
  IInventoryBody
> = async (req, res, next) => {
  try {
    const connection = await pool!.getConnection();
    const { id } = req.params;
    const { quantity } = req.body;

    const [data]: [ResultSetHeader, FieldPacket[]] = await connection.execute(
      "UPDATE product_inventory SET quantity = ? WHERE id = ?",
      [quantity, id]
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

export default updateInventory;
