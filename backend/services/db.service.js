const MongoClient = require('mongodb').MongoClient;

const { ControlPointDuplicate } = require('@material-ui/icons');
const config = require('../config')

module.exports = {
    getCollection
}

// Database Name
const dbName = 'quizup';

var dbConn = null;

async function getCollection(collectionName) {
    const db = await connect()
    return db.collection(collectionName);
}

async function connect() {
    if (dbConn) return dbConn;
    try {
        const client = await MongoClient.connect(config.dbURL, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db(dbName);
        dbConn = db;
        return db;
    } catch (err) {
        throw err;
    }
}




