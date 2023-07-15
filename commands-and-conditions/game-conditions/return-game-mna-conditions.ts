import { GameControlCommand, GameSubControllerProps } from "../../types/game-types";
import { gameConditions } from "./game-conditions";
import {store} from "../../store/store";
import {StoreKeys} from "../../types/store-types";

class ReturnGameMnaConditions {

    mnaButtonsInterfaces({command}: {command: GameControlCommand}){
        return gameConditions.mnaAnalogButtons.includes(command)
    }

    mnaValidInterfaces({command}: {command: GameControlCommand}){
        return gameConditions.mnaAnalogInterfaces.includes(command)
    }

    notLastScenes() {
        return ![ 5, 6, 7 ].includes( store[StoreKeys.installationGame].scene )
    }

    stage1Right({gameState, command}: GameSubControllerProps) {
        return (
            gameState.scene === 1 &&
            gameState.cursorPosition == 1 &&
            command === GameControlCommand.Button_I_A
        )
    }

    stage2Right({gameState, command}: GameSubControllerProps) {
        return (
            gameState.scene === 2 &&
            gameState.cursorPosition === 2 &&
            command === GameControlCommand.Button_I_B
        )
    }

    stage3Default({ gameState }: GameSubControllerProps) {
        return gameState.scene === 3
    }

    stage3Right({gameState, command}: GameSubControllerProps) {
        return (
            gameState.cursorPosition === 1 &&
            [
                GameControlCommand.Button_I_A,
                GameControlCommand.Button_I_B
            ].includes(command)
        )
    }

    stage3Wrong({gameState, command}: GameSubControllerProps) {
        return (
            (
                gameState.cursorPosition === 1 &&
                command === GameControlCommand.Button_I_C
            ) ||
            (
                gameState.cursorPosition === 2 && (
                    [
                        GameControlCommand.Button_I_A,
                        GameControlCommand.Button_I_B,
                        GameControlCommand.Button_I_C
                    ].includes(command)
                )
            )
        )
    }

    stage4Default({ gameState, command }: GameSubControllerProps) {
        return (
            gameState.scene === 4 &&
            command === GameControlCommand.Button_I_C
        )
    }

    stage4Right1({ gameState }: GameSubControllerProps) {
        return gameState.cursorPosition === 2
    }

    stage4Right2({ gameState }: GameSubControllerProps) {
        return gameState.cursorPosition === 3
    }

    stage4Right3({ gameState }: GameSubControllerProps) {
        return gameState.cursorPosition === 4
    }

}

const returnGameMnaConditions = new ReturnGameMnaConditions();

export { returnGameMnaConditions };