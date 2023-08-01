import { GameControlCommand } from "./game-types";
import { AvailableInstallationIds } from "./_common-types";
import { Store } from "./store-types";

interface DelayedComebackToScreensaver {
    storeId: keyof Store
    id: AvailableInstallationIds
    type: string
    idleTime: string
}
export type DelayedComeBackToScreensaver = ({ storeId, id, type, idleTime }: DelayedComebackToScreensaver)  => void


export interface SendCommandHttpProps {
    id: AvailableInstallationIds,
    command: HttpCommandExtended
}

export interface ReturnCompositeCommandProps {
    storeId: keyof Store,
    id: AvailableInstallationIds
}

export interface MiddleProps {
    xIndex: string,  
    yIndex: string, 
    type: "active" | "passive"
}

export type ReturnCompositeCommandUtility = ({ storeId, id }: ReturnCompositeCommandProps) => ({ xIndex, yIndex, type }: MiddleProps) => void

export enum HttpCommands {

    Pause = "Pause",
    ContinuePlay = "ContinuePlay",
    Next = "Next",
    Prev = "Prev",
    HideImages = "HideImages",
    GoToScreensaver = "GoToScreensaver"

}

export enum VolumeCommands {

    Volume0 = "Volume0",
    Volume25 = "Volume25",
    Volume50 = "Volume50",
    Volume75 = "Volume75",
    Volume100 = "Volume100"

}

export enum UdpProjectCommands {

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
    Test_Game_L = "Test_Game_L",

}

export type HttpCommandExtended = HttpCommands | `${number}`;

export interface DefineIndexToGoUtility {
    command: HttpCommandExtended | GameControlCommand | UdpProjectCommands,
    storeId: keyof Store,
}

export interface GameAMessagesCommands {
    messageA1FadeIn: string,
    messageA2FadeIn: string,
    messageA3FadeIn: string,
    messageA4FadeIn: string,
    messageA5FadeIn: string,
}

export interface GameBMessagesCommands {
    messageB1FadeIn: string,
    messageB2FadeIn: string,
    messageB3FadeIn: string,
    messageB4FadeIn: string,
    messageB5FadeIn: string,
}

export interface GameCMessagesCommands {
    messageC1FadeIn: string,
    messageC2FadeIn: string,
    messageC3FadeIn: string,
    messageC4FadeIn: string,
    messageC5FadeIn: string,
}

export type GameMessagesCommands = GameAMessagesCommands | GameBMessagesCommands | GameCMessagesCommands;
