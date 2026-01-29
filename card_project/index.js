const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Card = require("./model/card");

const app = express();
app.use(express.json());

// serve frontend
app.use(express.static(path.join(__dirname, "frontend")));

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/paymentDB")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// POST
app.post("/cards", async (req, res) => {
  const card = new Card(req.body);
  await card.save();
  res.json({ message: "Saved successfully" });
});

// GET
app.get("/cards", async (req, res) => {
  const data = await Card.find();
  res.json(data);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
