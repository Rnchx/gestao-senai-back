import express from "express";
import { config } from "dotenv";
import { router } from "./routes/index.routes.js";
import cors from 'cors';

config();

const port = process.env.PORT || 5000;

const app = express();

app.use(cors({
  origin: process.env.NEXT_PUBLIC_FRONTEND
}));

app.use(express.json());
app.use(router);

app.listen(port, () =>
  console.log(`✅ Server started on http://localhost:${port}`)
);
