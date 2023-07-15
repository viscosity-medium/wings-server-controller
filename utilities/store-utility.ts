import { StoreKeys, SetStoreValue } from "../types/store-types";
import { store } from "../store/store";

const setStoreValue: SetStoreValue = ({
    storeId,
    analogControl,
    mode,
    index,
    numberOfFiles,
    scene,
    cursorPosition,
    maxCursorPositions,
    hintStatus,
    messageStatus,
    savedSceneToGo,
    sceneTransitionTimeout ,
    isThrottled
}) => {

    mode ? store[ storeId ].mode = mode : null;
    index ? store[ storeId ].index = index : null;
    numberOfFiles ? store[ storeId ].numberOfFiles = numberOfFiles : null;
    analogControl !== undefined ? store[storeId].analogControl = analogControl: null;

    // game
    scene && storeId === StoreKeys.installationGame ? store[ storeId ].scene = scene : null;
    cursorPosition && storeId === StoreKeys.installationGame ? store[ storeId ].cursorPosition = cursorPosition : null;
    maxCursorPositions && storeId === StoreKeys.installationGame ? store[ storeId ].maxCursorPositions = maxCursorPositions : null;
    hintStatus !== undefined && storeId === StoreKeys.installationGame ? store[ storeId ].hintStatus = hintStatus : null;
    messageStatus !== undefined && storeId === StoreKeys.installationGame ? store[ storeId ].messageStatus = messageStatus : null;
    hintStatus !== undefined && storeId === StoreKeys.installationGame ? store[ storeId ].hintStatus = hintStatus : null;
    savedSceneToGo !== "undefined" && savedSceneToGo !== undefined && storeId === StoreKeys.installationGame ? store[ storeId ].savedSceneToGo = savedSceneToGo :
        storeId === StoreKeys.installationGame && savedSceneToGo === "undefined" ? store[ storeId ].savedSceneToGo = undefined : null;
    sceneTransitionTimeout && storeId === StoreKeys.installationGame ? store[storeId].sceneTransitionTimeout = sceneTransitionTimeout : null;
    isThrottled !== undefined ? store[ storeId ].isThrottled = isThrottled : null

}

export {
    setStoreValue
}