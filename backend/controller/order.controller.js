import Order from "../models/order.model.js";
import asyncHandler from "../middleware/asynchandler.middleware.js";
import ApiError from "../utils/apiError.js";

const addOrder = asyncHandler(async (req, res) => {
  let { orderItems, shippingAddress, itemPrice, shippingCharge, totalPrice } =
    req.body;
  let order = await Order.create({
    orderItems: orderItems.map((item) => ({
      ...item,
      product: item._id,
      _id: undefined,
    })),
    user: req.user._id,
    shippingAddress,
    itemPrice,
    shippingCharge,
    totalPrice,
  });
  res.send({ message: "Order added with id " + order._id, orderId: order._id });
});

const getOrders = asyncHandler(async (req, res) => {
  let orders = await Order.find({}).populate("user", "name email");
  res.send(orders);
});

const getOrderById = asyncHandler(async (req, res) => {
  let id = req.params.id;
  let order = await Order.findById(id);
  if (!order) throw new ApiError(404, "Product Not Found");
  res.send(order);
});

const getMyOrders = asyncHandler(async (req, res) => {
  let orders = await Order.find({ user: req.user._id });
  res.send(orders);
});

const markOrderAsDelivered = asyncHandler(async (req, res) => {
  let id = req.params.id;
  let order = await Order.findById(id);
  if (!order) throw new ApiError(404, "Order Not Found");
  order.isDelivered = true;
  order.isPaid = true;
  order.deliveredAt = Date.now();
  await order.save();
  res.send({ message: "Order Delivered!" });
});

export { addOrder, getOrderById, getOrders, getMyOrders, markOrderAsDelivered };
