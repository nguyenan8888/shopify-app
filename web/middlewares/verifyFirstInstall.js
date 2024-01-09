import { initPopUp } from "../models/Popup.js";
import { isFirstTime, createShop, toggleShop } from "../models/Shop.js";
import shopify from "../shopify.js";

export const verifyFirstInstall = async (req, res, next) => {
  console.log("START_CHECK");
  const shop = (
    await shopify.api.rest.Shop.all({
      session: res.locals.shopify.session,
    })
  ).data[0];

  const needCreat = await isFirstTime({ shopId: shop.id });

  if (needCreat) {
    Promise.all([
      createShop({
        id: shop.id,
        name: shop.name,
        country: shop.country,
        phone: shop.phone,
        shopOwner: shop.shop_owner,
      }),
      initPopUp(
        {
          shop: shop.id,
          active: false,
          title: "Don't want to miss anything?",
          description:
            "Be the first to see new arrivals, exclusive deals and much more.",
          button_text: "Subscribe",
          button_link: "abc.com",
          bg_color: "#ffffff",
          text_color: "#000000",
          button_color: "#ff0000",
          image: null,
        },
        res.locals.shopify.session
      ),
    ])
      .then(() => {
        console.log("oke");
        next();
      })
      .catch(() => {
        res.status(500).json({ isSuccess: false, message: "Server error" });
      });
  } else {
    toggleShop({ shopId: shop.id, active: true });
    next();
  }
};
