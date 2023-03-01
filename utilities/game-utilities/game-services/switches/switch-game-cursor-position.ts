import {EGameModes, EStoreKeys} from "../../../../types/store-types";
import {store} from "../../../../store/store";
import {gameServices} from "../game-services";
import {EGameControlCommand} from "../../../../types/game-types";

const switchGameCursorPosition = ({command}: { command: EGameControlCommand}) => {

    const gameState = store[EStoreKeys.installationGame];

    if( gameState.mode === EGameModes.mna ){

        if( command === "Encoder_I_LEFT" ){
            gameServices.changeCursorPositionToTheLeft();
        }

        if( command === "Encoder_I_RIGHT" ){
            gameServices.changeCursorPositionToTheRight();
        }

    }

    if( gameState.mode === EGameModes.sod ){

        if( command === "Encoder_II_LEFT" ){
            gameServices.changeCursorPositionToTheLeft();
        }

        if( command === "Encoder_II_RIGHT" ){
            gameServices.changeCursorPositionToTheRight();
        }

    }

    if( gameState.mode === EGameModes.looping ){

        if( command === "Encoder_III_LEFT" ){
            gameServices.changeCursorPositionToTheLeft();
        }

        if( command === "Encoder_III_RIGHT" ){
            gameServices.changeCursorPositionToTheRight();
        }

    }

}

export {
    switchGameCursorPosition
}