import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateAccessAndRefreshToken.js";

const loginUser = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;

    if (!username || !password || !email) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    username = username.toLowerCase();
    email = email.toLowerCase();

    const user = await User.findOne({ username, email }).select("+password");
    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/auth/refresh",
      })
      .json({ accessToken });
  } catch (error) {
    next(error);
  }
};

const registerUser = async (req, res, next) => {
  try {
    let { username, password, email } = req.body;

    if (!username || !password || !email) {
      return res
        .status(400)
        .json({ message: "Invalid Credentials..please enter again" });
    }

    username = username.toLowerCase();
    email = email.toLowerCase();
    const existingUser = await User.findOne({ username, email });
    if (existingUser) {
      return res.status(409).json({
        message: "Username or email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username: username,
      password: hashedPassword,
      email: email,
    });

    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json(userResponse);
  } catch (error) {
    next(error);
  }
};

const refreshAccessToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token required" });
    }
    // 1. Verify refresh token cryptographically
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    // 2. Match refresh token in DB
    const user = await User.findOne({
      _id: decoded.id,
      refreshToken,
    });

    if (!user) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    // 3. Issue new access token
    const newAccessToken = generateAccessToken(user);

    res.status(200).json({
      accessToken: newAccessToken,
    });
  } catch (error) {
    console.error("Refresh token verify error:", error.name, error.message);
    return res.status(403).json({
      message: "Refresh token expired or invalid",
    });
  }
};

const logoutUser = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.sendStatus(204);
    }

    await User.findOneAndUpdate({ refreshToken }, { refreshToken: null });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};

export { loginUser, refreshAccessToken, registerUser, logoutUser };
