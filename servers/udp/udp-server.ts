import { udpController } from "./controller/udp-controller";
import { RemoteInfo } from "dgram";
import { client } from "../../utilities/udp/dgram-udp-utilities";

export const startUdpServer = async () => {

    await client.on('message', async( msg: Buffer, remoteInfo: RemoteInfo ) => {
        await udpController( msg, remoteInfo )
    });

    return true

};


