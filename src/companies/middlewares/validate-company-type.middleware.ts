import { RequestHandler } from "express";

import ErrorRequest from "../../error-request";

const validateCompanyType: RequestHandler<unknown> = (req, _res, next) => {
  try {
    const { type } = req.body;

    if (!type) {
      throw new ErrorRequest("Type is required!", 422);
    }

    next();
  } catch (e) {
    next(e);
  }
};

export default validateCompanyType;
