'use strict';

const FirebaseServer = require('firebase-server');
const logPrefix = '[Offline Firebase Server]';

class ServerlessPlugin {
    constructor(serverless, options) {
        this.serverless = serverless;
        this.options = options;
        this.server = null;

        this.commands = {};

        this.hooks = {
            'before:offline:start:init': this.startFirebaseServer.bind(this),
            'before:offline:start:end': this.stopFirebaseServer.bind(this),
        };
    }

    startFirebaseServer() {
        this.serverless.cli.log(`${logPrefix}: booting`);
        // TODO: intial data
        let port = this.serverless.service.custom.firebase.port;
        let host = this.serverless.service.custom.firebase.host;
        const url = this.serverless.service.custom.firebase.url;
        if (!port && !host && url) {
            const parts = url.split(':');
            if (parts.length === 2 && !isNaN(parseInt(parts[1]))) {
                host = parts[0];
                port = parts[1];
            } else if (parts.length === 3 && !isNaN(parseInt(parts[2]))) {
                host = `${parts[0]}:${parts[1]}`;
                port = parts[2];
            }
        }
        this.server = new FirebaseServer(port, host, {});
    }

    stopFirebaseServer() {
        this.serverless.cli.log(`${logPrefix}: shutting down`);
        this.server.close();
    }
}

module.exports = ServerlessPlugin;