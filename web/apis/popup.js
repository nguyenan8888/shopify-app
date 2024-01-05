import express from "express";
import shopify from "../shopify.js";

import Popup, { getShopPopup, updateShopPopup } from "../models/Popup.js";

const router = express.Router();
const publicRouter = express.Router();

router.get("/", async (req, res) => {
  const shop = (
    await shopify.api.rest.Shop.all({
      session: res.locals.shopify.session,
    })
  )?.data[0];

  const popup = await getShopPopup({ shopId: shop?.id });

  // const sessionId = await shopify.api.session.getCurrentId({
  //   isOnline: false,
  //   rawRequest: req,
  //   rawResponse: res,
  // });

  // const session = await shopify.config.sessionStorage.loadSession(sessionId);

  // console.log("SESSION: ", session);

  res.status(200).json(popup);
});

router.put("/", async (req, res) => {
  const data = JSON.parse(req.body);

  let code = 200;
  updateShopPopup(data).catch(() => {
    code = 400;
  });

  res.status(code).json({ isSuccess: code === 200 });
});

publicRouter.get("/", async (req, res) => {
  const shopId = req.query.shopId;
  let code = 200;

  const popup = await Popup.findOne({ shop: shopId });

  if (!popup) {
    code = 404;
  }

  res.status(code).json({ popup, isSuccess: code === 200 });
});

export { router, publicRouter };
