import { Router } from "express";

import verifyAdminToken from "../auth/middlewares/verify-admin-token.middleware";
import verifyToken from "../auth/middlewares/verify-token.middleware";
import deleteCompanySize from "./controllers/delete-company-size.controller";
import deleteCompanyType from "./controllers/delete-company-type.controller";
import getCompanies from "./controllers/get-companies.controller";
import getCompanySizes from "./controllers/get-company-sizes.controller";
import getCompanyTypes from "./controllers/get-company-types.controller";
import insertCompanySize from "./controllers/insert-company-size.controller";
import insertCompanyType from "./controllers/insert-company-type.controller";
import updateCompanySize from "./controllers/update-company-size.controller";
import updateCompanyType from "./controllers/update-company-type.controller";
import validateCompanySize from "./middlewares/validate-company-size.middleware";
import validateCompanyType from "./middlewares/validate-company-type.middleware";

const companiesRouter = Router();

companiesRouter.get("/", verifyToken, verifyAdminToken, getCompanies);
companiesRouter.get("/size", getCompanySizes);
companiesRouter.post(
  "/size",
  verifyToken,
  verifyAdminToken,
  validateCompanySize,
  insertCompanySize
);
companiesRouter.put(
  "/size/:id",
  verifyToken,
  verifyAdminToken,
  validateCompanySize,
  updateCompanySize
);
companiesRouter.delete(
  "/size/id",
  verifyToken,
  verifyAdminToken,
  deleteCompanySize
);
companiesRouter.get("/type", getCompanyTypes);
companiesRouter.post(
  "/type",
  verifyToken,
  verifyAdminToken,
  validateCompanyType,
  insertCompanyType
);
companiesRouter.put(
  "/type/:id",
  verifyToken,
  verifyAdminToken,
  validateCompanyType,
  updateCompanyType
);
companiesRouter.delete(
  "/type/:id",
  verifyToken,
  verifyAdminToken,
  deleteCompanyType
);

export default companiesRouter;
