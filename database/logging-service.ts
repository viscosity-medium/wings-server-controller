import mongoose from "mongoose";
import { LoggingMessage } from "./logging-message-model";
import { LogDataToDb } from "../types/db-types";

mongoose.connect('mongodb://127.0.0.1:27017/transneft-museum')
    .then(() => console.log('Connected!'));

const logDataToDb: LogDataToDb = async ({
    ip, id,
    command,
    date, time
}) => {

    const loggingMessage = await LoggingMessage.create({
        ip, id,
        command,
        date, time
    })
}