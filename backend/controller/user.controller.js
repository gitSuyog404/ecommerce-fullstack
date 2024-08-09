import asyncHandler from "../middleware/asynchandler.middleware.js";
import User from "../models/user.model.js";
import createToken from "../utils/token.utils.js";
import { isEmail } from "../utils/validator.js";
import ApiError from "../utils/apiError.js";

const signup = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    let userexists = await User.findOne({ email }); // email: email
    if (userexists) {
      let err = new Error(`${email} already registered!`);
      err.status = 400;
      throw err;
    }
    if (!isEmail(email)) throw new ApiError(400, "Invalid Email!");
    let user = await User.create(req.body);
    createToken(res, user._id);
    res.send({
      message: "User registered successfully!",
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      let err = new Error("User not registered!");
      err.status = 400;
      throw err;
    }
    if (await user.matchPassword(password)) {
      createToken(res, user._id);
      res.send({
        message: "Login Success",
        user: {
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        },
      });
    } else {
      let err = new Error("Invalid Password");
      err.status = 400;
      throw err;
    }
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res) => {
  res.clearCookie("jwt");
  res.send({ message: "Logout Success" });
};

const getUsers = async (req, res) => {
  let users = await User.find({}).select("-password");
  res.send(users);
};

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    throw new ApiError(404, "User not found");
  }
});
const getUserProfile = asyncHandler(async (req, res) => {
  res.send(req.user);
});

const updateUserProfile = asyncHandler(async (req, res) => {
  let { _id } = req.user;
  let user = await User.findById(_id);
  if (!user) throw new ApiError(404, "User not found!");
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  if (req.body.password) {
    user.password = req.body.password;
  }
  await user.save();
  res.send({
    message: "User updated successfully!",
    user: {
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
  });
});

const updateUser = asyncHandler(async (req, res) => {
  let id = req.params.id;
  let user = await User.findById(id);
  if (!user) throw new ApiError(404, "User not found!");
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.isAdmin = Boolean(req.body.isAdmin);
  await user.save();
  res.send({ message: "User updated successfully!" });
});

const deleteUser = asyncHandler(async (req, res) => {
  let id = req.params.id;
  let user = await User.findById(id);
  if (!user) throw new ApiError(404, "User not found!");
  if (user.isAdmin) throw new ApiError(400, "Cannot delete admin user");
  await User.findByIdAndDelete(id);
  res.send({ message: "User deleted successfully!" });
});
export {
  signup,
  login,
  logout,
  getUserById,
  getUsers,
  getUserProfile,
  updateUserProfile,
  updateUser,
  deleteUser,
};
