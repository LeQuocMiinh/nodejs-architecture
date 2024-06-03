const mysql = require('mysql');
const mysqlConfig = require('config').get('database.mysql');
const logger = require('../../utils/logger')('src/loaders/db/mysql.js');

// Class that wraps queries into a promise.
class MySQL {
    constructor() {
        this.connection = mysql.createConnection({
            host: mysqlConfig.get('host.proxy'),
            user: mysqlConfig.get('user'),
            password: mysqlConfig.get('password'),
            database: mysqlConfig.get('dbName')
        });

        this.tableName = 'KV';
    }

    connect() {
        return new Promise((resolve, reject) => {
            this.connection.connect(err => {
                if (err) {
                    logger.error('MySql connection failed');
                    return reject(err);
                }
                logger.ok('MySql connection succeeded');
                return resolve();
            });
        });
    }

    query(sql, args) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, rows) => {
                if (err) {
                    return reject(err);
                }
                return resolve(rows);
            });
        });
    }

    insert(key, value) {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO ${
                this.tableName
            } (_key, _val) VALUES('${key}', '${value}')`;
            this.connection.query(query, null, (err, rows) => {
                if (err) {
                    return reject(err);
                }
                return resolve(rows);
            });
        });
    }

    select(key) {
        return new Promise((resolve, reject) => {
            const query = `SELECT _val FROM ${
                this.tableName
            } WHERE _key = '${key}'`;
            this.connection.query(query, null, (err, rows) => {
                if (err) {
                    return reject(err);
                }
                return resolve(rows);
            });
        });
    }

    test() {
        // simulate a random query
        return new Promise(async (resolve, reject) => {
            try {
                await this.query('SELECT * FROM KV');
                logger.ok('MySql test succeeded');
                return resolve();
            } catch (e) {
                logger.error('MYSQL test failed');
                return reject(e);
            }
        });
    }

    close() {
        return new Promise((resolve, reject) => {
            this.connection.end((err, pendingQuery) => {
                if (err) {
                    logger.error('MySql closing connection failed');
                    return reject(err);
                }
                logger.info('MySql closing connection succeeded');
                return resolve(pendingQuery);
            });
        });
    }
}

const mySQL = new MySQL();

module.exports = mySQL;
