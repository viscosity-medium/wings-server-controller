import { GameControlCommand, GameSubControllerProps } from "../../types/game-types";
import { gameConditions } from "./game-conditions";
import {store} from "../../store/store";
import {StoreKeys} from "../../types/store-types";

class ReturnGameSodConditions {

    sodButtonsInterfaces({command}: {command: GameControlCommand}){
        return gameConditions.sodAnalogButtons.includes(command)
    }

    sodValidInterfaces({ command }: { command: GameControlCommand }){
        return gameConditions.sodAnalogInterfaces.includes( command )
    }

    notLastScenes() {
        return ![ 5 ].includes( store[StoreKeys.installationGame].scene )
    }

    condition1Right({ gameState, command }: GameSubControllerProps){
        return (
            gameState.scene === 1 &&
            gameState.cursorPosition === 2 &&
            command === GameControlCommand.Button_II_A
        )
    }

    condition2Right({ gameState, command }: GameSubControllerProps){
        return(
            gameState.scene === 2 &&
            gameState.cursorPosition === 3 &&
            command === GameControlCommand.Button_II_A
        )
    }

    condition3Right({ gameState, command }: GameSubControllerProps){
        return (
            gameState.scene === 3 &&
            gameState.cursorPosition === 1 &&
            command === GameControlCommand.Button_II_A
        )
    }

    condition4Right({ gameState, command }: GameSubControllerProps){
        return (
            gameState.scene === 4 &&
            gameState.cursorPosition === 2 &&
            command === GameControlCommand.Button_II_B
        )
    }

}

const returnGameSodConditions = new ReturnGameSodConditions();

export {
    returnGameSodConditions
}