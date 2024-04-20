import { RequestHandler } from "express";
import { RowDataPacket } from "mysql2";

import { pool } from "../../mysql";
import { IExecute } from "../../types/execute.interface";
import IResponse from "../../types/response.interface";

const getCompanies: RequestHandler<
  unknown,
  IResponse<RowDataPacket[]>
> = async (_req, res, next) => {
  try {
    const connection = await pool?.getConnection();
    const [data]: IExecute = await connection!.execute(
      `SELECT 
            c.id AS id,
            c.name AS name,
            ct.type AS type,
            cs.size AS size
        FROM 
            companies c
        JOIN 
            company_types ct ON c.typeId = ct.id
        JOIN 
            company_sizes cs ON c.sizeId = cs.id`
    );

    connection?.release();
    res.json({ success: true, data });
  } catch (e) {
    next(e);
  }
};

export default getCompanies;
