import mongoose from "mongoose";
import {
    CabinetZoneLogModel, CoversZoneLogModel,
    EcologyZoneLogModel, GameZoneLogModel,
    LabZoneLogModel, MapZoneLogModel,
    PipelineZoneLogModel, PortraitsZoneLogModel,
    SocialZoneLogModel, TechnologyZoneLogModel
} from "./logging-message-model";
import { LogDataToDb } from "../types/db-types";
import { systemVariables } from "../_environment/environment";
import { AvailableInstallationIds } from "../types/_common-types";

const {
    DB_ADMIN_NAME,
    DB_ADMIN_PASSWORD,
    DB_HOST, DB_PORT, DB_NAME
} = systemVariables;


const createMongoDbConnection = async () => {

    const mongoDbConnectionLink = `mongodb://${DB_ADMIN_NAME}:${encodeURIComponent(DB_ADMIN_PASSWORD)}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

    try {

        await mongoose.connect( mongoDbConnectionLink )
        .then(() => console.log('Connection with mongoDB is established'));

    } catch (error){
        console.log(error)
    }

}


const logDataToMongoDb: LogDataToDb = async ({
    store,
    storeId,
    ip, id,
    command,
}) => {

    if ( !store[storeId]?.isThrottled ) {

        const date = new Date().toLocaleDateString();
        const time = `${ new Date().getHours() }:${ new Date().getMinutes() 
        }:${ new Date().getSeconds() }:${ new Date().getMilliseconds() }`;

        const mapIdsWithModels = new Map([

            [AvailableInstallationIds.ProjectPortraits, PortraitsZoneLogModel],
            [AvailableInstallationIds.ProjectMap, MapZoneLogModel],
            [AvailableInstallationIds.ProjectCovers, CoversZoneLogModel],
            [AvailableInstallationIds.ProjectCabinet, CabinetZoneLogModel],
            [AvailableInstallationIds.ProjectPipeline, PipelineZoneLogModel],
            [AvailableInstallationIds.ProjectLab, LabZoneLogModel],
            [AvailableInstallationIds.ProjectTankEcology, EcologyZoneLogModel],
            [AvailableInstallationIds.ProjectTankTechnology, TechnologyZoneLogModel],
            [AvailableInstallationIds.ProjectTankSocial, SocialZoneLogModel],
            [AvailableInstallationIds.Game, GameZoneLogModel]

        ]);

        for (const arrayItem of mapIdsWithModels ) {

            if(id === arrayItem[0]){
                // await arrayItem[1].create({
                //     ip, id,
                //     command,
                //     date, time
                // })
            }

        }

        console.log( `___\n  Ip: ${ ip }\n  Id: ${ id }\n  Command: ${ command }\n  Time: ${ time }\n____` );

    }

}


export {
    createMongoDbConnection,
    logDataToMongoDb
}
