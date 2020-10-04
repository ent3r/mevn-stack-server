import * as mongoose from "mongoose";

import config from "../config/index";
import Logger from "./logger";

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

export default async (): Promise<void> => {
  mongoose.connection.on("error", (err) => {
    Logger.warn(err);
  });
  mongoose.connection.once("connected", () => {
    Logger.info("MongoDB connected");
  });
  await mongoose.connect(`${config.get("db.host")}/${config.get("db.db")}`);
};
