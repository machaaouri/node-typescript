import express, { Request, Response, NextFunction } from "express"
import bodyparser from "body-parser"
import { requestLoggerMiddleware } from "./request-logger-middleware";
import { RegisterRoutes } from "./routes";
import "./controller";
import * as swaggerUI from "swagger-ui-express";

export const app = express();
app.use(bodyparser.json());

// plug request logger middleware
app.use(requestLoggerMiddleware)
RegisterRoutes(app);

try {
    const swaggerDocument = require("../swagger.json");
    app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
} catch(err) {
    console.error('Unable to read swagger.json', err);
}