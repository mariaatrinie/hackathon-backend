const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  cardName: {
    type: String,
    required: true
  },
  cardHolderName: {
    type: String,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ["cash", "card", "credit"],
    required: true
  }
});

module.exports = mongoose.model("Card", cardSchema);
