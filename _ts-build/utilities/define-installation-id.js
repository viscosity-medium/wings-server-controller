"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineInstallationId = void 0;
const _common_types_1 = require("../types/_common-types");
const environment_1 = require("../_environment/environment");
const game_conditions_1 = require("../commands-and-conditions/game-conditions/game-conditions");
const remoteIp = {
    "10.4.187.22": _common_types_1.EInstallationIds.ProjectPortraits,
    "10.4.187.21": _common_types_1.EInstallationIds.ProjectMap,
    "10.4.187.26": _common_types_1.EInstallationIds.ProjectCovers,
    "10.4.187.31": _common_types_1.EInstallationIds.ProjectCabinet,
    "10.4.187.18": _common_types_1.EInstallationIds.ProjectPipeline,
    "10.4.187.27": _common_types_1.EInstallationIds.ProjectLab,
    "10.4.187.12": _common_types_1.EInstallationIds.ProjectTankEcology,
    "10.4.187.14": _common_types_1.EInstallationIds.ProjectTankTechnology,
    "10.4.187.16": _common_types_1.EInstallationIds.ProjectTankSocial,
    "10.4.187.20": _common_types_1.EInstallationIds.Game,
};
const testUdpCommands = {
    TestPortraits: _common_types_1.EInstallationIds.ProjectPortraits,
    TestMap: _common_types_1.EInstallationIds.ProjectMap,
    TestCovers: _common_types_1.EInstallationIds.ProjectCovers,
    TestCabinet: _common_types_1.EInstallationIds.ProjectCabinet,
    TestPipeline: _common_types_1.EInstallationIds.ProjectPipeline,
    TestLab: _common_types_1.EInstallationIds.ProjectLab,
    TestTankEcology: _common_types_1.EInstallationIds.ProjectTankEcology,
    TestTankTechnology: _common_types_1.EInstallationIds.ProjectTankTechnology,
    TestTankSocial: _common_types_1.EInstallationIds.ProjectTankSocial
};
const defineInstallationId = ({ ip, command }) => {
    if (!command.match(/Test/) && ip !== environment_1.systemVariables.TEST_IP) {
        return remoteIp[ip];
    }
    else if (command.match(/Test/) && ip === environment_1.systemVariables.TEST_IP) {
        const editedCommand = command.replace(/_|[L|R]$/gm, "");
        return testUdpCommands[editedCommand];
    }
    else if (game_conditions_1.gameConditions.allAnalogInterfaces().includes(command)) {
        return _common_types_1.EInstallationIds.Game;
    }
};
exports.defineInstallationId = defineInstallationId;
