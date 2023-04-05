import {store} from "../store/store";
import { EGameControlCommand } from "../types/game-types";
import {EStoreKeys, IStore} from "../types/store-types";
import {EInstallationIds} from "../types/_common-types";

interface Logging {
    store: IStore
    storeId: keyof IStore
    ip: string
    id: EInstallationIds
    command:  EGameControlCommand
}

const loggingFunction = ({ store, storeId, ip, id, command }: Logging) => {
    if(!store[storeId].isThrottled){

        console.log(`___\n  Ip: ${ip}\n  Id: ${id}\n  Command: ${command}\n  Time: ${ new Date().getHours() }:${new Date().getMinutes()}:${new Date().getSeconds()}:${new Date().getMilliseconds()}\n____`)

    }
}

export { loggingFunction }