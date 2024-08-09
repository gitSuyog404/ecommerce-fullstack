import express from "express";
import multer from "multer";
import ApiError from "../utils/apiError.js";
import asyncHandler from "../middleware/asynchandler.middleware.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    let fn = `${Date.now()}-${file.originalname}`;
    cb(null, fn);
  },
});

const fileFilter = (req, file, cb) => {
  let filePattern = /\.(jpe?g|png|webp)$/;
  if (!file.originalname.match(filePattern)) {
    cb(new ApiError(400, "Only Image File Supported!"), false);
  } else {
    cb(null, true);
  }
};

const upload = multer({
  storage,
  fileFilter,
});

router.post(
  "/upload",
  upload.single("image"),
  asyncHandler(async (req, res) => {
    res.send({
      message: "Image Uploaded!",
      path: `/${req.file.path}`,
    });
  })
);

export default router;
