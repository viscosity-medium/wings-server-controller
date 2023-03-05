import { defineIndexToGoUtility } from "../define-index-to-go-utility";
import { UdpProjectUtilities } from "../udp/udp-projection-zone-utilities";
import { EGameControlCommand } from "../../types/game-types";
import { EInstallationIds } from "../../types/_common-types";
import { IStore } from "../../types/store-types";

export interface IProjectZonesControllerProps {
    id: EInstallationIds
    storeId: keyof IStore
    command: EGameControlCommand

}
const projectZonesController = async ({ id, storeId, command }: IProjectZonesControllerProps) => {

    const newIndex = defineIndexToGoUtility({ command, storeId });

    if( ( ["Encoder_Left", "Encoder_Right"].includes( command ) ||
            command.match( /Test_\w*_[L|R]/ ) ) && newIndex
    ) {

        const udpProjectionZoneUtilities = new UdpProjectUtilities({ storeId, id, newIndex, command });

        if ( // project zones "Map", "Lab", "Cabinet"
            [ EInstallationIds.ProjectMap, EInstallationIds.ProjectLab, EInstallationIds.ProjectCabinet
        ].includes(id) ) {

            await udpProjectionZoneUtilities.sendUniversalTransitionCommand();

        } else if ( // project zone "Portraits"
            EInstallationIds.ProjectPortraits === id
        ) {

            await udpProjectionZoneUtilities.sendTransitionCommandToThePortraitsInstallation();

        } else if ( // project zone "Covers"
            EInstallationIds.ProjectCovers === id
        ) {

            await udpProjectionZoneUtilities.sendTransitionCommandToTheCoversInstallation();

        } else if ( // project zone "Pipeline"
            EInstallationIds.ProjectPipeline === id
        ) {



        }
    }

}

export {
    projectZonesController
}