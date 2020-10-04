import { Application } from "express";

import express from "./express";
import mongoose from "./mongoose";
import Logger from "./logger";

export default async (app: Application): Promise<void> => {
  express(app);
  Logger.info("Express initialized");

  await mongoose();
  Logger.info("Mongoose initialized");
};
