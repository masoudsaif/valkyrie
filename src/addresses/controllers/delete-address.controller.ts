import { RequestHandler } from "express";

import { pool } from "../../mysql";
import { IExecute } from "../../types/execute.interface";
import IRequestBody from "../../types/request.body.interface";
import IResponse from "../../types/response.interface";
import IAddressParams from "../types/address-params.interface";

const deleteAddress: RequestHandler<
  IAddressParams,
  IResponse<IExecute>,
  IRequestBody
> = async (req, res, next) => {
  try {
    const connection = await pool?.getConnection();
    const { id } = req.params;
    const { user } = req.body;

    const data: IExecute = await connection!.execute(
      "DELETE FROM user_addresses WHERE id = ? AND userId = ? AND isDeletable = ?",
      [id, user.id, true]
    );

    connection?.release();
    res.json({ success: true, data });
  } catch (e) {
    next(e);
  }
};

export default deleteAddress;
