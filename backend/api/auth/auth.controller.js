const authService = require('./auth.service')
const logger = require('../../services/logger.service')
module.exports = {
    login,
    signup,
    logout
}
async function login(req, res) {
    const { username, password } = req.body
    try {
        const user = await authService.login(username, password)
        req.session.user = user;
        res.json(user)
    } catch (err) {
        res.status(401).send({ error: err })
    }
}

//IMPROVE:
async function signup(req, res) {
    const { username, password, imgUrl } = req.body
    try {
        const newUser = await authService.signup(username, password, imgUrl)
        req.session.user = newUser
        res.json(newUser)


    } catch (err) {
        res.status(401).send({ error: err })
    }
}

//IMPROVE:
async function logout(req, res) {

}