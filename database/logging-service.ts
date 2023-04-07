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
import { EInstallationIds } from "../types/_common-types";

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
    if ( !store[storeId].isThrottled ) {

        const date = new Date().toLocaleDateString();
        const time = `${ new Date().getHours() }:${ new Date().getMinutes() 
        }:${ new Date().getSeconds() }:${ new Date().getMilliseconds() }`;

        const mapIdsWithModels = new Map([

            [EInstallationIds.ProjectPortraits, PortraitsZoneLogModel],
            [EInstallationIds.ProjectMap, MapZoneLogModel],
            [EInstallationIds.ProjectCovers, CoversZoneLogModel],
            [EInstallationIds.ProjectCabinet, CabinetZoneLogModel],
            [EInstallationIds.ProjectPipeline, PipelineZoneLogModel],
            [EInstallationIds.ProjectLab, LabZoneLogModel],
            [EInstallationIds.ProjectTankEcology, EcologyZoneLogModel],
            [EInstallationIds.ProjectTankTechnology, TechnologyZoneLogModel],
            [EInstallationIds.ProjectTankSocial, SocialZoneLogModel],
            [EInstallationIds.Game, GameZoneLogModel]

        ]);

        for (const arrayItem of mapIdsWithModels ) {

            if(id === arrayItem[0]){
                await arrayItem[1].create({
                    ip, id,
                    command,
                    date, time
                })
            }

        }

        console.log( `___\n  Ip: ${ ip }\n  Id: ${ id }\n  Command: ${ command }\n  Time: ${ time }\n____` );

    }

}


export {
    createMongoDbConnection,
    logDataToMongoDb
}
