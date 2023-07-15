import { projectZonesSubController } from "../sub-controllers/project-zones-sub-controller";
import { SendCommandHttpProps } from "../../types/command-types";
import { StoreKeys, Store } from "../../types/store-types";
import { Request, Response } from 'express';
import { gameSubController } from "../sub-controllers/game-sub-controller";
import { AvailableInstallationIds } from "../../types/_common-types";
import { store } from "../../store/store";

import {logDataToMongoDb} from "../../database/logging-service";
import {throttlerFunction} from "../../utilities/time-utilities";


class HttpMasterController {
    async sendCommand ( req: Request, res: Response ) {

        const {
            id,
            command,
        }: SendCommandHttpProps = req.body;

        const storeId = `installation${ id }` as keyof Store;

        logDataToMongoDb({ store, storeId, id, ip: "Guide's tablet", command });

        if( id.match( /Project/ ) ){

            await projectZonesSubController({ id, storeId, command });

        } else if( ( id.match( /Game/ ) ) && !store["installationGame"].isThrottled ) {

            const functionToExecute = gameSubController;

            const timeout = 500

            await throttlerFunction({
                storeId,
                id,
                command,
                functionToExecute,
                timeout
            });

        }

        const response = "";
        res.json( response );

    }

    async sendGameControlCommand (req: Request, res: Response) {

        const id = AvailableInstallationIds.Game;
        const storeId = StoreKeys.installationGame
        const { command } = req.body;
        await gameSubController({ id, command });

        logDataToMongoDb({
            store, storeId,
            id, ip: "Guide's tablet",
            command,
        });

        res.json({
            mode: store[StoreKeys.installationGame].mode,
            scene: store[StoreKeys.installationGame].scene,
            cursorPosition: store[StoreKeys.installationGame].cursorPosition,
            maxCursorPositions: store[StoreKeys.installationGame].maxCursorPositions,
            command
        });
    }

}
const controller = new HttpMasterController();

export { controller };