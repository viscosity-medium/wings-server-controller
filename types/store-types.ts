
export enum EProjectZonesModes {
    screensaver = "screensaver",
    main = "main",
}
export enum EGameModes {
    screensaver = "screensaver",
    demo = "demo",
    mna = "mna",
    sod = "sod",
    looping = "looping"
}

interface ISetStoreValue {

    storeId: keyof IStore
    analogControl?: boolean
    mode?: EProjectZonesModes | EGameModes
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

export type TSetStoreValue = ({
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
}: ISetStoreValue) => void

export type TInstallationStandard = {
    //any mode
    analogControl: boolean
    index: number
    mode: EProjectZonesModes
    numberOfFiles: number
    isThrottled: boolean,
    // timeouts
    idleTimeout: NodeJS.Timeout | undefined
    hideHintTimeout: NodeJS.Timeout | undefined
    sceneTransitionTimeout: NodeJS.Timeout | undefined
}

export interface TInstallationGame extends Omit<TInstallationStandard, "mode" > {
    mode: EGameModes
    scene: number
    cursorPosition: number
    maxCursorPositions: number
    hintStatus: 0 | 1
    messageStatus: 0 | 1
    savedSceneToGo: number[] | undefined
}




export enum EStoreKeys {
    installationProjectPortraits = "installationProjectPortraits",
    installationProjectMap = "installationProjectMap",
    installationProjectCovers = "installationProjectCovers",
    installationProjectCabinet = "installationProjectCabinet",
    installationProjectPipeline = "installationProjectPipeline",
    installationProjectLab = "installationProjectLab",
    installationProjectTankEcology = "installationProjectTankEcology",
    installationProjectTankTechnology = "installationProjectTankTechnology",
    installationProjectTankSocial = "installationProjectTankSocial",
    installationProjectEntryGroup = "installationProjectEntryGroup",
    installationGame = "installationGame",

}

export interface IStore {
    [EStoreKeys.installationProjectPortraits]: TInstallationStandard
    [EStoreKeys.installationProjectMap]: TInstallationStandard
    [EStoreKeys.installationProjectCovers]: TInstallationStandard
    [EStoreKeys.installationProjectCabinet]: TInstallationStandard
    [EStoreKeys.installationProjectPipeline]: TInstallationStandard
    [EStoreKeys.installationProjectLab]: TInstallationStandard
    [EStoreKeys.installationProjectTankEcology]: TInstallationStandard
    [EStoreKeys.installationProjectTankTechnology]: TInstallationStandard
    [EStoreKeys.installationProjectTankSocial]: TInstallationStandard
    [EStoreKeys.installationProjectEntryGroup]: TInstallationStandard
    [EStoreKeys.installationGame]: TInstallationGame

}