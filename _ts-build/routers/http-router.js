"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpRouter = void 0;
const http_master_controller_1 = require("../controllers/master-controllers/http-master-controller");
const express_1 = require("express");
const httpRouter = (0, express_1.Router)();
exports.httpRouter = httpRouter;
httpRouter.post("/send-command", http_master_controller_1.controller.sendCommand);
httpRouter.post("/game-control-panel", http_master_controller_1.controller.sendGameControlCommand);
