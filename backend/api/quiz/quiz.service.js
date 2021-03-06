const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
module.exports = {
    query,
    getById,
    remove,
    add,
    update,
}


async function query(filterBy = {}) {
    const criteria =  _buildCriteria(filterBy)
    const collection = await dbService.getCollection('quiz')
    try {
        const quizzes = await collection.find(criteria).toArray();
        return quizzes
    } catch (err) {
        console.log('ERROR: cannot find quizzes')
        throw err;
    }


}
async function getById(quizId) {
    const collection = await dbService.getCollection('quiz')
    try {
        const quiz = await collection.findOne({ "_id": ObjectId(quizId) })
        return quiz
    } catch (err) {
        console.log(`ERROR: while finding quiz ${quizId}`)
        throw err;
    }
}
async function remove(quizId) {
    const collection = await dbService.getCollection('quiz')
    try {
        await collection.deleteOne({ "_id": ObjectId(quizId) })
    } catch (err) {
        console.log(`ERROR: cannot remove user ${quizId}`)
        throw err;
    }
}
async function update(quiz) {
    const collection = await dbService.getCollection('quiz')
    quiz._id = ObjectId(quiz._id);

    try {
        await collection.replaceOne({ '_id': quiz._id }, quiz)
        return quiz
    } catch (err) {
        console.log(`ERROR: cannot update quiz ${quiz._id}`)
        throw err;
    }
}
async function add(quiz) {
    const collection = await dbService.getCollection('quiz')
    try {
        await collection.insertOne(quiz);
        return quiz;
    } catch (err) {
        console.log(`ERROR: cannot insert quiz: ${quiz}`)
        throw err;
    }
}
function _buildCriteria(filterBy) {
    const criteria = {};
    if (filterBy.title) {
        criteria.title = new RegExp(filterBy.title, 'ig')
    }

    return criteria;
}