import { Router } from "express";

import {
  getLockers,
  getLockersById,
  getLockersByOcupation,
  createLocker,
  updateLocker,
  deleteLocker
} from "../controller/lockers.controller";

const lockersRouter = Router();

lockersRouter.get("/", getLockers);
lockersRouter.get("/:id", getLockersById);
lockersRouter.get("/ocupation/:ocupation", getLockersByOcupation);
lockersRouter.post("/", createLocker);
lockersRouter.put("/:id", updateLocker);
lockersRouter.delete("/:id", deleteLocker);

export default lockersRouter;