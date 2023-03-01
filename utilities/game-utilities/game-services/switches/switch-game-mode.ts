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
const  switchGameMode: TGameModeSwitch = async ({ command, A, B, C, D }) => {

    if ( command === EGameControlCommand.Button_N_A && A ){

        const commandHex6 = transformToHexArray( specificGameScene.commandAction("goToDemo" )); // switching to Demo startup mode
        await gameServices.executeTransitionToSpecificMode({
            commandHex6, mode: EGameModes.demo,
        });

    }

    if ( command === EGameControlCommand.Button_N_B && B ){

        const commandHex6 = transformToHexArray( specificGameScene.commandAction("goToMnaModeScene1") ); // switching to MNA startup mode
        await gameServices.executeTransitionToSpecificMode({
            commandHex6, mode: EGameModes.mna, scene: 1, cursorPosition: 1, messageStatus: 0
        });

    }

    if ( command === EGameControlCommand.Button_N_C && C ){

        const commandHex6 = transformToHexArray( specificGameScene.commandAction("goToSodModeScene1") ); // switching to SOD startup mode
        await gameServices.executeTransitionToSpecificMode({
            commandHex6, mode: EGameModes.sod, scene: 1, cursorPosition: 1, messageStatus: 0
        });

    }

    if ( EGameControlCommand.Button_N_D === command && D ){

        const commandHex6 = transformToHexArray( specificGameScene.commandAction("goToLoopingModeScene1") );// switching to Looping startup mode
        await gameServices.executeTransitionToSpecificMode({
            commandHex6, mode: EGameModes.looping, scene: 1, cursorPosition: 1, messageStatus: 0
        });

    }
}

export {
    switchGameMode
}