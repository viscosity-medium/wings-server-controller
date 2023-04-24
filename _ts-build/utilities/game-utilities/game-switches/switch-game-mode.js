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
exports.switchGameMode = void 0;
const game_types_1 = require("../../../types/game-types");
const hex_transform_utilities_1 = require("../../hex-transform-utilities");
const wings_action_commands_1 = require("../../../commands-and-conditions/wings-action-commands");
const game_services_1 = require("../game-services");
const store_types_1 = require("../../../types/store-types");
const { SpecificGameScene } = wings_action_commands_1.wingsActionCommands;
// mode switch after Button_N_A || Button_N_B || Button_N_C || Button_N_D is triggered
const switchGameMode = ({ id, command, A, B, C, D }) => __awaiter(void 0, void 0, void 0, function* () {
    if (game_types_1.EGameControlCommand.Button_N_A === command && A) {
        const commandHex6 = (0, hex_transform_utilities_1.transformToHexArray)(SpecificGameScene("goToDemo")); // switching to Demo startup mode
        yield game_services_1.gameServices.executeTransitionToSpecificMode({
            id, commandHex6, mode: store_types_1.EGameModes.demo,
        });
    }
    if (game_types_1.EGameControlCommand.Button_N_B === command && B) {
        const commandHex6 = (0, hex_transform_utilities_1.transformToHexArray)(SpecificGameScene("goToMnaModeScene1")); // switching to MNA startup mode
        yield game_services_1.gameServices.executeTransitionToSpecificMode({
            id, commandHex6, mode: store_types_1.EGameModes.mna, scene: 1, cursorPosition: 1, messageStatus: 0
        });
    }
    if (game_types_1.EGameControlCommand.Button_N_C === command && C) {
        const commandHex6 = (0, hex_transform_utilities_1.transformToHexArray)(SpecificGameScene("goToSodModeScene1")); // switching to SOD startup mode
        yield game_services_1.gameServices.executeTransitionToSpecificMode({
            id, commandHex6, mode: store_types_1.EGameModes.sod, scene: 1, cursorPosition: 1, messageStatus: 0
        });
    }
    if (game_types_1.EGameControlCommand.Button_N_D === command && D) {
        const commandHex6 = (0, hex_transform_utilities_1.transformToHexArray)(SpecificGameScene("goToLoopingModeScene1")); // switching to Looping startup mode
        yield game_services_1.gameServices.executeTransitionToSpecificMode({
            id, commandHex6, mode: store_types_1.EGameModes.looping, scene: 1, cursorPosition: 1, messageStatus: 0
        });
    }
});
exports.switchGameMode = switchGameMode;
