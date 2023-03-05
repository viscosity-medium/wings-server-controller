import { delayedComeBackToScreensaver, returnSendDataFunctionBeforeDelay } from "./time-utilities";
import { transformToHexArray, transformValueToHexStr } from "./hex-transform-utilities";
import { TReturnCompositeCommandUtility } from "../types/command-types";
import { installationIds } from "../_environment/environment";
import { actionCommands } from "../commands/action-commands";
import { EStoreKeys } from "../types/store-types";

const { timeIndicatorPosition, executeTrigger, continuePlay, pause } = actionCommands;

const returnCompositeCommandUtility:TReturnCompositeCommandUtility  = ({
    storeId, id,
}) => async ({ xIndex,  yIndex, type }) => {

    // I) define hex-x/y/commands for execution
    const { delayLong, delayShort, idleTime } = installationIds[ id ];
    const xHex = transformValueToHexStr( xIndex );
    const yHex = transformValueToHexStr( yIndex );
    const fadeOutArg = "C9";
    const fadeInArg = "C8";
    const commandHex1 = transformToHexArray( executeTrigger.commandAction( fadeOutArg ));
    const commandHex2 = transformToHexArray( pause.commandAction );
    const commandHex3 = transformToHexArray( timeIndicatorPosition.commandAction( xHex, yHex ));
    const commandHex4 = transformToHexArray( continuePlay.commandAction );
    const commandHex5 = transformToHexArray( executeTrigger.commandAction( fadeInArg ));
    const executeAsyncTimeOut = returnSendDataFunctionBeforeDelay({ id });

    // II) execute all async sequences of commands (1-5)
    await executeAsyncTimeOut( commandHex1, delayLong );
    await executeAsyncTimeOut( commandHex2, delayShort );
    await executeAsyncTimeOut( commandHex3, delayShort );
    await executeAsyncTimeOut( commandHex4, delayShort );
    await executeAsyncTimeOut( commandHex5, delayShort );

    // III) start delay function to go back to screensaver
    if( ![ EStoreKeys.installationProjectPortraits ].includes(storeId) ){
        await delayedComeBackToScreensaver({ storeId, id, type, idleTime });
    }

}

export {
    returnCompositeCommandUtility
}