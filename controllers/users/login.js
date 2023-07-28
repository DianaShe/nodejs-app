const User = require('../../models/user');
const { HttpError } = require('../../utils');
const jwt = require('jsonwebtoken')

const {SECRET} = process.env

const login = async (req, res, next) => {
    const {email, password} = req.body
    const user = await User.findOne({ email }).select('+password');

    if (!user) throw HttpError(401, 'Email or password is wrong');

    const passwordIsValid = await user.checkPassword(password, user.password);

    if (!passwordIsValid) throw HttpError(401, 'Email or password is wrong');

    const token = jwt.sign({id: user._id}, SECRET, {expiresIn: "2h"})

    await User.findByIdAndUpdate(user._id, {token})

    res.status(200).json({user: {
        email: user.email,
        subscription: user.subscription,
        token
    }});
};

module.exports = login