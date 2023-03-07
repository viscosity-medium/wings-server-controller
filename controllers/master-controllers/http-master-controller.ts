import { projectZonesSubController } from "../sub-controllers/project-zones-sub-controller";
import { ISendCommandHttpProps } from "../../types/command-types";
import { Request, Response } from 'express';
import { IStore } from "../../types/store-types";


class HttpMasterController {
    async sendCommand ( req: Request, res: Response ) {

        const {
            id,
            command,
        }: ISendCommandHttpProps = req.body

        const storeId = `installation${ id }` as keyof IStore;

        if( id.match( /Project/ ) ){

            await projectZonesSubController({ id, storeId, command })

        }


        const response = ""
        res.json(response);

    }
    // async switchAnalogControl (req: Request, res: Response) {
    //
    //     const response = await httpServices.switchAnalogControl({...req.body});
    //     res.json(response);
    //
    // }
}
const controller = new HttpMasterController();

export { controller };