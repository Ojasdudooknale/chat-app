const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const { connectToMongoDB } = require("./db/connectToMongoDB.js");

const authRoutes = require("./routes/authRoutes.js");
const messageRoutes = require("./routes/messageRoutes.js");
const userRoutes = require("./routes/userRoutes.js");

const { app, server } = require("./socket/socket.js");



dotenv.config();
const PORT = process.env.PORT || 5000;

// const __dirname = path.resolve();

app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("/", (req, res) => {
    res.send("Hello")
});

server.listen(PORT, (req, res) => {
    // Connect to MongoDB
    connectToMongoDB();
    console.log(`Server started at ${PORT}`);
});