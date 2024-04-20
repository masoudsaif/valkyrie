import { Router } from "express";

import verifyAdminToken from "../auth/middlewares/verify-admin-token.middleware";
import verifyToken from "../auth/middlewares/verify-token.middleware";
import deleteDiscountGroup from "./controllers/delete-discount-group.controller";
import getDiscountGroups from "./controllers/get-discount-groups.controller";
import insertDiscountGroup from "./controllers/insert-discount-group.controller";
import updateDiscountGroup from "./controllers/update-discount-group.controller";
import validateDiscountGroup from "./middlewares/validate-discount-group.middleware";

const discountGroupsRouter = Router();

discountGroupsRouter.get("/", verifyToken, verifyAdminToken, getDiscountGroups);
discountGroupsRouter.post(
  "/",
  verifyToken,
  verifyAdminToken,
  validateDiscountGroup,
  insertDiscountGroup
);
discountGroupsRouter.put(
  "/:id",
  verifyToken,
  verifyAdminToken,
  validateDiscountGroup,
  updateDiscountGroup
);
discountGroupsRouter.delete(
  "/:id",
  verifyToken,
  verifyAdminToken,
  deleteDiscountGroup
);

export default discountGroupsRouter;
