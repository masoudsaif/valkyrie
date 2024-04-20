import { RequestHandler } from "express";

import { pool } from "../../mysql";
import { IExecute } from "../../types/execute.interface";
import IResponse from "../../types/response.interface";
import ICompanyParams from "../types/comany-params.interface";

const deleteCompanySize: RequestHandler<
  ICompanyParams,
  IResponse<IExecute>
> = async (req, res, next) => {
  try {
    const connection = await pool?.getConnection();
    const { id } = req.params;

    const data: IExecute = await connection!.execute(
      "DELETE FROM company_sizes WHERE id = ?",
      [id]
    );

    connection?.release();
    res.json({ success: true, data });
  } catch (e) {
    next(e);
  }
};

export default deleteCompanySize;
