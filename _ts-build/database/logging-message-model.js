"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameZoneLogModel = exports.SocialZoneLogModel = exports.TechnologyZoneLogModel = exports.EcologyZoneLogModel = exports.LabZoneLogModel = exports.PipelineZoneLogModel = exports.CabinetZoneLogModel = exports.CoversZoneLogModel = exports.MapZoneLogModel = exports.PortraitsZoneLogModel = void 0;
const mongoose_1 = require("mongoose");
const LoggingMessageSchema = new mongoose_1.Schema({
    ip: { type: String, required: true },
    id: { type: String, required: true },
    command: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
});
const PortraitsZoneLogModel = (0, mongoose_1.model)("Portraits", LoggingMessageSchema);
exports.PortraitsZoneLogModel = PortraitsZoneLogModel;
const MapZoneLogModel = (0, mongoose_1.model)("Map", LoggingMessageSchema);
exports.MapZoneLogModel = MapZoneLogModel;
const CoversZoneLogModel = (0, mongoose_1.model)("Covers", LoggingMessageSchema);
exports.CoversZoneLogModel = CoversZoneLogModel;
const CabinetZoneLogModel = (0, mongoose_1.model)("Cabinet", LoggingMessageSchema);
exports.CabinetZoneLogModel = CabinetZoneLogModel;
const PipelineZoneLogModel = (0, mongoose_1.model)("Pipeline", LoggingMessageSchema);
exports.PipelineZoneLogModel = PipelineZoneLogModel;
const LabZoneLogModel = (0, mongoose_1.model)("Lab", LoggingMessageSchema);
exports.LabZoneLogModel = LabZoneLogModel;
const EcologyZoneLogModel = (0, mongoose_1.model)("Ecology", LoggingMessageSchema);
exports.EcologyZoneLogModel = EcologyZoneLogModel;
const TechnologyZoneLogModel = (0, mongoose_1.model)("Technology", LoggingMessageSchema);
exports.TechnologyZoneLogModel = TechnologyZoneLogModel;
const SocialZoneLogModel = (0, mongoose_1.model)("Social", LoggingMessageSchema);
exports.SocialZoneLogModel = SocialZoneLogModel;
const GameZoneLogModel = (0, mongoose_1.model)("Game", LoggingMessageSchema);
exports.GameZoneLogModel = GameZoneLogModel;
