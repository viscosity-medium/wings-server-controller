import { EGameControlCommand } from "./game-types";
import { EInstallationIds } from "./_common-types";
import { THttpCommand } from "./command-types";
import { IStore } from "./store-types";

export interface LogDataToMongoDbProps {
    store: IStore
    storeId: keyof IStore
    ip: string
    id: EInstallationIds
    command: EGameControlCommand | THttpCommand
}

export type LogDataToDb = (props: LogDataToMongoDbProps) => void