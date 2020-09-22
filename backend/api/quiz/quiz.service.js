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
    const criteria = {}// _buildCriteria(filterBy)
    const collection = await dbService.getCollection('quiz')
    try {
        const quizzes = await collection.find(criteria).toArray();
        // users.forEach(user => delete user.password);
        console.log('got quizzes:',quizzes);
        return quizzes
    } catch (err) {
        console.log('ERROR: cannot find quizzes')
        throw err;
    }


    function _buildCriteria(filterBy) {
        const criteria = {};
        if (filterBy.filterText) {
            criteria.text = filterBy.filterText
        }
        if (filterBy.sortBy) {
            if (filterBy.sortBy === 'price') criteria.price = { $gte: +filterBy.sortBy }
        }
        if (filterBy.inStock) criteria.inStock = filterBy.inStock
        return criteria;
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
        // const quizzes = await collection.find({}).toArray();
        // console.log(quizzes);
    } catch (err) {
        console.log(`ERROR: cannot remove user ${quizId}`)
        throw err;
    }
}

async function update(quiz) {
    console.log('quiz IN SERVICE', quiz);
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