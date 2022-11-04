const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    passwordConfirmation: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
      min: 18,
      max: 65,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    LastName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
  },
  { timestamps: true }
);

module.exports = User = mongoose.model("User", UserSchema);
