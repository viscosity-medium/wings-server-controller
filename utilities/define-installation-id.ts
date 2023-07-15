import {RemoteIp, TestUdpCommand, DefineInstallationId} from "../types/udp-types";
import {GameControlCommand} from "../types/game-types";
import {AvailableInstallationIds} from "../types/_common-types";
import {systemVariables} from "../_environment/environment";
import {gameConditions} from "../commands-and-conditions/game-conditions/game-conditions";

const remoteIp: RemoteIp = {

    "10.4.187.22": AvailableInstallationIds.ProjectPortraits,
    "10.4.187.21": AvailableInstallationIds.ProjectMap,
    "10.4.187.26": AvailableInstallationIds.ProjectCovers,
    "10.4.187.31": AvailableInstallationIds.ProjectCabinet,
    "10.4.187.18": AvailableInstallationIds.ProjectPipeline,
    "10.4.187.27": AvailableInstallationIds.ProjectLab,
    "10.4.187.12": AvailableInstallationIds.ProjectTankEcology,
    "10.4.187.14": AvailableInstallationIds.ProjectTankTechnology,
    "10.4.187.16": AvailableInstallationIds.ProjectTankSocial,
    "10.4.187.20": AvailableInstallationIds.Game,

};

const testUdpCommands: TestUdpCommand = {

    TestPortraits: AvailableInstallationIds.ProjectPortraits,
    TestMap: AvailableInstallationIds.ProjectMap,
    TestCovers: AvailableInstallationIds.ProjectCovers,
    TestCabinet: AvailableInstallationIds.ProjectCabinet,
    TestPipeline: AvailableInstallationIds.ProjectPipeline,
    TestLab: AvailableInstallationIds.ProjectLab,
    TestTankEcology: AvailableInstallationIds.ProjectTankEcology,
    TestTankTechnology: AvailableInstallationIds.ProjectTankTechnology,
    TestTankSocial: AvailableInstallationIds.ProjectTankSocial

};


const defineInstallationId: DefineInstallationId = ({ ip, command }) => {

    if (
        !command.match( /Test/ ) && ip !== systemVariables.TEST_IP
    ){

        return remoteIp[ip];

    } else if (
        command.match( /Test/ ) && ip === systemVariables.TEST_IP
    ){

        const editedCommand = command.replace( /_|[L|R]$/gm, "" ) as AvailableInstallationIds;
        return testUdpCommands[ editedCommand ];

    } else if (
        gameConditions.allAnalogInterfaces().includes( command as GameControlCommand )
    ){
        return AvailableInstallationIds.Game;
    }

};

export {
    defineInstallationId
}