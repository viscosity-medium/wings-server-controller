import { gameScenesCommands } from "./game-commands/game-scenes-commands";
import { ICommandsToExecute } from "../types/_common-types";
import { gameFadesCommands } from "./game-commands/game-fades-commands";

const actionCommands: ICommandsToExecute = {

    // common commands
    playCommand: {
        commandName: "Play",
        commandAction: "0xFF 0x01 0x05 0xFE",
    },

    pauseCommand: {
        commandName: "Pause",
        commandAction: "0xFF 0x01 0x03 0xFE",
    },

    continueCommand: {
        commandName: "Continue",
        commandAction: "0xFF 0x01 0x07 0xFE",
    },

    stop: {
        commandName: "Stop",
        commandAction: "0xFF 0x01 0x02 0xFE",
    },

    nextMarker: {
        commandName: "Go to the next marker",
        commandAction: "0xFF 0x01 0x09 0xFE",
    },

    previousMarker: {
        commandName: "Go to the previous marker",
        commandAction: "0xFF 0x01 0x0A 0xFE",
    },

    timeIndicatorPosition: {
        commandName: "Go to the specific marker (XX или YY = remote index from 1 to 250)",
        commandAction: (XX: string, YY: string) => `0xFF 0x03 0x06 0x${XX} 0x${YY} 0xFE`,
    },

    executeTrigger: {
        commandName: "Execute trigger [(XX = remote index from 1 to 250)]",
        commandAction: (XX: string) => `0xFF 0x02 0x2E 0x${XX} 0xFE`,
    },
    
    // special game-commands commands

    specificGameScene: {
        commandName: "Go to the specific game scene",
        commandAction: (command) => gameScenesCommands[ command ],
    },

    fadeTimeline: {
        commandName: "Execute fade in/out command",
        commandAction: (command) => gameFadesCommands[ command ],
    },

};

export {
    actionCommands
}