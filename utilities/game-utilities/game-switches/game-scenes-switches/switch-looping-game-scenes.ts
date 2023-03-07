import { returnGameLoopingConditions } from "../../../../commands-and-conditions/game-conditions/return-game-looping-conditions";
import { IGameSubControllerProps } from "../../../../types/game-types";
import { transformToHexArray } from "../../../hex-transform-utilities";
import { setStoreValue } from "../../../store-utility";
import { wingsActionCommands } from "../../../../commands-and-conditions/wings-action-commands";
import { gameServices } from "../../game-services";
import { EStoreKeys } from "../../../../types/store-types";
import {delayedGoToSpecificGameScene} from "../../../time-utilities";

const { SpecificGameScene } = wingsActionCommands;

const switchLoopingGameScenes = async ({id, gameState, command}: IGameSubControllerProps) => {


    const storeId = EStoreKeys.installationGame;
    let goToSpecificGameSceneCommand: number[] | undefined = undefined;

    if( returnGameLoopingConditions.condition1Right({ id, command, gameState}) ){

        setStoreValue({
            storeId, scene: 2, cursorPosition: 1, maxCursorPositions: 3, messageStatus: 1
        });
        goToSpecificGameSceneCommand = transformToHexArray(SpecificGameScene( "goToLoopingModeScene2") );

    } else if(
        returnGameLoopingConditions.condition2Default({id, command, gameState})
    ){

        if(
            returnGameLoopingConditions.condition2Right({id, command, gameState})
        ){

            setStoreValue({
                storeId, scene: 3, cursorPosition: 1, maxCursorPositions: 3, messageStatus: 1
            });
            goToSpecificGameSceneCommand = transformToHexArray(SpecificGameScene( "goToLoopingModeScene3") );

        } else if ( //come back to position 1
            returnGameLoopingConditions.condition2Wrong({id, command, gameState})
        ){

            setStoreValue({
                storeId, scene: 1, cursorPosition: 1, maxCursorPositions: 4, messageStatus: 1
            });
            goToSpecificGameSceneCommand = transformToHexArray(SpecificGameScene( "goToLoopingModeScene2") );

        }

    } else if(
        returnGameLoopingConditions.condition3Right({id, command, gameState})
    ){

        setStoreValue({
            storeId, scene: 4 , cursorPosition: 1, maxCursorPositions: 1, messageStatus: 1
        });
        goToSpecificGameSceneCommand = transformToHexArray(SpecificGameScene( "goToLoopingModeScene4Final") );

    }

    if( goToSpecificGameSceneCommand ){
        gameServices.sendCommandToShowSystemMessage({ id,  command });

        await delayedGoToSpecificGameScene({ id, goToSpecificGameSceneCommand });

    } else {
        gameServices.sendCommandToShowSystemMessage({ id,  command });
    }

}

export {
    switchLoopingGameScenes
}