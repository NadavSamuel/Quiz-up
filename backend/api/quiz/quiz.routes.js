const express = require('express')
// const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const { getQuizzes,  } = require('./quiz.controller')
// , getToys, deleteToy, updateToy, addToy QUIZ CONTROLLER
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getQuizzes)
// router.get('/:id', getToy)
// router.put('/:id', requireAuth, requireAdmin, updateToy)
// router.delete('/:id', requireAuth, requireAdmin, deleteToy)
// router.post('/', requireAuth, requireAdmin, addToy)
module.exports = router