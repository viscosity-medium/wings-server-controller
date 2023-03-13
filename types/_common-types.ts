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
    Game = "Game",

    //test
    Test = "Test",
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
    [EInstallationIds.Game]: IGame,
    [EInstallationIds.Test]: IProject,


}

export type TCommandsStandard = "Play" | "Pause" |
    "ContinuePlay" | "Stop" |
    "NextMarker" | "PreviousMarker"


export type TCommandsToExecute = {
    [key in TCommandsStandard]: string
}  &
{

    ExecuteTrigger: (XX: string) => string

    TimeIndicatorPosition: (XX: string, YY: string) => string

    SpecificGameScene: (command: keyof IGameScenesCommands) => string

    FadeTimeline: (command: keyof IGameFadesCommands) => string

}



