"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendDirectTestCommand = exports.sendDataToWingsServerOverUdp = exports.client = void 0;
const environment_1 = require("../../_environment/environment");
const node_dgram_1 = __importDefault(require("node:dgram"));
const { UDP_PORT, TEST_IP } = environment_1.systemVariables;
const client = node_dgram_1.default.createSocket("udp4");
exports.client = client;
client.on("listening", () => { console.log("Udp server is started on port: 9021"); });
client.bind(UDP_PORT);
const sendDataToWingsServerOverUdp = ({ id, command }) => {
    const { host } = environment_1.installationIds[id];
    const port = environment_1.systemVariables.WINGS_PORT;
    const hexCommand = new Uint8Array(command);
    const client = node_dgram_1.default.createSocket("udp4");
    client.send(hexCommand, port, host, () => { client.close(); });
};
exports.sendDataToWingsServerOverUdp = sendDataToWingsServerOverUdp;
const sendDirectTestCommand = ({ command }) => {
    const host = TEST_IP;
    const port = environment_1.systemVariables.WINGS_PORT;
    const hexCommand = new Uint8Array(command);
    const client = node_dgram_1.default.createSocket("udp4");
    client.send(hexCommand, port, host, () => { client.close(); });
};
exports.sendDirectTestCommand = sendDirectTestCommand;
