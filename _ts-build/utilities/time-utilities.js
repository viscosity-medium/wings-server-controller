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
exports.throttlerFunction = exports.clearTimeoutFunction = exports.startTimeOutCounter = exports.minutesToMilliseconds = exports.returnSendDataFunctionBeforeDelay = exports.delayedComeBackToScreensaver = exports.delayedSwitchGameHint = exports.delayedGoToSpecificGameScene = exports.abortMessageDisplayAndGoToTheNextGameScene = void 0;
const store_types_1 = require("../types/store-types");
const composite_command_utility_1 = require("./composite-command-utility");
const dgram_udp_utilities_1 = require("./udp/dgram-udp-utilities");
const hex_transform_utilities_1 = require("./hex-transform-utilities");
const game_fades_commands_1 = require("../commands-and-conditions/game-commands/game-fades-commands");
const environment_1 = require("../_environment/environment");
const store_utility_1 = require("./store-utility");
const game_services_1 = require("./game-utilities/game-services");
const store_1 = require("../store/store");
const startTimeOutCounter = (action, timeout) => {
    return setTimeout(() => {
        action();
    }, timeout);
};
exports.startTimeOutCounter = startTimeOutCounter;
const clearTimeoutFunction = (timeOutId) => (clearTimeout(timeOutId));
exports.clearTimeoutFunction = clearTimeoutFunction;
const returnSendDataFunctionBeforeDelay = ({ id }) => (command, timeout) => __awaiter(void 0, void 0, void 0, function* () {
    (0, dgram_udp_utilities_1.sendDataToWingsServerOverUdp)({ id, command });
    yield new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, timeout);
    });
});
exports.returnSendDataFunctionBeforeDelay = returnSendDataFunctionBeforeDelay;
const returnSendDataFunctionAfterDelay = ({ id }) => (command, timeout) => __awaiter(void 0, void 0, void 0, function* () {
    yield new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, timeout);
    });
    (0, dgram_udp_utilities_1.sendDataToWingsServerOverUdp)({ id, command });
});
const secondsToMilliseconds = (time) => {
    return +time * 1000;
};
const minutesToMilliseconds = (time) => {
    const timeArray = time.split(":");
    const minutes = +timeArray[0];
    const seconds = +timeArray[1];
    return (minutes * 60 + seconds) * 1000;
};
exports.minutesToMilliseconds = minutesToMilliseconds;
const delayedComeBackToScreensaver = ({ storeId, id, type, idleTime }) => {
    clearTimeoutFunction(store_1.store[storeId].idleTimeout);
    if (type === "active") {
        store_1.store[storeId].idleTimeout = startTimeOutCounter(() => __awaiter(void 0, void 0, void 0, function* () {
            (0, store_utility_1.setStoreValue)({
                storeId,
                mode: store_types_1.EProjectZonesModes.screensaver || store_types_1.EGameModes.screensaver,
                index: 1
            });
            if (id === "Game") {
                const hideAllHints = (0, hex_transform_utilities_1.transformToHexArray)(game_fades_commands_1.gameFadesCommands.hintFadeOutScreensaverAndDemoMode);
                yield (0, dgram_udp_utilities_1.sendDataToWingsServerOverUdp)({ id, command: hideAllHints });
                (0, store_utility_1.setStoreValue)({
                    storeId,
                    mode: store_types_1.EProjectZonesModes.screensaver || store_types_1.EGameModes.screensaver,
                    index: 1,
                    cursorPosition: 1,
                    messageStatus: 0,
                    hintStatus: 0
                });
            }
            const executeCompositeCommandUtility = (0, composite_command_utility_1.returnCompositeCommandUtility)({ storeId, id });
            yield executeCompositeCommandUtility({ xIndex: "01", yIndex: "01", type: "passive" });
        }), minutesToMilliseconds(idleTime));
    }
};
exports.delayedComeBackToScreensaver = delayedComeBackToScreensaver;
const delayedGoToSpecificGameScene = ({ id, goToSpecificGameSceneCommand }) => {
    const storeId = store_types_1.EStoreKeys.installationGame;
    const { messageDisplayTime } = environment_1.installationIds["Game"];
    clearTimeoutFunction(store_1.store[storeId].sceneTransitionTimeout);
    (0, store_utility_1.setStoreValue)({
        storeId,
        savedSceneToGo: goToSpecificGameSceneCommand,
        sceneTransitionTimeout: startTimeOutCounter(() => __awaiter(void 0, void 0, void 0, function* () {
            yield game_services_1.gameServices.goToSpecificGameScene({ id, goToSpecificGameSceneCommand });
        }), messageDisplayTime)
    });
    // console.log(store[storeId])
};
exports.delayedGoToSpecificGameScene = delayedGoToSpecificGameScene;
const delayedSwitchGameHint = ({ id }) => {
    const storeId = store_types_1.EStoreKeys.installationGame;
    const timeStepBetweenHints = environment_1.installationIds["Game"].timeStepBetweenHints;
    const gameHintsArray = [
        game_fades_commands_1.gameFadesCommands.hint1FadeIn,
        game_fades_commands_1.gameFadesCommands.hint2FadeIn,
        game_fades_commands_1.gameFadesCommands.hint3FadeIn,
        game_fades_commands_1.gameFadesCommands.hint4FadeIn,
    ];
    clearTimeoutFunction(store_1.store[storeId].hideHintTimeout);
    const showOneHint = (arrayOfHints) => {
        const command = (0, hex_transform_utilities_1.transformToHexArray)(arrayOfHints[0]);
        return setTimeout(() => {
            (0, dgram_udp_utilities_1.sendDataToWingsServerOverUdp)({ id, command });
            arrayOfHints.shift();
            if (arrayOfHints.length > 0) {
                store_1.store[storeId].hideHintTimeout = showOneHint(arrayOfHints);
            }
        }, timeStepBetweenHints);
    };
    store_1.store[storeId].hideHintTimeout = showOneHint(gameHintsArray);
};
exports.delayedSwitchGameHint = delayedSwitchGameHint;
const abortMessageDisplayAndGoToTheNextGameScene = ({ storeId, id, goToSpecificGameSceneCommand }) => __awaiter(void 0, void 0, void 0, function* () {
    clearTimeoutFunction(store_1.store[storeId].sceneTransitionTimeout);
    yield game_services_1.gameServices.goToSpecificGameScene({ id, goToSpecificGameSceneCommand });
});
exports.abortMessageDisplayAndGoToTheNextGameScene = abortMessageDisplayAndGoToTheNextGameScene;
const throttlerFunction = ({ timeout = 500, storeId, functionToExecute, id, command }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!store_1.store[storeId].isThrottled) {
        (0, store_utility_1.setStoreValue)({
            storeId,
            isThrottled: true
        });
        if (id && command) {
            const internalFunctionToExecute = functionToExecute;
            yield internalFunctionToExecute({
                id,
                command
            });
        }
        else {
            const internalFunctionToExecute = functionToExecute;
            yield internalFunctionToExecute();
        }
        setTimeout(() => {
            (0, store_utility_1.setStoreValue)({
                storeId,
                isThrottled: false
            });
        }, timeout);
    }
});
exports.throttlerFunction = throttlerFunction;
