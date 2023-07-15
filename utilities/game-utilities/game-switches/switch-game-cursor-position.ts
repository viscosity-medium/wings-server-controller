import {GameModes, StoreKeys} from "../../../types/store-types";
import {store} from "../../../store/store";
import {gameServices} from "../game-services";
import {GameControlCommand} from "../../../types/game-types";
import {AvailableInstallationIds} from "../../../types/_common-types";

const switchGameCursorPosition = async ({ id, command }: { id: AvailableInstallationIds, command: GameControlCommand}) => {

    const gameState = store[StoreKeys.installationGame];

    if( gameState.mode === GameModes.mna ){

        if( command === "Encoder_I_LEFT" ){
            await gameServices.changeCursorPositionToTheLeft({ id });
        }

        if( command === "Encoder_I_RIGHT" ){
            await gameServices.changeCursorPositionToTheRight({ id });
        }

    }

    if( gameState.mode === GameModes.sod ){

        if( command === "Encoder_II_LEFT" ){
            await gameServices.changeCursorPositionToTheLeft({ id });
        }

        if( command === "Encoder_II_RIGHT" ){
            await gameServices.changeCursorPositionToTheRight({ id });
        }

    }

    if( gameState.mode === GameModes.looping ){

        if( command === "Encoder_III_LEFT" ){
            await gameServices.changeCursorPositionToTheLeft({ id });
        }

        if( command === "Encoder_III_RIGHT" ){
            await gameServices.changeCursorPositionToTheRight({ id });
        }

    }

}

export {
    switchGameCursorPosition
}