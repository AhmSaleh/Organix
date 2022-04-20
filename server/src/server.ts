import express from "express";
import bodyParser from "body-parser"; 
import index from "./routes/index";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure Routes Middlewares
app.use("/api", index);
app.get("/status", (req, res) => {
    res.status(200).send("OK");
});

app.listen(3000, () => console.log("Server is up on port 3000 http://localhost:3000"));