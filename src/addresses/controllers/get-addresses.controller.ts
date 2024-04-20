import { RequestHandler } from "express";
import { RowDataPacket } from "mysql2";

import { pool } from "../../mysql";
import { IExecute } from "../../types/execute.interface";
import IRequestBody from "../../types/request.body.interface";
import IResponse from "../../types/response.interface";

const getAddresses: RequestHandler<
  unknown,
  IResponse<RowDataPacket[]>,
  IRequestBody
> = async (req, res, next) => {
  try {
    const connection = await pool?.getConnection();
    const { user } = req.body;

    const [rows]: IExecute = await connection!.execute(
      "SELECT * FROM user_addresses WHERE userId = ?",
      [user.id]
    );

    connection?.release();
    res.json({ success: true, data: rows });
  } catch (e) {
    next(e);
  }
};

export default getAddresses;
