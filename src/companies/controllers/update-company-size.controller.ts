import { RequestHandler } from "express";
import { FieldPacket, ResultSetHeader } from "mysql2";

import { pool } from "../../mysql";
import IResponse from "../../types/response.interface";
import ICompanyParams from "../types/comany-params.interface";
import ICompanySizeBody from "../types/company-size-body.interface";

const updateCompanySize: RequestHandler<
  ICompanyParams,
  IResponse<ResultSetHeader>,
  ICompanySizeBody
> = async (req, res, next) => {
  try {
    const connection = await pool?.getConnection();
    const { id } = req.params;
    const { size } = req.body;

    const [data]: [ResultSetHeader, FieldPacket[]] = await connection!.execute(
      "UPDATE company_sizes SET size = ? WHERE id = ?",
      [size, id]
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

export default updateCompanySize;
