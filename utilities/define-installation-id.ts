import {IRemoteIp, ITestUdpCommand, TDefineInstallationId} from "../types/udp-types";
import {EGameControlCommand} from "../types/game-types";
import {EInstallationIds} from "../types/_common-types";
import {systemVariables} from "../_environment/environment";
import {gameConditions} from "../commands-and-conditions/game-conditions/game-conditions";

const remoteIp: IRemoteIp = {

    "10.4.187.22": EInstallationIds.ProjectPortraits,
    "10.4.187.21": EInstallationIds.ProjectMap,
    "10.4.187.26": EInstallationIds.ProjectCovers,
    "10.4.187.31": EInstallationIds.ProjectCabinet,
    "10.4.187.18": EInstallationIds.ProjectPipeline,
    "10.4.187.27": EInstallationIds.ProjectLab,
    "10.4.187.12": EInstallationIds.ProjectTankEcology,
    "10.4.187.14": EInstallationIds.ProjectTankTechnology,
    "10.4.187.16": EInstallationIds.ProjectTankSocial,
    "10.4.187.20": EInstallationIds.Game,

};

const testUdpCommands: ITestUdpCommand = {

    TestPortraits: EInstallationIds.ProjectPortraits,
    TestMap: EInstallationIds.ProjectMap,
    TestCovers: EInstallationIds.ProjectCovers,
    TestCabinet: EInstallationIds.ProjectCabinet,
    TestPipeline: EInstallationIds.ProjectPipeline,
    TestLab: EInstallationIds.ProjectLab,
    TestTankEcology: EInstallationIds.ProjectTankEcology,
    TestTankTechnology: EInstallationIds.ProjectTankTechnology,
    TestTankSocial: EInstallationIds.ProjectTankSocial

};


const defineInstallationId: TDefineInstallationId = ({ ip, command }) => {

    if (
        !command.match( /Test/ ) && ip !== systemVariables.TEST_IP
    ){

        return remoteIp[ip];

    } else if (
        command.match( /Test/ ) && ip === systemVariables.TEST_IP
    ){

        const editedCommand = command.replace( /_|[L|R]$/gm, "" ) as EInstallationIds;
        return testUdpCommands[ editedCommand ];

    } else if (
        gameConditions.allAnalogInterfaces().includes( command as EGameControlCommand )
    ){
        return EInstallationIds.Game
    }

};

export {
    defineInstallationId
}