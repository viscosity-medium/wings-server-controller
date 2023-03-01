import {TTransformToHexArray, TTransformValueToHexStr} from "../types/hex-transform-types";
import {TGameMessagesCommands} from "../types/command-types";
import {store} from "../store/store";
import {EStoreKeys} from "../types/store-types";

const transformToHexArray: TTransformToHexArray = ( str ) => ( str.split(" ").map(value => +value) );
const transformValueToHexStr: TTransformValueToHexStr = ( str ) => ( Number(str).toString(16) ).toUpperCase();

export {
    transformValueToHexStr,
    transformToHexArray
};
export const returnHexMessageCommand = ( gameMessagesCommands: TGameMessagesCommands ) => {

    const {cursorPosition, maxCursorPositions} = store[EStoreKeys.installationGame];
    const keysOfMessagesCommands = Object.keys(gameMessagesCommands) as never;

    for (let i = 1; i <= maxCursorPositions; i++) {

        if (cursorPosition === i) {
            return transformToHexArray(gameMessagesCommands[keysOfMessagesCommands[i - 1]]);
        }

    }
}