import { RequestHandler } from "express";

import ErrorRequest from "../../error-request";
import { capitalize } from "../../utility/string";

const validateSignIn: RequestHandler<unknown> = (req, _res, next) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      throw new ErrorRequest("Email is required!", 422);
    }

    if (!password) {
      throw new ErrorRequest("Password is required!", 422);
    }

    req.body.email = email.toLowerCase();

    next();
  } catch (e) {
    next(e);
  }
};

export default validateSignIn;
