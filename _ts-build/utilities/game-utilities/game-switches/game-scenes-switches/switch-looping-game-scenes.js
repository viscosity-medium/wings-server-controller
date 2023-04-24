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
exports.switchLoopingGameScenes = void 0;
const time_utilities_1 = require("../../../time-utilities");
const return_game_looping_conditions_1 = require("../../../../commands-and-conditions/game-conditions/return-game-looping-conditions");
const hex_transform_utilities_1 = require("../../../hex-transform-utilities");
const store_utility_1 = require("../../../store-utility");
const wings_action_commands_1 = require("../../../../commands-and-conditions/wings-action-commands");
const game_services_1 = require("../../game-services");
const store_types_1 = require("../../../../types/store-types");
const store_1 = require("../../../../store/store");
const { SpecificGameScene } = wings_action_commands_1.wingsActionCommands;
const switchLoopingGameScenes = ({ id, gameState, command }) => __awaiter(void 0, void 0, void 0, function* () {
    const storeId = store_types_1.EStoreKeys.installationGame;
    let goToSpecificGameSceneCommand = undefined, scene, cursorPosition, maxCursorPositions;
    if (return_game_looping_conditions_1.returnGameLoopingConditions.condition1Right({ id, command, gameState })) {
        goToSpecificGameSceneCommand = (0, hex_transform_utilities_1.transformToHexArray)(SpecificGameScene("goToLoopingModeScene2"));
        scene = 2;
        cursorPosition = 1;
        maxCursorPositions = 3;
        // setStoreValue({
        //     storeId, scene: 2, cursorPosition: 1, maxCursorPositions: 3
        // });
    }
    else if (return_game_looping_conditions_1.returnGameLoopingConditions.condition2Default({ id, command, gameState })) {
        if (return_game_looping_conditions_1.returnGameLoopingConditions.condition2Right({ id, command, gameState })) {
            goToSpecificGameSceneCommand = (0, hex_transform_utilities_1.transformToHexArray)(SpecificGameScene("goToLoopingModeScene3"));
            scene = 3;
            cursorPosition = 1;
            maxCursorPositions = 3;
            // setStoreValue({
            //     storeId, scene: 3, cursorPosition: 1, maxCursorPositions: 3
            // });
        }
        else if ( //come back to position 1
        return_game_looping_conditions_1.returnGameLoopingConditions.condition2Wrong({ id, command, gameState })) {
            goToSpecificGameSceneCommand = (0, hex_transform_utilities_1.transformToHexArray)(SpecificGameScene("goToLoopingModeScene1"));
            scene = 1;
            cursorPosition = 1;
            maxCursorPositions = 4;
            // setStoreValue({
            //     storeId, scene: 1, cursorPosition: 1, maxCursorPositions: 4
            // });
        }
    }
    else if (return_game_looping_conditions_1.returnGameLoopingConditions.condition3Right({ id, command, gameState })) {
        goToSpecificGameSceneCommand = (0, hex_transform_utilities_1.transformToHexArray)(SpecificGameScene("goToLoopingModeScene4Final"));
        scene = 4;
        cursorPosition = 1;
        maxCursorPositions = 1;
        // setStoreValue({
        //     storeId, scene: 4 , cursorPosition: 1, maxCursorPositions: 1
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
    else if (return_game_looping_conditions_1.returnGameLoopingConditions.loopingButtonsInterfaces({ command })) {
        game_services_1.gameServices.sendCommandToShowSystemMessage({ id, command });
        (0, store_utility_1.setStoreValue)({
            storeId,
            messageStatus: 1
        });
    }
});
exports.switchLoopingGameScenes = switchLoopingGameScenes;
