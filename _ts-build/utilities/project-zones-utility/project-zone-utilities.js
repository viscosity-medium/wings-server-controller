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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectUtilities = void 0;
const time_utilities_1 = require("../time-utilities");
const possible_commands_received_for_project_zones_1 = require("../../commands-and-conditions/possible-commands-received-for-project-zones");
const environment_1 = require("../../_environment/environment");
const composite_command_utility_1 = require("../composite-command-utility");
const dgram_udp_utilities_1 = require("../udp/dgram-udp-utilities");
const store_types_1 = require("../../types/store-types");
const hex_transform_utilities_1 = require("../hex-transform-utilities");
const wings_action_commands_1 = require("../../commands-and-conditions/wings-action-commands");
const store_utility_1 = require("../store-utility");
const store_1 = require("../../store/store");
class projectUtilities {
    constructor({ storeId, id, newIndex, command, }) {
        this.storeId = storeId;
        this.id = id;
        this.newIndex = newIndex;
        this.command = command;
        this.host = environment_1.installationIds[id].host;
        this.port = environment_1.systemVariables.WINGS_PORT;
        this.delayLong = environment_1.installationIds[id].delayLong;
        this.delayShort = environment_1.installationIds[id].delayShort;
        this.idleTime = environment_1.installationIds[id].idleTime;
        this.numberOfFiles = environment_1.installationIds[id].numberOfFiles;
        this.executeCompositeCommandUtility = (0, composite_command_utility_1.returnCompositeCommandUtility)({
            storeId: this.storeId, id: this.id
        });
    }
    sendHexCommand() {
        return __awaiter(this, void 0, void 0, function* () {
            const hexCommand = (0, hex_transform_utilities_1.transformToHexArray)(this.command);
            const { idleTime } = environment_1.installationIds[this.id];
            (0, dgram_udp_utilities_1.sendDataToWingsServerOverUdp)({ command: hexCommand, id: this.id });
            yield (0, time_utilities_1.delayedComeBackToScreensaver)({ storeId: this.storeId, id: this.id, type: "active", idleTime });
        });
    }
    sendUniversalTransitionCommand() {
        return __awaiter(this, void 0, void 0, function* () {
            if (store_1.store[this.storeId].mode === store_types_1.EProjectZonesModes.screensaver && !this.command.match(/[1-9]+/gm)) {
                (0, store_utility_1.setStoreValue)({ storeId: this.storeId, mode: store_types_1.EProjectZonesModes.main, index: 1 });
                yield this.executeCompositeCommandUtility({ xIndex: "02", yIndex: "01", type: "active" });
            }
            else if ((store_1.store[this.storeId].mode === store_types_1.EProjectZonesModes.main || this.command.match(/[1-9]+/gm)) && this.newIndex) {
                (0, store_utility_1.setStoreValue)({ storeId: this.storeId, mode: store_types_1.EProjectZonesModes.main, index: +this.newIndex });
                yield this.executeCompositeCommandUtility({ xIndex: "02", yIndex: this.newIndex, type: "active" });
            }
        });
    }
    sendTransitionCommandToTheTanksInstallations() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.command.match(/[1-9]+/gm)) {
                (0, store_utility_1.setStoreValue)({ storeId: this.storeId, mode: store_types_1.EProjectZonesModes.main, index: +this.newIndex, numberOfFiles: 1 });
                yield this.executeCompositeCommandUtility({ xIndex: "01", yIndex: this.newIndex, type: "active" });
            }
        });
    }
    sendTransitionCommandToThePortraitsInstallation() {
        return __awaiter(this, void 0, void 0, function* () {
            (0, store_utility_1.setStoreValue)({ storeId: this.storeId, mode: store_types_1.EProjectZonesModes.main, index: +this.newIndex, numberOfFiles: this.numberOfFiles });
            yield this.executeCompositeCommandUtility({ xIndex: "01", yIndex: this.newIndex, type: "active" });
        });
    }
    sendTransitionCommandToTheCoversInstallation() {
        var _a, e_1, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            if (possible_commands_received_for_project_zones_1.possibleCommandsReceivedForProjectZones.goForward.includes(this.command)) {
                const command = (0, hex_transform_utilities_1.transformToHexArray)(wings_action_commands_1.wingsActionCommands.NextMarker);
                (0, dgram_udp_utilities_1.sendDataToWingsServerOverUdp)({ command, id: this.id });
            }
            else if (possible_commands_received_for_project_zones_1.possibleCommandsReceivedForProjectZones.goBackwards.includes(this.command)) {
                const command = (0, hex_transform_utilities_1.transformToHexArray)(wings_action_commands_1.wingsActionCommands.PreviousMarker);
                const executeSendDataFunctionBeforeDelay = (0, time_utilities_1.returnSendDataFunctionBeforeDelay)({ id: this.id });
                try {
                    for (var _d = true, _e = __asyncValues([1, 2]), _f; _f = yield _e.next(), _a = _f.done, !_a;) {
                        _c = _f.value;
                        _d = false;
                        try {
                            const i = _c;
                            yield executeSendDataFunctionBeforeDelay(command, this.delayShort);
                        }
                        finally {
                            _d = true;
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (!_d && !_a && (_b = _e.return)) yield _b.call(_e);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        });
    }
    sendTransitionToThePipelineInstallation() {
        var _a, e_2, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const idleTime = environment_1.installationIds["ProjectPipeline"].idleTime;
            const functionToExecute = ({ command }) => __awaiter(this, void 0, void 0, function* () {
                (0, dgram_udp_utilities_1.sendDataToWingsServerOverUdp)({ command, id: this.id });
                yield (0, time_utilities_1.delayedComeBackToScreensaver)({ storeId: this.storeId, id: this.id, type: "active", idleTime });
            });
            if (possible_commands_received_for_project_zones_1.possibleCommandsReceivedForProjectZones.goForward.includes(this.command)) {
                const command = (0, hex_transform_utilities_1.transformToHexArray)(wings_action_commands_1.wingsActionCommands.ExecuteTrigger("02"));
                yield functionToExecute({ command });
            }
            else if (possible_commands_received_for_project_zones_1.possibleCommandsReceivedForProjectZones.goBackwards.includes(this.command)) {
                const command = (0, hex_transform_utilities_1.transformToHexArray)(wings_action_commands_1.wingsActionCommands.ExecuteTrigger("01"));
                yield functionToExecute({ command });
            }
            else if (possible_commands_received_for_project_zones_1.possibleCommandsReceivedForProjectZones.pipelineNumbers().includes(this.command)) {
                const executeSendDataFunctionBeforeDelay = (0, time_utilities_1.returnSendDataFunctionBeforeDelay)({ id: this.id });
                try {
                    for (var _d = true, _e = __asyncValues(["10", this.command]), _f; _f = yield _e.next(), _a = _f.done, !_a;) {
                        _c = _f.value;
                        _d = false;
                        try {
                            const i = _c;
                            const hexValue = (0, hex_transform_utilities_1.transformValueToHexStr)(i);
                            const preCommand = wings_action_commands_1.wingsActionCommands.ExecuteTrigger(hexValue.length > 1 ? hexValue : `0${hexValue}`);
                            console.log(preCommand);
                            const command = (0, hex_transform_utilities_1.transformToHexArray)(preCommand);
                            yield executeSendDataFunctionBeforeDelay(command, this.delayShort);
                        }
                        finally {
                            _d = true;
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (!_d && !_a && (_b = _e.return)) yield _b.call(_e);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        });
    }
}
exports.projectUtilities = projectUtilities;
