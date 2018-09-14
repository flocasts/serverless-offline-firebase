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
      this.server = new FirebaseServer(
          this.serverless.service.custom.firebase.port,
          this.serverless.service.custom.firebase.host,
          {});
  }

  stopFirebaseServer() {
      this.serverless.cli.log(`${logPrefix}: shutting down`);
      this.server.stop();
  }
}

module.exports = ServerlessPlugin;
