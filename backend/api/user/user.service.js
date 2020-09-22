const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId


module.exports = {
    // query,
    // getById,
    getByUsername,
    // remove,
    update,
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
async function (user) {4
    console.log('USER:',user);
    const collection = await dbService.getCollection('user')
    user._id = ObjectId(user._id);
    console.log('USER:',user);

    try {
        await collection.replaceOne({ "_id": user._id }, { $set: user })
        return user
    } catch (err) {
        console.log(`ERROR: cannot update user ${user._id}`)
        throw err;
    }
}