import { Application } from "express";
import { json } from "body-parser";
import cors = require("cors");

import Logger from "./logger";

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

  app.use(json());
  app.use(cors());
};