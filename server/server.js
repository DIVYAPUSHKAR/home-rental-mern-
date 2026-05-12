import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";
import postRentRoutes from "./routes/postrent.js";
import bookingRoutes from "./routes/bookings.js";
import  orderRoutes from  "././routes/orders.js"
dotenv.config();

const PORT = process.env.PORT || 5001;
const app = express();

// 🔹 Middleware
app.use(cors());
app.use(express.json()); // ✅ Ensure JSON body parsing
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads")); // ✅ Serves uploaded images

// 🔹 Routes
app.use("/api/postrent", postRentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes); // ✅ Correct path

app.use("/api/bookings", bookingRoutes);
app.use("/api/orders", orderRoutes);


// 🔹 MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  }
};

// 🔹 Start Server
connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});