import {GameControlCommand} from "../../types/game-types";
import {returnHexMessageCommand} from "../../utilities/hex-transform-utilities";
import {
    gameAMessagesCommands,
    gameBMessagesCommands, gameCMessagesCommands
} from "../game-commands/game-messages-commands";

class GameSystemMessage {
    returnMessageForMnaMode({ command }: { command: GameControlCommand }){
        if( command === GameControlCommand.Button_I_A ){
            return  returnHexMessageCommand( gameAMessagesCommands );
        } else if( command === GameControlCommand.Button_I_B ){
            return  returnHexMessageCommand( gameBMessagesCommands );
        } else if( command === GameControlCommand.Button_I_C ){
            return  returnHexMessageCommand( gameCMessagesCommands );
        }
    }
    returnMessageForSodMode({ command }: { command: GameControlCommand }){
        if( command === GameControlCommand.Button_II_A ){
            return  returnHexMessageCommand( gameAMessagesCommands );
        } else if( command === GameControlCommand.Button_II_B ){
            return  returnHexMessageCommand( gameBMessagesCommands );
        } else if( command === GameControlCommand.Button_II_C ){
            return  returnHexMessageCommand( gameCMessagesCommands );
        }
    }
    returnMessageForLoopingMode({ command }: { command: GameControlCommand }){
        if( command === GameControlCommand.Button_III_A ){
            return  returnHexMessageCommand( gameAMessagesCommands );
        } else if( command === GameControlCommand.Button_III_B ){
            return  returnHexMessageCommand( gameBMessagesCommands );
        } else if( command === GameControlCommand.Button_III_C ){
            return  returnHexMessageCommand( gameCMessagesCommands );
        }
    }
}

const gameSystemMessage = new  GameSystemMessage();

export {
    gameSystemMessage
}