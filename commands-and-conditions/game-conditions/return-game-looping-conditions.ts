import {GameControlCommand, GameSubControllerProps} from "../../types/game-types";
import {gameConditions} from "./game-conditions";
import {store} from "../../store/store";
import {StoreKeys} from "../../types/store-types";

class ReturnGameLoopingConditions {

   loopingButtonsInterfaces({command}: {command: GameControlCommand}){
        return gameConditions.loopingAnalogButtons.includes(command)
    }

    loopingValidInterfaces({command}: {command: GameControlCommand}){
        return gameConditions.loopingAnalogInterfaces.includes(command)
    }

    notLastScenes() {
        return ![ 4 ].includes( store[StoreKeys.installationGame].scene )
    }

    condition1Right({gameState, command}: GameSubControllerProps) {
        return ( gameState.scene === 1 &&
            [1, 2].includes(gameState.cursorPosition) &&
            command === GameControlCommand.Button_III_A
        )
    }

    condition2Default({gameState, command}: GameSubControllerProps) {
        return (
            gameState.scene === 2
        )
    }


    condition2Right({gameState, command}: GameSubControllerProps) {
        return (
            (
               [
                   GameControlCommand.Button_III_B
               ].includes(command)

            ) && gameState.cursorPosition === 2
        )
    }

    condition2Wrong({gameState, command}: GameSubControllerProps) {
        return (
            (
                [1, 2, 3].includes(gameState.cursorPosition) &&
                command === GameControlCommand.Button_III_C
            ) ||
            (
                gameState.cursorPosition === 3 &&
                [
                    GameControlCommand.Button_III_A,
                    GameControlCommand.Button_III_B,
                ].includes(command)
            )
        )
    }


    condition3Default({ gameState, command }: GameSubControllerProps) {
        return (
            gameState.scene === 3
        )
    }

    condition3Right({ gameState, command }: GameSubControllerProps) {
        return (
            gameState.cursorPosition === 1 &&
            [
                GameControlCommand.Button_III_B
            ].includes(command)
        )
    }

    condition3Wrong({ gameState, command }: GameSubControllerProps) {
        return (
            (
                [1, 2, 3].includes(gameState.cursorPosition) &&
                command === GameControlCommand.Button_III_C
            ) ||
            (
                gameState.cursorPosition === 3 &&
                [
                    GameControlCommand.Button_III_A,
                    GameControlCommand.Button_III_B,
                ].includes(command)
            )
        )
    }

}

const returnGameLoopingConditions = new ReturnGameLoopingConditions();

export {returnGameLoopingConditions};