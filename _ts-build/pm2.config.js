"use strict";
module.exports = {
    apps: [
        {
            name: "wings-server-controller",
            script: "./_ts-build/master-server.js",
            watch: true,
            node_args: '-r dotenv/config',
            env: {
                "NODE_MODE": "development",
                "TEST_LOCATION": "office"
            },
            env_production: {
                "NODE_MODE": "production",
            }
        }
    ]
};
