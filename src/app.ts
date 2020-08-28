import * as express from "express";

const app = express();

app.all("/", (req: express.Request, res: express.Response): void => {
  res.send(`Hello world! Here is the data you sent me: ${req.body?.data}`);
});

app.listen(8080, (err) => {
  if (err) {
    throw err;
  }
  console.log("Listening on 8080");
});
