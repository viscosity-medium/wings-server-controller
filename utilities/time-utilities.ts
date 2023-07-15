import {
    FunctionWithArguments, FunctionWithoutArguments,
    ClearTimeOut, ThrottlerParams,
    MinutesToMilliseconds,
    ReturnAsyncMemoTimeout,
    SecondsToMillisecondsSeconds,
    StartIdleTimeOut
} from "../types/time-types";
import { GameModes, ProjectZonesModes, StoreKeys } from "../types/store-types";
import { DelayedComeBackToScreensaver } from "../types/command-types";
import { returnCompositeCommandUtility } from "./composite-command-utility";
import { sendDataToWingsServerOverUdp } from "./udp/dgram-udp-utilities";
import { transformToHexArray } from "./hex-transform-utilities";
import { gameFadesCommands } from "../commands-and-conditions/game-commands/game-fades-commands";
import { AvailableInstallationIds } from "../types/_common-types";
import { installationIds } from "../_environment/environment";
import { setStoreValue } from "./store-utility";
import { gameServices } from "./game-utilities/game-services";
import { store } from "../store/store";

const startTimeOutCounter: StartIdleTimeOut = (action, timeout) => {

    return setTimeout(() => {
        action()
    }, timeout);

};
const clearTimeoutFunction: ClearTimeOut = (timeOutId) => (clearTimeout(timeOutId));

const returnSendDataFunctionBeforeDelay: ReturnAsyncMemoTimeout = ({ id }) => async (command, timeout) => {

    sendDataToWingsServerOverUdp({ id, command });
    await new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve()
        }, timeout);
    });

};

const returnSendDataFunctionAfterDelay: ReturnAsyncMemoTimeout = ({ id }) => async (command, timeout) => {

    await new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve()
        }, timeout);
    });
    sendDataToWingsServerOverUdp({ id, command });

};

const secondsToMilliseconds: SecondsToMillisecondsSeconds = (time) => {
    return +time * 1000;
}

const minutesToMilliseconds: MinutesToMilliseconds = (time) => {

    const timeArray = time.split(":");
    const minutes = +timeArray[0];
    const seconds = +timeArray[1];
    return (minutes * 60 + seconds) * 1000;

};

const delayedComeBackToScreensaver: DelayedComeBackToScreensaver = ({
    storeId,
    id,
    type,
    idleTime
}) => {

    clearTimeoutFunction( store[ storeId ].idleTimeout );

    if( type === "active" && store[storeId].mode !== "screensaver" ){

        store[ storeId ].idleTimeout = startTimeOutCounter(
            async () => {
                setStoreValue({
                    storeId,
                    mode: ProjectZonesModes.screensaver || GameModes.screensaver,
                    index: 1
                });

                    if (id === "Game"){

                        const hideAllHints = transformToHexArray( gameFadesCommands.hintFadeOutScreensaverAndDemoMode )

                        await sendDataToWingsServerOverUdp({id, command: hideAllHints});
                        setStoreValue({
                            storeId,
                            mode: ProjectZonesModes.screensaver || GameModes.screensaver,
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


const delayedGoToSpecificGameScene = ({id, goToSpecificGameSceneCommand}: {id: AvailableInstallationIds, goToSpecificGameSceneCommand: number[]}) => {

    const storeId = StoreKeys.installationGame;
    const { messageDisplayTime } = installationIds["Game"];

    clearTimeoutFunction(store[ storeId ].sceneTransitionTimeout);

    setStoreValue({
        storeId,
        savedSceneToGo: goToSpecificGameSceneCommand,
        sceneTransitionTimeout: startTimeOutCounter(async () => {

            await gameServices.goToSpecificGameScene({id, goToSpecificGameSceneCommand});

        }, messageDisplayTime)

    });

};

const delayedSwitchGameHint = ({ id  }: { id: AvailableInstallationIds }) => {

    const storeId = StoreKeys.installationGame;
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

const abortMessageDisplayAndGoToTheNextGameScene = async ({ storeId, id, goToSpecificGameSceneCommand }: { storeId: StoreKeys, id: AvailableInstallationIds, goToSpecificGameSceneCommand: number[]} ) => {

    clearTimeoutFunction( store[ storeId ].sceneTransitionTimeout );
    await gameServices.goToSpecificGameScene({id, goToSpecificGameSceneCommand });

}

const throttlerFunction = async ({ timeout=500, storeId, functionToExecute, id, command }: ThrottlerParams) => {

    if(!store[ storeId ].isThrottled) {

        setStoreValue({
            storeId,
            isThrottled: true
        });

        if( id && command ){

            const internalFunctionToExecute = functionToExecute as FunctionWithArguments
            await internalFunctionToExecute({
                id,
                command
            })

        } else {

            const internalFunctionToExecute = functionToExecute as FunctionWithoutArguments
            await internalFunctionToExecute();

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


