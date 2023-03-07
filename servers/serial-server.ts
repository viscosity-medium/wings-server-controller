import { systemVariables } from "../_environment/environment";
import { ReadlineParser } from "serialport";
import { serialPort } from "../utilities/serial-utilities";
const startSerialServer = async () => {

    await serialPort.open(()=>{console.log(`Port ${systemVariables.SERIAL_PORT_PATH} is opened`)});

    const readlineParser = serialPort.pipe(new ReadlineParser({delimiter: "_[END]"}));

    return readlineParser.on("data", (data)=>{
        const parsedData = JSON.parse(data.replace(/'+'/,"'").replace(/\'/gm,""))
        console.log(parsedData)
    });

}

export {
    startSerialServer
}