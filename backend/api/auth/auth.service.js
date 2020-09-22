const bcrypt = require('bcryptjs')
const logger = require('../../services/logger.service')
const userService = require('../user/user.service')

const saltRounds = 10

async function login(username, password) {
    logger.debug(`auth.service - login with username: ${username}`)
    if (!username || !password) return Promise.reject('username and password are required!')

    const user = await userService.getByUsername(username)
    if (!user) return Promise.reject('Invalid username or password')
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        logger.warn('No match')
        return Promise.reject('Invalid username or password')
    }
    delete user.password;
    return user;
}

async function signup(username, password, imgUrl) {
    logger.debug(`auth.service - signup with username: ${username}, password: ${password}, imgUrl: ${imgUrl}`)
    if (!username || !password) return Promise.reject('username and password are required!')
    const hash = await bcrypt.hash(password, saltRounds)
    return userService.add({ username, password: hash, imgUrl })

}

module.exports = {
    signup,
    login,
}