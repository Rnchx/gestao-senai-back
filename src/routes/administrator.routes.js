import { Router } from "express";

import {
    getAdministrators,
    getAdministratorById,
    getAdministratorByCpf,
    createAdministrator,
    updateAdministrator,
    deleteAdministrator
    } from "../controller/administrators.controller.js";

const administratorsRouter = Router();

administratorsRouter.get("/", getAdministrators);
administratorsRouter.get("/:id", getAdministratorById);
administratorsRouter.get("/cpf/:cpf", getAdministratorByCpf);
administratorsRouter.post("/", createAdministrator);
administratorsRouter.put("/:id", updateAdministrator);
administratorsRouter.delete("/:id", deleteAdministrator);

export default administratorsRouter;