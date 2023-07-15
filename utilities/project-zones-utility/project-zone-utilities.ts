import {delayedComeBackToScreensaver, returnSendDataFunctionBeforeDelay} from "../time-utilities";
import {HttpCommands, UdpProjectCommands, MiddleProps} from "../../types/command-types";
import {
    possibleCommandsReceivedForProjectZones
} from "../../commands-and-conditions/possible-commands-received-for-project-zones";
import {installationIds, systemVariables} from "../../_environment/environment";
import {returnCompositeCommandUtility} from "../composite-command-utility";
import {sendDataToWingsServerOverUdp} from "../udp/dgram-udp-utilities";
import {AvailableInstallationIds} from "../../types/_common-types";
import {ProjectZonesModes, Store} from "../../types/store-types";
import {GameControlCommand} from "../../types/game-types";
import {transformToHexArray, transformValueToHexStr} from "../hex-transform-utilities";
import {wingsActionCommands} from "../../commands-and-conditions/wings-action-commands";
import {setStoreValue} from "../store-utility";
import {store} from "../../store/store";


export interface ProjectEncoderProps {
    storeId: keyof Store
    id: AvailableInstallationIds
    newIndex: string,
    command: GameControlCommand | string,
}


class projectUtilities {

    storeId: keyof Store
    id: AvailableInstallationIds
    host: string
    port: number
    newIndex: string
    delayShort: number
    delayLong: number
    idleTime: string
    command: GameControlCommand | string
    numberOfFiles: number
    executeCompositeCommandUtility: ( { xIndex, yIndex, type }: MiddleProps ) => void

    constructor({
        storeId,
        id,
        newIndex,
        command,
    }: ProjectEncoderProps) {
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

        const hexCommand = transformToHexArray( this.command );
        const { idleTime } = installationIds[ this.id ];

        console.log(`Command: ${this.command}`); // test to see which command sends

        sendDataToWingsServerOverUdp({ command: hexCommand, id: this.id });
        await delayedComeBackToScreensaver({ storeId: this.storeId, id: this.id, type: "active", idleTime});

    }

    async sendUniversalTransitionCommand() {

        if( store[ this.storeId ].mode === ProjectZonesModes.screensaver && !this.command.match(/[1-9]+/gm) ) {

            setStoreValue({ storeId: this.storeId, mode: ProjectZonesModes.main, index: 1 });
            await this.executeCompositeCommandUtility({ xIndex: "02", yIndex: "01", type: "active" });

        } else if ( (store[ this.storeId ].mode === ProjectZonesModes.main || this.command.match(/[1-9]+/gm)) && this.newIndex ) {

            setStoreValue({ storeId: this.storeId, mode: ProjectZonesModes.main, index: +this.newIndex });
            await this.executeCompositeCommandUtility({ xIndex: "02", yIndex: this.newIndex, type: "active" });

        }

    }

    async sendTransitionCommandToTheTanksInstallations() {

        if( this.command.match(/[1-9]+/gm) ){

            setStoreValue({ storeId: this.storeId, mode: ProjectZonesModes.main, index: +this.newIndex, numberOfFiles: 1 });
            await this.executeCompositeCommandUtility({ xIndex: "01", yIndex: this.newIndex, type: "active" });

        }

    }

    async sendTransitionCommandToThePortraitsInstallations() {

        setStoreValue({ storeId: this.storeId, mode: ProjectZonesModes.main, index: +this.newIndex, numberOfFiles: this.numberOfFiles });
        await this.executeCompositeCommandUtility({ xIndex: "01", yIndex: this.newIndex, type: "active" });

    }

    async sendTransitionCommandToTheMapOrCoversInstallation() {


        if( possibleCommandsReceivedForProjectZones.goForward.includes( this.command as HttpCommands | UdpProjectCommands) ){

            const command = transformToHexArray( wingsActionCommands.NextMarker );

            sendDataToWingsServerOverUdp({ command, id: this.id });

        } else if( possibleCommandsReceivedForProjectZones.goBackwards.includes( this.command as HttpCommands | UdpProjectCommands ) ) {

            const command = transformToHexArray( wingsActionCommands.PreviousMarker );
            const executeSendDataFunctionBeforeDelay = returnSendDataFunctionBeforeDelay({ id: this.id });

            await executeSendDataFunctionBeforeDelay( command, this.delayShort );

        }

        if( this.id === AvailableInstallationIds.ProjectMap ){

            const { idleTime } = installationIds[ this.id ];
            await delayedComeBackToScreensaver({ storeId: this.storeId, id: this.id, type: "active", idleTime});

        }

    }

    async  sendTransitionToThePipelineInstallation(){

        const idleTime = installationIds[ "ProjectPipeline" ].idleTime;

        const functionToExecute = async ({ command }: { command: number[] }) => {

            sendDataToWingsServerOverUdp({ command, id: this.id });

            const anotherCommand = transformToHexArray("0xFF 0x01 0x07 0xFE");

            setTimeout(()=>{
                sendDataToWingsServerOverUdp({ command: anotherCommand, id: this.id })
            }, 10);

            await delayedComeBackToScreensaver({ storeId: this.storeId, id: this.id, type: "active", idleTime });

        }

        if(
            possibleCommandsReceivedForProjectZones.goForward.includes( this.command as HttpCommands | UdpProjectCommands )
        ){

            const command= transformToHexArray( wingsActionCommands.ExecuteTrigger( "02" ) );
            await functionToExecute({ command })

        } else if(
            possibleCommandsReceivedForProjectZones.goBackwards.includes( this.command as HttpCommands | UdpProjectCommands )
        ) {

            const command= transformToHexArray( wingsActionCommands.ExecuteTrigger( "01" ) );
            await functionToExecute({ command })

        } else if (
            possibleCommandsReceivedForProjectZones.pipelineNumbers().includes( this.command )
        ) {

            const executeSendDataFunctionBeforeDelay = returnSendDataFunctionBeforeDelay({ id: this.id });

            for await ( const i of [ "10", this.command ] ){

                const hexValue = transformValueToHexStr(i);
                const preCommand =  wingsActionCommands.ExecuteTrigger( hexValue.length > 1 ? hexValue : `0${hexValue}` );
                const command = transformToHexArray( preCommand );

                await executeSendDataFunctionBeforeDelay( command, this.delayShort );

            }

        }

    }

}


export {
    projectUtilities
}