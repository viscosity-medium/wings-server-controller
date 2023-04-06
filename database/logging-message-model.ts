import { Schema, model } from "mongoose";

const LoggingMessageSchema = new Schema({
    ip: {type: String, required: true},
    id: {type: String, required: true},
    command: {type: String, required: true},
    date: {type: String, required: true},
    time: {type: String, required: true},
})

const LoggingMessage = model("LoggingMessage", LoggingMessageSchema);

const PortraitsZoneLogModel = model("Portraits", LoggingMessageSchema);
const MapZoneLogModel = model("Map", LoggingMessageSchema);
const CoversZoneLogModel = model("Covers", LoggingMessageSchema);
const CabinetZoneLogModel = model("Cabinet", LoggingMessageSchema);
const PipelineZoneLogModel = model("Pipeline", LoggingMessageSchema);
const LabZoneLogModel = model("Lab", LoggingMessageSchema);
const EcologyZoneLogModel = model("Ecology", LoggingMessageSchema);
const TechnologyZoneLogModel = model("Technology", LoggingMessageSchema);
const SocialZoneLogModel = model("Social", LoggingMessageSchema);
const GameZoneLogModel = model("Game", LoggingMessageSchema);


export {
    LoggingMessage,
    PortraitsZoneLogModel,
    MapZoneLogModel,
    CoversZoneLogModel,
    CabinetZoneLogModel,
    PipelineZoneLogModel,
    LabZoneLogModel,
    EcologyZoneLogModel,
    TechnologyZoneLogModel,
    SocialZoneLogModel,
    GameZoneLogModel
}