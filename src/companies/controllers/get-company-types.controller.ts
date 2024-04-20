import { RequestHandler } from "express";
import { RowDataPacket } from "mysql2";

import { pool } from "../../mysql";
import { IExecute } from "../../types/execute.interface";
import IResponse from "../../types/response.interface";

const getCompanyTypes: RequestHandler<
  unknown,
  IResponse<RowDataPacket[]>
> = async (_req, res, next) => {
  try {
    const connection = await pool?.getConnection();
    const [data]: IExecute = await connection!.execute(
      "SELECT * FROM company_types"
    );

    connection?.release();
    res.json({ success: true, data });
  } catch (e) {
    next(e);
  }
};

export default getCompanyTypes;
