import * as dotenv from 'dotenv';
import { IInstallationIds } from "../types/_common-types";
dotenv.config();


export const systemVariables = {
    BASE_URL: process.env.BASE_URL,
    WINGS_PORT: +process.env.WINGS_PORT!,
    HTTP_PORT: +process.env.HTTP_PORT!,
    UDP_PORT: +process.env.UDP_PORT!,
    SERIAL_PORT_PATH: process.env.SERIAL_PORT_PATH!,
    SERIAL_PORT_BAUD_RATE: +process.env.SERIAL_PORT_BAUD_RATE!,
}
const installationIds: IInstallationIds = {
    Project1: {
        host: process.env.INSTALLATION_ID_PROJECT_1!,
        delayLong: +process.env.DELAY_TIME_LONG_PROJECT_1!,
        delayShort: +process.env.DELAY_TIME_SHORT_PROJECT_1!,
        idleTime: process.env.IDLE_TIME_PROJECT_1!,
        numberOfFiles: +process.env.NUMBER_OF_FILES_PROJECT_1!
    },
    Project2: {
        host: process.env.INSTALLATION_ID_PROJECT_2!,
        delayLong: +process.env.DELAY_TIME_LONG_PROJECT_2!,
        delayShort: +process.env.DELAY_TIME_SHORT_PROJECT_2!,
        idleTime: process.env.IDLE_TIME_PROJECT_2!,
        numberOfFiles: +process.env.NUMBER_OF_FILES_PROJECT_2!
    },
    Project3: {
        host: process.env.INSTALLATION_ID_PROJECT_3!,
        delayLong: +process.env.DELAY_TIME_LONG_PROJECT_3!,
        delayShort: +process.env.DELAY_TIME_SHORT_PROJECT_3!,
        idleTime: process.env.IDLE_TIME_PROJECT_3!,
        numberOfFiles: +process.env.NUMBER_OF_FILES_PROJECT_3!
    },
    Project4: {
        host: process.env.INSTALLATION_ID_PROJECT_4!,
        delayLong: +process.env.DELAY_TIME_LONG_PROJECT_4!,
        delayShort: +process.env.DELAY_TIME_SHORT_PROJECT_4!,
        idleTime: process.env.IDLE_TIME_PROJECT_4!,
        numberOfFiles: +process.env.NUMBER_OF_FILES_PROJECT_4!
    },
    Project5: {
        host: process.env.INSTALLATION_ID_PROJECT_5!,
        delayLong: +process.env.DELAY_TIME_LONG_5!,
        delayShort: +process.env.DELAY_TIME_SHORT_5!,
        idleTime: process.env.IDLE_TIME_5!,
        numberOfFiles: +process.env.NUMBER_OF_FILES_PROJECT_5!
    },
    Project6: {
        host: process.env.INSTALLATION_ID_PROJECT_6!,
        delayLong: +process.env.DELAY_TIME_LONG_6!,
        delayShort: +process.env.DELAY_TIME_SHORT_6!,
        idleTime: process.env.IDLE_TIME_6!,
        numberOfFiles: +process.env.NUMBER_OF_FILES_PROJECT_6!
    },
    Lab: {
        host: process.env.INSTALLATION_ID_LAB!,
        delayLong: +process.env.DELAY_TIME_LONG_LAB!,
        delayShort: +process.env.DELAY_TIME_SHORT_LAB!,
        idleTime: process.env.IDLE_TIME_LAB!,
        numberOfFiles: +process.env.NUMBER_OF_FILES_LAB!
    },
    Game: {
        host: process.env.INSTALLATION_ID_GAME!,
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
    TestProject1: {
        host: process.env.INSTALLATION_ID_TEST!,
        delayLong: +process.env.DELAY_TIME_LONG_TEST!,
        delayShort: +process.env.DELAY_TIME_SHORT_TEST!,
        idleTime: process.env.IDLE_TIME_TEST!,
        numberOfFiles: +process.env.NUMBER_OF_FILES_TEST!
    },
    TestProject2: {
        host: process.env.INSTALLATION_ID_TEST!,
        delayLong: +process.env.DELAY_TIME_LONG_TEST!,
        delayShort: +process.env.DELAY_TIME_SHORT_TEST!,
        idleTime: process.env.IDLE_TIME_TEST!,
        numberOfFiles: +process.env.NUMBER_OF_FILES_TEST!
    },
    TestProject3: {
        host: process.env.INSTALLATION_ID_TEST!,
        delayLong: +process.env.DELAY_TIME_LONG_TEST!,
        delayShort: +process.env.DELAY_TIME_SHORT_TEST!,
        idleTime: process.env.IDLE_TIME_TEST!,
        numberOfFiles: +process.env.NUMBER_OF_FILES_TEST!
    },
    TestProject4: {
        host: process.env.INSTALLATION_ID_TEST!,
        delayLong: +process.env.DELAY_TIME_LONG_TEST!,
        delayShort: +process.env.DELAY_TIME_SHORT_TEST!,
        idleTime: process.env.IDLE_TIME_TEST!,
        numberOfFiles: +process.env.NUMBER_OF_FILES_TEST!
    },
    TestProject5: {
        host: process.env.INSTALLATION_ID_TEST!,
        delayLong: +process.env.DELAY_TIME_LONG_TEST!,
        delayShort: +process.env.DELAY_TIME_SHORT_TEST!,
        idleTime: process.env.IDLE_TIME_TEST!,
        numberOfFiles: +process.env.NUMBER_OF_FILES_TEST!
    },
    TestProject6: {
        host: process.env.INSTALLATION_ID_TEST!,
        delayLong: +process.env.DELAY_TIME_LONG_TEST!,
        delayShort: +process.env.DELAY_TIME_SHORT_TEST!,
        idleTime: process.env.IDLE_TIME_TEST!,
        numberOfFiles: +process.env.NUMBER_OF_FILES_TEST!
    },
    TestLab: {
        host: process.env.INSTALLATION_ID_LAB!,
        delayLong: +process.env.DELAY_TIME_LONG_LAB!,
        delayShort: +process.env.DELAY_TIME_SHORT_LAB!,
        idleTime: process.env.IDLE_TIME_LAB!,
        numberOfFiles: +process.env.NUMBER_OF_FILES_LAB!
    },
    TestGame: {
        host: process.env.INSTALLATION_ID_GAME!,
        delayLong: +process.env.DELAY_TIME_LONG_GAME!,
        delayShort: +process.env.DELAY_TIME_SHORT_GAME!,
        idleTime: process.env.IDLE_TIME_GAME!,
        numberOfFiles: +process.env.NUMBER_OF_FILES_GAME!,

        timeStepBetweenHints: +process.env.TIME_STEP_BETWEEN_HINTS!,
        hintDisplayTime: +process.env.HINT_DISPLAY_TIME_GAME!,
        messageDisplayTime: +process.env.MESSAGE_DISPLAY_TIME_GAME!
    },
}
export { installationIds };
