import express from "express";
import _ from "lodash";

import shopify from "../shopify.js";
import { getShopPopup, updateShopPopup } from "../models/Popup.js";

const router = express.Router();
const publicRouter = express.Router();

router.get("/", async (req, res) => {
  const shop = (
    await shopify.api.rest.Shop.all({
      session: res.locals.shopify.session,
    })
  )?.data[0];

  const popup = await getShopPopup({ shopId: shop?.id });

  res.status(200).json(popup);
});

router.put("/", async (req, res) => {
  const data = JSON.parse(req.body);

  let code = 200;
  try {
    await updateShopPopup(data);
    const allData = await shopify.api.rest.Metafield.all({
      session: res.locals.shopify.session,
    });

    // find and update metafield
    const metafieldPopup = allData.data.find(
      (metafield) =>
        metafield.namespace === "kiz-app-plugin" && metafield.key === "pop-up"
    );

    metafieldPopup.value = JSON.stringify(
      _.omit(data, ["_id", "createdAt", "updatedAt", "__v"])
    );

    await metafieldPopup.save();
  } catch {
    code = 400;
  }

  res.status(code).json({ isSuccess: code === 200 });
});

export { router };
