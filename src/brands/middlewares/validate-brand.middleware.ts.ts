import { RequestHandler } from "express";

import ErrorRequest from "../../error-request";

const validateBrand: RequestHandler<unknown> = (req, _res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      throw new ErrorRequest("Name is required!", 422);
    }

    next();
  } catch (e) {
    next(e);
  }
};

export default validateBrand;
