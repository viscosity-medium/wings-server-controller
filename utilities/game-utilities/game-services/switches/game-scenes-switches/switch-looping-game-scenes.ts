import { returnGameLoopingConditions } from "../../../game-conditions/return-game-looping-conditions";
import { IGameSubControllerProps } from "../../../../../types/game-types";
import { transformToHexArray } from "../../../../hex-transform-utilities";
import { setStoreValue } from "../../../../store-utility";
import { actionCommands } from "../../../../../commands/action-commands";
import { gameServices } from "../../game-services";
import { EStoreKeys } from "../../../../../types/store-types";
import {delayedGoToSpecificGameScene} from "../../../../time-utilities";
import {installationIds, systemVariables} from "../../../../../_environment/environment";

const { specificGameScene } = actionCommands;

const switchLoopingGameScenes = async ({command, gameState}: IGameSubControllerProps) => {

    const { host, delayShort } = installationIds.Game;
    const { WINGS_PORT: port } = systemVariables;
    const storeId = EStoreKeys.installationGame;
    let goToSpecificGameSceneCommand: number[] | undefined = undefined;

    if( returnGameLoopingConditions.condition1Right({command, gameState}) ){

        setStoreValue({
            storeId, scene: 2, cursorPosition: 1, maxCursorPositions: 3, messageStatus: 1
        });
        goToSpecificGameSceneCommand = transformToHexArray(specificGameScene.commandAction( "goToLoopingModeScene2") );

    }

    if( returnGameLoopingConditions.condition2Default({command, gameState}) ){

        if( returnGameLoopingConditions.condition2Right({command, gameState}) ){

            setStoreValue({
                storeId, scene: 3, cursorPosition: 1, maxCursorPositions: 3, messageStatus: 1
            });
            goToSpecificGameSceneCommand = transformToHexArray(specificGameScene.commandAction( "goToLoopingModeScene3") );

        }

        //come back to position 1
        if( returnGameLoopingConditions.condition2Wrong({command, gameState}) ){

            setStoreValue({
                storeId, scene: 1, cursorPosition: 1, maxCursorPositions: 4, messageStatus: 1
            });
            goToSpecificGameSceneCommand = transformToHexArray(specificGameScene.commandAction( "goToLoopingModeScene2") );

        }

    }

    if( returnGameLoopingConditions.condition3Right({command, gameState}) ){

        setStoreValue({
            storeId, scene: 4 , cursorPosition: 1, maxCursorPositions: 1, messageStatus: 1
        });
        goToSpecificGameSceneCommand = transformToHexArray(specificGameScene.commandAction( "goToLoopingModeScene4Final") );

    }

    if( goToSpecificGameSceneCommand ){
        gameServices.sendCommandToShowSystemMessage({ command });

        await delayedGoToSpecificGameScene({ goToSpecificGameSceneCommand });

    } else {
        gameServices.sendCommandToShowSystemMessage({ command });
    }

}

export {
    switchLoopingGameScenes
}