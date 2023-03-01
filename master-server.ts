//import { startSerialServer } from "./servers/serial/serial-server";
import { startHttpServer } from "./servers/http/http-server";
import { startUdpServer } from "./servers/udp/udp-server";

try{
    ( async () => {

        await startUdpServer();
        await startHttpServer();
        //await  startSerialServer();

    })();
} catch (err){
    console.log(err)
}