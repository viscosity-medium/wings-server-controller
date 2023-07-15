import {GameControlCommand, GameController} from "./game-types";
import {Store} from "./store-types";
import {AvailableInstallationIds} from "./_common-types";
import {HttpCommandExtended} from "./command-types";

export type ExecuteAsyncTimeOut = (command: number[], timeout: number ) => Promise<void>

export type ReturnAsyncMemoTimeout = ({ id}: { id: AvailableInstallationIds} ) => ExecuteAsyncTimeOut
export type StartIdleTimeOut = (action: () => void, timeout: number ) => ReturnType<typeof setTimeout>
export type ClearTimeOut = (timeOutId: ReturnType<typeof setTimeout> | undefined ) => ReturnType<typeof clearTimeout>
export type MinutesToMilliseconds = (minutes: string ) => number
export type SecondsToMillisecondsSeconds = (minutes: string ) => number

interface ShortThrottleProps {
    id?: AvailableInstallationIds
    command?: GameControlCommand | HttpCommandExtended
}

export type FunctionWithArguments = ({id, command}: ShortThrottleProps) => Promise<void>
export type FunctionWithoutArguments = () => Promise<void>

export interface ThrottlerParams {
    storeId: keyof Store
    functionToExecute: FunctionWithoutArguments | GameController | FunctionWithArguments
    timeout?: number
    id?: AvailableInstallationIds
    command?: GameControlCommand | HttpCommandExtended
}
