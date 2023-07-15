import {clearTimeoutFunction, delayedSwitchGameHint, returnSendDataFunctionBeforeDelay} from "../time-utilities";
import { GameControlCommand, TransitionToTheSpecificModeProps } from "../../types/game-types";
import { installationIds, systemVariables } from "../../_environment/environment";
import { sendDataToWingsServerOverUdp } from "../udp/dgram-udp-utilities";
import { gameCursorPositionsCommands } from "../../commands-and-conditions/game-commands/game-cursor-positions-commands";
import { GameModes, StoreKeys} from "../../types/store-types";
import { transformToHexArray } from "../hex-transform-utilities";
import { gameFadesCommands } from "../../commands-and-conditions/game-commands/game-fades-commands";
import { gameSystemMessage } from "../../commands-and-conditions/game-conditions/game-system-message";
import { setStoreValue } from "../store-utility";
import { wingsActionCommands } from "../../commands-and-conditions/wings-action-commands";
import { store } from "../../store/store";
import {AvailableInstallationIds} from "../../types/_common-types";

const {
    delayShort,
} = installationIds.Game;

const { Play, FadeTimeline } = wingsActionCommands;
const storeId = StoreKeys.installationGame;
const gameState = store[ StoreKeys.installationGame ];
const { INITIAL_MAX_CURSOR_POSITIONS } = systemVariables;

class GameServices {
    async executeTransitionToSpecificMode({ id, commandHex6, mode, scene, cursorPosition, messageStatus }: TransitionToTheSpecificModeProps ){

        const commandHex1 = transformToHexArray( FadeTimeline("mainTimelineFadeOut") ); // hide tracks with the current mode content
        const commandHex2 = transformToHexArray( FadeTimeline("hintFadeOutScreensaverAndDemoMode") ); // hide hint with the current mode content
        const commandHex3 = transformToHexArray( FadeTimeline("allCursorPositionsFadeOut") ); // hide all cursor positions
        const commandHex4 = transformToHexArray( FadeTimeline("allHintsFadeOut") ); // hide all hints
        const commandHex5 = transformToHexArray( FadeTimeline("allMessagesFadeOut") ); // hide all system messages
        const commandHex7 = transformToHexArray( Play ); // start playing the timeline
        const commandHex8 = transformToHexArray( FadeTimeline("mainTimelineFadeIn") ); // show tracks with content
        const commandHex9 = transformToHexArray( FadeTimeline("cursorPosition1FadeIn") ); // show the cursor at position 1

        const executeAsyncTimeOut = returnSendDataFunctionBeforeDelay( { id } );

        clearTimeoutFunction( store[ storeId ].hideHintTimeout );
        clearTimeoutFunction( store[ storeId ].sceneTransitionTimeout );

        await executeAsyncTimeOut( commandHex1, delayShort! );

        await executeAsyncTimeOut( commandHex2, delayShort! );
        await executeAsyncTimeOut( commandHex3, delayShort! );
        await executeAsyncTimeOut( commandHex4, delayShort! );
        await executeAsyncTimeOut( commandHex5, delayShort! );

        setStoreValue({
            storeId: StoreKeys.installationGame,
            hintStatus: 0,
            mode,
            scene,
            messageStatus,
            cursorPosition,
            maxCursorPositions: INITIAL_MAX_CURSOR_POSITIONS
        });

        await executeAsyncTimeOut( commandHex6, delayShort! );
        await executeAsyncTimeOut( commandHex7, delayShort! );
        await executeAsyncTimeOut( commandHex8, delayShort! );

        // commandHex9 should be executed only for modes "mna", "sod", "looping"
        scene && cursorPosition && messageStatus !== undefined ?
        await executeAsyncTimeOut( commandHex9, delayShort! ) :
        null;

        delayedSwitchGameHint({ id });
    }

    sendCommandToShowSystemMessage ({ id, command }: { id: AvailableInstallationIds, command: GameControlCommand }) {

        const { mode, messageStatus } = store[ StoreKeys.installationGame ];
        let systemMessage: number[] | undefined;

        // if system messages are inactive
        if ( messageStatus === 0 ){

            if (
                mode === GameModes.mna
            ){
                systemMessage = gameSystemMessage.returnMessageForMnaMode({ command });
            } else if (
                mode === GameModes.sod
            ){
                systemMessage = gameSystemMessage.returnMessageForSodMode({ command });
            } else if (
                mode === GameModes.looping
            ){
                systemMessage = gameSystemMessage.returnMessageForLoopingMode({ command });
            }

        }

        // if systemMessage is defined,
        // then the store changes and the command sends

        if( systemMessage ) {

            sendDataToWingsServerOverUdp({ command: systemMessage, id });
            setStoreValue({
                storeId: StoreKeys.installationGame,
                messageStatus: 1
            });

        }

    }

