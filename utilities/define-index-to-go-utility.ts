import { possibleCommandsReceivedForProjectZones } from "../commands-and-conditions/possible-commands-received-for-project-zones";
import {EHttpCommands, EUdpProjectCommands, IDefineIndexToGoUtility} from "../types/command-types";
import { EStoreKeys } from "../types/store-types";
import { store } from "../store/store";

// file index to go definer for http and udp
export const defineIndexToGoUtility = ({ command, storeId }: IDefineIndexToGoUtility) => {

    const { goBackwards, goForward } = possibleCommandsReceivedForProjectZones;
    const { numberOfFiles } = store[ storeId ]
    let newIndex = 0;

    // special for installationProject1 (different from other project installations)

    if( EStoreKeys.installationProjectPortraits === storeId ){

        if( command.match( /^[0-9]+$/ ) ) {

            newIndex = +command;

        } else if( goForward.includes( command as EHttpCommands | EUdpProjectCommands) ) {

            newIndex = store[ storeId ].numberOfFiles;

        } else if( goBackwards.includes( command as EHttpCommands | EUdpProjectCommands ) ) {

            newIndex = store[ storeId ].numberOfFiles - 1;

        }

    } else {

        if( command.toString().match( /^[0-9]+$/ ) ){ // if index position was retrieved

            newIndex = +command;

        } else if( goForward.includes( command as EHttpCommands | EUdpProjectCommands ) && store[ storeId ].index < numberOfFiles) {

            newIndex = (store[ storeId ].index + 1);

        } else if( goBackwards.includes( command as EHttpCommands | EUdpProjectCommands ) && store[ storeId ].index !== 1) {

            newIndex = (store[ storeId ].index - 1);

        } else if( goForward.includes( command  as EHttpCommands | EUdpProjectCommands) && store[ storeId ].index === +numberOfFiles){

            newIndex = 1;

        } else if( goBackwards.includes( command as EHttpCommands | EUdpProjectCommands ) && store[ storeId ].index === 1 ){

            newIndex = +numberOfFiles;

        }

    }

    if( !newIndex && possibleCommandsReceivedForProjectZones.hexSingleCommands.includes( command as EHttpCommands )){

        newIndex = store[ storeId ].index

    }

    return newIndex !== 0 ? newIndex.toString().length < 2 ? `0${newIndex}` : `${newIndex}` : undefined;
}