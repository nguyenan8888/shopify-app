import express from "express";

import shopify from "../shopify.js";
import { activeLink } from "../utils/index.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const themes = await shopify.api.rest.Theme.all({
    session: res.locals.shopify.session,
  });

  const currentTheme = themes.data.find((theme) => theme.role === "main");

  const assets = await shopify.api.rest.Asset.all({
    session: res.locals.shopify.session,
    theme_id: currentTheme?.id,
    asset: { key: "config/settings_data.json" },
  });

  const valueString = assets.data[0].value;
  const valueParse = valueString ? JSON.parse(valueString) : {};

  const blocks = valueParse?.current?.blocks;

  // find app block embeded
  const block = Object.entries(blocks).find(([_, value]) =>
    value.type.includes("kiz-app/blocks/popup")
  );

  // deeplink active
  const params = block[1].type.split("/");

  const activeAppId = params[params.length - 1];
  const APP_EMBEDED = process.env.APP_EMBEDED;

  const shop = (
    await shopify.api.rest.Shop.all({
      session: res.locals.shopify.session,
    })
  ).data[0];

  const domain = shop.domain;

  const deeplink = activeLink(domain, activeAppId, APP_EMBEDED);

  res.status(200).json({ block, isSuccess: true, deeplink });
});

router.put("/", async (req, res) => {

  res.status(200).json({ message: "Updated" });
});

export { router };
