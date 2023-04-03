import { EStoreKeys, TSetStoreValue } from "../types/store-types";
import { store } from "../store/store";

const setStoreValue: TSetStoreValue = ({
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
    scene && storeId === EStoreKeys.installationGame ? store[ storeId ].scene = scene : null;
    cursorPosition && storeId === EStoreKeys.installationGame ? store[ storeId ].cursorPosition = cursorPosition : null;
    maxCursorPositions && storeId === EStoreKeys.installationGame ? store[ storeId ].maxCursorPositions = maxCursorPositions : null;
    hintStatus !== undefined && storeId === EStoreKeys.installationGame ? store[ storeId ].hintStatus = hintStatus : null;
    messageStatus !== undefined && storeId === EStoreKeys.installationGame ? store[ storeId ].messageStatus = messageStatus : null;
    hintStatus !== undefined && storeId === EStoreKeys.installationGame ? store[ storeId ].hintStatus = hintStatus : null;
    savedSceneToGo !== "undefined" && savedSceneToGo !== undefined && storeId === EStoreKeys.installationGame ? store[ storeId ].savedSceneToGo = savedSceneToGo :
        storeId === EStoreKeys.installationGame && savedSceneToGo === "undefined" ? store[ storeId ].savedSceneToGo = undefined : null;
    sceneTransitionTimeout && storeId === EStoreKeys.installationGame ? store[storeId].sceneTransitionTimeout = sceneTransitionTimeout : null;
    isThrottled !== undefined ? store[ storeId ].isThrottled = isThrottled : null

}

export {
    setStoreValue
}