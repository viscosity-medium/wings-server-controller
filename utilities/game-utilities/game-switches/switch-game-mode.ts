import { GameControlCommand, GameModeSwitch } from "../../../types/game-types";
import { transformToHexArray } from "../../hex-transform-utilities";
import { wingsActionCommands } from "../../../commands-and-conditions/wings-action-commands";
import { gameServices } from "../game-services";
import { GameModes } from "../../../types/store-types";

const {
    SpecificGameScene
} = wingsActionCommands;

// mode switch after Button_N_A || Button_N_B || Button_N_C || Button_N_D is triggered
const  switchGameMode: GameModeSwitch = async ({ id, command, A, B, C, D, N }) => {

    if ( GameControlCommand.Button_N_N === command && N ){

        const commandHex6 = transformToHexArray( SpecificGameScene( "goToScreensaver" )); // switching to Screensaver startup mode
        await gameServices.executeTransitionToSpecificMode({
            id, commandHex6, mode: GameModes.screensaver,
        });

    }

    if ( GameControlCommand.Button_N_A === command && A ){

        const commandHex6 = transformToHexArray( SpecificGameScene( "goToDemo" )); // switching to Demo startup mode
        await gameServices.executeTransitionToSpecificMode({
            id, commandHex6, mode: GameModes.demo,
        });

    }

    if ( GameControlCommand.Button_N_B === command && B ){

        const commandHex6 = transformToHexArray( SpecificGameScene( "goToMnaModeScene1" ) ); // switching to MNA startup mode
        await gameServices.executeTransitionToSpecificMode({
            id, commandHex6, mode: GameModes.mna, scene: 1, cursorPosition: 1, messageStatus: 0
        });

    }

    if ( GameControlCommand.Button_N_C === command && C ){

        const commandHex6 = transformToHexArray( SpecificGameScene( "goToSodModeScene1" ) ); // switching to SOD startup mode
        await gameServices.executeTransitionToSpecificMode({
            id, commandHex6, mode: GameModes.sod, scene: 1, cursorPosition: 1, messageStatus: 0
        });

    }

    if ( GameControlCommand.Button_N_D === command && D ){

        const commandHex6 = transformToHexArray( SpecificGameScene( "goToLoopingModeScene1" ) );// switching to Looping startup mode
        await gameServices.executeTransitionToSpecificMode({
            id, commandHex6, mode: GameModes.looping, scene: 1, cursorPosition: 1, messageStatus: 0
        });

    }
}

export {
    switchGameMode
}