"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameSystemMessage = void 0;
const game_types_1 = require("../../types/game-types");
const hex_transform_utilities_1 = require("../../utilities/hex-transform-utilities");
const game_messages_commands_1 = require("../game-commands/game-messages-commands");
class GameSystemMessage {
    returnMessageForMnaMode({ command }) {
        if (command === game_types_1.EGameControlCommand.Button_I_A) {
            return (0, hex_transform_utilities_1.returnHexMessageCommand)(game_messages_commands_1.gameAMessagesCommands);
        }
        else if (command === game_types_1.EGameControlCommand.Button_I_B) {
            return (0, hex_transform_utilities_1.returnHexMessageCommand)(game_messages_commands_1.gameBMessagesCommands);
        }
        else if (command === game_types_1.EGameControlCommand.Button_I_C) {
            return (0, hex_transform_utilities_1.returnHexMessageCommand)(game_messages_commands_1.gameCMessagesCommands);
        }
    }
    returnMessageForSodMode({ command }) {
        if (command === game_types_1.EGameControlCommand.Button_II_A) {
            return (0, hex_transform_utilities_1.returnHexMessageCommand)(game_messages_commands_1.gameAMessagesCommands);
        }
        else if (command === game_types_1.EGameControlCommand.Button_II_B) {
            return (0, hex_transform_utilities_1.returnHexMessageCommand)(game_messages_commands_1.gameBMessagesCommands);
        }
        else if (command === game_types_1.EGameControlCommand.Button_II_C) {
            return (0, hex_transform_utilities_1.returnHexMessageCommand)(game_messages_commands_1.gameCMessagesCommands);
        }
    }
    returnMessageForLoopingMode({ command }) {
        if (command === game_types_1.EGameControlCommand.Button_III_A) {
            return (0, hex_transform_utilities_1.returnHexMessageCommand)(game_messages_commands_1.gameAMessagesCommands);
        }
        else if (command === game_types_1.EGameControlCommand.Button_III_B) {
            return (0, hex_transform_utilities_1.returnHexMessageCommand)(game_messages_commands_1.gameBMessagesCommands);
        }
        else if (command === game_types_1.EGameControlCommand.Button_III_C) {
            return (0, hex_transform_utilities_1.returnHexMessageCommand)(game_messages_commands_1.gameCMessagesCommands);
        }
    }
}
const gameSystemMessage = new GameSystemMessage();
exports.gameSystemMessage = gameSystemMessage;
