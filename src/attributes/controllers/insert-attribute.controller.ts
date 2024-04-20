import { RequestHandler } from "express";
import { FieldPacket, ResultSetHeader } from "mysql2";

import { pool } from "../../mysql";
import IAttribute from "../../types/attribute.interface";
import IResponse from "../../types/response.interface";
import IAttributeBody from "../types/attribute-body.interface";

const insertAttribute: RequestHandler<
  unknown,
  IResponse<IAttribute>,
  IAttributeBody
> = async (req, res, next) => {
  try {
    const connection = await pool?.getConnection();
    const { name, displayName, options } = req.body;

    const insertQuery: [ResultSetHeader, FieldPacket[]] =
      await connection!.execute(
        "INSERT INTO product_attributes (name, displayName, options) VALUES (?, ?, ?)",
        [name, displayName, options]
      );

    connection?.release();

    res.json({
      success: true,
      data: {
        id: insertQuery[0].insertId,
        name,
        displayName,
        options,
      },
    });
  } catch (e) {
    next(e);
  }
};

export default insertAttribute;
