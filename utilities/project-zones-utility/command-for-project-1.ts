import { returnSendDataFunctionBeforeDelay } from "../time-utilities";
import { transformToHexArray } from "../hex-transform-utilities";
import { actionCommands } from "../../commands/action-commands";

const { timeIndicatorPosition, executeTrigger, playCommand } = actionCommands;
const commandForProject1 = ({ host, port, yHex }: { host: string, port: number, yHex : string }) => {

    const commandHex1 = transformToHexArray( executeTrigger.commandAction( "C9" )); // production fade-out
    const commandHex2 = transformToHexArray( timeIndicatorPosition.commandAction( "01", yHex ));
    const commandHex3 = transformToHexArray( playCommand.commandAction);
    const commandHex4 = transformToHexArray( executeTrigger.commandAction( "C8" )); // production fade-in

    const executeAsyncTimeOut = returnSendDataFunctionBeforeDelay( {host, port} );
}

export {
    commandForProject1
}