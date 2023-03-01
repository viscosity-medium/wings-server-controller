import {IStore} from "./store-types";
import {EGameControlCommand} from "./game-types";

export type TDelayedComeBackToScreensaver = ({host, port, storeId, type}: ICompositeCommandProps)  => void

export interface ISimpleCommandProps {
    host: string
    port: number
    storeId: keyof IStore
    type?: string
    idleTime: string
    delayLong: number,
    delayShort: number,
    commandAction: string
}
interface ICompositeCommandProps {
    storeId: keyof IStore
    host: string
    port: number
    type: string
    delayLong: number,
    delayShort: number,
    idleTime: string
}

type TInstallationId = "Project1" | "Project2" | "Project3" | "Project4" |
    "Project5" | "Project6" | "Lab" | "Game";
export interface ISendCommandHttpProps {
    installationName: string
    installationId: TInstallationId,
    commandName: string
    commandAction: TCommand
    commandType: string
    numberOfFiles: number
}

export interface ISwitchAnalogControllerHttpProps {
    installationName: string
    installationId: TInstallationId
    commandName: string
    commandAction: string
}

export interface IReturnCompositeCommandUtility {
    storeId: keyof IStore,
    host: string, 
    port: number, 
    delayLong: number, 
    delayShort: number, 
    idleTime: string
}

export interface IMiddleProps {
    xIndex: string,  
    yIndex: string, 
    type: "active" | "passive"
}

export type TReturnCompositeCommandUtility = (props: IReturnCompositeCommandUtility) => (props: IMiddleProps) => void

export type TCommand = "Encoder_Right" | "Encoder_Left" |
    "Next" | "Prev" | "Test_Project_R" | "Test_Project_L" | `${number}`;

export interface IDefineIndexToGoUtility {
    command: TCommand | EGameControlCommand,
    storeId: keyof IStore,
    numberOfFiles: string | number
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
export type TKeysOfGameMessagesCommands =
    (keyof IGameAMessagesCommands)
    | (keyof IGameBMessagesCommands)
    | (keyof IGameCMessagesCommands)