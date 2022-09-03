const mongoose = require("mongoose");
const pwdHash = require("password-hash");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    versionKey: false,
    timeseries: true,
  }
);

userSchema.pre("save", function (next) {
  this.password = pwdHash.generate(this.password);
  next();
});

module.exports = mongoose.model("User", userSchema);
