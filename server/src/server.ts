import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import index from "./routes/index";
import cors from "cors";
import "./db/index";
import "./Utils/seed";
import jdenticon from "jdenticon";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

// Configure Routes Middlewares
app.use("/api", index);
app.get("/status", (req, res) => {
  res.status(200).send("OK");
});

app.get("/img/random.png", (req, res) => {
  const value = (req.query.seed =
    req.query.seed ||
    Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15));
  const size = 400;

  const png = jdenticon.toPng(value, size);
  res.send(png);
});


//swagger
import  swaggerFile from "../docs/swagger-output.json"
import swaggerUi from 'swagger-ui-express';
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))


app.listen(3000, () =>
  console.log("Server is up on port 3000 http://localhost:3000")
);
