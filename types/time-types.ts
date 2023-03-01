import {IStore} from "./store-types";

export type TExecuteAsyncTimeOut = ( command: number[], timeout: number ) => Promise<void>

export type TDelayedSwitchOffLabMicroscope = (
    executeAsyncTimeOut: TExecuteAsyncTimeOut,
    storeId: keyof IStore,
    commandHex2: number[],
    delayLong: number,
    idleTime: string
) => void
export type TReturnAsyncMemoTimeout = ( {host, port}: {host: string, port: number} ) => TExecuteAsyncTimeOut
export type TStartIdleTimeOut = ( action: () => void, timeout: number ) => ReturnType<typeof setTimeout>
export type TClearTimeOut = ( timeOutId: ReturnType<typeof setTimeout> ) => ReturnType<typeof clearTimeout>
export type TMinutesToMilliseconds = (minutes: string ) => number
export type TSecondsToMillisecondsSeconds = (minutes: string ) => number