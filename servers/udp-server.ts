import { udpMasterController } from "../controllers/master-controllers/udp-master-controller";
import { RemoteInfo } from "dgram";
import { client } from "../utilities/udp/dgram-udp-utilities";

export const startUdpServer = async () => {

    await client.on('message', async( msg: Buffer, remoteInfo: RemoteInfo ) => {
        await udpMasterController( msg, remoteInfo )
    });

    return true

};


