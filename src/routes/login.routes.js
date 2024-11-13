import { Router } from "express";
import cors from "cors";

import {
  login
} from "../controller/login.controller.js";

const loginRouter = Router();

loginRouter.use(
  cors({
    origin: process.env.NEXT_PUBLIC_FRONTEND,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  })
);

loginRouter.post("/", login);

export default loginRouter;