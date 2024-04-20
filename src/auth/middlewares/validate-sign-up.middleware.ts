import { RequestHandler } from "express";

import ErrorRequest from "../../error-request";
import { capitalize } from "../../utility/string";

const validateSignUp: RequestHandler<unknown> = (req, _res, next) => {
  try {
    const { firstName, lastName, email, password, company } = req.body;

    if (!firstName) {
      throw new ErrorRequest("First name is required!", 422);
    }

    if (!lastName) {
      throw new ErrorRequest("Last name is required!", 422);
    }

    if (!email) {
      throw new ErrorRequest("Email is required!", 422);
    }

    if (!password) {
      throw new ErrorRequest("Password is required!", 422);
    }

    if (company) {
      const { name, sizeId, typeId } = company;
      if (!name) {
        throw new ErrorRequest("Name is required!", 422);
      }

      if (!sizeId) {
        throw new ErrorRequest("Size is required!", 422);
      }

      if (!typeId) {
        throw new ErrorRequest("Type is required!", 422);
      }
      req.body.name = name.toUpperCase();
    }

    req.body.email = email.toLowerCase();
    req.body.firstName = capitalize(firstName);
    req.body.lastName = capitalize(lastName);

    next();
  } catch (e) {
    next(e);
  }
};

export default validateSignUp;
