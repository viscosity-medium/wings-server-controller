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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const http_server_1 = require("./servers/http-server");
const udp_server_1 = require("./servers/udp-server");
const environment_1 = require("./_environment/environment");
try {
    (() => __awaiter(void 0, void 0, void 0, function* () {
        //await createMongoDbConnection();
        console.log(environment_1.systemVariables.IS_DEV);
        console.log(environment_1.systemVariables.LOCATION);
        yield (0, udp_server_1.startUdpServer)();
        yield (0, http_server_1.startHttpServer)();
    }))();
}
catch (err) {
    console.log(err);
}
