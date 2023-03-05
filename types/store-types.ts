
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

    // for lab mode
    microscope?: string

    // for game mods
    scene?: number
    cursorPosition?: number
    maxCursorPositions?: number
    hintStatus?: 0 | 1
    messageStatus?: 0 | 1
    hintDisplayTime?: string
    savedSceneToGo?: number[] | "undefined"
}

export type TSetStoreValue = ({
    storeId,
    analogControl,
    mode,
    index,
    numberOfFiles,
    microscope,
    hintStatus,
    scene,
    cursorPosition,
    maxCursorPositions,
    messageStatus,
    hintDisplayTime,
    savedSceneToGo
}: ISetStoreValue) => void

export type TInstallationStandard = {
    //any mode
    analogControl: boolean
    index: number
    mode: EProjectZonesModes
    numberOfFiles: number

    // timeouts
    idleTimeout: ReturnType<typeof setTimeout> | undefined
    hideHintTimeout: any
    sceneTransitionTimeout: ReturnType<typeof setTimeout> | undefined
}

export interface TInstallationLab extends TInstallationStandard {
    microscope: string
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

export interface TInstallationTest extends Omit<TInstallationStandard, "mode"> {
    mode: EProjectZonesModes | EGameModes | "screensaver" | "main"
    microscope?: string
    scene?: number
    cursorPosition?: number
    maxCursorPositions?: number
    hintStatus?: 0 | 1
    messageStatus?: 0 | 1
    hintDisplayTime ?: string
}



export enum EStoreKeys {
    installationProjectPortraits = "installationProjectPortraits",
    installationProjectMap = "installationProjectMap",
    installationProject3 = "installationProject3",
    installationProjectCovers = "installationProjectCovers",
    installationProjectCabinet = "installationProjectCabinet",
    installationProjectPipeline = "installationProjectPipeline",
    installationProjectLab = "installationProjectLab",
    installationGame = "installationGame",

    // test
    installationTest = "installationTest",
}

export interface IStore {
    [EStoreKeys.installationProjectPortraits]: TInstallationStandard
    [EStoreKeys.installationProjectMap]: TInstallationStandard
    [EStoreKeys.installationProject3]: TInstallationStandard
    [EStoreKeys.installationProjectCovers]: TInstallationStandard
    [EStoreKeys.installationProjectCabinet]: TInstallationStandard
    [EStoreKeys.installationProjectPipeline]: TInstallationStandard
    [EStoreKeys.installationProjectLab]: TInstallationLab
    [EStoreKeys.installationGame]: TInstallationGame

    // test
    [EStoreKeys.installationTest]: TInstallationTest

}