import {IGameFadesCommands, IGameScenesCommands} from "./game-types";

interface IProject {
    host: string,
    delayLong: number
    delayShort: number
    idleTime: string
    numberOfFiles: number
}

interface IPortraits extends IProject {}
interface IGame extends IProject {
    timeStepBetweenHints: number,
    hintDisplayTime: number,
    messageDisplayTime: number,
}
interface ITest extends IProject {}

export enum EInstallationIds {
    ProjectPortraits = "ProjectPortraits" ,
    ProjectMap = "ProjectMap" ,
    Project3 = "Project3" ,
    ProjectCovers = "ProjectCovers",
    ProjectCabinet = "ProjectCabinet",
    ProjectPipeline = "ProjectPipeline",
    ProjectLab = "ProjectLab",
    Game = "Game",

    //test
    Test = "Test",
}

export type TInstallationIds = (ip?: string) => IInstallationIds
export interface IInstallationIds {

    [EInstallationIds.ProjectPortraits]: IProject,
    [EInstallationIds.ProjectMap]: IProject,
    [EInstallationIds.Project3]: IProject,
    [EInstallationIds.ProjectCovers]: IProject,
    [EInstallationIds.ProjectCabinet]: IProject,
    [EInstallationIds.ProjectPipeline]: IProject,
    [EInstallationIds.ProjectLab]: IProject,
    [EInstallationIds.Game]: IGame,
    [EInstallationIds.Test]: ITest,


}

export type TCommandsStandard = "play" | "pause" |
    "continuePlay" | "stop" |
    "nextMarker" | "previousMarker"



export type ICommandsToExecute = {
    [key in TCommandsStandard]: {
        commandName: string
        commandAction: string
    }
}  &
{

    executeTrigger: {
        commandName: string
        commandAction: (XX: string) => string
    }

    timeIndicatorPosition: {
        commandName: string
        commandAction: (XX: string, YY: string) => string
    }

    specificGameScene: {
        commandName: string,
        commandAction: ((command: keyof IGameScenesCommands) => string)
    }

    fadeTimeline: {
        commandName: string,
        commandAction: ((command: keyof IGameFadesCommands) => string)
    }
}

