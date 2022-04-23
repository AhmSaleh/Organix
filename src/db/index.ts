
const path = require("path");
import mongoose from "mongoose";
import conf  from "../conf";

mongoose.connect(conf.MongoDB, () => {
  console.log("Connected to MongoDB successfully.");
});

//TODO print a message if connection fails