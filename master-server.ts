import dotenv from "dotenv";
import {startHttpServer} from "./servers/http-server";
import {startUdpServer} from "./servers/udp-server";
import {systemVariables} from "./_environment/environment";

dotenv.config();


try{
    ( async () => {
        //await createMongoDbConnection();

        console.log(`Mode: ${systemVariables.NODE_MODE}`);
        console.log(`Location: ${systemVariables.LOCATION}`);

        await startUdpServer();
        await startHttpServer();

    })();
} catch (err){
    console.log(err)
}