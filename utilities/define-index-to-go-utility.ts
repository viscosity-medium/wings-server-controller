import {
    possibleCommandsReceivedForProjectZones
} from "../commands-and-conditions/possible-commands-received-for-project-zones";
import {HttpCommands, UdpProjectCommands, DefineIndexToGoUtility} from "../types/command-types";
import {StoreKeys} from "../types/store-types";
import {store} from "../store/store";

// file index to go definer for http and udp
export const defineIndexToGoUtility = ({ command, storeId }: DefineIndexToGoUtility) => {

    const { goBackwards, goForward } = possibleCommandsReceivedForProjectZones;
    const { numberOfFiles } = store[ storeId ];
    let newIndex = 0;

    // special for installationProjectPortraits (different from other project installations)
    if( StoreKeys.installationProjectPortraits === storeId ){

        if( command.match( /^[0-9]+$/ ) ) {

            newIndex = +command;

        } else if( goForward.includes( command as HttpCommands | UdpProjectCommands) ) {

            newIndex = store[ storeId ].numberOfFiles;

        } else if( goBackwards.includes( command as HttpCommands | UdpProjectCommands ) ) {

            newIndex = store[ storeId ].numberOfFiles - 1;

        }

    // for other installations
    } else {

        if(
            command.toString().match( /^[T|D]?[0-9]+$/ ) ||
            ( storeId === StoreKeys.installationProjectPipeline && possibleCommandsReceivedForProjectZones.pipelineNumbers().includes( command ))
        ){ // if index position was retrieved

            newIndex = +(command.replace(/\D*/gm, ""));

        } else if( goForward.includes( command as HttpCommands | UdpProjectCommands ) && store[ storeId ].index < numberOfFiles) {

            newIndex = (store[ storeId ].index + 1);

        } else if( goBackwards.includes( command as HttpCommands | UdpProjectCommands ) && store[ storeId ].index !== 1) {

            newIndex = (store[ storeId ].index - 1);

        } else if( goForward.includes( command  as HttpCommands | UdpProjectCommands) && store[ storeId ].index === +numberOfFiles){

            newIndex = 1;

        } else if( goBackwards.includes( command as HttpCommands | UdpProjectCommands ) && store[ storeId ].index === 1 ){

            newIndex = +numberOfFiles;

        }

    }

    // for movie manipulation commands (like "Pause" or "ContinuePlay")
    if( !newIndex && possibleCommandsReceivedForProjectZones.singleCommands.includes( command as HttpCommands )){

        newIndex = store[ storeId ].index;

    }

    return newIndex !== 0 ? newIndex.toString().length < 2 ? `0${newIndex}` : `${newIndex}` : undefined;
}