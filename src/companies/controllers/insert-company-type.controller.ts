import { RequestHandler } from "express";
import { FieldPacket, ResultSetHeader } from "mysql2";

import { pool } from "../../mysql";
import ICompanyType from "../../types/company-type.interface";
import IResponse from "../../types/response.interface";
import ICompanyTypeBody from "../types/company-type-body.interface";

const insertCompanyType: RequestHandler<
  unknown,
  IResponse<ICompanyType>,
  ICompanyTypeBody
> = async (req, res, next) => {
  try {
    const connection = await pool?.getConnection();
    const { type } = req.body;

    const insertQuery: [ResultSetHeader, FieldPacket[]] =
      await connection!.execute("INSERT INTO company_types (type) VALUES (?)", [
        type,
      ]);
    connection?.release();

    res.json({
      success: true,
      data: {
        id: insertQuery[0].insertId,
        type,
      },
    });
  } catch (e) {
    next(e);
  }
};

export default insertCompanyType;
