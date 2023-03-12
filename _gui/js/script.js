//encoders

const encoderNLeft = document.querySelector(".encoderNLeft");
const encoderNRight = document.querySelector(".encoderNRight");
const encoderILeft = document.querySelector(".encoderILeft");
const encoderIRight = document.querySelector(".encoderIRight");
const encoderIILeft = document.querySelector(".encoderIILeft");
const encoderIIRight = document.querySelector(".encoderIIRight");
const encoderIIILeft = document.querySelector(".encoderIIILeft");
const encoderIIIRight = document.querySelector(".encoderIIIRight");


//buttons
const buttonNA = document.querySelector(".buttonNA");
const buttonNB = document.querySelector(".buttonNB");
const buttonNC = document.querySelector(".buttonNC");
const buttonND = document.querySelector(".buttonND");
const buttonIA = document.querySelector(".buttonIA");
const buttonIB = document.querySelector(".buttonIB");
const buttonIC = document.querySelector(".buttonIC");
const buttonIIA = document.querySelector(".buttonIIA");
const buttonIIB = document.querySelector(".buttonIIB");
const buttonIIC = document.querySelector(".buttonIIC");
const buttonIIIA = document.querySelector(".buttonIIIA");
const buttonIIIB = document.querySelector(".buttonIIIB");
const buttonIIIC = document.querySelector(".buttonIIIC");



const encodersObject = {

    encoderNLeft, encoderNRight,
    encoderILeft, encoderIRight,
    encoderIILeft, encoderIIRight,
    encoderIIILeft, encoderIIIRight,

}

const buttonsObject = {

    buttonNA, buttonNB, buttonNC, buttonND,
    buttonIA, buttonIB, buttonIC,
    buttonIIA, buttonIIB, buttonIIC,
    buttonIIIA, buttonIIIB, buttonIIIC

}

const guiStore = {

    encoderNLeft: {
        command: "Encoder_N_LEFT"
    },
    encoderNRight: {
        command: "Encoder_N_RIGHT"
    },
    encoderILeft: {
        command: "Encoder_I_LEFT"
    },
    encoderIRight: {
        command: "Encoder_I_RIGHT"
    },
    encoderIILeft: {
        command: "Encoder_II_LEFT"
    },
    encoderIIRight: {
        command: "Encoder_II_RIGHT"
    },
    encoderIIILeft: {
        command: "Encoder_III_LEFT"
    },
    encoderIIIRight: {
        command: "Encoder_III_RIGHT"
    },

    buttonNA: {
        command: "Button_N_A"
    }, buttonNB: {
        command: "Button_N_B"
    }, buttonNC: {
        command: "Button_N_C"
    }, buttonND: {
        command: "Button_N_D"
    },
    buttonIA: {
        command: "Button_I_A"
    }, buttonIB: {
        command: "Button_I_B"
    }, buttonIC: {
        command: "Button_I_C"
    },
    buttonIIA: {
        command: "Button_II_A"
    }, buttonIIB: {
        command: "Button_II_B"
    }, buttonIIC: {
        command: "Button_II_C"
    },
    buttonIIIA: {
        command: "Button_III_A"
    }, buttonIIIB: {
        command: "Button_III_B"
    }, buttonIIIC: {
        command: "Button_III_C"
    }

}

const mnaConditions = {
    right: [
        {
            scene: 1,
            cursorPosition: 1,
            button: "Button_I_A"
        },
        {
            scene: 2,
            cursorPosition: 2,
            button: "Button_I_B"
        },
        {
            scene: 3,
            cursorPosition: 1,
            button: "Button_I_A"
        },
        {
            scene: 3,
            cursorPosition: 1,
            button: "Button_I_B"
        },
        {
            scene: 4,
            cursorPosition: 2,
            button: "Button_I_C"
        },
        {
            scene: 4,
            cursorPosition: 3,
            button: "Button_I_C"
        },
        {
            scene: 4,
            cursorPosition: 4,
            button: "Button_I_C"
        },
    ],
    wrong: [
        {
            scene: 3,
            cursorPosition: 1,
            button: "Button_I_C"
        },
        {
            scene: 3,
            cursorPosition: 2,
            button: "Button_I_A"
        },
        {
            scene: 3,
            cursorPosition: 2,
            button: "Button_I_B"
        },
        {
            scene: 3,
            cursorPosition: 2,
            button: "Button_I_C"
        },
    ]
}

const sodConditions = {
    right: [
        {
            scene: 1,
            cursorPosition: 2,
            button: "Button_II_A"
        },
        {
            scene: 2,
            cursorPosition: 3,
            button: "Button_II_A"
        },
        {
            scene: 3,
            cursorPosition: 1,
            button: "Button_II_A"
        },
        {
            scene: 4,
            cursorPosition: 2,
            button: "Button_II_B"
        }
    ]
}

const loopingConditions = {
    right: [
        {
            scene: 1,
            cursorPosition: 1,
            button: "Button_III_A"
        },
        {
            scene: 1,
            cursorPosition: 2,
            button: "Button_III_A"
        },
        {
            scene: 2,
            cursorPosition: 1,
            button: "Button_III_A"
        },
        {
            scene: 2,
            cursorPosition: 2,
            button: "Button_III_A"
        },
        {
            scene: 3,
            cursorPosition: 2,
            button: "Button_III_B"
        },
    ]
}


function wrightDataToControlPanel ({ response }) {

    const controlPanelMode = window.document.querySelector(".mode-view-value");
    const controlPanelScene = document.querySelector(".scene-view-value");
    const controlPanelPosition = document.querySelector(".position-view-value");
    const maxControlPositions = document.querySelector(".max-positions-view-value")

    controlPanelMode.innerHTML = response.mode;
    controlPanelScene.innerHTML = response.scene;
    controlPanelPosition.innerHTML = response.cursorPosition;
    maxControlPositions.innerHTML = response.maxCursorPositions;

}

function createStageList(conditionsObject){

    const modeValue = document.querySelector(".stage-mode-value");
    const sceneValues = document.querySelector(".scene-values");
    const conditionValues = document.querySelector(".condition-values");

    sceneValues.innerHTML = "";
    conditionValues.innerHTML = "";
    conditionsObject.right.forEach(( condition ) => {

        sceneValues.insertAdjacentHTML( "beforeend",
            `<div>${condition.scene}</div>`
        );

        conditionValues.insertAdjacentHTML( "beforeend",
            `<div class="condition-value">
                    <div>Pos: ${condition.cursorPosition}</div>  
                    &nbsp;
                    &nbsp;
                   
                    <div>${condition.button}</div>
                </div>`
        );

    });
}

function wrightDataToView ({ response }) {



    if( response.mode === "mna" ) {
        createStageList(mnaConditions);

    } else if ( response.mode === "sod" ) {

        createStageList(sodConditions);

    } else if ( response.mode === "looping" ) {

        createStageList(loopingConditions);

    }

}


async function gameApi(command) {

    const url = `http://192.168.0.228:9019/game-control-panel`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            command
        })
    });

    return response.json()

}

function bindEventListeners() {

    Object.keys(encodersObject).forEach((encoder)=>{
        encodersObject[ encoder ].addEventListener("mousedown", async function() {

            const response =await gameApi( guiStore[ encoder ].command );

            wrightDataToControlPanel({ response });
            wrightDataToView({ response });

        })
    })
    
    Object.keys(buttonsObject).forEach((button)=>{
        buttonsObject[ button ].addEventListener("mousedown", async function() {

            const response = await gameApi( guiStore[ button ].command );

            wrightDataToControlPanel({ response });
            wrightDataToView({ response });

        })
    })
}


bindEventListeners()
