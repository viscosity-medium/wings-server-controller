"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wingsActionCommands = void 0;
const game_scenes_commands_1 = require("./game-commands/game-scenes-commands");
const game_fades_commands_1 = require("./game-commands/game-fades-commands");
const wingsActionCommands = {
    // common commands
    Play: "0xFF 0x01 0x05 0xFE",
    Pause: "0xFF 0x01 0x03 0xFE",
    HideImages: "0xFF 0x02 0x2E 0x0A 0xFE",
    ContinuePlay: "0xFF 0x01 0x07 0xFE",
    Stop: "0xFF 0x01 0x02 0xFE",
    NextMarker: "0xFF 0x02 0x2E 0xF0 0xFE",
    PreviousMarker: "0xFF 0x02 0x2E 0xF1 0xFE",
    TimeIndicatorPosition: (XX, YY) => `0xFF 0x03 0x06 0x${XX} 0x${YY} 0xFE`,
    ExecuteTrigger: (XX) => `0xFF 0x02 0x2E 0x${XX} 0xFE`,
    SendShortCode: (XX) => XX,
    // special game-commands commands
    SpecificGameScene: (command) => game_scenes_commands_1.gameScenesCommands[command],
    FadeTimeline: (command) => game_fades_commands_1.gameFadesCommands[command],
};
exports.wingsActionCommands = wingsActionCommands;
