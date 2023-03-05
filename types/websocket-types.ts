import { EInstallationIds } from "./_common-types";

export type TSendDataToWingsServerOverUdp = ({ id, command }: IWebsocketProps)=> void

export interface IWebsocketProps {
    id: EInstallationIds
    command: number[]
}