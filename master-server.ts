import dotenv from "dotenv";
import {startHttpServer} from "./servers/http-server";
import {startUdpServer} from "./servers/udp-server";
import {systemVariables} from "./_environment/environment";

dotenv.config();


try{
    ( async () => {
        //await createMongoDbConnection();
        console.log(systemVariables.IS_DEV);
        console.log(systemVariables.LOCATION);
        await startUdpServer();
        await startHttpServer();
    })();
} catch (err){
    console.log(err)
}