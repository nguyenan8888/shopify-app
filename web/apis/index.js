import express from "express";

import { router as popupRouter } from "./popup.js";
import { router as appEmbededRouter } from "./app-embeded.js";

const apiRouter = express.Router();

apiRouter.use("/popup", popupRouter);
apiRouter.use("/app-embeded", appEmbededRouter);

export { apiRouter };
