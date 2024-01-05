import mongoose from "mongoose";

const connectMongodb = ({ uri }) => {
  mongoose
    .connect(uri)
    .then(() => {
      console.log("Connect successfully!");
    })
    .catch((err) => {
      throw err;
    });
};

export default connectMongodb;
