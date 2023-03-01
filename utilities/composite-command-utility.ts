import {delayedComeBackToScreensaver, returnSendDataFunctionBeforeDelay} from "./time-utilities";
import {transformToHexArray, transformValueToHexStr} from "./hex-transform-utilities";
import {TReturnCompositeCommandUtility} from "../types/command-types";
import {actionCommands} from "../commands/action-commands";
import {EStoreKeys} from "../types/store-types";

const { timeIndicatorPosition, executeTrigger, continueCommand, pauseCommand } = actionCommands;

const returnCompositeCommandUtility:TReturnCompositeCommandUtility  = ({
    storeId, host, port,
    delayLong, delayShort, idleTime
}) => async ({ xIndex,  yIndex, type }) => {

    // N) define hex-x/y/commands for execution
    const xHex = transformValueToHexStr( xIndex );
    const yHex = transformValueToHexStr( yIndex );
    const fadeOutArg = storeId !== EStoreKeys.installationTest ? "C9" : "F9" ; // F9 for tests C9 for production
    const fadeInArg = storeId !== EStoreKeys.installationTest ? "C8" : "FA" ; // FA for tests C8 for production
    const commandHex1 = transformToHexArray( executeTrigger.commandAction( fadeOutArg ));
    const commandHex2 = transformToHexArray( pauseCommand.commandAction );
    const commandHex3 = transformToHexArray( timeIndicatorPosition.commandAction( xHex, yHex ));
    const commandHex4 = transformToHexArray( continueCommand.commandAction );
    const commandHex5 = transformToHexArray( executeTrigger.commandAction( fadeInArg ));
    const executeAsyncTimeOut = returnSendDataFunctionBeforeDelay( {host, port} );

    // I) execute all async sequences of commands (1-5)
    await executeAsyncTimeOut( commandHex1, delayLong );
    await executeAsyncTimeOut( commandHex2, delayShort );
    await executeAsyncTimeOut( commandHex3, delayShort );
    await executeAsyncTimeOut( commandHex4, delayShort );
    await executeAsyncTimeOut( commandHex5, delayShort );

    // II) start delay function to go back to screensaver
    if( ![EStoreKeys.installationProject1, EStoreKeys.installationTestProject1].includes(storeId) ){
        await delayedComeBackToScreensaver( { host, port, storeId, type, delayLong, delayShort, idleTime } );
    }
    // ПРОПИСАТЬ СБРАСЫВАНИЕ ПЕРЕМЕННЫХ ДЛЯ ПЕРВОЙ ПРОЕКТНОЙ ЗОНЫ
}

export {
    returnCompositeCommandUtility
}