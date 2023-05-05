import dotenv from "dotenv";
dotenv.config();
import { startHttpServer } from "./servers/http-server";
import { startUdpServer } from "./servers/udp-server";
import {installationIds} from "./_environment/environment";
import {systemVariables} from "./_environment/environment";


try{
    ( async () => {
        //await createMongoDbConnection();
        console.log(systemVariables.IS_DEV);
        console.log(systemVariables.LOCATION)
        await startUdpServer();
        await startHttpServer();
    })();
} catch (err){
    console.log(err)
}