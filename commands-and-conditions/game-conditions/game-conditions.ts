import { EGameControlCommand } from "../../types/game-types";

const gameConditions = {

    modeSelectionButtons: [
        EGameControlCommand.Button_N_A,
        EGameControlCommand.Button_N_B,
        EGameControlCommand.Button_N_C,
        EGameControlCommand.Button_N_D
    ],

    gameEncoders: [
        EGameControlCommand.Encoder_I_LEFT,
        EGameControlCommand.Encoder_I_RIGHT,
        EGameControlCommand.Encoder_II_LEFT,
        EGameControlCommand.Encoder_II_RIGHT,
        EGameControlCommand.Encoder_III_LEFT,
        EGameControlCommand.Encoder_III_RIGHT
    ],

    mnaAnalogEncoders: [
        EGameControlCommand.Encoder_I_LEFT,
        EGameControlCommand.Encoder_I_RIGHT,
    ],

    mnaAnalogButtons: [
        EGameControlCommand.Button_I_A,
        EGameControlCommand.Button_I_B,
        EGameControlCommand.Button_I_C
    ],

    mnaAnalogInterfaces: [
        EGameControlCommand.Encoder_I_LEFT,
        EGameControlCommand.Encoder_I_RIGHT,
        EGameControlCommand.Button_I_A,
        EGameControlCommand.Button_I_B,
        EGameControlCommand.Button_I_C
    ],

    sodAnalogEncoders: [
        EGameControlCommand.Encoder_II_LEFT,
        EGameControlCommand.Encoder_II_RIGHT,
    ],

    sodAnalogButtons: [
        EGameControlCommand.Button_II_A,
        EGameControlCommand.Button_II_B,
        EGameControlCommand.Button_II_C
    ],

    sodAnalogInterfaces: [
        EGameControlCommand.Encoder_II_LEFT,
        EGameControlCommand.Encoder_II_RIGHT,
        EGameControlCommand.Button_II_A,
        EGameControlCommand.Button_II_B,
        EGameControlCommand.Button_II_C
    ],

    loopingAnalogEncoders: [
        EGameControlCommand.Encoder_III_LEFT,
        EGameControlCommand.Encoder_III_RIGHT,
    ],

    loopingAnalogButtons: [
        EGameControlCommand.Button_III_A,
        EGameControlCommand.Button_III_B,
        EGameControlCommand.Button_III_C
    ],

    loopingAnalogInterfaces: [
        EGameControlCommand.Encoder_III_LEFT,
        EGameControlCommand.Encoder_III_RIGHT,
        EGameControlCommand.Button_III_A,
        EGameControlCommand.Button_III_B,
        EGameControlCommand.Button_III_C
    ],

    allAnalogInterfaces: function() {
        return [
            ...this.modeSelectionButtons,
            ...this.mnaAnalogInterfaces,
            ...this.sodAnalogInterfaces,
            ...this.loopingAnalogInterfaces
        ]
    }

}


export {
    gameConditions
}