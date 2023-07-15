import { TransformToHexArray, TransformValueToHexStr } from "../types/hex-transform-types";
import { GameMessagesCommands } from "../types/command-types";
import { StoreKeys } from "../types/store-types";
import { store } from "../store/store";

const transformToHexArray: TransformToHexArray = (str ) => ( str.split(" ").map(value => +value) );

const transformValueToHexStr: TransformValueToHexStr = (str ) => ( Number(str).toString(16) ).toUpperCase();

const returnHexMessageCommand = ( gameMessagesCommands: GameMessagesCommands ) => {

    const { cursorPosition, maxCursorPositions } = store[StoreKeys.installationGame];
    const keysOfMessagesCommands = Object.keys(gameMessagesCommands) as never;

    for (let i = 1; i <= maxCursorPositions; i++) {

        if (cursorPosition === i) {

            return transformToHexArray(gameMessagesCommands[keysOfMessagesCommands[i - 1]]);
            
        }

    }
}

export {
    returnHexMessageCommand,
    transformValueToHexStr,
    transformToHexArray
};