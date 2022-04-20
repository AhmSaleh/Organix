const express = require("express");
const bodyParser = require("body-parser");
const index = require("./routes/index");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure Routes Middlewares
app.use("/api", index);

app.listen(3000, () => console.log("Server is up on port 3000"));
