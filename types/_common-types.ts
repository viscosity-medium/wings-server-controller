import {GameFadesCommands, GameScenesCommands} from "./game-types";

interface Project {
    host: string,
    delayLong: number
    delayShort: number
    idleTime: string
    numberOfFiles: number
}


interface Game extends Project {
    timeStepBetweenHints: number,
    hintDisplayTime: number,
    messageDisplayTime: number,
}

export enum AvailableInstallationIds {
    ProjectPortraits = "ProjectPortraits" ,
    ProjectMap = "ProjectMap" ,
    ProjectCovers = "ProjectCovers",
    ProjectCabinet = "ProjectCabinet",
    ProjectPipeline = "ProjectPipeline",
    ProjectLab = "ProjectLab",
    ProjectTankEcology = "ProjectTankEcology",
    ProjectTankTechnology = "ProjectTankTechnology",
    ProjectTankSocial = "ProjectTankSocial",
    ProjectEntryGroup2 = "ProjectEntryGroup2",
    Game = "Game",
}

export interface InstallationIds {

    [AvailableInstallationIds.ProjectPortraits]: Project,
    [AvailableInstallationIds.ProjectMap]: Project,
    [AvailableInstallationIds.ProjectCovers]: Project,
    [AvailableInstallationIds.ProjectCabinet]: Project,
    [AvailableInstallationIds.ProjectPipeline]: Project,
    [AvailableInstallationIds.ProjectLab]: Project,
    [AvailableInstallationIds.ProjectTankEcology]: Project,
    [AvailableInstallationIds.ProjectTankTechnology]: Project,
    [AvailableInstallationIds.ProjectTankSocial]: Project,
    [AvailableInstallationIds.ProjectEntryGroup2]: Project,
    [AvailableInstallationIds.Game]: Game,

}

export type CommandsStandard = (
    "Play" | "Pause" | "ContinuePlay" | "Stop" |
    "NextMarker" | "PreviousMarker" | "HideImages" |
    "Volume0" | "Volume25" | "Volume50" | "Volume75" | "Volume100"
);


export type CommandsToExecute = {
    [key in CommandsStandard]: string
}  &
{

    ExecuteTrigger: (XX: string) => string

    TimeIndicatorPosition: (XX: string, YY: string) => string

    SendShortCode: (XX: any) => any

    SpecificGameScene: (command: keyof GameScenesCommands) => string

    FadeTimeline: (command: keyof GameFadesCommands) => string

}



