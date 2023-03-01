export type TSendDataToWingsServerOverUdp = ({command, host,port }:IWebsocketProps)=> void

export interface IWebsocketProps {
    command: number[]
    host: string
    port: number,
}