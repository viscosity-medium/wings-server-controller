import { Schema, model } from "mongoose";

const LoggingMessageSchema = new Schema({
    ip: {type: String, required: true},
    id: {type: String, required: true},
    command: {type: String, required: true},
    date: {type: String, required: true},
    time: {type: String, required: true},
})

const LoggingMessage = model("LoggingMessage", LoggingMessageSchema)

export {
    LoggingMessage
}