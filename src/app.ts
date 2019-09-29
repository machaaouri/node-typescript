import express, { Request, Response, NextFunction } from "express"
import bodyparser from "body-parser"
import { requestLoggerMiddleware } from "./request-logger-middleware";
import { Routes } from "./controller";

export const app = express();
app.use(bodyparser.json());

// plug request logger middleware
app.use(requestLoggerMiddleware)
app.use(Routes);