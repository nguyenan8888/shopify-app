import { Schema, Types, model } from "mongoose";

const Shop = model(
  "Shop",
  new Schema(
    {
      _id: Number,
      name: String,
      country: String,
      phone: String,
      shop_owner: String,
    },
    { timestamps: true }
  )
);

export default Shop;

export const createShop = async ({ name, country, phone, shopOwner, id }) => {
  const existShop = await Shop.findOne({ _id: id }).exec();

  if (existShop) return;

  const shop = new Shop({
    name,
    country,
    phone,
    shop_owner: shopOwner,
    _id: id,
  });

  await shop.save();

  return shop.toJSON();
};

export const isFirstTime = async ({ shopId }) => {
  return !Boolean(await Shop.findById(shopId));
};
