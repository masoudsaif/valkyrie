import { RequestHandler } from "express";

import ErrorRequest from "../../error-request";

const verifyAdminToken: RequestHandler<unknown> = (req, _res, next) => {
  try {
    if (!req.body.user.isAdmin) {
      throw new ErrorRequest("Unauthorized!", 401);
    }
    next();
  } catch (e) {
    next(e);
  }
};

export default verifyAdminToken;
