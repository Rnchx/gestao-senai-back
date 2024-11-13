
import { Router } from "express";

import {
  getLockers,
  getLockersById,
  getLockersByOccupation,
  createLocker,
  updateLocker,
  deleteLocker,
  assignStudentToLocker,
  unassignStudentFromLocker,
  getLockerInfo
} from "../controller/lockers.controller.js";

const lockersRouter = Router();

lockersRouter.get("/", getLockers);
lockersRouter.get("/:id", getLockersById);
lockersRouter.get("/occupation/:occupation", getLockersByOccupation);
lockersRouter.post("/", createLocker);
lockersRouter.put("/:id", updateLocker);
lockersRouter.delete("/:id", deleteLocker);
lockersRouter.post("/:id/assign", assignStudentToLocker);
lockersRouter.put("/:id/unassign", unassignStudentFromLocker);
lockersRouter.get("/:id", getLockerInfo)

export default lockersRouter;