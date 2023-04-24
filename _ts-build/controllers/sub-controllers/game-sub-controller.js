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
exports.gameSubController = void 0;
const time_utilities_1 = require("../../utilities/time-utilities");
const return_game_looping_conditions_1 = require("../../commands-and-conditions/game-conditions/return-game-looping-conditions");
const switch_game_cursor_position_1 = require("../../utilities/game-utilities/game-switches/switch-game-cursor-position");
const return_game_mna_conditions_1 = require("../../commands-and-conditions/game-conditions/return-game-mna-conditions");
const return_game_sod_conditions_1 = require("../../commands-and-conditions/game-conditions/return-game-sod-conditions");
const switch_looping_game_scenes_1 = require("../../utilities/game-utilities/game-switches/game-scenes-switches/switch-looping-game-scenes");
const store_types_1 = require("../../types/store-types");
const switch_mna_game_scenes_1 = require("../../utilities/game-utilities/game-switches/game-scenes-switches/switch-mna-game-scenes");
const switch_sod_game_scenes_1 = require("../../utilities/game-utilities/game-switches/game-scenes-switches/switch-sod-game-scenes");
const game_conditions_1 = require("../../commands-and-conditions/game-conditions/game-conditions");
const switch_game_mode_1 = require("../../utilities/game-utilities/game-switches/switch-game-mode");
const game_services_1 = require("../../utilities/game-utilities/game-services");
const store_1 = require("../../store/store");
const environment_1 = require("../../_environment/environment");
const hex_transform_utilities_1 = require("../../utilities/hex-transform-utilities");
const game_fades_commands_1 = require("../../commands-and-conditions/game-commands/game-fades-commands");
const { gameEncoders, modeSelectionButtons } = game_conditions_1.gameConditions;
const gameState = store_1.store[store_types_1.EStoreKeys.installationGame];
const storeId = store_types_1.EStoreKeys.installationGame;
const A = true, B = true, C = true, D = true;
const gameSubController = ({ id, command }) => __awaiter(void 0, void 0, void 0, function* () {
    // universal cursor position switcher
    if (gameEncoders.includes(command) && gameState.messageStatus === 0) {
        yield (0, switch_game_cursor_position_1.switchGameCursorPosition)({ id, command });
    }
    if ( // screensaver mode
    gameState.mode === store_types_1.EGameModes.screensaver) {
        if (modeSelectionButtons.includes(command)) {
            yield (0, switch_game_mode_1.switchGameMode)({ id, command, A, B, C, D }); // all modes are interactive
        }
        else if (gameEncoders.includes(command)) {
            if (gameState.hintStatus === 0) {
                const systemMessage = (0, hex_transform_utilities_1.transformToHexArray)(game_fades_commands_1.gameFadesCommands.hintFadeInScreensaverAndDemoMode);
                game_services_1.gameServices.sendCommandToChangeHintStatus({ id, systemMessage, hintStatus: 1 });
            }
            else if (gameState.hintStatus === 1) {
                const systemMessage = (0, hex_transform_utilities_1.transformToHexArray)(game_fades_commands_1.gameFadesCommands.hintFadeOutScreensaverAndDemoMode);
                game_services_1.gameServices.sendCommandToChangeHintStatus({ id, systemMessage, hintStatus: 0 });
            }
        }
    }
    else if ( // demo mode
    gameState.mode === store_types_1.EGameModes.demo) {
        if (modeSelectionButtons.includes(command)) {
            yield (0, switch_game_mode_1.switchGameMode)({ id, command, B, C, D }); // without the demo mode interaction (A is missed)
        }
        else if (gameEncoders.includes(command) && gameState.messageStatus === 0) {
            if (gameState.hintStatus === 0) {
                const systemMessage = (0, hex_transform_utilities_1.transformToHexArray)(game_fades_commands_1.gameFadesCommands.hintFadeInScreensaverAndDemoMode);
                game_services_1.gameServices.sendCommandToChangeHintStatus({ id, systemMessage, hintStatus: 1 });
            }
            else if (gameState.hintStatus === 1) {
                const systemMessage = (0, hex_transform_utilities_1.transformToHexArray)(game_fades_commands_1.gameFadesCommands.hintFadeOutScreensaverAndDemoMode);
                game_services_1.gameServices.sendCommandToChangeHintStatus({ id, systemMessage, hintStatus: 0 });
            }
        }
    }
    else if ( // mna mode
    gameState.mode === store_types_1.EGameModes.mna) {
        // check that the command came from switch mode buttons
        if (modeSelectionButtons.includes(command)) {
            yield (0, switch_game_mode_1.switchGameMode)({ id, command, A, B, C, D }); // all modes are interactive
        }
        // check that the command came from mna mode buttons/encoders
        if (return_game_mna_conditions_1.returnGameMnaConditions.mnaValidInterfaces({ command }) && return_game_mna_conditions_1.returnGameMnaConditions.notLastScenes()) {
            if (gameState.messageStatus === 0) {
                yield (0, switch_mna_game_scenes_1.switchMnaGameScenes)({ id, command, gameState });
            }
            else if (gameState.messageStatus === 1) {
                game_services_1.gameServices.sendCommandToHideSystemMessages({ id });
                if (gameState.savedSceneToGo) {
                    yield (0, time_utilities_1.abortMessageDisplayAndGoToTheNextGameScene)({
                        id,
                        storeId,
                        goToSpecificGameSceneCommand: gameState.savedSceneToGo
                    });
                }
            }
        }
    }
    else if ( // sod mode
    gameState.mode === store_types_1.EGameModes.sod) {
        // check that the command came from switch mode buttons
        if (modeSelectionButtons.includes(command)) {
            yield (0, switch_game_mode_1.switchGameMode)({ id, command, A, B, C, D }); // all modes are interactive
        }
        // check that the command came from sod mode buttons/encoders
        if (return_game_sod_conditions_1.returnGameSodConditions.sodValidInterfaces({ command }) && return_game_sod_conditions_1.returnGameSodConditions.notLastScenes()) {
            if (gameState.messageStatus === 0) {
                yield (0, switch_sod_game_scenes_1.switchSodGameScenes)({ id, command, gameState });
            }
            else if (gameState.messageStatus === 1) {
                game_services_1.gameServices.sendCommandToHideSystemMessages({ id });
                if (gameState.savedSceneToGo) {
                    yield (0, time_utilities_1.abortMessageDisplayAndGoToTheNextGameScene)({
                        id,
                        storeId,
                        goToSpecificGameSceneCommand: gameState.savedSceneToGo
                    });
                }
            }
        }
    }
    else if ( // looping mode
    gameState.mode === store_types_1.EGameModes.looping) {
        // check that the command came from switch mode buttons
        if (modeSelectionButtons.includes(command)) {
            yield (0, switch_game_mode_1.switchGameMode)({ id, command, A, B, C, D }); // all modes are interactive
        }
        // check that the command came from looping mode buttons/encoders
        if (return_game_looping_conditions_1.returnGameLoopingConditions.loopingValidInterfaces({ command }) && return_game_looping_conditions_1.returnGameLoopingConditions.notLastScenes()) {
            if (gameState.messageStatus === 0) {
                yield (0, switch_looping_game_scenes_1.switchLoopingGameScenes)({ id, command, gameState });
            }
            else if (gameState.messageStatus === 1) {
                game_services_1.gameServices.sendCommandToHideSystemMessages({ id });
                if (gameState.savedSceneToGo) {
                    yield (0, time_utilities_1.abortMessageDisplayAndGoToTheNextGameScene)({
                        id,
                        storeId,
                        goToSpecificGameSceneCommand: gameState.savedSceneToGo
                    });
                }
            }
        }
    }
    yield (0, time_utilities_1.delayedComeBackToScreensaver)({ storeId, id, type: "active", idleTime: environment_1.installationIds["Game"].idleTime });
});
exports.gameSubController = gameSubController;
