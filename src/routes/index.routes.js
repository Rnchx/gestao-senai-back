import { Router } from "express";
import studentsRouter from "./students.routes.js";
import lockersRouter from "./lockers.routes.js";
import administratorsRouter from "./administrator.routes.js";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).send({ message: "Servidor rodando perfeitamente!" });
});

router.use("/students", studentsRouter);
router.use("/lockers", lockersRouter);
router.use("/administrators", administratorsRouter);

export { router };
