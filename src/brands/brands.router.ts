import { Router } from "express";

import verifyAdminToken from "../auth/middlewares/verify-admin-token.middleware";
import verifyToken from "../auth/middlewares/verify-token.middleware";
import deleteBrand from "./controllers/delete-brand.controller";
import getBrands from "./controllers/get-brands.controller";
import insertBrand from "./controllers/insert-brand.controller";
import updateBrand from "./controllers/update-brand.controller";
import validateBrand from "./middlewares/validate-brand.middleware.ts";

const brandsRouter = Router();

brandsRouter.get("/", getBrands);
brandsRouter.post(
  "/",
  verifyToken,
  verifyAdminToken,
  validateBrand,
  insertBrand
);
brandsRouter.put(
  "/:id",
  verifyToken,
  verifyAdminToken,
  validateBrand,
  updateBrand
);
brandsRouter.delete("/:id", verifyToken, verifyAdminToken, deleteBrand);

export default brandsRouter;
