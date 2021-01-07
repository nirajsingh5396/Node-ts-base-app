/**
 * Required External Modules
 */


import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { productsRouter } from "./products/products.controller";
import { errorHandler } from "./common/middleware/error.middleware";
import { notFoundHandler } from "./common/middleware/notFound.middleware";
import { customerRouter } from "./customers-matser/customer.master.controller";

dotenv.config();

/**
 * App Variables
 */


if (!process.env.PORT) {

  process.exit(1);

}

const PORT: number = parseInt(process.env.PORT);

const app = express();


/**
 *  App Configuration
 */

app.use(helmet());

app.use(cors());

app.use(express.json());

app.use("/items",  productsRouter);

app.use("/customer-master" , customerRouter)



app.use(errorHandler);

app.use(notFoundHandler);

/**
 * Server Activation
 */

const server = app.listen(PORT, () => {

  console.log(`Listening on port ${PORT}`);

});


/**
 * Webpack HMR Activation
 */

