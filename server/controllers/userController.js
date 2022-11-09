const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { cloudinary } = require("../utils/cloudinary");
// const cloudinary = require("../utils/cloudinary");

require("dotenv").config();
module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.json({
        msg: "No user found. Check your email or register an account.",
        status: false,
      });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect Password", status: false });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.register = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({
        msg: "Another account with this Email already existed ",
        status: false,
      });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      fullName,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "fullName",
      "userImage",
      "_id",
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};

module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const fileStr = req.body.image;

    const res = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "chat-app",
    });

    const userData = await User.findByIdAndUpdate(
      userId,
      {
        hasProfilePicture: true,
        userImage: {
          public_id: res.public_id,
          url: res.secure_url,
        },
      },
      { new: true }
    );
    return res.json({
      success: true,
      image: userData.userImage,
    });
  } catch (ex) {
    next(ex);
  }
};

module.exports.logOut = (req, res, next) => {
  try {
    if (!req.params.id) return res.json({ msg: "User id is required " });
    onlineUsers.delete(req.params.id);
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
};
