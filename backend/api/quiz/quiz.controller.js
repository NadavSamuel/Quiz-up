const logger = require('../../services/logger.service')
const quizService = require('./quiz.service')


module.exports = {
    getQuizzes,
    getToy,
    deleteToy,
    addToy,
    updateToy
}
async function getQuizzes(req, res) {
    try {
        console.log('req query is',req.query);
        const quizzes = await quizService.query(req.query)
        res.send(quizzes)
    } catch (err) {
        console.log('got err:',err);
        logger.error('Cannot get Quizzes:', err);
        res.status(500).send({ error: 'cannot get quizzes..@@' })

    }
}
async function getToy(req, res) {
    const toy = await toyService.getById(req.params.id)
    res.send(toy)
}

async function deleteToy(req, res) {
    await toyService.remove(req.params.id)
    res.end()
}

async function updateToy(req, res) {
    const toy = req.body;
    await toyService.update(toy)
    res.send(toy)
}
async function addToy(req, res) {
    var toy = req.body;
    toy.createdAt = new Date().toJSON()

    toy = await toyService.add(toy)
    res.send(toy)
}