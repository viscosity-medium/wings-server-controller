import { GameControlCommand } from "./game-types";
import { AvailableInstallationIds } from "./_common-types";
import { HttpCommandExtended } from "./command-types";
import { Store } from "./store-types";

export interface LogDataToMongoDbProps {
    store: Store
    storeId: keyof Store
    ip: string
    id: AvailableInstallationIds
    command: GameControlCommand | HttpCommandExtended
}

export type LogDataToDb = (props: LogDataToMongoDbProps) => void