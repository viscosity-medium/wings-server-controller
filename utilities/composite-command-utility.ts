import { delayedComeBackToScreensaver, returnSendDataFunctionBeforeDelay } from "./time-utilities";
import { transformToHexArray, transformValueToHexStr } from "./hex-transform-utilities";
import { TReturnCompositeCommandUtility } from "../types/command-types";
import { wingsActionCommands } from "../commands-and-conditions/wings-action-commands";
import { installationIds } from "../_environment/environment";
import { EStoreKeys } from "../types/store-types";

const { TimeIndicatorPosition, ExecuteTrigger, ContinuePlay, Pause } = wingsActionCommands;

const returnCompositeCommandUtility:TReturnCompositeCommandUtility  = ({
    storeId, id,
}) => async ({ xIndex,  yIndex, type }) => {

    // I) define hex-x/y/commands for execution
    const { delayLong, delayShort, idleTime } = installationIds[ id ];
    const xHex = transformValueToHexStr( xIndex );
    const yHex = transformValueToHexStr( yIndex );
    const fadeOutArg = "C9";
    const fadeOutAllImages = "0A";
    const fadeInArg = "C8";
    const commandHex1 = transformToHexArray( ExecuteTrigger( fadeOutArg ));
    const commandHexPipelineOnly = transformToHexArray( ExecuteTrigger( fadeOutAllImages ));
    const commandHex2 = transformToHexArray( Pause );
    const commandHex3 = transformToHexArray( TimeIndicatorPosition( xHex, yHex ));
    const commandHex4 = transformToHexArray( ContinuePlay );
    const commandHex5 = transformToHexArray( ExecuteTrigger( fadeInArg ));
    const executeAsyncTimeOut = returnSendDataFunctionBeforeDelay({ id });

    // II) execute all async sequences of commands (1-5)
    await executeAsyncTimeOut( commandHex1, delayLong );
    storeId === "installationProjectPipeline" ? await executeAsyncTimeOut(commandHexPipelineOnly, delayShort) : null;
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