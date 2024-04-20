import { RequestHandler } from "express";
import { FieldPacket, ResultSetHeader } from "mysql2";

import { pool } from "../../mysql";
import ICompanySize from "../../types/company-size.interface";
import IResponse from "../../types/response.interface";
import ICompanySizeBody from "../types/company-size-body.interface";

const insertCompanySize: RequestHandler<
  unknown,
  IResponse<ICompanySize>,
  ICompanySizeBody
> = async (req, res, next) => {
  try {
    const connection = await pool?.getConnection();
    const { size } = req.body;

    const insertQuery: [ResultSetHeader, FieldPacket[]] =
      await connection!.execute("INSERT INTO company_sizes (size) VALUES (?)", [
        size,
      ]);
    connection?.release();

    res.json({
      success: true,
      data: {
        id: insertQuery[0].insertId,
        size,
      },
    });
  } catch (e) {
    next(e);
  }
};

export default insertCompanySize;
