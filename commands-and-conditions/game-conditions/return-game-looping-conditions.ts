import { EGameControlCommand, IGameSubControllerProps } from "../../types/game-types";
import {gameConditions} from "./game-conditions";

class ReturnGameLoopingConditions {

    loopingValidInterfaces({command}: {command: EGameControlCommand}){
        return gameConditions.loopingAnalogInterfaces.includes(command)
    }

    condition1Right({gameState, command}: IGameSubControllerProps) {
        return ( gameState.scene === 1 &&
            (
                gameState.cursorPosition === 1 ||
                gameState.cursorPosition === 2
            ) &&
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
                gameState.cursorPosition === 1 ||
                gameState.cursorPosition === 2
            ) &&
            command === EGameControlCommand.Button_III_A
        )
    }

    condition2Wrong({gameState, command}: IGameSubControllerProps) {
        return (
            (
                ( gameState.cursorPosition === 1 || gameState.cursorPosition === 2 ) &&
                [
                    EGameControlCommand.Button_III_B,
                    EGameControlCommand.Button_III_C
                ].includes(command)
            ) ||
            (
                gameState.cursorPosition === 3 &&
                [
                    EGameControlCommand.Button_III_A,
                    EGameControlCommand.Button_III_B,
                    EGameControlCommand.Button_III_C
                ].includes(command)
            )
        )
    }


    condition3Right({ gameState, command }: IGameSubControllerProps) {
        return (
            gameState.scene === 3 &&
            gameState.cursorPosition === 2 &&
            command === EGameControlCommand.Button_III_B
        )
    }

}

const returnGameLoopingConditions = new ReturnGameLoopingConditions();

export {returnGameLoopingConditions};