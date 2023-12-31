import express from "express";
import bodyParser from "body-parser";
import client from "./routes/client";
import meattype from "./routes/meattype";
import orders from "./routes/order";
import buy from "./routes/buy";
import payment from "./routes/payment";
import { config } from "dotenv";
const app = express();
app.use(bodyParser.json());
config();
app.use("/clients", client);
app.use("/orders", orders);
app.use("/meattype", meattype);
app.use("/buy", buy);
app.use("/payment", payment);
app.listen(process.env.PORT, () => console.log("app startted"));
