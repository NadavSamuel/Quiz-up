
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId


async function query(filterBy = {}) {
    // const criteria = _buildCriteria(filterBy)
    console.log(filterBy);
    filterBy = {"toyId" : ObjectId(filterBy.toyId)}
    const collection = await dbService.getCollection('review')
    try {
        // const reviews = await collection.find(criteria).toArray();
        var reviews = await collection.aggregate([
            {
                $match: filterBy
            },
            {
                $lookup:
                {
                    from: 'user',
                    localField: 'byUserId',
                    foreignField: '_id',
                    as: 'byUser'
                }
            },
            {
                $unwind: '$byUser'
            },
            {
                $lookup:
                {
                    from: 'toy',
                    localField: 'toyId',
                    foreignField: '_id',
                    as: 'aboutToy'
                }
            },
            {
                $unwind: '$aboutToy'
            }
        ]).toArray()

        reviews = reviews.map(review => {
            review.byUser = { _id: review.byUser._id, username: review.byUser.username }
            review.aboutToy = { _id: review.aboutToy._id, name: review.aboutToy.name }
            delete review.byUserId;
            delete review.toyId;
            return review;
        })
        return reviews
    } catch (err) {
        throw err;
    }
}

async function remove(reviewId) {
    const collection = await dbService.getCollection('review')
    try {
        await collection.deleteOne({ "_id": ObjectId(reviewId) })
    } catch (err) {
        // console.log(`ERROR: cannot remove review ${reviewId}`)
        throw err;
    }
}


async function add(review) {
    review.byUserId = ObjectId(review.byUserId);
    review.toyId = ObjectId(review.toyId);

    const collection = await dbService.getCollection('review')
    try {
        await collection.insertOne(review);
        return review;
    } catch (err) {
        // console.log(`ERROR: cannot insert user`)
        throw err;
    }
}

function _buildCriteria(filterBy) {
    const criteria = {};
    return criteria;
}

module.exports = {
    query,
    remove,
    add
}


