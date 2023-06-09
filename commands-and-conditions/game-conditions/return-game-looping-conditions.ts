import {EGameControlCommand, IGameSubControllerProps} from "../../types/game-types";
import {gameConditions} from "./game-conditions";
import {store} from "../../store/store";
import {EStoreKeys} from "../../types/store-types";

class ReturnGameLoopingConditions {

   loopingButtonsInterfaces({command}: {command: EGameControlCommand}){
        return gameConditions.loopingAnalogButtons.includes(command)
    }

    loopingValidInterfaces({command}: {command: EGameControlCommand}){
        return gameConditions.loopingAnalogInterfaces.includes(command)
    }

    notLastScenes() {
        return ![ 4 ].includes( store[EStoreKeys.installationGame].scene )
    }

    condition1Right({gameState, command}: IGameSubControllerProps) {
        return ( gameState.scene === 1 &&
            [1, 2].includes(gameState.cursorPosition) &&
            command === EGameControlCommand.Button_III_A
        )
    }

    condition2Default({gameState, command}: IGameSubControllerProps) {
        return (
            gameState.scene === 2
        )
    }


    condition2Right({gameState, command}: IGameSubControllerProps) {
        return (
            (
               [
                   EGameControlCommand.Button_III_B
               ].includes(command)

            ) && gameState.cursorPosition === 2
        )
    }

    condition2Wrong({gameState, command}: IGameSubControllerProps) {
        return (
            (
                [1, 2, 3].includes(gameState.cursorPosition) &&
                command === EGameControlCommand.Button_III_C
            ) ||
            (
                gameState.cursorPosition === 3 &&
                [
                    EGameControlCommand.Button_III_A,
                    EGameControlCommand.Button_III_B,
                ].includes(command)
            )
        )
    }


    condition3Default({ gameState, command }: IGameSubControllerProps) {
        return (
            gameState.scene === 3
        )
    }

    condition3Right({ gameState, command }: IGameSubControllerProps) {
        return (
            gameState.cursorPosition === 1 &&
            [
                EGameControlCommand.Button_III_B
            ].includes(command)
        )
    }

    condition3Wrong({ gameState, command }: IGameSubControllerProps) {
        return (
            (
                [1, 2, 3].includes(gameState.cursorPosition) &&
                command === EGameControlCommand.Button_III_C
            ) ||
            (
                gameState.cursorPosition === 3 &&
                [
                    EGameControlCommand.Button_III_A,
                    EGameControlCommand.Button_III_B,
                ].includes(command)
            )
        )
    }

}

const returnGameLoopingConditions = new ReturnGameLoopingConditions();

export {returnGameLoopingConditions};