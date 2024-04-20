import { RequestHandler } from "express";
import { FieldPacket, ResultSetHeader } from "mysql2";

import { pool } from "../../mysql";
import IRequestBody from "../../types/request.body.interface";
import IResponse from "../../types/response.interface";
import IAddressBody from "../types/address-body.interface";
import IAddressParams from "../types/address-params.interface";

const updateAddress: RequestHandler<
  IAddressParams,
  IResponse<ResultSetHeader>,
  IAddressBody & IRequestBody
> = async (req, res, next) => {
  try {
    const connection = await pool!.getConnection();
    const { id } = req.params;
    const {
      street,
      unit = null,
      city,
      state,
      stateId,
      zip,
      isPrimary,
      user,
    } = req.body;

    if (isPrimary) {
      await connection.execute(
        "UPDATE user_addresses SET isPrimary = 0 WHERE userId = ?",
        [user.id]
      );
    }

    const [data]: [ResultSetHeader, FieldPacket[]] = await connection.execute(
      "UPDATE user_addresses SET street = ?, unit = ?, city = ?, state = ?, stateId = ?, zip = ?, isPrimary = ? WHERE id = ?",
      [street, unit, city, state, stateId, zip, isPrimary, id]
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

export default updateAddress;
