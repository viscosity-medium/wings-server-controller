import { delayedComeBackToScreensaver } from "./time-utilities";
import { sendDataToWingsServerOverUdp } from "./udp/dgram-udp-utilities";
import { transformToHexArray } from "./hex-transform-utilities";
import { ISimpleCommandProps } from "../types/command-types";

const executeSimpleCommandUtility = async ({ storeId, id, commandAction, host, port, idleTime }: ISimpleCommandProps) => {

    const command = transformToHexArray( commandAction );
    const type = "active";

    sendDataToWingsServerOverUdp({ id, command });
    await delayedComeBackToScreensaver({  storeId, id, type, idleTime});

}

export {
    executeSimpleCommandUtility
}