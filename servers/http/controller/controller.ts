import  { Request, Response } from 'express';
import { httpServices } from "../services/http-services";

class Controller {
    async sendCommand (req: Request, res: Response) {

        const response = await httpServices.sendCommand({ ...req.body });
        res.json(response);

    }
    async switchAnalogControl (req: Request, res: Response) {

        const response = await httpServices.switchAnalogControl({...req.body});
        res.json(response);

    }
}
const controller = new Controller();

export { controller };