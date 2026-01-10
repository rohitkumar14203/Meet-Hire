import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import asyncHandler from "express-async-handler";

// @dec Register new user
// @route POST/api/auth/register
// @access public
const register = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  //Check if user exist
  const userExist = await User.findOne({ email });

  if (userExist) {
    return res.status(400).json({
      success: false,
      error: "User already exists",
    });
  }
  // Create user
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    role,
  });

  // Token Generate
  generateToken(res, user._id);

  res.status(201).json({
    success: true,
    data: {
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
        createdAt: user.createdAt,
      },
    },
    message: "User registered successfully",
  });
});

// @dec login user
// @route POST/api/auth/login
// @access public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: "Please provide email and password",
    });
  }

  //  include password
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(400).json({
      success: false,
      error: "Invalid Credentials",
    });
  }

  // Check Password
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return res.status(400).json({
      success: false,
      error: "Invalid Credentials",
    });
  }

  // Generate Token
  generateToken(res, user._id);

  res.status(201).json({
    success: true,
    data: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      profileImage: user.profileImage,
      createdAt: user.createdAt,
    },
    message: "Login Successful",
  });
});

// @dec get user profile
// @route GET/api/profile
// @access private
const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      error: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    data: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      profileImage: user.profileImage,
      createdAt: user.createdAt,
    },
  });
});

// @dec update user profile
// @route PUT/api/profile
// @access private
const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).json({
      success: false,
      error: "User not found",
    });
  }

  user.firstName = req.body.firstName || user.firstName;
  user.lastName = req.body.lastName || user.lastName;
  user.profileImage - req.body.profileImage || user.profileImage;

  const updatedUser = await user.save();

  res.status(200).json({
    success: true,
    data: {
      id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      role: updatedUser.role,
      profileImage: updatedUser.profileImage,
      createdAt: updatedUser.createdAt,
    },
  });
});

// @dec change user password
// @route POST/api/change-password
// @access private

const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({
      success: false,
      error: "Please provide old and new password",
    });
  }

  const user = await User.findById(req.user.id).select("+password");

  const isMatch = await findById(req.user.id).select("+password");

  if (!isMatch) {
    return res.status(400).json({
      success: false,
      error: "Old password is incorrect",
    });
  }

  user.password = newPassword;

  res.status(200).json({
    success: true,
    message: "Password changed successfully",
  });
});

// @desc    logout user
// @route   POST /api/auth/logout
// @access  private
const logout = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    success: true,
    message: "Logout successful",
  });
};

export { register, login, getProfile, updateProfile, changePassword, logout };
