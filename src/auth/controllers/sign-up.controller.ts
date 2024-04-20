import bcrypt from "bcrypt";
import { RequestHandler } from "express";
import { sign } from "jsonwebtoken";

import ErrorRequest from "../../error-request";
import { pool } from "../../mysql";
import { IExecute } from "../../types/execute.interface";
import IResponse from "../../types/response.interface";
import ISignUpBody from "../types/sign-up-body.interface";
import { FieldPacket, ResultSetHeader } from "mysql2";
import { randomBytes } from "crypto";
import { transporter } from "../../transporter";

const signUp: RequestHandler<unknown, IResponse<string>, ISignUpBody> = async (
  req,
  res,
  next
) => {
  try {
    const connection = await pool?.getConnection();
    const { firstName, lastName, email, password, company } = req.body;
    const [rows]: IExecute = await connection!.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (rows.length === 1) {
      throw new ErrorRequest("Email is already signed up!", 422);
    }

    let companyId: number | null = null;

    if (company) {
      const { name, typeId, sizeId } = company;
      const insertQuery: [ResultSetHeader, FieldPacket[]] =
        await connection!.execute(
          "INSERT INTO companies (name, typeId, sizeId) VALUES (?, ?, ?)",
          [name, typeId, sizeId]
        );
      companyId = insertQuery[0].insertId;
    }

    const emailToken = randomBytes(20).toString("hex");
    const hashedPassword = await bcrypt.hash(password, 10);
    const insertQuery: [ResultSetHeader, FieldPacket[]] =
      await connection!.execute(
        "INSERT INTO users (firstName, lastName, email, password, companyId) VALUES (?, ?, ?, ?, ?)",
        [firstName, lastName, email, hashedPassword, companyId]
      );
    await connection!.execute(
      "INSERT INTO email_verifications (token, userId) VALUES (?, ?)",
      [emailToken, insertQuery[0].insertId]
    );

    connection?.release();

    const verificationLink = `${process.env.DOMAIN}/auth/verify/${emailToken}`;
    await transporter!.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Email Verification",
      text: `Please click the following link to verify your email: ${verificationLink}`,
    });

    const token = sign(
      {
        id: insertQuery[0].insertId,
        firstName,
        lastName,
        email,
        isAdmin: 0,
        phoneNumber: null,
        companyId,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    res.json({ success: true, data: token });
  } catch (e) {
    next(e);
  }
};

export default signUp;
