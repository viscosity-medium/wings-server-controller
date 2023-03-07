import { EGameControlCommand, TGameModeSwitch } from "../../../types/game-types";
import { transformToHexArray } from "../../hex-transform-utilities";
import { wingsActionCommands } from "../../../commands-and-conditions/wings-action-commands";
import { gameServices } from "../game-services";
import { EGameModes } from "../../../types/store-types";

const {
    SpecificGameScene
} = wingsActionCommands;

// mode switch after Button_N_A || Button_N_B || Button_N_C || Button_N_D is triggered
const  switchGameMode: TGameModeSwitch = async ({ id, command, A, B, C, D }) => {

    if ( EGameControlCommand.Button_N_A === command && A ){

        const commandHex6 = transformToHexArray( SpecificGameScene( "goToDemo" )); // switching to Demo startup mode
        await gameServices.executeTransitionToSpecificMode({
            id, commandHex6, mode: EGameModes.demo,
        });

    }

    if ( EGameControlCommand.Button_N_B === command && B ){

        const commandHex6 = transformToHexArray( SpecificGameScene( "goToMnaModeScene1" ) ); // switching to MNA startup mode
        await gameServices.executeTransitionToSpecificMode({
            id, commandHex6, mode: EGameModes.mna, scene: 1, cursorPosition: 1, messageStatus: 0
        });

    }

    if ( EGameControlCommand.Button_N_C === command && C ){

        const commandHex6 = transformToHexArray( SpecificGameScene( "goToSodModeScene1" ) ); // switching to SOD startup mode
        await gameServices.executeTransitionToSpecificMode({
            id, commandHex6, mode: EGameModes.sod, scene: 1, cursorPosition: 1, messageStatus: 0
        });

    }

    if ( EGameControlCommand.Button_N_D === command && D ){

        const commandHex6 = transformToHexArray( SpecificGameScene( "goToLoopingModeScene1" ) );// switching to Looping startup mode
        await gameServices.executeTransitionToSpecificMode({
            id, commandHex6, mode: EGameModes.looping, scene: 1, cursorPosition: 1, messageStatus: 0
        });

    }
}

export {
    switchGameMode
}