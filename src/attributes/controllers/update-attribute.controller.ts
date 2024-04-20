import { RequestHandler } from "express";
import { FieldPacket, ResultSetHeader } from "mysql2";

import { pool } from "../../mysql";
import IResponse from "../../types/response.interface";
import IAttributeBody from "../types/attribute-body.interface";
import IAttributeParams from "../types/attribute-params.inteface";

const updateAttribute: RequestHandler<
  IAttributeParams,
  IResponse<ResultSetHeader>,
  IAttributeBody
> = async (req, res, next) => {
  try {
    const connection = await pool?.getConnection();
    const { id } = req.params;
    const { name, displayName, options } = req.body;

    const [data]: [ResultSetHeader, FieldPacket[]] = await connection!.execute(
      "UPDATE product_attributes SET name = ?, displayName = ?, options = ? WHERE id = ?",
      [name, displayName, options, id]
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

export default updateAttribute;
