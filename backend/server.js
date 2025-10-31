const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
app.use(express.json());

// Serve static frontend from public/
app.use(express.static(path.join(__dirname, "public")));

// Mongo connection
mongoose.connect(process.env.MONGO_URI || "mongodb://mongo:27017/students");

const Student = mongoose.model("Student", new mongoose.Schema({
  name: String,
  dept: String,
  cgpa: Number
}));

// Get all students
app.get("/students", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// Add a student
app.post("/students", async (req, res) => {
  const s = new Student(req.body);
  await s.save();
  res.status(201).json(s);
});

// Health check
app.get("/health", (req, res) => res.send({ status: "ok" }));

// ✅ Fix: use regex instead of "/*" (Express v5+ safe)
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(5000, () => console.log("✅ Server running on port 5000"));
