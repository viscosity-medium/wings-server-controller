import { returnGameSodConditions } from "../../../game-conditions/return-game-sod-conditions";
import { IGameSubControllerProps } from "../../../../../types/game-types";
import { transformToHexArray } from "../../../../hex-transform-utilities";
import { setStoreValue } from "../../../../store-utility";
import { actionCommands } from "../../../../../commands/action-commands";
import { gameServices } from "../../game-services";
import { EStoreKeys } from "../../../../../types/store-types";
import {delayedGoToSpecificGameScene} from "../../../../time-utilities";
import {installationIds, systemVariables} from "../../../../../_environment/environment";

const { specificGameScene } = actionCommands;

const switchSodGameScenes = async ({command, gameState}: IGameSubControllerProps ) => {

    const { host, delayShort } = installationIds.Game;
    const { WINGS_PORT: port } = systemVariables;
    const storeId = EStoreKeys.installationGame;
    let goToSpecificGameSceneCommand: number[] | undefined = undefined;


    if( returnGameSodConditions.condition1Right({command, gameState}) ){

        setStoreValue({
            storeId, scene: 2, cursorPosition: 1, maxCursorPositions: 4, messageStatus: 1
        });
        goToSpecificGameSceneCommand = transformToHexArray(specificGameScene.commandAction( "goToSodModeScene2") );

    }

    if( returnGameSodConditions.condition2Right({command, gameState}) ){

        setStoreValue({
            storeId, scene: 3, cursorPosition: 1, maxCursorPositions: 4, messageStatus: 1
        });
        goToSpecificGameSceneCommand = transformToHexArray(specificGameScene.commandAction( "goToSodModeScene3") );
    }

    if( returnGameSodConditions.condition3Right({command, gameState}) ){

        setStoreValue({
            storeId, scene: 4, cursorPosition: 1, maxCursorPositions: 4, messageStatus: 1
        });
        goToSpecificGameSceneCommand = transformToHexArray(specificGameScene.commandAction( "goToSodModeScene4") );

    }

    if( returnGameSodConditions.condition4Right({command, gameState}) ){

        setStoreValue({
            storeId, scene: 5, cursorPosition: 1, maxCursorPositions: 1, messageStatus: 1
        });
        goToSpecificGameSceneCommand = transformToHexArray(specificGameScene.commandAction( "goToSodModeScene5Final") );

    }

    if( goToSpecificGameSceneCommand ){
        gameServices.sendCommandToShowSystemMessage({ command });

        await delayedGoToSpecificGameScene({ goToSpecificGameSceneCommand });

    } else {
        gameServices.sendCommandToShowSystemMessage({ command });
    }

}

export {
    switchSodGameScenes
}