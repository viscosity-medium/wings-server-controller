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
exports.returnCompositeCommandUtility = void 0;
const time_utilities_1 = require("./time-utilities");
const hex_transform_utilities_1 = require("./hex-transform-utilities");
const wings_action_commands_1 = require("../commands-and-conditions/wings-action-commands");
const environment_1 = require("../_environment/environment");
const store_types_1 = require("../types/store-types");
const { TimeIndicatorPosition, ExecuteTrigger, ContinuePlay, Pause } = wings_action_commands_1.wingsActionCommands;
const returnCompositeCommandUtility = ({ storeId, id, }) => ({ xIndex, yIndex, type }) => __awaiter(void 0, void 0, void 0, function* () {
    // I) define hex-x/y/commands for execution
    const { delayLong, delayShort, idleTime } = environment_1.installationIds[id];
    const xHex = (0, hex_transform_utilities_1.transformValueToHexStr)(xIndex);
    const yHex = (0, hex_transform_utilities_1.transformValueToHexStr)(yIndex);
    const fadeOutArg = "C9";
    const fadeOutAllImages = "0A";
    const fadeInArg = "C8";
    const commandHex1 = (0, hex_transform_utilities_1.transformToHexArray)(ExecuteTrigger(fadeOutArg));
    const commandHexPipelineOnly = (0, hex_transform_utilities_1.transformToHexArray)(ExecuteTrigger(fadeOutAllImages));
    const commandHex2 = (0, hex_transform_utilities_1.transformToHexArray)(Pause);
    const commandHex3 = (0, hex_transform_utilities_1.transformToHexArray)(TimeIndicatorPosition(xHex, yHex));
    const commandHex4 = (0, hex_transform_utilities_1.transformToHexArray)(ContinuePlay);
    const commandHex5 = (0, hex_transform_utilities_1.transformToHexArray)(ExecuteTrigger(fadeInArg));
    const executeAsyncTimeOut = (0, time_utilities_1.returnSendDataFunctionBeforeDelay)({ id });
    // II) execute all async sequences of commands (1-5)
    yield executeAsyncTimeOut(commandHex1, delayLong);
    storeId === "installationProjectPipeline" ? yield executeAsyncTimeOut(commandHexPipelineOnly, delayShort) : null;
    yield executeAsyncTimeOut(commandHex2, delayShort);
    yield executeAsyncTimeOut(commandHex3, delayShort);
    yield executeAsyncTimeOut(commandHex4, delayShort);
    yield executeAsyncTimeOut(commandHex5, delayShort);
    // III) start delay function to go back to screensaver
    if (![store_types_1.EStoreKeys.installationProjectPortraits].includes(storeId)) {
        yield (0, time_utilities_1.delayedComeBackToScreensaver)({ storeId, id, type, idleTime });
    }
});
exports.returnCompositeCommandUtility = returnCompositeCommandUtility;
