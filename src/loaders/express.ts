import { Application, NextFunction, Request, Response } from "express";
import { json } from "body-parser";
import cors = require("cors");
import { errors as celebrateErrors } from "celebrate";

import Logger from "./logger";
import routes from "../api";
import { ImATeapotError, NotFoundError } from "../types/httperrors";

export default (app: Application): void => {
  /**
   * Health Check endpoints (Copied from here: https://github.com/santiq/bulletproof-nodejs/blob/master/src/loaders/express.ts#L7-L16)
   * @TODO Explain why they are here
   */
  app.get("/status", (req, res) => {
    res.status(200).send("ok").end();
    Logger.http("Recieved call to /status");
  });
  app.head("/status", (req, res) => {
    res.status(200).send("ok").end();
    Logger.http("Recieved call to /status");
  });

  app.all(
    "/teapot",
    (req: Request, res: Response, next: NextFunction): void => {
      next(new ImATeapotError());
    }
  );

  app.use(json());
  app.use(cors());

  app.disable("x-powered-by");

  app.use("/api", routes());

  app.use(celebrateErrors());

  app.use((req: Request, res: Response, next: NextFunction): void => {
    next(new NotFoundError());
  });

  app.use(
    (err: any, req: Request, res: Response, _next: NextFunction): void => {
      res.status(err.statusCode || 500);
      res.send({ errors: { message: err.message } });
    }
  );
};
