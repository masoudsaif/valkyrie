import { RequestHandler } from "express";

import ErrorRequest from "../../error-request";

const validateInventory: RequestHandler<unknown> = (req, _res, next) => {
  try {
    const { quantity } = req.body;

    if (!quantity || quantity < 0) {
      throw new ErrorRequest("Quantity is invalid!", 422);
    }

    next();
  } catch (e) {
    next(e);
  }
};

export default validateInventory;
