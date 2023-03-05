import { installationIds, systemVariables } from "../../_environment/environment";
import { returnCompositeCommandUtility } from "../composite-command-utility";
import { EProjectZonesModes, IStore } from "../../types/store-types";
import { EGameControlCommand } from "../../types/game-types";
import { EInstallationIds } from "../../types/_common-types";
import { setStoreValue } from "../store-utility";
import { IMiddleProps } from "../../types/command-types";
import { store } from "../../store/store";
import {switchBetweenFilesCommands} from "../../commands/switch-between-files-commands";
import {sendDataToWingsServerOverUdp} from "./dgram-udp-utilities";
import {transformToHexArray} from "../hex-transform-utilities";
import {actionCommands} from "../../commands/action-commands";
import {returnSendDataFunctionBeforeDelay} from "../time-utilities";

export interface IProjectEncoderProps {
    storeId: keyof IStore
    id: EInstallationIds
    newIndex: string,
    command: EGameControlCommand,
}


class UdpProjectUtilities {

    storeId: keyof IStore
    id: EInstallationIds
    host: string
    port: number
    newIndex: string
    delayShort: number
    delayLong: number
    idleTime: string
    command: EGameControlCommand
    numberOfFiles: number
    executeCompositeCommandUtility: ( { xIndex, yIndex, type }: IMiddleProps ) => void

    constructor({
        storeId,
        id,
        newIndex,
        command,
    }: IProjectEncoderProps) {
        this.storeId = storeId
        this.id = id
        this.newIndex = newIndex
        this.command = command
        this.host = installationIds[ id ].host
        this.port = systemVariables.WINGS_PORT
        this.delayLong = installationIds[ id ].delayLong
        this.delayShort = installationIds[ id ].delayShort
        this.idleTime = installationIds[ id ].idleTime
        this.numberOfFiles = installationIds[ id ].numberOfFiles
        this.executeCompositeCommandUtility = returnCompositeCommandUtility({
            storeId: this.storeId, id: this.id
        });
    }

    async sendUniversalTransitionCommand() {

        if( store[this.storeId].mode === "screensaver" ){

            setStoreValue({ storeId: this.storeId, mode: EProjectZonesModes.main, index: 1 });
            await this.executeCompositeCommandUtility({ xIndex: "02", yIndex: "01", type: "active" });

        } else if ( store[this.storeId].mode === "main" && this.newIndex ) {

            setStoreValue({ storeId: this.storeId, mode: EProjectZonesModes.main, index: +this.newIndex });
            await this.executeCompositeCommandUtility({ xIndex: "02", yIndex: this.newIndex, type: "active" });

        }

    }

    async sendTransitionCommandToThePortraitsInstallation() {

        setStoreValue({ storeId: this.storeId, mode: EProjectZonesModes.main, index: +this.newIndex, numberOfFiles: this.numberOfFiles });
        await this.executeCompositeCommandUtility({ xIndex: "01", yIndex: this.newIndex, type: "active" });

    }

    async sendTransitionCommandToTheCoversInstallation() {

        if( switchBetweenFilesCommands.goForward.includes( this.command ) ){

            const command = transformToHexArray( actionCommands.nextMarker.commandAction );
            const executeSendDataFunctionBeforeDelay = returnSendDataFunctionBeforeDelay({ id: this.id });

            for await ( const i of [1, 2] ){
                await executeSendDataFunctionBeforeDelay( command, this.delayShort );
            }

        } else if( switchBetweenFilesCommands.goBackwards.includes( this.command ) ) {

            const command = transformToHexArray( actionCommands.previousMarker.commandAction );
            sendDataToWingsServerOverUdp({ command, id: this.id });

        }

    }

}


export {
    UdpProjectUtilities
}