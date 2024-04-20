import { RequestHandler } from "express";

import ErrorRequest from "../../error-request";

const validateAttribute: RequestHandler<unknown> = (req, _res, next) => {
  try {
    const { name, displayName, options } = req.body;

    if (!name) {
      throw new ErrorRequest("Name is required!", 422);
    }

    if (!displayName) {
      throw new ErrorRequest("Display name is required!", 422);
    }

    if (options && options[0].isActive === undefined) {
      throw new ErrorRequest("Options are required!", 422);
    }

    next();
  } catch (e) {
    next(e);
  }
};

export default validateAttribute;
