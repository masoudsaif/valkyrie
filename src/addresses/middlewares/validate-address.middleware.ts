import { RequestHandler } from "express";

import ErrorRequest from "../../error-request";
import { cityRegex, streetRegex } from "../../utility/regex";

const validateAddress: RequestHandler<unknown> = (req, _res, next) => {
  try {
    const { street, city, state, unit, zip, stateId } = req.body;

    if (!street || !streetRegex.test(street)) {
      throw new ErrorRequest("Street is invalid!", 422);
    }

    if (!city || !cityRegex.test(city)) {
      throw new ErrorRequest("City is invalid!", 422);
    }

    if (!stateId || !state || state.length !== 2) {
      throw new ErrorRequest("State is invalid!", 422);
    }

    if (
      !zip ||
      zip.length !== 5 ||
      Number.isNaN(parseInt(zip, 10)) ||
      parseInt(zip, 10).toString().length !== 5
    ) {
      throw new ErrorRequest("Zip is invalid!", 422);
    }

    req.body.street = street.toUpperCase();
    req.body.city = city.toUpperCase();
    req.body.state = state.toUpperCase();

    if (unit) {
      req.body.unit = unit.toUpperCase();
    }

    next();
  } catch (e) {
    next(e);
  }
};

export default validateAddress;
