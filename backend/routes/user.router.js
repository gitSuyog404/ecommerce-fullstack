import express from "express";
import {
  getUserProfile,
  getUsers,
  getUserById,
  updateUser,
  login,
  logout,
  signup,
  updateUserProfile,
  deleteUser,
} from "../controller/user.controller.js";
import { checkAuth, checkAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/", checkAuth, checkAdmin, getUsers);
router.get("/profile", checkAuth, getUserProfile);
router.get("/:id", checkAuth, checkAdmin, getUserById);
router.put("/profile", checkAuth, updateUserProfile);
router.put("/:id", checkAuth, checkAdmin, updateUser);
router.delete("/:id", checkAuth, checkAdmin, deleteUser);

export default router;
