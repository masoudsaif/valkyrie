import { RequestHandler } from "express";
import { FieldPacket, ResultSetHeader } from "mysql2";

import { pool } from "../../mysql";
import IResponse from "../../types/response.interface";
import ICompanyParams from "../types/comany-params.interface";
import ICompanyTypeBody from "../types/company-type-body.interface";

const updateCompanyType: RequestHandler<
  ICompanyParams,
  IResponse<ResultSetHeader>,
  ICompanyTypeBody
> = async (req, res, next) => {
  try {
    const connection = await pool?.getConnection();
    const { id } = req.params;
    const { type } = req.body;

    const [data]: [ResultSetHeader, FieldPacket[]] = await connection!.execute(
      "UPDATE company_types SET type = ? WHERE id = ?",
      [type, id]
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

export default updateCompanyType;
