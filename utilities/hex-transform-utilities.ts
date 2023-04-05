import { TTransformToHexArray, TTransformValueToHexStr } from "../types/hex-transform-types";
import { TGameMessagesCommands } from "../types/command-types";
import { EStoreKeys } from "../types/store-types";
import { store } from "../store/store";

const transformToHexArray: TTransformToHexArray = ( str ) => ( str.split(" ").map(value => +value) );

const transformValueToHexStr: TTransformValueToHexStr = ( str ) => ( Number(str).toString(16) ).toUpperCase();

const returnHexMessageCommand = ( gameMessagesCommands: TGameMessagesCommands ) => {

    const { cursorPosition, maxCursorPositions } = store[EStoreKeys.installationGame];
    const keysOfMessagesCommands = Object.keys(gameMessagesCommands) as never;
    console.log(cursorPosition)
    for (let i = 1; i <= maxCursorPositions; i++) {

        if (cursorPosition === i) {

            console.log(gameMessagesCommands[keysOfMessagesCommands[i - 1]])
            return transformToHexArray(gameMessagesCommands[keysOfMessagesCommands[i - 1]]);
            
        }

    }
}

export {
    returnHexMessageCommand,
    transformValueToHexStr,
    transformToHexArray
};