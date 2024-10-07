import { Router } from "express";

import {
  login
} from "../controller/login.controller.js";

const loginRouter = Router();

loginRouter.post("/", login);

export default loginRouter;