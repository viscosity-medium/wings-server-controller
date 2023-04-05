import { sendDataToWingsServerOverUdp } from "../../utilities/udp/dgram-udp-utilities";
import { projectZonesSubController } from "../sub-controllers/project-zones-sub-controller";
import { defineInstallationId } from "../../utilities/define-installation-id";
import { transformToHexArray } from "../../utilities/hex-transform-utilities";
import { EGameControlCommand } from "../../types/game-types";
import { EInstallationIds } from "../../types/_common-types";
import { systemVariables } from "../../_environment/environment";
import { gameSubController } from "../sub-controllers/game-sub-controller";
import { RemoteInfo } from "dgram";
import { IStore } from "../../types/store-types";
import { store } from "../../store/store";
import {throttlerFunction} from "../../utilities/time-utilities";
import {loggingFunction} from "../../utilities/loggingFunction";

const udpMasterController = async (msg: Buffer, remoteInfo: RemoteInfo) => {

    const command = msg.toString() as EGameControlCommand;
    const ip = remoteInfo.address;
    const id = defineInstallationId({ ip, command });
    const storeId = `installation${ id }` as keyof IStore;

    if( id ){

        try {

            // if it's possible to control via encoders and buttons (switches from the guide's tablet)
            if( store[storeId].analogControl ){

                loggingFunction({store, storeId, id, ip, command})

                //for project zones
                if( id.match( /Project/ ) ) {

                    await projectZonesSubController({ id, storeId, command});

                }

                //for game-commands
                if( ( id.match( /Game/ ) || command.match( /Test_[Encoder|Button]/ )) && !store["installationGame"].isThrottled ) {

                    const functionToExecute =  gameSubController;

                    await throttlerFunction({
                        storeId,
                        id,
                        command,
                        functionToExecute
                    });

                    // await gameSubController({ id, command });
                    //console.log(store[storeId])

                }

            }

        }

        catch(err){
            console.log(err)
        }

    }

    if( systemVariables.DIRECT_COMMANDS === "direct_commands" ){

        sendDataToWingsServerOverUdp( {id: EInstallationIds.Test, command: transformToHexArray(command)} );

    }

}

export {
    udpMasterController
}