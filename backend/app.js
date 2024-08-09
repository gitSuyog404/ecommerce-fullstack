import express from "express";
import cookieParser from "cookie-parser";
import path, { dirname } from "path";

// middleware imports
import errorHandler from "./middleware/error.middleware.js";
import notFoundHandler from "./middleware/notFound.Middleware.js";
// router imports
import userRouter from "./routes/user.router.js";
import productRouter from "./routes/product.router.js";
import orderRouter from "./routes/order.router.js";
import uploadRouter from "./routes/upload.router.js";
// initialize express app
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));
// Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/image", uploadRouter);

if (process.env.NODE_ENV == "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Server is up and running");
  });
}

// error middlewares
app.use(notFoundHandler);
app.use(errorHandler);

export { app };
