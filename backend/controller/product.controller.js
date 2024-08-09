import Product from "../models/product.model.js";
import asyncHandler from "../middleware/asynchandler.middleware.js";
import ApiError from "../utils/apiError.js";

// @desc get all products
// @route /api/v1/products
// @access public
const getProducts = asyncHandler(async (req, res) => {
  let page = Number(req.query.pageNumber) || 1;
  let keyword = req.query.keyword;
  keyword = keyword
    ? {
        $or: [
          {
            name: {
              $regex: keyword,
              $options: "i",
            },
          },
          {
            description: {
              $regex: keyword,
              $options: "i",
            },
          },
        ],
      }
    : {};
  let pageSize = 4;
  let productCount = await Product.countDocuments({ ...keyword });
  console.log(keyword);
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.send({ products, page, pages: Math.ceil(productCount / pageSize) });
});

// @desc get product by id
// @route /api/v1/products/:id
// @access public
const getProductById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  if (!product) throw new ApiError(404, "Product not found!");
  res.send(product);
});

// @desc get top products according to ratings
// @route /api/v1/products/topproducts/:limit
// @access public
const getTopProducts = asyncHandler(async (req, res) => {
  const limit = 3;
  const products = await Product.find({}).sort({ rating: -1 }).limit(limit);
  res.send(products);
});

// @desc create new product
// @route /api/v1/products
// @access private/admin
const createProduct = asyncHandler(async (req, res) => {
  // const product = await Product.create({ ...req.body, user: req.user._id });
  const product = await Product.create({
    user: req.user._id,
    name: "Sample Name",
    description: "Sample Description",
    image: "/images/sample.jpg",
    price: 0,
    brand: "Sample Brand",
    category: "Sample Category",
  });
  res.send({ message: "Product Created!", product });
});

const updateProduct = asyncHandler(async (req, res) => {
  let id = req.params.id;
  const product = await Product.findById(id);
  if (!product) throw new ApiError(404, "Product not found!");
  product.name = req.body.name || product.name;
  product.description = req.body.description || product.description;
  product.price = req.body.price || product.price;
  product.countInStock = req.body.countInStock || product.countInStock;
  product.image = req.body.image || product.image;
  product.brand = req.body.brand || product.brand;
  product.category = req.body.category || product.cateogry;

  const updatedProduct = await product.save();
  res.send({ message: "Product updated", product: updatedProduct });
});

const deleteProduct = asyncHandler(async (req, res) => {
  let id = req.params.id;
  const product = await Product.findById(id);
  if (!product) throw new ApiError(404, "Product not found!");
  await Product.findByIdAndDelete(id);
  res.send({ message: "Product deleted successfully" });
});

const addUserReview = asyncHandler(async (req, res) => {
  let id = req.params.id;
  const product = await Product.findById(id);
  if (!product) throw new ApiError(404, "Product not found!");
  let { rating, comment } = req.body;
  let reviewAdded = product.reviews.find(
    (review) => review.user.toString() === req.user._id.toString()
  );
  if (reviewAdded) throw new ApiError(400, "Review already added!");
  product.reviews.push({
    name: req.user.name,
    rating,
    comment,
    user: req.user._id,
  });
  product.numReviews = product.reviews.length;
  let totalRating = product.reviews.reduce(
    (acc, review) => acc + review.rating,
    0
  );
  product.rating = (totalRating / product.reviews.length).toFixed(2);
  await product.save();
  res.send({ message: "Product review added!" });
});
export {
  getProducts,
  getProductById,
  getTopProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  addUserReview,
};
