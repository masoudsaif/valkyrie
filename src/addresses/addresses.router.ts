import { Router } from "express";

import verifyToken from "../auth/middlewares/verify-token.middleware";
import deleteAddress from "./controllers/delete-address.controller";
import getAddresses from "./controllers/get-addresses.controller";
import insertAddress from "./controllers/insert-address.controller";
import updateAddress from "./controllers/update-address.controller";
import validateAddress from "./middlewares/validate-address.middleware";

const addressesRouter = Router();

addressesRouter.get("/", verifyToken, getAddresses);
addressesRouter.post("/", verifyToken, validateAddress, insertAddress);
addressesRouter.put("/:id", verifyToken, validateAddress, updateAddress);
addressesRouter.delete("/:id", verifyToken, deleteAddress);

export default addressesRouter;
