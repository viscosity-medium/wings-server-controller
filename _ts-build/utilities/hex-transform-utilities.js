"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformToHexArray = exports.transformValueToHexStr = exports.returnHexMessageCommand = void 0;
const store_types_1 = require("../types/store-types");
const store_1 = require("../store/store");
const transformToHexArray = (str) => (str.split(" ").map(value => +value));
exports.transformToHexArray = transformToHexArray;
const transformValueToHexStr = (str) => (Number(str).toString(16)).toUpperCase();
exports.transformValueToHexStr = transformValueToHexStr;
const returnHexMessageCommand = (gameMessagesCommands) => {
    const { cursorPosition, maxCursorPositions } = store_1.store[store_types_1.EStoreKeys.installationGame];
    const keysOfMessagesCommands = Object.keys(gameMessagesCommands);
    for (let i = 1; i <= maxCursorPositions; i++) {
        if (cursorPosition === i) {
            console.log(gameMessagesCommands[keysOfMessagesCommands[i - 1]]);
            return transformToHexArray(gameMessagesCommands[keysOfMessagesCommands[i - 1]]);
        }
    }
};
exports.returnHexMessageCommand = returnHexMessageCommand;
