import {GameControlCommand} from "../../types/game-types";

const gameConditions = {

    modeSelectionButtons: [
        GameControlCommand.Button_N_N,
        GameControlCommand.Button_N_A,
        GameControlCommand.Button_N_B,
        GameControlCommand.Button_N_C,
        GameControlCommand.Button_N_D
    ],

    gameEncoders: [
        GameControlCommand.Encoder_N_LEFT,
        GameControlCommand.Encoder_N_RIGHT,
        GameControlCommand.Encoder_I_LEFT,
        GameControlCommand.Encoder_I_RIGHT,
        GameControlCommand.Encoder_II_LEFT,
        GameControlCommand.Encoder_II_RIGHT,
        GameControlCommand.Encoder_III_LEFT,
        GameControlCommand.Encoder_III_RIGHT
    ],

    mnaAnalogEncoders: [
        GameControlCommand.Encoder_I_LEFT,
        GameControlCommand.Encoder_I_RIGHT,
    ],

    mnaAnalogButtons: [
        GameControlCommand.Button_I_A,
        GameControlCommand.Button_I_B,
        GameControlCommand.Button_I_C
    ],

    mnaAnalogInterfaces: [
        GameControlCommand.Encoder_I_LEFT,
        GameControlCommand.Encoder_I_RIGHT,
        GameControlCommand.Button_I_A,
        GameControlCommand.Button_I_B,
        GameControlCommand.Button_I_C
    ],

    sodAnalogEncoders: [
        GameControlCommand.Encoder_II_LEFT,
        GameControlCommand.Encoder_II_RIGHT,
    ],

    sodAnalogButtons: [
        GameControlCommand.Button_II_A,
        GameControlCommand.Button_II_B,
        GameControlCommand.Button_II_C
    ],

    sodAnalogInterfaces: [
        GameControlCommand.Encoder_II_LEFT,
        GameControlCommand.Encoder_II_RIGHT,
        GameControlCommand.Button_II_A,
        GameControlCommand.Button_II_B,
        GameControlCommand.Button_II_C
    ],

    loopingAnalogEncoders: [
        GameControlCommand.Encoder_III_LEFT,
        GameControlCommand.Encoder_III_RIGHT,
    ],

    loopingAnalogButtons: [
        GameControlCommand.Button_III_A,
        GameControlCommand.Button_III_B,
        GameControlCommand.Button_III_C
    ],

    loopingAnalogInterfaces: [
        GameControlCommand.Encoder_III_LEFT,
        GameControlCommand.Encoder_III_RIGHT,
        GameControlCommand.Button_III_A,
        GameControlCommand.Button_III_B,
        GameControlCommand.Button_III_C
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