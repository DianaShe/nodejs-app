const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const MongooseError = require("../utils/MongooseError");
const subscriptionTypes = require("../constants/subscriptionTypes");

const userSchema = new Schema(
  {
    password: {
      type: String,
      minlength: 6,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: Object.values(subscriptionTypes),
      default: subscriptionTypes.STARTER,
    },
    avatarURL: String,
    token: String,
  },
  { versionKey: false }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);

  next();
});

userSchema.methods.checkPassword = (candidate, hash) =>
  bcrypt.compare(candidate, hash);

userSchema.post("save", MongooseError);

const User = model("user", userSchema);

module.exports = User;
