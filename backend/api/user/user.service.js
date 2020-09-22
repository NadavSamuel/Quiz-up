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
async function add({ username, password, imgUrl }) {
    const userToAdd = { username, password, profileImg: imgUrl, isAdmin:false,quizzes:[], }
    const collection = await dbService.getCollection('user')
    try {
        await collection.insertOne(userToAdd)
        return userToAdd;
    } catch (err) {
        console.log(`ERROR while adding newUser: ${userToAdd}`);
        throw err;
    }
}
async function update(user) {
    console.log('USER from body',user);
    const collection = await dbService.getCollection('user')
    user._id = ObjectId(user._id);
    console.log('user with objectId');

    try {
        await collection.replaceOne({ "_id": user._id }, { $set: user })
        return user
    } catch (err) {
        console.log(`ERROR: cannot update user ${user._id}`)
        throw err;
    }
}