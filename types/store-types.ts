
export enum ProjectZonesModes {
    screensaver = "screensaver",
    main = "main",
}
export enum GameModes {
    screensaver = "screensaver",
    demo = "demo",
    mna = "mna",
    sod = "sod",
    looping = "looping"
}

interface SetStoreValueProps {

    storeId: keyof Store
    analogControl?: boolean
    mode?: ProjectZonesModes | GameModes
    index?: number
    numberOfFiles?: number
    isThrottled?: boolean,

    // for game mods
    scene?: number
    cursorPosition?: number
    maxCursorPositions?: number
    hintStatus?: 0 | 1
    messageStatus?: 0 | 1
    hintDisplayTime?: string
    savedSceneToGo?: number[] | "undefined",
    sceneTransitionTimeout?: NodeJS.Timeout

}

export type SetStoreValue = ({
    storeId,
    analogControl,
    mode,
    index,
    numberOfFiles,
    hintStatus,
    scene,
    cursorPosition,
    maxCursorPositions,
    messageStatus,
    hintDisplayTime,
    savedSceneToGo,
    sceneTransitionTimeout
}: SetStoreValueProps) => void

export type InstallationStandard = {
    //any mode
    analogControl: boolean
    index: number
    mode: ProjectZonesModes
    numberOfFiles: number
    isThrottled: boolean,
    // timeouts
    idleTimeout: NodeJS.Timeout | undefined
    hideHintTimeout: NodeJS.Timeout | undefined
    sceneTransitionTimeout: NodeJS.Timeout | undefined
}

export interface InstallationGame extends Omit<InstallationStandard, "mode" > {
    mode: GameModes
    scene: number
    cursorPosition: number
    maxCursorPositions: number
    hintStatus: 0 | 1
    messageStatus: 0 | 1
    savedSceneToGo: number[] | undefined
}




export enum StoreKeys {
    installationProjectPortraits = "installationProjectPortraits",
    installationProjectMap = "installationProjectMap",
    installationProjectCovers = "installationProjectCovers",
    installationProjectCabinet = "installationProjectCabinet",
    installationProjectPipeline = "installationProjectPipeline",
    installationProjectLab = "installationProjectLab",
    installationProjectTankEcology = "installationProjectTankEcology",
    installationProjectTankTechnology = "installationProjectTankTechnology",
    installationProjectTankSocial = "installationProjectTankSocial",
    installationProjectEntryGroup2 = "installationProjectEntryGroup2",
    installationGame = "installationGame",

}

export interface Store {
    [StoreKeys.installationProjectPortraits]: InstallationStandard
    [StoreKeys.installationProjectMap]: InstallationStandard
    [StoreKeys.installationProjectCovers]: InstallationStandard
    [StoreKeys.installationProjectCabinet]: InstallationStandard
    [StoreKeys.installationProjectPipeline]: InstallationStandard
    [StoreKeys.installationProjectLab]: InstallationStandard
    [StoreKeys.installationProjectTankEcology]: InstallationStandard
    [StoreKeys.installationProjectTankTechnology]: InstallationStandard
    [StoreKeys.installationProjectTankSocial]: InstallationStandard
    [StoreKeys.installationProjectEntryGroup2]: InstallationStandard
    [StoreKeys.installationGame]: InstallationGame

}