import { startHttpServer } from "./servers/http-server";
import { startUdpServer } from "./servers/udp-server";
import {createMongoDbConnection} from "./database/logging-service";


try{
    ( async () => {
        await createMongoDbConnection();
        await startUdpServer();
        await startHttpServer();

    })();
} catch (err){
    console.log(err)
}