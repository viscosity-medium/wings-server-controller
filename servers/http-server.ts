import { systemVariables } from "../_environment/environment";
import { httpRouter } from "../routers/http-router";
import express from "express";
import cors from "cors";
import http from "http";

const rootPath = process.cwd();
const { HTTP_PORT=9019 } = systemVariables;
const app = express();
const httpServer = http.createServer(app);

app.use(express.json({limit: '25mb'}));
app.use(express.static(rootPath));
app.use(cors({
    credentials: true,
}));
app.use("/", httpRouter);

export const startHttpServer = async () => {

    try {

        await httpServer.listen( HTTP_PORT, () => {
            console.log(`Http server is started on port: ${HTTP_PORT}`)
        });

        return true
    } catch (err) {
        console.log(err)
    }

}