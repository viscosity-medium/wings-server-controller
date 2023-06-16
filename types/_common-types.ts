import {IGameFadesCommands, IGameScenesCommands} from "./game-types";

interface IProject {
    host: string,
    delayLong: number
    delayShort: number
    idleTime: string
    numberOfFiles: number
}


interface IGame extends IProject {
    timeStepBetweenHints: number,
    hintDisplayTime: number,
    messageDisplayTime: number,
}

export enum EInstallationIds {
    ProjectPortraits = "ProjectPortraits" ,
    ProjectMap = "ProjectMap" ,
    ProjectCovers = "ProjectCovers",
    ProjectCabinet = "ProjectCabinet",
    ProjectPipeline = "ProjectPipeline",
    ProjectLab = "ProjectLab",
    ProjectTankEcology = "ProjectTankEcology",
    ProjectTankTechnology = "ProjectTankTechnology",
    ProjectTankSocial = "ProjectTankSocial",
    ProjectEntryGroup = "ProjectEntryGroup",
    Game = "Game",
}

export interface IInstallationIds {

    [EInstallationIds.ProjectPortraits]: IProject,
    [EInstallationIds.ProjectMap]: IProject,
    [EInstallationIds.ProjectCovers]: IProject,
    [EInstallationIds.ProjectCabinet]: IProject,
    [EInstallationIds.ProjectPipeline]: IProject,
    [EInstallationIds.ProjectLab]: IProject,
    [EInstallationIds.ProjectTankEcology]: IProject,
    [EInstallationIds.ProjectTankTechnology]: IProject,
    [EInstallationIds.ProjectTankSocial]: IProject,
    [EInstallationIds.ProjectEntryGroup]: IProject,
    [EInstallationIds.Game]: IGame,

}

export type TCommandsStandard = "Play" | "Pause" |
    "ContinuePlay" | "Stop" |
    "NextMarker" | "PreviousMarker" | "HideImages"

export type ShortCode = "0B" | "0C" | "0E" | "0F" |
    "10" | "11" | "12" | "13" | "14" | "15" | "16"


export type TCommandsToExecute = {
    [key in TCommandsStandard]: string
}  &
{

    ExecuteTrigger: (XX: string) => string

    TimeIndicatorPosition: (XX: string, YY: string) => string

    SendShortCode: (XX: any) => any

    SpecificGameScene: (command: keyof IGameScenesCommands) => string

    FadeTimeline: (command: keyof IGameFadesCommands) => string

}



