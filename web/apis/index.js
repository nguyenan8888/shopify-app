import express from "express";

import { router, publicRouter } from "./popup.js";

const apiRouter = express.Router();
const publicApiRouter = express.Router();

apiRouter.use("/popup", router);

publicApiRouter.use("/popup", publicRouter);

export { apiRouter, publicApiRouter };
