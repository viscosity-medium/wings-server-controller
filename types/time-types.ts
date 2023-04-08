import {EGameControlCommand, TGameController} from "./game-types";
import {IStore} from "./store-types";
import {EInstallationIds} from "./_common-types";

export type TExecuteAsyncTimeOut = ( command: number[], timeout: number ) => Promise<void>

export type TDelayedSwitchOffLabMicroscope = (
    executeAsyncTimeOut: TExecuteAsyncTimeOut,
    storeId: keyof IStore,
    commandHex2: number[],
    delayLong: number,
    idleTime: string
) => void
export type TReturnAsyncMemoTimeout = ( { id}: { id: EInstallationIds} ) => TExecuteAsyncTimeOut
export type TStartIdleTimeOut = ( action: () => void, timeout: number ) => ReturnType<typeof setTimeout>
export type TClearTimeOut = ( timeOutId: ReturnType<typeof setTimeout> | undefined ) => ReturnType<typeof clearTimeout>
export type TMinutesToMilliseconds = (minutes: string ) => number
export type TSecondsToMillisecondsSeconds = (minutes: string ) => number

interface ShortThrottleProps {
    id?: EInstallationIds
    command?: EGameControlCommand
}

export type FunctionWithArguments = ({id, command}: ShortThrottleProps) => Promise<void>
export type FunctionWithoutArguments = () => Promise<void>

export interface ThrottlerParams {
    storeId: keyof IStore
    functionToExecute: FunctionWithoutArguments | TGameController | FunctionWithArguments
    timeout?: number
    id?: EInstallationIds
    command?: EGameControlCommand
}

export type ThrottlerFunction = ({timeout, storeId, functionToExecute}:ThrottlerParams) => Promise<void>