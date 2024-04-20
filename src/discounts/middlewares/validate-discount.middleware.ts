import { RequestHandler } from "express";

import ErrorRequest from "../../error-request";

const validateDiscount: RequestHandler<unknown> = (req, _res, next) => {
  try {
    const { name, percentage } = req.body;

    if (!name) {
      throw new ErrorRequest("Name is required!", 422);
    }

    if (!percentage) {
      throw new ErrorRequest("Percentage is required!", 422);
    }

    next();
  } catch (e) {
    next(e);
  }
};

export default validateDiscount;
