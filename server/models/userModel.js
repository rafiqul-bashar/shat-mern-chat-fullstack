const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    min: 3,
    max: 25,
  },
  userName: {
    type: String,
    // required: true,
    min: 3,
    max: 25,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  hasProfilePicture: {
    type: Boolean,
    default: false,
  },
  userImage: {
    public_id: {
      type: String,
      // required: true,
      default: "",
    },
    url: {
      type: String,
      required: true,
      default:
        "https://aui.atlassian.com/aui/8.8/docs/images/avatar-person.svg",
    },
  },
});

module.exports = mongoose.model("Users", userSchema);
