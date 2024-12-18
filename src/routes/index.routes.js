import { Router } from "express";
import cors from "cors";

import studentsRouter from "./students.routes.js";
import lockersRouter from "./lockers.routes.js";
import administratorsRouter from "./administrator.routes.js";
import loginRouter from "./login.routes.js";

import errorMiddleware from "../middlewares/auth.js"

const router = Router();

router.get("/", (req, res) => {
  res.status(200).send({ message: "Servidor rodando perfeitamente!" });
});

router.use(
  cors({
    origin: process.env.NEXT_PUBLIC_FRONTEND,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  })
);

router.use("/students", errorMiddleware, studentsRouter);
router.use("/lockers", errorMiddleware, lockersRouter);
router.use("/administrators", errorMiddleware, administratorsRouter);
router.use("/login", loginRouter);

//teste

// router.use("/students", studentsRouter);
// router.use("/lockers", lockersRouter);
// router.use("/administrators", administratorsRouter);
// router.use("/login", loginRouter);

export { router };
