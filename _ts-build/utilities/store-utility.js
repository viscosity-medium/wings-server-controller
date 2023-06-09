"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setStoreValue = void 0;
const store_types_1 = require("../types/store-types");
const store_1 = require("../store/store");
const setStoreValue = ({ storeId, analogControl, mode, index, numberOfFiles, scene, cursorPosition, maxCursorPositions, hintStatus, messageStatus, savedSceneToGo, sceneTransitionTimeout, isThrottled }) => {
    mode ? store_1.store[storeId].mode = mode : null;
    index ? store_1.store[storeId].index = index : null;
    numberOfFiles ? store_1.store[storeId].numberOfFiles = numberOfFiles : null;
    analogControl !== undefined ? store_1.store[storeId].analogControl = analogControl : null;
    // game
    scene && storeId === store_types_1.EStoreKeys.installationGame ? store_1.store[storeId].scene = scene : null;
    cursorPosition && storeId === store_types_1.EStoreKeys.installationGame ? store_1.store[storeId].cursorPosition = cursorPosition : null;
    maxCursorPositions && storeId === store_types_1.EStoreKeys.installationGame ? store_1.store[storeId].maxCursorPositions = maxCursorPositions : null;
    hintStatus !== undefined && storeId === store_types_1.EStoreKeys.installationGame ? store_1.store[storeId].hintStatus = hintStatus : null;
    messageStatus !== undefined && storeId === store_types_1.EStoreKeys.installationGame ? store_1.store[storeId].messageStatus = messageStatus : null;
    hintStatus !== undefined && storeId === store_types_1.EStoreKeys.installationGame ? store_1.store[storeId].hintStatus = hintStatus : null;
    savedSceneToGo !== "undefined" && savedSceneToGo !== undefined && storeId === store_types_1.EStoreKeys.installationGame ? store_1.store[storeId].savedSceneToGo = savedSceneToGo :
        storeId === store_types_1.EStoreKeys.installationGame && savedSceneToGo === "undefined" ? store_1.store[storeId].savedSceneToGo = undefined : null;
    sceneTransitionTimeout && storeId === store_types_1.EStoreKeys.installationGame ? store_1.store[storeId].sceneTransitionTimeout = sceneTransitionTimeout : null;
    isThrottled !== undefined ? store_1.store[storeId].isThrottled = isThrottled : null;
};
exports.setStoreValue = setStoreValue;
