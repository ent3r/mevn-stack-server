import express = require("express");
import { json } from "body-parser";

const app = express();

app.use(json());

app.all("/", (req: express.Request, res: express.Response): void => {
  res.send(
    `Hello world! Here is the data you sent me: ${JSON.stringify(req.body)}`
  );
});

app.listen(8080, () => {
  console.log("Listening on 8080");
});
