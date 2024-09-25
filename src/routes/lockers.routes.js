
import { Router } from "express";

import {
  getLockers,
  getLockersById,
  getLockersByOccupation,
  createLocker,
  updateLocker,
  deleteLocker
} from "../controller/lockers.controller.js";

const lockersRouter = Router();

lockersRouter.get("/", getLockers);
lockersRouter.get("/:id", getLockersById);
lockersRouter.get("/occupation/:occupation", getLockersByOccupation);
lockersRouter.post("/", createLocker);
lockersRouter.put("/:id", updateLocker);
lockersRouter.delete("/:id", deleteLocker);

export default lockersRouter;