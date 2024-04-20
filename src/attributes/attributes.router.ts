import { Router } from "express";

import verifyAdminToken from "../auth/middlewares/verify-admin-token.middleware";
import verifyToken from "../auth/middlewares/verify-token.middleware";
import deleteAttribute from "./controllers/delete-attribute.controller";
import getAttributes from "./controllers/get-attributes.controller";
import insertAttribute from "./controllers/insert-attribute.controller";
import updateAttribute from "./controllers/update-attribute.controller";
import validateAttribute from "./middlewares/validate-attribute.middleware";

const attributesRouter = Router();

attributesRouter.get("/", verifyToken, verifyAdminToken, getAttributes);
attributesRouter.post(
  "/",
  verifyToken,
  verifyAdminToken,
  validateAttribute,
  insertAttribute
);
attributesRouter.put(
  "/:id",
  verifyToken,
  verifyAdminToken,
  validateAttribute,
  updateAttribute
);
attributesRouter.delete("/:id", verifyToken, verifyAdminToken, deleteAttribute);

export default attributesRouter;
