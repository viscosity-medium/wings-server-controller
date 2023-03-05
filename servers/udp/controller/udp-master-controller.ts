import { projectZonesController } from "../../../utilities/project-zones-utility/project-zones-controller";
import { defineInstallationId } from "../../../utilities/udp/define-installation-id";
import { EGameControlCommand } from "../../../types/game-types";
import { EInstallationIds } from "../../../types/_common-types";
import { gameController } from "../../../utilities/game-utilities/game-controller/game-controller";
import { RemoteInfo } from "dgram";
import { IStore } from "../../../types/store-types";
import { store } from "../../../store/store";

const udpMasterController = async (msg: Buffer, remoteInfo: RemoteInfo) => {

    const command = msg.toString() as EGameControlCommand;
    const ip = remoteInfo.address;
    const id = defineInstallationId({ ip, command });
    const storeId = `installation${ id }` as keyof IStore;

    // const port = systemVariables.WINGS_PORT;

    // const {
    //     host,
    //     delayLong,
    //     delayShort,
    //     idleTime,
    //     numberOfFiles
    // } = installationIds[ id as EInstallationIds ];

    if(id){

        try {

            // if it's possible to control via encoders and buttons (switches from the guide's tablet)
            if(store[storeId].analogControl){

                //for project zones
                if( id.match(/Project/) ) {

                    await projectZonesController({ id, storeId, command});


                }

                //for game-commands
                if( EInstallationIds.Game === id || command.match(/Test_[Encoder|Button]/) ) {

                    await gameController({ id, command });

                }

            }

        }

        catch(err){
            console.log(err)
        }

    }

    console.log(command);
    console.log(ip, id)

}

export {
    udpMasterController
}