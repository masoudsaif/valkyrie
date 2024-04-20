import { Router } from "express";

import verifyAdminToken from "../auth/middlewares/verify-admin-token.middleware";
import verifyToken from "../auth/middlewares/verify-token.middleware";
import deleteInventory from "./controllers/delete-inventory.controller";
import getInventory from "./controllers/get-inventory.controller";
import insertInventory from "./controllers/insert-inventory.controller";
import updateInventory from "./controllers/update-inventory.controller";
import validateInventory from "./middlewares/validate-inventory.middleware";

const inventoryRouter = Router();

inventoryRouter.get("/:id", getInventory);
inventoryRouter.post(
  "/",
  verifyToken,
  verifyAdminToken,
  validateInventory,
  insertInventory
);
inventoryRouter.put(
  "/:id",
  verifyToken,
  verifyAdminToken,
  validateInventory,
  updateInventory
);
inventoryRouter.delete("/:id", verifyToken, verifyAdminToken, deleteInventory);

export default inventoryRouter;
