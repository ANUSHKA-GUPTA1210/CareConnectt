const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

/* -------------------- MIDDLEWARE -------------------- */
app.use(cors());
app.use(express.json());

/* -------------------- DATABASE CONNECTION -------------------- */
async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected 🟢");
    } catch (error) {
        console.log("Mongo Error ❌ =>", error.message);
        process.exit(1);
    }
}
connectDB();

/* -------------------- ROUTES -------------------- */
app.use("/api/auth", require("./routes/authRoutes"));

/* -------------------- TEST ROUTE -------------------- */
app.get("/", (req, res) => {
    res.send("Backend + Database chal raha hai 🚀");
});

/* -------------------- SAMPLE API (for frontend test) -------------------- */
app.get("/api/test", (req, res) => {
    res.json({
        message: "API working perfectly ✅",
        time: new Date()
    });
});

/* -------------------- SERVER -------------------- */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});


