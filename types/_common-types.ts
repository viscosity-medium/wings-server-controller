import {IGameFadesCommands, IGameScenesCommands} from "./game-types";

interface IProject {
    host: string,
    delayLong: number
    delayShort: number
    idleTime: string
    numberOfFiles: number
}

interface ILab extends IProject {}
interface IGame extends IProject {
    timeStepBetweenHints: number,
    hintDisplayTime: number,
    messageDisplayTime: number,
}
interface ITest extends IProject {}

export enum EInstallationIds {
    Project1 = "Project1" ,
    Project2 = "Project2" ,
    Project3 = "Project3" ,
    Project4 = "Project4",
    Project5 = "Project5",
    Project6 = "Project6",
    Lab = "Lab",
    Game = "Game",

    //test
    Test = "Test",
    TestProject1 = "TestProject1",
    TestProject2 = "TestProject2",
    TestProject3 = "TestProject3",
    TestProject4 = "TestProject4",
    TestProject5 = "TestProject5",
    TestProject6 = "TestProject6",
    TestLab = "TestLab",
    TestGame = "TestGame"
}
export interface IInstallationIds {

    [EInstallationIds.Project1]: IProject,
    [EInstallationIds.Project2]: IProject,
    [EInstallationIds.Project3]: IProject,
    [EInstallationIds.Project4]: IProject,
    [EInstallationIds.Project5]: IProject,
    [EInstallationIds.Project6]: IProject,
    [EInstallationIds.Lab]: ILab,
    [EInstallationIds.Game]: IGame,
    [EInstallationIds.Test]: ITest,
    [EInstallationIds.TestProject1]: IProject,
    [EInstallationIds.TestProject2]: IProject,
    [EInstallationIds.TestProject3]: IProject,
    [EInstallationIds.TestProject4]: IProject,
    [EInstallationIds.TestProject5]: IProject,
    [EInstallationIds.TestProject6]: IProject,
    [EInstallationIds.TestLab]: ILab,
    [EInstallationIds.TestGame]: IGame

}

type TCommandsStandard = "playCommand" | "pauseCommand" |
    "continueCommand" | "stop" |
    "nextMarker" | "previousMarker"

type TCommandReturnFunctionXX = "executeTrigger"


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

