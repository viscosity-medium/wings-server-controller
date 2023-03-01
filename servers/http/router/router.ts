import { Router } from "express";
import { controller } from "../controller/controller";

const router: Router = Router();
router.post("/send-command", controller.sendCommand);
router.post("/switch-analog-control", controller.switchAnalogControl)

export { router };