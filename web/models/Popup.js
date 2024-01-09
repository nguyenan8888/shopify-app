import { Schema, Types, model } from "mongoose";
import shopify from "../shopify.js";

const Popup = model(
  "Popup",
  new Schema(
    {
      shop: {
        type: Number,
        required: true,
      },
      active: {
        type: Boolean,
        default: false,
      },
      title: String,
      description: String,
      button_text: String,
      button_link: String,
      bg_color: String,
      text_color: String,
      button_color: String,
      image: String,
    },
    { timestamps: true }
  )
);

export default Popup;

/**
{
  shop,
  active,
  title,
  description,
  button_text,
  button_link,
  bg_color,
  text_color,
  button_color,
  image,
}
 */

export const initPopUp = async (data, session) => {
  const popUp = new Popup(data);

  const metafieldPopup = new shopify.api.rest.Metafield({
    session,
  });

  metafieldPopup.namespace = "kiz-app-plugin";
  metafieldPopup.key = "pop-up";
  metafieldPopup.type = "json";
  metafieldPopup.value = JSON.stringify(data);

  await metafieldPopup.save();

  return await popUp.save();
};

export const getShopPopup = async ({ shopId }) => {
  return (await Popup.findOne({ shop: shopId }))?.toJSON();
};

export const updateShopPopup = async (data) => {
  await Popup.findByIdAndUpdate(data?._id, data);
};

export const inActiveShopPopup = async ({ shopId }) => {
  await Popup.updateOne(
    {
      shop: shopId,
    },
    {
      active: false,
    }
  );
};
