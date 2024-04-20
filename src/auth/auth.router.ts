import { Router } from "express";

import emailVerification from "./controllers/email-verification.controller";
import signIn from "./controllers/sign-in.controller";
import signUp from "./controllers/sign-up.controller";
import validateSignIn from "./middlewares/validate-sign-in.middleware";
import validateSignUp from "./middlewares/validate-sign-up.middleware";

const authRouter = Router();

authRouter.post("/sign-in", validateSignIn, signIn);
authRouter.post("/sign-up", validateSignUp, signUp);
authRouter.get("/verify/:token", emailVerification);

export default authRouter;
