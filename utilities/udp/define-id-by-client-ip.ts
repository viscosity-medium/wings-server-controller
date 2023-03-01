import {IReceivedUdpCommand, IRemoteIp, TUdpIdDefiner} from "../../types/udp-types";
import { EInstallationIds } from "../../types/_common-types";

const remoteIp: IRemoteIp = {
    "10.4.187.22": EInstallationIds.Project1,
    "10.4.187.23": EInstallationIds.Project2,
    "aa" : EInstallationIds.Project3,
    "10.4.187.26": EInstallationIds.Project4,
    "ff": EInstallationIds.Project5,
    "bb": EInstallationIds.Project6,
    "10.4.187.27": EInstallationIds.Lab,
    "10.4.187.20": EInstallationIds.Game,
    "192.168.0.172": EInstallationIds.Test,
    "192.168.0.228": EInstallationIds.Test,

}

const receivedUdpCommand: IReceivedUdpCommand = {
    "TestProject1": EInstallationIds.TestProject1,
    "TestProject2": EInstallationIds.TestProject2,
    "TestProject3": EInstallationIds.TestProject3,
    "TestProject4": EInstallationIds.TestProject4,
    "TestProject5": EInstallationIds.TestProject5,
    "TestProject6": EInstallationIds.TestProject6,
    "TestLab": EInstallationIds.TestLab,
    "TestGame": EInstallationIds.TestGame,
}

const defineIdByClientIp: TUdpIdDefiner = ({ip, command }) => {
    if (!command.match(/Test/)){
        return remoteIp[ip];
    } else {
        const editedCommand = command.replace(/_|[L|R]/g, "") as EInstallationIds;
        console.log(editedCommand)
        return receivedUdpCommand[ editedCommand ]
    }
};

export {
    defineIdByClientIp
}