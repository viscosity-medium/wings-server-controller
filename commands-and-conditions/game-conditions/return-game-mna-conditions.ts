import { EGameControlCommand, IGameSubControllerProps } from "../../types/game-types";
import { gameConditions } from "./game-conditions";

class ReturnGameMnaConditions {

    mnaValidInterfaces({command}: {command: EGameControlCommand}){
        return gameConditions.mnaAnalogInterfaces.includes(command)
    }

    stage1Right({gameState, command}: IGameSubControllerProps) {
        return (
            gameState.scene === 1 &&
            gameState.cursorPosition == 1 &&
            command === EGameControlCommand.Button_I_A
        )
    }

    stage2Right({gameState, command}: IGameSubControllerProps) {
        return (
            gameState.scene === 2 &&
            gameState.cursorPosition === 2 &&
            command === EGameControlCommand.Button_I_B
        )
    }

    stage3Default({ gameState }: IGameSubControllerProps) {
        return gameState.scene === 3
    }

    stage3Right({gameState, command}: IGameSubControllerProps) {
        return (
            gameState.cursorPosition === 1 &&
            [
                EGameControlCommand.Button_I_A,
                EGameControlCommand.Button_I_B
            ].includes(command)
        )
    }

    stage3Wrong({gameState, command}: IGameSubControllerProps) {
        return (
            (
                gameState.cursorPosition === 1 &&
                command === EGameControlCommand.Button_I_C
            ) ||
            (
                gameState.cursorPosition === 2 && (
                    [
                        EGameControlCommand.Button_I_A,
                        EGameControlCommand.Button_I_B,
                        EGameControlCommand.Button_I_C
                    ].includes(command)
                )
            )
        )
    }

    stage4Default({ gameState, command }: IGameSubControllerProps) {
        return (
            gameState.scene === 4 &&
            command === EGameControlCommand.Button_I_C
        )
    }

    stage4Right1({ gameState }: IGameSubControllerProps) {
        return gameState.cursorPosition === 2
    }

    stage4Right2({ gameState }: IGameSubControllerProps) {
        return gameState.cursorPosition === 3
    }

    stage4Right3({ gameState }: IGameSubControllerProps) {
        return gameState.cursorPosition === 4
    }


}

const returnGameMnaConditions = new ReturnGameMnaConditions();

export { returnGameMnaConditions };