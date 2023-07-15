import {GameModes, ProjectZonesModes, StoreKeys, Store} from "../types/store-types";
import {installationIds} from "../_environment/environment";
import {AvailableInstallationIds} from "../types/_common-types";


const store: Store = {

    [StoreKeys.installationProjectPortraits]: {
        analogControl: true,
        index: 1,
        mode: ProjectZonesModes.screensaver,
        numberOfFiles: installationIds[AvailableInstallationIds.ProjectPortraits].numberOfFiles,
        isThrottled: false,
        // timeouts
        idleTimeout: undefined,
        hideHintTimeout: undefined,
        sceneTransitionTimeout: undefined
    },

    [StoreKeys.installationProjectMap]: {
        analogControl: true,
        index: 1,
        mode:  ProjectZonesModes.screensaver,
        numberOfFiles: installationIds[AvailableInstallationIds.ProjectMap].numberOfFiles,
        isThrottled: false,
        // timeouts
        idleTimeout: undefined,
        hideHintTimeout: undefined,
        sceneTransitionTimeout: undefined
    },

    [StoreKeys.installationProjectCovers]: {
        analogControl: true,
        index: 1,
        mode:  ProjectZonesModes.screensaver,
        numberOfFiles: installationIds[AvailableInstallationIds.ProjectCovers].numberOfFiles,
        isThrottled: false,
        // timeouts
        idleTimeout: undefined,
        hideHintTimeout: undefined,
        sceneTransitionTimeout: undefined
    },

    [StoreKeys.installationProjectCabinet]: {
        analogControl: true,
        index: 1,
        mode:  ProjectZonesModes.screensaver,
        numberOfFiles: installationIds[AvailableInstallationIds.ProjectCabinet].numberOfFiles,
        isThrottled: false,
        // timeouts
        idleTimeout: undefined,
        hideHintTimeout: undefined,
        sceneTransitionTimeout: undefined
    },

    [StoreKeys.installationProjectPipeline]: {
        analogControl: true,
        index: 1,
        mode:  ProjectZonesModes.screensaver,
        numberOfFiles: installationIds[AvailableInstallationIds.ProjectPipeline].numberOfFiles,
        isThrottled: false,
        // timeouts
        idleTimeout: undefined,
        hideHintTimeout: undefined,
        sceneTransitionTimeout: undefined
    },

    [StoreKeys.installationProjectEntryGroup2]: {
        analogControl: true,
        index: 1,
        mode:  ProjectZonesModes.screensaver,
        numberOfFiles: installationIds[AvailableInstallationIds.ProjectEntryGroup2].numberOfFiles,
        isThrottled: false,
        // timeouts
        idleTimeout: undefined,
        hideHintTimeout: undefined,
        sceneTransitionTimeout: undefined
    },

    [StoreKeys.installationProjectLab]: {
        analogControl: true,
        index: 1,
        mode:  ProjectZonesModes.screensaver,
        numberOfFiles: installationIds[AvailableInstallationIds.ProjectLab].numberOfFiles,
        isThrottled: false,
        // timeouts
        idleTimeout: undefined,
        hideHintTimeout: undefined,
        sceneTransitionTimeout: undefined,
    },

    [StoreKeys.installationProjectTankEcology]: {
        analogControl: true,
        index: 1,
        mode:  ProjectZonesModes.screensaver,
        numberOfFiles: installationIds[AvailableInstallationIds.ProjectTankEcology].numberOfFiles,
        isThrottled: false,
        // timeouts
        idleTimeout: undefined,
        hideHintTimeout: undefined,
        sceneTransitionTimeout: undefined,
    },
    [StoreKeys.installationProjectTankTechnology]: {
        analogControl: true,
        index: 1,
        mode:  ProjectZonesModes.screensaver,
        numberOfFiles: installationIds[AvailableInstallationIds.ProjectTankTechnology].numberOfFiles,
        isThrottled: false,
        // timeouts
        idleTimeout: undefined,
        hideHintTimeout: undefined,
        sceneTransitionTimeout: undefined,
    },
    [StoreKeys.installationProjectTankSocial]: {
        analogControl: true,
        index: 1,
        mode:  ProjectZonesModes.screensaver,
        numberOfFiles: installationIds[AvailableInstallationIds.ProjectTankSocial].numberOfFiles,
        isThrottled: false,
        // timeouts
        idleTimeout: undefined,
        hideHintTimeout: undefined,
        sceneTransitionTimeout: undefined,
    },
    [StoreKeys.installationGame]: {
        analogControl: true,
        index: 1,
        numberOfFiles: installationIds[AvailableInstallationIds.Game].numberOfFiles,
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
        mode: GameModes.screensaver,
    },

};

export {
    store
};