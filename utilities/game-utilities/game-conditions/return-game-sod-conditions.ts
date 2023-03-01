import { EGameControlCommand, IGameSubControllerProps } from "../../../types/game-types";
import { gameConditions } from "./game-conditions";

class ReturnGameSodConditions {

    sodValidInterfaces({ command }: { command: EGameControlCommand }){
        return gameConditions.sodValidInterfaces.includes( command )
    }

    condition1Right({ gameState, command }: IGameSubControllerProps){
        return (
            gameState.scene === 1 &&
            gameState.cursorPosition === 2 &&
            command === EGameControlCommand.Button_II_A
        )
    }

    condition2Right({ gameState, command }: IGameSubControllerProps){
        return(
            gameState.scene === 2 &&
            gameState.cursorPosition === 3 &&
            command === EGameControlCommand.Button_II_A
        )
    }

    condition3Right({ gameState, command }: IGameSubControllerProps){
        return (
            gameState.scene === 3 &&
            gameState.cursorPosition === 1 &&
            command === EGameControlCommand.Button_II_A
        )
    }

    condition4Right({ gameState, command }: IGameSubControllerProps){
        return (
            gameState.scene === 4 &&
            gameState.cursorPosition === 2 &&
            command === EGameControlCommand.Button_II_B
        )
    }

}

const returnGameSodConditions = new ReturnGameSodConditions();

export {
    returnGameSodConditions
}