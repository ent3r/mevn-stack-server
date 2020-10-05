import { Router } from "express";
import postRoutes from "./routes/post";

export default (): Router => {
  const router = Router();

  postRoutes(router);

  return router;
};
