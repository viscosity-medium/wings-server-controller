import { HttpCommands, UdpProjectCommands, HttpCommandExtended } from "../../types/command-types";
import { possibleCommandsReceivedForProjectZones } from "../../commands-and-conditions/possible-commands-received-for-project-zones";
import { AvailableInstallationIds, CommandsStandard } from "../../types/_common-types";
import { defineIndexToGoUtility } from "../../utilities/define-index-to-go-utility";
import { GameControlCommand } from "../../types/game-types";
import { wingsActionCommands } from "../../commands-and-conditions/wings-action-commands";
import {delayedComeBackToScreensaver, throttlerFunction} from "../../utilities/time-utilities";
import { projectUtilities } from "../../utilities/project-zones-utility/project-zone-utilities";
import {ProjectZonesModes, Store} from "../../types/store-types";
import {store} from "../../store/store";

export interface ProjectZonesControllerProps {

    id: AvailableInstallationIds
    storeId: keyof Store
    command: GameControlCommand | HttpCommandExtended | HttpCommands

}
const projectZonesSubController = async ({ id, storeId, command }: ProjectZonesControllerProps) => {

    const { singleCommands, goBackwards, goForward  } = possibleCommandsReceivedForProjectZones;
    const newIndex = defineIndexToGoUtility({ command, storeId });

    // I) for sending single commands (not bunch)
    if( singleCommands.includes( command as HttpCommands ) && newIndex ){

        const projectZoneUtilities = new projectUtilities({ storeId, id, newIndex, command: wingsActionCommands[ command as CommandsStandard ] });
        const functionToExecute = projectZoneUtilities.sendHexCommand.bind(projectZoneUtilities);

        await throttlerFunction({
            storeId,
            functionToExecute
        });

    // II) for sending a bunch of commands with timeouts
    } else if ( ( [ ...goBackwards, ...goForward ].includes( command as HttpCommands | UdpProjectCommands) ||
        command.match( /Test_\w*_[L|R]/ ) || command.match( /[0-9]+/gm )
    ) && newIndex ) {

        const projectZoneUtilities = new projectUtilities({ storeId, id, newIndex, command });

        // project zones:
        // "Lab",
        // "Cabinet",
        // "Entry Group 2"
        if (
            [
                AvailableInstallationIds.ProjectLab,
                AvailableInstallationIds.ProjectCabinet,
                AvailableInstallationIds.ProjectEntryGroup2
            ].includes(id)
        ) {

            const functionToExecute = projectZoneUtilities.sendUniversalTransitionCommand.bind(projectZoneUtilities);

            // does not allow the function to be started before the timeout ends
            await throttlerFunction({
                timeout: 1000,
                storeId,
                functionToExecute
            });

        // project zones:
        // "Tanks"(Social, Ecology, Technology)
        } else if (
            [
                AvailableInstallationIds.ProjectTankSocial,
                AvailableInstallationIds.ProjectTankEcology,
                AvailableInstallationIds.ProjectTankTechnology
            ].includes(id)
        ) {

            const functionToExecute = projectZoneUtilities.sendTransitionCommandToTheTanksInstallations.bind(projectZoneUtilities);

            await throttlerFunction({
                storeId,
                functionToExecute
            });

        // project zone
        // "Portraits"
        } else if (
            [
                AvailableInstallationIds.ProjectPortraits
            ].includes(id)
        ) {

            const functionToExecute = await projectZoneUtilities.sendTransitionCommandToThePortraitsInstallations.bind(projectZoneUtilities);

            await throttlerFunction({
                storeId,
                functionToExecute
            });

        // project zone
        // "Covers"
        // "Maps"
        } else if (
            [
                AvailableInstallationIds.ProjectCovers,
                AvailableInstallationIds.ProjectMap
            ].includes(id)
        ) {

            const functionToExecute = projectZoneUtilities.sendTransitionCommandToTheMapOrCoversInstallation.bind(projectZoneUtilities);

            await throttlerFunction({
                timeout: 1500,
                storeId,
                functionToExecute
            });

        // project zone "Pipeline"
        } else if (
            [
                AvailableInstallationIds.ProjectPipeline
            ].includes(id)
        ) {

            const functionToExecute = projectZoneUtilities.sendTransitionToThePipelineInstallation.bind(projectZoneUtilities);

            await throttlerFunction({
                storeId,
                functionToExecute
            });

        }

    // III) return to the Screensaver
    } else if( command === "GoToScreensaver" ){

        store[storeId].mode = ProjectZonesModes.main;
        delayedComeBackToScreensaver({
            storeId,
            id,
            type: "active",
            idleTime: "00:00"
        });

    }

}

export {
    projectZonesSubController
}