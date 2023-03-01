import { delayedComeBackToScreensaver } from "./time-utilities";
import { sendDataToWingsServerOverUdp } from "./udp/dgram-udp-utilities";
import { transformToHexArray } from "./hex-transform-utilities";
import { ISimpleCommandProps } from "../types/command-types";

const executeSimpleCommandUtility = async ({ host, port, storeId, idleTime, commandAction, delayLong, delayShort }: ISimpleCommandProps) => {

    const command = transformToHexArray( commandAction );
    const type = "active";

    sendDataToWingsServerOverUdp({ command, host, port });
    await delayedComeBackToScreensaver({ host, port, storeId, type, delayLong, delayShort, idleTime });

}

export {
    executeSimpleCommandUtility
}