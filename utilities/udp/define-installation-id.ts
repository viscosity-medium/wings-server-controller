import {IRemoteIp, ITestUdpCommand, TUdpIdDefiner} from "../../types/udp-types";
import {EInstallationIds} from "../../types/_common-types";
import {systemVariables} from "../../_environment/environment";
import {gameConditions} from "../game-utilities/game-conditions/game-conditions";
import {EGameControlCommand} from "../../types/game-types";

const remoteIp: IRemoteIp = {

    "10.4.187.22": EInstallationIds.ProjectPortraits,
    "10.4.187.23": EInstallationIds.ProjectMap,
    "aa" : EInstallationIds.Project3,
    "10.4.187.26": EInstallationIds.ProjectCovers,
    "10.4.187.31": EInstallationIds.ProjectCabinet,
    "10.4.187.18": EInstallationIds.ProjectPipeline,
    "10.4.187.27": EInstallationIds.ProjectLab,
    "10.4.187.20": EInstallationIds.Game,
    "192.168.0.172": EInstallationIds.Test,
    "192.168.0.228": EInstallationIds.Test,

}

const testUdpCommands: ITestUdpCommand = {
    TestPortraits: EInstallationIds.ProjectPortraits,
    TestProjectMap: EInstallationIds.ProjectMap,
    TestProject3: EInstallationIds.Project3,
    TestProjectCovers: EInstallationIds.ProjectCovers,
    TestProjectCabinet: EInstallationIds.ProjectCabinet,
    TestProjectPipeline: EInstallationIds.ProjectPipeline,
    TestProjectLab: EInstallationIds.ProjectLab
}


const defineInstallationId: TUdpIdDefiner = ({ ip, command }) => {

    if ( !command.match( /Test/ ) && ip !== systemVariables.TEST_IP ){

        return remoteIp[ip];

    }else if(
        command.match( /Test/ ) && ip === systemVariables.TEST_IP
    ){

        const editedCommand = command.replace( /_|[L|R]/gm, "" ) as EInstallationIds;
        return testUdpCommands[ editedCommand ];

    } else if(
        gameConditions.allAnalogInterfaces().includes( command as EGameControlCommand )
    ){

    }

};

export {
    defineInstallationId
}