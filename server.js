import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import path, { dirname } from "path";
import { fileURLToPath } from "url";

import { logger, logEvents } from "./middleware/logger.js";
import errorHandler from "./middleware/errorHandler.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import corsOptions from "./config/corsOptions.js";
import connectDB from "./config/dbConn.js";
import mongoose from "mongoose";
import root from "./routes/root.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const PORT = process.env.PORT || 3500;

console.log(process.env.NODE_ENV);

connectDB();

app.use(logger);

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use("/", express.static(path.join(__dirname, "/public")));

app.use("/", root);

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/notes", noteRoutes);

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

mongoose.connection.on("error", (err) => {
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});
