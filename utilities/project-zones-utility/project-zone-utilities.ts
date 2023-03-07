import {delayedComeBackToScreensaver, returnSendDataFunctionBeforeDelay} from "../time-utilities";
import { installationIds, systemVariables } from "../../_environment/environment";
import { returnCompositeCommandUtility } from "../composite-command-utility";
import { sendDataToWingsServerOverUdp } from "../udp/dgram-udp-utilities";
import { EProjectZonesModes, IStore } from "../../types/store-types";
import { possibleCommandsReceivedForProjectZones } from "../../commands-and-conditions/possible-commands-received-for-project-zones";
import { EGameControlCommand } from "../../types/game-types";
import { transformToHexArray } from "../hex-transform-utilities";
import { EInstallationIds } from "../../types/_common-types";
import { wingsActionCommands } from "../../commands-and-conditions/wings-action-commands";
import { setStoreValue } from "../store-utility";
import {IMiddleProps, TCommand} from "../../types/command-types";
import { store } from "../../store/store";


export interface IProjectEncoderProps {
    storeId: keyof IStore
    id: EInstallationIds
    newIndex: string,
    command: EGameControlCommand | string,
}


class projectUtilities {

    storeId: keyof IStore
    id: EInstallationIds
    host: string
    port: number
    newIndex: string
    delayShort: number
    delayLong: number
    idleTime: string
    command: EGameControlCommand | string
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

    async sendHexCommand(){

        const hexCommand = transformToHexArray( this.command )
        const { idleTime } = installationIds[ this.id ]

        sendDataToWingsServerOverUdp({ command: hexCommand, id: this.id });
        await delayedComeBackToScreensaver({  storeId: this.storeId, id: this.id, type: "active", idleTime});

    }

    async sendUniversalTransitionCommand() {

        if( store[ this.storeId ].mode === "screensaver" && !this.command.match(/[1-9]+/gm) ){

            setStoreValue({ storeId: this.storeId, mode: EProjectZonesModes.main, index: 1 });
            await this.executeCompositeCommandUtility({ xIndex: "02", yIndex: "01", type: "active" });

        } else if ( (store[ this.storeId ].mode === "main" || this.command.match(/[1-9]+/gm)) && this.newIndex ) {

            setStoreValue({ storeId: this.storeId, mode: EProjectZonesModes.main, index: +this.newIndex });
            await this.executeCompositeCommandUtility({ xIndex: "02", yIndex: this.newIndex, type: "active" });

        }

    }

    async sendTransitionCommandToThePortraitsInstallation() {

        setStoreValue({ storeId: this.storeId, mode: EProjectZonesModes.main, index: +this.newIndex, numberOfFiles: this.numberOfFiles });
        await this.executeCompositeCommandUtility({ xIndex: "01", yIndex: this.newIndex, type: "active" });

    }

    async sendTransitionCommandToTheCoversInstallation() {

        if( possibleCommandsReceivedForProjectZones.goForward.includes( this.command ) ){

            const command = transformToHexArray( wingsActionCommands.NextMarker );
            const executeSendDataFunctionBeforeDelay = returnSendDataFunctionBeforeDelay({ id: this.id });

            for await ( const i of [1, 2] ){
                await executeSendDataFunctionBeforeDelay( command, this.delayShort );
            }

        } else if( possibleCommandsReceivedForProjectZones.goBackwards.includes( this.command ) ) {

            const command = transformToHexArray( wingsActionCommands.PreviousMarker );
            sendDataToWingsServerOverUdp({ command, id: this.id });

        }

    }

}


export {
    projectUtilities
}