import dotenv from "dotenv";
dotenv.config();
import { startHttpServer } from "./servers/http-server";
import { startUdpServer } from "./servers/udp-server";


try{
    ( async () => {
        //await createMongoDbConnection();
        await startUdpServer();
        await startHttpServer();
    })();
} catch (err){
    console.log(err)
}