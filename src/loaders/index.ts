import { Application } from "express";

import express from "./express";
import mongoose from "./mongoose";

export default async (app: Application): Promise<void> => {
  express(app);
  await mongoose();
};
