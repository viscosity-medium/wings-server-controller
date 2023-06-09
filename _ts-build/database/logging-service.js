"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logDataToMongoDb = exports.createMongoDbConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const logging_message_model_1 = require("./logging-message-model");
const environment_1 = require("../_environment/environment");
const _common_types_1 = require("../types/_common-types");
const { DB_ADMIN_NAME, DB_ADMIN_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = environment_1.systemVariables;
const createMongoDbConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    const mongoDbConnectionLink = `mongodb://${DB_ADMIN_NAME}:${encodeURIComponent(DB_ADMIN_PASSWORD)}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
    try {
        yield mongoose_1.default.connect(mongoDbConnectionLink)
            .then(() => console.log('Connection with mongoDB is established'));
    }
    catch (error) {
        console.log(error);
    }
});
exports.createMongoDbConnection = createMongoDbConnection;
const logDataToMongoDb = ({ store, storeId, ip, id, command, }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!store[storeId].isThrottled) {
        const date = new Date().toLocaleDateString();
        const time = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}:${new Date().getMilliseconds()}`;
        const mapIdsWithModels = new Map([
            [_common_types_1.EInstallationIds.ProjectPortraits, logging_message_model_1.PortraitsZoneLogModel],
            [_common_types_1.EInstallationIds.ProjectMap, logging_message_model_1.MapZoneLogModel],
            [_common_types_1.EInstallationIds.ProjectCovers, logging_message_model_1.CoversZoneLogModel],
            [_common_types_1.EInstallationIds.ProjectCabinet, logging_message_model_1.CabinetZoneLogModel],
            [_common_types_1.EInstallationIds.ProjectPipeline, logging_message_model_1.PipelineZoneLogModel],
            [_common_types_1.EInstallationIds.ProjectLab, logging_message_model_1.LabZoneLogModel],
            [_common_types_1.EInstallationIds.ProjectTankEcology, logging_message_model_1.EcologyZoneLogModel],
            [_common_types_1.EInstallationIds.ProjectTankTechnology, logging_message_model_1.TechnologyZoneLogModel],
            [_common_types_1.EInstallationIds.ProjectTankSocial, logging_message_model_1.SocialZoneLogModel],
            [_common_types_1.EInstallationIds.Game, logging_message_model_1.GameZoneLogModel]
        ]);
        for (const arrayItem of mapIdsWithModels) {
            if (id === arrayItem[0]) {
                // await arrayItem[1].create({
                //     ip, id,
                //     command,
                //     date, time
                // })
            }
        }
        console.log(`___\n  Ip: ${ip}\n  Id: ${id}\n  Command: ${command}\n  Time: ${time}\n____`);
    }
});
exports.logDataToMongoDb = logDataToMongoDb;
