import {abortMessageDisplayAndGoToTheNextGameScene, delayedComeBackToScreensaver} from "../../utilities/time-utilities";
import { returnGameLoopingConditions } from "../../commands-and-conditions/game-conditions/return-game-looping-conditions";
import { switchGameCursorPosition } from "../../utilities/game-utilities/game-switches/switch-game-cursor-position";
import { returnGameMnaConditions } from "../../commands-and-conditions/game-conditions/return-game-mna-conditions";
import { returnGameSodConditions } from "../../commands-and-conditions/game-conditions/return-game-sod-conditions";
import { switchLoopingGameScenes } from "../../utilities/game-utilities/game-switches/game-scenes-switches/switch-looping-game-scenes";
import { EGameModes, EStoreKeys} from "../../types/store-types";
import { switchMnaGameScenes } from "../../utilities/game-utilities/game-switches/game-scenes-switches/switch-mna-game-scenes";
import { switchSodGameScenes } from "../../utilities/game-utilities/game-switches/game-scenes-switches/switch-sod-game-scenes";
import { TGameController } from "../../types/game-types";
import { gameConditions } from "../../commands-and-conditions/game-conditions/game-conditions";
import { switchGameMode } from "../../utilities/game-utilities/game-switches/switch-game-mode";
import { gameServices } from "../../utilities/game-utilities/game-services";
import { store } from "../../store/store"
import {installationIds} from "../../_environment/environment";
import {transformToHexArray} from "../../utilities/hex-transform-utilities";
import {gameFadesCommands} from "../../commands-and-conditions/game-commands/game-fades-commands";
import {sendDataToWingsServerOverUdp} from "../../utilities/udp/dgram-udp-utilities";
import {setStoreValue} from "../../utilities/store-utility";

const { gameEncoders, modeSelectionButtons } = gameConditions;
const gameState = store[ EStoreKeys.installationGame ];
const storeId = EStoreKeys.installationGame;
const A = true, B = true, C = true, D = true;

const gameSubController: TGameController = async ({ id, command } ) => {

    // universal cursor position switcher
    if( gameEncoders.includes( command ) && gameState.messageStatus === 0){
        await switchGameCursorPosition({ id, command });
    }

    // screensaver mode
    if(
        gameState.mode === EGameModes.screensaver
    ){

        if( modeSelectionButtons.includes( command ) ){

            await switchGameMode({ id, command, A, B, C, D }); // all modes are interactive

        } else if ( gameEncoders.includes( command ) ) {

            if( gameState.hintStatus === 0 ) {

                const systemMessage = transformToHexArray( gameFadesCommands.hintFadeInScreensaverAndDemoMode );
                gameServices.sendCommandToChangeHintStatus({id, systemMessage, hintStatus: 1});

            } else if ( gameState.hintStatus === 1 ) {

                const systemMessage = transformToHexArray( gameFadesCommands.hintFadeOutScreensaverAndDemoMode );
                gameServices.sendCommandToChangeHintStatus({id, systemMessage, hintStatus: 0});

            }

        }

    // demo mode
    } else  if (
        gameState.mode === EGameModes.demo
    ){
        if( modeSelectionButtons.includes( command ) ){

            await switchGameMode({ id, command, B, C, D }); // without the demo mode interaction (A is missed)

        } else if ( gameEncoders.includes( command ) && gameState.messageStatus === 0 ) {

            if( gameState.hintStatus === 0 ) {

                const systemMessage = transformToHexArray( gameFadesCommands.hintFadeInScreensaverAndDemoMode );
                gameServices.sendCommandToChangeHintStatus({id, systemMessage, hintStatus: 1})

            } else if ( gameState.hintStatus === 1 ) {

                const systemMessage = transformToHexArray( gameFadesCommands.hintFadeOutScreensaverAndDemoMode );
                gameServices.sendCommandToChangeHintStatus({id, systemMessage, hintStatus: 0})

            }

        }
    // mna mode
    } else if (
        gameState.mode === EGameModes.mna
    ){

        // check that the command came from switch mode buttons
        if( modeSelectionButtons.includes( command ) ){
            await switchGameMode({ id, command, A, B, C, D }); // all modes are interactive
        }

        // check that the command came from mna mode buttons/encoders
        if( returnGameMnaConditions.mnaValidInterfaces({ command }) && returnGameMnaConditions.notLastScenes() || gameState.messageStatus === 1 ){

            if( gameState.messageStatus === 0 ){

                await switchMnaGameScenes({ id, command, gameState });

            } else if( gameState.messageStatus === 1 ){

                gameServices.sendCommandToHideSystemMessages({ id });

                if(gameState.savedSceneToGo){

                    await abortMessageDisplayAndGoToTheNextGameScene({
                        id,
                        storeId,
                        goToSpecificGameSceneCommand: gameState.savedSceneToGo
                    })

                }

            }

        }

    // sod mode
    } else if(
        gameState.mode === EGameModes.sod
    ){

        // check that the command came from switch mode buttons
        if( modeSelectionButtons.includes( command ) ){
            await switchGameMode({ id, command, A, B, C, D }); // all modes are interactive
        }

        // check that the command came from sod mode buttons/encoders
        if( returnGameSodConditions.sodValidInterfaces({ command })  && returnGameSodConditions.notLastScenes() || gameState.messageStatus === 1){

            if( gameState.messageStatus === 0 ){

                await switchSodGameScenes({ id, command, gameState });

            } else if( gameState.messageStatus === 1 ){

                gameServices.sendCommandToHideSystemMessages({ id });

                if( gameState.savedSceneToGo ){

                    await abortMessageDisplayAndGoToTheNextGameScene({
                        id,
                        storeId,
                        goToSpecificGameSceneCommand: gameState.savedSceneToGo
                    })

                }

            }

        }

    // looping mode
    } else if(
        gameState.mode === EGameModes.looping
    ){

        // check that the command came from switch mode buttons
        if( modeSelectionButtons.includes(command) ){
            await switchGameMode({ id, command, A, B, C, D }); // all modes are interactive
        }

        // check that the command came from looping mode buttons/encoders
        if( returnGameLoopingConditions.loopingValidInterfaces({ command }) && returnGameLoopingConditions.notLastScenes() || gameState.messageStatus === 1 ){

            if( gameState.messageStatus === 0 ){

                await switchLoopingGameScenes({ id,  command, gameState });

            } else if ( gameState.messageStatus === 1 ){
                gameServices.sendCommandToHideSystemMessages({ id });

                if(gameState.savedSceneToGo){

                    await abortMessageDisplayAndGoToTheNextGameScene({
                        id,
                        storeId,
                        goToSpecificGameSceneCommand: gameState.savedSceneToGo
                    })

                }

            }
        }

    }

    await delayedComeBackToScreensaver({ storeId, id, type: "active", idleTime: installationIds["Game"].idleTime });


};

export {
    gameSubController
}