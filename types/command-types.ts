import {IStore} from "./store-types";
import {EGameControlCommand} from "./game-types";
import {EInstallationIds} from "./_common-types";

interface IDelayedComebackToScreensaver {
    storeId: keyof IStore
    id: EInstallationIds
    type: string
    idleTime: string
}
export type TDelayedComeBackToScreensaver = ({ storeId, id, type, idleTime }: IDelayedComebackToScreensaver)  => void

export interface ISimpleCommandProps {
    storeId: keyof IStore
    id: EInstallationIds
    host: string
    port: number
    type?: string
    idleTime: string
    commandAction: string
}

export interface ISendCommandHttpProps {
    installationName: string
    installationId: EInstallationIds,
    commandName: string
    commandAction: TCommand
    commandType: string
    numberOfFiles: number
}

export interface ISwitchAnalogControllerHttpProps {
    installationName: string
    installationId: EInstallationIds
    commandName: string
    commandAction: string
}

export interface IReturnCompositeCommandUtility {
    storeId: keyof IStore,
    id: EInstallationIds
}

export interface IMiddleProps {
    xIndex: string,  
    yIndex: string, 
    type: "active" | "passive"
}

export type TReturnCompositeCommandUtility = ({ storeId, id }: IReturnCompositeCommandUtility) => ( { xIndex, yIndex, type }: IMiddleProps) => void

export type TCommand = "Encoder_Right" | "Encoder_Left" |
    "Next" | "Prev" | `${number}`;

export interface IDefineIndexToGoUtility {
    command: TCommand | EGameControlCommand,
    storeId: keyof IStore,
}

export interface IGameAMessagesCommands {
    messageA1FadeIn: string,
    messageA2FadeIn: string,
    messageA3FadeIn: string,
    messageA4FadeIn: string,
    messageA5FadeIn: string,
}

export interface IGameBMessagesCommands {
    messageB1FadeIn: string,
    messageB2FadeIn: string,
    messageB3FadeIn: string,
    messageB4FadeIn: string,
    messageB5FadeIn: string,
}

export interface IGameCMessagesCommands {
    messageC1FadeIn: string,
    messageC2FadeIn: string,
    messageC3FadeIn: string,
    messageC4FadeIn: string,
    messageC5FadeIn: string,
}

export type TGameMessagesCommands = IGameAMessagesCommands | IGameBMessagesCommands | IGameCMessagesCommands;
