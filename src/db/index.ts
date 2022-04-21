
const path = require("path");
import mongoose from "mongoose";
import conf  from "../config";

mongoose.connect(conf.MongoDB, () => {
  console.log("Connected to MongoDB successfully.");
});
