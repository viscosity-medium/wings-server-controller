export type TGetSerialPortList = () => Promise<void | ISerialPortListItem[]>
export interface ISerialPortListItem {
    path: string,
    pnpId: string | undefined,
    locationId: string | undefined
}
