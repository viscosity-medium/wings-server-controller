"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectZonesSubController = void 0;
const possible_commands_received_for_project_zones_1 = require("../../commands-and-conditions/possible-commands-received-for-project-zones");
const _common_types_1 = require("../../types/_common-types");
const define_index_to_go_utility_1 = require("../../utilities/define-index-to-go-utility");
const wings_action_commands_1 = require("../../commands-and-conditions/wings-action-commands");
const time_utilities_1 = require("../../utilities/time-utilities");
const project_zone_utilities_1 = require("../../utilities/project-zones-utility/project-zone-utilities");
const projectZonesSubController = ({ id, storeId, command }) => __awaiter(void 0, void 0, void 0, function* () {
    const { hexSingleCommands, goBackwards, goForward, pipelineNumbers } = possible_commands_received_for_project_zones_1.possibleCommandsReceivedForProjectZones;
    const newIndex = (0, define_index_to_go_utility_1.defineIndexToGoUtility)({ command, storeId });
    if (hexSingleCommands.includes(command) && newIndex) {
        const projectZoneUtilities = new project_zone_utilities_1.projectUtilities({ storeId, id, newIndex, command: wings_action_commands_1.wingsActionCommands[command] });
        const functionToExecute = projectZoneUtilities.sendHexCommand.bind(projectZoneUtilities);
        yield (0, time_utilities_1.throttlerFunction)({
            storeId,
            functionToExecute
        });
        //await projectZoneUtilities.sendHexCommand();
    }
    else if (([...goBackwards, ...goForward, ...pipelineNumbers()].includes(command) ||
        command.match(/Test_\w*_[L|R]/) || command.match(/[0-9]+/gm)) && newIndex) {
        const projectZoneUtilities = new project_zone_utilities_1.projectUtilities({ storeId, id, newIndex, command });
        if ( // project zones "Map", "Lab", "Cabinet"
        [_common_types_1.EInstallationIds.ProjectMap, _common_types_1.EInstallationIds.ProjectLab, _common_types_1.EInstallationIds.ProjectCabinet].includes(id)) {
            const functionToExecute = projectZoneUtilities.sendUniversalTransitionCommand.bind(projectZoneUtilities);
            yield (0, time_utilities_1.throttlerFunction)({
                timeout: 1000,
                storeId,
                functionToExecute
            });
            //await projectZoneUtilities.sendUniversalTransitionCommand();
        }
        else if ( // project zones "Tanks"
        [_common_types_1.EInstallationIds.ProjectTankEcology, _common_types_1.EInstallationIds.ProjectTankTechnology, _common_types_1.EInstallationIds.ProjectTankSocial].includes(id)) {
            const functionToExecute = projectZoneUtilities.sendTransitionCommandToTheTanksInstallations.bind(projectZoneUtilities);
            yield (0, time_utilities_1.throttlerFunction)({
                storeId,
                functionToExecute
            });
            // await projectZoneUtilities.sendTransitionCommandToTheTanksInstallations()
        }
        else if ( // project zone "Portraits"
        _common_types_1.EInstallationIds.ProjectPortraits === id) {
            const functionToExecute = projectZoneUtilities.sendTransitionCommandToThePortraitsInstallation.bind(projectZoneUtilities);
            yield (0, time_utilities_1.throttlerFunction)({
                storeId,
                functionToExecute
            });
            // await projectZoneUtilities.sendTransitionCommandToThePortraitsInstallation();
        }
        else if ( // project zone "Covers"
        _common_types_1.EInstallationIds.ProjectCovers === id) {
            const functionToExecute = projectZoneUtilities.sendTransitionCommandToTheCoversInstallation.bind(projectZoneUtilities);
            yield (0, time_utilities_1.throttlerFunction)({
                timeout: 2000,
                storeId,
                functionToExecute
            });
            // await projectZoneUtilities.sendTransitionCommandToTheCoversInstallation();
        }
        else if (_common_types_1.EInstallationIds.ProjectPipeline === id) {
            const functionToExecute = projectZoneUtilities.sendTransitionToThePipelineInstallation.bind(projectZoneUtilities);
            yield (0, time_utilities_1.throttlerFunction)({
                storeId,
                functionToExecute
            });
            // await projectZoneUtilities.sendTransitionToThePipelineInstallation();
        }
    }
});
exports.projectZonesSubController = projectZonesSubController;
