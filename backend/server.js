const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

mongoose.connect("mongodb://mongo:27017/students");

const Student = mongoose.model("Student", new mongoose.Schema({
  name: String,
  dept: String,
  cgpa: Number
}));

app.get("/students", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

app.post("/students", async (req, res) => {
  const s = new Student(req.body);
  await s.save();
  res.status(201).json(s);
});

app.listen(5000, () => console.log("✅ Server running on port 5000"));
