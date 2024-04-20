import bcrypt from "bcrypt";
import { RequestHandler } from "express";
import { sign } from "jsonwebtoken";

import ErrorRequest from "../../error-request";
import { pool } from "../../mysql";
import { IExecute } from "../../types/execute.interface";
import IResponse from "../../types/response.interface";
import ISignInBody from "../types/sign-in-body.interface";

const signIn: RequestHandler<unknown, IResponse<string>, ISignInBody> = async (
  req,
  res,
  next
) => {
  try {
    const connection = await pool!.getConnection();

    const { email } = req.body;
    const [rows]: IExecute = await connection!.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      throw new ErrorRequest("Invalid credentials!", 401);
    }

    connection?.release();
    const { password, ...user } = rows[0];

    bcrypt.compare(req.body.password, rows[0].password, (err, isValid) => {
      if (err) {
        next(new ErrorRequest(err?.message || "Invalid credentials!", 401));
      }
      if (isValid) {
        const token = sign(user, process.env.JWT_SECRET!, { expiresIn: "15d" });
        res.json({ success: true, data: token });
      } else {
        next(new ErrorRequest(err?.message || "Invalid credentials!", 401));
      }
    });
  } catch (e) {
    next(e);
  }
};

export default signIn;
