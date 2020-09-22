const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { getQuizzes, getQuiz, deleteQuiz, updateQuiz, addQuiz } = require('./quiz.controller')
// , getToys, deleteToy, updateToy, addToy QUIZ CONTROLLER
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/:id', getQuiz)
router.get('/', getQuizzes)
// router.put('/:id', requireAuth, requireAdmin, updateQuiz)
router.put('/:id', updateQuiz)
// router.delete('/:id', requireAuth, requireAdmin, deleteQuiz)
router.delete('/:id', deleteQuiz)
// router.post('/', requireAuth, requireAdmin, addQuiz)
router.post('/', addQuiz)

module.exports = router