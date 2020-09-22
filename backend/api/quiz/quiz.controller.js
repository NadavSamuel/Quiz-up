const logger = require('../../services/logger.service')
const quizService = require('./quiz.service')


module.exports = {
    getQuizzes,
    getQuiz,
    deleteQuiz,
    addQuiz,
    updateQuiz
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
async function getQuiz(req, res) {
    const quiz = await quizService.getById(req.params.id)
    res.send(quiz)
}

async function deleteQuiz(req, res) {
    await quizService.remove(req.params.id)
    res.end()
}

async function updateQuiz(req, res) {
    const quiz = req.body;
    await quizService.update(quiz)
    res.send(quiz)
}
async function addQuiz(req, res) {
    var quiz = req.body;
    // quiz.createdAt = new Date().toJSON()
    quiz = await quizService.add(quiz)
    res.send(quiz)
}