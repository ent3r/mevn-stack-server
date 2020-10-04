import express = require("express");
import config from "./config/index";
import loaders from "./loaders/index";

const app = express();

loaders(app)
  .then(() => {
    const port = config.get("port");
    const ip = config.get("ip");

    app.listen(port, ip, () => {
      console.log(`Listening on ${ip}:${port}`);
    });
  })
  .catch((reason) => {
    console.log(`Error while loading:\n${reason}`);
  });
