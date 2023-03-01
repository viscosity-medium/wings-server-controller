import {EGameControlCommand} from "../../../types/game-types";

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

    beginning: {
        encoders: [
            "Encoder_N_LEFT", "Encoder_N_RIGHT", "Encoder_I_LEFT", "Encoder_I_RIGHT",
            "Encoder_II_LEFT", "Encoder_II_RIGHT", "Encoder_III_LEFT", "Encoder_III_RIGHT"
        ],
    },

    mnaValidInterfaces: [
        EGameControlCommand.Encoder_I_LEFT,
        EGameControlCommand.Encoder_I_RIGHT,
        EGameControlCommand.Button_I_A,
        EGameControlCommand.Button_I_B,
        EGameControlCommand.Button_I_C
    ],

    sodValidInterfaces: [
        EGameControlCommand.Encoder_II_LEFT,
        EGameControlCommand.Encoder_II_RIGHT,
        EGameControlCommand.Button_II_A,
        EGameControlCommand.Button_II_B,
        EGameControlCommand.Button_II_C
    ],

    loopingValidInterfaces: [
        EGameControlCommand.Encoder_III_LEFT,
        EGameControlCommand.Encoder_III_RIGHT,
        EGameControlCommand.Button_III_A,
        EGameControlCommand.Button_III_B,
        EGameControlCommand.Button_III_C
    ]

}


export {
    gameConditions
}