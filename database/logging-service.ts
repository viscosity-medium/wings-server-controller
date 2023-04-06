import mongoose from "mongoose";
import {
    CabinetZoneLogModel,
    CoversZoneLogModel, EcologyZoneLogModel, GameZoneLogModel, LabZoneLogModel,
    LoggingMessage,
    MapZoneLogModel, PipelineZoneLogModel,
    PortraitsZoneLogModel, SocialZoneLogModel, TechnologyZoneLogModel
} from "./logging-message-model";
import {LogDataToDb} from "../types/db-types";
import {systemVariables} from "../_environment/environment";
import {EInstallationIds} from "../types/_common-types";

const {
    DB_ADMIN_NAME,
    DB_ADMIN_PASSWORD,
    DB_HOST, DB_PORT, DB_NAME
} = systemVariables;


const createMongoDbConnection = async () => {

    const mongoDbConnectionLink = `mongodb://${DB_ADMIN_NAME}:${encodeURIComponent(DB_ADMIN_PASSWORD)}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
    const mongodbConfig = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    };

    try {

        await mongoose.connect( mongoDbConnectionLink )
        .then(() => console.log('Connection with mongoDB is established'));

    } catch (error){
        console.log(error)
    }

}

const defineModelAndSaveData: LogDataToDb = async ({
    ip, id,
    command,
}) => {

    const date = new Date().toLocaleDateString();
    const time = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}:${new Date().getMilliseconds()}`

    if(id === EInstallationIds.ProjectPortraits) {

        await PortraitsZoneLogModel.create({
            ip, id,
            command,
            date, time
        })

    } else if(id === EInstallationIds.ProjectMap) {

        await MapZoneLogModel.create({
            ip, id,
            command,
            date, time
        })

    } else if(id === EInstallationIds.ProjectCovers) {

        await CoversZoneLogModel.create({
            ip, id,
            command,
            date, time
        })

    } else if(id === EInstallationIds.ProjectCabinet) {

        await CabinetZoneLogModel.create({
            ip, id,
            command,
            date, time
        })

    } else if(id === EInstallationIds.ProjectPipeline) {

        await PipelineZoneLogModel.create({
            ip, id,
            command,
            date, time
        })

    } else if(id === EInstallationIds.ProjectLab) {

        await LabZoneLogModel.create({
            ip, id,
            command,
            date, time
        })

    } else if(id === EInstallationIds.ProjectTankEcology) {

        await EcologyZoneLogModel.create({
            ip, id,
            command,
            date, time
        })

    } else if(id === EInstallationIds.ProjectTankTechnology) {

        await TechnologyZoneLogModel.create({
            ip, id,
            command,
            date, time
        })

    } else if(id === EInstallationIds.ProjectTankSocial) {

        await SocialZoneLogModel.create({
            ip, id,
            command,
            date, time
        })

    } else if(id === EInstallationIds.Game) {

        await GameZoneLogModel.create({
            ip, id,
            command,
            date, time
        })

    }
}

const logDataToMongoDb: LogDataToDb = async ({
    store,
    storeId,
    ip, id,
    command,
}) => {
    if (!store[storeId].isThrottled) {

        const time = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}:${new Date().getMilliseconds()}`

        console.log(`___\n  Ip: ${ ip }\n  Id: ${ id }\n  Command: ${ command }\n  Time: ${ time }\n____`)

        await defineModelAndSaveData({
            store, storeId, id, ip, command
        })
    }

}


export {
    createMongoDbConnection,
    logDataToMongoDb
}
