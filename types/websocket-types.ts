import { AvailableInstallationIds } from "./_common-types";

export type SendDataToWingsServerOverUdp = ({ id, command }: WebsocketProps)=> void

export interface WebsocketProps {
    id: AvailableInstallationIds
    command: number[]
}