const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId


module.exports = {
    // query,
    // getById,
    getByUsername,
    // remove,
    // update,
    add
}

async function getByUsername(username) {
    const collection = await dbService.getCollection('user')
    try {
        const user = await collection.findOne({ username })
        return user
    } catch (err) {
        console.log(`ERROR: while finding user ${username}`)
        throw err;
    }
}
async function add(username, password, imgUrl) {
    const collection = await dbService.getCollection('user')
    try {
        const newUser = {}
        await collection.insertOne(newUser)
        return newUser;
    } catch(err){
        console.log(`ERROR while adding newUser: ${newUser}`);
        throw err;
    }
}