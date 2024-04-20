import { RequestHandler } from "express";

import ErrorRequest from "../../error-request";

const validateCompanySize: RequestHandler<unknown> = (req, _res, next) => {
  try {
    const { size } = req.body;

    if (!size) {
      throw new ErrorRequest("Size is required!", 422);
    }

    next();
  } catch (e) {
    next(e);
  }
};

export default validateCompanySize;
