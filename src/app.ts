import express = require("express");

import config from "./config/index";
import loaders from "./loaders/index";
import Logger from "./loaders/logger";

const app = express();

loaders(app)
  .then(() => {
    const port = config.get("port");
    const ip = config.get("ip");

    app.listen(port, ip, () => {
      Logger.info(`Listening on ${ip}:${port}`);
    });
  })
  .catch((reason) => {
    Logger.error(`Error while loading:\n${reason}`);
  });
