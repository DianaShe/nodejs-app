const User = require("../../models/user");
const gravatar = require("gravatar");
const { HttpError, sendEmail } = require("../../utils");
const { nanoid } = require("nanoid");

const { BASE_URL } = process.env;

const register = async (req, res) => {
  const { email } = req.body;
  const userExists = await User.exists({ email });

  if (userExists) throw HttpError(409, "Email in use");

  const avatarURL = gravatar.url(email, { s: 250 });
  const verificationToken = nanoid();

  const newUser = await User.create({
    ...req.body,
    avatarURL,
    verificationToken,
  });
  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}" >Click here to verify your email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

module.exports = register;
