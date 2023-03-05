import {clearTimeoutFunction, delayedSwitchGameHint, returnSendDataFunctionBeforeDelay} from "../../time-utilities";
import { EGameControlCommand, ITransitionToTheSpecificModeProps } from "../../../types/game-types";
import { installationIds, systemVariables } from "../../../_environment/environment";
import { sendDataToWingsServerOverUdp } from "../../udp/dgram-udp-utilities";
import { gameCursorPositionsCommands } from "../../../commands/game-commands/game-cursor-positions-commands";
import { EGameModes, EStoreKeys} from "../../../types/store-types";
import { transformToHexArray } from "../../hex-transform-utilities";
import { gameFadesCommands } from "../../../commands/game-commands/game-fades-commands";
import { gameSystemMessage } from "../game-conditions/game-system-message";
import { setStoreValue } from "../../store-utility";
import { actionCommands } from "../../../commands/action-commands";
import { store } from "../../../store/store";
import {EInstallationIds} from "../../../types/_common-types";

const {
    host,
    delayShort,
} = installationIds.Game;

const { play, fadeTimeline } = actionCommands;
const { WINGS_PORT: port } = systemVariables;
const storeId = EStoreKeys.installationGame;
const gameState = store[ EStoreKeys.installationGame ];

class GameServices {
    async executeTransitionToSpecificMode({ id, commandHex6, mode, scene, cursorPosition, messageStatus }: ITransitionToTheSpecificModeProps ){

        const commandHex1 = transformToHexArray( fadeTimeline.commandAction("mainTimelineFadeOut") ); // hide tracks with the current mode content
        const commandHex2 = transformToHexArray( fadeTimeline.commandAction("hintFadeOutScreensaverAndDemoMode") ); // hide hint with the current mode content
        const commandHex3 = transformToHexArray( fadeTimeline.commandAction("allCursorPositionsFadeOut") ); // hide all cursor positions
        const commandHex4 = transformToHexArray( fadeTimeline.commandAction("allHintsFadeOut") ); // hide all hints
        const commandHex5 = transformToHexArray( fadeTimeline.commandAction("allMessagesFadeOut") ); // hide all system messages
        const commandHex7 = transformToHexArray( play.commandAction ); // start playing the timeline
        const commandHex8 = transformToHexArray( fadeTimeline.commandAction("mainTimelineFadeIn") ); // show tracks with content
        const commandHex9 = transformToHexArray( fadeTimeline.commandAction("cursorPosition1FadeIn") ); // show the cursor at position 1

        const executeAsyncTimeOut = returnSendDataFunctionBeforeDelay( { id } );

        clearTimeoutFunction(store[ storeId ].sceneTransitionTimeout);

        await executeAsyncTimeOut( commandHex1, delayShort! );

        setStoreValue({
            storeId: EStoreKeys.installationGame,
            hintStatus: 0
        }); // deactivate hint

        await executeAsyncTimeOut( commandHex2, delayShort! );
        await executeAsyncTimeOut( commandHex3, delayShort! );
        await executeAsyncTimeOut( commandHex4, delayShort! );
        await executeAsyncTimeOut( commandHex5, delayShort! );

        setStoreValue({
            storeId: EStoreKeys.installationGame,
            mode,
            scene,
            cursorPosition,
            messageStatus
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

        const { host } = installationIds[ "Game" ];
        const { WINGS_PORT: port } = systemVariables;
        const { mode, messageStatus } = store[ EStoreKeys.installationGame ];
        let systemMessage: number[] | undefined;

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
        systemMessage && sendDataToWingsServerOverUdp({ command: systemMessage, id });
        systemMessage && setStoreValue({
            storeId: EStoreKeys.installationGame,
            messageStatus: 1
        });
    };

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

    changeCursorPositionToTheLeft({ id }: { id: EInstallationIds }){

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

        sendDataToWingsServerOverUdp({command, id });

    }

    changeCursorPositionToTheRight({ id }: { id: EInstallationIds }){
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

        sendDataToWingsServerOverUdp({ command, id });
    }

}

const gameServices = new GameServices();

export  {
    gameServices
}