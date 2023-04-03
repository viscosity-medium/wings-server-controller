import { gameScenesCommands } from "./game-commands/game-scenes-commands";
import { TCommandsToExecute } from "../types/_common-types";
import { gameFadesCommands } from "./game-commands/game-fades-commands";

const wingsActionCommands: TCommandsToExecute = {

    // common commands
    Play: "0xFF 0x01 0x05 0xFE",

    Pause: "0xFF 0x01 0x03 0xFE",

    HideImages: "0xFF 0x02 0x2E 0x0A 0xFE",

    ContinuePlay: "0xFF 0x01 0x07 0xFE",

    Stop: "0xFF 0x01 0x02 0xFE",

    NextMarker: "0xFF 0x02 0x2E 0xF0 0xFE",

    PreviousMarker: "0xFF 0x02 0x2E 0xF1 0xFE",

    TimeIndicatorPosition: ( XX: string, YY: string ) => `0xFF 0x03 0x06 0x${ XX } 0x${ YY } 0xFE`,

    ExecuteTrigger: ( XX: string ) => `0xFF 0x02 0x2E 0x${ XX } 0xFE`,

    SendShortCode: (XX) => XX,
    
    // special game-commands commands

    SpecificGameScene: ( command ) => gameScenesCommands[ command ],

    FadeTimeline: ( command ) => gameFadesCommands[ command ],

};

export {
    wingsActionCommands
}