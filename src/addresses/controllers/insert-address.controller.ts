import { RequestHandler } from "express";
import { FieldPacket, ResultSetHeader } from "mysql2";

import { pool } from "../../mysql";
import IAddress from "../../types/address.interface";
import IRequestBody from "../../types/request.body.interface";
import IResponse from "../../types/response.interface";
import IAddressBody from "../types/address-body.interface";

const insertAddress: RequestHandler<
  unknown,
  IResponse<IAddress>,
  IAddressBody & IRequestBody
> = async (req, res, next) => {
  try {
    const connection = await pool!.getConnection();
    const {
      street,
      unit = null,
      city,
      state,
      stateId,
      zip,
      isBilling = 0,
      isPrimary,
      user,
    } = req.body;

    if (isPrimary) {
      const z = await connection.execute(
        "UPDATE user_addresses SET isPrimary = 0 WHERE userId = ?",
        [user.id]
      );
    }

    if (isBilling) {
      const z = await connection.execute(
        "UPDATE user_addresses SET isBilling = 0 WHERE userId = ?",
        [user.id]
      );
    }

    const insertQuery: [ResultSetHeader, FieldPacket[]] =
      await connection.execute(
        "INSERT INTO user_addresses (street, unit, city, state, stateId, zip, userId, isBilling, isPrimary) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [street, unit, city, state, stateId, zip, user.id, isBilling, isPrimary]
      );

    connection?.release();

    res.json({
      success: true,
      data: {
        id: insertQuery[0].insertId,
        street,
        unit,
        city,
        state,
        stateId,
        zip,
        isBilling,
        isPrimary,
        isDeletable: 0,
      },
    });
  } catch (e) {
    next(e);
  }
};

export default insertAddress;
