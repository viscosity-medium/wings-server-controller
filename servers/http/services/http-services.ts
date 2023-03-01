import { EProjectZonesModes, IStore } from "../../../types/store-types";
import { returnCompositeCommandUtility } from "../../../utilities/composite-command-utility";
import { executeSimpleCommandUtility } from "../../../utilities/simple-command-utility";
import { defineIndexToGoUtility } from "../../../utilities/define-index-to-go-utility";
import {ISendCommandHttpProps, ISwitchAnalogControllerHttpProps} from "../../../types/command-types";
import { setStoreValue } from "../../../utilities/store-utility";
import { store } from "../../../store/store";
import {installationIds, systemVariables} from "../../../_environment/environment";

const { WINGS_PORT } = systemVariables;
class HttpServices {
    async sendCommand({
        installationName,
        installationId: id,
        commandName,
        commandAction,
        commandType,
        numberOfFiles,
    }: ISendCommandHttpProps){

        try {

            //N) determination of initial values
            const storeId = `installation${ id }` as keyof IStore;
            const host = installationIds[ id ].host;
            const delayLong = installationIds[ id ].delayLong;
            const delayShort = installationIds[ id ].delayShort;
            const idleTime = installationIds[ id ].idleTime;
            const port = WINGS_PORT;
            const executeCompositeCommandUtility = returnCompositeCommandUtility({ storeId, host, port, delayLong, delayShort, idleTime });

            //I) simple request (consists of only one action in command)
            if( commandType === "simpleRequest" ){

                await executeSimpleCommandUtility({ host, port, storeId, idleTime, delayLong, delayShort, commandAction });

            }

            //II) composite request (consists of several actions in command)
            if( commandType === "compositeRequest" ){

                let newIndex;
                //II.a) for transition to specific marker position (need index, so we define newIndex below)
                if( store[ storeId ].mode === EProjectZonesModes.main || commandAction.match(/\d/) ){
                    newIndex = defineIndexToGoUtility({ command: commandAction, storeId, numberOfFiles });
                    if(newIndex){

                        setStoreValue({ storeId, mode: EProjectZonesModes.main, index: +newIndex, numberOfFiles });
                        await executeCompositeCommandUtility({ xIndex: "02", yIndex: newIndex, type: "active" });
                    }

                }

                //II.b) for transition from screensaver to main timeline (default index === "1")
                if(store[ storeId ].mode === EProjectZonesModes.screensaver && !commandAction.match(/\d/)){

                    setStoreValue({
                        storeId, mode: EProjectZonesModes.main, index: 1, numberOfFiles
                    });
                    await executeCompositeCommandUtility({ xIndex: "02", yIndex: "01", type: "active" });

                }

            }

            //III) for transition from main timeline to screensaver (default index === "1")
            if(commandType === "toScreensaver"){

                setStoreValue({
                    storeId, mode: EProjectZonesModes.screensaver, index: 1, numberOfFiles
                });
                await executeCompositeCommandUtility({ xIndex: "01", yIndex: "01", type: "passive" });

            }

            //logging-block
            console.log({
                installationName,
                installationId: id,
                commandName,
                commandAction,
                commandType,
                numberOfFiles,
            });
        }

        catch (err){
            console.log(err)
        }

    }

    async switchAnalogControl({
        installationName,
        installationId: id,
        commandName,
        commandAction
    }:ISwitchAnalogControllerHttpProps){

        const storeId = `installation${ id }` as keyof IStore;
        const analogControl = !store[ storeId ].analogControl;
        const state = analogControl ? "On" : "Off";

        await setStoreValue({ storeId, analogControl });

        return {
            installationName,
            installationId: id,
            state: state
        }

    }
}
const httpServices = new HttpServices();

export { httpServices }