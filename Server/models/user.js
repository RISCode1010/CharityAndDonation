const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// User schema
const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["donor", "volunteer","Admin"],
    default: "donor",
  },
  profilePicture: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
});


userSchema.methods.getJwtToken = function () {
  const token = jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET);
  return token;
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  const validPassword = await bcrypt.compare(enteredPassword, this.password);
  return validPassword;
};

// User model
const User = mongoose.model("User", userSchema);

module.exports = User;
