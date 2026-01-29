const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Card = require("./model/card");

require("dotenv").config();

const app = express();
app.use(express.json());

// serve frontend
app.use(express.static(path.join(__dirname, "frontend")));

app.get("/", (req, res) => {
  res.send("Hackathon backend is live 🚀");
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));


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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

