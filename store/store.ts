import {EGameModes, EProjectZonesModes, EStoreKeys, IStore} from "../types/store-types";
import {installationIds} from "../_environment/environment";
import {EInstallationIds} from "../types/_common-types";


const store: IStore = {

    [EStoreKeys.installationProjectPortraits]: {
        analogControl: true,
        index: 1,
        mode: EProjectZonesModes.screensaver,
        numberOfFiles: installationIds[EInstallationIds.ProjectPortraits].numberOfFiles,
        // timeouts
        idleTimeout: undefined,
        hideHintTimeout: undefined,
        sceneTransitionTimeout: undefined
    },

    [EStoreKeys.installationProjectMap]: {
        analogControl: true,
        index: 1,
        mode:  EProjectZonesModes.screensaver,
        numberOfFiles: installationIds[EInstallationIds.ProjectMap].numberOfFiles,
        // timeouts
        idleTimeout: undefined,
        hideHintTimeout: undefined,
        sceneTransitionTimeout: undefined
    },

    [EStoreKeys.installationProjectCovers]: {
        analogControl: true,
        index: 1,
        mode:  EProjectZonesModes.screensaver,
        numberOfFiles: installationIds[EInstallationIds.ProjectCovers].numberOfFiles,
        // timeouts
        idleTimeout: undefined,
        hideHintTimeout: undefined,
        sceneTransitionTimeout: undefined
    },

    [EStoreKeys.installationProjectCabinet]: {
        analogControl: true,
        index: 1,
        mode:  EProjectZonesModes.screensaver,
        numberOfFiles: installationIds[EInstallationIds.ProjectCabinet].numberOfFiles,
        // timeouts
        idleTimeout: undefined,
        hideHintTimeout: undefined,
        sceneTransitionTimeout: undefined
    },

    [EStoreKeys.installationProjectPipeline]: {
        analogControl: true,
        index: 1,
        mode:  EProjectZonesModes.screensaver,
        numberOfFiles: installationIds[EInstallationIds.ProjectPipeline].numberOfFiles,
        // timeouts
        idleTimeout: undefined,
        hideHintTimeout: undefined,
        sceneTransitionTimeout: undefined
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

    [EStoreKeys.installationProjectLab]: {
        analogControl: true,
        index: 1,
        mode:  EProjectZonesModes.screensaver,
        numberOfFiles: installationIds[EInstallationIds.ProjectLab].numberOfFiles,
        // timeouts
        idleTimeout: undefined,
        hideHintTimeout: undefined,
        sceneTransitionTimeout: undefined,
    },
    [EStoreKeys.installationProjectTankEcology]: {
        analogControl: true,
        index: 1,
        mode:  EProjectZonesModes.screensaver,
        numberOfFiles: installationIds[EInstallationIds.ProjectTankEcology].numberOfFiles,
        // timeouts
        idleTimeout: undefined,
        hideHintTimeout: undefined,
        sceneTransitionTimeout: undefined,
    },
    [EStoreKeys.installationProjectTankTechnology]: {
        analogControl: true,
        index: 1,
        mode:  EProjectZonesModes.screensaver,
        numberOfFiles: installationIds[EInstallationIds.ProjectTankTechnology].numberOfFiles,
        // timeouts
        idleTimeout: undefined,
        hideHintTimeout: undefined,
        sceneTransitionTimeout: undefined,
    },
    [EStoreKeys.installationProjectTankSocial]: {
        analogControl: true,
        index: 1,
        mode:  EProjectZonesModes.screensaver,
        numberOfFiles: installationIds[EInstallationIds.ProjectTankSocial].numberOfFiles,
        // timeouts
        idleTimeout: undefined,
        hideHintTimeout: undefined,
        sceneTransitionTimeout: undefined,
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
        scene: 1,
        hintStatus: 0,
        messageStatus: 0,
        cursorPosition: 1,
        maxCursorPositions: 4,
    },
};

export {
    store
};