
const path = require("path");
import mongoose from "mongoose";
import envconf  from "../envconf";

mongoose.connect(envconf.MongoDB, () => {
  console.log("Connected to MongoDB successfully.");
});

//TODO print a message if connection fails