    async goToSpecificGameScene({ id, goToSpecificGameSceneCommand }: {id: AvailableInstallationIds, goToSpecificGameSceneCommand: number[] }){

        const {
            allCursorPositionsFadeOut,
            allHintsFadeOut,
            allMessagesFadeOut,
            cursorPosition1FadeIn,
        } = gameFadesCommands;

        const fadeOutAllMessages = transformToHexArray( allMessagesFadeOut );
        const fadeOutAllHints = transformToHexArray( allHintsFadeOut );
        const fadeOutAllCursors = transformToHexArray( allCursorPositionsFadeOut );
        const fadeInCursorPosition1 = transformToHexArray( cursorPosition1FadeIn );

        const sendDataFunctionBeforeDelay = returnSendDataFunctionBeforeDelay({ id });

        setStoreValue({
            storeId: StoreKeys.installationGame,
            messageStatus: 0,
            hintStatus: 0,
            cursorPosition: 1,
            savedSceneToGo: "undefined"
        });

        await sendDataFunctionBeforeDelay( fadeOutAllMessages, delayShort );
        await sendDataFunctionBeforeDelay( fadeOutAllHints, delayShort );
        await sendDataFunctionBeforeDelay( fadeOutAllCursors, delayShort );
        await sendDataFunctionBeforeDelay( goToSpecificGameSceneCommand, delayShort );
        await sendDataFunctionBeforeDelay( fadeInCursorPosition1, delayShort );
        delayedSwitchGameHint({ id });
    }

    sendCommandToHideSystemMessages({ id }: {id: AvailableInstallationIds}){

        const command = transformToHexArray( gameFadesCommands.allMessagesFadeOut );

        setStoreValue({
            storeId: StoreKeys.installationGame,
            messageStatus: 0
        });
        sendDataToWingsServerOverUdp({ command, id });

    }

    sendCommandToChangeHintStatus({ id, systemMessage, hintStatus }: {id: AvailableInstallationIds, systemMessage: number[], hintStatus: 0 | 1 | undefined}){

        sendDataToWingsServerOverUdp({ id, command: systemMessage });
        setStoreValue({
            storeId,
            hintStatus
        });

    }

    async changeCursorPositionToTheLeft({ id }: { id: AvailableInstallationIds }){

        if ( gameState.cursorPosition > 1 ){
            setStoreValue({
                storeId: StoreKeys.installationGame,
                cursorPosition: gameState.cursorPosition -= 1
            });
        } else {
            setStoreValue({
                storeId: StoreKeys.installationGame,
                cursorPosition: gameState.maxCursorPositions
            });
        }

        // defining cursor position to show (from array)
        const command = transformToHexArray( gameCursorPositionsCommands[ gameState.cursorPosition - 1 ] );
        const hexCommand = transformToHexArray(gameFadesCommands.allCursorPositionsFadeOut);
        const sendDataFunctionBeforeDelay =  returnSendDataFunctionBeforeDelay({id});

        await sendDataFunctionBeforeDelay( hexCommand, installationIds[id].delayShort);
        await sendDataToWingsServerOverUdp({command, id });

    }

    async changeCursorPositionToTheRight({ id }: { id: AvailableInstallationIds }){
        if ( gameState.cursorPosition < gameState.maxCursorPositions ){
            setStoreValue({
                storeId: StoreKeys.installationGame,
                cursorPosition: gameState.cursorPosition += 1
            });
        } else  {
            setStoreValue({
                storeId: StoreKeys.installationGame,
                cursorPosition: 1
            });
        }

        // defining cursor position to show (from array)
        const command = transformToHexArray( gameCursorPositionsCommands[ gameState.cursorPosition -1 ] );
        const sendDataFunctionBeforeDelay =  returnSendDataFunctionBeforeDelay({id})
        const hexCommand = transformToHexArray(gameFadesCommands.allCursorPositionsFadeOut);
        await sendDataFunctionBeforeDelay( hexCommand, installationIds[id].delayShort)

        sendDataToWingsServerOverUdp({command, id });
    }

}

const gameServices = new GameServices();

export  {
    gameServices
}