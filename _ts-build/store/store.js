"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = void 0;
const store_types_1 = require("../types/store-types");
const environment_1 = require("../_environment/environment");
const _common_types_1 = require("../types/_common-types");
const store = {
    [store_types_1.EStoreKeys.installationProjectPortraits]: {
        analogControl: true,
        index: 1,
        mode: store_types_1.EProjectZonesModes.screensaver,
        numberOfFiles: environment_1.installationIds[_common_types_1.EInstallationIds.ProjectPortraits].numberOfFiles,
        isThrottled: false,
        // timeouts
        idleTimeout: undefined,
        hideHintTimeout: undefined,
        sceneTransitionTimeout: undefined
    },
    [store_types_1.EStoreKeys.installationProjectMap]: {
        analogControl: true,
        index: 1,
        mode: store_types_1.EProjectZonesModes.screensaver,
        numberOfFiles: environment_1.installationIds[_common_types_1.EInstallationIds.ProjectMap].numberOfFiles,
        isThrottled: false,
        // timeouts
        idleTimeout: undefined,
        hideHintTimeout: undefined,
        sceneTransitionTimeout: undefined
    },
    [store_types_1.EStoreKeys.installationProjectCovers]: {
        analogControl: true,
        index: 1,
        mode: store_types_1.EProjectZonesModes.screensaver,
        numberOfFiles: environment_1.installationIds[_common_types_1.EInstallationIds.ProjectCovers].numberOfFiles,
        isThrottled: false,
        // timeouts
        idleTimeout: undefined,
        hideHintTimeout: undefined,
        sceneTransitionTimeout: undefined
    },
    [store_types_1.EStoreKeys.installationProjectCabinet]: {
        analogControl: true,
        index: 1,
        mode: store_types_1.EProjectZonesModes.screensaver,
        numberOfFiles: environment_1.installationIds[_common_types_1.EInstallationIds.ProjectCabinet].numberOfFiles,
        isThrottled: false,
        // timeouts
        idleTimeout: undefined,
        hideHintTimeout: undefined,
        sceneTransitionTimeout: undefined
    },
    [store_types_1.EStoreKeys.installationProjectPipeline]: {
        analogControl: true,
        index: 1,
        mode: store_types_1.EProjectZonesModes.screensaver,
        numberOfFiles: environment_1.installationIds[_common_types_1.EInstallationIds.ProjectPipeline].numberOfFiles,
        isThrottled: false,
        // timeouts
        idleTimeout: undefined,
        hideHintTimeout: undefined,
        sceneTransitionTimeout: undefined
    },
    [store_types_1.EStoreKeys.installationGame]: {
        analogControl: true,
        index: 1,
        numberOfFiles: environment_1.installationIds[_common_types_1.EInstallationIds.Game].numberOfFiles,
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
        mode: store_types_1.EGameModes.screensaver,
    },
    [store_types_1.EStoreKeys.installationProjectLab]: {
        analogControl: true,
        index: 1,
        mode: store_types_1.EProjectZonesModes.screensaver,
        numberOfFiles: environment_1.installationIds[_common_types_1.EInstallationIds.ProjectLab].numberOfFiles,
        isThrottled: false,
        // timeouts
        idleTimeout: undefined,
        hideHintTimeout: undefined,
        sceneTransitionTimeout: undefined,
    },
    [store_types_1.EStoreKeys.installationProjectTankEcology]: {
        analogControl: true,
        index: 1,
        mode: store_types_1.EProjectZonesModes.screensaver,
        numberOfFiles: environment_1.installationIds[_common_types_1.EInstallationIds.ProjectTankEcology].numberOfFiles,
        isThrottled: false,
        // timeouts
        idleTimeout: undefined,
        hideHintTimeout: undefined,
        sceneTransitionTimeout: undefined,
    },
    [store_types_1.EStoreKeys.installationProjectTankTechnology]: {
        analogControl: true,
        index: 1,
        mode: store_types_1.EProjectZonesModes.screensaver,
        numberOfFiles: environment_1.installationIds[_common_types_1.EInstallationIds.ProjectTankTechnology].numberOfFiles,
        isThrottled: false,
        // timeouts
        idleTimeout: undefined,
        hideHintTimeout: undefined,
        sceneTransitionTimeout: undefined,
    },
    [store_types_1.EStoreKeys.installationProjectTankSocial]: {
        analogControl: true,
        index: 1,
        mode: store_types_1.EProjectZonesModes.screensaver,
        numberOfFiles: environment_1.installationIds[_common_types_1.EInstallationIds.ProjectTankSocial].numberOfFiles,
        isThrottled: false,
        // timeouts
        idleTimeout: undefined,
        hideHintTimeout: undefined,
        sceneTransitionTimeout: undefined,
    },
};
exports.store = store;
