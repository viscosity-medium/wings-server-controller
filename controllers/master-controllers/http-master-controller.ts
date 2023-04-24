import { projectZonesSubController } from "../sub-controllers/project-zones-sub-controller";
import { ISendCommandHttpProps } from "../../types/command-types";
import { EStoreKeys, IStore } from "../../types/store-types";
import { Request, Response } from 'express';
import { gameSubController } from "../sub-controllers/game-sub-controller";
import { EInstallationIds } from "../../types/_common-types";
import { store } from "../../store/store";

import {logDataToMongoDb} from "../../database/logging-service";


class HttpMasterController {
    async sendCommand ( req: Request, res: Response ) {

        const {
            id,
            command,
        }: ISendCommandHttpProps = req.body;

        const storeId = `installation${ id }` as keyof IStore;

        logDataToMongoDb({ store, storeId, id, ip: "Guide's tablet", command });

        if( id.match( /Project/ ) ){

            await projectZonesSubController({ id, storeId, command });

        }

        const response = "";
        res.json( response );

    }

    async sendGameControlCommand (req: Request, res: Response) {

        const id = EInstallationIds.Game;
        const storeId = EStoreKeys.installationGame
        const { command } = req.body;
        await gameSubController({ id, command });

        logDataToMongoDb({
            store, storeId,
            id, ip: "Guide's tablet",
            command,
        });

        res.json({
            mode: store[EStoreKeys.installationGame].mode,
            scene: store[EStoreKeys.installationGame].scene,
            cursorPosition: store[EStoreKeys.installationGame].cursorPosition,
            maxCursorPositions: store[EStoreKeys.installationGame].maxCursorPositions,
            command
        });
    }

}
const controller = new HttpMasterController();

export { controller };