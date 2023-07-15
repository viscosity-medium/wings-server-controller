import { projectZonesSubController } from "../sub-controllers/project-zones-sub-controller";
import { sendDirectTestCommand } from "../../utilities/udp/dgram-udp-utilities";
import { defineInstallationId } from "../../utilities/define-installation-id";
import { transformToHexArray } from "../../utilities/hex-transform-utilities";
import { GameControlCommand } from "../../types/game-types";
import { throttlerFunction } from "../../utilities/time-utilities";
import { gameSubController } from "../sub-controllers/game-sub-controller";
import { logDataToMongoDb } from "../../database/logging-service";
import { systemVariables } from "../../_environment/environment";
import { RemoteInfo } from "dgram";
import { Store } from "../../types/store-types";
import { store } from "../../store/store";

const udpMasterController = async (msg: Buffer, remoteInfo: RemoteInfo) => {

    const command = msg.toString() as GameControlCommand;
    const ip = remoteInfo.address;
    const id = defineInstallationId({ ip, command });
    const storeId = `installation${ id }` as keyof Store;

    if( id ){

        try {

            // if it's possible to control via encoders and buttons
            // (switches from the guide's tablet [ !always true due to the rejection of final functionality! ])
            if( store[storeId].analogControl ){

                logDataToMongoDb({ store, storeId, id, ip, command })

                //for project zones
                if( id.match( /Project/ ) ) {

                    await projectZonesSubController({ id, storeId, command });

                    // for game-commands
                }else if( ( id.match( /Game/ ) || command.match( /Test_[Encoder|Button]/ )) && !store["installationGame"].isThrottled ) {

                    const functionToExecute = gameSubController;

                    const timeout = command.match("Button") ? 750 : 2000

                    await throttlerFunction({
                        storeId,
                        id,
                        command,
                        functionToExecute,
                        timeout
                    });

                }

            }

        }

        catch(err){
            console.log(err)
        }

    } else if ( systemVariables.DIRECT_COMMANDS === "direct_commands" ){

       sendDirectTestCommand( { command: transformToHexArray(command) } );

    }

}

export {
    udpMasterController
}