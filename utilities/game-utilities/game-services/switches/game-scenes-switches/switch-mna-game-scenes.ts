import { returnGameMnaConditions } from "../../../game-conditions/return-game-mna-conditions";
import { IGameSubControllerProps } from "../../../../../types/game-types";
import { transformToHexArray } from "../../../../hex-transform-utilities";
import { setStoreValue } from "../../../../store-utility";
import { gameServices } from "../../game-services";
import { actionCommands } from "../../../../../commands/action-commands";
import { EStoreKeys } from "../../../../../types/store-types";
import {httpServices} from "../../../../../servers/http/services/http-services";
import {delayedGoToSpecificGameScene} from "../../../../time-utilities";
import {installationIds, systemVariables} from "../../../../../_environment/environment";

const { specificGameScene } = actionCommands;

const switchMnaGameScenes = async ({ id, command, gameState }: IGameSubControllerProps ) => {
    
    const { host, delayShort } = installationIds.Game;
    const { WINGS_PORT: port } = systemVariables;
    const storeId = EStoreKeys.installationGame;
    let goToSpecificGameSceneCommand: number[] | undefined = undefined;


    if( returnGameMnaConditions.stage1Right({ id, gameState, command }) ){

        setStoreValue({
            storeId, scene: 2, cursorPosition: 1, maxCursorPositions: 4, messageStatus: 1
        });
        goToSpecificGameSceneCommand = transformToHexArray(specificGameScene.commandAction("goToMnaModeScene2"));
    }

    if( returnGameMnaConditions.stage2Right({ id, gameState, command }) ){

        setStoreValue({
            storeId, scene: 3, cursorPosition: 1, maxCursorPositions: 2, messageStatus: 1
        });
        goToSpecificGameSceneCommand = transformToHexArray(specificGameScene.commandAction("goToMnaModeScene3"));

    }

    if( returnGameMnaConditions.stage3Default({ id, gameState, command }) ){

        if( returnGameMnaConditions.stage3Right({ id, gameState, command })){

            setStoreValue({
                storeId, scene: 4, cursorPosition: 1, maxCursorPositions: 5, messageStatus: 1
            });
            goToSpecificGameSceneCommand = transformToHexArray(specificGameScene.commandAction("goToMnaModeScene4"));

        }

        //come back to position 2
        if( returnGameMnaConditions.stage3Wrong({ id, gameState, command }) ){

            setStoreValue({
                storeId, scene: 2, cursorPosition: 1, maxCursorPositions: 4, messageStatus: 1
            });
            goToSpecificGameSceneCommand = transformToHexArray(specificGameScene.commandAction("goToMnaModeScene2"));

        }

    }

    if( returnGameMnaConditions.stage4Default({ id, gameState, command }) ){

        if( returnGameMnaConditions.stage4Right1({ id, gameState, command }) ){

            setStoreValue({
                storeId, scene: 5, cursorPosition: 1, maxCursorPositions: 1, messageStatus: 1
            });
            goToSpecificGameSceneCommand = transformToHexArray(specificGameScene.commandAction("goToMnaModeScene5Final1"));

        }

        if( returnGameMnaConditions.stage4Right2({ id, gameState, command }) ){

            setStoreValue({
                storeId, scene: 6, cursorPosition: 1, maxCursorPositions: 1, messageStatus: 1
            });
            goToSpecificGameSceneCommand = transformToHexArray(specificGameScene.commandAction("goToMnaModeScene6Final2"));

        }

        if( returnGameMnaConditions.stage4Right3({ id, gameState, command }) ){

            setStoreValue({
                storeId, scene: 6, cursorPosition: 1, maxCursorPositions: 1, messageStatus: 1
            });
            goToSpecificGameSceneCommand = transformToHexArray(specificGameScene.commandAction("goToMnaModeScene6Final2"));

        }

    }

    if( goToSpecificGameSceneCommand ){
        gameServices.sendCommandToShowSystemMessage({ id, command });

        await delayedGoToSpecificGameScene({ id, goToSpecificGameSceneCommand });

    } else {
        gameServices.sendCommandToShowSystemMessage({ id,  command });
    }

}

export {
    switchMnaGameScenes
}