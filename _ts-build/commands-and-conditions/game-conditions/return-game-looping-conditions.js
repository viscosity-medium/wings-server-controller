"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnGameLoopingConditions = void 0;
const game_types_1 = require("../../types/game-types");
const game_conditions_1 = require("./game-conditions");
const store_1 = require("../../store/store");
const store_types_1 = require("../../types/store-types");
class ReturnGameLoopingConditions {
    loopingButtonsInterfaces({ command }) {
        return game_conditions_1.gameConditions.loopingAnalogButtons.includes(command);
    }
    loopingValidInterfaces({ command }) {
        return game_conditions_1.gameConditions.loopingAnalogInterfaces.includes(command);
    }
    notLastScenes() {
        return ![4].includes(store_1.store[store_types_1.EStoreKeys.installationGame].scene);
    }
    condition1Right({ gameState, command }) {
        return (gameState.scene === 1 &&
            (gameState.cursorPosition === 1 ||
                gameState.cursorPosition === 2) &&
            command === game_types_1.EGameControlCommand.Button_III_A);
    }
    condition2Default({ gameState, command }) {
        return (gameState.scene === 2);
    }
    condition2Right({ gameState, command }) {
        return ((gameState.cursorPosition === 1 ||
            gameState.cursorPosition === 2) &&
            command === game_types_1.EGameControlCommand.Button_III_A);
    }
    condition2Wrong({ gameState, command }) {
        return (((gameState.cursorPosition === 1 || gameState.cursorPosition === 2) &&
            [
                game_types_1.EGameControlCommand.Button_III_B,
                game_types_1.EGameControlCommand.Button_III_C
            ].includes(command)) ||
            (gameState.cursorPosition === 3 &&
                [
                    game_types_1.EGameControlCommand.Button_III_A,
                    game_types_1.EGameControlCommand.Button_III_B,
                    game_types_1.EGameControlCommand.Button_III_C
                ].includes(command)));
    }
    condition3Right({ gameState, command }) {
        return (gameState.scene === 3 &&
            gameState.cursorPosition === 2 &&
            command === game_types_1.EGameControlCommand.Button_III_B);
    }
}
const returnGameLoopingConditions = new ReturnGameLoopingConditions();
exports.returnGameLoopingConditions = returnGameLoopingConditions;
