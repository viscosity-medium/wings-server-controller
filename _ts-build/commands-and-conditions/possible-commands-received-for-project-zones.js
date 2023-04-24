"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.possibleCommandsReceivedForProjectZones = void 0;
const command_types_1 = require("../types/command-types");
const possibleCommandsReceivedForProjectZones = {
    goForward: [
        command_types_1.EHttpCommands.Next, command_types_1.EUdpProjectCommands.Encoder_Right, command_types_1.EUdpProjectCommands.Test_Portraits_R,
        command_types_1.EUdpProjectCommands.Test_Map_R, command_types_1.EUdpProjectCommands.Test_Covers_R, command_types_1.EUdpProjectCommands.Test_Cabinet_R,
        command_types_1.EUdpProjectCommands.Test_Pipeline_R, command_types_1.EUdpProjectCommands.Test_Lab_R, command_types_1.EUdpProjectCommands.Test_Game_R
    ],
    goBackwards: [
        command_types_1.EHttpCommands.Prev, command_types_1.EUdpProjectCommands.Encoder_Left, command_types_1.EUdpProjectCommands.Test_Portraits_L,
        command_types_1.EUdpProjectCommands.Test_Map_L, command_types_1.EUdpProjectCommands.Test_Covers_L, command_types_1.EUdpProjectCommands.Test_Cabinet_L,
        command_types_1.EUdpProjectCommands.Test_Pipeline_L, command_types_1.EUdpProjectCommands.Test_Lab_L, command_types_1.EUdpProjectCommands.Test_Game_L
    ],
    hexSingleCommands: [
        command_types_1.EHttpCommands.Pause, command_types_1.EHttpCommands.ContinuePlay, command_types_1.EHttpCommands.HideImages
    ],
    pipelineNumbers: () => {
        const arr = [];
        for (let i = 10; i < 23; i++) {
            arr.push(`${i}`);
        }
        return arr;
    },
};
exports.possibleCommandsReceivedForProjectZones = possibleCommandsReceivedForProjectZones;
