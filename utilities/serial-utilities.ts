import { SerialPort } from "serialport";
import { TGetSerialPortList } from "../types/serial-port-types";
import {systemVariables} from "../_environment/environment";

const { SERIAL_PORT_PATH, SERIAL_PORT_BAUD_RATE } = systemVariables;
const serialPort = new SerialPort({
    path: SERIAL_PORT_PATH,
    baudRate: SERIAL_PORT_BAUD_RATE
});

const getSerialPortList: TGetSerialPortList = async () => {

    const validPorts = await SerialPort.list()
        .then(
            (ports) => ports.map(
                (port) => (
                    {
                        path: port.path,
                        pnpId: port.pnpId,
                        locationId: port.locationId,
                    }
                )
            )
        )
        .catch(err => console.log(err));

    console.log(validPorts);
    return validPorts;
}

export {
    serialPort,
    getSerialPortList,
};