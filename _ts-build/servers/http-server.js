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
exports.startHttpServer = void 0;
const environment_1 = require("../_environment/environment");
const http_router_1 = require("../routers/http-router");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const rootPath = process.cwd();
const { HTTP_PORT = 9019 } = environment_1.systemVariables;
const app = (0, express_1.default)();
const httpServer = http_1.default.createServer(app);
//const httpsServer = https.createServer(credentials, app);
app.use(express_1.default.json({ limit: '25mb' }));
app.use(express_1.default.static(rootPath));
app.use((0, cors_1.default)({
    credentials: true,
}));
app.use("/", http_router_1.httpRouter);
const startHttpServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield httpServer.listen(HTTP_PORT, () => { console.log(`Http server is started on port: ${HTTP_PORT}`); });
        //httpsServer.listen(HTTP_PORT, () => { console.log(`Server is started on port: порт 443`)});
        return true;
    }
    catch (err) {
        console.log(err);
    }
});
exports.startHttpServer = startHttpServer;
