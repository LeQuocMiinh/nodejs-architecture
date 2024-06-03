const admin = require('firebase-admin');
const firebaseConfig = require('config').get('database.firebase');

const logger = require('../../utils/logger')('src/loaders/db/firebase.js');

class Firebase {
    constructor() {
        //const app = admin.initializeApp({
        //    databaseURL: firebaseConfig.get('host'),
        //    credential: admin.credential.cert(firebaseConfig.get('certificate'))
        //});
        //this.db = app.database();
    }

    connect() {
        return new Promise((resolve, reject) => {
            try {
                this.db.goOnline();
                logger.ok('Firebase connection succeeded');
                return resolve(this.db);
            } catch (e) {
                logger.error('Firebase connection failed');
                return reject(e);
            }
        });
    }

    query(path, filters) {
        return new Promise((resolve, reject) => {
            try {
                const ref = this.db.ref(path);
                ref.once('value', snap => {
                    if (snap) {
                        const data = snap.toJSON();
                        logger.ok('Firebase test succeeded');
                        return resolve(data);
                    }
                });
            } catch (e) {}
            logger.error('Firebase test failed');
            return reject();
        });
    }

    test() {
        // simulate a random query
        return new Promise((resolve, reject) => {
            try {
                const ref = this.db.ref('/');
                ref.once('value', snap => {
                    if (snap) {
                        logger.ok('Firebase test succeeded');
                        return resolve();
                    }
                    logger.error('Firebase test failed');
                    return reject();
                });
            } catch (e) {
                return reject(e);
            }
        });
    }

    close() {
        return new Promise((resolve, reject) => {
            try {
                this.db.goOffline();
                logger.info('Firebase closing connection succeeded');
                return resolve();
            } catch (e) {
                logger.error('Firebase closing connection failed');
                return reject(e);
            }
        });
    }
}

const firebase = new Firebase();

module.exports = firebase;
