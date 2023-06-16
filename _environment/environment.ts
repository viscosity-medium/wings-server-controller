import { IInstallationIds } from "../types/_common-types";

const systemVariables = {
    BASE_URL: process.env.BASE_URL,
    WINGS_PORT: +process.env.WINGS_PORT!,
    HTTP_PORT: +process.env.HTTP_PORT!,
    UDP_PORT: +process.env.UDP_PORT!,
    SERIAL_PORT_PATH: process.env.SERIAL_PORT_PATH!,
    SERIAL_PORT_BAUD_RATE: +process.env.SERIAL_PORT_BAUD_RATE!,
    TEST_IP: process.env.INSTALLATION_ID_TEST!,
    NODE_MODE: process.env.NODE_MODE!,
    IS_DEV: process.env.NODE_MODE! === "development",
    LOCATION: process.env.LOCATION,
    DIRECT_COMMANDS: process.env.DIRECT_COMMANDS,
    INITIAL_MAX_CURSOR_POSITIONS: 4,

    MONGO_URL: process.env.MONGO_URL!,
    DB_ADMIN_NAME: process.env.DB_ADMIN_NAME!,
    DB_ADMIN_PASSWORD: process.env.DB_ADMIN_PASSWORD!,
    DB_HOST: process.env.DB_HOST!,
    DB_PORT: process.env.DB_PORT!,
    DB_NAME: process.env.DB_NAME!
}
const installationIds: IInstallationIds = {
    ProjectPortraits: {
        host: systemVariables.LOCATION === "office" ? systemVariables.TEST_IP! : process.env.INSTALLATION_ID_PROJECT_PORTRAITS!,
        delayLong: +process.env.DELAY_TIME_LONG_PROJECT_PORTRAITS!,
        delayShort: +process.env.DELAY_TIME_SHORT_PROJECT_PORTRAITS!,
        idleTime: systemVariables.IS_DEV ? process.env.IDLE_TIME_TEST! : process.env.IDLE_TIME_PROJECT_PORTRAITS!,
        numberOfFiles: systemVariables.LOCATION === "office" ? +process.env.NUMBER_OF_FILES_TEST! : +process.env.NUMBER_OF_FILES_PROJECT_PORTRAITS!
    },
    ProjectMap: {
        host: systemVariables.LOCATION === "office" ? systemVariables.TEST_IP! : process.env.INSTALLATION_ID_PROJECT_MAP!,
        delayLong: +process.env.DELAY_TIME_LONG_PROJECT_MAP!,
        delayShort: +process.env.DELAY_TIME_SHORT_PROJECT_MAP!,
        idleTime: systemVariables.IS_DEV ? process.env.IDLE_TIME_TEST! : process.env.IDLE_TIME_PROJECT_MAP!,
        numberOfFiles: systemVariables.LOCATION === "office" ? +process.env.NUMBER_OF_FILES_TEST! : +process.env.NUMBER_OF_FILES_PROJECT_MAP!
    },
    ProjectCovers: {
        host: systemVariables.LOCATION === "office" ? systemVariables.TEST_IP! : process.env.INSTALLATION_ID_PROJECT_COVERS!,
        delayLong: +process.env.DELAY_TIME_LONG_PROJECT_COVERS!,
        delayShort: +process.env.DELAY_TIME_SHORT_PROJECT_COVERS!,
        idleTime: systemVariables.IS_DEV ? process.env.IDLE_TIME_TEST! : process.env.IDLE_TIME_PROJECT_COVERS!,
        numberOfFiles: systemVariables.LOCATION === "office" ? +process.env.NUMBER_OF_FILES_TEST! : +process.env.NUMBER_OF_FILES_PROJECT_COVERS!
    },
    ProjectCabinet: {
        host: systemVariables.LOCATION === "office" ? systemVariables.TEST_IP! : process.env.INSTALLATION_ID_PROJECT_CABINET!,
        delayLong: +process.env.DELAY_TIME_LONG_PROJECT_CABINET!,
        delayShort: +process.env.DELAY_TIME_SHORT_PROJECT_CABINET!,
        idleTime: systemVariables.IS_DEV ? process.env.IDLE_TIME_TEST! : process.env.IDLE_TIME_PROJECT_CABINET!,
        numberOfFiles: systemVariables.LOCATION === "office" ? +process.env.NUMBER_OF_FILES_TEST! : +process.env.NUMBER_OF_FILES_PROJECT_CABINET!
    },
    ProjectPipeline: {
        host: systemVariables.LOCATION === "office" ? systemVariables.TEST_IP! : process.env.INSTALLATION_ID_PROJECT_ENTRY_GROUP!,
        delayLong: +process.env.DELAY_TIME_LONG_PROJECT_ENTRY_GROUP!,
        delayShort: +process.env.DELAY_TIME_SHORT_PROJECT_ENTRY_GROUP!,
        idleTime: systemVariables.IS_DEV ? process.env.IDLE_TIME_TEST! : process.env.IDLE_TIME_PROJECT_ENTRY_GROUP!,
        numberOfFiles: systemVariables.LOCATION === "office" ? +process.env.NUMBER_OF_FILES_TEST!: +process.env.NUMBER_OF_FILES_PROJECT_ENTRY_GROUP!
    },
    ProjectEntryGroup: {
        host: systemVariables.LOCATION === "office" ? systemVariables.TEST_IP! : process.env.INSTALLATION_ID_PROJECT_CABINET!,
        delayLong: +process.env.DELAY_TIME_LONG_PROJECT_CABINET!,
        delayShort: +process.env.DELAY_TIME_SHORT_PROJECT_CABINET!,
        idleTime: systemVariables.IS_DEV ? process.env.IDLE_TIME_TEST! : process.env.IDLE_TIME_PROJECT_CABINET!,
        numberOfFiles: systemVariables.LOCATION === "office" ? +process.env.NUMBER_OF_FILES_TEST! : +process.env.NUMBER_OF_FILES_PROJECT_CABINET!
    },
    ProjectLab: {
        host: systemVariables.LOCATION === "office" ? systemVariables.TEST_IP! : process.env.INSTALLATION_ID_PROJECT_LAB!,
        delayLong: +process.env.DELAY_TIME_LONG_PROJECT_LAB!,
        delayShort: +process.env.DELAY_TIME_SHORT_PROJECT_LAB!,
        idleTime: systemVariables.IS_DEV ? process.env.IDLE_TIME_TEST! : process.env.IDLE_TIME_PROJECT_LAB!,
        numberOfFiles: systemVariables.LOCATION === "office" ? +process.env.NUMBER_OF_FILES_TEST! : +process.env.NUMBER_OF_FILES_PROJECT_LAB!
    },
    ProjectTankEcology: {
        host: systemVariables.LOCATION === "office" ? systemVariables.TEST_IP! : process.env.INSTALLATION_ID_PROJECT_TANK_ECOLOGY!,
        delayLong: +process.env.DELAY_TIME_LONG_PROJECT_TANK_ECOLOGY!,
        delayShort: +process.env.DELAY_TIME_SHORT_PROJECT_TANK_ECOLOGY!,
        idleTime: systemVariables.IS_DEV ? process.env.IDLE_TIME_TEST! : process.env.IDLE_TIME_PROJECT_TANK_ECOLOGY!,
        numberOfFiles: systemVariables.LOCATION === "office" ? +process.env.NUMBER_OF_FILES_TEST! : +process.env.NUMBER_OF_FILES_PROJECT_TANK_ECOLOGY!
    },
    ProjectTankTechnology: {
        host: systemVariables.LOCATION === "office" ? systemVariables.TEST_IP! : process.env.INSTALLATION_ID_PROJECT_TANK_TECHNOLOGY!,
        delayLong: +process.env.DELAY_TIME_LONG_PROJECT_TANK_TECHNOLOGY!,
        delayShort: +process.env.DELAY_TIME_SHORT_PROJECT_TANK_TECHNOLOGY!,
        idleTime: systemVariables.IS_DEV ? process.env.IDLE_TIME_TEST! : process.env.IDLE_TIME_PROJECT_TANK_TECHNOLOGY!,
        numberOfFiles: systemVariables.LOCATION === "office" ? +process.env.NUMBER_OF_FILES_TEST! : +process.env.NUMBER_OF_FILES_PROJECT_TANK_TECHNOLOGY!
    },
    ProjectTankSocial: {
        host: systemVariables.LOCATION === "office" ? systemVariables.TEST_IP! : process.env.INSTALLATION_ID_PROJECT_TANK_SOCIAL!,
        delayLong: +process.env.DELAY_TIME_LONG_PROJECT_TANK_SOCIAL!,
        delayShort: +process.env.DELAY_TIME_SHORT_PROJECT_TANK_SOCIAL!,
        idleTime: systemVariables.IS_DEV ? process.env.IDLE_TIME_TEST! : process.env.IDLE_TIME_PROJECT_TANK_SOCIAL!,
        numberOfFiles: systemVariables.LOCATION === "office" ? +process.env.NUMBER_OF_FILES_TEST! : +process.env.NUMBER_OF_FILES_TANK_SOCIAL!
    },
    Game: {
        host: systemVariables.LOCATION === "office" ? systemVariables.TEST_IP! : process.env.INSTALLATION_ID_GAME!,
        delayLong: +process.env.DELAY_TIME_LONG_GAME!,
        delayShort: +process.env.DELAY_TIME_SHORT_GAME!,
        idleTime: systemVariables.IS_DEV ? process.env.IDLE_TIME_TEST_GAME! : process.env.IDLE_TIME_GAME!,
        numberOfFiles: +process.env.NUMBER_OF_FILES_GAME!,

        timeStepBetweenHints: +process.env.TIME_STEP_BETWEEN_HINTS!,
        hintDisplayTime: +process.env.HINT_DISPLAY_TIME_GAME!,
        messageDisplayTime: +process.env.MESSAGE_DISPLAY_TIME_GAME!
    },


}



export {
    installationIds,
    systemVariables
};
