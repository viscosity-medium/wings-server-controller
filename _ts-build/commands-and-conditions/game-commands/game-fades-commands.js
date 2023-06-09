"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameFadesCommands = void 0;
const gameFadesCommands = {
    mainTimelineFadeIn: "0xFF 0x02 0x2E 0xC8 0xFE",
    mainTimelineFadeOut: "0xFF 0x02 0x2E 0xC9 0xFE",
    hintFadeInScreensaverAndDemoMode: "0xFF 0x02 0x2E 0xCA 0xFE",
    hintFadeOutScreensaverAndDemoMode: "0xFF 0x02 0x2E 0xCB 0xFE",
    cursorPosition1FadeIn: "0xFF 0x02 0x2E 0xCC 0xFE",
    cursorPosition2FadeIn: "0xFF 0x02 0x2E 0xCD 0xFE",
    cursorPosition3FadeIn: "0xFF 0x02 0x2E 0xCE 0xFE",
    cursorPosition4FadeIn: "0xFF 0x02 0x2E 0xCF 0xFE",
    cursorPosition5FadeIn: "0xFF 0x02 0x2E 0xD0 0xFE",
    allCursorPositionsFadeOut: "0xFF 0x02 0x2E 0xD1 0xFE",
    hint1FadeIn: "0xFF 0x02 0x2E 0xD2 0xFE",
    hint2FadeIn: "0xFF 0x02 0x2E 0xD3 0xFE",
    hint3FadeIn: "0xFF 0x02 0x2E 0xD4 0xFE",
    hint4FadeIn: "0xFF 0x02 0x2E 0xD5 0xFE",
    allHintsFadeOut: "0xFF 0x02 0x2E 0xD6 0xFE",
    allMessagesFadeOut: "0xFF 0x02 0x2E 0xE6 0xFE",
};
exports.gameFadesCommands = gameFadesCommands;
