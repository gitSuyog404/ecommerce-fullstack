import express from "express";
import {
  addOrder,
  getMyOrders,
  getOrderById,
  getOrders,
  markOrderAsDelivered,
} from "../controller/order.controller.js";
import { checkAdmin, checkAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/addorder", checkAuth, addOrder);
router.get("/", checkAuth, checkAdmin, getOrders);
router.get("/myorders", checkAuth, getMyOrders);
router.put("/:id/deliver", checkAuth, checkAdmin, markOrderAsDelivered);
router.get("/:id", checkAuth, getOrderById);

export default router;
