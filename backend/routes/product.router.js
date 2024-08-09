import express from "express";
import {
  addUserReview,
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  getTopProducts,
  updateProduct,
} from "../controller/product.controller.js";
import { checkAuth, checkAdmin } from "../middleware/auth.middleware.js";
const router = express.Router();

router.route("/").get(getProducts).post(checkAuth, checkAdmin, createProduct);
router.get("/top-products", getTopProducts);
router
  .route("/:id")
  .get(getProductById)
  .put(checkAuth, checkAdmin, updateProduct)
  .delete(checkAuth, checkAdmin, deleteProduct);
router.put("/:id/addreview", checkAuth, addUserReview);

export default router;
