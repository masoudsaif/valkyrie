import { RequestHandler } from "express";
import { FieldPacket, RowDataPacket } from "mysql2";

import ErrorRequest from "../../error-request";
import { pool } from "../../mysql";
import IRequestBody from "../../types/request.body.interface";
import IResponse from "../../types/response.interface";
import IEmailVerificationParams from "../types/email-verification-params";

const emailVerification: RequestHandler<
  IEmailVerificationParams,
  IResponse<null>,
  IRequestBody
> = async (req, res, next) => {
  try {
    const connection = await pool!.getConnection();
    const { token } = req.params;

    const [rows]: [RowDataPacket[], FieldPacket[]] = await connection.execute(
      "SELECT * FROM email_verifications WHERE token = ?",
      [token]
    );

    if (rows.length === 0) {
      throw new ErrorRequest("Invalid token!", 400);
    }

    const userId = rows[0].userId;
    await connection.execute(
      "UPDATE users SET isEmailVerified = 1 WHERE id = ?",
      [userId]
    );
    await connection.execute(
      "DELETE FROM email_verifications WHERE userId = ?",
      [userId]
    );
    connection?.release();

    res.json({ success: true, data: null });
  } catch (e) {
    next(e);
  }
};

export default emailVerification;
