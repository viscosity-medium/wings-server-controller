import { EGameModes, TInstallationGame } from "./store-types";
import { TExecuteAsyncTimeOut } from "./time-types";
import { EInstallationIds } from "./_common-types";

///////
interface IGameCommand {
    id: EInstallationIds
    command: EGameControlCommand
}
export type TGameController = ({ id, command }: IGameCommand) => void

///////
export interface IGameModeSwitchProps {
    id: EInstallationIds
    command: EGameControlCommand
    A?: boolean
    B?: boolean
    C?: boolean
    D?: boolean
}
export type TGameModeSwitch = ({id, command, A, B, C, D}: IGameModeSwitchProps) => void;
///////
export interface IGameBeginningHintActivator {
    command: EGameControlCommand
    gameState: TInstallationGame
    executeAsyncTimeOut: TExecuteAsyncTimeOut
    hintDisplayTime : number | undefined
    delayLong: number | undefined
    delayShort: number | undefined
}

///////
export interface ITransitionToTheSpecificModeProps {
    id: EInstallationIds
    commandHex6: number[]
    mode: EGameModes
    scene?: number
    cursorPosition?: number
    messageStatus?: 0 | 1
}
///////



export enum EGameControlCommand {

    //encoders

    Encoder_N_LEFT = "Encoder_N_LEFT",
    Encoder_N_RIGHT = "Encoder_N_RIGHT",
    Encoder_I_LEFT = "Encoder_I_LEFT",
    Encoder_I_RIGHT = "Encoder_I_RIGHT",
    Encoder_II_LEFT = "Encoder_II_LEFT",
    Encoder_II_RIGHT = "Encoder_II_RIGHT",
    Encoder_III_LEFT = "Encoder_III_LEFT",
    Encoder_III_RIGHT = "Encoder_III_RIGHT",

    //buttons

    Button_N_A = "Button_N_A",
    Button_N_B = "Button_N_B",
    Button_N_C = "Button_N_C",
    Button_N_D = "Button_N_D",
    Button_I_A = "Button_I_A",
    Button_I_B = "Button_I_B",
    Button_I_C = "Button_I_C",
    Button_II_A = "Button_II_A",
    Button_II_B = "Button_II_B",
    Button_II_C = "Button_II_C",
    Button_III_A = "Button_III_A",
    Button_III_B = "Button_III_B",
    Button_III_C = "Button_III_C",

}


export interface IGameSubControllerProps {
    id: EInstallationIds
    command: EGameControlCommand
    gameState: TInstallationGame
}


export interface IGameScenesCommands {
    goToScreensaver: string,
    goToDemo: string,
    goToMnaModeScene1: string,
    goToMnaModeScene2: string,
    goToMnaModeScene3: string,
    goToMnaModeScene4: string,
    goToMnaModeScene5Final1: string,
    goToMnaModeScene6Final2: string,
    goToMnaModeScene7Final3: string,
    goToSodModeScene1: string,
    goToSodModeScene2: string,
    goToSodModeScene3: string,
    goToSodModeScene4: string,
    goToSodModeScene5Final: string,
    goToLoopingModeScene1: string,
    goToLoopingModeScene2: string,
    goToLoopingModeScene3: string,
    goToLoopingModeScene4Final: string


}

export interface IGameFadesCommands {
    mainTimelineFadeIn: string,
    mainTimelineFadeOut: string,

    hintFadeInScreensaverAndDemoMode: string,
    hintFadeOutScreensaverAndDemoMode: string,

    cursorPosition1FadeIn: string,
    cursorPosition2FadeIn: string,
    cursorPosition3FadeIn: string,
    cursorPosition4FadeIn: string,
    cursorPosition5FadeIn: string,
    allCursorPositionsFadeOut: string,

    hint1FadeIn: string,
    hint2FadeIn: string,
    hint3FadeIn: string,
    hint4FadeIn: string,
    allHintsFadeOut: string,

    allMessagesFadeOut: string,
}