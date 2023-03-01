import { installationIds, systemVariables } from "../../../_environment/environment";
import { EStoreKeys, IStore } from "../../../types/store-types";
import { udpProjectionZoneUtilities } from "../../../utilities/udp/udp-projection-zone-utilities";
import { EGameControlCommand } from "../../../types/game-types";
import { defineIdByClientIp } from "../../../utilities/udp/define-id-by-client-ip";
import { udpLabUtilities } from "../../../utilities/udp/udp-lab-utilities";
import { gameController } from "../../../utilities/game-utilities/game-controller/game-controller";
import { RemoteInfo } from "dgram";
import { store } from "../../../store/store";

const udpController = async ( msg: Buffer, remoteInfo: RemoteInfo) => {

    const command = msg.toString() as EGameControlCommand;
    const ip = remoteInfo.address;
    const port = systemVariables.WINGS_PORT;
    const id = defineIdByClientIp({ ip, command });
    console.log(id)
    const storeId = `installation${id}` as keyof IStore;
    const {
        host,
        delayLong,
        delayShort,
        idleTime,
        numberOfFiles
    } = installationIds[id];

    try {

        // if it's possible to control via encoders and buttons (switches from the guide's tablet)
        if(store[storeId].analogControl){

            //for project zones
            if( id.match(/Project\d/) || command.match(/Test_Project_\d_[L|R]/) ) {

                await udpProjectionZoneUtilities.executeEncoderCommandAction({
                    storeId, host, port, command, delayLong, delayShort, idleTime, numberOfFiles
                });

            }

            //for laboratory
            if ( id.match(/Lab/) && storeId === EStoreKeys.installationLab || command.match(/Test_Lab_\D/) ) {

                await udpLabUtilities.executeEncoderCommandAction({
                    storeId, host, port, command, delayLong, delayShort, idleTime, numberOfFiles
                });

            }

            //for game-commands
            if( id.match(/Game/) || storeId === EStoreKeys.installationGame || command.match(/Test_Game_\D/) ) {

                await gameController({ command });

            }

        }

    }

    catch(err){
        console.log(err)
    }

    console.log(command);
    console.log(ip, port)

}

export {
    udpController
}