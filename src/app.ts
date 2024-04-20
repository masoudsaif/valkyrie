import cors from "cors";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import fileUpload from "express-fileupload";
import morgan from "morgan";

import addressesRouter from "./addresses/addresses.router";
import attributesRouter from "./attributes/attributes.router";
import authRouter from "./auth/auth.router";
import brandsRouter from "./brands/brands.router";
import categoriesRouter from "./categories/categories.router";
import companiesRouter from "./companies/companies.router";
import discountGroupsRouter from "./discount-groups/discount-groups.router";
import discountsRouter from "./discounts/discounts.router";
import ErrorRequest from "./error-request";
import inventoryRouter from "./inventory/inventory.router";
import { connectMySQL } from "./mysql";
import { connectS3 } from "./s3";
import { connectTransporter } from "./transporter";

dotenv.config();
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(fileUpload());
connectTransporter();
connectMySQL();
connectS3();
const port = process.env.PORT || 3000;

app.use("/auth", authRouter);
app.use("/category", categoriesRouter);
app.use("/brand", brandsRouter);
app.use("/address", addressesRouter);
app.use("/inventory", inventoryRouter);
app.use("/companies", companiesRouter);
app.use("/discount-groups", discountGroupsRouter);
app.use("/discounts", discountsRouter);
app.use("/attributes", attributesRouter);

app.all("*", (_req, _res, next) => {
  next(new ErrorRequest("Route not found", 404));
});

app.use(
  (error: ErrorRequest, _req: Request, res: Response, _next: NextFunction) => {
    res
      .status(error.status || 500)
      .json({ success: false, data: error.message });
  }
);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
