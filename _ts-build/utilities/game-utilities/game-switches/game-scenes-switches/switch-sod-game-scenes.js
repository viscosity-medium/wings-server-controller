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
exports.switchSodGameScenes = void 0;
const time_utilities_1 = require("../../../time-utilities");
const return_game_sod_conditions_1 = require("../../../../commands-and-conditions/game-conditions/return-game-sod-conditions");
const hex_transform_utilities_1 = require("../../../hex-transform-utilities");
const store_utility_1 = require("../../../store-utility");
const wings_action_commands_1 = require("../../../../commands-and-conditions/wings-action-commands");
const game_services_1 = require("../../game-services");
const store_types_1 = require("../../../../types/store-types");
const store_1 = require("../../../../store/store");
const { SpecificGameScene } = wings_action_commands_1.wingsActionCommands;
const switchSodGameScenes = ({ id, command, gameState }) => __awaiter(void 0, void 0, void 0, function* () {
    const storeId = store_types_1.EStoreKeys.installationGame;
    let goToSpecificGameSceneCommand = undefined, scene, cursorPosition, maxCursorPositions;
    if (return_game_sod_conditions_1.returnGameSodConditions.condition1Right({ id, command, gameState })) {
        goToSpecificGameSceneCommand = (0, hex_transform_utilities_1.transformToHexArray)(SpecificGameScene("goToSodModeScene2"));
        scene = 2;
        cursorPosition = 1;
        maxCursorPositions = 4;
        // setStoreValue({
        //     storeId, scene: 2, cursorPosition: 1, maxCursorPositions: 4
        // });
    }
    else if (return_game_sod_conditions_1.returnGameSodConditions.condition2Right({ id, command, gameState })) {
        goToSpecificGameSceneCommand = (0, hex_transform_utilities_1.transformToHexArray)(SpecificGameScene("goToSodModeScene3"));
        scene = 3;
        cursorPosition = 1;
        maxCursorPositions = 4;
        // setStoreValue({
        //     storeId, scene: 3, cursorPosition: 1, maxCursorPositions: 4
        // });
    }
    else if (return_game_sod_conditions_1.returnGameSodConditions.condition3Right({ id, command, gameState })) {
        goToSpecificGameSceneCommand = (0, hex_transform_utilities_1.transformToHexArray)(SpecificGameScene("goToSodModeScene4"));
        scene = 4;
        cursorPosition = 1;
        maxCursorPositions = 4;
        // setStoreValue({
        //     storeId, scene: 4, cursorPosition: 1, maxCursorPositions: 4
        // });
    }
    else if (return_game_sod_conditions_1.returnGameSodConditions.condition4Right({ id, command, gameState })) {
        goToSpecificGameSceneCommand = (0, hex_transform_utilities_1.transformToHexArray)(SpecificGameScene("goToSodModeScene5Final"));
        scene = 5;
        cursorPosition = 1;
        maxCursorPositions = 1;
        // setStoreValue({
        //     storeId, scene: 5, cursorPosition: 1, maxCursorPositions: 1
        // });
    }
    if (goToSpecificGameSceneCommand) {
        (0, time_utilities_1.clearTimeoutFunction)(store_1.store[storeId].hideHintTimeout);
        game_services_1.gameServices.sendCommandToShowSystemMessage({ id, command });
        (0, store_utility_1.setStoreValue)({
            storeId,
            scene,
            cursorPosition,
            maxCursorPositions,
            messageStatus: 1
        });
        yield (0, time_utilities_1.delayedGoToSpecificGameScene)({ id, goToSpecificGameSceneCommand });
    }
    else if (return_game_sod_conditions_1.returnGameSodConditions.sodButtonsInterfaces({ command })) {
        game_services_1.gameServices.sendCommandToShowSystemMessage({ id, command });
        (0, store_utility_1.setStoreValue)({
            storeId,
            messageStatus: 1
        });
    }
});
exports.switchSodGameScenes = switchSodGameScenes;
