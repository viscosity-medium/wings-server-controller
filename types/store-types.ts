
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
    idleTimeout: any
    hideHintTimeout: any
    sceneTransitionTimeout: any
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
    mode: any
    microscope?: string
    scene?: number
    cursorPosition?: number
    maxCursorPositions?: number
    hintStatus?: 0 | 1
    messageStatus?: 0 | 1
    hintDisplayTime ?: string
}



export enum EStoreKeys {
    installationProject1 = "installationProject1",
    installationProject2 = "installationProject2",
    installationProject3 = "installationProject3",
    installationProject4 = "installationProject4",
    installationProject5 = "installationProject5",
    installationProject6 = "installationProject6",
    installationLab = "installationLab",
    installationGame = "installationGame",

    // test
    installationTest = "installationTest",
    installationTestProject1 = "installationTestProject1",
    installationTestProject2 = "installationTestProject2",
    installationTestProject3 = "installationTestProject3",
    installationTestProject4 = "installationTestProject4",
    installationTestProject5 = "installationTestProject5",
    installationTestProject6 = "installationTestProject6",
    installationTestLab = "installationTestLab",
    installationTestGame = "installationTestGame",
}

export interface IStore {
    [EStoreKeys.installationProject1]: TInstallationStandard
    [EStoreKeys.installationProject2]: TInstallationStandard
    [EStoreKeys.installationProject3]: TInstallationStandard
    [EStoreKeys.installationProject4]: TInstallationStandard
    [EStoreKeys.installationProject5]: TInstallationStandard
    [EStoreKeys.installationProject6]: TInstallationStandard
    [EStoreKeys.installationLab]: TInstallationLab
    [EStoreKeys.installationGame]: TInstallationGame

    // test
    [EStoreKeys.installationTest]: TInstallationTest
    [EStoreKeys.installationTestProject1]: TInstallationStandard
    [EStoreKeys.installationTestProject2]: TInstallationStandard
    [EStoreKeys.installationTestProject3]: TInstallationStandard
    [EStoreKeys.installationTestProject4]: TInstallationStandard
    [EStoreKeys.installationTestProject5]: TInstallationStandard
    [EStoreKeys.installationTestProject6]: TInstallationStandard
    [EStoreKeys.installationTestLab]: TInstallationLab
    [EStoreKeys.installationTestGame]: TInstallationGame
}