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
            if(filterBy.sortBy==='price') criteria.price={$gte:+filterBy.sortBy}
        }
        if(filterBy.inStock) criteria.inStock=filterBy.inStock
        return criteria;
    }

}
async function getById(toyId) {
    const collection = await dbService.getCollection('toy')
    try {
        const toy = await collection.findOne({ "_id": ObjectId(toyId) })
        return toy
    } catch (err) {
        console.log(`ERROR: while finding user ${toyId}`)
        throw err;
    }
}
async function remove(toyId) {
    const collection = await dbService.getCollection('toy')
    try {
        await collection.deleteOne({ "_id": ObjectId(toyId) })
    } catch (err) {
        console.log(`ERROR: cannot remove user ${toyId}`)
        throw err;
    }
}

async function update(toy) {
    console.log('TOY IN SERVICE',toy);
    const collection = await dbService.getCollection('toy')
    toy._id = ObjectId(toy._id);

    try {
        await collection.replaceOne({ '_id': toy._id }, toy)
        return toy
    } catch (err) {
        console.log(`ERROR: cannot update toy ${toy._id}`)
        throw err;
    }
}

async function add(toy) {
    const collection = await dbService.getCollection('toy')
    try {
        await collection.insertOne(toy);
        return toy;
    } catch (err) {
        console.log(`ERROR: cannot insert toy`)
        throw err;
    }
}