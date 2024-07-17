import express from "express";
import cors from "cors";
import { errorMiddleware, TryCatch } from "./middlewares/error.js";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: "./.env" });

export const envMode = process.env.NODE_ENV?.trim() || "DEVELOPMENT";
const port = process.env.PORT || 3000;

const app = express();

mongoose
  .connect(process.env.MONGO_URI!, {
    dbName: "DockerTut",
  })
  .then(() => console.log("DataBase Connected!"))
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: " * ", credentials: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use(errorMiddleware);

app.listen(port, () =>
  console.log("Server is working on Port:" + port + " in " + envMode + " Mode.")
);
const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

const createUser = async (name: string, email: string) => {
  try {
    const newUser = await User.create({ name, email });
    console.log("newUser : " + newUser);
    return "User Created";
  } catch (error) {
    throw new Error("Something went wrong!");
  }
};

app.get(
  "/newuser",
  TryCatch(async (req, res) => {
    const name = req.query.name as string;
    const email = req.query.email as string;

    const message = await createUser(name, email);

    res.json({
      success: true,
      message,
    });
  })
);

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching users", error });
  }
});

app.get("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Page not found",
  });
});
