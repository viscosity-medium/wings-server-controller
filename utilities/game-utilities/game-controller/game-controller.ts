import { abortMessageDisplayAndGoToTheNextGameScene } from "../../time-utilities";
import { returnGameLoopingConditions } from "../game-conditions/return-game-looping-conditions";
import { switchGameCursorPosition } from "../game-services/switches/switch-game-cursor-position";
import { returnGameMnaConditions } from "../game-conditions/return-game-mna-conditions";
import { returnGameSodConditions } from "../game-conditions/return-game-sod-conditions";
import { switchLoopingGameScenes } from "../game-services/switches/game-scenes-switches/switch-looping-game-scenes";
import { EGameModes, EStoreKeys} from "../../../types/store-types";
import { switchMnaGameScenes } from "../game-services/switches/game-scenes-switches/switch-mna-game-scenes";
import { switchSodGameScenes } from "../game-services/switches/game-scenes-switches/switch-sod-game-scenes";
import { TGameController } from "../../../types/game-types";
import { gameConditions } from "../game-conditions/game-conditions";
import { switchGameMode } from "../game-services/switches/switch-game-mode";
import { gameServices } from "../game-services/game-services";
import { store } from "../../../store/store"

const { gameEncoders, modeSelectionButtons } = gameConditions;
const gameState = store[ EStoreKeys.installationGame ];
const storeId = EStoreKeys.installationGame;
const A = true, B = true, C = true, D = true;

const gameController: TGameController = async ( { command } ) => {

    // universal cursor position switcher
    if( gameEncoders.includes( command ) && gameState.messageStatus === 0){
        switchGameCursorPosition({ command });
    }

    // screensaver mode
    if( gameState.mode === EGameModes.screensaver && modeSelectionButtons.includes( command )  ){
        await switchGameMode({ command, A, B, C, D }); // all modes are interactive
    }

    // demo mode
    if ( gameState.mode === EGameModes.demo && modeSelectionButtons.includes( command )  ){
        await switchGameMode({ command, B, C, D }); // without the demo mode interaction (A is missed)
    }

    // mna mode
    if ( gameState.mode === EGameModes.mna ){


        // check that the command came from switch mode buttons
        if( modeSelectionButtons.includes( command ) ){
            await switchGameMode({ command, A, B, C, D }); // all modes are interactive
        }

        // check that the command came from mna mode buttons/encoders
        if( returnGameMnaConditions.mnaValidInterfaces({ command }) ){

            if( gameState.messageStatus === 0 ){
                await switchMnaGameScenes({ command, gameState });
            }

            if( gameState.messageStatus === 1 ){

                gameServices.sendCommandToHideSystemMessages();

                if(gameState.savedSceneToGo){

                    await abortMessageDisplayAndGoToTheNextGameScene({
                        storeId,
                        goToSpecificGameSceneCommand: gameState.savedSceneToGo
                    })

                }

            }

        }

    }

    // sod mode
    if( gameState.mode === EGameModes.sod ){

        // check that the command came from switch mode buttons
        if( modeSelectionButtons.includes( command ) ){
            await switchGameMode({ command, A, B, C, D }); // all modes are interactive
        }

        // check that the command came from sod mode buttons/encoders
        if( returnGameSodConditions.sodValidInterfaces({ command }) ){

            if( gameState.messageStatus === 0 ){
                await switchSodGameScenes({ command, gameState });
            }

            if( gameState.messageStatus === 1 ){

                gameServices.sendCommandToHideSystemMessages();

                if(gameState.savedSceneToGo){

                    await abortMessageDisplayAndGoToTheNextGameScene({
                        storeId,
                        goToSpecificGameSceneCommand: gameState.savedSceneToGo
                    })

                }

            }

        }

    }

    // looping mode
    if( gameState.mode === EGameModes.looping ){

        // check that the command came from switch mode buttons
        if( modeSelectionButtons.includes(command) ){
            await switchGameMode({ command, A, B, C, D }); // all modes are interactive
        }

        // check that the command came from looping mode buttons/encoders
        if( returnGameLoopingConditions.loopingValidInterfaces({ command }) ){

            if( gameState.messageStatus === 0 ){
                await switchLoopingGameScenes({ command, gameState });
            }

            if( gameState.messageStatus === 1 ){
                gameServices.sendCommandToHideSystemMessages();

                if(gameState.savedSceneToGo){

                    await abortMessageDisplayAndGoToTheNextGameScene({
                        storeId,
                        goToSpecificGameSceneCommand: gameState.savedSceneToGo
                    })

                }

            }
        }

    }

};

export {
    gameController
}