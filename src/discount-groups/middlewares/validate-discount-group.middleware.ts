import { RequestHandler } from "express";

import ErrorRequest from "../../error-request";

const validateDiscountGroup: RequestHandler<unknown> = (req, _res, next) => {
  try {
    const { name, ranking } = req.body;

    if (!name) {
      throw new ErrorRequest("Name is required!", 422);
    }

    if (!ranking) {
      throw new ErrorRequest("ranking is required!", 422);
    }

    next();
  } catch (e) {
    next(e);
  }
};

export default validateDiscountGroup;
