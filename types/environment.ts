import {EStoreKeys} from "./store-types";

declare global {

    namespace NodeJS {
        interface ProcessEnv {
          BASE_URL: string
          WINGS_PORT: string
          // HTTP_PORT: string
          // INSTALLATION_ID_1: string
          // INSTALLATION_ID_2: string
          // INSTALLATION_ID_3: string
          // DELAY_TIME_LONG: string
          // DELAY_TIME_SHORT: string
          // IDLE_TIME: string
        }
    }
}
export {}