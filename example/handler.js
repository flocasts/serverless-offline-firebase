'use strict';

const Firebase = require('firebase');

class FirebaseExample {
    constructor() {
        this.app = null;
        this.db = null;
        this.databaseUrl = `ws://localhost:5000`;
    }

    setData(event, context) {
        const key = event.pathParameters.key;
        const data = JSON.parse(event.body);

        const firebaseDb = this.getFireBaseDB();
        return firebaseDb.ref(key).set(data)
            .then(() => {
                return {
                    statusCode: 200,
                    body: JSON.stringify({
                        message: data,
                    }),
                }
            });
    };

    getData(event, context) {
        const ref = this.getFireBaseDB().ref(event.pathParameters.key);
        return ref.once('value')
        .then((snapshot) => {
            return {
                statusCode: 200,
                body: JSON.stringify({
                    value: snapshot.val(),
                }),
            };
        }).catch( e => ({
            statusCode: 404,
            body: JSON.stringify({
                message: `${event.pathParameters.key} not found`
            })
        }));
    };

    getFireBaseDB() {
        if (!this.db) {
            // https://github.com/zeit/next.js/issues/1999
            if (Firebase.apps.length === 0) {
                this.app = Firebase.initializeApp({
                    databaseURL: this.databaseUrl,
                });
            }

            this.db = Firebase.database();
        }

        return this.db;
    }
}

const fe = new FirebaseExample();

module.exports = {
    setData: fe.setData.bind(fe),
    getData: fe.getData.bind(fe),
};