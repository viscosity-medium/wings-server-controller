"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startUdpServer = void 0;
const udp_master_controller_1 = require("../controllers/master-controllers/udp-master-controller");
const dgram_udp_utilities_1 = require("../utilities/udp/dgram-udp-utilities");
const startUdpServer = () => __awaiter(void 0, void 0, void 0, function* () {
    yield dgram_udp_utilities_1.client.on('message', (msg, remoteInfo) => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, udp_master_controller_1.udpMasterController)(msg, remoteInfo);
    }));
    return true;
});
exports.startUdpServer = startUdpServer;
