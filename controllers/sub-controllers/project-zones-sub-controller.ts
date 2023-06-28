import { EHttpCommands, EUdpProjectCommands, THttpCommand } from "../../types/command-types";
import { possibleCommandsReceivedForProjectZones } from "../../commands-and-conditions/possible-commands-received-for-project-zones";
import { EInstallationIds, TCommandsStandard } from "../../types/_common-types";
import { defineIndexToGoUtility } from "../../utilities/define-index-to-go-utility";
import { EGameControlCommand } from "../../types/game-types";
import { wingsActionCommands } from "../../commands-and-conditions/wings-action-commands";
import { throttlerFunction } from "../../utilities/time-utilities";
import { projectUtilities } from "../../utilities/project-zones-utility/project-zone-utilities";
import { IStore } from "../../types/store-types";

export interface IProjectZonesControllerProps {

    id: EInstallationIds
    storeId: keyof IStore
    command: EGameControlCommand | THttpCommand | EHttpCommands

}
const projectZonesSubController = async ({ id, storeId, command }: IProjectZonesControllerProps) => {

    const { hexSingleCommands, goBackwards, goForward, pipelineNumbers } = possibleCommandsReceivedForProjectZones;
    const newIndex = defineIndexToGoUtility({ command, storeId });

    if( hexSingleCommands.includes( command as EHttpCommands ) && newIndex ){

        const projectZoneUtilities = new projectUtilities({ storeId, id, newIndex, command: wingsActionCommands[ command as TCommandsStandard ] });
        const functionToExecute = projectZoneUtilities.sendHexCommand.bind(projectZoneUtilities);

        await throttlerFunction({
            storeId,
            functionToExecute
        });


    } else if ( ( [ ...goBackwards, ...goForward, ...pipelineNumbers() ].includes( command as EHttpCommands | EUdpProjectCommands) ||
        command.match( /Test_\w*_[L|R]/ ) || command.match( /[0-9]+/gm )
    ) && newIndex ) {

        const projectZoneUtilities = new projectUtilities({ storeId, id, newIndex, command });

        // project zones:
        // "Lab",
        // "Cabinet",
        // "Entry Group"
        if (
            [ EInstallationIds.ProjectLab, EInstallationIds.ProjectCabinet, EInstallationIds.ProjectEntryGroup2 ].includes(id)
        ) {

            const functionToExecute = projectZoneUtilities.sendUniversalTransitionCommand.bind(projectZoneUtilities);

            // does not allow the function to be started before the timeout ends
            await throttlerFunction({
                timeout: 1000,
                storeId,
                functionToExecute
            });

        // project zones:
        // "Tanks"(Ecology, Technology, Social)
        } else if (
            [ EInstallationIds.ProjectTankEcology, EInstallationIds.ProjectTankTechnology, EInstallationIds.ProjectTankSocial ].includes(id)
        ) {

            const functionToExecute = projectZoneUtilities.sendTransitionCommandToTheTanksInstallations.bind(projectZoneUtilities);

            await throttlerFunction({
                storeId,
                functionToExecute
            });

        // project zone
        // "Portraits"
        } else if (
            EInstallationIds.ProjectPortraits === id
        ) {

            const functionToExecute = await projectZoneUtilities.sendTransitionCommandToThePortraitsInstallation.bind(projectZoneUtilities);

            await throttlerFunction({
                storeId,
                functionToExecute
            });

        // project zone
        // "Covers"
        // "Maps"
        } else if (
            [EInstallationIds.ProjectCovers, EInstallationIds.ProjectMap].includes(id)
        ) {

            const functionToExecute = projectZoneUtilities.sendTransitionCommandToTheMapOrCoversInstallation.bind(projectZoneUtilities);

            await throttlerFunction({
                timeout: 2000,
                storeId,
                functionToExecute
            });

        // project zone "Pipeline"
        } else if (
            EInstallationIds.ProjectPipeline === id
        ) {

            const functionToExecute = projectZoneUtilities.sendTransitionToThePipelineInstallation.bind(projectZoneUtilities);

            await throttlerFunction({
                storeId,
                functionToExecute
            });

        }
    }

}

export {
    projectZonesSubController
}