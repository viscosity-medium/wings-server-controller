import { EHttpCommands, EUdpProjectCommands } from "../types/command-types";

const possibleCommandsReceivedForProjectZones = {

    goForward: [
        EHttpCommands.Next, EUdpProjectCommands.Encoder_Right, EUdpProjectCommands.Test_Portraits_R,
        EUdpProjectCommands.Test_Map_R, EUdpProjectCommands.Test_Covers_R, EUdpProjectCommands.Test_Cabinet_R,
        EUdpProjectCommands.Test_Pipeline_R, EUdpProjectCommands.Test_Lab_R, EUdpProjectCommands.Test_Game_R
    ],

    goBackwards: [
        EHttpCommands.Prev, EUdpProjectCommands.Encoder_Left, EUdpProjectCommands.Test_Portraits_L,
        EUdpProjectCommands.Test_Map_L, EUdpProjectCommands.Test_Covers_L, EUdpProjectCommands.Test_Cabinet_L,
        EUdpProjectCommands.Test_Pipeline_L, EUdpProjectCommands.Test_Lab_L, EUdpProjectCommands.Test_Game_L
    ],

    hexSingleCommands: [
        EHttpCommands.Pause, EHttpCommands.ContinuePlay,
    ],

}

export {
    possibleCommandsReceivedForProjectZones
}