import {clearTimeoutFunction, delayedSwitchGameHint, returnSendDataFunctionBeforeDelay} from "../time-utilities";
import { EGameControlCommand, ITransitionToTheSpecificModeProps } from "../../types/game-types";
import { installationIds, systemVariables } from "../../_environment/environment";
import { sendDataToWingsServerOverUdp } from "../udp/dgram-udp-utilities";
import { gameCursorPositionsCommands } from "../../commands-and-conditions/game-commands/game-cursor-positions-commands";
import { EGameModes, EStoreKeys} from "../../types/store-types";
import { transformToHexArray } from "../hex-transform-utilities";
import { gameFadesCommands } from "../../commands-and-conditions/game-commands/game-fades-commands";
import { gameSystemMessage } from "../../commands-and-conditions/game-conditions/game-system-message";
import { setStoreValue } from "../store-utility";
import { wingsActionCommands } from "../../commands-and-conditions/wings-action-commands";
import { store } from "../../store/store";
import {EInstallationIds} from "../../types/_common-types";

const {
    delayShort,
} = installationIds.Game;

const { Play, FadeTimeline } = wingsActionCommands;
const storeId = EStoreKeys.installationGame;
const gameState = store[ EStoreKeys.installationGame ];
const { INITIAL_MAX_CURSOR_POSITIONS } = systemVariables;

class GameServices {
    async executeTransitionToSpecificMode({ id, commandHex6, mode, scene, cursorPosition, messageStatus }: ITransitionToTheSpecificModeProps ){

        const commandHex1 = transformToHexArray( FadeTimeline("mainTimelineFadeOut") ); // hide tracks with the current mode content
        const commandHex2 = transformToHexArray( FadeTimeline("hintFadeOutScreensaverAndDemoMode") ); // hide hint with the current mode content
        const commandHex3 = transformToHexArray( FadeTimeline("allCursorPositionsFadeOut") ); // hide all cursor positions
        const commandHex4 = transformToHexArray( FadeTimeline("allHintsFadeOut") ); // hide all hints
        const commandHex5 = transformToHexArray( FadeTimeline("allMessagesFadeOut") ); // hide all system messages
        const commandHex7 = transformToHexArray( Play ); // start playing the timeline
        const commandHex8 = transformToHexArray( FadeTimeline("mainTimelineFadeIn") ); // show tracks with content
        const commandHex9 = transformToHexArray( FadeTimeline("cursorPosition1FadeIn") ); // show the cursor at position 1

        const executeAsyncTimeOut = returnSendDataFunctionBeforeDelay( { id } );

        clearTimeoutFunction(store[ storeId ].sceneTransitionTimeout);

        await executeAsyncTimeOut( commandHex1, delayShort! );

        await executeAsyncTimeOut( commandHex2, delayShort! );
        await executeAsyncTimeOut( commandHex3, delayShort! );
        await executeAsyncTimeOut( commandHex4, delayShort! );
        await executeAsyncTimeOut( commandHex5, delayShort! );

        setStoreValue({
            storeId: EStoreKeys.installationGame,
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

    sendCommandToShowSystemMessage ({ id, command }: { id: EInstallationIds, command: EGameControlCommand }) {

        const { mode, messageStatus } = store[ EStoreKeys.installationGame ];
        let systemMessage: number[] | undefined;
        //console.log(messageStatus);

        // if system messages are inactive
        if ( messageStatus === 0 ){

            if( mode === EGameModes.mna ){
                systemMessage = gameSystemMessage.returnMessageForMnaMode({ command });
            }

            if( mode === EGameModes.sod ){
                systemMessage = gameSystemMessage.returnMessageForSodMode({ command });
            }

            if( mode === EGameModes.looping ){
                systemMessage = gameSystemMessage.returnMessageForLoopingMode({ command });
            }

        }

        // if systemMessage is defined,
        // then the store changes and the command sends

        if( systemMessage ) {
            //console.log(systemMessage)
            sendDataToWingsServerOverUdp({ command: systemMessage, id });
            setStoreValue({
                storeId: EStoreKeys.installationGame,
                messageStatus: 1
            });

        }

    }

    async goToSpecificGameScene({ id, goToSpecificGameSceneCommand }: {id: EInstallationIds, goToSpecificGameSceneCommand: number[] }){

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
            storeId: EStoreKeys.installationGame,
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
    }

    sendCommandToHideSystemMessages({ id }: {id: EInstallationIds}){

        const command = transformToHexArray( gameFadesCommands.allMessagesFadeOut );

        setStoreValue({
            storeId: EStoreKeys.installationGame,
            messageStatus: 0
        });
        sendDataToWingsServerOverUdp({ command, id });

    }

    async changeCursorPositionToTheLeft({ id }: { id: EInstallationIds }){

        if ( gameState.cursorPosition > 1 ){
            setStoreValue({
                storeId: EStoreKeys.installationGame,
                cursorPosition: gameState.cursorPosition -= 1
            });
        } else {
            setStoreValue({
                storeId: EStoreKeys.installationGame,
                cursorPosition: gameState.maxCursorPositions
            });
        }

        // defining cursor position to show (from array)
        const command = transformToHexArray( gameCursorPositionsCommands[ gameState.cursorPosition - 1 ] );
        const sendDataFunctionBeforeDelay =  returnSendDataFunctionBeforeDelay({id})
        const hexCommand = transformToHexArray(gameFadesCommands.allCursorPositionsFadeOut);
        await sendDataFunctionBeforeDelay( hexCommand, installationIds[id].delayShort)

        sendDataToWingsServerOverUdp({command, id });

    }

    async changeCursorPositionToTheRight({ id }: { id: EInstallationIds }){
        if ( gameState.cursorPosition < gameState.maxCursorPositions ){
            setStoreValue({
                storeId: EStoreKeys.installationGame,
                cursorPosition: gameState.cursorPosition += 1
            });
        } else  {
            setStoreValue({
                storeId: EStoreKeys.installationGame,
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