"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnGameMnaConditions = void 0;
const game_types_1 = require("../../types/game-types");
const game_conditions_1 = require("./game-conditions");
const store_1 = require("../../store/store");
const store_types_1 = require("../../types/store-types");
class ReturnGameMnaConditions {
    mnaButtonsInterfaces({ command }) {
        return game_conditions_1.gameConditions.mnaAnalogButtons.includes(command);
    }
    mnaValidInterfaces({ command }) {
        return game_conditions_1.gameConditions.mnaAnalogInterfaces.includes(command);
    }
    notLastScenes() {
        return ![5, 6, 7].includes(store_1.store[store_types_1.EStoreKeys.installationGame].scene);
    }
    stage1Right({ gameState, command }) {
        return (gameState.scene === 1 &&
            gameState.cursorPosition == 1 &&
            command === game_types_1.EGameControlCommand.Button_I_A);
    }
    stage2Right({ gameState, command }) {
        return (gameState.scene === 2 &&
            gameState.cursorPosition === 2 &&
            command === game_types_1.EGameControlCommand.Button_I_B);
    }
    stage3Default({ gameState }) {
        return gameState.scene === 3;
    }
    stage3Right({ gameState, command }) {
        return (gameState.cursorPosition === 1 &&
            [
                game_types_1.EGameControlCommand.Button_I_A,
                game_types_1.EGameControlCommand.Button_I_B
            ].includes(command));
    }
    stage3Wrong({ gameState, command }) {
        return ((gameState.cursorPosition === 1 &&
            command === game_types_1.EGameControlCommand.Button_I_C) ||
            (gameState.cursorPosition === 2 && ([
                game_types_1.EGameControlCommand.Button_I_A,
                game_types_1.EGameControlCommand.Button_I_B,
                game_types_1.EGameControlCommand.Button_I_C
            ].includes(command))));
    }
    stage4Default({ gameState, command }) {
        return (gameState.scene === 4 &&
            command === game_types_1.EGameControlCommand.Button_I_C);
    }
    stage4Right1({ gameState }) {
        return gameState.cursorPosition === 2;
    }
    stage4Right2({ gameState }) {
        return gameState.cursorPosition === 3;
    }
    stage4Right3({ gameState }) {
        return gameState.cursorPosition === 4;
    }
}
const returnGameMnaConditions = new ReturnGameMnaConditions();
exports.returnGameMnaConditions = returnGameMnaConditions;
