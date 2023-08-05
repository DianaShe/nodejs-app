const User = require('../../models/user');
const gravatar = require('gravatar')
const { HttpError } = require('../../utils');

const register = async (req, res) => {
    const {email} = req.body
    const userExists = await User.exists({email})

    if (userExists) throw HttpError(409, "Email in use")

    const avatarURL = gravatar.url(email, {s: 250})

    const newUser = await User.create({...req.body, avatarURL});
    
    res.status(201).json({user: {
        email: newUser.email,
        subscription: newUser.subscription,
    }
    });
};

module.exports = register