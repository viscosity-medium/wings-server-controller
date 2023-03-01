import {EGameModes, EProjectZonesModes, EStoreKeys, IStore} from "../types/store-types";
import {installationIds} from "../_environment/environment";
import {EInstallationIds} from "../types/_common-types";


const store: IStore = {

    [EStoreKeys.installationProject1]: {
        analogControl: true,
        index: 1,
        mode: EProjectZonesModes.screensaver,
        numberOfFiles: installationIds[EInstallationIds.Project1].numberOfFiles,
        // timeouts
        idleTimeout: undefined,
        hideHintTimeout: undefined,
        sceneTransitionTimeout: undefined
    },

    [EStoreKeys.installationProject2]: {
        analogControl: true,
        index: 1,
        mode:  EProjectZonesModes.screensaver,
        numberOfFiles: installationIds[EInstallationIds.Project2].numberOfFiles,
        // timeouts
        idleTimeout: undefined,
        hideHintTimeout: undefined,
        sceneTransitionTimeout: undefined
    },

    [EStoreKeys.installationProject3]: {
        analogControl: true,
        index: 1,
        mode:  EProjectZonesModes.screensaver,
        numberOfFiles: installationIds[EInstallationIds.Project3].numberOfFiles,
        // timeouts
        idleTimeout: undefined,
        hideHintTimeout: undefined,
        sceneTransitionTimeout: undefined
    },

    [EStoreKeys.installationProject4]: {
        analogControl: true,
        index: 1,
        mode:  EProjectZonesModes.screensaver,
        numberOfFiles: installationIds[EInstallationIds.Project4].numberOfFiles,
        // timeouts
        idleTimeout: undefined,
        hideHintTimeout: undefined,
        sceneTransitionTimeout: undefined
    },

    [EStoreKeys.installationProject5]: {
        analogControl: true,
        index: 1,
        mode:  EProjectZonesModes.screensaver,
        numberOfFiles: installationIds[EInstallationIds.Project5].numberOfFiles,
        // timeouts
        idleTimeout: undefined,
        hideHintTimeout: undefined,
        sceneTransitionTimeout: undefined
    },

    [EStoreKeys.installationProject6]: {
        analogControl: true,
        index: 1,
        mode:  EProjectZonesModes.screensaver,
        numberOfFiles: installationIds[EInstallationIds.Project6].numberOfFiles,
        // timeouts
        idleTimeout: undefined,
        hideHintTimeout: undefined,
        sceneTransitionTimeout: undefined
    },

    [EStoreKeys.installationLab]: {
        analogControl: true,
        index: 1,
        mode:  EProjectZonesModes.screensaver,
        numberOfFiles: installationIds[EInstallationIds.Lab].numberOfFiles,
        // timeouts
        idleTimeout: undefined,
        hideHintTimeout: undefined,
        sceneTransitionTimeout: undefined,
        //special
        microscope : "off",
    },

    [EStoreKeys.installationGame]: {
        analogControl: true,
        index: 1,
        numberOfFiles: installationIds[EInstallationIds.Game].numberOfFiles,
        // timeouts
        idleTimeout: undefined,
        hideHintTimeout: undefined,
        sceneTransitionTimeout: undefined,
        //special
        scene: 1,
        hintStatus: 0,
        savedSceneToGo: undefined,
        messageStatus: 0,
        cursorPosition: 1,
        maxCursorPositions: 4,
        mode: EGameModes.screensaver,
    },

    [EStoreKeys.installationTest]: {
        analogControl: true,
        index: 1,
        mode: "screensaver",
        numberOfFiles: installationIds[EInstallationIds.Test].numberOfFiles,
        // timeouts
        idleTimeout: undefined,
        hideHintTimeout: undefined,
        sceneTransitionTimeout: undefined,
        //special
        microscope : "off",
        scene: 1,
        hintStatus: 0,
        messageStatus: 0,
        cursorPosition: 1,
        maxCursorPositions: 4,
    },
    [EStoreKeys.installationTestProject1]: {
        analogControl: true,
        index: 1,
        mode:  EProjectZonesModes.screensaver,
        numberOfFiles: installationIds[EInstallationIds.TestProject1].numberOfFiles,
        // timeouts
        idleTimeout: undefined,
        hideHintTimeout: undefined,
        sceneTransitionTimeout: undefined
    },
    [EStoreKeys.installationTestProject2]: {
        analogControl: true,
        index: 1,
        mode:  EProjectZonesModes.screensaver,
        numberOfFiles: installationIds[EInstallationIds.TestProject2].numberOfFiles,
        // timeouts
        idleTimeout: undefined,
        hideHintTimeout: undefined,
        sceneTransitionTimeout: undefined
    },
    [EStoreKeys.installationTestProject3]: {
        analogControl: true,
        index: 1,
        mode:  EProjectZonesModes.screensaver,
        numberOfFiles: installationIds[EInstallationIds.TestProject3].numberOfFiles,
        // timeouts
        idleTimeout: undefined,
        hideHintTimeout: undefined,
        sceneTransitionTimeout: undefined
    },
    [EStoreKeys.installationTestProject4]: {
        analogControl: true,
        index: 1,
        mode:  EProjectZonesModes.screensaver,
        numberOfFiles: installationIds[EInstallationIds.TestProject4].numberOfFiles,
        // timeouts
        idleTimeout: undefined,
        hideHintTimeout: undefined,
        sceneTransitionTimeout: undefined
    },
    [EStoreKeys.installationTestProject5]: {
        analogControl: true,
        index: 1,
        mode:  EProjectZonesModes.screensaver,
        numberOfFiles: installationIds[EInstallationIds.TestProject5].numberOfFiles,
        // timeouts
        idleTimeout: undefined,
        hideHintTimeout: undefined,
        sceneTransitionTimeout: undefined
    },
    [EStoreKeys.installationTestProject6]: {
        analogControl: true,
        index: 1,
        mode:  EProjectZonesModes.screensaver,
        numberOfFiles: installationIds[EInstallationIds.TestProject6].numberOfFiles,
        // timeouts
        idleTimeout: undefined,
        hideHintTimeout: undefined,
        sceneTransitionTimeout: undefined
    },
    [EStoreKeys.installationTestLab]: {
        analogControl: true,
        index: 1,
        mode:  EProjectZonesModes.screensaver,
        numberOfFiles: installationIds[EInstallationIds.TestLab].numberOfFiles,
        // timeouts
        idleTimeout: undefined,
        hideHintTimeout: undefined,
        sceneTransitionTimeout: undefined,
        //special
        microscope : "off",
    },
    [EStoreKeys.installationTestGame]: {
        analogControl: true,
        index: 1,
        numberOfFiles: installationIds[EInstallationIds.TestGame].numberOfFiles,
        // timeouts
        idleTimeout: undefined,
        hideHintTimeout: undefined,
        sceneTransitionTimeout: undefined,
        //special
        scene: 1,
        hintStatus: 0,
        savedSceneToGo: undefined,
        messageStatus: 0,
        cursorPosition: 1,
        maxCursorPositions: 4,
        mode: EGameModes.screensaver,
    }
};

export {
    store
};