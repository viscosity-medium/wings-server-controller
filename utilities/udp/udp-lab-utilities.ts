import {clearTimeoutFunction, delayedSwitchOffLabMicroscope, returnSendDataFunctionBeforeDelay} from "../time-utilities";
import {transformToHexArray} from "../hex-transform-utilities";
import {setStoreValue} from "../store-utility";
import {actionCommands} from "../../commands/action-commands";
import {store} from "../../store/store";
import {EStoreKeys, IStore} from "../../types/store-types";
import {EGameControlCommand} from "../../types/game-types";
import {udpTransitionBetweenFiles} from "./udp-transition-between-files";
import {defineIndexToGoUtility} from "../define-index-to-go-utility";

export interface ILabEncoderProps {
    storeId: keyof IStore
    host: string,
    port: number,
    delayLong: number,
    idleTime: string,
    numberOfFiles: number,
    delayShort: number
    command: EGameControlCommand
}

const { executeTrigger } = actionCommands;
class UdpLabUtilities {
    async executeEncoderCommandAction ( { storeId, host, port, delayLong, idleTime, command, numberOfFiles,  delayShort }: ILabEncoderProps ){

        const newIndex = defineIndexToGoUtility({ command, storeId, numberOfFiles: numberOfFiles });

        if( storeId === EStoreKeys.installationLab || storeId === EStoreKeys.installationTest ){

            if( (["Encoder_Left", "Encoder_Right"].includes(command) || command.match(/Test_Lab_[L|R]/)) ){

                await udpTransitionBetweenFiles({
                    storeId, host, port, delayLong, delayShort,
                    idleTime, numberOfFiles, newIndex
                })

            }

        }

    }
}

const udpLabUtilities = new UdpLabUtilities();
export {
    udpLabUtilities
}