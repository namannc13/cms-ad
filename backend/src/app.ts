import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import adRouter from "./routes/ad.route";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.use("/ad", adRouter);

export default app;
