import { possibleCommandsReceivedForProjectZones } from "../../commands-and-conditions/possible-commands-received-for-project-zones";
import { EInstallationIds, TCommandsStandard } from "../../types/_common-types";
import { defineIndexToGoUtility } from "../../utilities/define-index-to-go-utility";
import { projectUtilities } from "../../utilities/project-zones-utility/project-zone-utilities";
import { EGameControlCommand } from "../../types/game-types";
import { wingsActionCommands } from "../../commands-and-conditions/wings-action-commands";
import {EHttpCommands, EUdpProjectCommands, THttpCommand} from "../../types/command-types";
import { IStore } from "../../types/store-types";

export interface IProjectZonesControllerProps {

    id: EInstallationIds
    storeId: keyof IStore
    command: EGameControlCommand | THttpCommand | EHttpCommands

}
const projectZonesSubController = async ({ id, storeId, command }: IProjectZonesControllerProps) => {

    const { hexSingleCommands, goBackwards, goForward } = possibleCommandsReceivedForProjectZones;
    const newIndex = defineIndexToGoUtility({ command, storeId });

    if( hexSingleCommands.includes( command as EHttpCommands ) && newIndex ){

        const projectZoneUtilities = new projectUtilities({ storeId, id, newIndex, command: wingsActionCommands[ command as TCommandsStandard ] });
        await projectZoneUtilities.sendHexCommand()

    }else if( ( [...goBackwards, ...goForward, ].includes( command as EHttpCommands | EUdpProjectCommands) ||
        command.match( /Test_\w*_[L|R]/ ) || command.match( /[0-9]+/gm )
    ) && newIndex ) {

        const projectZoneUtilities = new projectUtilities({ storeId, id, newIndex, command });

        if ( // project zones "Map", "Lab", "Cabinet"
            [ EInstallationIds.ProjectMap, EInstallationIds.ProjectLab, EInstallationIds.ProjectCabinet ].includes(id)
        ) {

            await projectZoneUtilities.sendUniversalTransitionCommand();

        }else if ( // project zones "Tanks"
            [ EInstallationIds.ProjectTankEcology, EInstallationIds.ProjectTankTechnology, EInstallationIds.ProjectTankSocial].includes(id)
        ){

            await projectZoneUtilities.sendTransitionCommandToTheTanksInstallations()

        } else if ( // project zone "Portraits"
            EInstallationIds.ProjectPortraits === id
        ) {

            await projectZoneUtilities.sendTransitionCommandToThePortraitsInstallation();

        } else if ( // project zone "Covers"
            EInstallationIds.ProjectCovers === id
        ) {

            await projectZoneUtilities.sendTransitionCommandToTheCoversInstallation();

        }
    }

}

export {
    projectZonesSubController
}