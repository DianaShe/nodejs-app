const User = require("../../models/user");
const { HttpError, sendEmail } = require("../../utils");

const {BASE_URL} = process.env;

const resendVerifyEmail = async(req, res) => {
    const {email} = req.body;
    const user = User.findOne({email});

    if (!user) throw HttpError(404, 'User not found')

    if (user.verify) throw HttpError(400, 'Verification has already been passed')

    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}" >Click here to verify your email</a>`
    }

    await sendEmail(verifyEmail)

}

module.exports = resendVerifyEmail