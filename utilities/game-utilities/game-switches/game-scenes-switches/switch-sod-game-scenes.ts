import { clearTimeoutFunction, delayedGoToSpecificGameScene } from "../../../time-utilities";
import { returnGameSodConditions } from "../../../../commands-and-conditions/game-conditions/return-game-sod-conditions";
import { GameSubControllerProps } from "../../../../types/game-types";
import { transformToHexArray } from "../../../hex-transform-utilities";
import { setStoreValue } from "../../../store-utility";
import { wingsActionCommands } from "../../../../commands-and-conditions/wings-action-commands";
import { gameServices } from "../../game-services";
import { StoreKeys } from "../../../../types/store-types";
import { store } from "../../../../store/store";

const { SpecificGameScene } = wingsActionCommands;

const switchSodGameScenes = async ({id, command, gameState}: GameSubControllerProps ) => {

    const storeId = StoreKeys.installationGame;
    let goToSpecificGameSceneCommand: number[] | undefined = undefined,
        scene,
        cursorPosition,
        maxCursorPositions;


    if( returnGameSodConditions.condition1Right({ id, command, gameState }) ){

        goToSpecificGameSceneCommand = transformToHexArray(SpecificGameScene( "goToSodModeScene2") );
        scene = 2;
        cursorPosition = 1;
        maxCursorPositions = 4;

    } else if( returnGameSodConditions.condition2Right({ id, command, gameState }) ){

        goToSpecificGameSceneCommand = transformToHexArray(SpecificGameScene( "goToSodModeScene3") );
        scene = 3;
        cursorPosition = 1;
        maxCursorPositions = 4;

    } else if( returnGameSodConditions.condition3Right({ id, command, gameState }) ){

        goToSpecificGameSceneCommand = transformToHexArray(SpecificGameScene( "goToSodModeScene4") );
        scene = 4;
        cursorPosition = 1;
        maxCursorPositions = 4;

    } else if( returnGameSodConditions.condition4Right({ id, command, gameState }) ){

        goToSpecificGameSceneCommand = transformToHexArray(SpecificGameScene( "goToSodModeScene5Final") );
        scene = 5;
        cursorPosition = 1;
        maxCursorPositions = 1;

    }

    if( goToSpecificGameSceneCommand ){

        clearTimeoutFunction( store[ storeId ].hideHintTimeout );
        gameServices.sendCommandToShowSystemMessage({ id, command });
        setStoreValue({
            storeId,
            scene,
            cursorPosition,
            maxCursorPositions,
            messageStatus: 1
        })

        await delayedGoToSpecificGameScene({ id, goToSpecificGameSceneCommand });

    } else if( returnGameSodConditions.sodButtonsInterfaces({ command })) {

        gameServices.sendCommandToShowSystemMessage({ id,  command });
        setStoreValue({
            storeId,
            messageStatus: 1
        });

    }

}

export {
    switchSodGameScenes
}