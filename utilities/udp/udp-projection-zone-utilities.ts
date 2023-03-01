import {returnCompositeCommandUtility} from "../composite-command-utility";
import {defineIndexToGoUtility} from "../define-index-to-go-utility";
import {setStoreValue} from "../store-utility";
import {store} from "../../store/store";
import {EProjectZonesModes, EStoreKeys, IStore} from "../../types/store-types";
import {EGameControlCommand} from "../../types/game-types";
import {udpTransitionBetweenFiles} from "./udp-transition-between-files";

export interface IProjectEncoderProps {
    storeId: keyof IStore
    host: string,
    port: number,
    delayShort: number
    delayLong: number,
    idleTime: string,
    command: EGameControlCommand,
    numberOfFiles: number
}


class UdpProjectionZoneUtilities {
    async executeEncoderCommandAction ({ storeId, host, port, delayLong, delayShort, idleTime, command, numberOfFiles }: IProjectEncoderProps ) {

        const executeCompositeCommandUtility = returnCompositeCommandUtility({ storeId, host, port, delayLong, delayShort, idleTime });
        const newIndex = defineIndexToGoUtility({ command, storeId, numberOfFiles: numberOfFiles });

        if(
            ["Encoder_Left", "Encoder_Right"].includes(command) ||
            command.match(/Test_Project_1_[L|R]/)
        ){

            if( [EStoreKeys.installationProject1, EStoreKeys.installationTestProject1].includes(storeId) && newIndex ){

                setStoreValue({ storeId, mode: EProjectZonesModes.main, index: +newIndex, numberOfFiles: numberOfFiles });
                await executeCompositeCommandUtility({ xIndex: "01", yIndex: newIndex, type: "active" });

            }

            if( ![EStoreKeys.installationProject1, EStoreKeys.installationTestProject1].includes(storeId) ){

                await udpTransitionBetweenFiles({
                    storeId, host, port, delayLong, delayShort,
                    idleTime, numberOfFiles, newIndex
                })

            }

        }

    }
}
const udpProjectionZoneUtilities = new UdpProjectionZoneUtilities();

export {
    udpProjectionZoneUtilities
}