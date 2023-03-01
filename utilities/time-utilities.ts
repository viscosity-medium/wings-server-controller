import {
    TClearTimeOut,
    TDelayedSwitchOffLabMicroscope,
    TMinutesToMilliseconds,
    TReturnAsyncMemoTimeout,
    TSecondsToMillisecondsSeconds,
    TStartIdleTimeOut
} from "../types/time-types";
import { EGameModes , EProjectZonesModes, EStoreKeys} from "../types/store-types";
import { TDelayedComeBackToScreensaver } from "../types/command-types";
import { returnCompositeCommandUtility } from "./composite-command-utility";
import { sendDataToWingsServerOverUdp } from "./udp/dgram-udp-utilities";
import { transformToHexArray } from "./hex-transform-utilities";
import { gameFadesCommands } from "../commands/game-commands/game-fades-commands";
import { installationIds } from "../_environment/environment";
import { setStoreValue } from "./store-utility";
import { gameServices } from "./game-utilities/game-services/game-services";
import { store } from "../store/store";

const startTimeOutCounter: TStartIdleTimeOut = (action, timeout) => {

    return setTimeout(() => {
        action()
    }, timeout);

};
const clearTimeoutFunction: TClearTimeOut = (timeOutId) => (clearTimeout(timeOutId));

const returnSendDataFunctionBeforeDelay: TReturnAsyncMemoTimeout = ({host, port}) => async (command, timeout) => {

    sendDataToWingsServerOverUdp({command, host, port,});
    await new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve()
        }, timeout);
    });

};

const returnSendDataFunctionAfterDelay: TReturnAsyncMemoTimeout = ({host, port}) => async (command, timeout) => {

    await new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve()
        }, timeout);
    });
    sendDataToWingsServerOverUdp({command, host, port,});

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
    host,
    port,
    storeId,
    type,
    delayLong,
    delayShort,
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

                const executeCompositeCommandUtility = returnCompositeCommandUtility({ storeId, host, port, delayLong, delayShort, idleTime });
                await executeCompositeCommandUtility({ xIndex: "01", yIndex: "01", type: "passive" });
            }, minutesToMilliseconds(idleTime)
        );

    }

}

const delayedSwitchOffLabMicroscope: TDelayedSwitchOffLabMicroscope = (
    executeAsyncTimeOut,
    storeId,
    commandHex2,
    delayLong,
    idleTime
) => {
    store[ storeId ].idleTimeout = startTimeOutCounter(
        async () => {
            await executeAsyncTimeOut( commandHex2, delayLong );
            setStoreValue({ storeId, microscope: "off" });
        }, minutesToMilliseconds(idleTime)
    )

}

const delayedGoToSpecificGameScene = ({goToSpecificGameSceneCommand}: {goToSpecificGameSceneCommand: number[]}) => {

    const storeId = EStoreKeys.installationGame;
    const { messageDisplayTime } = installationIds["Game"];

    clearTimeoutFunction(store[ storeId ].sceneTransitionTimeout);

    store[ storeId ].savedSceneToGo = goToSpecificGameSceneCommand;
    store[ storeId ].sceneTransitionTimeout = startTimeOutCounter(async () => {

        await gameServices.goToSpecificGameScene({goToSpecificGameSceneCommand});

    }, messageDisplayTime);


};

const delayedSwitchGameHint = ({ host, port }: { host: string, port: number }) => {

    const storeId = EStoreKeys.installationGame;
    const timeStepBetweenHints  = installationIds["Game"].timeStepBetweenHints ;
    const gameHintsArray = [
        gameFadesCommands.hint1FadeIn,
        gameFadesCommands.hint2FadeIn,
        gameFadesCommands.hint3FadeIn,
        gameFadesCommands.hint4FadeIn,
    ];


    clearTimeoutFunction(store[ storeId ].hideHintTimeout);

    store[ storeId ].hideHintTimeout = async () => {
        const sendDataWithDelay = returnSendDataFunctionAfterDelay({host, port});
        for (const gameHint of gameHintsArray){
            const command = transformToHexArray(gameHint);
            await new Promise<void>((resolve) => {
                setTimeout(() => {
                    sendDataToWingsServerOverUdp({ command, host, port });
                    resolve();
                }, timeStepBetweenHints );
            });
        }

    };
}

const abortMessageDisplayAndGoToTheNextGameScene = async ({ storeId, goToSpecificGameSceneCommand }: { storeId: EStoreKeys, goToSpecificGameSceneCommand: number[]} ) => {

    clearTimeoutFunction( store[ storeId ].sceneTransitionTimeout );
    await gameServices.goToSpecificGameScene({ goToSpecificGameSceneCommand });


}

export {
    abortMessageDisplayAndGoToTheNextGameScene,
    delayedGoToSpecificGameScene,
    delayedSwitchOffLabMicroscope,
    delayedSwitchGameHint,
    delayedComeBackToScreensaver,
    returnSendDataFunctionBeforeDelay,
    minutesToMilliseconds,
    startTimeOutCounter,
    clearTimeoutFunction
};
