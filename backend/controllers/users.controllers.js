import User from "../models/user.models.js";
import bcrypt from "bcrypt";

export const getUser = async (req, res, next) => {
  try {
    let { username, email } = req.body;

    if (!username || !email) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    username = username.toLowerCase();
    email = email.toLowerCase();

    const user = await User.findOne({ username, email });

    if (!user) {
      return res.status(404).json({
        message: `User with username ${username} or email ${email} was not found`,
      });
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { username, email } = req.user;
    const { newUsername, newEmail } = req.body;

    const user = await User.findOne({ username, email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.username = newUsername;
    user.email = newEmail;
    await user.save();

    const userResponse = user.toObject();

    res.status(200).json(userResponse);
  } catch (error) {
    next(error);
  }
};

export const changeUserPassword = async (req, res, next) => {
  try {
    const { username, email } = req.user;
    const { oldPassword, newPassword } = req.body;

    const user = await User.findOne({ username, email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    user.password = newPassword;
    await user.save();

    const userResponse = user.toObject();

    res.status(200).json({ message: "Password Updated successfully!" });
  } catch (error) {
    next(error);
  }
};
