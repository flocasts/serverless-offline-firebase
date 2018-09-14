# Serverless Offline Firesbase Server
A basic plugin to run a firebase server with serverless offline.

## Install
```
npm install serverless-offline-firebase
```

## Basic Usage

### serverless.yml
```
...
plugins:
    - serverless-offline-firebase
    - serverless-offline

custom:
  firebase:
    host: localhost
    port: 5000

functions:
  set-data:
    handler: handler.setData
    events:
      - http:
          path: set-data/{key}
          method: post
...
```
### handler.js
```
const Firebase = require('firebase');

class FirebaseExample {
    constructor() {
        this.app = null;
        this.db = null;
        this.databaseUrl = `ws://localhost:5000`;
    }

    setData(event, context) {
        ...
    }
}

const fe = new FirebaseExample();

module.exports = {
    setData: fe.setData.bind(fe),
}
```
