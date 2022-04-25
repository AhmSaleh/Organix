import 'dotenv/config' 
import express from "express";
import bodyParser from "body-parser";
import index from "./routes/index";
import cors from "cors"
import "./db/index";
import './Utils/seed';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors())

// Configure Routes Middlewares
app.use("/api", index);
app.get("/status", (req, res) => {
  res.status(200).send("OK");
});

app.listen(3000, () =>
  console.log("Server is up on port 3000 http://localhost:3000")
);
