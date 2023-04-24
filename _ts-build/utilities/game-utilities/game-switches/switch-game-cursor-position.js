"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.switchGameCursorPosition = void 0;
const store_types_1 = require("../../../types/store-types");
const store_1 = require("../../../store/store");
const game_services_1 = require("../game-services");
const switchGameCursorPosition = ({ id, command }) => __awaiter(void 0, void 0, void 0, function* () {
    const gameState = store_1.store[store_types_1.EStoreKeys.installationGame];
    if (gameState.mode === store_types_1.EGameModes.mna) {
        if (command === "Encoder_I_LEFT") {
            yield game_services_1.gameServices.changeCursorPositionToTheLeft({ id });
        }
        if (command === "Encoder_I_RIGHT") {
            yield game_services_1.gameServices.changeCursorPositionToTheRight({ id });
        }
    }
    if (gameState.mode === store_types_1.EGameModes.sod) {
        if (command === "Encoder_II_LEFT") {
            yield game_services_1.gameServices.changeCursorPositionToTheLeft({ id });
        }
        if (command === "Encoder_II_RIGHT") {
            yield game_services_1.gameServices.changeCursorPositionToTheRight({ id });
        }
    }
    if (gameState.mode === store_types_1.EGameModes.looping) {
        if (command === "Encoder_III_LEFT") {
            yield game_services_1.gameServices.changeCursorPositionToTheLeft({ id });
        }
        if (command === "Encoder_III_RIGHT") {
            yield game_services_1.gameServices.changeCursorPositionToTheRight({ id });
        }
    }
});
exports.switchGameCursorPosition = switchGameCursorPosition;
