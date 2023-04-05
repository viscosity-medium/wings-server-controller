import { installationIds, systemVariables } from "../../_environment/environment";
import { TSendDataToWingsServerOverUdp } from "../../types/websocket-types";
import dgram from 'node:dgram';

const { UDP_PORT } = systemVariables
const client: dgram.Socket = dgram.createSocket("udp4");
client.on("listening", () => { console.log("Udp server is started on port: 9021") })
client.bind( UDP_PORT );
const sendDataToWingsServerOverUdp: TSendDataToWingsServerOverUdp = ({ id, command }) => {

    const { host }  = installationIds[ id ];
    const port = systemVariables.WINGS_PORT;
    const hexCommand: Uint8Array = new Uint8Array( command );
    const client: dgram.Socket = dgram.createSocket( "udp4" );

    client.send( hexCommand, port, host, ()=> { client.close() } );

};

export { 
    client, 
    sendDataToWingsServerOverUdp 
}