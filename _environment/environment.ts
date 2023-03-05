import {EInstallationIds, IInstallationIds} from "../types/_common-types";

const systemVariables = {
    BASE_URL: process.env.BASE_URL,
    WINGS_PORT: +process.env.WINGS_PORT!,
    HTTP_PORT: +process.env.HTTP_PORT!,
    UDP_PORT: +process.env.UDP_PORT!,
    SERIAL_PORT_PATH: process.env.SERIAL_PORT_PATH!,
    SERIAL_PORT_BAUD_RATE: +process.env.SERIAL_PORT_BAUD_RATE!,
    TEST_IP: process.env.INSTALLATION_ID_TEST!,
    NODE_MODE: process.env.NODE_MODE!,
    IS_DEV: process.env.NODE_MODE! === "development"
}
const installationIds: IInstallationIds = {
    ProjectPortraits: {
        host: systemVariables.IS_DEV ? systemVariables.TEST_IP : process.env.INSTALLATION_ID_PROJECT_PORTRAITS!,
        delayLong: +process.env.DELAY_TIME_LONG_PROJECT_PORTRAITS!,
        delayShort: +process.env.DELAY_TIME_SHORT_PROJECT_PORTRAITS!,
        idleTime: process.env.IDLE_TIME_PROJECT_PORTRAITS!,
        numberOfFiles: +process.env.NUMBER_OF_FILES_PROJECT_PORTRAITS!
    },
    ProjectMap: {
        host: systemVariables.IS_DEV ? systemVariables.TEST_IP : process.env.INSTALLATION_ID_PROJECT_MAP!,
        delayLong: +process.env.DELAY_TIME_LONG_PROJECT_MAP!,
        delayShort: +process.env.DELAY_TIME_SHORT_PROJECT_MAP!,
        idleTime: process.env.IDLE_TIME_PROJECT_MAP!,
        numberOfFiles: +process.env.NUMBER_OF_FILES_PROJECT_MAP!
    },
    Project3: {
        host: systemVariables.IS_DEV ? systemVariables.TEST_IP : process.env.INSTALLATION_ID_PROJECT_3!,
        delayLong: +process.env.DELAY_TIME_LONG_PROJECT_3!,
        delayShort: +process.env.DELAY_TIME_SHORT_PROJECT_3!,
        idleTime: process.env.IDLE_TIME_PROJECT_3!,
        numberOfFiles: +process.env.NUMBER_OF_FILES_PROJECT_3!
    },
    ProjectCovers: {
        host: systemVariables.IS_DEV ? systemVariables.TEST_IP : process.env.INSTALLATION_ID_PROJECT_COVERS!,
        delayLong: +process.env.DELAY_TIME_LONG_PROJECT_COVERS!,
        delayShort: +process.env.DELAY_TIME_SHORT_PROJECT_COVERS!,
        idleTime: process.env.IDLE_TIME_PROJECT_COVERS!,
        numberOfFiles: +process.env.NUMBER_OF_FILES_PROJECT_COVERS!
    },
    ProjectCabinet: {
        host: systemVariables.IS_DEV ? systemVariables.TEST_IP : process.env.INSTALLATION_ID_PROJECT_CABINET!,
        delayLong: +process.env.DELAY_TIME_LONG_5!,
        delayShort: +process.env.DELAY_TIME_SHORT_5!,
        idleTime: process.env.IDLE_TIME_5!,
        numberOfFiles: +process.env.NUMBER_OF_FILES_PROJECT_CABINET!
    },
    ProjectPipeline: {
        host: systemVariables.IS_DEV ? systemVariables.TEST_IP : process.env.INSTALLATION_ID_PROJECT_PIPELINE!,
        delayLong: +process.env.DELAY_TIME_LONG_6!,
        delayShort: +process.env.DELAY_TIME_SHORT_6!,
        idleTime: process.env.IDLE_TIME_6!,
        numberOfFiles: +process.env.NUMBER_OF_FILES_PROJECT_PIPELINE!
    },
    ProjectLab: {
        host: systemVariables.IS_DEV ? systemVariables.TEST_IP : process.env.INSTALLATION_ID_PROJECT_LAB!,
        delayLong: +process.env.DELAY_TIME_LONG_PROJECT_LAB!,
        delayShort: +process.env.DELAY_TIME_SHORT_PROJECT_LAB!,
        idleTime: process.env.IDLE_TIME_PROJECT_LAB!,
        numberOfFiles: +process.env.NUMBER_OF_FILES_PROJECT_LAB!
    },
    Game: {
        host: systemVariables.IS_DEV ? systemVariables.TEST_IP : process.env.INSTALLATION_ID_GAME!,
        delayLong: +process.env.DELAY_TIME_LONG_GAME!,
        delayShort: +process.env.DELAY_TIME_SHORT_GAME!,
        idleTime: process.env.IDLE_TIME_GAME!,
        numberOfFiles: +process.env.NUMBER_OF_FILES_GAME!,

        timeStepBetweenHints: +process.env.TIME_STEP_BETWEEN_HINTS!,
        hintDisplayTime: +process.env.HINT_DISPLAY_TIME_GAME!,
        messageDisplayTime: +process.env.MESSAGE_DISPLAY_TIME_GAME!
    },

    //test
    Test: {
        host: process.env.INSTALLATION_ID_TEST!,
        delayLong: +process.env.DELAY_TIME_LONG_TEST!,
        delayShort: +process.env.DELAY_TIME_SHORT_TEST!,
        idleTime: process.env.IDLE_TIME_TEST!,
        numberOfFiles: +process.env.NUMBER_OF_FILES_TEST!
    },

}



export {
    installationIds,
    systemVariables
};
