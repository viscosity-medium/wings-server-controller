import { AvailableInstallationIds } from "./_common-types";

interface UdpIdDefiner {
    ip: string
    command: string
}

export type RemoteIp = Record<string, AvailableInstallationIds>
export type TestUdpCommand = Record<string, AvailableInstallationIds>
export type DefineInstallationId = ({ ip, command}: UdpIdDefiner ) => AvailableInstallationIds | undefined