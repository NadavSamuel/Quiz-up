const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId


module.exports = {
    query,
    // getById,
    getByUsername,
    // remove,
    update,
    add
}


async function query(filterBy = {}) {
    // const criteria = (filterBy)
    const collection = await dbService.getCollection('user')
    try {
        const users = await collection.find({}).toArray();
        // users.forEach(user => delete user.password);

        return users
    } catch (err) {
        console.log('ERROR: cannot find users')
        throw err;
    }
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
async function add(newUser) {
    const collection = await dbService.getCollection('user')
    try {
        await collection.insertOne(newUser)
        return newUser;
    } catch (err) {
        console.log(`ERROR while adding newUser: ${newUser}`);
        throw err;
    }
}
async function update(user) {
    const collection = await dbService.getCollection('user')
    user._id = ObjectId(user._id);

    try {
        await collection.replaceOne({ "_id": user._id }, user)
        return user
    } catch (err) {
        console.log(`ERROR: cannot update user ${user._id}`)
        throw err;
    }
}









