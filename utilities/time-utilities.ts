import {
    TClearTimeOut, ThrottlerParams,
    TMinutesToMilliseconds,
    TReturnAsyncMemoTimeout,
    TSecondsToMillisecondsSeconds,
    TStartIdleTimeOut
} from "../types/time-types";
import { EGameModes, EProjectZonesModes, EStoreKeys } from "../types/store-types";
import { TDelayedComeBackToScreensaver } from "../types/command-types";
import { returnCompositeCommandUtility } from "./composite-command-utility";
import { sendDataToWingsServerOverUdp } from "./udp/dgram-udp-utilities";
import { transformToHexArray } from "./hex-transform-utilities";
import { gameFadesCommands } from "../commands-and-conditions/game-commands/game-fades-commands";
import { EInstallationIds } from "../types/_common-types";
import { installationIds } from "../_environment/environment";
import { setStoreValue } from "./store-utility";
import { gameServices } from "./game-utilities/game-services";
import { store } from "../store/store";
import {wingsActionCommands} from "../commands-and-conditions/wings-action-commands";

const startTimeOutCounter: TStartIdleTimeOut = (action, timeout) => {

    return setTimeout(() => {
        action()
    }, timeout);

};
const clearTimeoutFunction: TClearTimeOut = (timeOutId) => (clearTimeout(timeOutId));

const returnSendDataFunctionBeforeDelay: TReturnAsyncMemoTimeout = ({ id }) => async (command, timeout) => {

    sendDataToWingsServerOverUdp({ id, command });
    await new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve()
        }, timeout);
    });

};

const returnSendDataFunctionAfterDelay: TReturnAsyncMemoTimeout = ({ id }) => async (command, timeout) => {

    await new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve()
        }, timeout);
    });
    sendDataToWingsServerOverUdp({ id, command });

};

const secondsToMilliseconds: TSecondsToMillisecondsSeconds = (time) => {
    return +time * 1000;
}

const minutesToMilliseconds: TMinutesToMilliseconds = (time) => {

    const timeArray = time.split(":");
    const minutes = +timeArray[0];
    const seconds = +timeArray[1];
    return (minutes * 60 + seconds) * 1000;

};

const delayedComeBackToScreensaver: TDelayedComeBackToScreensaver = ({
    storeId,
    id,
    type,
    idleTime
}) => {

    clearTimeoutFunction( store[ storeId ].idleTimeout );

    if( type === "active" ){

        store[ storeId ].idleTimeout = startTimeOutCounter(
            async () => {
                setStoreValue({
                    storeId,
                    mode: EProjectZonesModes.screensaver || EGameModes.screensaver,
                    index: 1
                });

                    if (id === "Game"){

                        const hideAllHints = transformToHexArray( gameFadesCommands.hintFadeOutScreensaverAndDemoMode )

                        await sendDataToWingsServerOverUdp({id, command: hideAllHints});
                        setStoreValue({
                            storeId,
                            mode: EProjectZonesModes.screensaver || EGameModes.screensaver,
                            index: 1,
                            cursorPosition: 1,
                            messageStatus: 0,
                            hintStatus: 0
                        });
                    }
                const executeCompositeCommandUtility = returnCompositeCommandUtility({ storeId, id });
                await executeCompositeCommandUtility({ xIndex: "01", yIndex: "01", type: "passive" });
            }, minutesToMilliseconds(idleTime)
        );

    }

}


const delayedGoToSpecificGameScene = ({id, goToSpecificGameSceneCommand}: {id: EInstallationIds, goToSpecificGameSceneCommand: number[]}) => {

    const storeId = EStoreKeys.installationGame;
    const { messageDisplayTime } = installationIds["Game"];

    clearTimeoutFunction(store[ storeId ].sceneTransitionTimeout);

    setStoreValue({
        storeId,
        savedSceneToGo: goToSpecificGameSceneCommand,
        sceneTransitionTimeout: startTimeOutCounter(async () => {

            await gameServices.goToSpecificGameScene({id, goToSpecificGameSceneCommand});

        }, messageDisplayTime)

    });

    // console.log(store[storeId])

};

const delayedSwitchGameHint = ({ id  }: { id: EInstallationIds }) => {

    const storeId = EStoreKeys.installationGame;
    const timeStepBetweenHints  = installationIds["Game"].timeStepBetweenHints ;
    const gameHintsArray = [
        gameFadesCommands.hint1FadeIn,
        gameFadesCommands.hint2FadeIn,
        gameFadesCommands.hint3FadeIn,
        gameFadesCommands.hint4FadeIn,
    ];


    clearTimeoutFunction( store[ storeId ].hideHintTimeout );

    const showOneHint = ( arrayOfHints: string[] ) => {

        const command = transformToHexArray( arrayOfHints[0] );

        return setTimeout(() => {
            sendDataToWingsServerOverUdp({ id, command });
            arrayOfHints.shift();
            if(arrayOfHints.length > 0) {
                store[ storeId ].hideHintTimeout = showOneHint( arrayOfHints )
            }
        }, timeStepBetweenHints );
    }

    store[ storeId ].hideHintTimeout = showOneHint( gameHintsArray )


}

const abortMessageDisplayAndGoToTheNextGameScene = async ({ storeId, id, goToSpecificGameSceneCommand }: { storeId: EStoreKeys, id: EInstallationIds, goToSpecificGameSceneCommand: number[]} ) => {

    clearTimeoutFunction( store[ storeId ].sceneTransitionTimeout );
    await gameServices.goToSpecificGameScene({id, goToSpecificGameSceneCommand });

}

const throttlerFunction = async ({ timeout=500, storeId, functionToExecute, id, command }: ThrottlerParams) => {

    if(!store[ storeId ].isThrottled) {

        setStoreValue({
            storeId,
            isThrottled: true
        });

        if( id === undefined && command === undefined ){
            await functionToExecute();
        } else {
            await functionToExecute({
                id,
                command
            })
        }

        setTimeout(()=>{

            setStoreValue({
                storeId,
                isThrottled: false
            });

        },timeout)

    }

}

export {
    abortMessageDisplayAndGoToTheNextGameScene,
    delayedGoToSpecificGameScene,
    delayedSwitchGameHint,
    delayedComeBackToScreensaver,
    returnSendDataFunctionBeforeDelay,
    minutesToMilliseconds,
    startTimeOutCounter,
    clearTimeoutFunction,
    throttlerFunction
};


