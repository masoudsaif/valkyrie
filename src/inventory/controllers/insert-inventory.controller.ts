import { RequestHandler } from "express";
import { FieldPacket, ResultSetHeader } from "mysql2";

import { pool } from "../../mysql";
import IInventory from "../../types/inventory.interface";
import IResponse from "../../types/response.interface";
import IInventoryBody from "../types/inventory-body.interface";

const insertInventory: RequestHandler<
  unknown,
  IResponse<IInventory>,
  IInventoryBody
> = async (req, res, next) => {
  try {
    const connection = await pool!.getConnection();
    const { quantity } = req.body;

    const insertQuery: [ResultSetHeader, FieldPacket[]] =
      await connection.execute(
        "INSERT INTO product_inventory (quantity) VALUES (?)",
        [quantity]
      );

    connection?.release();

    res.json({
      success: true,
      data: {
        id: insertQuery[0].insertId,
        quantity,
      },
    });
  } catch (e) {
    next(e);
  }
};

export default insertInventory;
