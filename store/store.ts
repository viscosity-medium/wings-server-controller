import {EGameModes, EProjectZonesModes, EStoreKeys, IStore} from "../types/store-types";
import {installationIds} from "../_environment/environment";
import {EInstallationIds} from "../types/_common-types";


const store: IStore = {

    [EStoreKeys.installationProjectPortraits]: {
        analogControl: true,
        index: 1,
        mode: EProjectZonesModes.screensaver,
        numberOfFiles: installationIds[EInstallationIds.ProjectPortraits].numberOfFiles,
        isThrottled: false,
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
        isThrottled: false,
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
        isThrottled: false,
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
        isThrottled: false,
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
        isThrottled: false,
        // timeouts
        idleTimeout: undefined,
        hideHintTimeout: undefined,
        sceneTransitionTimeout: undefined
    },

    [EStoreKeys.installationProjectEntryGroup2]: {
        analogControl: true,
        index: 1,
        mode:  EProjectZonesModes.screensaver,
        numberOfFiles: installationIds[EInstallationIds.ProjectEntryGroup2].numberOfFiles,
        isThrottled: false,
        // timeouts
        idleTimeout: undefined,
        hideHintTimeout: undefined,
        sceneTransitionTimeout: undefined
    },

    [EStoreKeys.installationGame]: {
        analogControl: true,
        index: 1,
        numberOfFiles: installationIds[EInstallationIds.Game].numberOfFiles,
        isThrottled: false,
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
        isThrottled: false,
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
        isThrottled: false,
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
        isThrottled: false,
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
        isThrottled: false,
        // timeouts
        idleTimeout: undefined,
        hideHintTimeout: undefined,
        sceneTransitionTimeout: undefined,
    },

};

export {
    store
};