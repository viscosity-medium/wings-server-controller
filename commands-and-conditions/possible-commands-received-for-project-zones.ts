import {HttpCommands, UdpProjectCommands, VolumeCommands} from "../types/command-types";

const possibleCommandsReceivedForProjectZones = {

    goForward: [
        HttpCommands.Next, UdpProjectCommands.Encoder_Right, UdpProjectCommands.Test_Portraits_R,
        UdpProjectCommands.Test_Map_R, UdpProjectCommands.Test_Covers_R, UdpProjectCommands.Test_Cabinet_R,
        UdpProjectCommands.Test_Pipeline_R, UdpProjectCommands.Test_Lab_R, UdpProjectCommands.Test_Game_R
    ],

    goBackwards: [
        HttpCommands.Prev, UdpProjectCommands.Encoder_Left, UdpProjectCommands.Test_Portraits_L,
        UdpProjectCommands.Test_Map_L, UdpProjectCommands.Test_Covers_L, UdpProjectCommands.Test_Cabinet_L,
        UdpProjectCommands.Test_Pipeline_L, UdpProjectCommands.Test_Lab_L, UdpProjectCommands.Test_Game_L
    ],

    singleCommands: [
        HttpCommands.Pause, HttpCommands.ContinuePlay, HttpCommands.HideImages,
        VolumeCommands.Volume_0, VolumeCommands.Volume_25,
        VolumeCommands.Volume_50, VolumeCommands.Volume_75,
        VolumeCommands.Volume_100
    ],

    goToScreensaver: [
        HttpCommands.GoToScreensaver
    ],

    pipelineNumbers: () => {
        const arr = [];
        for(let i = 1; i < 30;i++){
            arr.push(`${i}`);
        }
        return arr
    },


}

export {
    possibleCommandsReceivedForProjectZones
}