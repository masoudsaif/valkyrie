import { Router } from "express";

import verifyAdminToken from "../auth/middlewares/verify-admin-token.middleware";
import verifyToken from "../auth/middlewares/verify-token.middleware";
import deleteDiscount from "./controllers/delete-discount.controller";
import getDiscounts from "./controllers/get-discounts.controller";
import insertDiscount from "./controllers/insert-discount.controller";
import updateDiscount from "./controllers/update-discount.controller";
import validateDiscount from "./middlewares/validate-discount.middleware";

const discountsRouter = Router();

discountsRouter.get("/", verifyToken, verifyAdminToken, getDiscounts);
discountsRouter.post(
  "/",
  verifyToken,
  verifyAdminToken,
  validateDiscount,
  insertDiscount
);
discountsRouter.put(
  "/:id",
  verifyToken,
  verifyAdminToken,
  validateDiscount,
  updateDiscount
);
discountsRouter.delete("/:id", verifyToken, verifyAdminToken, deleteDiscount);

export default discountsRouter;
