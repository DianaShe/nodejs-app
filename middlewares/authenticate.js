const jwt = require('jsonwebtoken')
const HttpError = require('../utils/HttpError')
const User = require('../models/user')

const {SECRET} = process.env

const authenticate = async (req, res, next) => {
    const {authorization = ""} = req.headers
    const token = authorization?.startsWith('Bearer') && authorization.split(' ')[1]

    try {
        const {id} = jwt.verify(token, SECRET)
        const user = await User.findById(id)
        if (!user || !user.token || user.token !== token) {
            next(HttpError(401, "Not authorized"))
        }
        req.user = user
        next()

    } catch (error) {
        next(HttpError(401, "Not authorized"))
    }
}

module.exports = authenticate