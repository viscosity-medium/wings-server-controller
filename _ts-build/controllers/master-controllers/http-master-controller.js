"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
const project_zones_sub_controller_1 = require("../sub-controllers/project-zones-sub-controller");
const store_types_1 = require("../../types/store-types");
const game_sub_controller_1 = require("../sub-controllers/game-sub-controller");
const _common_types_1 = require("../../types/_common-types");
const store_1 = require("../../store/store");
const logging_service_1 = require("../../database/logging-service");
class HttpMasterController {
    sendCommand(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, command, } = req.body;
            const storeId = `installation${id}`;
            (0, logging_service_1.logDataToMongoDb)({ store: store_1.store, storeId, id, ip: "Guide's tablet", command });
            if (id.match(/Project/)) {
                yield (0, project_zones_sub_controller_1.projectZonesSubController)({ id, storeId, command });
            }
            const response = "";
            res.json(response);
        });
    }
    sendGameControlCommand(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(process.env);
            const id = _common_types_1.EInstallationIds.Game;
            const storeId = store_types_1.EStoreKeys.installationGame;
            const { command } = req.body;
            yield (0, game_sub_controller_1.gameSubController)({ id, command });
            (0, logging_service_1.logDataToMongoDb)({
                store: store_1.store, storeId,
                id, ip: "Guide's tablet",
                command,
            });
            res.json({
                mode: store_1.store[store_types_1.EStoreKeys.installationGame].mode,
                scene: store_1.store[store_types_1.EStoreKeys.installationGame].scene,
                cursorPosition: store_1.store[store_types_1.EStoreKeys.installationGame].cursorPosition,
                maxCursorPositions: store_1.store[store_types_1.EStoreKeys.installationGame].maxCursorPositions,
                command
            });
        });
    }
}
const controller = new HttpMasterController();
exports.controller = controller;
