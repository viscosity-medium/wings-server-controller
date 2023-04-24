"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnGameSodConditions = void 0;
const game_types_1 = require("../../types/game-types");
const game_conditions_1 = require("./game-conditions");
const store_1 = require("../../store/store");
const store_types_1 = require("../../types/store-types");
class ReturnGameSodConditions {
    sodButtonsInterfaces({ command }) {
        return game_conditions_1.gameConditions.sodAnalogButtons.includes(command);
    }
    sodValidInterfaces({ command }) {
        return game_conditions_1.gameConditions.sodAnalogInterfaces.includes(command);
    }
    notLastScenes() {
        return ![5].includes(store_1.store[store_types_1.EStoreKeys.installationGame].scene);
    }
    condition1Right({ gameState, command }) {
        return (gameState.scene === 1 &&
            gameState.cursorPosition === 2 &&
            command === game_types_1.EGameControlCommand.Button_II_A);
    }
    condition2Right({ gameState, command }) {
        return (gameState.scene === 2 &&
            gameState.cursorPosition === 3 &&
            command === game_types_1.EGameControlCommand.Button_II_A);
    }
    condition3Right({ gameState, command }) {
        return (gameState.scene === 3 &&
            gameState.cursorPosition === 1 &&
            command === game_types_1.EGameControlCommand.Button_II_A);
    }
    condition4Right({ gameState, command }) {
        return (gameState.scene === 4 &&
            gameState.cursorPosition === 2 &&
            command === game_types_1.EGameControlCommand.Button_II_B);
    }
}
const returnGameSodConditions = new ReturnGameSodConditions();
exports.returnGameSodConditions = returnGameSodConditions;
