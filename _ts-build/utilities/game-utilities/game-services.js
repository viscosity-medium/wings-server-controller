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
exports.gameServices = void 0;
const time_utilities_1 = require("../time-utilities");
const environment_1 = require("../../_environment/environment");
const dgram_udp_utilities_1 = require("../udp/dgram-udp-utilities");
const game_cursor_positions_commands_1 = require("../../commands-and-conditions/game-commands/game-cursor-positions-commands");
const store_types_1 = require("../../types/store-types");
const hex_transform_utilities_1 = require("../hex-transform-utilities");
const game_fades_commands_1 = require("../../commands-and-conditions/game-commands/game-fades-commands");
const game_system_message_1 = require("../../commands-and-conditions/game-conditions/game-system-message");
const store_utility_1 = require("../store-utility");
const wings_action_commands_1 = require("../../commands-and-conditions/wings-action-commands");
const store_1 = require("../../store/store");
const { delayShort, } = environment_1.installationIds.Game;
const { Play, FadeTimeline } = wings_action_commands_1.wingsActionCommands;
const storeId = store_types_1.EStoreKeys.installationGame;
const gameState = store_1.store[store_types_1.EStoreKeys.installationGame];
const { INITIAL_MAX_CURSOR_POSITIONS } = environment_1.systemVariables;
class GameServices {
    executeTransitionToSpecificMode({ id, commandHex6, mode, scene, cursorPosition, messageStatus }) {
        return __awaiter(this, void 0, void 0, function* () {
            const commandHex1 = (0, hex_transform_utilities_1.transformToHexArray)(FadeTimeline("mainTimelineFadeOut")); // hide tracks with the current mode content
            const commandHex2 = (0, hex_transform_utilities_1.transformToHexArray)(FadeTimeline("hintFadeOutScreensaverAndDemoMode")); // hide hint with the current mode content
            const commandHex3 = (0, hex_transform_utilities_1.transformToHexArray)(FadeTimeline("allCursorPositionsFadeOut")); // hide all cursor positions
            const commandHex4 = (0, hex_transform_utilities_1.transformToHexArray)(FadeTimeline("allHintsFadeOut")); // hide all hints
            const commandHex5 = (0, hex_transform_utilities_1.transformToHexArray)(FadeTimeline("allMessagesFadeOut")); // hide all system messages
            const commandHex7 = (0, hex_transform_utilities_1.transformToHexArray)(Play); // start playing the timeline
            const commandHex8 = (0, hex_transform_utilities_1.transformToHexArray)(FadeTimeline("mainTimelineFadeIn")); // show tracks with content
            const commandHex9 = (0, hex_transform_utilities_1.transformToHexArray)(FadeTimeline("cursorPosition1FadeIn")); // show the cursor at position 1
            const executeAsyncTimeOut = (0, time_utilities_1.returnSendDataFunctionBeforeDelay)({ id });
            (0, time_utilities_1.clearTimeoutFunction)(store_1.store[storeId].hideHintTimeout);
            (0, time_utilities_1.clearTimeoutFunction)(store_1.store[storeId].sceneTransitionTimeout);
            yield executeAsyncTimeOut(commandHex1, delayShort);
            yield executeAsyncTimeOut(commandHex2, delayShort);
            yield executeAsyncTimeOut(commandHex3, delayShort);
            yield executeAsyncTimeOut(commandHex4, delayShort);
            yield executeAsyncTimeOut(commandHex5, delayShort);
            (0, store_utility_1.setStoreValue)({
                storeId: store_types_1.EStoreKeys.installationGame,
                hintStatus: 0,
                mode,
                scene,
                messageStatus,
                cursorPosition,
                maxCursorPositions: INITIAL_MAX_CURSOR_POSITIONS
            });
            yield executeAsyncTimeOut(commandHex6, delayShort);
            yield executeAsyncTimeOut(commandHex7, delayShort);
            yield executeAsyncTimeOut(commandHex8, delayShort);
            // commandHex9 should be executed only for modes "mna", "sod", "looping"
            scene && cursorPosition && messageStatus !== undefined ?
                yield executeAsyncTimeOut(commandHex9, delayShort) :
                null;
            (0, time_utilities_1.delayedSwitchGameHint)({ id });
        });
    }
    sendCommandToShowSystemMessage({ id, command }) {
        const { mode, messageStatus } = store_1.store[store_types_1.EStoreKeys.installationGame];
        let systemMessage;
        //console.log(messageStatus);
        // if system messages are inactive
        if (messageStatus === 0) {
            if (mode === store_types_1.EGameModes.mna) {
                systemMessage = game_system_message_1.gameSystemMessage.returnMessageForMnaMode({ command });
            }
            else if (mode === store_types_1.EGameModes.sod) {
                systemMessage = game_system_message_1.gameSystemMessage.returnMessageForSodMode({ command });
            }
            else if (mode === store_types_1.EGameModes.looping) {
                systemMessage = game_system_message_1.gameSystemMessage.returnMessageForLoopingMode({ command });
            }
        }
        // if systemMessage is defined,
        // then the store changes and the command sends
        if (systemMessage) {
            // console.log(command)
            (0, dgram_udp_utilities_1.sendDataToWingsServerOverUdp)({ command: systemMessage, id });
            (0, store_utility_1.setStoreValue)({
                storeId: store_types_1.EStoreKeys.installationGame,
                messageStatus: 1
            });
        }
    }
    goToSpecificGameScene({ id, goToSpecificGameSceneCommand }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { allCursorPositionsFadeOut, allHintsFadeOut, allMessagesFadeOut, cursorPosition1FadeIn, } = game_fades_commands_1.gameFadesCommands;
            const fadeOutAllMessages = (0, hex_transform_utilities_1.transformToHexArray)(allMessagesFadeOut);
            const fadeOutAllHints = (0, hex_transform_utilities_1.transformToHexArray)(allHintsFadeOut);
            const fadeOutAllCursors = (0, hex_transform_utilities_1.transformToHexArray)(allCursorPositionsFadeOut);
            const fadeInCursorPosition1 = (0, hex_transform_utilities_1.transformToHexArray)(cursorPosition1FadeIn);
            const sendDataFunctionBeforeDelay = (0, time_utilities_1.returnSendDataFunctionBeforeDelay)({ id });
            (0, store_utility_1.setStoreValue)({
                storeId: store_types_1.EStoreKeys.installationGame,
                messageStatus: 0,
                hintStatus: 0,
                cursorPosition: 1,
                savedSceneToGo: "undefined"
            });
            yield sendDataFunctionBeforeDelay(fadeOutAllMessages, delayShort);
            yield sendDataFunctionBeforeDelay(fadeOutAllHints, delayShort);
            yield sendDataFunctionBeforeDelay(fadeOutAllCursors, delayShort);
            yield sendDataFunctionBeforeDelay(goToSpecificGameSceneCommand, delayShort);
            yield sendDataFunctionBeforeDelay(fadeInCursorPosition1, delayShort);
            (0, time_utilities_1.delayedSwitchGameHint)({ id });
        });
    }
    sendCommandToHideSystemMessages({ id }) {
        const command = (0, hex_transform_utilities_1.transformToHexArray)(game_fades_commands_1.gameFadesCommands.allMessagesFadeOut);
        (0, store_utility_1.setStoreValue)({
            storeId: store_types_1.EStoreKeys.installationGame,
            messageStatus: 0
        });
        (0, dgram_udp_utilities_1.sendDataToWingsServerOverUdp)({ command, id });
    }
    sendCommandToChangeHintStatus({ id, systemMessage, hintStatus }) {
        (0, dgram_udp_utilities_1.sendDataToWingsServerOverUdp)({ id, command: systemMessage });
        (0, store_utility_1.setStoreValue)({
            storeId,
            hintStatus
        });
    }
    changeCursorPositionToTheLeft({ id }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (gameState.cursorPosition > 1) {
                (0, store_utility_1.setStoreValue)({
                    storeId: store_types_1.EStoreKeys.installationGame,
                    cursorPosition: gameState.cursorPosition -= 1
                });
            }
            else {
                (0, store_utility_1.setStoreValue)({
                    storeId: store_types_1.EStoreKeys.installationGame,
                    cursorPosition: gameState.maxCursorPositions
                });
            }
            // defining cursor position to show (from array)
            const command = (0, hex_transform_utilities_1.transformToHexArray)(game_cursor_positions_commands_1.gameCursorPositionsCommands[gameState.cursorPosition - 1]);
            const sendDataFunctionBeforeDelay = (0, time_utilities_1.returnSendDataFunctionBeforeDelay)({ id });
            const hexCommand = (0, hex_transform_utilities_1.transformToHexArray)(game_fades_commands_1.gameFadesCommands.allCursorPositionsFadeOut);
            yield sendDataFunctionBeforeDelay(hexCommand, environment_1.installationIds[id].delayShort);
            (0, dgram_udp_utilities_1.sendDataToWingsServerOverUdp)({ command, id });
        });
    }
    changeCursorPositionToTheRight({ id }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (gameState.cursorPosition < gameState.maxCursorPositions) {
                (0, store_utility_1.setStoreValue)({
                    storeId: store_types_1.EStoreKeys.installationGame,
                    cursorPosition: gameState.cursorPosition += 1
                });
            }
            else {
                (0, store_utility_1.setStoreValue)({
                    storeId: store_types_1.EStoreKeys.installationGame,
                    cursorPosition: 1
                });
            }
            // defining cursor position to show (from array)
            const command = (0, hex_transform_utilities_1.transformToHexArray)(game_cursor_positions_commands_1.gameCursorPositionsCommands[gameState.cursorPosition - 1]);
            const sendDataFunctionBeforeDelay = (0, time_utilities_1.returnSendDataFunctionBeforeDelay)({ id });
            const hexCommand = (0, hex_transform_utilities_1.transformToHexArray)(game_fades_commands_1.gameFadesCommands.allCursorPositionsFadeOut);
            yield sendDataFunctionBeforeDelay(hexCommand, environment_1.installationIds[id].delayShort);
            (0, dgram_udp_utilities_1.sendDataToWingsServerOverUdp)({ command, id });
        });
    }
}
const gameServices = new GameServices();
exports.gameServices = gameServices;
