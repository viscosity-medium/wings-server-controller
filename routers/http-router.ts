import { controller } from "../controllers/master-controllers/http-master-controller";
import { Router } from "express";

const httpRouter: Router = Router();
httpRouter.post("/send-command", controller.sendCommand);
// httpRouter.post("/switch-analog-control", controller.switchAnalogControl)

export { httpRouter };