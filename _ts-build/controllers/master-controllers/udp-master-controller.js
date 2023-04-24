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
exports.udpMasterController = void 0;
const project_zones_sub_controller_1 = require("../sub-controllers/project-zones-sub-controller");
const dgram_udp_utilities_1 = require("../../utilities/udp/dgram-udp-utilities");
const define_installation_id_1 = require("../../utilities/define-installation-id");
const hex_transform_utilities_1 = require("../../utilities/hex-transform-utilities");
const time_utilities_1 = require("../../utilities/time-utilities");
const game_sub_controller_1 = require("../sub-controllers/game-sub-controller");
const logging_service_1 = require("../../database/logging-service");
const environment_1 = require("../../_environment/environment");
const store_1 = require("../../store/store");
const udpMasterController = (msg, remoteInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const command = msg.toString();
    const ip = remoteInfo.address;
    const id = (0, define_installation_id_1.defineInstallationId)({ ip, command });
    const storeId = `installation${id}`;
    if (id) {
        try {
            // if it's possible to control via encoders and buttons (switches from the guide's tablet)
            if (store_1.store[storeId].analogControl) {
                (0, logging_service_1.logDataToMongoDb)({ store: store_1.store, storeId, id, ip, command });
                //for project zones
                if (id.match(/Project/)) {
                    yield (0, project_zones_sub_controller_1.projectZonesSubController)({ id, storeId, command });
                }
                //for game-commands
                if ((id.match(/Game/) || command.match(/Test_[Encoder|Button]/)) && !store_1.store["installationGame"].isThrottled) {
                    const functionToExecute = game_sub_controller_1.gameSubController;
                    yield (0, time_utilities_1.throttlerFunction)({
                        storeId,
                        id,
                        command,
                        functionToExecute
                    });
                }
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    else if (environment_1.systemVariables.DIRECT_COMMANDS === "direct_commands") {
        (0, dgram_udp_utilities_1.sendDirectTestCommand)({ command: (0, hex_transform_utilities_1.transformToHexArray)(command) });
    }
});
exports.udpMasterController = udpMasterController;
