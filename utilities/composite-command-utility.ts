import {delayedComeBackToScreensaver, returnSendDataFunctionBeforeDelay} from "./time-utilities";
import {transformToHexArray, transformValueToHexStr} from "./hex-transform-utilities";
import {ReturnCompositeCommandUtility} from "../types/command-types";
import {wingsActionCommands} from "../commands-and-conditions/wings-action-commands";
import {installationIds} from "../_environment/environment";
import {StoreKeys} from "../types/store-types";

const { TimeIndicatorPosition, ExecuteTrigger, ContinuePlay, Pause } = wingsActionCommands;

const returnCompositeCommandUtility: ReturnCompositeCommandUtility  = ({
    storeId, id,
}) => async ({ xIndex,  yIndex, type }) => {

    // I) define hex-x/y/commands for execution
    const { delayLong, delayShort, idleTime } = installationIds[ id ];
    const xHex = transformValueToHexStr( xIndex );
    const yHex = transformValueToHexStr( yIndex );
    const fadeOutArgument = "C9";
    const fadeOutAllImagesArgument = "0A";
    const fadeInArgument = "C8";
    const commandHex1 = transformToHexArray( ExecuteTrigger( fadeOutArgument ));
    const commandHexPipelineOnly = transformToHexArray( ExecuteTrigger( fadeOutAllImagesArgument ));
    const commandHex2 = transformToHexArray( Pause );
    const commandHex3 = transformToHexArray( TimeIndicatorPosition( xHex, yHex ));
    const commandHex4 = transformToHexArray( ContinuePlay );
    const commandHex5 = transformToHexArray( ExecuteTrigger( fadeInArgument ));
    const executeAsyncTimeOut = returnSendDataFunctionBeforeDelay({ id });

    // II) execute all async sequences of commands (1-5)
    await executeAsyncTimeOut( commandHex1, delayLong );
    storeId === "installationProjectPipeline" ? await executeAsyncTimeOut(commandHexPipelineOnly, delayShort) : null;
    await executeAsyncTimeOut( commandHex2, delayShort );
    await executeAsyncTimeOut( commandHex3, delayShort );
    await executeAsyncTimeOut( commandHex4, delayShort );
    await executeAsyncTimeOut( commandHex5, delayShort );

    // III) start delay function to go back to screensaver (not used for Portraits and Covers installations)
    if( ![ StoreKeys.installationProjectPortraits, StoreKeys.installationProjectCovers ].includes(storeId) ){
        await delayedComeBackToScreensaver({ storeId, id, type, idleTime });
    }

}

export {
    returnCompositeCommandUtility
}