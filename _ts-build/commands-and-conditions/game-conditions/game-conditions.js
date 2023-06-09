"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameConditions = void 0;
const game_types_1 = require("../../types/game-types");
const gameConditions = {
    modeSelectionButtons: [
        game_types_1.EGameControlCommand.Button_N_A,
        game_types_1.EGameControlCommand.Button_N_B,
        game_types_1.EGameControlCommand.Button_N_C,
        game_types_1.EGameControlCommand.Button_N_D
    ],
    gameEncoders: [
        game_types_1.EGameControlCommand.Encoder_N_LEFT,
        game_types_1.EGameControlCommand.Encoder_N_RIGHT,
        game_types_1.EGameControlCommand.Encoder_I_LEFT,
        game_types_1.EGameControlCommand.Encoder_I_RIGHT,
        game_types_1.EGameControlCommand.Encoder_II_LEFT,
        game_types_1.EGameControlCommand.Encoder_II_RIGHT,
        game_types_1.EGameControlCommand.Encoder_III_LEFT,
        game_types_1.EGameControlCommand.Encoder_III_RIGHT
    ],
    mnaAnalogEncoders: [
        game_types_1.EGameControlCommand.Encoder_I_LEFT,
        game_types_1.EGameControlCommand.Encoder_I_RIGHT,
    ],
    mnaAnalogButtons: [
        game_types_1.EGameControlCommand.Button_I_A,
        game_types_1.EGameControlCommand.Button_I_B,
        game_types_1.EGameControlCommand.Button_I_C
    ],
    mnaAnalogInterfaces: [
        game_types_1.EGameControlCommand.Encoder_I_LEFT,
        game_types_1.EGameControlCommand.Encoder_I_RIGHT,
        game_types_1.EGameControlCommand.Button_I_A,
        game_types_1.EGameControlCommand.Button_I_B,
        game_types_1.EGameControlCommand.Button_I_C
    ],
    sodAnalogEncoders: [
        game_types_1.EGameControlCommand.Encoder_II_LEFT,
        game_types_1.EGameControlCommand.Encoder_II_RIGHT,
    ],
    sodAnalogButtons: [
        game_types_1.EGameControlCommand.Button_II_A,
        game_types_1.EGameControlCommand.Button_II_B,
        game_types_1.EGameControlCommand.Button_II_C
    ],
    sodAnalogInterfaces: [
        game_types_1.EGameControlCommand.Encoder_II_LEFT,
        game_types_1.EGameControlCommand.Encoder_II_RIGHT,
        game_types_1.EGameControlCommand.Button_II_A,
        game_types_1.EGameControlCommand.Button_II_B,
        game_types_1.EGameControlCommand.Button_II_C
    ],
    loopingAnalogEncoders: [
        game_types_1.EGameControlCommand.Encoder_III_LEFT,
        game_types_1.EGameControlCommand.Encoder_III_RIGHT,
    ],
    loopingAnalogButtons: [
        game_types_1.EGameControlCommand.Button_III_A,
        game_types_1.EGameControlCommand.Button_III_B,
        game_types_1.EGameControlCommand.Button_III_C
    ],
    loopingAnalogInterfaces: [
        game_types_1.EGameControlCommand.Encoder_III_LEFT,
        game_types_1.EGameControlCommand.Encoder_III_RIGHT,
        game_types_1.EGameControlCommand.Button_III_A,
        game_types_1.EGameControlCommand.Button_III_B,
        game_types_1.EGameControlCommand.Button_III_C
    ],
    allAnalogInterfaces: function () {
        return [
            ...this.modeSelectionButtons,
            ...this.mnaAnalogInterfaces,
            ...this.sodAnalogInterfaces,
            ...this.loopingAnalogInterfaces
        ];
    }
};
exports.gameConditions = gameConditions;
