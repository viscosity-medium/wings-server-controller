import { GameModes, InstallationGame } from "./store-types";
import { ExecuteAsyncTimeOut } from "./time-types";
import { AvailableInstallationIds } from "./_common-types";

///////
interface GameCommandProps {
    id: AvailableInstallationIds
    command: GameControlCommand
}
export type GameController = ({ id, command }: GameCommandProps) => void

///////
export interface GameModeSwitchProps {
    id: AvailableInstallationIds
    command: GameControlCommand
    N?: boolean
    A?: boolean
    B?: boolean
    C?: boolean
    D?: boolean
}
export type GameModeSwitch = ({id, command, A, B, C, D}: GameModeSwitchProps) => void;

///////
export interface TransitionToTheSpecificModeProps {
    id: AvailableInstallationIds
    commandHex6: number[]
    mode: GameModes
    scene?: number
    cursorPosition?: number
    messageStatus?: 0 | 1
}
///////



export enum GameControlCommand {

    //encoders
    //mode encoders commands
    Encoder_N_LEFT = "Encoder_N_LEFT",
    Encoder_N_RIGHT = "Encoder_N_RIGHT",
    //mna encoders commands
    Encoder_I_LEFT = "Encoder_I_LEFT",
    Encoder_I_RIGHT = "Encoder_I_RIGHT",
    //sod encoders commands
    Encoder_II_LEFT = "Encoder_II_LEFT",
    Encoder_II_RIGHT = "Encoder_II_RIGHT",
    //looping encoders commands
    Encoder_III_LEFT = "Encoder_III_LEFT",
    Encoder_III_RIGHT = "Encoder_III_RIGHT",

    //buttons
    //mode button commands
    Button_N_N = "Button_N_N",
    Button_N_A = "Button_N_A",
    Button_N_B = "Button_N_B",
    Button_N_C = "Button_N_C",
    Button_N_D = "Button_N_D",
    //mna button commands
    Button_I_A = "Button_I_A",
    Button_I_B = "Button_I_B",
    Button_I_C = "Button_I_C",
    //sod button commands
    Button_II_A = "Button_II_A",
    Button_II_B = "Button_II_B",
    Button_II_C = "Button_II_C",
    //looping button commands
    Button_III_A = "Button_III_A",
    Button_III_B = "Button_III_B",
    Button_III_C = "Button_III_C",

}


export interface GameSubControllerProps {
    id: AvailableInstallationIds
    command: GameControlCommand
    gameState: InstallationGame
}


export interface GameScenesCommands {
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

export interface GameFadesCommands {
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