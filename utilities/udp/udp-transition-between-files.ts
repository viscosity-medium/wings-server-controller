import {store} from "../../store/store";
import {setStoreValue} from "../store-utility";
import {EProjectZonesModes, IStore} from "../../types/store-types";
import {IProjectEncoderProps} from "./udp-projection-zone-utilities";
import {returnCompositeCommandUtility} from "../composite-command-utility";

interface IUdpTransitionBetweenFilesProps {
    storeId: keyof IStore,

    host: string,
    port: number,
    delayShort: number
    delayLong: number,
    idleTime: string,
    numberOfFiles: number,
    newIndex: string | undefined
}
const udpTransitionBetweenFiles = async ({
    storeId, host, port, delayLong, delayShort, idleTime, numberOfFiles, newIndex
}: IUdpTransitionBetweenFilesProps) => {

    const executeCompositeCommandUtility = returnCompositeCommandUtility({ storeId, host, port, delayLong, delayShort, idleTime });

    if( store[storeId].mode === "screensaver" ){

        setStoreValue({ storeId, mode: EProjectZonesModes.main, index: 1, numberOfFiles: numberOfFiles });
        await executeCompositeCommandUtility({ xIndex: "02", yIndex: "01", type: "active" });

    } else if ( store[storeId].mode === "main" && newIndex ) {

        setStoreValue({ storeId, mode: EProjectZonesModes.main, index: +newIndex, numberOfFiles: numberOfFiles });
        await executeCompositeCommandUtility({  xIndex: "02", yIndex: newIndex, type: "active" });

    }
}

export {
    udpTransitionBetweenFiles
}