import { returnGameSodConditions } from "../../../../commands-and-conditions/game-conditions/return-game-sod-conditions";
import { IGameSubControllerProps } from "../../../../types/game-types";
import { transformToHexArray } from "../../../hex-transform-utilities";
import { setStoreValue } from "../../../store-utility";
import { wingsActionCommands } from "../../../../commands-and-conditions/wings-action-commands";
import { gameServices } from "../../game-services";
import { EStoreKeys } from "../../../../types/store-types";
import {delayedGoToSpecificGameScene} from "../../../time-utilities";

const { SpecificGameScene } = wingsActionCommands;

const switchSodGameScenes = async ({id, command, gameState}: IGameSubControllerProps ) => {

    const storeId = EStoreKeys.installationGame;
    let goToSpecificGameSceneCommand: number[] | undefined = undefined;


    if( returnGameSodConditions.condition1Right({ id, command, gameState }) ){

        setStoreValue({
            storeId, scene: 2, cursorPosition: 1, maxCursorPositions: 4, messageStatus: 1
        });
        goToSpecificGameSceneCommand = transformToHexArray(SpecificGameScene( "goToSodModeScene2") );

    } else if( returnGameSodConditions.condition2Right({ id, command, gameState }) ){

        setStoreValue({
            storeId, scene: 3, cursorPosition: 1, maxCursorPositions: 4, messageStatus: 1
        });
        goToSpecificGameSceneCommand = transformToHexArray(SpecificGameScene( "goToSodModeScene3") );

    } else if( returnGameSodConditions.condition3Right({ id, command, gameState }) ){

        setStoreValue({
            storeId, scene: 4, cursorPosition: 1, maxCursorPositions: 4, messageStatus: 1
        });
        goToSpecificGameSceneCommand = transformToHexArray(SpecificGameScene( "goToSodModeScene4") );

    } else if( returnGameSodConditions.condition4Right({ id, command, gameState }) ){

        setStoreValue({
            storeId, scene: 5, cursorPosition: 1, maxCursorPositions: 1, messageStatus: 1
        });
        goToSpecificGameSceneCommand = transformToHexArray(SpecificGameScene( "goToSodModeScene5Final") );

    }

    if( goToSpecificGameSceneCommand ){
        gameServices.sendCommandToShowSystemMessage({ id, command });

        await delayedGoToSpecificGameScene({ id, goToSpecificGameSceneCommand });

    } else {
        gameServices.sendCommandToShowSystemMessage({ id,  command });
    }

}

export {
    switchSodGameScenes
}