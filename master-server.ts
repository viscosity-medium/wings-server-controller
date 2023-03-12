import { startHttpServer } from "./servers/http-server";
import { startUdpServer } from "./servers/udp-server";


try{
    ( async () => {

        await startUdpServer();
        await startHttpServer();

    })();
} catch (err){
    console.log(err)
}