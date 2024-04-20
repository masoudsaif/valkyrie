import { RequestHandler } from "express";

import ErrorRequest from "../../error-request";
import { capitalize } from "../../utility/string";

const validateUpdateCategory: RequestHandler<unknown> = (req, _res, next) => {
  try {
    const { name, parentId } = req.body;

    if (!name) {
      throw new ErrorRequest("Name is required!", 422);
    }

    if (parentId) {
      req.body.parentId = JSON.parse(req.body.parentId);
    }

    req.body.name = capitalize(name);
    next();
  } catch (e) {
    next(e);
  }
};

export default validateUpdateCategory;
