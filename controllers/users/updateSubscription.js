const User = require('../../models/user')
const {HttpError} = require("../../utils");

const updateSubscription = async (req, res) => {
    const { _id } = req.user;
    const result = await User.findByIdAndUpdate(_id, req.body, {new: true, select: "_id email subscription"});
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(result);
  };

module.exports = updateSubscription