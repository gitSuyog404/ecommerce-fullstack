import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/user.model.js";
import Product from "./models/product.model.js";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import colors from "colors";

// process.loadEnvFile();
// npm i dotenv
dotenv.config();
connectDb();

async function loadData() {
  try {
    await User.deleteMany();
    await Product.deleteMany();

    let newUsers = await User.insertMany(users);
    await Product.insertMany(
      products.map((product) => {
        return {
          ...product,
          user: newUsers[0]._id,
        };
      })
    );
    console.log("Data Imported Successfully!".green.inverse);
    process.exit();
  } catch (err) {
    console.log("Error occured while laoding data:", err.message);
    process.exit(1);
  }
}

async function destroyData() {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (err) {
    console.log("Error occured while destoying data:", err.message);
    process.exit(1);
  }
}

if (process.argv[2] == "-d") {
  destroyData();
} else {
  loadData();
}
