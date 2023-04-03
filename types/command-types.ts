import { EGameControlCommand } from "./game-types";
import { EInstallationIds } from "./_common-types";
import { IStore } from "./store-types";

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
    type?: string
    idleTime: string
    commandAction: string
}

export interface ISendCommandHttpProps {
    id: EInstallationIds,
    command: THttpCommand
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

export enum EHttpCommands {

    Pause = "Pause",
    ContinuePlay = "ContinuePlay",
    Next = "Next",
    Prev = "Prev",
    HideImages = "HideImages",

}

export enum EUdpProjectCommands {

    // right
    Encoder_Right = "Encoder_Right",
    Test_Portraits_R = "Test_Portraits_R",
    Test_Map_R = "Test_Map_R",
    Test_Covers_R = "Test_Covers_R",
    Test_Cabinet_R = "Test_Cabinet_R",
    Test_Pipeline_R = "Test_Pipeline_R",
    Test_Lab_R = "Test_Lab_R",
    Test_Game_R = "Test_Game_R",

    // left
    Encoder_Left = "Encoder_Left",
    Test_Portraits_L = "Test_Portraits_L",
    Test_Map_L = "Test_Map_L",
    Test_Covers_L = "Test_Covers_L",
    Test_Cabinet_L = "Test_Cabinet_L",
    Test_Pipeline_L = "Test_Pipeline_L",
    Test_Lab_L = "Test_Lab_L",
    Test_Game_L = "Test_Game_L"
}

export type THttpCommand = EHttpCommands | `${number}`;

export interface IDefineIndexToGoUtility {
    command: THttpCommand | EGameControlCommand | EUdpProjectCommands,
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
