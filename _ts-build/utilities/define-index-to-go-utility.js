"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineIndexToGoUtility = void 0;
const possible_commands_received_for_project_zones_1 = require("../commands-and-conditions/possible-commands-received-for-project-zones");
const store_types_1 = require("../types/store-types");
const store_1 = require("../store/store");
// file index to go definer for http and udp
const defineIndexToGoUtility = ({ command, storeId }) => {
    const { goBackwards, goForward } = possible_commands_received_for_project_zones_1.possibleCommandsReceivedForProjectZones;
    const { numberOfFiles } = store_1.store[storeId];
    let newIndex = 0;
    // special for installationProject1 (different from other project installations)
    if (store_types_1.EStoreKeys.installationProjectPortraits === storeId) {
        if (command.match(/^[0-9]+$/)) {
            newIndex = +command;
        }
        else if (goForward.includes(command)) {
            newIndex = store_1.store[storeId].numberOfFiles;
        }
        else if (goBackwards.includes(command)) {
            newIndex = store_1.store[storeId].numberOfFiles - 1;
        }
    }
    else {
        if (command.toString().match(/^[0-9]+$/) ||
            (storeId === store_types_1.EStoreKeys.installationProjectPipeline && possible_commands_received_for_project_zones_1.possibleCommandsReceivedForProjectZones.pipelineNumbers().includes(command))) { // if index position was retrieved
            newIndex = +command;
        }
        else if (goForward.includes(command) && store_1.store[storeId].index < numberOfFiles) {
            newIndex = (store_1.store[storeId].index + 1);
        }
        else if (goBackwards.includes(command) && store_1.store[storeId].index !== 1) {
            newIndex = (store_1.store[storeId].index - 1);
        }
        else if (goForward.includes(command) && store_1.store[storeId].index === +numberOfFiles) {
            newIndex = 1;
        }
        else if (goBackwards.includes(command) && store_1.store[storeId].index === 1) {
            newIndex = +numberOfFiles;
        }
    }
    if (!newIndex && possible_commands_received_for_project_zones_1.possibleCommandsReceivedForProjectZones.hexSingleCommands.includes(command)) {
        newIndex = store_1.store[storeId].index;
    }
    return newIndex !== 0 ? newIndex.toString().length < 2 ? `0${newIndex}` : `${newIndex}` : undefined;
};
exports.defineIndexToGoUtility = defineIndexToGoUtility;
