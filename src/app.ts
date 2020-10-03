import express = require("express");
import { json } from "body-parser";
import config from "./config/index";

const app = express();

app.use(json());

app.all("/", (req: express.Request, res: express.Response): void => {
  res.send(
    `Hello world! Here is the data you sent me: ${JSON.stringify(req.body)}`
  );
});

const port = config.get("port");
const ip = config.get("ip");

app.listen(port, ip, () => {
  console.log(`Listening on ${ip}:${port}`);
});
