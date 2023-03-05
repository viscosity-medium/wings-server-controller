import { transformToHexArray } from "../../../hex-transform-utilities";
import {EGameControlCommand, TGameModeSwitch} from "../../../../types/game-types";
import { gameConditions } from "../../game-conditions/game-conditions";
import { gameServices } from "../game-services";
import { EGameModes } from "../../../../types/store-types";
import {actionCommands} from "../../../../commands/action-commands";

const {
    specificGameScene
} = actionCommands;

// mode switch after Button_N_A || Button_N_B || Button_N_C || Button_N_D is triggered
const  switchGameMode: TGameModeSwitch = async ({ id, command, A, B, C, D }) => {

    if ( [EGameControlCommand.Button_N_A, EGameControlCommand.Test_Button_N_A].includes(command)  && A ){

        const commandHex6 = transformToHexArray( specificGameScene.commandAction("goToDemo" )); // switching to Demo startup mode
        await gameServices.executeTransitionToSpecificMode({
            id, commandHex6, mode: EGameModes.demo,
        });

    }

    if ( [EGameControlCommand.Button_N_B, EGameControlCommand.Test_Button_N_B].includes(command) && B ){

        const commandHex6 = transformToHexArray( specificGameScene.commandAction("goToMnaModeScene1") ); // switching to MNA startup mode
        await gameServices.executeTransitionToSpecificMode({
            id, commandHex6, mode: EGameModes.mna, scene: 1, cursorPosition: 1, messageStatus: 0
        });

    }

    if ( [EGameControlCommand.Button_N_C, EGameControlCommand.Test_Button_N_C].includes(command) && C ){

        const commandHex6 = transformToHexArray( specificGameScene.commandAction("goToSodModeScene1") ); // switching to SOD startup mode
        await gameServices.executeTransitionToSpecificMode({
            id, commandHex6, mode: EGameModes.sod, scene: 1, cursorPosition: 1, messageStatus: 0
        });

    }

    if ( [EGameControlCommand.Button_N_D, EGameControlCommand.Test_Button_N_D].includes(command) && D ){

        const commandHex6 = transformToHexArray( specificGameScene.commandAction("goToLoopingModeScene1") );// switching to Looping startup mode
        await gameServices.executeTransitionToSpecificMode({
            id, commandHex6, mode: EGameModes.looping, scene: 1, cursorPosition: 1, messageStatus: 0
        });

    }
}

export {
    switchGameMode
}