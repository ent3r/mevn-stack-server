import * as mongoose from "mongoose";

import config from "../config/index";

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

export default async (): Promise<void> => {
  mongoose.connection.on("error", (err) => {
    console.warn(err);
  });
  mongoose.connection.once("connected", () => {
    console.log("MongoDB connected");
  });
  await mongoose.connect(`${config.get("db.host")}/${config.get("db.db")}`);
};
