import { Router } from "express";

import verifyAdminToken from "../auth/middlewares/verify-admin-token.middleware";
import verifyToken from "../auth/middlewares/verify-token.middleware";
import deleteCategory from "./controllers/delete-category.controller";
import getCategories from "./controllers/get-categories.controller";
import insertCategory from "./controllers/insert-category.controller";
import updateCategory from "./controllers/update-category.controller";
import validateInsertCategory from "./middlewares/validate-insert-category.middleware";
import validateUpdateCategory from "./middlewares/validate-update-category.middleware";

const categoriesRouter = Router();

categoriesRouter.get("/", getCategories);
categoriesRouter.post(
  "/",
  verifyToken,
  verifyAdminToken,
  validateInsertCategory,
  insertCategory
);
categoriesRouter.put(
  "/:id",
  verifyToken,
  verifyAdminToken,
  validateUpdateCategory,
  updateCategory
);
categoriesRouter.delete("/:id", verifyToken, verifyAdminToken, deleteCategory);

export default categoriesRouter;
