import { clearTimeoutFunction, delayedGoToSpecificGameScene } from "../../../time-utilities";
import { returnGameMnaConditions } from "../../../../commands-and-conditions/game-conditions/return-game-mna-conditions";
import { IGameSubControllerProps } from "../../../../types/game-types";
import { transformToHexArray } from "../../../hex-transform-utilities";
import { setStoreValue } from "../../../store-utility";
import { gameServices } from "../../game-services";
import { wingsActionCommands } from "../../../../commands-and-conditions/wings-action-commands";
import { EStoreKeys } from "../../../../types/store-types";
import { store } from "../../../../store/store";

const { SpecificGameScene } = wingsActionCommands;

const switchMnaGameScenes = async ({ id, command, gameState }: IGameSubControllerProps ) => {

    const storeId = EStoreKeys.installationGame;
    let goToSpecificGameSceneCommand: number[] | undefined = undefined,
        scene,
        cursorPosition,
        maxCursorPositions;

    if(
        returnGameMnaConditions.stage1Right({ id, gameState, command })
    ){

        goToSpecificGameSceneCommand = transformToHexArray(SpecificGameScene("goToMnaModeScene2"));
        scene = 2;
        cursorPosition = 1;
        maxCursorPositions = 4;

        // setStoreValue({
        //     storeId, scene: 2, cursorPosition: 1, maxCursorPositions: 4,
        // });

    } else if(
        returnGameMnaConditions.stage2Right({ id, gameState, command })
    ){

        goToSpecificGameSceneCommand = transformToHexArray(SpecificGameScene("goToMnaModeScene3"));
        scene = 3;
        cursorPosition = 1;
        maxCursorPositions = 2;

        // setStoreValue({
        //     storeId, scene: 3, cursorPosition: 1, maxCursorPositions: 2,
        // });

    } else if(
        returnGameMnaConditions.stage3Default({ id, gameState, command })
    ){

        if(
            returnGameMnaConditions.stage3Right({ id, gameState, command })
        ){

            goToSpecificGameSceneCommand = transformToHexArray(SpecificGameScene("goToMnaModeScene4"));
            scene = 4;
            cursorPosition = 1;
            maxCursorPositions = 5;

            // setStoreValue({
            //     storeId, scene: 4, cursorPosition: 1, maxCursorPositions: 5,
            // });

        } else if( //come back to position 2
            returnGameMnaConditions.stage3Wrong({ id, gameState, command })
        ){

            goToSpecificGameSceneCommand = transformToHexArray(SpecificGameScene("goToMnaModeScene2"));
            scene = 2;
            cursorPosition = 1;
            maxCursorPositions = 4;

            // setStoreValue({
            //     storeId, scene: 2, cursorPosition: 1, maxCursorPositions: 4,
            // });

        }

    } else if(
        returnGameMnaConditions.stage4Default({ id, gameState, command })
    ){

        if(
            returnGameMnaConditions.stage4Right1({ id, gameState, command })
        ){

            goToSpecificGameSceneCommand = transformToHexArray(SpecificGameScene("goToMnaModeScene5Final1"));
            scene = 5;
            cursorPosition = 1;
            maxCursorPositions = 1;

            setStoreValue({
                storeId, scene: 5, cursorPosition: 1, maxCursorPositions: 1,
            });

        } else if(
            returnGameMnaConditions.stage4Right2({ id, gameState, command })
        ){

            goToSpecificGameSceneCommand = transformToHexArray(SpecificGameScene("goToMnaModeScene6Final2"));
            scene = 6;
            cursorPosition = 1;
            maxCursorPositions = 1;

            // setStoreValue({
            //     storeId, scene: 6, cursorPosition: 1, maxCursorPositions: 1,
            // });

        } else if(
            returnGameMnaConditions.stage4Right3({ id, gameState, command })
        ){

            goToSpecificGameSceneCommand = transformToHexArray(SpecificGameScene("goToMnaModeScene7Final3"));
            scene = 7;
            cursorPosition = 1;
            maxCursorPositions = 4;

            // setStoreValue({
            //     storeId, scene: 7, cursorPosition: 1, maxCursorPositions: 1,
            // });

        }

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

    } else if( returnGameMnaConditions.mnaButtonsInterfaces({ command }) ) {

        gameServices.sendCommandToShowSystemMessage({ id,  command });
        setStoreValue({
            storeId,
            messageStatus: 1
        })

    }

}

export {
    switchMnaGameScenes
}