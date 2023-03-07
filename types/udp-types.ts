import { EInstallationIds } from "./_common-types";

interface IUdpIdDefiner {
    ip: string
    command: string
}

export type IRemoteIp = Record<string, EInstallationIds>
export type ITestUdpCommand = Record<string, EInstallationIds>
export type TDefineInstallationId = ({ ip, command}: IUdpIdDefiner ) => EInstallationIds | undefined