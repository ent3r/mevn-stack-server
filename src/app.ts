import * as express from "express";
import * as bodyparser from "body-parser";

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.raw());

app.all("/", (req: express.Request, res: express.Response): void => {
  res.send(
    `Hello world! Here is the data you sent me: ${JSON.stringify(req.body)}`
  );
});

app.listen(8080, (err) => {
  if (err) {
    throw err;
  }
  console.log("Listening on 8080");
});
